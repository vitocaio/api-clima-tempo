const port  = 3003

const badyParser = require('body-parser');
const express = require('express');
const server = express();
const fs = require('fs');
const allowCors = require('./cors');

server.use(badyParser.urlencoded({ extended: true }))
server.use(badyParser.json())
server.use(allowCors)

const path = require('path');
const readStream = fs.createReadStream(path.join(__dirname, '../api') + '/clima.json', 'utf8');
let data = ''

server.get('/api/cidades', function(req, res){
  readStream.on('data', function(chunk) {
      data += chunk;
  }).on('end', function() {
    const obj = JSON.parse(data);
    let result = JSON.parse(data);

    result = obj.cidades;

    const response = {status: 'sucesso', resultado: result};
    res.json(response);
  });
});

server.listen(port, function(){
    console.log(`BACKEND  is running on port ${port}.`)
})

module.exports = server