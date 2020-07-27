const express = require('express')
const router = express.Router()
const checkAuthenticated = require("../authenticate-function").checkAuthenticated

router.get('/', checkAuthenticated, (req,res)=>{
    res.render("pomodoro", {name: req.user.name})
})

//MAKE POST ROUTE TO SAVE SESSION

module.exports = router;
