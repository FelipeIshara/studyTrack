const express = require('express')
const router = express.Router()
const StudySession = require("../models/studySession")
const checkAuthenticated = require("../authenticate-function").checkAuthenticated


router.post('/', checkAuthenticated, async (req, res) => {
  try {
    const session = new StudySession({
      minutes: req.body.min, 
      userId: req.user.id,
      description: req.body.description,   
      subject: req.body.subject
    }) 
    const newStudySession = await session.save()
    console.log(newStudySession)
    return res.redirect('/')
  } catch (error) {
    console.log(error)
    res.send("we had a problem saving your session")
  }  
 
})

router.get('/', checkAuthenticated, async (req, res) => {
try {
  const studySessions = await StudySession.find({ userId: req.user.id})
  console.log(studySessions)
  res.render('session.ejs', {sessions: studySessions})
} catch (error) {
  console.log(error)
  res.redirect('/')
}
  

})

module.exports = router;