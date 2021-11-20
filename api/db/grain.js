module.exports = (sequelize, DataTypes) => {
	const Grain = sequelize.define(
		"Grain",
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			}
		}
	);
	return Grain
}