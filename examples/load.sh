#!/usr/bin/bash

 docker run --net="host" -i loadimpact/k6 run \
    --out influxdb=http://myk6db:pass@localhost:8086/myk6db \ 
    --duration=10m  \
    --vus=75 -< load_test.js 