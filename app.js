const express = require('express');
const path = require('path');
const app = express();
const db = require('./config/mongodb');

const passport = require('passport');
const localstrategy = require('./config/local-strategy');
const session = require('express-session');

const jwt = require('./config/api/json-web-token-statergy');

const flash = require('connect-flash');
const messagemid = require('./config/massagemid');

const layout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded());
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))
app.use(express.static(path.join(__dirname,'/assets')));

app.set('layout','layout/master');
app.use(layout);

app.use(session ({
    name : 'id',
    secret : 'data',
    saveUninitialized :false,
    resave : false,
    cookie : {maxAge : 1000*60*60}
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.Authuser);

app.use(flash());
app.use(messagemid.setflash);

app.use('/',require('./routes/router'));

app.listen(8000,(err)=>{
    if(err){
        console.log('server error');
        return false;
    }
    console.log('server start port : 8000');
});