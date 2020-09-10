import { group, sleep } from 'k6';
import { check } from "k6";
import http from 'k6/http';
export let options = {
    maxRedirects: 0,
};
export default function() {
    group("page_1 - https://<yoursite>/", function() {
        let req, res;
                req = [{
            "method": "get",
                        "url": "https://<yoursite>/<some_path>",
                        "params": {
                "cookies" : {
                    },
                    "headers": {
                    "cache-control": "max-age=0",
                                        "upgrade-insecure-requests": "1",       
                                        "user-agent": "put_some_id_here",
                                        "sec-fetch-user": "?1",
                                        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
                                        "sec-fetch-site": "none",
                                        "sec-fetch-mode": "navigate",
                                        "accept-encoding": "gzip, deflate, br",
                                        "accept-language": "en-US,en;q=0.9"
                                }
                        }
                }];
                res = http.batch(req);
                check(res[0], {
                            "is status 200": (r) => r.status === 200
                          });
                sleep(0.5);
        });
}