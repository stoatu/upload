function route(pathname,handle,req,res){
	if (handle.hasOwnProperty(pathname)){
		handle[pathname](req,res);
	}else{
		console.log('No request handler foun for ' + pathname);
		res.writeHead(404,{'Content-Type':'text/plain'});
		res.write('404 Not found');
		res.end();
	}
}

exports.route = route;