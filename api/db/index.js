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
db.Grain = require('./grain')(sequelize, Sequelize.DataTypes)
db.Bills = require('./bills')(sequelize, Sequelize.DataTypes)

db.Bills.belongsTo(db.People, { foreignKey: 'seller_id' })
db.Bills.belongsTo(db.People, { foreignKey: 'buyer_id' })
db.Bills.belongsTo(db.Grain, { foreignKey: 'grain_id' })

module.exports = db