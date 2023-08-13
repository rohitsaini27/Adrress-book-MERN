let chai = require('chai');
let chaiHttp = require('chai-http');
const {response} = require('express');
let server = require('../server');
const testData = require('../test/user.data.json');

//Assertion style
chai.should();
chai.use(chaiHttp);

describe('Address Book',()=>{
    /**
     * Test the post route for new user
     */

     describe('POST /registerUser', () => {
        it("It should register a new user", (done) => {
            const register = testData.registerUser
            chai.request(server)
                .post("/registerUser")
                .send(register)
                .end((error, res) => {
                    res.body.should.be.a('object')
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("New address added!!")
                    res.body.should.have.property("data").should.be.a('object');    
            //done();
            });
        });
    })  
    
        /**
         * This test should pass when the employee is already registered
         */
        it("This test should pass when the user is trying to register with the already registered email id", () => {
            const registerNegative = testData.registerUserNegative
            chai.request(server)
                .post("/registerUser")
                .send(registerNegative)
                .end((error, res) => {
                    res.should.have.status(400)
                    res.body.should.be.a('object')
                    res.body.should.have.property("success").eql(false);
                    res.body.should.have.property("message").eql("Email already exists!")
            done();
            });
        });

      /**
        * This test should pass for employee login
        * It will pass when the employee is already registered and it's details are stored in the database
        */
        describe("POST/userLogin",() =>{
        it("This test should pass when the user is logging in with the correct email id and the password",()=>{
            const userLoginData = testData.login
            chai.request(server)
            .post('/userLogin')
            .send(userLoginData)
            .end((error,res)=>{
                res.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("Login successful!");
                res.body.should.have.property("data");   
            });
        });
    })
        /**
       * This test should pass when the employee login credentials are wrong
       * It will pass when the employee is already registered and it's details are stored in the database
       */
       describe("POST/userLogin",() =>{
       it("This test should pass when the user is logging in with the wrong email id or the password",()=>{
           const userLoginDataNeg = testData.loginNegative
           chai.request(server)
           .post('/userLogin')
           .send(userLoginDataNeg)
           .end((error,res)=>{
               res.should.have.status(400);
               res.should.be.a('object');
               res.body.should.have.property("success").eql(false);
               res.body.should.have.property("message").eql("Invalid credential");   
           });
       });
    })
})