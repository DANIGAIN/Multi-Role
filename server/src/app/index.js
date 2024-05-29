const cookieParser = require('cookie-parser');
const express = require('express');
const userRoutesV1 = require('./../v1/routes/user.route');
const roleRoutesV1 = require('./../v1/routes/role.route');
const componentRoutesV1 = require('./../v1/routes/compoment.route');
const cors = require("cors");
const app  = express();
app.use(
    cors({  
        credentials:true,
        origin:'http://localhost:5173'
    })
)   

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

//routes --->

app.use('/api/v1', userRoutesV1)
app.use('/api/v1', roleRoutesV1)
app.use('/api/v1', componentRoutesV1);

app.listen(process.env.PORT , ()=>{
    console.log(`app is running .... on port :${process.env.PORT}`);
})