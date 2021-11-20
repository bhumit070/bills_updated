const express = require('express');
const app = express();
const db = require('./db');

// routes



// db connection
db.sequelize.sync().then(() => {
	console.log('db connected')
}).catch(err => {
	console.log(err)
	process.exit(1)
})

module.exports = app;