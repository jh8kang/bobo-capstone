const knex = require('knex')(require('./knexfile.js'));
const bookshelf = require('bookshelf')('knex');
module.exports = bookshelf;