#!/bin/bash

# Kubernetes Deployment Script for EduCore NextGen

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  EduCore NextGen - K8s Deployment${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command -v kubectl &> /dev/null; then
    echo -e "${RED}❌ kubectl not found${NC}"
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ docker not found${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Prerequisites OK${NC}"
echo ""

# Menu
echo "Select deployment option:"
echo "1) Deploy everything (fresh install)"
echo "2) Update deployment only"
echo "3) Update secrets only"
echo "4) Delete all resources"
echo "5) View status"
echo "6) View logs"
echo "7) Test staging SSL (Let's Encrypt staging)"
echo ""
read -p "Enter choice [1-7]: " choice

case $choice in
    1)
        echo -e "${BLUE}Deploying all resources...${NC}"
        
        # Create namespace
        kubectl apply -f namespace.yaml
        
        # Create secrets (update these first!)
        echo -e "${YELLOW}⚠️  Make sure to update secret.yaml with your credentials!${NC}"
        read -p "Have you updated secret.yaml? (y/N): " confirm
        if [[ ! $confirm =~ ^[Yy]$ ]]; then
            echo -e "${RED}Please update secret.yaml first${NC}"
            exit 1
        fi
        kubectl apply -f secret.yaml
        
        # Create ConfigMap
        kubectl apply -f configmap.yaml
        
        # Create PVC
        kubectl apply -f pvc.yaml
        
        # Wait for PVC to be bound
        echo -e "${YELLOW}Waiting for PVCs to be ready...${NC}"
        kubectl wait --for=condition=Bound pvc/educore-data-pvc -n educore --timeout=60s
        kubectl wait --for=condition=Bound pvc/educore-logs-pvc -n educore --timeout=60s
        
        # Create cert-manager issuer
        echo -e "${YELLOW}⚠️  Make sure cert-manager is installed!${NC}"
        kubectl apply -f cert-issuer.yaml
        
        # Create deployment
        kubectl apply -f deployment.yaml
        
        # Create service
        kubectl apply -f service.yaml
        
        # Create ingress
        kubectl apply -f ingress.yaml
        
        # Create HPA
        kubectl apply -f hpa.yaml
        
        echo ""
        echo -e "${GREEN}✓ Deployment complete!${NC}"
        echo ""
        echo "Wait for pods to be ready:"
        echo "  kubectl get pods -n educore -w"
        echo ""
        echo "Check ingress:"
        echo "  kubectl get ingress -n educore"
        ;;
        
    2)
        echo -e "${BLUE}Updating deployment...${NC}"
        kubectl apply -f deployment.yaml
        kubectl rollout status deployment/educore-nextgen -n educore
        echo -e "${GREEN}✓ Deployment updated!${NC}"
        ;;
        
    3)
        echo -e "${BLUE}Updating secrets...${NC}"
        kubectl apply -f secret.yaml
        kubectl rollout restart deployment/educore-nextgen -n educore
        echo -e "${GREEN}✓ Secrets updated and pods restarted!${NC}"
        ;;
        
    4)
        echo -e "${RED}⚠️  This will delete all resources!${NC}"
        read -p "Are you sure? (y/N): " confirm
        if [[ $confirm =~ ^[Yy]$ ]]; then
            kubectl delete -f ingress.yaml
            kubectl delete -f hpa.yaml
            kubectl delete -f service.yaml
            kubectl delete -f deployment.yaml
            kubectl delete -f pvc.yaml
            kubectl delete -f configmap.yaml
            kubectl delete -f secret.yaml
            kubectl delete -f cert-issuer.yaml
            kubectl delete -f namespace.yaml
            echo -e "${GREEN}✓ All resources deleted${NC}"
        fi
        ;;
        
    5)
        echo -e "${BLUE}Current Status:${NC}"
        echo ""
        echo "=== Namespace ==="
        kubectl get namespace educore
        echo ""
        echo "=== Pods ==="
        kubectl get pods -n educore -o wide
        echo ""
        echo "=== Services ==="
        kubectl get svc -n educore
        echo ""
        echo "=== Ingress ==="
        kubectl get ingress -n educore
        echo ""
        echo "=== PVC ==="
        kubectl get pvc -n educore
        echo ""
        echo "=== HPA ==="
        kubectl get hpa -n educore
        echo ""
        echo "=== Certificates ==="
        kubectl get certificate -n educore
        ;;
        
    6)
        echo -e "${BLUE}Viewing logs...${NC}"
        kubectl logs -n educore -l app=educore-nextgen --tail=100 -f
        ;;
        
    7)
        echo -e "${YELLOW}Using staging SSL (for testing)...${NC}"
        # Temporarily update ingress to use staging
        sed -i.bak 's/letsencrypt-prod/letsencrypt-staging/g' ingress.yaml
        kubectl apply -f ingress.yaml
        echo -e "${GREEN}✓ Switched to staging SSL${NC}"
        echo "To switch back to production:"
        echo "  mv ingress.yaml.bak ingress.yaml"
        echo "  kubectl apply -f ingress.yaml"
        ;;
        
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}Done!${NC}"
