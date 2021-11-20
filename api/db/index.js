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

// const sequelize = new Sequelize({
// 	host: 'localhost',
// 	database: 'test_bills',
// 	username: 'root',
// 	password: '',
// 	port: 3306,
// 	{
// 		dialect: 'mysql',
// 	},
// 	pool: {
// 	max: 5,
// 	min: 0,
// 	acquire: 30000,
// 	idle: 10000
// },
// 	logging: true
// });

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db