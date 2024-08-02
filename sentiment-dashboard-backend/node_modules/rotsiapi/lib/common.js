'use strict';

const BASE_DOMAIN = "rotsiapi-f2e9f999f0e0.herokuapp.com";
const BASE_SANDBOX_DOMAIN = "sandbox." + BASE_DOMAIN;

const initUrls = function (sandbox) {

    const baseDomain = sandbox ? BASE_SANDBOX_DOMAIN : BASE_DOMAIN;
    const baseUrl = "https://" + baseDomain;

    exports.BASE_URL = baseUrl;
    
      /**********************************************************************************/
     /********************************BALANCE&ACCOUNTDETAILS****************************/
    /**********************************************************************************/
    exports.BALANCE_URL = baseUrl + "/balance/accountBalance";
    exports.TRANSACTION_HISTORY  = baseUrl + "/balance/transactionhistory";
    exports.ACCOUNTBALANCE_URL = baseUrl + "/balance/businessaccountBalance";
      /**********************************************************************************/
     /************************************SMSs******************************************/
    /**********************************************************************************/
    exports.SMS_OTP_URL = baseUrl + "/sms/otp";
    exports.BULK_SMS_URL = baseUrl + "/sms/bulksms/v1";
    
      /***********************************************************************************/
     /**********************************PAYMENTS*****************************************/
    /***********************************************************************************/
    exports.STK_URL = baseUrl + "/payments/stkPush/v1";
    exports.B2C_URL = baseUrl + "/payments/b2c/v1";
    exports.KRA_URL = baseUrl + "/payments/kratax/v1";
    exports.BUYGOODS_URL = baseUrl + "/payments/b2bBuyGoodsPaymentRequest/v1";
    exports.PAYBILL_URL = baseUrl + "/payments/b2bPaybillPaymentRequest/v1";
    exports.EXPRESS_CHECKOUT_URL = baseUrl + "/payments/b2bExpressCheckoutPaymentRequest/v1";
    exports.STK_QUERY = baseUrl + "/payments/confirmPayment/v1";
    
      /***********************************************************************************/
     /**********************************BILL MANAGER*************************************/
    /***********************************************************************************/
    exports.BILL_OPTIN_URL = baseUrl + "/billmanager/optin/v1";
    exports.SINGLE_INVOICE_URL = baseUrl + "/billmanager/singleInvoice/v1";
    exports.CANCEL_SINGLE_INVOICE_URL = baseUrl + "/payments/confirmPayment/v1";
     
    exports.CONTENT_URL = sandbox
        ? baseUrl
        : 'https://content.' + baseDomain + '/version1';
};

// no sandbox by default
initUrls(false);

exports.enableSandbox = function () {
    initUrls(true);
};