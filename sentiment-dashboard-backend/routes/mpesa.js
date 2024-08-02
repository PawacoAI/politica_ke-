const express = require('express');
const router = express.Router();
const rotsiapi = require('rotsiapi');
const config = require('../config');

const mpesa = new rotsiapi.Mpesa({
    consumerKey: config.consumerKey,
    consumerSecret: config.consumerSecret,
    shortcode: config.shortcode,
    lipaNaMpesaOnline: config.lipaNaMpesaOnline,
    passkey: config.passkey
});

// STK Push Endpoint
router.post('/stk-push', async (req, res) => {
    const { phoneNumber, amount } = req.body;

    try {
        const response = await mpesa.stkPush({
            phoneNumber: phoneNumber,
            amount: amount,
            accountReference: 'AccountRef',
            transactionDesc: 'Payment for services'
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
