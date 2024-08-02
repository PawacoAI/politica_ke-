'use strict';

const axios = require('axios');
const { phonevalidator } = require('./utils');
const Common = require('./common');

class B2C {
    constructor(options) {
        this.options = options;
    }

    initiateB2C(params) {
        const validationError = this._validateB2CParams(params);
        if (validationError) {
            return Promise.reject(validationError);
        }
    
        const body = {
            amount: params.amount,
            phone: params.phone,
            username: this.options.username,
        };
        const secret_key= this.options.secretKey;
    
        const url = Common.B2C_URL;
        console.log(url);
    
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+secret_key,
        };

        return axios.post(url, body, { headers })
            .then(response => {
                // console.log('B2C Response:', response.data);
                return response.status === 200 ? response.data : Promise.reject(response.data);
            })
            .catch(error => {
                // console.error('B2C Request Error:', error.response ? error.response.data : error.message);
                return Promise.reject(error.response.data);
            });
            
    }
    
    _validateB2CParams(params) {
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
        if (!this.options.username || typeof this.options.username !== 'string') {
            return new Error('Username must be a string');
        }
        return null;
    }
}

module.exports = B2C;