const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json())

// routes
const firmRoutes = require('./routes/firm')
const peopleRoutes = require('./routes/people')
const billRoutes = require('./routes/bills')
const grainRoutes = require('./routes/grain')

app.use(firmRoutes)
app.use(peopleRoutes)
app.use(billRoutes)
app.use(grainRoutes)


app.post('/secret', (req, res) => {
	const adminSecret = process.env.ADMIN_SECRET
	const { secret } = req.body

	if (secret === adminSecret) {
		return res.status(200).json({
			message: 'Welcome to the admin panel'
		})
	} else {
		return res.status(401).json({
			message: 'Unauthorized'
		})
	}
})

app.use((req, res) => {
	return res.status(404).json({
		error: true,
		message: 'Route not found'
	})
})

// db connection
db.sequelize.sync().then(() => {
	// eslint-disable-next-line no-console
	console.log('db connected')
}).catch(err => {
	// eslint-disable-next-line no-console
	console.log(err)
	process.exit(1)
})

module.exports = app;