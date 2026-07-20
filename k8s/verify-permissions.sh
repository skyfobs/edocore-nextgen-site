#!/bin/bash

# Verify Longhorn Permissions for StatefulSet
# This script checks if volumes are properly accessible

set -e

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

NAMESPACE="educorenextgen"
APP_LABEL="app=educorenextgen-website"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Longhorn Permissions Verification${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if pod exists
echo -e "${YELLOW}1. Checking pod status...${NC}"
POD=$(kubectl get pod -n $NAMESPACE -l $APP_LABEL -o jsonpath="{.items[0].metadata.name}" 2>/dev/null || echo "")

if [ -z "$POD" ]; then
    echo -e "${RED}❌ No pod found${NC}"
    echo "Deploy StatefulSet first:"
    echo "  kubectl apply -f statefulset.yaml"
    exit 1
fi

echo -e "${GREEN}✓ Pod found: $POD${NC}"
echo ""

# Check pod is running
echo -e "${YELLOW}2. Checking pod is running...${NC}"
POD_STATUS=$(kubectl get pod $POD -n $NAMESPACE -o jsonpath="{.status.phase}")

if [ "$POD_STATUS" != "Running" ]; then
    echo -e "${RED}❌ Pod not running (status: $POD_STATUS)${NC}"
    echo "Wait for pod to be ready:"
    echo "  kubectl get pods -n $NAMESPACE -w"
    exit 1
fi

echo -e "${GREEN}✓ Pod is running${NC}"
echo ""

# Check fsGroup in pod spec
echo -e "${YELLOW}3. Checking fsGroup configuration...${NC}"
FSGROUP=$(kubectl get pod $POD -n $NAMESPACE -o jsonpath="{.spec.securityContext.fsGroup}")

if [ -z "$FSGROUP" ]; then
    echo -e "${RED}❌ fsGroup not set${NC}"
    echo "Update StatefulSet with fsGroup: 1001"
    exit 1
fi

if [ "$FSGROUP" != "1001" ]; then
    echo -e "${YELLOW}⚠️  fsGroup is $FSGROUP (expected 1001)${NC}"
else
    echo -e "${GREEN}✓ fsGroup is correctly set to 1001${NC}"
fi
echo ""

# Check volume permissions
echo -e "${YELLOW}4. Checking /app/data permissions...${NC}"
DATA_PERMS=$(kubectl exec $POD -n $NAMESPACE -- ls -ld /app/data 2>/dev/null || echo "ERROR")

if [ "$DATA_PERMS" = "ERROR" ]; then
    echo -e "${RED}❌ Cannot access /app/data${NC}"
    exit 1
fi

echo "$DATA_PERMS"

# Parse permissions
GROUP=$(echo "$DATA_PERMS" | awk '{print $4}')
PERMS=$(echo "$DATA_PERMS" | awk '{print $1}')

if [[ "$GROUP" == "1001" ]]; then
    echo -e "${GREEN}✓ Group ownership is correct (1001)${NC}"
else
    echo -e "${RED}❌ Group ownership is wrong (got: $GROUP, expected: 1001)${NC}"
fi

if [[ "$PERMS" == *"rws"* ]] || [[ "$PERMS" == *"rwx"* ]]; then
    echo -e "${GREEN}✓ Group has write permissions${NC}"
else
    echo -e "${RED}❌ Group does not have write permissions${NC}"
    echo "Permissions: $PERMS"
fi
echo ""

# Check logs permissions
echo -e "${YELLOW}5. Checking /app/logs permissions...${NC}"
LOGS_PERMS=$(kubectl exec $POD -n $NAMESPACE -- ls -ld /app/logs 2>/dev/null || echo "ERROR")

if [ "$LOGS_PERMS" = "ERROR" ]; then
    echo -e "${RED}❌ Cannot access /app/logs${NC}"
else
    echo "$LOGS_PERMS"
    LOGS_GROUP=$(echo "$LOGS_PERMS" | awk '{print $4}')
    
    if [[ "$LOGS_GROUP" == "1001" ]]; then
        echo -e "${GREEN}✓ Logs group ownership is correct (1001)${NC}"
    else
        echo -e "${YELLOW}⚠️  Logs group ownership is $LOGS_GROUP${NC}"
    fi
fi
echo ""

# Test write access
echo -e "${YELLOW}6. Testing write access to /app/data...${NC}"
TEST_FILE="/app/data/permission-test-$(date +%s).txt"

if kubectl exec $POD -n $NAMESPACE -- touch $TEST_FILE 2>/dev/null; then
    echo -e "${GREEN}✓ Can create files in /app/data${NC}"
    
    # Check file ownership
    FILE_PERMS=$(kubectl exec $POD -n $NAMESPACE -- ls -l $TEST_FILE)
    echo "Created file: $FILE_PERMS"
    
    FILE_OWNER=$(echo "$FILE_PERMS" | awk '{print $3}')
    FILE_GROUP=$(echo "$FILE_PERMS" | awk '{print $4}')
    
    if [[ "$FILE_OWNER" == "1001" && "$FILE_GROUP" == "1001" ]]; then
        echo -e "${GREEN}✓ File ownership is correct (1001:1001)${NC}"
    else
        echo -e "${YELLOW}⚠️  File ownership is $FILE_OWNER:$FILE_GROUP${NC}"
    fi
    
    # Clean up
    kubectl exec $POD -n $NAMESPACE -- rm $TEST_FILE 2>/dev/null
else
    echo -e "${RED}❌ Cannot create files in /app/data${NC}"
    echo "This will cause SQLITE_READONLY errors!"
fi
echo ""

# Check PVCs
echo -e "${YELLOW}7. Checking PVCs...${NC}"
kubectl get pvc -n $NAMESPACE -l app=educorenextgen-website

echo ""

# Check Longhorn volumes
echo -e "${YELLOW}8. Checking Longhorn volumes...${NC}"
kubectl -n longhorn-system get volumes | grep educorenextgen || echo "No Longhorn volumes found"

echo ""

# Check for errors in logs
echo -e "${YELLOW}9. Checking for permission errors in logs...${NC}"
ERRORS=$(kubectl logs $POD -n $NAMESPACE --tail=100 2>/dev/null | grep -i "permission\|readonly\|EACCES" || echo "")

if [ -z "$ERRORS" ]; then
    echo -e "${GREEN}✓ No permission errors in logs${NC}"
else
    echo -e "${RED}⚠️  Found permission-related errors:${NC}"
    echo "$ERRORS"
fi
echo ""

# Summary
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Summary${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Count checks
CHECKS_PASSED=0
CHECKS_FAILED=0

if [[ "$POD_STATUS" == "Running" ]]; then ((CHECKS_PASSED++)); else ((CHECKS_FAILED++)); fi
if [[ "$FSGROUP" == "1001" ]]; then ((CHECKS_PASSED++)); else ((CHECKS_FAILED++)); fi
if [[ "$GROUP" == "1001" ]]; then ((CHECKS_PASSED++)); else ((CHECKS_FAILED++)); fi

echo "Checks passed: $CHECKS_PASSED"
echo "Checks failed: $CHECKS_FAILED"
echo ""

if [ $CHECKS_FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ All permission checks passed!${NC}"
    echo -e "${GREEN}Your Longhorn volumes are correctly configured.${NC}"
    echo ""
    echo "Next steps:"
    echo "  • Deploy your application"
    echo "  • Test database operations"
    echo "  • Monitor logs for issues"
else
    echo -e "${RED}❌ Some permission checks failed${NC}"
    echo ""
    echo "Troubleshooting:"
    echo "  1. Delete pod: kubectl delete pod $POD -n $NAMESPACE"
    echo "  2. Wait for recreation with correct permissions"
    echo "  3. Run this script again"
    echo ""
    echo "If still failing:"
    echo "  • Check StatefulSet has fsGroup: 1001"
    echo "  • Check Longhorn is healthy"
    echo "  • See LONGHORN_PERMISSIONS.md for details"
fi

echo ""
