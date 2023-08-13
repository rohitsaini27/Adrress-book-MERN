/**
 * @module       service
 * @file         service.js
 * @description  service class holds the callback method for controller 
 * @author       Ritika <spk2ritika1911@gmail.com>
 * @since        02/07/2021  
-----------------------------------------------------------------------------------------------*/
const model = require('../models/model');
const helper = require('../middleware/helperFile');

class service{
    /**
     * @description registration of user
     * @param {*} contactDetails 
     * @param {*} callback 
     * @returns 
     */
    createAddress = (contactDetails, callback) => {
        try{
            model.create(contactDetails, (error, data) => {
                return error? callback(error, null): callback(null, data)    
            })
        }catch(error){
            return callback(error,null);
        }
    }

    /**
     * @description callback for login
     * @param {*} loginInput 
     * @param {*} callback 
     * @returns 
     */
    login = (loginInput, callback)=>{
        try{
            model.login(loginInput,(error, data)=>{
                if(helper.checkByBcrypt(loginInput.password, data.password)){
                    const token = helper.generateToken(loginInput)
                    return(token)?callback(null,token):callback("Incorrect password! Please provide correct password!", null);
                }
                else if(error){
                    callback(error, null);
                }
            })
        }catch(error){
            return callback(error,null);
        }
    }

    readAllData = (callback)=>{
        try{
            model.findAll((error, data)=>{
                return((error)? callback(error, null): callback(null, data));
            });
        }catch(error){
            return callback(error, null);
        }
    }

    /**
     * @description callback for reading data by id
     * @param {*} userId 
     * @param {*} callback 
     * @returns 
     */
    getDataById = (userId,callback)=>{
        try{
            model.findOne(userId,(error, data)=>{
                return((error)?callback(error, null): callback(null, data));
            });
        }catch(error){
            return callback(error, null);
        }
    }

    /**
     * @description callback for update
     * @param {*} userId 
     * @param {*} contactDetails 
     * @param {*} callback 
     * @returns 
     */
    updateDataById = (userId, contactDetails, callback)=>{
        try{
            model.updateInfo(userId, contactDetails, (error, data)=>{
                return((error)?callback(error, null): callback(null, data));
            });
        }catch(error){
            return callback(error, null);
        }
    }

    deleteById = (userId, callback)=>{
        try{
            model.delete(userId, (error, data)=>{
                return((error)?callback(error, null): callback(null, data));
            });
        }catch(error){
            return callback(error,null);
        }
    }
}

module.exports = new service();