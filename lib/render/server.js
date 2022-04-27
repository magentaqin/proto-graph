const express = require('express');
const app = express();
const path = require('path');
const staticDir = path.join(process.cwd(), '/lib/render/public');
const { jsonReplacer } = require('../utils');

const startServer = (data) => {
  app.get('/', function (req, res) {
    res.sendFile(path.join(staticDir, 'index.html'));
  });

  app.post('/info', function (req, res) {
    console.log('data', data);
    console.log(JSON.stringify(data, jsonReplacer));
    res.status(200).send(JSON.stringify(data, jsonReplacer))
  });

  app.use('/', express.static(staticDir));
  app.listen(process.env.port || 3000);
};

module.exports = {
  startServer
};
