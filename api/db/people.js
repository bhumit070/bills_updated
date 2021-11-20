module.exports = (sequelize, DataTypes) => {
	const Firm = sequelize.define(
		"Peoples",
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
			},
			place: {
				type: DataTypes.STRING,
				allowNull: false,
			}
		}
	);
	return Firm
}