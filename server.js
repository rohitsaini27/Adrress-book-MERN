const express = require('express');
require('dotenv').config();
//create express app 
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./app/swagger/swagger.json')
const logger = require('../Address_Book_Backend/config/logger')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//configuring the database
const dbConnect = require('./config/database.config');
dbConnect();


//defining a simple route
app.get('/',(req,res) => {
    res.json({
        "message":"Welcome to the Address Book Application " //this message is shown once the user visits the url
    });
});

//Requiring routes
require('./app/routes/route.js')(app);


//user can visit the url once the server is listening on port 
app.listen(process.env.PORT,() => {
    logger.log("info","Server is listening at port ${process.env.PORT}");
});

module.exports = app;