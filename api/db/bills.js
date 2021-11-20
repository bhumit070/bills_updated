
module.exports = (sequelize, DataTypes) => {
	const Bills = sequelize.define(
		"Bills",
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4
			},
			date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			packing: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			soda_rate: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			bags: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			dalali_rate: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			amount: {
				type: DataTypes.INTEGER,
				allowNull: false
			}
		},
		{
			timestamps: false,
		}
	);

	return Bills;
}