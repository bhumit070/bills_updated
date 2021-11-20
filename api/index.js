const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json())

// routes
const firmRoutes = require('./routes/firm')
const peopleRoutes = require('./routes/people')

app.use(firmRoutes)
app.use(peopleRoutes)

app.use((req, res) => {
	return res.status(404).json({
		error: true,
		message: 'Route not found'
	})
})

// db connection
db.sequelize.sync().then(() => {
	console.log('db connected')
}).catch(err => {
	console.log(err)
	process.exit(1)
})

module.exports = app;