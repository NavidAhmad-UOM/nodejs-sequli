const models = require('../../models');
const jwt = require('jsonwebtoken');
var jwt_decode = require('jwt-decode');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
var fs = require('fs');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.get = (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            var token = jwt_decode(req.bearerHeader);
            var userId = token.authenticatedUser.id;

            models.User.findAll({
                    where: {
                        id: userId
                    }
                })
                .then((result) => {
                    console.log("isRequest"), result;
                    res.json({

                        data: result
                    });
                }).catch((err) => {
                    res.json({
                        result: 'failed',
                        message: 'can not find User'
                    });
                });
        }
    });
};

module.exports.getAll = (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            var token = jwt_decode(req.bearerHeader);
            console.log('find');
            models.User.findAll()
                .then((result) => {
                    res.json({

                        data: result
                    });
                }).catch((err) => {
                    res.json({
                        result: 'failed',
                        message: 'can not find User'
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
            models.User.findOne({
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
                        message: 'can not find user,to update'
                    });
                });
        }
    });
}
module.exports.searchUser = (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            // let searchTerm= req.params.searchTerm;
            let searchTerm = req.query.value;
            if (searchTerm === '') {
                res.json({
                    data: []
                });
            }
            models.Clients.findAll({
                    where: {
                        [Op.or]: [{
                            firstName: {
                                [Op.iLike]: '%' + searchTerm + '%'
                            }
                        }, {
                            lastName: {
                                [Op.iLike]: '%' + searchTerm + '%'
                            }
                        }]
                    }
                })
                .then((result) => {
                    res.json({

                        data: result
                    });
                }).catch((err) => {
                    res.json({
                        result: 'failed',
                        message: 'can not find user,for search term'
                    });
                });
        }
    });
}

module.exports.create = (req, res) => {
    let {
        firstName,
        lastName,
        email,
        username,
        password,
        phoneNumber,
        profile
    } = req.body;
    models.User.create({
        firstName,
        lastName,
        email,
        username,
        password,
        phoneNumber,
        profile
    }).then(result => {
        res.json({
            result: 'ok',
            data: result,
            message: "create new user successfully"
        });
    }).catch(err => {
        res.json({
            result: "faild",
            message: "got error while creating new user"
        });
    })
}

module.exports.put = (req, res) => {
    const {
        id
    } = req.params;
    let {
        firstName,
        lastName,
        email,
        username,
        password,
        phoneNumber,
        profile

    } = req.body;
    console.log('request body ::', req.body);
    models.User.findById(id)
        .then(user => {
            if (!user) {
                res.status(400).send(`no result found for id ${id}`)
            }
            if (user.profile != null) {
                fs.unlink("." + user.profile, function (err) {
                    if (err) throw err;
                    // if no error, file has been deleted successfully
                    console.log('File deleted!');
                });
            }
            return updateClient(firstName, lastName, email, username, password, phoneNumber, profile, user)
        })
        .then(x => res.send({
            data: x
        }))
        .catch(err => {
            console.log(err.message);
            res.status(400).send(err)
        });
}

//.. delete user
module.exports.delete = (req, res) => {
    const {
        id
    } = req.params;
    console.log("current requested ID", id);
    models.User.findById(id).then(user => {
        if (!user) {
            res.status(400).send(`no result found for id ${id}`)
        }
        user.destroy()
            .then(response => res.status(200).send(response));
    }).catch(err => {
        console.log(err.message);
        res.status(400).send(err)
    });
}
module.exports.getCurrentUser = (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            var token = jwt_decode(req.bearerHeader);
            var userId = token.authenticatedUser.id;

            models.User.findOne({
                    where: {
                        id: userId
                    },
                    attributes: ['id', 'firstName', 'lastName', 'email', 'username', 'phoneNumber', 'profile']
                })
                .then((result) => {
                    console.log("isRequest"), result;
                    res.json({

                        data: result
                    });
                }).catch((err) => {
                    res.json({
                        result: 'failed',
                        message: 'can not find User'
                    });
                });
        }
    });
};
module.exports.changePassword = (req, res) => {
    let {
        oldPassword,
        newPassword
    } = req.body;

    console.log('old', oldPassword + ' new:', newPassword);
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            var token = jwt_decode(req.bearerHeader);
            var userId = token.authenticatedUser.id;

            models.User.findOne({
                    where: {
                        id: userId
                    }
                })
                .then((user) => {
                    let {
                        firstName,
                        lastName,
                        email,
                        username,
                        password,
                        phoneNumber,
                        profile
                    } = user;
                    bcrypt.compare(oldPassword, password, (err, result) => {
                        // res == false
                        console.log('IsSame:', result);
                        if (result === true) {
                            console.log('they are');
                            bcrypt.hash(newPassword, saltRounds, function (err, hash) {
                                console.log(hash);
                                let x = changePassword(firstName, lastName, email, username, hash, phoneNumber, profile, user);
                                console.log('result:', result);
                                res.json("password changed successfully");
                            });
                        } else {
                            res.json("your password incorrect");
                        }
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


function updateClient(firstName, lastName, email, phoneNumber, user, createdBy, profile, user) {
    return user.update({
            firstName: firstName ? firstName : user.firstName,
            lastName: lastName ? lastName : user.lastName,
            email: email ? email : user.email,
            phoneNumber: phoneNumber ? phoneNumber : user.phoneNumber,
            createdBy: createdBy ? createdBy : user.createdBy,
            profile: profile ? profile : user.profile
        })
        .then(respo => respo)
        .catch(err => err)
}

function changePassword(firstName, lastName, email, username, password, phoneNumber, profile, user) {
    console.log('current changes', password);
    return user.update({
            firstName: firstName ? firstName : user.firstName,
            lastName: lastName ? lastName : user.lastName,
            email: email ? email : user.email,
            username: username ? username : user.username,
            password: password ? password : user.password,
            phoneNumber: phoneNumber ? phoneNumber : user.phoneNumber,
            profile: profile ? profile : user.profile
        }).then(user => {
            console.log(user);
            return user;
        })
        .catch(err => err)
}