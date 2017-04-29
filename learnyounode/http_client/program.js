var http = require('http');
var ps = require('process');


function onResponse(response)  {
    response.setEncoding('utf8');
    response.on('data', (data)=> {
        console.log(data);
    })
}

http.get(ps.argv[2], 
    onResponse);
        

