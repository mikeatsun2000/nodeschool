var http = require('http');
var ps = require('process');
var stringify = require('json-stringify-safe');

function ResponseArray()  {
    
    this.handlers = [];
    this.completed = 0;
    
    
    function add(handler) {
        this.handlers.push(handler);
    }
    
    function onComplete() {
        this.completed++;
        console.log('****** completed = ' + this.completed + 
                    '****** length = ' + this.handlers.length);
        if (this.completed == this.handlers.length) {
            console.log('***** gathering acc_data *******' );
            for (var i = 0; i <this. handlers.length ; i++ ) {
                console.log(this.handlers[i]['acc_data']);
            }
        }
    }
    
    
    this.add = add;
    this.onComplete  = onComplete;
}   

function ResponseHandler(array, url ) {
    
    this["array"] = array;
    this["url"] = url;
    this["acc_data"] = "";
    
    
    
    
    function onResponse(response)  {
     
        response.setEncoding('utf8');
        
        
        response.on('data', (data)=> {
            //console.log('****** handler for  ' + url + ' receiving data******');
            var string_data = data.toString();
            console.log('***** data = ' + string_data);
            console.log('***** before ["acc_data"] = ' + this["acc_data"]);
            this["acc_data"] = this["acc_data"] + string_data;
            console.log('***** after ["acc_data" ] = '  + this["acc_data"]);
        });
    
        response.on('end', ()=> {
            console.log('****** handler for  ' + this["url"] + ' finishing******');
            console.log('****** status code = ' + response.statusCode + '******');
            array.onComplete();
        });
        
        response.on('error', (e) => {
             console.log(`problem with request: ${e.message}`);
        });
        
    }
    
    this.onResponse = onResponse;
    
}

var array = new ResponseArray();

for (var i = 2; i < ps.argv.length; i++) {
    
    array.add(new ResponseHandler(array, ps.argv[i]));

}

console.log('***** array= ' + array + "*********");

for  (var i = 0; i < ps.argv.length - 2; i++) {
    http.get(array.handlers[i].url, array.handlers[i].onResponse);
}

