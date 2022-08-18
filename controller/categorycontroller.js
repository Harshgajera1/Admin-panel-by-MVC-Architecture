const Categorymodel = require('../models/Category');

module.exports.Add_category = (req,res)=>{
    return res.render('Add_category');
}

module.exports.Addrecord_category = (req,res)=>{
    // console.log(req.body);
    Categorymodel.create({
        Category : req.body.Category
    },(err,data)=>{
        if(err){
            console.log('error category insert');  return false;
        }
        // console.log(data);
        req.flash('success','Category Added');
        return res.redirect('back');
    });

}   

module.exports.Show_category = (req,res)=>{
    Categorymodel.find({},(err,data)=>{
        if(err){
            return false;
        }
        return res.render('Show_category',{data : data});
    });
}   

module.exports.Category_delete = (req,res)=>{
    // console.log(req.query.id);
    Categorymodel.findByIdAndDelete(req.query.id,(err,data)=>{
        if(err){
            return false;
        }
        // console.log(data);
        req.flash('warning','Catetgory Delete');
        return res.redirect('back');
    });
}

module.exports.Category_update = (req,res)=>{
    // console.log(req.params.id);
    Categorymodel.findById(req.params.id,(err,data)=>{
        if(err){
            return false;
        }
        // console.log(data);
        return res.render('Update_category',{data : data});
    });
}       


module.exports.Category_edit = (req,res)=>{
    // console.log(req.body);
    Categorymodel.findByIdAndUpdate(req.body.id,{
        Category : req.body.Category
    },(err,data)=>{
        if(err){
            console.log('category edit in error');  return false;
        }
        // console.log(data);
        req.flash('success','Category Update Successfully');
        return res.redirect('/category/Show_category');
    });
}