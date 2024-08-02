'use strict';

const axios = require('axios');
const { smsvalidator } = require('./utils');
const Common = require('./common');

class OTP {
    constructor(options) {
        this.options = options;
    }

    initiateOTP(params) {
        const validationError = this._validateOTPParams(params);
        if (validationError) {
            return Promise.reject(validationError);
        }
    
        const body = {
            message: params.otp,
            phone: params.phone,
            username: this.options.username,
        };
        const secret_key= this.options.secretKey;
    
        const url = Common.SMS_OTP_URL;
    
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+secret_key,
        };

        return axios.post(url, body, { headers })
            .then(response => {
                // console.log('OTP Response:', response.data);
                return response.status === 200 ? response.data : Promise.reject(response.data);
            })
            .catch(error => {
                // console.error('OTP Request Error:', error.response ? error.response.data : error.message);
                return Promise.reject(error.response.data);
            });
            
    }
    
    _validateOTPParams(params) {
        if (!params.message || typeof params.message !== 'string') {
            return new Error('OTP must have be a string');
        }
        if (!params.message || params.message.length > 6) {
            return new Error('OTP must have a maximum of 6 characters');
        }
        if (!params.phone || typeof params.phone !== 'string'){
            return new Error('Invalid phone number');
        }
        if (!params.phone || !smsvalidator(params.phone)) {
            return new Error('Phone number must be format is +254xxxxxxxxx');
        }
        if (!this.options.username || typeof this.options.username !== 'string') {
            return new Error('Username must be a string');
        }
        return null;
    }
}

module.exports = OTP;