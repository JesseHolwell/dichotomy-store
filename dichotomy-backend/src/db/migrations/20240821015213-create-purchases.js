'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('purchase', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			stripeTransactionId: {
				type: Sequelize.STRING(255),
				allowNull: false,
				unique: true,
			},
			shippingAddress: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			purchaseDate: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},
			shippingStatus: {
				type: Sequelize.ENUM('pending', 'shipped', 'delivered'),
				defaultValue: 'pending',
			},
			shippingDate: {
				type: Sequelize.DATE,
				allowNull: true,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('purchase');
	},
};
