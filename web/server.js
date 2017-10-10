const express = require('express');
const http = require('http');
const httpProxy = require('http-proxy');
const favicon = require('serve-favicon');
const path = require('path')

// Setup server
const app = express();

const API = process.env.API
const PORT = process.env.PORT || "4200"

const dist = path.normalize(__dirname + '/dist')
app.use(favicon(path.join(dist, 'favicon.ico')));
app.use(express.static(dist));
app.set('appPath', dist);

const apiProxy = httpProxy.createProxyServer();

apiProxy.on('error', function (err, req, res) {
  console.log('>> Not connected to the API');
  res.writeHead(500, {'Content-Type': 'text/plain'});
  res.end(err.message);
});

app.all('/api/*', function (req, res) {
  console.log(`API is ${API}`)
  req.url = req.url.replace(/\/api/, '');
  apiProxy.web(req, res, {target: API});
});

app.route('/*').get(function (req, res) {
  res.sendFile(path.join(app.get('appPath'), 'index.html'));
});

// Start server
http.createServer(app).listen(PORT, function () {
  console.log('Express server listening on %d, in %s mode', PORT, app.get('env'));
});

// Expose app
module.exports = app;
