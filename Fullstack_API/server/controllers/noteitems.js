const NoteItem = require('../models').NoteItem;


module.exports = {


    /* Create New Notes */
    create(req, res) {

	   var currdatetime = new Date();
        return NoteItem

        .create({
		        title: req.body.title,
                content: req.body.content,
		        builddate:currdatetime,
		        noteId: req.params.userid,
        })

        .then((noteItem) => {
            if (!noteItem) {
                return res.send({
                    "code":404,
                    "failure":"No Note Item. Note build fail!"
                });
            }

            return res.send({
                "code":200,
                "success":"Note build success"
            });
        })
        .catch(error => {
		        return res.send({
			          "code":404,
			           "fail":"Note build fail!"
		        });
	      });
    },

    /* Update notes */
    update(req, res) {

        return NoteItem

            .find({
                where: {
                    id: req.params.noteid,
                    noteId: req.params.userid,
                },
            })

            .then(noteItem => {
                if (!noteItem) {
                    return res.send({
                        "code":404,
                        "failure":"No Note Edit!"
                    });
                }

                return noteItem
                    .update({
                        title: req.body.title || noteItem.title,
                        content: req.body.content || noteItem.content,
                    })
                    .then(updatedNoteItem => {

                        if(!updatedNoteItem) {
                            return res.send({
                                "code":404,
                                "failure":"Note update fail!"
                            });
                        }

                        return res.send({
                            "code":200,
                            "success":"Note update success"
                        });
                    })

                    .catch(error => {
                        return res.send({
                            "code":404,
                            "failure":"Note update fail!"
                        });
                    });
            })

            .catch(error => {
                return res.send({
                    "code":404,
                    "success":"Note build fail!"
                  });
            });
    },
    
  
    /* Delete Notes */
    destroy(req, res) {

        return NoteItem

        .find({
            where: {
                id: req.params.noteid,
                noteId: req.params.userid,
            },
        })

        .then(noteItem => {

            if (!noteItem) {
                return res.send({
                    "code":404,
                    "failure":"No Note to Delete!"
                });
            }

            return noteItem
            .destroy()

            .then(() => {
                return res.send({
                    "code":200,
                    "success":"Note delete successful!"
                });
            })
            .catch(error => {
                return res.send({
                    "code":404,
                    "failure":"Note delete failure!"
                });
            });
        })

        .catch(error => {
            return res.send({
                "code":404,
                "failure":"Note delete failed!"
            });
        });
    },


};

