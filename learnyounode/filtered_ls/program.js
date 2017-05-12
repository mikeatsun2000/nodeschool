
/* note...this requires node v7.9.0.  With earlier versions, we get an error indicating
that whatever function is passed as the third argument to fs.readdir is not in fact
a function */

const ps = require('process');
const fs = require('fs')
const pth = require('path');

function makeProcessDirectoryCallback( extension) {
    
    function cb(err, data) { 
        
                    if (checkFSError(err)) {
                        return;
                    }
                    
                    data.forEach( (name)=> {
                                //console.log(name);
                                if (pth.extname(name) == '.' + extension) {
                                    console.log(name);
                                }
                        
                    });
    }
    
    
    return cb;
                    
}

function filteredLS(path, extension) {
    //console.log('type = ' + typeof(makeProcessDirectoryCallback( extension)));
    fs.readdir(path, 'utf8',   makeProcessDirectoryCallback( extension));
}



 function checkFSError(err) {
     if (err) {
         console.log("fs error");
         return 1;
     } else {
         return 0; 
     }
 }
 
//console.log('argv[2] = ' + ps.argv[2]);
//console.log('argv[3] = ' + ps.argv[3]);

filteredLS(ps.argv[2], ps.argv[3]);