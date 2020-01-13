var express = require('express');
var router = express.Router();

var flatRepository = require('../api/clients/flat.controller');

// ...get flat
router.get('/', verifyToken , flatRepository.get);
//.. get single  
router.get('/single/:id', verifyToken , flatRepository.getSingle);
//.. get all flat of user  
router.get('/all-user-flat/:id', verifyToken , flatRepository.getAllUserPlots);
//.. create client.....
router.post('/',verifyToken ,flatRepository.create);
// .. findby id and update
router.put('/:id',verifyToken ,flatRepository.put);
// ... delete by flatt by id
router.delete('/:id',verifyToken ,flatRepository.delete);
// router.get('/search/:searchTerm', verifyToken , clinetRepository.searchUser);
router.get('/search', verifyToken , flatRepository.searchUser);

//.. verify token
function verifyToken(req, res, next){
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
