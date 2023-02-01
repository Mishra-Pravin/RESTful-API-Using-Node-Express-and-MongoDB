const express = require('express');
const routes = require('./routes/routes')

const bodyParser = require('body-parser'); //<--- this middle were require for the post Method 



const mongoose =require('mongoose');
mongoose.set('strictQuery', true);

const app = express();
app.use(bodyParser.json());

require('dotenv').config();
const mongoString = process.env.DATABASE_URL;


app.use('/api',routes)



mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error',(error)=>{
console.log(error);
})
database.once('connected',()=>{
    console.log('Database Connected');
})



app.use(express.json());





app.listen(3000,()=>{
    console.log(`Server Started Succesfully at ${3000}`);
})