
var http = require('http');
var ps = require('process');

var content = '';

function onResponse(response)  {
 
    response.setEncoding('utf8');
    response.on('data', (data)=> {
        content += data.toString();
    });
    response.on('end', ()=>{
        console.log(content.length);
        console.log(content);
    });
    
}

http.get(ps.argv[2], 
     onResponse);
        

