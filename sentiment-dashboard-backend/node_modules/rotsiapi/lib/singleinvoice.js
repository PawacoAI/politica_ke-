'use strict';
const axios = require('axios');
const Common = require('./common');
const { invvalidator } = require('./utils');

class SINGLEINVOICE {
    constructor(options) {
        this.options = options;
    }

    initiateSINGLEINVOICE(params) {
        const validationError = this._validateSINGLEINVOICEParams(params);
        if (validationError) {
            return Promise.reject(validationError);
        }
    
        const body = {
            amount: params.amount,
            billedFullName: params.billedName,
            phone: params.phone,
            invoiceName: params.invoiceName,
            username: this.options.username,
            accountReference: params.accountReference,
            dueDate: params.dueDate,
            billedPeriod: params.billedPeriod,
            invoiceItems: params.invoiceItems, 
        };
        const secret_key= this.options.secretKey;
    
        const url = Common.SINGLE_INVOICE_URL;
        console.log(url);
    
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+secret_key,
        };

        return axios.post(url, body, { headers })
            .then(response => {
                // console.log('SINGLEINVOICE Response:', response.data);
                return response.status === 200 ? response.data : Promise.reject(response.data);
            })
            .catch(error => {
                // console.error('SINGLEINVOICE Request Error:', error.response ? error.response.data : error.message);
                return Promise.reject(error);
            });
            
    }
    
    _validateSINGLEINVOICEParams(params) {
        if (!params.amount || !Number.isInteger(params.amount)) {
            return new Error('Amount must be a string');
        }      
        if (!params.amount || params.amount < 10) {
            return new Error('Amount must be greater than or equal to 10 KES');
        }
        if (!params.phone || typeof params.phone !== 'string') {
            return new Error('Phone number must be a string');
        }
        if (!params.phone || !invvalidator(params.phone)) {
            return new Error('Phone number must be format is 07xxxxxxxx/011xxxxxxx');
        }   
        if (!params.billedName || typeof params.billedName !== 'string'){
            return new Error('Invalid Biller Name'); 
        }
        if (!params.invoiceName || typeof params.invoiceName !== 'string'){
            return new Error('Invalid invoice name'); 
        }
        if (!this.options.username || typeof this.options.username !== 'string') {
            return new Error('Username must be a string');
        }
        if (!params.accountReference || typeof params.accountReference !== 'string'){
            return new Error('Invalid Account Reference'); 
        }
        
        const dueDateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!params.dueDate.match(dueDateRegex)) {
            return new Error('Invalid Due Date');
        }

        const billedPeriodRegex = /^[a-zA-Z]+\s\d{4}$/;
        if (!params.billedPeriod.match(billedPeriodRegex)) {
            return new Error('Invalid Billed Period');
        }
        
        if (!params.invoiceItems || !Array.isArray(params.invoiceItems) || params.invoiceItems.length === 0) {
            return new Error('invoiceItems must be a non-empty array');
        }
    
        for (const item of params.invoiceItems) {
            if (!item.itemName || typeof item.itemName !== 'string' ||
                !item.amount || !Number.isInteger(item.amount) || item.amount < 0) {
                return new Error('Invalid invoiceItem format');
            }
        }
        return null;
    }
}

module.exports = SINGLEINVOICE;