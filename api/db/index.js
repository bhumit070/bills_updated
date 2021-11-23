const Sequelize = require('sequelize');


const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST || 'localhost',
		dialect: process.env.DB_DIALECT || 'mysql',
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		},
		logging: (data) => {
			// eslint-disable-next-line no-console
			process.env.NODE_ENV === 'development' && console.log(data);
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

db.Bills.belongsTo(db.People, { foreignKey: 'seller_id', as: 'seller' })
db.Bills.belongsTo(db.People, { foreignKey: 'buyer_id', as: 'buyer' })
db.Bills.belongsTo(db.Grain, { foreignKey: 'grain_id', as: 'grain' })
db.Bills.belongsTo(db.Firm, { foreignKey: 'firm_id', as: 'firm' })

module.exports = db