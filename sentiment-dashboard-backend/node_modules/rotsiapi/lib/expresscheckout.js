'use strict';
const axios = require('axios');
const Common = require('./common');

class EXPRESSCHECKOUT {
    constructor(options) {
        this.options = options;
    }

    initiateExpress(params) {
        const validationError = this._validateEXPRESSParams(params);
        if (validationError) {
            return Promise.reject(validationError);
        }
    
        const body = {
            amount: params.amount,
            recipientSC: params.recipient,
            username: this.options.username,
        };
        const secret_key= this.options.secretKey;
    
        const url = Common.EXPRESS_CHECKOUT_URL;
        console.log(url);
    
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+secret_key,
        };

        return axios.post(url, body, { headers })
            .then(response => {
                // console.log('EXPRESSCHECKOUT Response:', response.data);
                return response.status === 200 ? response.data : Promise.reject(response.data);
            })
            .catch(error => {
                // console.error('EXPRESSCHECKOUT Request Error:', error.response ? error.response.data : error.message);
                return Promise.reject(error.response.data);
            });
            
    }
    
    _validateEXPRESSParams(params) {
        if (!params.amount || !Number.isInteger(params.amount)) {
            return new Error('Amount must be a string');
        }      
        if (!params.amount || params.amount < 10) {
            return new Error('Amount must be greater than or equal to 10 KES');
        }   
        if (!params.recipient || typeof params.recipient !== 'string'){
            return new Error('Invalid Recipient shortcode'); 
        }
        if (!this.options.username || typeof this.options.username !== 'string') {
            return new Error('Username must be a string');
        }
        return null;
    }
}

module.exports = EXPRESSCHECKOUT;