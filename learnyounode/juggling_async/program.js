var http = require('http');
var ps = require('process');


var data = {};
var ended = 0;


for (var i = 0; i < ps.argv.length - 2; i++) {
    data[ps.argv[i + 2]] = '';
}

for  (var i = 0; i < ps.argv.length - 2; i++) {
    //console.log('setting response handler for ' + ps.argv[i + 2]);
    http.get(ps.argv[i + 2], getResponseHandler(ps.argv[i + 2]));
}

function getResponseHandler(url) {
   // console.log('in getResponseHandler -- url = ' + url);
    function responseHandler(response) {
        response.setEncoding('utf8');
        
        response.on('data', (d)=> {
            var stringData = d.toString();
            data[url] += stringData;
            //console.log('reading from ' + url + 'data = ' + stringData);
            //console.log('data[url] = ' + data[url]);
        });


        response.on('end', ()=> {
            ended ++;
            if (ended == ps.argv.length - 2) {
                //console.log('gathering data');
                for (var i = 0; i < ps.argv.length - 2; i++) {
                    console.log(data[ps.argv[i + 2]]);
                }
            }
        });
         
        response.on('error', (e) => {
             console.log(`problem with request: ${e.message}`);
        });
    }

    return responseHandler;
}
            
           
/*
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
*/
