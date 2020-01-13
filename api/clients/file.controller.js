const uploadFolder ='/uploads/';
const fs = require('fs');
 
exports.uploadFile = (req, res) => {
	console.log('file name:',req.file.filename);
	res.send(req.file.filename);
}
 
exports.listUrlFiles = (req, res) => {
	fs.readdir(uploadFolder, (err, files) => {
		for (let i = 0; i < files.length; ++i) {
			files[i] = "http://localhost:8080/api/file/" + files[i];
		}
		
		res.send(files);
	})
}

exports.downloadFile = (req, res) => {
	let filename = req.params.filename;
	res.download(uploadFolder + filename);  
}