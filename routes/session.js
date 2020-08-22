const express = require('express')
const router = express.Router()
const StudySession = require("../models/studySession")
const checkAuthenticated = require("../authenticate-function").checkAuthenticated

//Create studySession
router.post('/', checkAuthenticated, async (req, res) => {
  try {
    const session = new StudySession({
      minutes: req.body.min, 
      userId: req.user.id,
      description: req.body.description,   
      subject: req.body.subject
    }) 
    await session.save()
    return res.redirect('/session')
  } catch{
      res.send("we had a problem saving your session")
    }  
})
//Show list of studySessions
router.get('/', checkAuthenticated, async (req, res) => {
try {
  const studySessions = await StudySession.find({ userId: req.user.id})
  res.render('session.ejs', {sessions: studySessions})
} catch { res.redirect('/')}
})
router.get('/new', checkAuthenticated, async (req, res) => {
  res.render('create.ejs')
})

//show studySession page
router.get('/:id', async (req, res)=>{
  try {
    const studySession = await StudySession.findById(req.params.id)
    res.render('show', {session: studySession})
  } catch{
    res.redirect('/')
  }
})

//Edit route
router.put('/:id', async (req,res)=>{
  let session
   try {
    console.log(req.params.id)
       session = await StudySession.findById(req.params.id)
       
       session.minutes = req.body.min, 
       session.description = req.body.description,   
       session.subject =  req.body.subject
       await session.save()
       res.redirect(`/session/${session.id}`)
   } catch (err){
      console.log(req.body.min)
       console.log(err)
       res.redirect('/session')
   }
})

router.delete('/:id', async (req,res) => {
  let studySession;
  //query db for session
  try {
    studySession = await StudySession.findById(req.params.id)
    await studySession.remove()
    res.redirect('/session')
  } catch{
    if (studySession === null){
      res.redirect('/session')
    }else{
    res.redirect(`/session/${studySession.id}`)
    }
  }
  
})

module.exports = router;