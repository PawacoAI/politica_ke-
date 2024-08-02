'use strict';

const axios = require('axios');
const { phonevalidator } = require('./utils');
const Common = require('./common');

class STK {
    constructor(options) {
        this.options = options;
    }

    initiateSTK(params) {
        const validationError = this._validateSTKParams(params);
        if (validationError) {
            return Promise.reject(validationError);
        }
    
        const body = {
            amount: params.amount,
            phone: params.phone,
            username: this.options.username,
        };
        const secret_key= this.options.secretKey;
    
        const url = Common.STK_URL;
    
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+secret_key,
        };

        return axios.post(url, body, { headers })
            .then(response => {
                // console.log('STK Response:', response.data);
                return response.status === 200 ? response.data : Promise.reject(response.data);
            })
            .catch(error => {
                // console.error('STK Request Error:', error.response ? error.response.data : error.message);
                return Promise.reject(error.response.data);
            });
            
    }
    
    _validateSTKParams(params) {
        if (!params.amount || !Number.isInteger(params.amount)) {
            return new Error('Amount must be a string');
        }      
        if (!params.amount || params.amount <= 0) {
            return new Error('Amount must be a positive integer');
        }
        if (!params.phone || typeof params.phone !== 'string') {
            return new Error('Phone number must be a string');
        }
        if (!params.phone || !phonevalidator(params.phone)) {
            return new Error('Phone number must be format is 254xxxxxxxxx');
        }
        if (!this.options.username || typeof this.options.username !== 'string') {
            return new Error('Username must be a string');
        }
        return null;
    }
}

module.exports = STK;