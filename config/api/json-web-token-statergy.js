// const passport = require('passport');

// const jwtstrategy = require('passport-jwt').Strategy;
// const jwtextract = require('passport-jwt').ExtractJwt;

// const Adminmodel = require('../../models/Adminmodel');


// const opts=  {
//     jwtFromRequest : jwtextract.fromAuthHeaderAsBearerToken(),
//     secretOrKey : 'harshjwt'
// }

// passport.use(new jwtstrategy(opts,(userdata,done)=>{
//     Adminmodel.findById(userdata._id,(err,user)=>{
//         if(err){console.log(err); return done(null,false);}
//         if(user){
//             console.log(user);
//             return done(null,user);
//         }
//         else{
//             return done(null,false);
//         }
//     })
// } ))

// module.exports = passport;



const passport = require('passport');
const Adminmodel = require('../../models/Adminmodel');
const jwtstrategy = require('passport-jwt').Strategy;
const jwtextract = require('passport-jwt').ExtractJwt;

const opts = {
    jwtFromRequest : jwtextract.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'jwtharsh' 
}

passport.use(new jwtstrategy(opts,(userdata,done)=>{
    Adminmodel.findById(userdata._id,(err,user)=>{
        if(err){return done(err); }
        if(user){
            // console.log(user);
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    });
}));

module.exports = passport;