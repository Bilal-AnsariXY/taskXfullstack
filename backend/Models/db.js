const mongoose = require('mongoose');
const DB_URL =  process.env.DB_URL;
mongoose.connect(DB_URL)
.then(()=>{
    console.log('db is connected');
})
.catch((err)=>{
    console.log('db is not connected ', err);
})