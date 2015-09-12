
var server = {

	//returns HTML, CSS, JS, etc.
	httpServer: function(req, resp) {
		path  = unescape(__dirname + req.url)
		var code = 200
		 if(fs.existsSync(path)) {
		    if(fs.lstatSync(path).isDirectory()) {
		        if(fs.existsSync(path+"index.html")) {
		        path += "index.html"
		        } else {
		            code = 403
		            resp.writeHead(code, {"Content-Type": "text/plain"});
		            resp.end(code+" "+http.STATUS_CODES[code]+" "+req.url);
		        }
		    }
		    resp.writeHead(code, {"Content-Type": mime.lookup(path)})
		    fs.readFile(path, function (e, r) {
		    resp.end(r);

		})
		} else {
		    code = 404
		    resp.writeHead(code, {"Content-Type":"text/plain"});
		    resp.end(code+" "+http.STATUS_CODES[code]+" "+req.url);
		}
		console.log("GET "+code+" "+http.STATUS_CODES[code]+" "+req.url)
	}, //httpServer

	//acepts POST requests (JSON) and returns responses (JSON)
	jsonServer: function(req, resp, callBackForResponse) {
		//http://stackoverflow.com/questions/4295782/how-do-you-extract-post-data-in-node-js
		if (req.method == 'POST') {
	        var body = '';
	        req.on('data', function (data) {
	            body += data;

	            // Too much POST data, kill the connection!
	            if (body.length > 1e6)
	                req.connection.destroy();
	        });
	        req.on('end', function () {
	        	var qs = require('querystring');
	            var postObject = qs.parse(body);
	            console.log("body = \"" + body + "\"");
	            console.log("body = " + JSON.stringify(postObject) );

	            // if the two properties exist...
	            if( body!="" && postObject["author"] && postObject["text"] )
	            	(function onSuccess(){
	            		db.addEntry( postObject );
	            		if( callBackForResponse && typeof callBackForResponse == "function" )
	            			callBackForResponse();
	            	})()
	        });
	    } //if
	} //jsonServer

}; //server


var db = (function() {
	var globalList = [
	 	{"author": "Pete Hunt", "text": "This is one comment"},
	 	{"author": "Jordan Walke", "text": "This is *another* comment"}
	];

	return {
		getDB: function() {
		   return globalList;
	    },
        addEntry: function(entry) {
           globalList.push(entry);
           console.log("added to db: " + JSON.stringify(entry));
        }
	}
})();



function jsonResponseFromDB(response) {
	console.log("Request \"application/json\" called.");
	response.writeHead(200, {"Content-Type": "application/json"});
	var json = JSON.stringify({
		comments: db.getDB()
	});
	response.end(json);
}



//This will serve any regular text or image file (.html, .css, .js, .pdf, .jpg, .png, .m4a and .mp3 are the extensions I've tested, but it theory it should work for everything)
//http://stackoverflow.com/questions/6084360/using-node-js-as-a-simple-web-server
var mime = require("mime"), http = require("http"), fs = require("fs");
http.createServer(function (req, resp) {
	console.log("url" + req.url);

	//if the request contains "server" in the URL, means it request for data, and not for HTTP files
    var isDataRequest = req.url.indexOf("server") > -1;
	var isHttpRequest = !isDataRequest;

	server.jsonServer(req, resp, function callBackForResponse() {
		if( isDataRequest ) {
			console.log("--- response from callBack (DB access) ---");
			jsonResponseFromDB(resp);
		}
	});
	 
    	

	if( isDataRequest ) {
		console.log("--- response from request (only nedded the first time!) ---");

		//this response is only received by client if the "callBackForResponse()" was not called before
		setTimeout(function(){
			jsonResponseFromDB(resp);
		},250);
	}
	else {
		server.httpServer(req, resp);
	}

}).listen(8888,"localhost");
console.log("Listening at http://localhost:8888")






/*var http = require('http');
http.createServer(function (req, res) {
  //plainTextResponse(res);
  //jsonResponse(res);
  response(res);
}).listen(8888, '127.0.0.1');

*/


/*function saveToFile(obj, fileName) {
	var fs = require('fs');

	var str = "";
	for(var propertyName in obj) {
   		// propertyName is what you want
   		// you can get the value like this: myObject[propertyName]
   		str += propertyName;
   		var propsToStringify = ["headers","body"];
   		propsToStringify.forEach(function(prop){
   			if( propertyName == prop )
   				str += " = " + JSON.stringify( obj[propertyName] );
   		});
   		str += "\n";

	}

	fs.writeFile(__dirname+"\\"+fileName, str, function(obj) {
	    console.log("The file \"" + fileName + "\"was saved!");
	}); 
}*/

/*----var connect = require('connect');
var serveStatic = require('serve-static');
console.log("__dirname: " + __dirname);
connect().use(serveStatic(__dirname)).listen(8888);----*/













/*function plainTextResponse() {
	res.writeHead(200, {'Content-Type': 'text/plain'});
  	res.end('Hello World\n');
}

function jsonResponse(response) {
  console.log("Request handler random was called.");
  response.writeHead(200, {"Content-Type": "application/json"});
  var otherArray = ["item1", "item2"];
  var otherObject = { item1: "item1val", item2: "item2val" };
  var json = JSON.stringify({ 
    anObject: otherObject, 
    anArray: otherArray, 
    another: "item"
  });
  response.end(json);
}*/