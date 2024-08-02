const express = require('express');
const router = express.Router();
const rotsiapi = require('rotsiapi');

// Set up M-Pesa credentials and configuration
const mpesa = new rotsiapi({
    shortcode: process.env.MPESA_SHORTCODE,
    lipaNaMpesaOnline: process.env.MPESA_LIPA_NA_MPESA_ONLINE,
    // Add any other necessary configuration
});

// Create subscription route
router.post('/create', async (req, res) => {
    const { userId, plan } = req.body;

    // Call M-Pesa API to initiate payment
    try {
        const response = await mpesa.stkPush({
            // Set the required parameters for the STK Push
            phoneNumber: req.body.phoneNumber,
            amount: req.body.amount,
            // Additional parameters as needed
        });

        res.json(response);
    } catch (error) {
        console.error('M-Pesa Error:', error);
        res.status(500).json({ error: 'Payment failed' });
    }
});

module.exports = router;
