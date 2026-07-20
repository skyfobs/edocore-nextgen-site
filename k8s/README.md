# Kubernetes Deployment Files

Complete Kubernetes manifests for deploying EduCore NextGen website using **StatefulSet** with **Longhorn** storage.

## ⚠️ Important: StatefulSet with Longhorn

This deployment uses a **StatefulSet** instead of a Deployment to leverage:
- ✅ **Longhorn distributed storage** with VolumeClaimTemplates
- ✅ **Dedicated PVC per pod** (automatic provisioning)
- ✅ **Stable pod identities** and network names
- ✅ **Ordered deployment** for stateful apps
- ✅ **Built-in HA** with Longhorn replication

**Prerequisites:**
- Longhorn must be installed in your cluster
- StorageClass `longhorn` must exist

## Quick Start

```bash
# 0. Install Longhorn (if not already installed)
kubectl apply -f https://raw.githubusercontent.com/longhorn/longhorn/v1.5.3/deploy/longhorn.yaml

# 1. Update secrets
nano secret.yaml  # Add your Telegram credentials

# 2. Update email
nano cert-issuer.yaml  # Change email address

# 3. Update image
nano deployment.yaml  # Set your Docker image

# 4. Deploy
chmod +x deploy-statefulset.sh
./deploy-statefulset.sh
# Select option 1
```

## Files

| File | Description |
|------|-------------|
| `namespace.yaml` | Creates educore namespace |
| `secret.yaml` | Telegram credentials (⚠️ sensitive!) |
| `configmap.yaml` | Application configuration |
| `pvc.yaml` | Persistent storage (legacy - not used with StatefulSet) |
| `deployment.yaml` | **StatefulSet** with VolumeClaimTemplates |
| `statefulset.yaml` | Backup copy of StatefulSet config |
| `service.yaml` | Service definition (ClusterIP) |
| `service-headless.yaml` | **Headless service** (required for StatefulSet) |
| `ingress.yaml` | Ingress with SSL/TLS |
| `cert-issuer.yaml` | Let's Encrypt SSL issuer |
| `hpa.yaml` | Horizontal Pod Autoscaler (works with StatefulSet) |
| `kustomization.yaml` | Kustomize configuration |
| `deploy.sh` | Original deployment script |
| `deploy-statefulset.sh` | **StatefulSet deployment script** ⭐ |
| `STATEFULSET_MIGRATION.md` | Migration guide and documentation |

## Prerequisites

- Kubernetes cluster (v1.20+)
- kubectl configured
- **Longhorn** (distributed block storage) ⭐
- Nginx Ingress Controller
- cert-manager (for SSL)
- metrics-server (for HPA)

### Install Longhorn

```bash
# Install Longhorn
kubectl apply -f https://raw.githubusercontent.com/longhorn/longhorn/v1.5.3/deploy/longhorn.yaml

# Wait for pods to be ready
kubectl -n longhorn-system get pods -w

# Verify StorageClass
kubectl get storageclass longhorn
```

## Important: Update Before Deploying

### 1. Secrets (`secret.yaml`)
```yaml
stringData:
  TELEGRAM_BOT_TOKEN: "YOUR_TOKEN"  # ← Change this
  TELEGRAM_CHAT_ID: "YOUR_CHAT_ID"  # ← Change this
```

### 2. Email (`cert-issuer.yaml`)
```yaml
email: your-email@example.com  # ← Change this
```

### 3. Image (`deployment.yaml`)
```yaml
image: your-registry/educore-website:latest  # ← Change this
```

## Deployment Options

### Option 1: Using Script
```bash
./deploy.sh
# Interactive menu
```

### Option 2: Manual
```bash
kubectl apply -f namespace.yaml
kubectl apply -f secret.yaml
kubectl apply -f configmap.yaml
kubectl apply -f pvc.yaml
kubectl apply -f cert-issuer.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f ingress.yaml
kubectl apply -f hpa.yaml
```

### Option 3: Kustomize
```bash
kubectl apply -k .
```

## Verify Deployment

```bash
# Check all resources
kubectl get all -n educore

# Check pods
kubectl get pods -n educore

# Check ingress
kubectl get ingress -n educore

# Check certificate
kubectl get certificate -n educore

# View logs
kubectl logs -n educore -l app=educore-nextgen -f
```

## Common Commands

```bash
# Status
kubectl get pods -n educore

# Logs
kubectl logs -n educore -l app=educore-nextgen -f

# Shell into pod
POD=$(kubectl get pod -n educore -l app=educore-nextgen -o jsonpath="{.items[0].metadata.name}")
kubectl exec -it $POD -n educore -- sh

# Restart deployment
kubectl rollout restart deployment/educore-nextgen -n educore

# Scale manually
kubectl scale deployment educore-nextgen --replicas=5 -n educore

# Delete everything
kubectl delete namespace educore
```

## Troubleshooting

### Pods not starting
```bash
kubectl describe pod <pod-name> -n educore
kubectl logs <pod-name> -n educore
```

### SSL not working
```bash
kubectl describe certificate educore-tls-cert -n educore
kubectl get certificaterequest -n educore
kubectl logs -n cert-manager -l app=cert-manager
```

### Database read-only
```bash
# Check PVC
kubectl get pvc -n educore

# Check permissions
kubectl exec <pod-name> -n educore -- ls -la /app/data

# Restart pod
kubectl delete pod <pod-name> -n educore
```

## Architecture

```
┌─────────────┐
│   Internet  │
└──────┬──────┘
       │
┌──────▼──────┐
│   Ingress   │ (SSL, nginx)
│ (Port 80/443)│
└──────┬──────┘
       │
┌──────▼──────┐
│   Service   │ (ClusterIP)
│  (Port 80)  │
└──────┬──────┘
       │
┌──────▼──────┐
│    Pods     │ (2-10 replicas)
│  (Port 3000)│
└──────┬──────┘
       │
┌──────▼──────┐
│     PVC     │ (Database)
└─────────────┘
```

## Configuration

- **Type:** StatefulSet (not Deployment)
- **Replicas:** 2-10 (auto-scaled by HPA)
- **CPU:** 250m request, 500m limit
- **Memory:** 256Mi request, 512Mi limit
- **Storage:** 5Gi (data), 2Gi (logs) - **per pod via Longhorn**
- **StorageClass:** longhorn (distributed block storage)
- **SSL:** Let's Encrypt (auto-renewed)
- **Rate Limit:** 10 req/s per IP

## StatefulSet Features

### Automatic Volume Provisioning
Each pod gets its own PVCs automatically:
```
Pod 0: data-educorenextgen-website-0 (5Gi)
       logs-educorenextgen-website-0 (2Gi)
Pod 1: data-educorenextgen-website-1 (5Gi)
       logs-educorenextgen-website-1 (2Gi)
```

### Stable Pod Names
- `educorenextgen-website-0` (always pod 0)
- `educorenextgen-website-1` (always pod 1)
- Not random like Deployments

### Stable Network Identity
Each pod gets a DNS name:
```
educorenextgen-website-0.educorenextgen-website-headless.educorenextgen.svc.cluster.local
```

### Ordered Deployment
Pods start/stop in order (0 → 1 → 2)

## Security

- Non-root user (1001:1001)
- Security headers (HSTS, CSP, etc.)
- TLS 1.2+ only
- Capabilities dropped
- Read-only root filesystem (optional)

## Monitoring

```bash
# HPA status
kubectl get hpa -n educore

# Resource usage
kubectl top pods -n educore
kubectl top nodes

# Events
kubectl get events -n educore --sort-by='.lastTimestamp'
```

## Documentation

See `../K8S_DEPLOYMENT.md` for complete guide.

---

**Quick Deploy:**
```bash
./deploy-statefulset.sh
```

**Quick Status:**
```bash
kubectl get statefulset,pods,pvc -n educorenextgen
```

**Quick Logs:**
```bash
kubectl logs -n educorenextgen educorenextgen-website-0 -f
```

**Scale:**
```bash
kubectl scale statefulset educorenextgen-website --replicas=3 -n educorenextgen
```

**Backup Database:**
```bash
kubectl cp educorenextgen/educorenextgen-website-0:/app/data/educore.db ./backup.db
```
