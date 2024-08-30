const Joi = require('@hapi/joi');
// const { password } = require('./custom.validation');

const createPurchase = {
	body: Joi.object().keys({
		currency: Joi.string().required().email(),
		amount: Joi.number().required(),
		user: Joi.string().required(),
	}),
};

module.exports = {
	createPurchase,
};
