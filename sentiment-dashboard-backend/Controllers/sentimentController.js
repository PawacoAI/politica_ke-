// controllers/sentimentController.js
const Sentiment = require('../models/Sentiment');

exports.createSentiment = async (req, res) => {
    const { text, sentiment } = req.body;
    const userId = req.user.id;

    try {
        const newSentiment = new Sentiment({ user: userId, text, sentiment });
        await newSentiment.save();

        res.status(201).json(newSentiment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getSentiments = async (req, res) => {
    try {
        const sentiments = await Sentiment.find({ user: req.user.id });
        res.json(sentiments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
