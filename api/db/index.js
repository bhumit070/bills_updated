const Sequelize = require('sequelize');


const sequelize = new Sequelize(
	'test_bills',
	'root',
	'',
	{
		dialect: 'mysql',
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		},
		logging: (data) => {
			console.log(data);
		},
	}
);


const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Firm = require('./firm')(sequelize, Sequelize.DataTypes)
db.People = require('./people')(sequelize, Sequelize.DataTypes)

module.exports = db