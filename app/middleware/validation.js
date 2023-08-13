/**
 * @module       middleware
 * @file         validation.js
 * @description  holds the user input validation regex
 * @author       Ritika <spk2ritika1911@gmail.com>
 * @since        02/07/2021  
-----------------------------------------------------------------------------------------------*/

const joi = require('joi');

const validation = joi.object({
    firstName: joi.string().min(3).max(30).pattern(new RegExp('^[a-zA-Z ]{3,30}$')).required(),
    lastName: joi.string().min(3).max(30).pattern(new RegExp('^[a-zA-Z ]{3,30}$')).required(),
    address: joi.string().min(3).required(),
    city: joi.string().min(2).pattern(new RegExp('^[a-zA-Z ]{2,30}$')).required(),
    state: joi.string().min(2).pattern(new RegExp('^[a-zA-Z ]{2,30}$')).required(),
    zip: joi.string().min(6).pattern(new RegExp('^[0-9 ]{6}$')).required(),
    phone: joi.string().min(10).pattern(new RegExp('^[0-9]{10}$')).required(),
    emailId: joi.string().email().required().pattern(new RegExp()),
    password: joi.string().alphanum().min(8).max(30).required()
});

module.exports = {validation}; 