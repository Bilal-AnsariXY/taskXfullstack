const express = require('express');
const taskRouter = require('./Routes/taskRouter');
const app = express();
const cors = require('cors')
app.use(cors());
// app.use(express.json());
const bodyparser = require('body-parser');
app.use(bodyparser.json());
require('dotenv').config();
require('./Models/db')
const PORT = process.env.PORT || 8080;

app.use('/task',taskRouter)

// app.get('/',(req,res)=>{
//     res.send('hi hi hu ha');
// })

app.listen(PORT,()=>{
    console.log('server is running on port ',PORT);
})