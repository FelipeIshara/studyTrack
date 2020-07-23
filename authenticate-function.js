function checkAuthenticated(req,res,next) {
    if(req.isAuthenticated()){
      return next()
    }
    res.redirect('/login')
  }
  
  //midleware para pgs em que o usuário não pode estar autenticado
  function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
      return res.redirect('/')
    }
    next()
  
}

module.exports = {checkAuthenticated, checkNotAuthenticated};