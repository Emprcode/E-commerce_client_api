import express from 'express'
import Stripe from 'stripe';
const router = express.Router()


router.post('/create-checkout-session', async (req, res, next) => {

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

console.log(req.body)
const {totalPrice, quantity } = req.body

try {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'aud',
          product_data: {
            name: 'Total Shopping Amount',
          },
          unit_amount: totalPrice *100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/thank-you`,
    cancel_url: `${process.env.CLIENT_URL}/rejected`
  });

  // res.redirect(303, session.url);
  res.json({url: session.url})
} catch (error) {
  next(error)
}

  });


export default router;