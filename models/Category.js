const mongoose = require('mongoose');

const category = mongoose.Schema({
    Category : {
        type : String,
        required : true
    }
});

const Categorymodel = mongoose.model('category',category);
module.exports = Categorymodel;
