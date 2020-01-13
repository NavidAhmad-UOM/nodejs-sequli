const models = require('../../models');
const jwt = require('jsonwebtoken');
var jwt_decode = require('jwt-decode');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports.get = (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData)=>{
        if(err){ res.sendStatus(403);}else 
        {
            var token = jwt_decode(req.bearerHeader);
            var userId = token.authenticatedUser.id;

            models.Clients.findAll({where:{createdBy:userId}})
            .then((result) => {
                console.log("isRequest"),result;
                res.json({

                    data: result
                });
            }).catch((err) => {
                res.json({
                    result: 'failed',
                    message: 'can not find todo'
                  });
            });
        }
    });
    }

    module.exports.getSingle = (req,res) => {
        jwt.verify(req.token, 'secretKey', (err, authData)=>{
            if(err){ res.sendStatus(403);}else 
            {
                let id= req.params.id;
                models.Clients.findOne({where: {id}})
                .then((result) => {
                    res.json({
    
                        data: result
                    });
                }).catch((err) => {
                    res.json({
                        result: 'failed',
                        message: 'can not find client,to update'
                      });
                });
            }
        });
    }
     module.exports.searchUser = (req,res) => {
        jwt.verify(req.token, 'secretKey', (err, authData)=>{
            if(err){ res.sendStatus(403);}else 
            {
                // let searchTerm= req.params.searchTerm;
                let searchTerm= req.query.value;
                if (searchTerm === '') {
                    res.json({data: []});
                }
                models.Clients.findAll({ where: {
                    [Op.or]: [{firstName: {[Op.iLike]: '%'+ searchTerm +'%'}}, {lastName: {[Op.iLike]: '%'+ searchTerm +'%'}}]
                  }})
                .then((result) => {
                    res.json({
    
                        data: result
                    });
                }).catch((err) => {
                    res.json({
                        result: 'failed',
                        message: 'can not find client,for search term'
                      });
                });
            }
        });
    }

    module.exports.create = (req,res)=>{
        jwt.verify(req.token, 'secretKey', (err, authData)=>{
            if(err){ res.sendStatus(403);}else {
                var token = jwt_decode(req.bearerHeader);
                var userId = token.authenticatedUser.id;
                let {firstName,lastName,email,phoneNumber1,phoneNumber2,direct,investor}=req.body;
                console.log(firstName+ ' '+lastName+ ' '+email+ ' '+phoneNumber1+ ' '+phoneNumber2+ ' '+direct+ ' '+investor);
                let createdBy = userId;
                let updatedBy = userId;
                models.Clients.create({
                    firstName,
                    lastName,
                    email,
                    phoneNumber1,
                    phoneNumber2,
                    direct,
                    investor,
                    createdBy,
                    updatedBy
                }).then(result=>{
                    res.json({
                        result:'ok',
                        data:result,
                        message :"create new client successfully"
                    });
                }).catch(err => {
                    res.json({
                        result:"faild",
                        message:err.message
                    });
                });
            }
        });

    }

    module.exports.put= (req, res) =>{
        jwt.verify(req.token, 'secretKey', (err, authData)=>{
            const {id}=req.params;
            let {firstName,lastName,email,phoneNumber1,phoneNumber2,direct,investor}=req.body;
            var token = jwt_decode(req.bearerHeader);
            var userId = token.authenticatedUser.id;
            let createdBy = userId;
            let updatedBy = userId;
            models.Clients.findById(id)
            .then(client => {
                if(!client){  res.status(400).send(`no result found for id ${id}`)}
                return updateClients(firstName,lastName,email,phoneNumber1,phoneNumber2,client,createdBy,updatedBy,direct,investor,client)
            })
            .then(x => res.send({
                data:x
            }))
            .catch(err=> {console.log(err.message);res.status(400).send(err)});
        });

    }

    //.. delete client
    module.exports.delete=(req, res) => {
        jwt.verify(req.token, 'secretKey', (err, authData)=>{
            const {id}=req.params;
            var token = jwt_decode(req.bearerHeader);
            var userId = token.authenticatedUser.id;

            console.log("current requested ID",id);
            models.Clients.findById(id).then(client => {
                if(!client){  res.status(400).send(`no result found for id ${id}`)}
                client.destroy()
                    .then(response=> res.status(200).send(response));
            }).catch(err=> {console.log(err.message);res.status(400).send(err)});
        });
    }

    function updateClients(firstName,lastName,email,phoneNumber1,phoneNumber2,client,createdBy,updatedBy,direct,investor,client) {
        return client.update({
            firstName:firstName?firstName:client.firstName,
            lastName:lastName?lastName:client.lastName,
            email:email?email:client.email,
            phoneNumber1:phoneNumber1?phoneNumber1:client.phoneNumber1,
            phoneNumber2:phoneNumber2?phoneNumber2:client.phoneNumber2,
            createdBy:createdBy?createdBy:client.createdBy,
            updatedBy:updatedBy?updatedBy:client.updatedBy,
            direct:direct?direct:client.direct,
            investor:investor?investor:client.investor
            
        })
        .then(respo => respo)
        .catch(err => err)
    }
    