const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const Router = require('./routes/Router');
const app = express();

// Middleware
app.use(bodyParser.json());

app.use(session({
    secret: 'secret-key',
    resave:false,
    saveUnintialized : false ,
    store: MongoStore.create({mongoUrl: 'mongodb://localhost:27017/'})
}));

//Connect to DB
mongoose.connect('mongodb://localhost:27017/')
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log(err));

//Routes
app.use('/api' , Router);



//server 
const PORT = process.env.PORT || 3000;
app.get("/",(req , res) =>{
    res.send("This page is Live ");
});
const start = async() => {
    try{
        app.listen(PORT, () => {
            console.log (`${PORT} Yes it is connected `);
        })
    } catch (error) {
        console.log(error);
    }
}

start();
