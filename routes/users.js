var express = require('express');
var router = express.Router();


var userRepository = require('../api/clients/user.controller');

// ...get clients
router.get('/', verifyToken , userRepository.get);
//.. get single  
router.get('/single/:id', verifyToken , userRepository.getSingle);
//.. get result b search term 
// router.get('/search/:searchTerm', verifyToken , userRepository.searchUser);
router.get('/search', verifyToken , userRepository.searchUser);
//.. get current user
router.get('/current-user-info', verifyToken , userRepository.getCurrentUser);
//.. create client.....
router.post('/',verifyToken ,userRepository.create);
// .. findby id and update
router.put('/:id',verifyToken ,userRepository.put);
// ... delete by client by id
router.delete('/:id',verifyToken ,userRepository.delete);
// ... delete by client by id
router.get('/getall',verifyToken ,userRepository.getAll);
// ... change password 
router.post('/change-password',verifyToken ,userRepository.changePassword);

//.. verify token
function verifyToken(req, res, next){
    console.log('req',req)
    const {params: {id}} = req
    console.log("current request:",id);
    //get auth header value 
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    //check if bearer is undefine
    if(typeof  bearerHeader !=='undefined'){
        // split at the space
        const bearer = bearerHeader.split(' ');
        // get token from array
        const bearerToken = bearer[1];
        //.. set the token
        req.token = bearerToken;
        // here we assigning full token cz to read userID in get method
        req.bearerHeader= bearerHeader;
        //.. next middleware
        next();
        
    } else {
        //forbiddon
        res.sendStatus(403)
    }
}

module.exports = router;
