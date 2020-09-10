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

You should see the influx DB datasource pre-configured, if not set it up like that:
remember use the credentials to setup influxDB that is there on docker-compose file. 
![image](https://user-images.githubusercontent.com/68027670/92814571-011b9f00-f3e1-11ea-960c-bda44a9700ba.png)
![image](https://user-images.githubusercontent.com/68027670/92815147-961e9800-f3e1-11ea-9491-e6f40d016728.png)


### Configure the k6 dashboard.
import the dashboard in grafana, use the JSON for load impact dashboard in dashboards directory.
once imported, we are all set to run the loadimpact script.
the command output should look like this:

VUS: virtual users (example 100 users each second.)
DURATION: duration in minutes (example 10m)
```

          /\      |‾‾|  /‾‾/  /‾/
     /\  /  \     |  |_/  /  / /
    /  \/    \    |      |  /  ‾‾\
   /          \   |  |‾\  \ | (_) |
  / __________ \  |__|  \__\ \___/ .io

 Init   [--------------------------------------] runner
 Init   [--------------------------------------] options
 Init   [--------------------------------------] execution scheduler
Init   [--------------------------------------] Init engine
Init   [--------------------------------------] Init metric outputs 
Init   [--------------------------------------] Init API server     
  execution: local
     script: -
     output: influxdb=http://myk6db:pass@localhost:8086/myk6db (http://localhost:8086)

  scenarios: (100.00%) 1 executors, 5 max VUs, 10m30s max duration (incl. graceful stop):
           * default: 5 looping VUs for 10m0s (gracefulStop: 30s)

Init   [--------------------------------------] Init VUs
Init   [--------------------------------------] Start test

running (00m00.9s), 5/5 VUs, 0 complete and 0 interrupted iterations
default   [   0% ] 5 VUs  00m00.9s/10m0s

```
