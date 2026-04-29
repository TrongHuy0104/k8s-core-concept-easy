# Catalog API on Kubernetes

## Phiên bản công cụ
- minikube v1.33.x
- kubectl v1.30.x
- docker 26.x
- node 20.x
- pnpm 9.x

## Thứ tự apply
1. `kubectl apply -f manifests/namespace.yaml`
2. `kubectl apply -f manifests/postgres-pod.yaml -f manifests/postgres-service.yaml`
3. `kubectl apply -f manifests/redis-pod.yaml -f manifests/redis-service.yaml`
4. `kubectl apply -f manifests/catalog-api-deployment.yaml -f manifests/catalog-api-service.yaml`

## Port-forward
kubectl port-forward -n catalog-tronghuy0104 service/catalog-api 3000:3000

## Ví dụ curl

### GET /health
curl http://localhost:3000/health
# {"postgres":"ok","redis":"ok"}

### POST /catalog/items
curl -X POST http://localhost:3000/catalog/items \
  -H "Content-Type: application/json" \
  -d '{"sku":"SKU-001","title":"Áo thun trắng"}'
# {"id":1,"sku":"SKU-001","title":"Áo thun trắng"}

### GET /catalog/items (lần 1: MISS, lần 2: HIT)
curl -v http://localhost:3000/catalog/items
# Header: X-Cache: MISS (lần đầu), X-Cache: HIT (lần 2 trong 60s)