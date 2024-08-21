const config = require('../config/config');
// eslint-disable-next-line import/order
const stripe = require('stripe')(config.stripe.secretKey);
const db = require('../db/models');
const logger = require('../config/logger');

async function createPaymentIntent(req) {
	logger.debug('the service was hit');

	const { amount, currency } = req.body;

	// TODO: create a customer in stripe?
	// TODO: add a line in the db on intent?

	const paymentIntent = await stripe.paymentIntents.create({
		amount,
		currency,
	});

	logger.debug('PAYMENT PROCESSED SUCCESSFULLY');
	return {
		clientSecret: paymentIntent.client_secret,
	};
}

async function savePurchase(req) {
	logger.debug('the service was hit');

	const { stripeTransactionId, amount, name, email, phone, shippingAddress } =
		req.body;

	await db.purchase.create({
		stripeTransactionId,
		amount,
		name,
		email,
		phone,
		shippingAddress,
	});

	logger.debug('PURCHASE CREATED SUCCESSFULLY');
	return { success: true };
}

module.exports = {
	createPaymentIntent,
	savePurchase,
};
