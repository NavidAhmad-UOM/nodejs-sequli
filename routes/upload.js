var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer();
var uploadFileRepository = require('../api/clients/file.controller');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('file::', file);
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        console.log('fileee: ', file.originalname);
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
        console.log('ext:',ext);
        cb(null, file.fieldname + '-' + Date.now()+ext);
    }
});

var upload = multer({
    storage: storage
});

router.post('/single', upload.single("file"), uploadFileRepository.uploadFile);

module.exports = router;