// const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
// const ApiError = require('../utils/ApiError');
const { purchaseService } = require('../services');

// const stripe = Stripe('sk_test_yourSecretKey');

const createPurchase = catchAsync(async (req, res) => {
	// const { amount, currency } = req.body;

	// const paymentIntent = await stripe.paymentIntents.create({
	// 	amount, // amount in smallest currency unit, e.g., cents
	// 	currency, // e.g., 'usd'
	// });

	// send to stripe
	const purchase = await purchaseService.createPurchase();

	// if fail, show message to user

	// if success, add a row in the database

	// what if adding a row fails?

	res.send({
		success: true,
		clientSecret: purchase.paymentIntent.client_secret,
	});
});

// const createPurchase = catchAsync(async

//     app.post('/create-payment-intent', async (req, res) => {
//     try {
//         const { amount, currency } = req.body;

//         const paymentIntent = await stripe.paymentIntents.create({
//             amount, // amount in smallest currency unit, e.g., cents
//             currency, // e.g., 'usd'
//         });

//         res.send({
//             clientSecret: paymentIntent.client_secret,
//         });
//     } catch (error) {
//         res.status(500).send({ error: error.message });
//     }
// });

module.exports = {
	createPurchase,
};
