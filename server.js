var express = require('express');
var app = express();
var proxyaddr = require('proxy-addr');

app.enable('trust proxy');

app.get('/', function (req, res) {
	console.log(req.headers);
	var ip = (req.headers['x-forwarded-for'] ||
     req.connection.remoteAddress ||
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress).split(",")[0];
	var language = "'" + req.headers['accept-language'] + "'";
	var software = req.headers['user-agent'];
	var enLang = language.substr(1,5);
	var macSoftware = software.substr(13,33);
	res.send({
		"ipaddress" : ip,
		"language" : enLang,
		"software" : macSoftware
	});

}); //app get



app.listen(process.env.PORT || 3000, function () {
	console.log("listening on port 3000");
});