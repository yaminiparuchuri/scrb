

module.exports = function(req,res,next){
  console.log(req.session.user);
  if(!req.session.user){
    res.redirect('/');
    return;
  }
  next();
};
