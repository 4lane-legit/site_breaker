# site_breaker
load test utility using docker + node + grafana  (Alpha)- to be followed by a managed service using GO and chrome plugin. STAY Tuned!

## How does this work.
Spin up the grafana and influx DB. Since we are sending the logs to Influx DB running on 8086.
do 
```
docker compose up
```
That should look something like that:

![image](https://user-images.githubusercontent.com/68027670/92811995-97999180-f3dc-11ea-8284-7371bbe815ed.png)

now goto localhost:3002 and you should see the grafana screen:
use the credentials that you configured on the docker-compose file or change the admin password:
```
docker exec -it grafana grafana-cli admin reset-admin-password somerandompass
##INFO[09-10|22:03:37] Connecting to DB                         logger=sqlstore dbtype=sqlite3
##INFO[09-10|22:03:37] Starting DB migration                    logger=migrator

##Admin password changed successfully ✔
```

![image](https://user-images.githubusercontent.com/68027670/92812326-e0e9e100-f3dc-11ea-8245-6dc138ef8871.png)
