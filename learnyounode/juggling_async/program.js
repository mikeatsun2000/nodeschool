var http = require('http');
var ps = require('process');

function ResponseArray()  {
    this.handlers = [];
    
    
    var completed = 0;
    
    
    function add(handler) {
        this.handlers.push(handler);
    }
    
    function onComplete() {
        completed++;this
        console.log('****** completed = ' + completed + 
                    '****** length = ' + this.handlers.length);
        if (completed ==this. handlers.length) {
            console.log('***** gathering content *******' );
            for (var i = 0; i <this. handlers.length ; i++ ) {
                console.log(this.handlers[i].content);
            }
            return;
        }
    }
    
    
    this.add = add;
    this.onComplete = onComplete;
}   

function ResponseHandler(array, url ) {
    
    var array = array;
    var handlers = array.handlers
    var index = handlers.length;
    
    this.url = url;
    this.content = '';
    
    
    
    function onResponse(response)  {
     
       
        response.setEncoding('utf8');
        
        
        response.on('data', (data)=> {
            console.log('****** handler for  ' + url + ' receiving data******');
            console.log('***** data = ' + data.toString());
            this.content += data.toString();
            console.log('***** content = ' + this.content);
        });
        
        response.on('end', ()=>{
            console.log('****** handler for  ' + url + ' finishing******');
            console.log('****** status code =' + response.statusCode + '******');
            array.onComplete();
        });
        
        response.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
});
        
    }
    
    this.onResponse = onResponse;
    
}

var array = new ResponseArray();
console.log(array);
for (var i = 2; i < ps.argv.length; i++) {
    
    array.add(new ResponseHandler(array, ps.argv[i]));

}

console.log('***** array= ' + array + "*********");

for  (var i = 0; i < ps.argv.length - 2; i++) {
    http.get(array.handlers[i].url, array.handlers[i].onResponse);
}

