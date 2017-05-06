//program.js

'use strict'

var Transform = require('stream').Transform;
var http = require('http');
var ps = require('process');


class UpperCaser extends Transform {
    constructor(options) {
        super(options);
    }
    
    _transform(data, encoding, callback) {
        var transformed = data.toString().toUpperCase();
        this.push(transformed);
        callback();
    }
}
var server = http.createServer(function (req, res) {

     var uppercaser = req.pipe(new UpperCaser());
     uppercaser.on('end', ()=> {res.end();});
     
     uppercaser.pipe(res);
     });

server.listen(Number(ps.argv[2]));
 


