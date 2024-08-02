const express = require('express');
const stripe = require('../utils/stripe'); // Adjust path as needed
const router = express.Router();
const authMiddleware = require('../middleware/auth'); // Assuming you have an auth middleware

// Create Subscription
router.post('/create', authMiddleware, async (req, res) => {
    const { planId } = req.body;

    try {
        // Create a new subscription in Stripe
        const subscription = await stripe.subscriptions.create({
            customer: req.user.stripeCustomerId, // Assuming this is stored in the User model
            items: [{ price: planId }],
        });

        res.json(subscription);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Cancel Subscription
router.post('/cancel', authMiddleware, async (req, res) => {
    const { subscriptionId } = req.body;

    try {
        const subscription = await stripe.subscriptions.del(subscriptionId);
        res.json(subscription);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// List Subscriptions
router.get('/', authMiddleware, async (req, res) => {
    try {
        const subscriptions = await stripe.subscriptions.list({
            customer: req.user.stripeCustomerId, // Assuming this is stored in the User model
        });
        res.json(subscriptions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
