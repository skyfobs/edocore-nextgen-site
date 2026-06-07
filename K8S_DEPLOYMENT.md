# Kubernetes Deployment Guide

Complete guide for deploying EduCore NextGen website to Kubernetes.

---

## 📋 Prerequisites

### Required Tools

```bash
# kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Verify
kubectl version --client
```

### Required Components in Cluster

1. **Nginx Ingress Controller**
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
```

2. **Cert-Manager** (for SSL)
```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml
```

3. **Metrics Server** (for HPA)
```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

---

## 🗂️ File Structure

```
k8s/
├── namespace.yaml          # Namespace definition
├── secret.yaml             # Telegram credentials (sensitive!)
├── configmap.yaml          # Application configuration
├── pvc.yaml                # Persistent storage for database
├── deployment.yaml         # Main application deployment
├── service.yaml            # Service definition
├── ingress.yaml            # Ingress with SSL
├── cert-issuer.yaml        # Let's Encrypt SSL issuer
├── hpa.yaml                # Horizontal Pod Autoscaler
├── kustomization.yaml      # Kustomize configuration
└── deploy.sh               # Deployment script
```

---

## 🚀 Quick Deployment

### Step 1: Update Secrets

Edit `k8s/secret.yaml`:
```yaml
stringData:
  TELEGRAM_BOT_TOKEN: "YOUR_ACTUAL_TOKEN"
  TELEGRAM_CHAT_ID: "YOUR_ACTUAL_CHAT_ID"
```

### Step 2: Update Email in Cert Issuer

Edit `k8s/cert-issuer.yaml`:
```yaml
email: your-email@example.com  # Change this
```

### Step 3: Update Image in Deployment

Edit `k8s/deployment.yaml`:
```yaml
image: your-registry/educore-website:latest  # Your Docker image
```

### Step 4: Deploy

```bash
cd k8s
chmod +x deploy.sh
./deploy.sh
# Select option 1
```

---

## 📦 Manual Deployment

### Step-by-Step

```bash
# 1. Create namespace
kubectl apply -f k8s/namespace.yaml

# 2. Create secrets
kubectl apply -f k8s/secret.yaml

# 3. Create ConfigMap
kubectl apply -f k8s/configmap.yaml

# 4. Create PersistentVolumeClaims
kubectl apply -f k8s/pvc.yaml

# Wait for PVCs
kubectl wait --for=condition=Bound pvc/educore-data-pvc -n educore --timeout=60s

# 5. Create cert-manager issuer
kubectl apply -f k8s/cert-issuer.yaml

# 6. Create deployment
kubectl apply -f k8s/deployment.yaml

# 7. Create service
kubectl apply -f k8s/service.yaml

# 8. Create ingress
kubectl apply -f k8s/ingress.yaml

# 9. Create HPA
kubectl apply -f k8s/hpa.yaml
```

---

## 🔄 Using Kustomize

```bash
# Deploy everything
kubectl apply -k k8s/

# Delete everything
kubectl delete -k k8s/
```

---

## 🏗️ Architecture

```
Internet
    ↓
Ingress (Nginx)
    ↓ SSL Termination
    ↓ Load Balancing
    ↓
Service (ClusterIP)
    ↓
Pods (2-10 replicas)
    ↓
PersistentVolume (Database)
```

---

## 📊 Resource Configuration

### Deployment
- **Replicas:** 2 (min) to 10 (max) with HPA
- **CPU Request:** 250m
- **CPU Limit:** 500m
- **Memory Request:** 256Mi
- **Memory Limit:** 512Mi

### Storage
- **Database PVC:** 5Gi
- **Logs PVC:** 2Gi
- **Access Mode:** ReadWriteOnce

### Autoscaling
- **CPU Threshold:** 70%
- **Memory Threshold:** 80%
- **Scale up:** Fast (100% increase)
- **Scale down:** Slow (50% decrease, 5min cooldown)

---

## 🔐 Security Features

### Pod Security
```yaml
securityContext:
  runAsUser: 1001        # Non-root user
  runAsGroup: 1001
  fsGroup: 1001
  allowPrivilegeEscalation: false
  readOnlyRootFilesystem: false
  capabilities:
    drop: [ALL]
    add: [NET_BIND_SERVICE]
```

### Network Security
- SSL/TLS via Let's Encrypt
- Force HTTPS redirect
- Security headers (HSTS, X-Frame-Options, etc.)
- Rate limiting (10 req/s per IP)

---

## 🔍 Monitoring & Debugging

### Check Status

```bash
# All resources
kubectl get all -n educore

# Pods
kubectl get pods -n educore -o wide

# Watch pods
kubectl get pods -n educore -w

# Services
kubectl get svc -n educore

# Ingress
kubectl get ingress -n educore

# PVCs
kubectl get pvc -n educore

# HPA
kubectl get hpa -n educore

# Certificates
kubectl get certificate -n educore
```

### View Logs

```bash
# All pods
kubectl logs -n educore -l app=educore-nextgen --tail=100

# Follow logs
kubectl logs -n educore -l app=educore-nextgen -f

# Specific pod
kubectl logs -n educore <pod-name>

# Previous pod (if crashed)
kubectl logs -n educore <pod-name> --previous
```

### Describe Resources

```bash
# Deployment
kubectl describe deployment educore-nextgen -n educore

# Pod
kubectl describe pod <pod-name> -n educore

# Service
kubectl describe svc educore-nextgen-service -n educore

# Ingress
kubectl describe ingress educore-nextgen-ingress -n educore
```

### Shell into Pod

```bash
# Interactive shell
kubectl exec -it <pod-name> -n educore -- sh

# Run command
kubectl exec <pod-name> -n educore -- ls -la /app/data

# Check database
kubectl exec <pod-name> -n educore -- sqlite3 /app/data/educore.db "SELECT COUNT(*) FROM contact_submissions;"
```

---

## 🔄 Updates & Rollbacks

### Update Application

```bash
# Method 1: Update image
kubectl set image deployment/educore-nextgen educore-web=your-registry/educore-website:v2 -n educore

# Method 2: Apply updated deployment
kubectl apply -f k8s/deployment.yaml

# Watch rollout
kubectl rollout status deployment/educore-nextgen -n educore
```

### Rollback

```bash
# View history
kubectl rollout history deployment/educore-nextgen -n educore

# Rollback to previous version
kubectl rollout undo deployment/educore-nextgen -n educore

# Rollback to specific revision
kubectl rollout undo deployment/educore-nextgen -n educore --to-revision=2
```

### Restart Pods

```bash
# Restart all pods
kubectl rollout restart deployment/educore-nextgen -n educore

# Delete pod (will be recreated)
kubectl delete pod <pod-name> -n educore
```

---

## 📜 SSL/TLS Configuration

### Using Cert-Manager

Certificates are automatically created and renewed via cert-manager.

**Check certificate status:**
```bash
kubectl get certificate -n educore
kubectl describe certificate educore-tls-cert -n educore
```

**Certificate States:**
- `Ready: True` - Certificate is valid
- `Ready: False` - Check events for errors

**Troubleshoot:**
```bash
# Check cert-manager logs
kubectl logs -n cert-manager -l app=cert-manager

# Check certificate request
kubectl get certificaterequest -n educore

# Check challenge
kubectl get challenge -n educore
```

### Manual Certificate (Alternative)

If not using cert-manager:

```bash
# Create TLS secret manually
kubectl create secret tls educore-tls-cert \
  --cert=path/to/fullchain.pem \
  --key=path/to/privkey.pem \
  -n educore
```

---

## 🗄️ Database Management

### Access Database

```bash
# Shell into pod
kubectl exec -it <pod-name> -n educore -- sh

# Inside pod
cd /app/data
sqlite3 educore.db

# SQL commands
SELECT * FROM contact_submissions;
SELECT * FROM chatbot_conversations;
```

### Backup Database

```bash
# Copy database from pod
kubectl cp educore/<pod-name>:/app/data/educore.db ./educore-backup-$(date +%Y%m%d).db

# Backup from within pod
kubectl exec <pod-name> -n educore -- sqlite3 /app/data/educore.db ".backup /app/data/backup.db"
kubectl cp educore/<pod-name>:/app/data/backup.db ./backup.db
```

### Restore Database

```bash
# Copy backup to pod
kubectl cp ./educore-backup.db educore/<pod-name>:/app/data/educore.db

# Restart pod to use new database
kubectl delete pod <pod-name> -n educore
```

---

## 🔧 Troubleshooting

### Pods Not Starting

**Check events:**
```bash
kubectl describe pod <pod-name> -n educore
kubectl get events -n educore --sort-by='.lastTimestamp'
```

**Common issues:**
- ImagePullBackOff → Check image name/tag
- CrashLoopBackOff → Check logs
- Pending → Check PVC status

### Database Read-Only Error

```bash
# Check PVC is bound
kubectl get pvc -n educore

# Check volume permissions
kubectl exec <pod-name> -n educore -- ls -la /app/data

# Fix permissions (init container should handle this)
kubectl delete pod <pod-name> -n educore  # Recreate pod
```

### Ingress Not Working

```bash
# Check ingress
kubectl describe ingress educore-nextgen-ingress -n educore

# Check ingress controller
kubectl get pods -n ingress-nginx

# Check service endpoints
kubectl get endpoints educore-nextgen-service -n educore
```

### SSL Certificate Issues

```bash
# Check certificate
kubectl describe certificate educore-tls-cert -n educore

# Check certificate request
kubectl get certificaterequest -n educore

# Check challenges
kubectl describe challenge -n educore

# Check cert-manager logs
kubectl logs -n cert-manager -l app=cert-manager --tail=100
```

---

## 📈 Scaling

### Manual Scaling

```bash
# Scale to 5 replicas
kubectl scale deployment educore-nextgen --replicas=5 -n educore

# Verify
kubectl get pods -n educore
```

### HPA (Automatic)

```bash
# Check HPA status
kubectl get hpa -n educore

# Describe HPA
kubectl describe hpa educore-nextgen-hpa -n educore

# Adjust HPA
kubectl edit hpa educore-nextgen-hpa -n educore
```

---

## 🧪 Testing

### Test Health Endpoint

```bash
# From outside cluster
curl https://educorenextgen.com/api/health

# From inside cluster
kubectl run -it --rm debug --image=curlimages/curl --restart=Never -n educore -- curl http://educore-nextgen-service/api/health
```

### Load Testing

```bash
# Install hey
go install github.com/rakyll/hey@latest

# Load test
hey -n 1000 -c 10 https://educorenextgen.com/

# Watch HPA scale
kubectl get hpa -n educore -w
```

---

## 🗑️ Cleanup

### Delete Everything

```bash
# Using script
./k8s/deploy.sh
# Select option 4

# Or manually
kubectl delete namespace educore

# Or with kustomize
kubectl delete -k k8s/
```

### Delete Specific Resources

```bash
kubectl delete deployment educore-nextgen -n educore
kubectl delete service educore-nextgen-service -n educore
kubectl delete ingress educore-nextgen-ingress -n educore
```

---

## 📝 Best Practices

### Before Production

- [ ] Update secrets with real credentials
- [ ] Update email in cert-issuer
- [ ] Use production image tag (not `:latest`)
- [ ] Test SSL certificate (staging first)
- [ ] Configure resource limits appropriately
- [ ] Set up monitoring and alerts
- [ ] Configure backups for PV
- [ ] Review security settings
- [ ] Test auto-scaling
- [ ] Document runbook procedures

### Ongoing Maintenance

- [ ] Monitor pod health and logs
- [ ] Check HPA metrics regularly
- [ ] Backup database periodically
- [ ] Update application regularly
- [ ] Review and rotate secrets
- [ ] Monitor SSL certificate expiry
- [ ] Review ingress logs for issues
- [ ] Scale resources as needed

---

## 🔗 Useful Commands Cheat Sheet

```bash
# Quick status
kubectl get all -n educore

# Watch pods
kubectl get pods -n educore -w

# Logs
kubectl logs -n educore -l app=educore-nextgen -f

# Shell
kubectl exec -it <pod-name> -n educore -- sh

# Port forward (local testing)
kubectl port-forward -n educore svc/educore-nextgen-service 8080:80

# Get pod name
kubectl get pods -n educore -o name

# Restart deployment
kubectl rollout restart deployment/educore-nextgen -n educore

# Check certificate
kubectl get certificate -n educore

# Check HPA
kubectl get hpa -n educore

# Copy file from pod
kubectl cp educore/<pod-name>:/app/data/educore.db ./backup.db

# Top (resource usage)
kubectl top pods -n educore
kubectl top nodes
```

---

## 🎯 Summary

✅ **Complete K8s deployment** with all manifests  
✅ **SSL/TLS** via cert-manager and Let's Encrypt  
✅ **Auto-scaling** with HPA (2-10 replicas)  
✅ **Persistent storage** for database  
✅ **Security** hardened (non-root, security headers)  
✅ **Health checks** and probes  
✅ **Easy deployment** with script  
✅ **Production-ready** configuration  

**Your application is ready for Kubernetes! 🚀**
