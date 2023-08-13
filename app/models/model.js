/**
 * @module       Model
 * @file         models.js
 * @description  addBookSchema holds the database Schema 
 * @author       Ritika <spk2ritika1911@gmail.com>
 * @since        02/07/2021  
-----------------------------------------------------------------------------------------------*/
//connecting to the mongoDB through mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

//schema for the manner in which the data will be stored in the database
const addBookSchema = mongoose.Schema({
    firstName: { 
        type: String,
        required: true,
        validate: /^[a-zA-Z ]{3,30}$/
    },
    lastName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z ]{3,30}$/
    },
    address:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    state:{
        type: String,
        required: true,
    },
    zip:{
        type: Number,
        required: true,
        validate: /^[0-9]{6}$/
    },
    phone:{
        type: Number,
        require: true,
        validate: /^[0-9]{10}$/
    },
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
},{
    //Applying time stamp for the data
    timestamps: true
});

//Encrypting password
addBookSchema.pre("save",async function(next){
    //This will hash the password if the password is modified by the user in future
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
})

const registerUser = mongoose.model('registerUser',addBookSchema)

class model{
    /**
     * @description registering address in the database
     * @param {*} contactDetails 
     * @param {*} callback 
     */
    create = (contactDetails, callback) =>{
        try{

            const addBookSchema = new registerUser({

                firstName: contactDetails.firstName,
                lastName: contactDetails.lastName,
                address: contactDetails.address,
                city: contactDetails.city,
                state: contactDetails.state,
                zip: contactDetails.zip,
                phone: contactDetails.phone,
                emailId: contactDetails.emailId,
                password: contactDetails.password
            });
            addBookSchema.save(callback)
        }catch(error){
            return callback(error,null);
        }
    }

    /**
     * @description user login 
     * @param {*} loginInput 
     * @param {*} callback 
     * @returns 
     */
    login = (loginInput, callback) =>{
        try{
            registerUser.findOne({'emailId':loginInput.emailId},(error,data)=>{
                if(error){
                    return callback(error,null);
                }else if (!data){
                    return callback("Invalid credentails",null)
                }
                return callback(null, data);
            })
        }catch(error){
            return callback(error, null);
        }
    }

    /**
     * @description Using find() which is a mongoose method
     * @param {*} callback 
     */
    findAll = (callback) =>{
        try{
            registerUser.find({},(error, data) =>{
                return((error)? (callback(error, null)): (callback(null, data)));
        });
        }catch(error){
            return callback(error, null);
        }
    }

    /**
     * @description using findById()
     * @param {*} userId 
     * @param {*} callback 
     * @returns 
     */
    findOne = (userId, callback)=>{
        try{
            registerUser.findById(userId,(error, data)=>{
                return((error)? callback(error, null): callback(null, data));
            });
        }catch(error){
            return callback(error, null);
        }
    }

    /**
     * @description using findByIdAndUpdate
     * @param {*} userId 
     * @param {*} contactDetails 
     * @param {*} callback 
     * @returns 
     */
    updateInfo = (userId, contactDetails,callback)=> {
        try{
            registerUser.findByIdAndUpdate(userId,{
                firstName: contactDetails.firstName,
                lastName: contactDetails.lastName,
                address: contactDetails.address,
                city: contactDetails.city,
                state: contactDetails.state,
                zip: contactDetails.zip,
                phone: contactDetails.phone,
                emailId: contactDetails.emailId,
                password: contactDetails.password
            },(error, data)=>{
                return((error)?(callback(error,null)): callback(null,data));
            });
    }catch(error){
        return callback(error, null);
        }
    }

    delete = (userId, callback)=>{
        try{
            registerUser.findByIdAndRemove(userId, (error, data)=>{
                return((error)?callback(error, null): callback(null, data));
            });
        }catch(error){
            return callback(error, null);
        }
    }    
}

module.exports = new model();