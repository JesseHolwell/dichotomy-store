// const httpStatus = require('http-status');
// const { getOffset } = require('../utils/query');
// const ApiError = require('../utils/ApiError');
// const { encryptData } = require('../utils/auth');
// const config = require('../config/config.js');
const stripe = require('stripe')('sk_test_...');
// const stripe = new Stripe('sk_test_...');
const db = require('../db/models');

async function createPaymentIntent(req) {
	try {
		const { amount, currency } = req.body;

		stripe.customers
			.create({
				email: 'customer@example.com',
			})
			.then((customer) => console.log(customer.id))
			.catch((error) => console.error(error));

		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency,
		});
		// res.send({ clientSecret: paymentIntent.client_secret });
		console.log('PAYMENT PROCESSED SUCCESSFULLY');

		return paymentIntent;
	} catch (error) {
		// res.status(500).send({ error: error.message });
		console.log('PAYMENT PROCESSED FAILED');
	}
}

async function createPurchase() {
	// const { email, name } = req.body;

	const paymentIntent = await createPaymentIntent();

	const createdPurchase = await db.purchase
		.create({
			name: 'name',
			email: 'email',
			stripe_transaction_id: paymentIntent.stripe_transaction_id,
			shipping_address: 'shipping address',
		})
		.then((resultEntity) => resultEntity.get({ plain: true }));

	console.log('PURCHASE CREATED SUCCESSFULLY');

	return createdPurchase;
}

module.exports = {
	createPurchase,
};
