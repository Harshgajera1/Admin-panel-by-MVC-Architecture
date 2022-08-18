const mongoose = require('mongoose');

const subcategory = mongoose.Schema({
    Category_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category'
    },
    Subcategory : {
        type : String,
        required: true
    }
});

const subcategorymodel = mongoose.model('subcategory',subcategory);
module.exports = subcategorymodel;