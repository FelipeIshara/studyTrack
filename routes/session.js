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
/*DEfalt show: last 10 sessions*/  
let query = StudySession.find({userId: req.user.id}).limit(10).sort('-sessionDate')
/*Subject Filter*/
if (req.query.subject != null && req.query.subject != ''){
  query = query.regex('subject', new RegExp(req.query.subject, 'i'))
}
/*After Date Filter*/ 
if (req.query.after != null && req.query.after != ''){
  query = query.gte('sessionDate', req.query.after)
}
if (req.query.before != null && req.query.before != ''){
  query = query.lte('sessionDate', req.query.before)
}
try {
  const studySessions = await query.exec()
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
    res.render('details.ejs', {session: studySession})
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