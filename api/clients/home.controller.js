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

            models.House.findAll({
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
                        message: 'can not find Home,to update'
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
            models.House.findOne({
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

module.exports.create = (req, res) => {
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
        rooms,
        totalFloors,
        bath,
        isResidental
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
    models.House.create({
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
        totalFloors,
        bath,
        isResidental,
        createdBy,
        updatedBy
    }).then(result => {
        res.json({
            result: 'ok',
            data: result,
            message: "create new house successfully"
        });
    }).catch(err => {
        res.json({
            result: "faild",
            message: err.message
        });
    })
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
                rooms,
                totalFloors,
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
            models.House.findById(id)
                .then(house => {
                    if (!house) {
                        res.status(400).send(`no result found for id ${id}`)
                    }

                    return updateClient(clientId, userId, forRent, confirmed, direct, phone1, phone2, marlas, sqft,
                        amount, notes, lenght, width, rooms, totalFloors, bath, isResidental, createdBy, currentUserId, house);
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
            models.House.findById(id).then(house => {
                if ( house) {
                    res.status(400).send(`no result found for id ${id}`)
                }
                console.log("is working");
                // plot.destroy()
                //     .then(response => res.status(200).send(response));
                return deleteHome(currentUserId, house);
            }).catch(err => {
                console.log(err.message);
                res.status(400).send(err)
            });
        }
    });

}

function updateClient(clientId, userId, forRent, confirmed, direct, phone1, phone2, marlas, sqft,
    amount, notes, lenght, width, rooms, totalFloors, bath, isResidental, createdBy, currentUserId, house) {

    return house.update({
            // currently working
            clientId: clientId ? clientId : house.clientId,
            userId: userId,
            forRent: forRent ? forRent : house.forRent,
            confirmed: confirmed ? confirmed : house.confirmed,
            direct: direct ? direct : house.direct,
            phone1: phone1 ? phone1 : house.phone1,
            phone2: phone2 ? phone2 : house.phone2,
            marlas: marlas ? marlas : house.marlas,
            sqft: sqft ? sqft : house.sqft,
            amount: amount ? amount : house.amount,
            notes: notes ? notes : house.notes,
            lenght: lenght ? lenght : house.lenght,
            width: width ? width : house.width,
            rooms: rooms ? rooms : house.rooms,
            totalFloors: totalFloors ? totalFloors : house.totalFloors,
            bath: bath ? bath : house.bath,
            isResidental: isResidental ? isResidental : house.isResidental,
            createdBy: createdBy ? createdBy : house.createdBy,
            updatedBy: currentUserId
        })
        .then(respo => respo)
        .catch(err => err)
}

function deleteHome(currentUserId, house) {
    return house.update({
        isDeleted: true,
        deletedBy: currentUserId,
        deletedAt: Date.now()
    });
}