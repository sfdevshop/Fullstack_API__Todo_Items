
/* where we're going to be exporting our controllers from */

const todos = require('./todos');
const todoItems = require('./todoitems');
const users = require('./users');
const noteItems = require('./noteitems');

module.exports = {
  todos,
  todoItems,
  users,
  noteItems,
};