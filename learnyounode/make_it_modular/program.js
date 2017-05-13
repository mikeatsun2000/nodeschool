//make_it_modular/program.js

const ps = require('process');
const filteredLS = require('./exp');
const pth = require('path');
const fs = require('fs');



function postFilteringCallback(extension) {

    function cb(err, data) {

        if (err) {
            console.log('File System error: ' + err.message);
        }
        else {
            data.forEach((name) => {
                console.log(name);
            });
        }
    }

    return cb;

}


filteredLS(ps.argv[2],
    ps.argv[3],
    postFilteringCallback(ps.argv[3]));
