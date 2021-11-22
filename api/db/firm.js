
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
			},
			bank_name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			bank_account_number: {
				type: DataTypes.STRING,
				allowNull: false
			},
			bank_ifsc_code: {
				type: DataTypes.STRING,
				allowNull: false
			},
		}
	);
	return Firm
}