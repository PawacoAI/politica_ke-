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

const singleInvoiceParams = {
    amount: 10,
    billedName: 'Test',
    phone: '0722111333',// Replace with a valid phone number
    invoiceName: '600000',// Replace with a valid shortcode
    accountReference: 'Test',
    dueDate: '2020-11-11',
    billedPeriod: 'August 2023',
    invoiceItems: [
        {
            "itemName": "food",
            "amount": 700
        },
        {
            "itemName": "water",
            "amount": 100
        },
        {
            "itemName": "electricity",
            "amount": 700
        }
    ]
};
console.log('Request Body:', JSON.stringify(singleInvoiceParams));
console.log("Credentials :",credentials);

rotsiInstance.SINGLEINVOICE.initiateSINGLEINVOICE(singleInvoiceParams)
    .then(response => {
        console.log('Paybill initiated successfully:', response);
    })
    .catch(error => {
        console.error('Error initiating Paybill : ', error.response ? error.response.data : error.message);
        // console.error("Error 2: ",error.response.data);

    });