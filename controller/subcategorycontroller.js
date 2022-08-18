const subcategorymodel = require('../models/Subcategory');
const category = require('../models/Category');

module.exports.Add_subcategory = (req,res)=>{
    category.find({},(err,data)=>{
        if(err){
            console.log(err);
            return false;
        }
        // console.log(data);
        return res.render('Add_subcategory',{data : data});
    });

}

module.exports.Addrecord_subcategory = (req,res)=>{
    console.log(req.body);
    subcategorymodel.create(req.body,(err,data)=>{
        if(err){
            console.log('error insert subcategory');
            return false;
        }
        console.log(data);
        req.flash('success','Subcategory Added');
        return res.redirect('back');
    })
}

module.exports.Show_subcategory = async (req,res)=>{
    try {
        let data = await subcategorymodel.find({}).populate('Category_id').exec();
        // console.log(data);
        if(data){
            return res.render('Show_subcategory',{data  :data});       

        }
    } catch (error) {
        console.log('error in show subcategory');
        return false;
    }
}

module.exports.Delete_subcategory = (req,res)=>{
    // console.log(req.params.id);
    subcategorymodel.findByIdAndDelete(req.params.id,(err,data)=>{
        if(err){
            console.log('delete in error subcategory');
            return false;
        }
        // console.log(data);
        req.flash('warning','Subcategory Delete');
        return res.redirect('back');
    });
}

module.exports.Update_subcategory = async (req,res)=>{
    // console.log(req.query.id);
    try {
        let data = await subcategorymodel.findById(req.query.id).populate('Category_id').exec();
        let subdata = await category.find({});
        // console.log(data);
        // console.log(subdata);
        if(data && subdata){
                return res.render('Update_subcategory',{data : data, subdata : subdata});
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.Edit_subcategory = (req,res)=>{
    // console.log(req.body);
    subcategorymodel.findByIdAndUpdate(req.body.id,req.body,(err,data)=>{
        if(err){ console.log('id not match'); return false };
        // console.log(data);
        req.flash('success','Subcategory Updated');
        return res.redirect('/subcategory/Show_subcategory');
    });
}