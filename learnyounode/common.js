const fs = require('fs')
const ps = require('path');

function syncCountNewlines(path ){
    const buffer = fs.readFileSync(path);
    return countNewlines(buffer);

}

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

function filteredLS(path, extension) {
    fs.readdir(path, 'utf8', (err, data)=> {
                    if (err) {
                        checkFSError(err);
                        return
                    }
                    const filtered = data.forEach( (name)=> {

                                if (ps.extname(name) == '.' + extension) {
                                    console.log(name);
                                }
                });
    });
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

module.exports.syncCountNewlines = syncCountNewlines ;
module.exports.asyncCountNewlines = asyncCountNewlines 
module.exports.filteredLS = filteredLS;

