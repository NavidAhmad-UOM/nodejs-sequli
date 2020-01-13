var express = require('express');
var router = express.Router();

var plotRepository = require('../api/clients/plot.controller');

// ...get clients
router.get('/', verifyToken , plotRepository.get);
//.. get single  
router.get('/single/:id', verifyToken , plotRepository.getSingle);
//.. get all plots of user  
router.get('/all-user-plots/:id', verifyToken , plotRepository.getAllUserPlot);
//.. create client.....
router.post('/',verifyToken ,plotRepository.create);
// .. findby id and update
router.put('/:id',verifyToken ,plotRepository.put);
// ... delete by client by id
router.delete('/:id',verifyToken ,plotRepository.delete);


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
