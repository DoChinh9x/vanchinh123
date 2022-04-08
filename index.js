const express = require('express');
const db = require('./config/db');

const app = express();
//import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
//connect to DB
db.connect();

//MidleWare
app.use(express.json());

//Router Middleware
app.use('/user',authRoute);
app.use('/user/post',postRoute);

app.listen(4000, ()=> console.log('Server up'))