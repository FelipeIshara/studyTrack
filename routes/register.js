const express = require('express')
const router = express.Router()
const User = require("../models/user")
const bcrypt = require('bcrypt')


router.get('/', (req,res)=>{
    res.render('register')
})

//requisição de registro
router.post('/', async (req,res)=>{
  //hashing password
  try { 
    //verificar se usuário já existe
    const userAlreadyExist = await User.find({ username: req.body.username })
    if(userAlreadyExist != ''){
      return res.send("este usuário já existe")
    } 
    //hashing password
    hashPassword = await bcrypt.hash(req.body.password, 10)
    //pegando os dados do registro
    const user = new User({
      name: req.body.name, 
      username: req.body.username,
      password: hashPassword   
    }) 
    const newUser = await user.save()
    console.log(newUser)
    return res.render('login')
  } catch(err) {
    console.log(err)
    res.redirect('/register')
  }
})

module.exports = router;