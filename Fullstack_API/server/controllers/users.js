const User = require('../models').User;
//const NoteItem = require('../models').NoteItem;

module.exports = {

    /* Create Users 
    WE IMPORT MD5 TO SCRAMBLE PASSWORDS 
    Here is more info about MD5: https://www.npmjs.com/package/md5 */
    create(req, res) {

  	   var md5=require("md5");
  	   var pwd=md5(req.body.password); 

        return User

            .create({
            	username:req.body.username,
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                password: pwd,
            	email: req.body.email,
            })

            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error));
    },

    /* Find user */
    retrieve(req, res) {

        return User

            .findById(req.params.userid, {
                /*include: [{
                    model: NoteItem ,
                    as: 'noteItems',
                }],
                order: [
                    [{ model: NoteItem, as: 'noteItems' }, 'createdAt', 'ASC'],
                ],*/
            })
            
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
            return res.status(200).send(user);

            })
            .catch(error => res.status(400).send(error));
    },


    /* Modify Password */
    updatePwd(req, res) {

        var md5=require("md5");
        var pwd=md5(req.body.password);

        return User

        .findById(req.params.userid, {
            /*include: [{
                model: NoteItem,
                as: 'noteItems',
            }],*/
        })

        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: 'user Not Found',
                });
            }

            return user

                .update({
                      password: pwd || user.password,
                })
                .then(() => {
                    return res.send({
                        "code":200,
                        "success":"Update sucessfull",
                    });
                })
                .catch((error) => {
                    return res.send({
                        "code":404,
                        "success":"Update fail",
                  });
            });
        })
        .catch((error) => {
            return res.send({
                  "code":404,
              "success":"Update fail",
            });
        });

  },


};
