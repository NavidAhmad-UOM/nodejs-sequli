var express = require('express');
var router = express.Router();
var authRespository = require('../api/clients/auth.controller');

//.. signUp user  
router.post('/', authRespository.post);
//.. signUp user  
router.post('/login/', authRespository.login);

module.exports=router;

