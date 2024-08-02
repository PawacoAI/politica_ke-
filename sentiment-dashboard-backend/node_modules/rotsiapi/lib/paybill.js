'use strict';
const axios = require('axios');
const Common = require('./common');
const { phonevalidator } = require('./utils');

class PAYBILL {
    constructor(options) {
        this.options = options;
    }

    initiatePaybill(params) {
        const validationError = this._validatePAYBILLParams(params);
        if (validationError) {
            return Promise.reject(validationError);
        }
    
        const body = {
            amount: params.amount,
            recipientSC: params.recipient,
            username: this.options.username,
            AccountReference: params.AccountReference,
            Requester: params.phone,
        };
        const secret_key= this.options.secretKey;
    
        const url = Common.PAYBILL_URL;
        console.log(url);
    
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+secret_key,
        };

        return axios.post(url, body, { headers })
            .then(response => {
                // console.log('PAYBILL Response:', response.data);
                return response.status === 200 ? response.data : Promise.reject(response.data);
            })
            .catch(error => {
                // console.error('PAYBILL Request Error:', error.response ? error.response.data : error.message);
                return Promise.reject(error.response.data);
            });
            
    }
    
    _validatePAYBILLParams(params) {
        if (!params.amount || !Number.isInteger(params.amount)) {
            return new Error('Amount must be a string');
        }      
        if (!params.amount || params.amount < 10) {
            return new Error('Amount must be greater than or equal to 10 KES');
        }
        if (!params.phone || typeof params.phone !== 'string') {
            return new Error('Phone number must be a string');
        }
        if (!params.phone || !phonevalidator(params.phone)) {
            return new Error('Phone number must be format is 254xxxxxxxxx');
        }
        if (!params.recipient || typeof params.recipient !== 'string'){
            return new Error('Invalid Recipient shortcode'); 
        }
        if (!params.AccountReference || typeof params.AccountReference !== 'string'){
            return new Error('Invalid Account Reference'); 
        }
        if (!this.options.username || typeof this.options.username !== 'string') {
            return new Error('Username must be a string');
        }
        return null;
    }
}

module.exports = PAYBILL;