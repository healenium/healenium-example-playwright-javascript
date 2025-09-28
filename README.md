# healenium-example-playwright-javascript

## prerequisites

in the playwright.config.js

connection to healenium proxy:
```
        connectOptions: {
          // wsEndpoint: process.env.PLAYWRIGHT_SERVER_URL || 'ws://localhost:5000',
          wsEndpoint: process.env.PLAYWRIGHT_SERVER_URL || 'ws://localhost:8080/playwright-proxy',
          timeout: 600000,            // 60 seconds for WebSocket connection timeout
        },
```

## build
```
npm install
```

## run playwright node server

``` 
npx -y playwright run-server --port 5000
```

## run playwright proxy

[healinium-playwright-proxy](https://github.com/healenium/healenium-playwright-proxy)

connection to the proxy is configured in the 'playwright.config.js'

## run test 

```
npx playwright test tests/test-env/page-api/css.spec.js
```

## docs
[Running and debugging Playwright tests](https://playwright.dev/docs/running-tests)
