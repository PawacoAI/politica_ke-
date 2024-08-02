// Import your npm package
const Rotsi = require('rotsiapi');

// Set your API credentials
const username = 'your_username';
const secretKey = 'your_secret_key';

// Set additional options if needed
const credentials = {
    secretKey: secretKey,
    username: username,
};

// Create an instance of Rotsi
const rotsiInstance = Rotsi(credentials);

// Define your BulkSMS parameters
const bulkSmsParams = {
    body: {
        messages: [
            {
                phone: '0712345678',
                message: 'Your OTP code is 123456',
            },
            {
                phone: '0723456789',
                message: 'Your OTP code is 789012',
            },
        ],
        batchSize: 2,
    },
};

console.log('Request Body:', JSON.stringify(bulkSmsParams.body));
console.log('Credentials:', credentials);

rotsiInstance.BULKSMS.initiateBULKSMS(bulkSmsParams)
    .then(response => {
        console.log('BulkSMS sent successfully:', response);
    })
    .catch(error => {
        console.error('Error sending BulkSMS:', error.response ? error.response.data : error.message);
    });
