'use strict';

function phonevalidator(phoneNumber) {
    // Check if it's a non-empty string
    if (typeof phoneNumber !== 'string' || phoneNumber.trim() === '') {
        return false;
    }
    return /^254\d{9}$/.test(phoneNumber);
}
function invvalidator(phoneNumber) {
    // Check if it's a non-empty string
    if (typeof phoneNumber !== 'string' || phoneNumber.trim() === '') {
        return false;
    }
    // Check if it begins with '07' or '011' and has a maximum length of 10 characters
    const validPrefixes = ['07', '011'];
    const isValidLength = phoneNumber.length === 10;
    
    if (!validPrefixes.some(prefix => phoneNumber.startsWith(prefix)) || !isValidLength) {
        return false;
    }
    // Check if the remaining characters are digits
    const numericPart = phoneNumber.slice(2);
    return /^\d+$/.test(numericPart);
}
function smsvalidator(phoneNumber) {
    // Check if it's a non-empty string
    if (typeof phoneNumber !== 'string' || phoneNumber.trim() === '') {
        return false;
    }
    // Check if it begins with '+254' and has a maximum length of 13 characters
    return /^\+254\d{10}$/.test(phoneNumber);
}

module.exports = {
    phonevalidator,invvalidator,smsvalidator
};