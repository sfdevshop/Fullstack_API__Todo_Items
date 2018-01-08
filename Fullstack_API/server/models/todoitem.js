'use strict';


module.exports = (sequelize, DataTypes) => {


    /* We've added a not-null constraint in the content field and a default value 
    for the complete field. In general, having a default value means that if we 
    don't provide a value for that field when creating it, the database is going 
    to use the provided default value for that field. In addition to that, 
    we've also defined the relationship between the TodoItems and the Todo objects. 
    The onDelete: CASCADE tells Postgres that if we delete a todo, 
    it's associated todo items should be deleted as well (cascade the delete action).*/
    const TodoItem = sequelize.define('TodoItem', {

        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        complete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

    });

    TodoItem.associate = (models) => {

        TodoItem.belongsTo(models.Todo, {
            foreignKey: 'todoId',
            onDelete: 'CASCADE',
        });

    };

    return TodoItem;

};

