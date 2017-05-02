var net = require('net');
var ps = require('process');

var server = net.createServer(function (socket) {  
    socket.end(formattedDate());
})  ;

server.listen(Number(ps.argv[2]));

function formattedDate() {
    var template = '{1}-{2}-{3} {4}:{5}';
    var date = new Date(); 
    return String.format(template, date.getFullYear(),
                                            pad(date.getMonth() + 1),
                                            pad(date.getDate()),
                                            pad(date.getHours()),
                                            pad(date.getMinutes()));
 }
 
 function pad(number) {
     if (number < 10) {
         return '0' + String(number);
     } else {
         return String(number);
     }
  }
    
    
    