const db = require('../db/models');
const logger = require('../config/logger');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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

	const { paymentIntentId, amount, name, email, shippingAddress } = req.body;

	await db.purchase.create({
		stripe_transaction_id: paymentIntentId,
		amount,
		name,
		email,
		shipping_address: shippingAddress,
	});

	logger.debug('PURCHASE CREATED SUCCESSFULLY');
	return { success: true };
}

module.exports = {
	createPaymentIntent,
	savePurchase,
};
