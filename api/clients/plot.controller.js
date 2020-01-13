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

            models.Plot.findAll({
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
                        message: 'can not find plot,to update'
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
            models.Plot.findOne({
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
                        message: 'can not find plot,to update'
                    });
                });
        }
    });
}
module.exports.getAllUserPlot = (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            let id = req.params.id;
            console.log("current requested Id", id);
            models.Plot.findAll({
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
                        message: 'can not find plot,to update'
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
                isResidental,
            } = req.body;
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
            models.Plot.create({
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
                isResidental,
                createdBy,
                updatedBy
            }).then(result => {
                res.json({
                    result: 'ok',
                    data: result,
                    message: "create new cPlot successfully"
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
            models.Plot.findById(id)
                .then(plot => {
                    if (!plot) {
                        res.status(400).send(`no result found for id ${id}`)
                    }
                    return updatePlot(
                        clientId, userId, forRent, confirmed, direct, phone1, phone2, marlas, sqft,
                        amount, notes, lenght, width, isResidental, createdBy, currentUserId, plot);
                })
                .then(x => res.send({
                    data: x
                }))
                .catch(err => {
                    console.log(err.message);
                    res.status(400).send(err)
                });
        }});

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
            models.Plot.findById(id).then(plot => {
                if ( plot) {
                    res.status(400).send(`no result found for id ${id}`)
                }
                console.log("is working");
                // plot.destroy()
                //     .then(response => res.status(200).send(response));
                return deletePlot(currentUserId, plot);
            }).catch(err => {
                console.log(err.message);
                res.status(400).send(err)
            });
        }
    });
}

function updatePlot(clientId, userId, forRent, confirmed, direct, phone1, phone2, marlas, sqft,
    amount, notes, lenght, width, isResidental, createdBy, currentUserId, plot) {
    return plot.update({
        clientId: clientId ? clientId : plot.clientId,
        userId: userId,
        forRent: forRent ? forRent : plot.forRent,
        confirmed: confirmed ? confirmed : plot.confirmed,
        direct: direct ? direct : plot.direct,
        phone1: phone1 ? phone1 : plot.phone1,
        phone2: phone2 ? phone2 : plot.phone2,
        marlas: marlas ? marlas : plot.marlas,
        sqft: sqft ? sqft : plot.sqft,
        amount: amount ? amount : plot.amount,
        notes: notes ? notes : plot.notes,
        lenght: lenght ? lenght : plot.lenght,
        width: width ? width : plot.width,
        isResidental: isResidental ? isResidental : plot.isResidental,
        createdBy: createdBy ? createdBy : plot.createdBy,
        updatedBy: currentUserId
        })
        .then(respo => respo)
        .catch(err => err)
}

function deletePlot(currentUserId, plot) {
    return plot.update({
        isDeleted: true,
        deletedBy: currentUserId,
        deletedAt: Date.now()
    });
}