//json_api_server/program.js


'use strict'

const http = require('http');
const ps = require('process');
const url = require('url');

var server = http.createServer(function (req, res) {

     handleRequest(req, res);
     
    });


server.listen(Number(ps.argv[2]));

function handleRequest(req, res) {
    
    let u = url.parse(req.url, true );
    
    let pathname = u.pathname;
   
    
    
    if (pathname == '/api/parsetime') {
        
       
        res.writeHead(200, { 'Content-Type': 'application/json' }) 
        const dateString = u.query['iso'];
        const date = new Date(dateString);
        res.write(JSON.stringify({hour : date.getHours(), minute: date.getMinutes(), second: date.getSeconds()}));
        
        
    } else if (pathname == '/api/unixtime') {
        res.writeHead(200, { 'Content-Type': 'application/json' }) 
        const dateString = u.query['iso'];
        const date = new Date(dateString);
        res.write(JSON.stringify({unixtime:date.getTime()}));
        
    } else {
        res.writeHead(404);
    }
    res.end();
}

const date = new Date();
const iso = date.toISOString();
console.log('iso = '+ iso);
const date2 = new Date(iso);
console.log(date2.toString());


 

