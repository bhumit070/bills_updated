
module.exports = (sequelize, DataTypes) => {
	const Firm = sequelize.define(
		"Firm",
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
				unique: true,
			},
			pan: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,

			},
			address: {
				type: DataTypes.STRING,
				allowNull: false,
			}
		}
	);
	return Firm
}