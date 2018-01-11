const User = require('../models').User;
const NoteItem = require('../models').NoteItem;


module.exports = {


    /* Create Users */
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

            .then((user) =>{return res.send({
                "code":200,
                "success":"Register sucessfull",
                "user":user
            });})
            .catch((error) => {return res.send({
                "code":404,
                "success":"Register fail"
            });});
    },


    /* Find user info */
    retrieve(req, res) {

        return User

            .findById(req.params.userid, {
                include: [{
                    model: NoteItem ,
                    as: 'noteItems',
                }],
                order: [
                    [{ model: NoteItem, as: 'noteItems' }, 'createdAt', 'ASC'],
                ],
            })

            .then((user) => {
                if(!user) {
                    return res.send({
                        "code":404,
                        "success":"User do not match"
                    });
                }

                return res.send({
                    "code":200,
                    "success":"user find sucessfull",
                    "user":user
                });
            })

            .catch((error) => {return res.send({
                  "code":404,
                  "success":"user do not match"
            });});
    },


    /* Check user and password */
    check(req, res) {

        var md5=require("md5");
        var pwd=md5(req.body.password);

        return User

            .findOne({
                where: {
                    username: req.body.username,
                    password: pwd
                },
                include: [{
                    model: NoteItem ,
                    as: 'noteItems',
                }],
                order: [
                    [{ model: NoteItem, as: 'noteItems' }, 'createdAt', 'ASC'],
                ],
            })

            .then((user) => {

                if(!user) {
                    return res.send({
                        "code":404,
                        "failure":"Username password do not match"
                    });
                }
                return res.send({
                    "code":200,
                    "success":"login sucessfull",
                    "user":user
                });
            })
            .catch((error) => {return res.send({
                "code":404,
                "failure":"Username password do not match"
            });});
      },


      /* Update User info */
      update(req, res) {

          var md5=require("md5");

          return User

              .findById(req.params.userid, {
                  include: [{
                      model: NoteItem,
                      as: 'noteItems',
                  }],
              })
              .then(user => {
                  if(!user) {
                      return res.status(404).send({
                          message: 'user Not Found',
                      });
                  }
                  return user
                    .update({
                        email: req.body.email || user.email,
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


      /* Modify Password */
      updatePwd(req, res) {

          var md5=require("md5");
          var pwd=md5(req.body.password);

          return User

              .findById(req.params.userid, {
                  include: [{
                      model: NoteItem,
                      as: 'noteItems',
                  }],
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

