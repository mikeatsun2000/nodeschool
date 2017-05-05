var net = require('net');
var ps = require('process');

var server = net.createServer(function (socket) {  
    socket.end(formattedDate());
})  ;

server.listen(Number(ps.argv[2]));

function formattedDate() {

    var date = new Date(); 
    return date.getFullYear() +'-' +
                pad(date.getMonth() + 1) + '-' +
                pad(date.getDate()) + ' ' +
                pad(date.getHours()) + ':' +
                pad(date.getMinutes()) + '\n';
 }
 
 function pad(number) {
     if (number < 10) {
         return '0' + String(number);
     } else {
         return String(number);
     }
  }
    
    
    