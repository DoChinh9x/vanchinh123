const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const {registerValidation,loginValidation} = require('../validation')


//validation


router.post('/register',async(req,res,next)=>{

    //LETs Validate the data
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user exist in database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body, salt);

    //Creat a new user
    const user = new User({
        name : req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try {
        const saveUser = await user.save();
        res.send({user: user._id});
    } catch (error) {
        res.status(400).send(err)
    }
});

//LOGIN
router.post('/login',async(req,res,next)=>{
    //LETs Validate the data
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user exist
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email or password is wrong');
    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid Password');
    

    //Creat and assign a token
    const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
    res.send('Logged in!')
});


module.exports = router;