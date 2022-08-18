const passport = require('passport');
const localstrategy = require('passport-local').Strategy;
const registermodel = require('./../models/Register');

passport.use(new localstrategy({
    usernameField : 'email'
},(email,password,done)=>{
    registermodel.findOne({email : email},(err,user)=>{
        if(err){
            console.log('passport find error');
            return done(null,false);
        }   
        if(!user || user.password != password){
            console.log('passport or email not found');
            return done(null,false);
        }
        // console.log(user);
        return done(null,user);
    })
}));

passport.serializeUser((user,done)=>{
    // console.log(user);
    return done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    registermodel.findById(id,(err,user)=>{
        if(err){
            console.log('error');
            return done(null,false);
        }
        return done(null,user);
    });     
});

passport.checkAuth = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

passport.Authuser = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user;
        // console.log(req.user);
    }
    return next();
}

module.exports = passport;
