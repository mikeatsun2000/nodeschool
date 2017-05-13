const fs = require('fs');
const pth = require('path');

module.exports = function(path, extension, callback) {

    fs.readdir(path, (err, data) => {
        if (err) {
            callback(err);
        }
        else {

            data = data.filter((name) => {
                return (pth.extname(name) == '.' + extension);
            });


            callback(null, data);
        }
    });

}

//module.exports.filteredLS = filteredLS
