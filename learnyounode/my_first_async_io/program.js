/* note...this requires node v7.9.0.  With earlier versions, we get an error indicating
that whatever function is passed as the third argument to fs.readFile is not in fact
a function */

const ps = require('process');
const fs = require('fs');

function asyncCountNewlines(path) {
    
    fs.readFile(path,  (err, data)=> {
                            if (checkFSError(err)) {
                              
                                return;
                            }
                            
                          //console.log(data.toString());
                          console.log(countNewlines(data));
                        }
               );
}


function countNewlines(buffer) {

     var total = 0;
     
     for (var value of buffer.values()) {
        // console.log(value);
         if (value == 10) {
             total++;
         }
     }
     return total;
 }

 function checkFSError(err) {
     if (err) {
         console.log("fs error");
         return 1;
     } else {
         return 0;
     }
 }


asyncCountNewlines(ps.argv[2]);


