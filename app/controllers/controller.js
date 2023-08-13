/**
 * @module       AddBookController
 * @file         controller.js
 * @description  AddBookController holds the API 
 * @author       Ritika <spk2ritika1911@gmail.com>
 * @since        02/07/2021  
-----------------------------------------------------------------------------------------------*/

const service = require('../services/service');
const { validation } = require('../middleware/validation')

/**
 * @description Create and save new employee
 * @param {*} req, request sent from the http
 * @param {*} res, respond given to the http
 * @returns res
 */

class AddBookController{
    registerUser = (req,res) => {
       try{
           const userValidation = validation.validate(req.body)
           if(userValidation.error){
               res.status(400).send({message:userValidation.error.details[0].message})
           }
            const contactDetails = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                phone: req.body.phone,
                emailId: req.body.emailId,
                password: req.body.password
            }
            
            service.createAddress(contactDetails, (error, data) => {
                return ((error) ?
                    res.status(400).send({
                        success: false,
                        message: "Email already exists!"
                    }) :
                
                res.send({
                    success: true,
                    message: "New address added!!",
                    data: data
                }));
            });
        }catch(error){
            return res.status(500).send({
                success: false,
                message: error.message
            });
        };
    }

    /**
     * @description this will let the registerd user login into their account
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    userLogin  = (req, res)=>{
        try{
            const loginInput = {
                emailId: req.body.emailId,
                password: req.body.password
            }
            service.login(loginInput,(error, token)=>{
                return((error)? res.status(400).send({
                    success: false,
                    message: "Invalid credential"
                    
                }) :
                res.send({
                    success: true,
                    message: "Login successful!",
                    data: token
                }));                
            });
        }catch(error){
            return res.send(500).send({
                success: false,
                message: error.message
            });
        }
    }

    readAll = (req, res)=>{
        try{
            service.readAllData((error, data)=>{
                return((error)? res.status(400).send({
                    success: false,
                    message: "Some error occured while fetching data"
                }) :
                res.send({
                    success: true,
                    message: "Address Book data fetched successfully!",
                    data: data
                }));

            });
        }catch(error){
            return res.send(500).send({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * @description this will fetch user data according to the id
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    readById = (req, res)=>{
        try{
            var userId = req.params.userId;
            service.getDataById(userId,(error, data)=>{
                return((error)? res.status(400).send({
                    success: false,
                    message: "Some error occured while fetching data"
                }) :
                res.send({
                    success: true,
                    message: "User Data fetched successfully",
                    data: data
                }));
            });
        }catch(error){
            return res.send(500).send({
                success: false,
                message: error.message
            });
        }
    }

    /**
     * @description update user data by id
     * @param {} req 
     * @param {*} res 
     * @returns 
     */
    updateData = (req, res)=>{
        try{
            const userValidation = validation.validate(req.body)
            if(userValidation.error){
                res.status(400).send({message:userValidation.error.details[0].message})
            }
            var userId = req.params.userId;
            const contactDetails = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                phone: req.body.phone,
                emailId: req.body.emailId,
                password: req.body.password
            }

            service.updateDataById(userId,contactDetails,(error, data)=>{
                return((error)? res.status(400).send({
                    success: false,
                    message: "Some error occured while updating data"
                }) :
                res.send({
                    success: true,
                    message: "User Data updated successfully",
                    data: data
                }));
            });
        }catch(error){
            return res.send(500).send({
                success: false,
                message: error.message
            });
        }
    }

    deleteData = (req ,res)=>{
        try{
            var userId = req.params.userId
            service.deleteById(userId,(error, data)=>{
                return((error)? res.status(400).send({
                    success: false,
                    message: "Some error occured while deleting the data",
                }) :
                res.send({
                    success: true,
                    messsage: "deleted the user successfully!!",
                    data: data
                }));
            });
        }catch(error){
            return res.status(500).send({
                success: false,
                message: error.message
            });
        }
    }
}


module.exports = new AddBookController();