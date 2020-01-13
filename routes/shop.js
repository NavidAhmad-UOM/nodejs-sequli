var express = require('express');
var router = express.Router();

var shopRepository = require('../api/clients/shop.controller');

// ...get clients
router.get('/', verifyToken , shopRepository.get);
//.. get single  
router.get('/single/:id', verifyToken , shopRepository.getSingle);
//.. get all shops of user  
router.get('/all-user-shops/:id', verifyToken , shopRepository.getAllUserPlots);
//.. create client.....
router.post('/',verifyToken ,shopRepository.create);
// .. findby id and update
router.put('/:id',verifyToken ,shopRepository.put);
// ... delete by client by id
router.delete('/:id',verifyToken ,shopRepository.delete);


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
