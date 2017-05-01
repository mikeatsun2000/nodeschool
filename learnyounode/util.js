const http = require('http');
const ps = require('process')

function TestServer(port, message) {
    
    
    const server = http.createServer((req, res)=> {
        res.end(message + '\n', 'utf8');
    });
    
    server.listen(Number(port));
}


var server = TestServer(ps.argv[2], ps.argv[3]);