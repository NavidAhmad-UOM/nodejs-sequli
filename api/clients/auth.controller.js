const models = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

//.. create user
module.exports.post = (req, res)=>{ 
    console.log(req);
    let {firstName, lastName, email, userName, password, phoneNumber,cnic} = req.body;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        console.log(hash)
        // Store hash in your password DB.

        models.User.findOne({where: {email,userName}})
            .then(user => {
                console.log('user : ', user);
                if (!user) {
                    return signUpNewUser(firstName, lastName, email, userName, hash, phoneNumber,cnic)
                } else {
                    if(user.email)
                    {
                        if(user.userName)
                        {
                            console.log("userName and eamil already exist...!");
                            res.status(400).send("email already exist .. ");
                        }else{
                            console.log("email already exist...!");
                        res.status(400).send("email already exist .. ");
                        }
                    }else{
                        console.log("userName already exist...!");
                        res.status(400).send("userName already exist .. ");
                    }
                }
            })
            .then(createdUser => {
                console.log('created user :',createdUser);
                return UpdateUser(createdUser);
            }).then(updatedUser =>{
                const {id, email} = updatedUser || {}
                    const authenticatedUser = {id, email}
                jwt.sign({authenticatedUser},'secretKey',{expiresIn:'3600s'},(err, token) => {
                    res.json({
                        token
                    });
                });
            });

      });

}

//... login user
module.exports.login = (req, res) => {
    let {email,password} = req.body;
    models.User.findOne({where: {email}})
         .then(user => {
            //  console.log('user with email :',user);
             if(user){
                bcrypt.compare(password, user.password, function(err, result) {
                    const {id, email} = user || {}
                    const authenticatedUser = {id, email}
                    // res == false
                    if(result == true)
                    {
                        
                        jwt.sign({authenticatedUser},'secretKey',{expiresIn:'3600s'},(err, token) => {
                            res.json({
                                token
                            });
                        });
                    }else
                    {
                        res.json("your password or email is incoreect");
                    }
                });
             }else{
                 res.json('your email is incorrect..');
             }
         })
}

// .. create new user
function signUpNewUser(firstName, lastName, email, userName, password, phoneNumber,cnic){
    console.log('data before signUp.. '+firstName +" - " + lastName  +" - " + email 
     +" - " +userName  +" - " +password  +" - " +phoneNumber+'cnic:'+cnic);
    return models.User.create({
        firstName, 
        lastName, 
        email, 
        userName, 
        password, 
        phoneNumber,
        cnic
    }).then(user => {
        console.log(user);
        return user;
    })
    .catch(err => err);
}
function UpdateUser(user){
    console.log('user updated');
    return user.update({
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        userName:user.userName,
        phoneNumber:user.phoneNumber,
        cnic:user.cnic,
        createdBy:user.id,
        updatedBy: user.id
    })
    .then(respo => respo)
    .catch(err => err)
}

