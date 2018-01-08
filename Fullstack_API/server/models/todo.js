'use strict';


module.exports = (sequelize, DataTypes) => {


      /* allowNull: false - This means that the database will not allow us to write 
      to it if we don't provide a value for the title field. 
      We also defined the relationship between a Todo and it's TodoItems in the 
      Todo.associate class method. 
      The as: 'todoItems' means that every time we query for a todo and 
      include it's todo items, they'll be included under the key todoItems 
      instead of TodoItems (Sequelize defaults to using the pluralized model name). */
      const Todo = sequelize.define('Todo', {
    
          title: {
            type: DataTypes.STRING,
            allowNull: false,
          },

      });

      Todo.associate = (models) => {

          Todo.hasMany(models.TodoItem, {
              foreignKey: 'todoId',
              as: 'todoItems',
          });

      };

      return Todo;

};

