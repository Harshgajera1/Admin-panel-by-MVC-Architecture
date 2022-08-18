const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/adminpanel');

const db = mongoose.connection;
db.on('error',console.error.bind(console,'database not connect'))

db.once('open',(err)=>{
    if(err){
        console.log('database error');
        return false;
    }
    console.log('database connection successfull');
})

module.exports = db;