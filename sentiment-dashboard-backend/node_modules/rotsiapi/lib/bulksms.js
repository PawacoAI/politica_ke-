'use strict';

const axios = require('axios');
const { invvalidator } = require('./utils');
const Common = require('./common');

class BULKSMS {
    constructor(options) {
        this.options = options;
    }

    initiateBULKSMS(params) {
        const validationError = this._validateBULKParams(params);
        if (validationError) {
            return Promise.reject(validationError);
        }

        const url = Common.BULK_SMS_URL;
        const secretKey = this.options.secretKey;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + secretKey,
        };

        const body = {
            username: this.options.username,
            body: params.body
        };

        return axios.post(url, body, { headers })
            .then(response => {
                return response.status === 200 ? response.data : Promise.reject(response.data);
            })
            .catch(error => {
                return Promise.reject(error.response.data);
            });
    }

    _validateBULKParams(params) {
        if (!params.body || !params.body.messages || !Array.isArray(params.body.messages) || params.body.messages.length === 0) {
            return new Error('Invalid messages. Expecting an array of messages.');
        }

        for (const message of params.body.messages) {
            if (!message.phone || typeof message.phone !== 'string') {
                return new Error('Phone Numbers must be a string.');
            }

            if (!invvalidator(message.phone)) {
                return new Error(`${message.phone} is invalid. Phone number must be in the format 07xxxxxxxx/011xxxxxxx in the batch.`);
            }

            if (!message.message || typeof message.message !== 'string') {
                return new Error('Invalid message in the batch.');
            }
        }

        if (!this.options.username || typeof this.options.username !== 'string') {
            return new Error('Username must be a string');
        }

        return null;
    }
}

module.exports = BULKSMS;