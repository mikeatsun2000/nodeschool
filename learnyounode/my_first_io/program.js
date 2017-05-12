
'use strict'

const ps = require('process');
const fs = require('fs')
//const pth = require('path');



function syncCountNewlines(path ){
    
    const buffer = fs.readFileSync(path);
    return countNewlines(buffer);

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
 
//console.log('argv[2]=${ps.argv[2]}');
//console.log('argv[3]=${ps.argv[3]
console.log(syncCountNewlines(ps.argv[2]));