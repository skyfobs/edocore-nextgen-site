# Longhorn Permissions Setup Guide

## Your Current Setup

### Host Directory Permissions
```bash
ubuntu@k8-worker-1:~$ ls -larth /data/k8-cluster-disk1/
drwxrwxrwx 4 ubuntu ubuntu 4.0K Jun  6 20:17 .          # 777 - Good!
drwxr-xr-x 5 root   root   4.0K Jun  6 21:37 replicas   # 755 - Good!
```

✅ **This is correct for Longhorn!**

---

## How Permissions Work with Longhorn

### 1. Host Directory → Longhorn → Pod Volume

```
Host Directory (/data/k8-cluster-disk1/)
    ↓ Longhorn manages this
    ↓
Longhorn Volume (created dynamically)
    ↓ Mounted into pod
    ↓
Pod Volume (/app/data in container)
```

**Important:** The host directory permissions don't directly affect the pod volume permissions!

---

## StatefulSet Configuration

### ✅ Optimized Setup (Current)

```yaml
spec:
  template:
    spec:
      # Pod-level security context
      securityContext:
        runAsUser: 1001              # Run as non-root user
        runAsGroup: 1001             # Run as non-root group
        fsGroup: 1001                # Make volumes writable by group 1001
        fsGroupChangePolicy: "OnRootMismatch"  # Only fix if needed (faster!)
      
      containers:
        - name: educorenextgen-website
          # No init container needed!
```

**How it works:**
1. Kubernetes sees `fsGroup: 1001`
2. When Longhorn volume is mounted, Kubernetes automatically:
   - Sets group ownership to 1001
   - Adds group write permissions
3. Container running as 1001:1001 can now write!

---

## What Changed?

### ❌ Old Method (Removed)
```yaml
initContainers:
  - name: fix-permissions
    image: busybox:1.36
    command: ['sh', '-c']
    args:
      - |
        chown -R 1001:1001 /app/data
    securityContext:
      runAsUser: 0  # Needs root - security risk!
```

**Problems:**
- Requires running as root
- Slower startup (waits for init container)
- Can fail on some storage backends
- Security risk

### ✅ New Method (Current)
```yaml
securityContext:
  fsGroup: 1001
  fsGroupChangePolicy: "OnRootMismatch"
```

**Benefits:**
- ✅ No root required
- ✅ Faster startup
- ✅ Works reliably with Longhorn
- ✅ More secure
- ✅ Kubernetes handles it automatically

---

## How fsGroup Works

### When Pod Starts:

```bash
# 1. Before fsGroup
ls -la /app/data/
drwxr-xr-x 2 root root 4096 ...  # Owned by root

# 2. Kubernetes applies fsGroup: 1001
ls -la /app/data/
drwxrwsr-x 2 root 1001 4096 ...  # Group changed to 1001, added setgid bit

# 3. Container can write!
touch /app/data/test.db
ls -la /app/data/
-rw-r--r-- 1 1001 1001 0 ...  # Owned by 1001:1001
```

**The `s` in `drwxrwsr-x`:**
- This is the **setgid bit**
- New files inherit the directory's group (1001)
- SQLite database will be created as 1001:1001 automatically!

---

## fsGroupChangePolicy Explained

### `OnRootMismatch` (Recommended for Longhorn)

```yaml
fsGroupChangePolicy: "OnRootMismatch"
```

**Behavior:**
- Checks if volume is already owned by fsGroup
- Only changes permissions if mismatch found
- **Much faster** for existing volumes!

### `Always` (Not recommended)

```yaml
fsGroupChangePolicy: "Always"
```

**Behavior:**
- Changes permissions every time pod starts
- Slower, especially for large volumes
- Unnecessary for Longhorn

---

## Verification Steps

### 1. Deploy StatefulSet

```bash
kubectl apply -f statefulset.yaml
```

### 2. Check Pod Status

```bash
kubectl get pods -n educorenextgen
# Wait for: Running and Ready
```

### 3. Verify Volume Permissions

```bash
POD=$(kubectl get pod -n educorenextgen -l app=educorenextgen-website -o jsonpath="{.items[0].metadata.name}")

# Check permissions
kubectl exec $POD -n educorenextgen -- ls -la /app/data/

# Should show:
# drwxrwsr-x 2 root 1001 4096 ... .
#     ^^^ 
#     Group has write permissions!
```

### 4. Test Database Creation

```bash
# Try creating a file
kubectl exec $POD -n educorenextgen -- touch /app/data/test.txt

# Check ownership
kubectl exec $POD -n educorenextgen -- ls -la /app/data/test.txt

# Should show:
# -rw-r--r-- 1 1001 1001 0 ... test.txt
#            ^^^^ ^^^^
#            Correct ownership!
```

### 5. Check Application Logs

```bash
kubectl logs $POD -n educorenextgen --tail=50

# Should NOT see:
# ❌ SQLITE_READONLY errors
# ❌ Permission denied errors

# Should see:
# ✅ Database initialized
# ✅ Server started
```

---

## Troubleshooting

### Issue: SQLITE_READONLY Error

**Symptom:**
```
Error: SQLITE_READONLY: attempt to write a readonly database
```

**Check:**
```bash
kubectl exec $POD -n educorenextgen -- ls -la /app/data/
```

**If you see:**
```
drwxr-xr-x 2 root root ...
```

**Solution:**
```bash
# Delete pod to trigger recreation
kubectl delete pod $POD -n educorenextgen

# Kubernetes will recreate it with correct permissions
```

---

### Issue: Permission Denied on Startup

**Check fsGroup is applied:**
```bash
kubectl get pod $POD -n educorenextgen -o yaml | grep fsGroup
```

**Should show:**
```yaml
fsGroup: 1001
fsGroupChangePolicy: OnRootMismatch
```

**If missing, update StatefulSet:**
```bash
kubectl apply -f statefulset.yaml
kubectl rollout restart statefulset/educorenextgen-website -n educorenextgen
```

---

### Issue: Pod Stuck in Init

**If you still have old init container:**
```bash
kubectl logs $POD -n educorenextgen -c fix-permissions
```

**Solution:**
Update to new StatefulSet without init container and redeploy.

---

## Longhorn-Specific Notes

### Volume Ownership

Longhorn volumes are created with these default permissions:
```
Owner: root (0)
Group: root (0)
Mode: 755 (rwxr-xr-x)
```

**Kubernetes fsGroup changes this to:**
```
Owner: root (0)        # Unchanged
Group: 1001            # Changed by fsGroup!
Mode: 2775 (rwxrwsr-x) # Added setgid + group write
```

### Replica Management

Your Longhorn setup:
```
/data/k8-cluster-disk1/replicas/
```

**Each replica is independent:**
- Replica 1: `/data/k8-cluster-disk1/replicas/pvc-xxx-1/`
- Replica 2: `/data/k8-cluster-disk1/replicas/pvc-xxx-2/`
- Replica 3: `/data/k8-cluster-disk1/replicas/pvc-xxx-3/`

Longhorn handles replication automatically - you don't need to manage these!

---

## Best Practices

### ✅ Do This

1. **Use fsGroup** instead of init containers
2. **Use OnRootMismatch** for better performance
3. **Let Longhorn manage replicas** automatically
4. **Keep host directory 777** for Longhorn worker access
5. **Run containers as non-root** (1001:1001)

### ❌ Don't Do This

1. Don't manually change replica directory permissions
2. Don't use init containers for permission fixes
3. Don't run containers as root
4. Don't use fsGroupChangePolicy: Always (slower)
5. Don't create PVCs manually (use VolumeClaimTemplates)

---

## Summary

✅ **Your Longhorn host permissions are correct!**

```
/data/k8-cluster-disk1/        → drwxrwxrwx (777) ✅
/data/k8-cluster-disk1/replicas/ → drwxr-xr-x (755) ✅
```

✅ **StatefulSet optimized for Longhorn:**

```yaml
securityContext:
  fsGroup: 1001                        # Auto-fixes permissions
  fsGroupChangePolicy: "OnRootMismatch" # Fast startup
```

✅ **No init container needed!**

**Kubernetes + Longhorn handle permissions automatically** 🎉

---

## Quick Verification

```bash
# Deploy
kubectl apply -f statefulset.yaml

# Wait for ready
kubectl wait --for=condition=ready pod -l app=educorenextgen-website -n educorenextgen --timeout=300s

# Verify permissions
POD=$(kubectl get pod -n educorenextgen -l app=educorenextgen-website -o jsonpath="{.items[0].metadata.name}")
kubectl exec $POD -n educorenextgen -- ls -la /app/data/

# Should show: drwxrwsr-x ... 1001 ...
# Group 1001 can write! ✅
```

**If you see the setgid bit (`s`) and group `1001`, you're all set!** 🚀
