[![npm version](https://img.shields.io/npm/v/node-sia.svg)](https://npmjs.com/package/node-sia)
[![npm downloads](https://img.shields.io/npm/dm/node-sia.svg)](https://npmjs.com/package/node-sia)
[![dependencies Status](https://david-dm.org/Heartz66/node-sia/status.svg)](https://david-dm.org/Heartz66/node-sia)
[![license:mit](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

# Sia Client for Node.js
`node-sia` is a Node.js module that's made to interact with the [Sia API](https://github.com/NebulousLabs/Sia/blob/master/doc/API.md).

See the [Sia API documentation](https://github.com/NebulousLabs/Sia/blob/master/doc/API.md) for an overview of endpoints.

# Documentation
### Constructor([data])
- `data` - Optional. An object containing zero or more of the following properties:
    - `options`
        - `url` - URL to your Sia API endpoint. Defaults to `http://127.0.0.1:9980`
        - `password` - Password you have to set to authenticate with the Sia API. Should be used if you have started siad with the `--authenticate-api` flag.
    - `request` - An instance of [`request`](https://www.npmjs.com/package/request) which will be used for HTTP requests. `node-sia` will create its own if omitted.

Constructs a new instance of SiaClient.

### sendRequest(method, endpoint, parameters)
- `method` - HTTP method (GET, POST)
- `endpoint` - Sia API endpoint you want to reach.
- `parameters` - Optional. An object containing your query strings.

**Example:**

```js
var SiaClient = require('node-sia');
var client = new SiaClient();
 
client.sendRequest('GET', '/daemon/version')
    .then(function (data) {
        console.log(data);
    })
    .catch(function (err) {
        console.error(err);
    });
 
client.sendRequest('POST', '/wallet/init', {
    encryptionpassword: 'my super secure password'
}).then(function (data) {
    console.log(data);
}).catch(function (err) {
    console.error(err);
});
```
