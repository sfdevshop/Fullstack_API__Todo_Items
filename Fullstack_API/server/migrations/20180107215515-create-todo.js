'use strict';

/* When we run these migrations, the up function will be executed. It will take 
care of creating the table and it's associated columns for us. If, for whatever 
reason, we needed to rollback (undo) the migration, the down function would be 
executed and it would undo whatever the up function did, thus returning the our 
database to the same state it was in before we performed the migration.

These migrations are a representation of how we want our models to look like in 
the database. Notice we define the relationship between our models in the 
create-todo-item.js migration file as well. The todoId field was not automatically 
generated and we've had to manually define it. Sequelize automatically generates 
the id, createdAt and updatedAt fields for you. In addition to that, any time a 
model is saved, the updatedAt field is automatically updated to reflect the new 
update time.*/

module.exports = {

    up: (queryInterface, Sequelize) =>

        queryInterface.createTable('Todos', {

            id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER,
            },

            title: {
              type: Sequelize.STRING,
              allowNull: false,
            },

            createdAt: {
              allowNull: false,
              type: Sequelize.DATE,
            },

            updatedAt: {
              allowNull: false,
              type: Sequelize.DATE,
            },

        }),

    down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Todos'),


};

