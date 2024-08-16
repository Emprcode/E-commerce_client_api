import express from "express";
import Stripe from "stripe";
import { createNewOrder } from "../model/order/OrderModel.js";
const router = express.Router();

router.post("/create-checkout-session", async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { userId, cartItems } = req.body;
  const customer = await stripe.customers.create({
    metadata: {
      userId: userId,
      cart: JSON.stringify(
        cartItems.map((item) => {
          return {
            productId: item._id,
            quantity: item.shopQty,
            name: item.name,
            price: item.price,
          };
        })
      ),
    },
  });
  const line_items = cartItems.map((item) => {
    return {
      price_data: {
        currency: "aud",
        product_data: {
          name: item.name,
          images: [item.thumbnail],
          description: item.desc,
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.shopQty,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["AU", "NZ"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "aud",
            },
            display_name: "Free shipping",
            // Delivers between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 5000,
              currency: "AUD",
            },
            display_name: "Next day shipping",
            // Delivers in exactly 1 business day
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      line_items,
      customer: customer.id,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/thank-you`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    // res.redirect(303, session.url);
    res.json({ url: session.url });
  } catch (error) {
    next(error);
  }
});

// Create order function

const createOrder = async (customer, data) => {
  const items = JSON.parse(customer.metadata.cart);
  // const products = Items.map((item) => {
  //   return {
  //     productId: item.id,
  //     quantity: item.cartQuantity,
  //   };
  // });

  try {
    const newOrder = await createNewOrder({
      userId: customer.metadata.userId,
      customerId: data.customer,
      paymentIntentId: data.payment_intent,
      products: items,
      subtotal: data.amount_subtotal,
      total: data.amount_total,
      shipping: data.customer_details,
      payment_status: data.payment_status,
    });

    console.log(newOrder);
  } catch (error) {
    console.log(error.message);
  }
};

// webhook
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res, next) => {
    let endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    let event = req.body;

    try {
      if (endpointSecret) {
        const sig = req.headers["stripe-signature"];

        // this step is important to ensure the event is coming from stripe and not from any third party
        try {
          event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        } catch (error) {
          res.status(400).json(`Webhook Error: ${error.message}`);
        }
      }

      let data = event.data.object;

      // // Handle the checkout.session.completed event
      if (event.type === "checkout.session.completed") {
        try {
          const customer = await stripe.customers.retrieve(data.customer);
          // console.log("customer:", customer);
          // console.log("data:", data);
          customer && createOrder(customer, data);
        } catch (error) {
          console.log(error.message);
        }
      }
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  }
);

export default router;
