module.exports = (sequelize, DataTypes) => {
	const purchase = sequelize.define(
		'purchase',
		{
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			stripeTransactionId: {
				type: DataTypes.STRING(255),
				allowNull: false,
				unique: true,
			},
			shippingAddress: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			purchaseDate: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
			shippingStatus: {
				type: DataTypes.ENUM('pending', 'shipped', 'delivered'),
				defaultValue: 'pending',
			},
			shippingDate: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			tableName: 'purchase',
		}
	);

	return purchase;
};
