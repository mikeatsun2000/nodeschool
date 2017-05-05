 var http = require('http');
 var ps = require('process');
 var fs = require('fs');
 var st = require('stream');
 
 
 
 var server = http.createServer(function (req, res) {

     var istream = fs.createReadStream(ps.argv[3]);
     istream.on('end', ()=> {res.end();});
     
     istream.pipe(res);
   
   
     });

server.listen(Number(ps.argv[2]));
 