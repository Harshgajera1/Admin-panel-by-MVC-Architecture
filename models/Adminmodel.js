const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const image_path = path.join('/uploads/users/images');

const Adminschema = mongoose.Schema({
    Name : {
        type : String,
        required : true
    },
    Email : {
        type : String,
        required: true
    },
    Password : {
        type : String,
        required :true
    },
    Gender : {
        type : String,
        required : true
    },
    Hobby : {
        type :Array,
        required : true
    },
    City : {
        type : String,
        required: true
    },
    Description :{
        type : String,
        required: true
    },
    Image : {
        type : String,
        required: true
    }
});

let storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        // console.log(file);
        // console.log(path.join(__dirname,"..",image_path));
         cb(null,path.join(__dirname,"..",image_path));
    },
    filename  :(req,file,cb)=>{
        // console.log(file);
        cb(null,Date.now()+file.originalname);
    }
})
const upload = multer({storage : storage}).single('Image');

Adminschema.statics.uploadfile = upload;
Adminschema.statics.image_path = image_path;

const Adminmodel = mongoose.model('Admin',Adminschema);

module.exports = Adminmodel;