const models = require('../../models');
const jwt = require('jsonwebtoken');
var jwt_decode = require('jwt-decode');
var Sequelize = require('sequelize');
var fs = require('fs');
// var _ =require('lodash');
const Op = Sequelize.Op;

module.exports.get = (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            var token = jwt_decode(req.bearerHeader);
            var userId = token.authenticatedUser.id;
            console.log('userID::', userId);
            models.Flat.findAll({
                    where: {
                        createdBy: userId
                    }
                })
                .then((result) => {
                    res.json({

                        data: result
                    });
                }).catch((err) => {
                    res.json({
                        result: 'failed',
                        message: 'can not find flat,to update'
                    });
                });
        }
    });
}

module.exports.getSingle = (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            let id = req.params.id;
            console.log("current requested Id", id);
            models.Flat.findOne({
                    where: {
                        id
                    }
                })
                .then((result) => {
                    res.json({

                        data: result
                    });
                }).catch((err) => {
                    res.json({
                        result: 'failed',
                        message: 'can not find flat,to update'
                    });
                });
        }
    });
}
module.exports.getAllUserPlots = (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            let id = req.params.id;
            console.log("current requested Id", id);
            models.Flat.findAll({
                    where: {
                        clientId: id
                    }
                })
                .then((result) => {
                    res.json({

                        data: result
                    });
                }).catch((err) => {
                    res.json({
                        result: 'failed',
                        message: err.message
                    });
                });
        }
    });
}

module.exports.create = (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            let {
                clientId,
                forRent,
                confirmed,
                direct,
                phone1,
                phone2,
                marlas,
                amount,
                notes,
                lenght,
                width,
                rooms,
                floorNo,
                bath,
                isResidental,
                flatPicture
            } = req.body;
            console.log('clientID', clientId);
            let token = jwt_decode(req.bearerHeader);
            let userId = token.authenticatedUser.id;
            let createdBy = userId;
            let updatedBy = userId;
            if (marlas != '') {
                sqft = marlas * 272.25;
                console.log('total marlas::', marlas);
            } else {
                console.log('calculate');
                sqft = lenght * width;
                marlas = sqft / 272.25
                console.log(sqft + ' :: ' + marlas);
            }
            models.Flat.create({
                clientId,
                userId,
                forRent,
                confirmed,
                direct,
                phone1,
                phone2,
                marlas,
                sqft,
                amount,
                notes,
                lenght,
                width,
                rooms,
                floorNo,
                bath,
                isResidental,
                createdBy,
                updatedBy,
                flatPicture
            }).then(result => {
                console.log('result:', result);
                res.json({
                    result: 'ok',
                    data: result,
                    message: "create new Flat successfully"
                });
            }).catch(err => {
                res.json({
                    result: "faild",
                    message: err.message
                });
            });
        }
    });

}

module.exports.put = (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const {
                id
            } = req.params;
            let {
                clientId,
                userId,
                flatPicture,
                forRent,
                confirmed,
                direct,
                phone1,
                phone2,
                marlas,
                sqft,
                amount,
                notes,
                lenght,
                width,
                rooms,
                floorNo,
                bath,
                isResidental,
                createdBy,
                updatedBy
            } = req.body;
            var token = jwt_decode(req.bearerHeader);
            let currentUserId = token.authenticatedUser.id;
            if (lenght != '' && width != '') {
                sqft = lenght * width;
                marlas = sqft / 272.25
            }
            models.Flat.findById(id)
                .then(flat => {
                    console.log('......s..', flat.flatPicture);
                    if (!flat) {
                        res.status(400).send(`no result found for id ${id}`)
                    }
                    console.log('..pic.:',flatPicture);
                   if(flatPicture)
                   {
                    if (flat.flatPicture!=null && flat.flatPicture != flatPicture) {
                        fs.unlink("." + flat.flatPicture, function (err) {
                            if (err) throw err;
                            // if no error, file has been deleted successfully
                            console.log('File deleted!');
                        });
                    }
                   }
                    return updateClient(
                        clientId, userId, flatPicture, forRent, confirmed, direct, phone1, phone2, marlas, sqft,
                        amount, notes, lenght, width, rooms, floorNo, bath, isResidental, createdBy, currentUserId, flat);
                })
                .then(x => res.send({
                    data: x
                }))
                .catch(err => {
                    console.log(err.message);
                    res.status(400).send(err)
                });
        }
    });

}

//.. delete client
module.exports.delete = (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        const {
            id
        } = req.params;

        if (err) {
            res.sendStatus(403);
        } else {
            var token = jwt_decode(req.bearerHeader);
            let currentUserId = token.authenticatedUser.id;
            console.log("current requested ID", id);
            models.Flat.findById(id).then(flat => {
                if (!flat) {
                    res.status(400).send(`no result found for id ${id}`)
                }
                console.log("is working");
                // plot.destroy()
                //     .then(response => res.status(200).send(response));
                return deleteClient(currentUserId, flat);
            }).catch(err => {
                console.log(err.message);
                res.status(400).send(err)
            });
        }
    });

}
module.exports.searchUser = (req, res) => {
    let {
        value,
        page,
        minValue,
        maxValue
    } = req.query;
    let IsNumber = Number(value);
    if (!NaN) {

    }
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            if (value === '') {
                res.json('no result');
            } else {
                console.log('eror');
                return Promise.all([models.Flat.findAll({
                        where: {
                            [Op.or]: [{
                                location: {
                                    [Op.iLike]: '%' + value + '%'
                                }
                            }, {
                                area: {
                                    [Op.iLike]: '%' + value + '%'
                                }
                            }, {
                                area: {
                                    [Op.iLike]: '%' + value + '%'
                                }
                            }]
                        },
                        limit: 4,
                        offset: page
                    }), models.Flat.count({
                        where: {
                            [Op.or]: [{
                                location: {
                                    [Op.iLike]: '%' + value + '%'
                                }
                            }, {
                                area: {
                                    [Op.iLike]: '%' + value + '%'
                                }
                            }, {
                                area: {
                                    [Op.iLike]: '%' + value + '%'
                                }
                            }]
                        }
                    })])
                    .then(([result, count]) => {
                        console.log('count', count);
                        res.json({
                            total: count,
                            data: result
                        });
                    }).catch((err) => {
                        res.json({
                            result: 'failed',
                            message: 'can not find client,for search term'
                        });
                    });
            }

        }
    });
}

function updateClient(
    clientId, userId, flatPicture, forRent, confirmed, direct, phone1, phone2, marlas, sqft,
    amount, notes, lenght, width, rooms, floorNo, bath, isResidental, createdBy, updatedBy, flat
) {
    return flat.update({
            clientId: clientId ? clientId : flat.clientId,
            userId: userId,
            forRent: forRent ? forRent : flat.forRent,
            confirmed: confirmed ? confirmed : flat.confirmed,
            direct: direct ? direct : flat.direct,
            phone1: phone1 ? phone1 : flat.phone1,
            phone2: phone2 ? phone2 : flat.phone2,
            marlas: marlas ? marlas : flat.marlas,
            sqft: sqft ? sqft : flat.sqft,
            amount: amount ? amount : flat.amount,
            notes: notes ? notes : flat.notes,
            lenght: lenght ? lenght : flat.lenght,
            width: width ? width : flat.width,
            rooms: rooms ? rooms : flat.rooms,
            floorNo: floorNo ? floorNo : flat.floorNo,
            bath: bath ? bath : flat.bath,
            isResidental: isResidental ? isResidental : flat.isResidental,
            createdBy: createdBy ? createdBy : flat.createdBy,
            updatedBy: updatedBy,
            flatPicture: flatPicture? flatPicture:flatPicture
        })
        .then(respo => respo)
        .catch(err => err)
}

function deleteClient(currentUserId, flat) {
    return flat.update({
        isDeleted: true,
        deletedBy: currentUserId,
        deletedAt: Date.now()
    });
}