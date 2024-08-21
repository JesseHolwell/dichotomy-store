const catchAsync = require('../utils/catchAsync');
const { purchaseService } = require('../services');
const logger = require('../config/logger');

const createPaymentIntent = catchAsync(async (req, res) => {
	logger.debug('the controller was hit');

	const paymentIntent = await purchaseService.createPaymentIntent(req);

	res.send({
		success: true,
		clientSecret: paymentIntent.clientSecret,
	});
});

const savePurchase = catchAsync(async (req, res) => {
	logger.debug('the controller was hit');

	await purchaseService.savePurchase(req);

	res.send({
		success: true,
	});
});

module.exports = {
	createPaymentIntent,
	savePurchase,
};
