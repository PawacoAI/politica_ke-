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

const buygoodsParams = {
    amount: 10,
    phone: '254xxxxxxxxx',// Replace with a valid phone number
    AccountReference: 'Test',
    recipient: '600000',// Replace with a valid shortcode
};
console.log('Request Body:', JSON.stringify(buygoodsParams));
console.log("Credentials :",credentials);

rotsiInstance.PAYBILL.initiatePaybill(buygoodsParams)
    .then(response => {
        console.log('Buygoods initiated successfully:', response);
    })
    .catch(error => {
        console.error('Error initiating Buygoods : ', error.response ? error.response.data : error.message);
        // console.error("Error 2: ",error.response.data);

    });