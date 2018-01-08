/* This adds functionality to create a todoitem */
const TodoItem = require('../models').TodoItem;

module.exports = {

	/* We create a todoitem and associating it with a particular todo.
	We are grabbing the id of that particular todo from the request params. 
	We are also adding the todoItems controller to our default exports. 
	We're using the ES6 object shorthand notation to add the methods to module.exports. */
  	create(req, res) {

    	return TodoItem
      
      		.create({
        		  content: req.body.content,
        		  todoId: req.params.todoId,
      		})

      		.then(todoItem => res.status(201).send(todoItem))
      		.catch(error => res.status(400).send(error));

  	}, /* END CREATE */


    /* UPDATE TODOITEM 
    we're finding the todo item to either update or delete by two criteria: 
    it's own id which we're grabbing from the params as todoItemId and the id 
    of it's parent todo, which we're obtaining from the params object as todoId. 
    We are grabbing the provided todoItemId from the request. We are then finding 
    the todo item with that id and in readiness to update it. 
    If we don't find it, we return early and send and error message to the user.*/
    update(req, res) {

        return TodoItem

            .find({
                where: {
                    id: req.params.todoItemId,
                    todoId: req.params.todoId,
                },
            })

            .then(todoItem => {

                if(!todoItem) {
                    return res.status(404).send({
                        message: 'TodoItem Not Found',
                    });
                }

                return todoItem

                    /*.update({
                        content: req.body.content || todoItem.content,
                        complete: req.body.complete || todoItem.complete,
                    })*/

                    /* The Sequelize update, the data and then specify the fields it should update 
                    we pass the whole update object we get from the request (req.body) to the update 
                    function. Using ES6's Object.keys function, we extract the keys from the update 
                    object and tell the TodoItem Sequelize model to only update the fields that are 
                    present in the update data object. If we have a field in our model that's missing 
                    from the update object, the update operation will leave that field untouched. 
                    This saves us the trouble of having to define defaults using the || operator. */
                    .update(req.body, { fields: Object.keys(req.body) })

                    .then(updatedTodoItem => res.status(200).send(updatedTodoItem))
                    .catch(error => res.status(400).send(error));
                    

            }) /* END .THEN(TODOITEM => */

          .catch(error => res.status(400).send(error));

    }, /* END UPDATE */


    /* DELETE TODOITEM 
    we're finding the todo item to either update or delete by two criteria: 
    it's own id which we're grabbing from the params as todoItemId and the id 
    of it's parent todo, which we're obtaining from the params object as todoId. */
    destroy(req, res) {

      return TodoItem

        .find({
            where: {
              id: req.params.todoItemId,
              todoId: req.params.todoId,
            },
          })

        .then(todoItem => {

            if(!todoItem) {
                return res.status(404).send({
                    message: 'TodoItem Not Found',
                });
            }

            return todoItem
                .destroy()
                .then(() => res.status(204).send())
                .catch(error => res.status(400).send(error));

        }) /* END THEN(TODOITEM => */

        .catch(error => res.status(400).send(error));

    }, /* END DELETE TODOITEM */

  	
};


