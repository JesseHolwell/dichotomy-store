module.exports = (sequelize, DataTypes) => {
	const ShippingStatus = DataTypes.ENUM('pending', 'shipped', 'delivered');

	return ShippingStatus;
};
