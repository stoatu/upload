var formidable = require('formidable');
var fs = require('fs');

function index(req,res){
	console.log('Request handler "start" was called');
	var body = '<!DOCTYPE html>' +
				'<html lang="zh-CN">' +
				'<head>' +
					'<meta charset="UTF-8">' +
					'<title>upload</title>' +
				'</head>' +
				'<body>' +
					'<form action="/upload" role="form" method="post" enctype="multipart/form-data" >' +
						'<input type="file" name="upload">' +
						'<input type="submit" value="upload">' +
					'</form>' +
				'</body>' +
				'</html>';
	res.writeHead(200,{'Content-Type':'text/html'});
	res.write(body);
	res.end();
}

function upload(req,res){
	console.log('Request handler "upload" was called');
	var form = new formidable.IncomingForm();

	form.uploadDir = './tmp/';
	form.parse(req,function (error,fields,files){
		console.log(files);
		fs.renameSync(files.upload.path,'./images/header.jpg');

		res.writeHead(200,{'Content-Type':'text/html'});
		res.write('<img src="/show" />');
		res.end();
	});
}

function show(req,res){
	console.log('Request handler "show" was called');
	fs.readFile('./images/header.jpg','binary',function (err,file){
		if (err){
			res.writeHead(500,{'Content-Type':'text/plain'});
			res.write(err + '/n');
			res.end();
		}else{
			res.writeHead(200,{'Content-Type':'text/jpg'});
			res.write(file,'binary');
			res.end();
		}
	});
}



exports.index = index;
exports.show = show;
exports.upload = upload;