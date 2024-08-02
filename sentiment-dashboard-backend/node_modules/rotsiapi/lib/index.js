'use strict';
const validate = require('validate.js');
const _ = require('lodash');
const Common = require('./common.js');

const STK = require('./stk.js');
const B2C = require('./b2c.js');
const KRA = require('./kra.js');
const PAYBILL = require('./paybill.js');
const BUYGOODS = require('./buygoods.js');
const EXPRESSCHECKOUT = require('./expresscheckout.js');
const SINGLEINVOICE = require('./singleinvoice.js');
const OTP = require('./otp.js');
const BULKSMS = require('./bulksms.js');

// const CANCELSINGLEINVOICE = require('./cancelsingleinvoice.js');


class Rotsi {
    constructor(options, username, secretKey) {
        // Combine provided options with username and secretKey
        this.options = _.merge({}, options, { username, secretKey });

        // Custom validation rule for strings
        validate.validators.isString = function (value) {
            return validate.isEmpty(value) || validate.isString(value) ? null : 'must be a string';
        };

        // Validation constraints for the options object
        const constraints = {
            format: {
                inclusion: ['json']
            },
            username: {
                presence: true,
                isString: true
            },
            secretKey: {
                presence: true,
                isString: true
            }
        };

        // Validate the options object against the constraints
        const error = validate(this.options, constraints);
        if (error) {
            throw error;
        }

        // Set the format to 'application/json'
        this.options.format = 'application/json';

        // Enable sandbox mode if the username is 'sandbox'
        const isSandbox = this.options.username.toLowerCase() === 'sandbox';
        if (isSandbox) {
            Common.enableSandbox();
        }
       /* START */
       this.STK = new STK(this.options);
       this.B2C = new B2C(this.options);
       this.BUYGOODS = new BUYGOODS(this.options);
       this.PAYBILL = new PAYBILL(this.options);
       this.KRA = new KRA(this.options);
       this.SINGLEINVOICE = new SINGLEINVOICE(this.options);
       this.EXPRESSCHECKOUT = new EXPRESSCHECKOUT(this.options);
       this.OTP = new OTP(this.options);
       this.BULKSMS = new BULKSMS(this.options);
       // this.CANCELSINGLEINVOICE = new CANCELSINGLEINVOICE(this.options);      
       /* END */
    }
}

module.exports = function (options, username, secretKey) {
    return new Rotsi(options, username, secretKey);
};
