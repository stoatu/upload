var http = require('http');
var url = require('url');
var port = 3000;

function start(route,handle){
	http.createServer(function (req,res){
		var pathname = url.parse(req.url).pathname;
		
		route(pathname,handle,req,res);
	}).listen(port);
}

console.log('Server has started at port ' + port);
exports.start = start;
