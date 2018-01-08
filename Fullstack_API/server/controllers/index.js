
/* where we're going to be exporting our controllers from */

const todos = require('./todos');
const todoItems = require('./todoitems');

module.exports = {
  todos,
  todoItems,
};