module.exports = (sequelize, DataTypes) => {
	const ShippingStatus = DataTypes.ENUM('pending', 'shipped', 'delivered');
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
			stripe_transaction_id: {
				type: DataTypes.STRING(255),
				allowNull: false,
				unique: true,
			},
			shipping_address: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			purchase_date: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
			shipping_status: {
				type: ShippingStatus,
				defaultValue: 'pending',
			},
			shipping_date: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			created_date_time: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
				allowNull: false,
			},
			modified_date_time: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
				allowNull: false,
			},
		},
		{
			/**
			 * By default, sequelize will automatically transform all passed model names into plural
			 * References: https://sequelize.org/master/manual/model-basics.html#table-name-inference
			 */
			tableName: 'purchase',
		}
	);

	return purchase;
};
