#!/bin/bash

# StatefulSet Deployment Script for EduCore NextGen
# Uses Longhorn storage with VolumeClaimTemplates

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  EduCore StatefulSet Deployment${NC}"
echo -e "${BLUE}  Using Longhorn Storage${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command -v kubectl &> /dev/null; then
    echo -e "${RED}❌ kubectl not found${NC}"
    exit 1
fi

echo -e "${GREEN}✓ kubectl found${NC}"

# Check if Longhorn is installed
if ! kubectl get ns longhorn-system &> /dev/null; then
    echo -e "${RED}❌ Longhorn not found${NC}"
    echo -e "${YELLOW}Install Longhorn first:${NC}"
    echo "  kubectl apply -f https://raw.githubusercontent.com/longhorn/longhorn/v1.5.3/deploy/longhorn.yaml"
    exit 1
fi

echo -e "${GREEN}✓ Longhorn installed${NC}"

# Check StorageClass
if ! kubectl get storageclass longhorn &> /dev/null; then
    echo -e "${RED}❌ Longhorn StorageClass not found${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Longhorn StorageClass available${NC}"
echo ""

# Menu
echo "Select deployment option:"
echo "1) Fresh deployment (new installation)"
echo "2) Update StatefulSet only"
echo "3) Scale StatefulSet"
echo "4) Delete StatefulSet (keep PVCs)"
echo "5) Delete everything (including PVCs)"
echo "6) View status"
echo "7) View logs"
echo "8) Backup database"
echo ""
read -p "Enter choice [1-8]: " choice

case $choice in
    1)
        echo -e "${BLUE}Fresh deployment...${NC}"
        echo ""
        
        # Create namespace
        echo -e "${YELLOW}Creating namespace...${NC}"
        kubectl apply -f namespace.yaml
        
        # Create ConfigMap
        echo -e "${YELLOW}Creating ConfigMap...${NC}"
        kubectl apply -f configmap.yaml
        
        # Create secrets
        echo -e "${YELLOW}⚠️  Make sure secrets are updated!${NC}"
        read -p "Have you updated secrets? (y/N): " confirm
        if [[ ! $confirm =~ ^[Yy]$ ]]; then
            echo -e "${RED}Please update secrets first${NC}"
            exit 1
        fi
        kubectl apply -f secret.yaml
        
        # Create headless service (required for StatefulSet)
        echo -e "${YELLOW}Creating headless service...${NC}"
        kubectl apply -f service-headless.yaml
        
        # Create regular service (for ingress)
        echo -e "${YELLOW}Creating service...${NC}"
        kubectl apply -f service.yaml
        
        # Create StatefulSet
        echo -e "${YELLOW}Creating StatefulSet...${NC}"
        kubectl apply -f deployment.yaml
        
        # Wait for pods
        echo -e "${YELLOW}Waiting for pods to be ready...${NC}"
        kubectl wait --for=condition=ready pod -l app=educorenextgen-website -n educorenextgen --timeout=300s
        
        # Check PVCs
        echo ""
        echo -e "${GREEN}✓ StatefulSet created!${NC}"
        echo ""
        echo "PVCs created:"
        kubectl get pvc -n educorenextgen
        
        echo ""
        echo "Pods:"
        kubectl get pods -n educorenextgen -o wide
        
        # Create HPA
        echo ""
        read -p "Create HorizontalPodAutoscaler? (y/N): " hpa_confirm
        if [[ $hpa_confirm =~ ^[Yy]$ ]]; then
            kubectl apply -f hpa.yaml
            echo -e "${GREEN}✓ HPA created${NC}"
        fi
        
        # Create Ingress
        echo ""
        read -p "Create Ingress? (y/N): " ingress_confirm
        if [[ $ingress_confirm =~ ^[Yy]$ ]]; then
            kubectl apply -f ingress.yaml
            kubectl apply -f cert-issuer.yaml
            echo -e "${GREEN}✓ Ingress created${NC}"
        fi
        
        echo ""
        echo -e "${GREEN}========================================${NC}"
        echo -e "${GREEN}  Deployment Complete!${NC}"
        echo -e "${GREEN}========================================${NC}"
        ;;
        
    2)
        echo -e "${BLUE}Updating StatefulSet...${NC}"
        kubectl apply -f deployment.yaml
        
        echo -e "${YELLOW}Rolling update in progress...${NC}"
        kubectl rollout status statefulset/educorenextgen-website -n educorenextgen
        
        echo -e "${GREEN}✓ StatefulSet updated!${NC}"
        ;;
        
    3)
        echo -e "${BLUE}Scaling StatefulSet...${NC}"
        read -p "Enter number of replicas: " replicas
        
        kubectl scale statefulset educorenextgen-website --replicas=$replicas -n educorenextgen
        
        echo -e "${YELLOW}Waiting for pods...${NC}"
        kubectl get pods -n educorenextgen -w
        ;;
        
    4)
        echo -e "${RED}⚠️  Delete StatefulSet (PVCs will be kept)${NC}"
        read -p "Are you sure? (y/N): " confirm
        if [[ $confirm =~ ^[Yy]$ ]]; then
            kubectl delete statefulset educorenextgen-website -n educorenextgen
            echo -e "${GREEN}✓ StatefulSet deleted${NC}"
            echo ""
            echo "PVCs (still present):"
            kubectl get pvc -n educorenextgen
        fi
        ;;
        
    5)
        echo -e "${RED}⚠️  Delete EVERYTHING (including data!)${NC}"
        read -p "Are you ABSOLUTELY sure? Type 'delete-all' to confirm: " confirm
        if [[ $confirm == "delete-all" ]]; then
            kubectl delete statefulset educorenextgen-website -n educorenextgen || true
            kubectl delete pvc -l app=educorenextgen-website -n educorenextgen || true
            kubectl delete svc educorenextgen-website-headless -n educorenextgen || true
            kubectl delete svc educorenextgen-website-service -n educorenextgen || true
            kubectl delete hpa educorenextgen-website-hpa -n educorenextgen || true
            kubectl delete ingress -n educorenextgen --all || true
            
            read -p "Delete namespace too? (y/N): " ns_confirm
            if [[ $ns_confirm =~ ^[Yy]$ ]]; then
                kubectl delete namespace educorenextgen
            fi
            
            echo -e "${GREEN}✓ Everything deleted${NC}"
        else
            echo -e "${YELLOW}Cancelled${NC}"
        fi
        ;;
        
    6)
        echo -e "${BLUE}Current Status:${NC}"
        echo ""
        echo "=== Namespace ==="
        kubectl get namespace educorenextgen
        echo ""
        echo "=== StatefulSet ==="
        kubectl get statefulset -n educorenextgen
        echo ""
        echo "=== Pods ==="
        kubectl get pods -n educorenextgen -o wide
        echo ""
        echo "=== PVCs ==="
        kubectl get pvc -n educorenextgen
        echo ""
        echo "=== Longhorn Volumes ==="
        kubectl -n longhorn-system get volumes | grep educorenextgen || echo "No volumes found"
        echo ""
        echo "=== Services ==="
        kubectl get svc -n educorenextgen
        echo ""
        echo "=== HPA ==="
        kubectl get hpa -n educorenextgen
        echo ""
        echo "=== Ingress ==="
        kubectl get ingress -n educorenextgen
        ;;
        
    7)
        echo -e "${BLUE}Viewing logs...${NC}"
        
        PODS=$(kubectl get pods -n educorenextgen -l app=educorenextgen-website -o name)
        
        if [ -z "$PODS" ]; then
            echo -e "${RED}No pods found${NC}"
            exit 1
        fi
        
        echo "Available pods:"
        kubectl get pods -n educorenextgen -l app=educorenextgen-website
        echo ""
        
        read -p "Which pod? (0, 1, 2, etc. or 'all'): " pod_num
        
        if [[ $pod_num == "all" ]]; then
            kubectl logs -n educorenextgen -l app=educorenextgen-website --tail=100 -f
        else
            kubectl logs -n educorenextgen educorenextgen-website-$pod_num --tail=100 -f
        fi
        ;;
        
    8)
        echo -e "${BLUE}Backing up database...${NC}"
        
        PODS=$(kubectl get pods -n educorenextgen -l app=educorenextgen-website -o name | head -1)
        
        if [ -z "$PODS" ]; then
            echo -e "${RED}No pods found${NC}"
            exit 1
        fi
        
        POD_NAME=$(echo $PODS | cut -d'/' -f2)
        BACKUP_FILE="educore-backup-$(date +%Y%m%d-%H%M%S).db"
        
        echo "Backing up from pod: $POD_NAME"
        kubectl cp educorenextgen/$POD_NAME:/app/data/educore.db ./$BACKUP_FILE
        
        if [ -f "$BACKUP_FILE" ]; then
            echo -e "${GREEN}✓ Backup saved to: $BACKUP_FILE${NC}"
            ls -lh $BACKUP_FILE
        else
            echo -e "${RED}❌ Backup failed${NC}"
        fi
        ;;
        
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}Done!${NC}"
