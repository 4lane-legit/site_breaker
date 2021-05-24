# site_breaker
load test utility using docker + node + grafana.

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
once the test starts to push logs to InfluxDB we should see something like:
![image](https://user-images.githubusercontent.com/68027670/92816631-61134500-f3e3-11ea-9c4d-7a1e530eab6a.png)

once the test is completed, we get to see a nice little summary:
```
page_1 - https://blah.blah.com/blahblah

      ✗ is status 200
       ↳  0% — ✓ 0 / ✗ 1079

    checks.....................: 0.00%  ✓ 0   ✗ 1079
    data_received..............: 972 kB 4.7 kB/s
    data_sent..................: 1.1 MB 5.5 kB/s
    group_duration.............: avg=958.91ms min=895.41ms med=944.76ms max=3.99s    p(90)=976.09ms p(95)=996.38ms
    http_req_blocked...........: avg=5.11ms   min=300ns    med=1µs      max=1.11s    p(90)=1.7µs    p(95)=1.9µs
    http_req_connecting........: avg=1.24ms   min=0s       med=0s       max=278.56ms p(90)=0s       p(95)=0s
    http_req_duration..........: avg=452.24ms min=394.36ms med=443.31ms max=3.49s    p(90)=474.91ms p(95)=494.57ms
    http_req_receiving.........: avg=508.18µs min=173µs    med=491.4µs  max=2.86ms   p(90)=690.44µs p(95)=748.81µs
    http_req_sending...........: avg=268.87µs min=56.2µs   med=255.19µs max=4.39ms   p(90)=367.66µs p(95)=420.78µs
    http_req_tls_handshaking...: avg=3.64ms   min=0s       med=0s       max=789.92ms p(90)=0s       p(95)=0s
    http_req_waiting...........: avg=451.46ms min=393.69ms med=442.49ms max=3.48s    p(90)=473.94ms p(95)=493.6ms
    http_reqs..................: 1079   5.216583/s
    iteration_duration.........: avg=959.04ms min=895.55ms med=944.88ms max=3.99s    p(90)=976.17ms p(95)=996.46ms
    iterations.................: 1075   5.197245/s
    vus........................: 5      min=5 max=5
    vus_max....................: 5      min=5 max=5
```
