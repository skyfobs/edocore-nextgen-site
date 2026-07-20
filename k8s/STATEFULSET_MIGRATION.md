# StatefulSet Migration Guide

## Overview

The deployment has been converted from a **Deployment** to a **StatefulSet** to use **VolumeClaimTemplates** with **Longhorn** storage.

---

## What Changed?

### Before (Deployment)
```yaml
kind: Deployment
volumes:
  - name: data
    persistentVolumeClaim:
      claimName: educore-data-pvc  # Shared PVC
```

### After (StatefulSet)
```yaml
kind: StatefulSet
volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      storageClassName: longhorn  # Each pod gets its own PVC
      resources:
        requests:
          storage: 5Gi
```

---

## Benefits of StatefulSet

✅ **Dedicated Storage per Pod** - Each pod gets its own PVC  
✅ **Stable Pod Names** - Pods named `educorenextgen-website-0`, `educorenextgen-website-1`, etc.  
✅ **Ordered Deployment** - Pods start/stop in order  
✅ **Stable Network Identity** - Each pod gets a stable DNS name  
✅ **Longhorn Features** - Automatic snapshots, replication, backups  

---

## Files Updated

1. **`deployment.yaml`** - Now a StatefulSet with VolumeClaimTemplates
2. **`service-headless.yaml`** - New headless service (required for StatefulSet)
3. **`statefulset.yaml`** - Backup copy of the StatefulSet configuration

---

## Migration Steps

### Prerequisites

1. **Longhorn installed** in your cluster
2. **StorageClass** named `longhorn` exists

**Verify Longhorn:**
```bash
# Check Longhorn is installed
kubectl get ns longhorn-system

# Check StorageClass
kubectl get storageclass longhorn

# Should show:
# NAME       PROVISIONER          RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION
# longhorn   driver.longhorn.io   Delete          Immediate           true
```

**If Longhorn not installed:**
```bash
# Install Longhorn
kubectl apply -f https://raw.githubusercontent.com/longhorn/longhorn/v1.5.3/deploy/longhorn.yaml

# Wait for all pods to be ready
kubectl -n longhorn-system get pods -w
```

---

### Option 1: Fresh Deployment (Recommended)

If you haven't deployed yet, or can afford downtime:

```bash
# 1. Deploy headless service (required for StatefulSet)
kubectl apply -f k8s/service-headless.yaml

# 2. Deploy StatefulSet
kubectl apply -f k8s/deployment.yaml

# 3. Wait for pods
kubectl get pods -n educorenextgen -w

# 4. Verify PVCs created automatically
kubectl get pvc -n educorenextgen

# Should show:
# data-educorenextgen-website-0   Bound    5Gi
# logs-educorenextgen-website-0   Bound    2Gi
# data-educorenextgen-website-1   Bound    5Gi
# logs-educorenextgen-website-1   Bound    2Gi
```

---

### Option 2: Migrate from Existing Deployment

If you have an existing Deployment with data:

```bash
# 1. Backup database first!
POD=$(kubectl get pod -n educorenextgen -l app=educorenextgen-website -o jsonpath="{.items[0].metadata.name}")
kubectl cp educorenextgen/$POD:/app/data/educore.db ./educore-backup-$(date +%Y%m%d).db

# 2. Scale down existing deployment
kubectl scale deployment educorenextgen-website --replicas=0 -n educorenextgen

# 3. Create headless service
kubectl apply -f k8s/service-headless.yaml

# 4. Delete old deployment (keeps PVCs)
kubectl delete deployment educorenextgen-website -n educorenextgen

# 5. Deploy StatefulSet
kubectl apply -f k8s/deployment.yaml

# 6. Wait for first pod to start
kubectl get pods -n educorenextgen -w

# 7. Copy database to new StatefulSet pod
kubectl cp ./educore-backup-*.db educorenextgen/educorenextgen-website-0:/app/data/educore.db

# 8. Verify database
kubectl exec educorenextgen-website-0 -n educorenextgen -- ls -la /app/data/

# 9. Test application
kubectl logs -n educorenextgen educorenextgen-website-0

# 10. Clean up old PVCs (optional)
kubectl delete pvc educore-data-pvc educore-logs-pvc -n educorenextgen
```

---

## StatefulSet Behavior

### Pod Names
- **Deployment:** `educorenextgen-website-6d8b9c7f4d-abc12` (random)
- **StatefulSet:** `educorenextgen-website-0`, `educorenextgen-website-1` (stable)

### DNS Names
Each pod gets a stable DNS name:
```
educorenextgen-website-0.educorenextgen-website-headless.educorenextgen.svc.cluster.local
educorenextgen-website-1.educorenextgen-website-headless.educorenextgen.svc.cluster.local
```

### PVC Naming
- **Pod 0:**
  - `data-educorenextgen-website-0`
  - `logs-educorenextgen-website-0`
- **Pod 1:**
  - `data-educorenextgen-website-1`
  - `logs-educorenextgen-website-1`

### Startup Order
```bash
# Pods start in order
1. educorenextgen-website-0 starts
2. Wait for pod-0 to be Ready
3. educorenextgen-website-1 starts
4. Wait for pod-1 to be Ready
```

---

## Longhorn Features

### Volume Snapshots

```bash
# Create snapshot via Longhorn UI
# Or using kubectl:
kubectl -n longhorn-system get volumes

# Access Longhorn UI
kubectl port-forward -n longhorn-system svc/longhorn-frontend 8080:80
# Open http://localhost:8080
```

### Volume Backups

```bash
# Configure S3 backup in Longhorn UI:
# Settings > General > Backup Target
# s3://bucket@region/path/

# Create backup
# Longhorn UI > Volume > Create Backup
```

### Volume Replication

By default, Longhorn creates 3 replicas of each volume across different nodes for HA.

```bash
# Check replicas
kubectl -n longhorn-system get replicas
```

---

## Scaling

### Scale Up

```bash
# Add more replicas
kubectl scale statefulset educorenextgen-website --replicas=3 -n educorenextgen

# Each new pod gets its own PVC automatically:
# data-educorenextgen-website-2
# logs-educorenextgen-website-2
```

### Scale Down

```bash
# Reduce replicas
kubectl scale statefulset educorenextgen-website --replicas=1 -n educorenextgen

# Note: PVCs are NOT deleted automatically!
# This preserves data if you scale back up
```

---

## Updating StatefulSet

### Update Image

```bash
# Update image
kubectl set image statefulset/educorenextgen-website \
  educorenextgen-website=registry.skyfobscloud.com/educorenextgen-website:v2 \
  -n educorenextgen

# Pods update in reverse order (1, then 0)
kubectl rollout status statefulset/educorenextgen-website -n educorenextgen
```

### Rollback

```bash
# View history
kubectl rollout history statefulset/educorenextgen-website -n educorenextgen

# Rollback
kubectl rollout undo statefulset/educorenextgen-website -n educorenextgen
```

---

## Troubleshooting

### PVC Not Binding

```bash
# Check PVC status
kubectl get pvc -n educorenextgen

# Check events
kubectl describe pvc data-educorenextgen-website-0 -n educorenextgen

# Check StorageClass
kubectl get storageclass longhorn

# If Longhorn not available, pods will be stuck in Pending
```

### Pod Stuck in Pending

```bash
# Check pod events
kubectl describe pod educorenextgen-website-0 -n educorenextgen

# Common issues:
# - PVC not bound (check Longhorn)
# - Not enough resources (check nodes)
# - Previous pod not ready (StatefulSet waits for order)
```

### Delete Stuck PVC

```bash
# If PVC stuck in Terminating state
kubectl patch pvc data-educorenextgen-website-0 -n educorenextgen \
  -p '{"metadata":{"finalizers":null}}'
```

### Access Individual Pod

```bash
# Shell into specific pod
kubectl exec -it educorenextgen-website-0 -n educorenextgen -- sh

# Check data
ls -la /app/data/

# Check database
sqlite3 /app/data/educore.db "SELECT COUNT(*) FROM contact_submissions;"
```

---

## Delete StatefulSet

### Keep PVCs (Default)

```bash
# Delete StatefulSet but keep PVCs
kubectl delete statefulset educorenextgen-website -n educorenextgen

# PVCs remain - data is preserved
kubectl get pvc -n educorenextgen
```

### Delete Everything

```bash
# Delete StatefulSet
kubectl delete statefulset educorenextgen-website -n educorenextgen

# Delete PVCs manually
kubectl delete pvc -l app=educorenextgen-website -n educorenextgen

# Or delete entire namespace
kubectl delete namespace educorenextgen
```

---

## Verify Deployment

```bash
# Check StatefulSet
kubectl get statefulset -n educorenextgen

# Check pods
kubectl get pods -n educorenextgen -o wide

# Check PVCs
kubectl get pvc -n educorenextgen

# Check Longhorn volumes
kubectl -n longhorn-system get volumes

# Check services
kubectl get svc -n educorenextgen

# Test DNS
kubectl run -it --rm debug --image=busybox --restart=Never -n educorenextgen -- \
  nslookup educorenextgen-website-0.educorenextgen-website-headless

# Test application
kubectl logs -n educorenextgen educorenextgen-website-0
```

---

## Performance Considerations

### Longhorn vs Traditional PVC

**Advantages:**
- ✅ Built-in replication (HA)
- ✅ Snapshots and backups
- ✅ Volume expansion
- ✅ Cross-cluster disaster recovery

**Considerations:**
- Slightly higher latency than local storage
- Requires network bandwidth for replication
- More IOPS overhead

**Optimization:**
```bash
# For better performance, use SSD nodes
# Set numberOfReplicas to 2 instead of 3
# Use locality settings to prefer local replicas
```

---

## Summary

✅ **Converted to StatefulSet** with VolumeClaimTemplates  
✅ **Using Longhorn** for distributed storage  
✅ **Each pod** gets dedicated PVCs (5Gi data, 2Gi logs)  
✅ **Stable pod names** and network identities  
✅ **Ordered deployment** for stateful apps  
✅ **Headless service** created for StatefulSet  
✅ **Built-in HA** with Longhorn replication  

**Your database is now highly available and backed by Longhorn!** 🚀

---

## Quick Commands

```bash
# Deploy
kubectl apply -f k8s/service-headless.yaml
kubectl apply -f k8s/deployment.yaml

# Status
kubectl get statefulset,pods,pvc -n educorenextgen

# Logs
kubectl logs -n educorenextgen educorenextgen-website-0 -f

# Scale
kubectl scale statefulset educorenextgen-website --replicas=3 -n educorenextgen

# Delete
kubectl delete statefulset educorenextgen-website -n educorenextgen
```
