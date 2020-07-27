const express = require('express')
const router = express.Router()
const checkAuthenticated = require("../authenticate-function").checkAuthenticated

router.delete('/', checkAuthenticated, (req,res)=>{
    req.logOut()
    res.redirect('/login')
})

module.exports = router;