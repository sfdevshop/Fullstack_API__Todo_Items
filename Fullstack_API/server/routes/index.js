
/* we need to add an API route that maps to this functionality. 
We place all our routes in this index.js file.  */

const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const usersController = require('../controllers').users;
const noteItemsController = require('../controllers').noteItems;


module.exports = (app) => {


	/* This will add two new routes, 
	a welcome route at /api and a route to create todos at /api/todos. 
	When we hit /api, we are instructing our application to send back a JSON object 
	welcoming the user to our Todos API. */	
    app.get('/', (req, res) => res.sendFile(`../view/index.html`));
  	app.get('/api', (req, res) => res.status(200).send({
    	message: 'Welcome to the Todos API!',
  	}));


  	/* INFORMATION FROM TUTORIAL - USED FOR TESTING */

  	/* If we post some data to /api/todos, we are telling our application to run 
	the todosController.create function, which will take the request object, 
	extract the posted data and create a todo from it. 
	In this case, we say that the todosController.create function is the 
	POST route handler for the /api/todos endpoint.*/
  	app.post('/api/todos', todosController.create);

  	/* create a new url that maps a todos GET request to the list method */
	app.get('/api/todos', todosController.list);


	/* Used to find the todo whose id matches the todoid 
	If you make a GET request to /api/todos/1using Postman, you should see the todo 
	with id 1, with it's todo-items included in an array as well. */ 
	app.get('/api/todos/:todoId', todosController.retrieve);

	/* A new route that maps to the update method: 
	Issue a PUT request using Postman to practically test this route */
	app.put('/api/todos/:todoId', todosController.update);

	/* Delete Todo */
	app.delete('/api/todos/:todoId', todosController.destroy);


	/* creating a new todoitem with todoId 
	The :todoId in the route is made available to us by Express in the request.params object 
	as todoId and is the same one we're accessing in our controller. 
	ADD A todoItems controller as todoItemsController at the top of the routes file. */
	app.post('/api/todos/:todoId/items', todoItemsController.create);


	/* Update TODOITEM with specified TODOID */
	app.put('/api/todos/:todoId/items/:todoItemId', todoItemsController.update);

	/* Delete TODOITEM with specified TODOID */
  	app.delete(
    	'/api/todos/:todoId/items/:todoItemId', todoItemsController.destroy
  	);

  	// For any other request method on todo items, we're going to return "Method Not Allowed"
  	app.all('/api/todos/:todoId/items', (req, res) =>
    	res.status(405).send({
      		message: 'Method Not Allowed',
  	}));

  	/* END OF INFORMATION FROM TUTORIAL - USED FOR TESTING */



  	/*	USER INFO FOR FULL STACK API!! */

  	//create user
    app.post('/api/users', usersController.create);

    //Check user's passowrd
    app.post('/api/users/check', usersController.check);

    //Get user info
    app.get('/api/users/:userid', usersController.retrieve);

    //Update user info
    app.post('/api/users/:userid', usersController.update);
    
    //Update password
    app.post('/api/users/pwd/:userid', usersController.updatePwd);
  	
  	//Create/Update/Delete Notes	
  	app.post('/api/notes/:userid', noteItemsController.create);
  	app.post('/api/notes/:userid/items/:noteid', noteItemsController.update);
  	app.delete('/api/notes/:userid/items/:noteid', noteItemsController.destroy);

  	// For any other request method on todo items, we're going to return "Method Not Allowed"
  	app.all('/api/notes/:userId', (req, res) =>
    	res.status(405).send({
      		message: 'Method Not Allowed',
  	}));


  	/*	END OF USER INFO FOR FULL STACK API!! */

	
};


