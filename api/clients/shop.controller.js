const models = require('../../models');
const jwt = require('jsonwebtoken');
var jwt_decode = require('jwt-decode');

module.exports.get = (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            var token = jwt_decode(req.bearerHeader);
            var userId = token.authenticatedUser.id;
            models.Shop.findAll({
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
                        message: 'can not find shops'
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
            models.Shop.findOne({
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
                        message: 'can not find shop,to update'
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
                        message: 'can not find Shop,to update'
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
                sqft,
                amount,
                notes,
                lenght,
                width,
            } = req.body;
            console.log('body::',req.body);
            let token = jwt_decode(req.bearerHeader);
            let userId = token.authenticatedUser.id;
            let createdBy = userId;
            let updatedBy = userId;
            if (marlas != '') {
                console.log('total marlas::', marlas);
            } else {
                console.log('calculate');
                sqft = lenght * width;
                marlas = sqft / 272.25
                console.log(sqft + ' :: ' + marlas);
            }
            models.Shop.create({
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
                createdBy,
                updatedBy
            }).then(result => {
                res.json({
                    result: 'ok',
                    data: result,
                    message: "create new Shop successfully"
                });
            }).catch(err => {
                res.json({
                    result: "faild got eror shop",
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
                createdBy,
                updatedBy
            } = req.body;
            var token = jwt_decode(req.bearerHeader);
            let currentUserId = token.authenticatedUser.id;
            if (lenght != '' && width != '') {
                sqft = lenght * width;
                marlas = sqft / 272.25
            }
            models.Shop.findById(id)
                .then(shop => {
                    if (!shop) {
                        res.status(400).send(`no result found for id ${id}`)
                    }
                    return updateClient(clientId, userId, forRent, confirmed, direct, phone1, phone2, marlas, sqft,
                        amount, notes, lenght, width, createdBy, currentUserId, shop);
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
            models.shop.findById(id).then(shop => {
                if (shop) {
                    res.status(400).send(`no result found for id ${id}`)
                }
                console.log("is working");
                // plot.destroy()
                //     .then(response => res.status(200).send(response));
                return deletePlot(currentUserId, shop);
            }).catch(err => {
                console.log(err.message);
                res.status(400).send(err)
            });
        }
    });
}

function updateShop(clientId, userId, forRent, confirmed, direct, phone1, phone2, marlas, sqft,
    amount, notes, lenght, width, createdBy, currentUserId, shop) {
    return shop.update({
            clientId: clientId ? clientId : shop.clientId,
            userId: userId,
            forRent: forRent ? forRent : shop.forRent,
            confirmed: confirmed ? confirmed : shop.confirmed,
            direct: direct ? direct : shop.direct,
            phone1: phone1 ? phone1 : shop.phone1,
            phone2: phone2 ? phone2 : shop.phone2,
            marlas: marlas ? marlas : shop.marlas,
            sqft: sqft ? sqft : shop.sqft,
            amount: amount ? amount : shop.amount,
            notes: notes ? notes : shop.notes,
            lenght: lenght ? lenght : shop.lenght,
            width: width ? width : shop.width,
            createdBy: createdBy ? createdBy : shop.createdBy,
            updatedBy: currentUserId
        })
        .then(respo => respo)
        .catch(err => err)
}

function deleteShop(currentUserId, shop) {
    return shop.update({
        isDeleted: true,
        deletedBy: currentUserId,
        deletedAt: Date.now()
    });
}