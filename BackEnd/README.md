# users-management-api
Service for creating, deleting and assigning to groups Azure B2C users

## Rewriting routes

If you want to rewrite the routes at the application level you can provide set env var `REWRITE_PATH_TO_ROOT` to for example
`/api` (or just `api`) it will make the app to reroute all the requests to '/api' to be redirected to '/'.

It's useful when the app lives behind an ingress that does not support request rewrites like the
[AWS Load Balancer Controller](https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.2/guide/ingress/annotations/) or
the [Azure Application Gateway Kubernetes Ingress](https://azure.github.io/application-gateway-kubernetes-ingress/annotations/).

Example .env

```
REWRITE_PATH_TO_ROOT=/api
```
