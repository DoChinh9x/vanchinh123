const router = require('express').Router();
const verify = require('./verifyToken');


router.get('/',verify,(req,res)=>{
    res.json({
        post : {
            title: 'vanchinh',
            description: 'dep trai'
        }
    })
})



module.exports = router;
