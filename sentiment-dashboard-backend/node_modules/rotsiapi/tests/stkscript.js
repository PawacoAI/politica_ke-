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

// const africastalking = new Rotsi(credentials);

const stkParams = {
    amount: 1,
    phone: '254xxxxxxxxx', // Replace with a valid phone number
};
console.log('Request Body:', JSON.stringify(stkParams));
console.log("Credentials :",credentials);

rotsiInstance.STK.initiateSTK(stkParams)
    .then(response => {
        console.log('STK initiated successfully:', response);
    })
    .catch(error => {
        console.error('Error initiating STK: ', error.response ? error.response.data : error.message);
        // console.error("Error 1: ",error.message);
        // console.error("Error 2: ",error.response.data);

    });