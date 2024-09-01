import { VercelRequest, VercelResponse } from '@vercel/node';
import Purchase from '../models/purchases'; // Assuming you have a Purchases model set up with Sequelize
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

const updateOrder = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { paymentIntentId, name, email, shippingAddress } = req.body;

  try {
    // Retrieve the payment intent to confirm its status
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Create a new purchase in the database
      const newPurchase = await Purchase.create({
        name,
        email,
        stripe_transaction_id: paymentIntent.id,
        shipping_address: shippingAddress,
        shipping_status: 'pending',
        // purchase_date and shipping_date will use default values
      });

      return res.status(200).json({ success: true, purchase: newPurchase });
    } else {
      return res.status(400).json({ error: 'Payment not successful' });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export default updateOrder;