# cyber-express-logger
A simple and colourful request logger for Express

![The logger in action](showcase.png)

## Installation
Just use npm:
```
npm i cyber-express-logger
```

## Usage
The module exports a single, default function.

### Default function `logger(opts?)`:
* Object `opts`:
    * Callback `getIP(req):string`  
    Returns the client's IP address given the request object. By default, IPs will be checked for in the `cf-connecting-ip` header, then the `x-forwarded-for` header. If neither of those exist, we'll fall back to `req.socket.remoteAddress`.

## Example
```js
// Require modules
const express = require('express');
const logger = require('cyber-express-logger');

// Create express server
const srv = express();

// Set up logger
// Make sure this appears before any other request handlers
srv.use(logger({
    // Get the client's IP from a custom header
    getIP: req => req.header['my-ip-header']
}));

// ... Your request handlers ...

// Listen
const port = 8080;
srv.listen(port, () => console.log(`Listening on ${port}`));
```