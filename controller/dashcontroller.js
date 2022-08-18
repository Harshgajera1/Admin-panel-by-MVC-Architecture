const Adminmodel = require('../models/Adminmodel');
const fs = require('fs');
const path = require('path');
const nodemailer = require('../config/nodemailer');
const registermodel = require('./../models/Register');

const dashboard = (req,res)=>{
    return res.render('dashboard');
}

const AddAdmin = (req,res)=>{
    return res.render('Add_Admin');
}

const  Addrecord_admin = (req,res)=>{
    // console.log(req.body);
    // console.log(req.file);

    Adminmodel.uploadfile(req,res,(err)=>{
        if(err){
            console.log('error upload');
            return false;
        }
        // console.log(req.body);
        // console.log(req.file);
        if(req.file){
            const name = req.body.Firstname+' '+req.body.Lastname;
            var Imgname = Adminmodel.image_path+'/'+req.file.filename; 
            // console.log(Imgname);
            Adminmodel.create({
                Name : name,
                Email : req.body.Email,
                Password : req.body.Password,
                Gender : req.body.Gender,
                Hobby : req.body.Hobby,
                City :req.body.City,
                Description : req.body.Description,
                Image : Imgname
            },(err,data)=>{
                if(err){ 
                    req.flash('error','data not inserted');
                    console.log('insert error'); 
                    return res.redirect('back'); 
                }
                // console.log(data);
                req.flash('success','data insert successfully');
                return res.redirect('back');
            });
        }
    });

   
}

const Show_admin = async (req,res)=>{

    try {
        var data = await Adminmodel.find({});
        if(data){
            return res.render('Show_Admin',{
                Admin_record : data
            });
        }
        else{
            console.log('error show admin');
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }  
}

const Delete_data =async (req,res)=>{
    try {
        var data = await Adminmodel.findById(req.params.id);
        if(data){
            if(data.Image){
                fs.unlinkSync(path.join(__dirname,'..',data.Image));
            }
            var data = await Adminmodel.findByIdAndDelete(req.params.id);
            if(data){
                req.flash('warning','Data Delete Successfully');
                return res.redirect('back');
            }
        }
    } catch (error) {
        console.log('error delete');
        console.log(error);
        return false
    }
}

const Update_admin = async (req,res)=>{
    // console.log(req.query.id);
    try {
        var data =await  Adminmodel.findById(req.query.id);
        if(data){
            return res.render('Update_admin',{
                Admin_updetedata : data
            });
        }
    } catch (error) {
        console.log('error update');
        return false;
    }
}

const Edit_admin= (req,res)=>{
    // console.log(req.body);
    // console.log(req.file);
    Adminmodel.uploadfile(req,res,(err,data)=>{
        if(err){
            console.log('update error');
            return false;
        }
        // console.log(req.body);
        // console.log(req.file);
        if(req.file){
            Adminmodel.findById(req.body.id,(err,data)=>{
                if(err){
                    return false;
                }
                // console.log(data);
                if(data.Image){
                    // console.log(path.join(__dirname,"..",data.Image));
                    fs.unlinkSync(path.join(__dirname,"..",data.Image));
                }
                // console.log(req.file);
                var imagenew = path.join(Adminmodel.image_path,"/",req.file.filename);
                // console.log(imagenew);
                Adminmodel.findByIdAndUpdate(req.body.id,{
                    Name : req.body.Fullname,
                    // Email : req.body.Email,
                    // Password : req.body.Password,
                    Gender : req.body.Gender,
                    Hobby : req.body.Hobby,
                    City : req.body.City,
                    Description : req.body.Description,
                    Image : imagenew
                },(err,data)=>{
                    if(err){
                        console.log('error update');
                        return false;
                    }
                    // console.log(data);
                    req.flash('success','Data Update Successfully');
                    return res.redirect('/Admin_showdata');
                });
            });

        }
        else{
            // console.log(req.body.id);
            Adminmodel.findById(req.body.id,(err,data)=>{
                if(err){
                    return false;
                }
                // console.log(data);
                var Image = data.Image;
                Adminmodel.findByIdAndUpdate(req.body.id,{
                    Name : req.body.Fullname,
                    // Email : req.body.Email,
                    // Password : req.body.Password,
                    Gender : req.body.Gender,
                    Hobby : req.body.Hobby,
                    City : req.body.City,
                    Description : req.body.Description,
                    Image : Image,
                },(err,data)=>{
                    if(err){
                        console.log('error edit');
                        return false;
                    }
                    // console.log(data);
                    req.flash('warning','Date Update Successfully');
                    return res.redirect('/Admin_showdata');
                });
            });


        }
    })
}


const login = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/dashboard');
    }
    return res.render('Admin_login',{layout : false});
}

const Login_admin = (req,res)=>{
    // console.log(req.body);
    // console.log('ok');
    req.flash('success','login successfully');
    return res.redirect('/dashboard');
}

const Change_password1234 = (req,res)=>{
    return res.render('Change_password');
}

const Edit_password1234 =async (req,res)=>{
    // console.log(req.body);
    try {
        var cu_pass = req.body.current_password;
        var new_pass = req.body.new_password;
        var co_pass = req.body.confirm_password;
        // console.log(req.user);
        if(req.user.Password == cu_pass){
            if(cu_pass != new_pass){
                if(new_pass == co_pass){
                    var data = await Adminmodel.findByIdAndUpdate(req.user.id,{
                        Password : new_pass
                    });
                    if(data){
                        req.session.destroy((err)=>{
                            if(err){
                                return false;
                            }
                        });
                        return res.redirect('/');
                    }
                    else{
                       console.log('error change password'); 
                       return false;
                    }
                }
                else{
                    return res.redirect('back');
                }
            }
            else{
                return res.redirect('back');
            }
        }
        else{
            return res.redirect('back');
        }
    }
     catch (error) {
        
    }
}



const View_profile = (req,res)=>{
    // console.log(req.user);
    return res.render('View_profile',{ data : req.user });
}



const Change_email = (req,res)=>{
    return res.render('Change_Email');
}

const Edit_email = async (req,res)=>{
    try {
        // console.log(req.body);
        const check_email = await Adminmodel.findOne({Email :req.body.Current_Email});
        if(check_email){
            if(check_email.Password == req.body.Email_Password){
                if(check_email.Email != req.body.New_Email){
                    const data = await Adminmodel.findByIdAndUpdate(check_email.id,{
                        Email : req.body.New_Email
                    });
                    return res.redirect('/Admin_showdata');
                }
                else{
                    console.log('old email and new email are same.');
                    return res.redirect('back');
                }
            }
            else{
                console.log('email or password are not match');
                return res.redirect('back');
            }
        }
        else{
            console.log('email not valid');
            return res.redirect('back');
        }
    } catch (error) {
        // console.log(error);
        console.log('error edit email try');
        return false;
    }
}


const Logout = (req,res)=>{
    if(req.isAuthenticated()){
        req.session.destroy((err)=>{
            if(err){
                return false;
            }
            return res.redirect('/');
        });
    }
    else{
        return res.redirect('/');
    }
}   

//----------- password forget---------
const Forgetpass = (req,res)=>{
    return res.render('forgetpassword',{layout : false});
}

// ---------password reset -----------
const Reset_pass = (req,res)=>{
    // console.log(req.body.email);
    registermodel.findOne({email : req.body.email},(err,data)=>{
        if(err){
            console.log('error reset password');
            return false;
        }
        // console.log(data);
        var otp = Math.random();
        var newotp = parseInt(otp*1000000).toString();
        
        // console.log(newotp.length);
        if(newotp.length == 6){ 
            if(data){
                console.log(newotp);
                res.cookie('otp',newotp);
                res.cookie('email',req.body.email);

                const detail = {
                    from : 'jaysukhgajera443@gmail.com',
                    to : 'harshgajera202@gmail.com',
                    subject  : "send OTP",
                    html : 'your reset otp '+ newotp + '<br>for testing'
                }

                nodemailer.sendMail(detail,(err,info)=>{
                    if(err){
                        console.log(err);
                        return false;
                    }
                    // console.log(info);
                    console.log('send mail successfully');
                    return res.redirect('/checkotp');
                })
            }
            else{
                console.log('email not found');
                return res.redirect('back');
            }
        }
        else{
            return res.redirect('back');
        }
    })
}

const Checkotp = (req,res)=>{
    return res.render('Checkotp',{layout : false});
}

const Matchotp = (req,res)=>{
    // console.log(req.body);
    // console.log(req.cookies);
    if(req.body.matchotp == req.cookies.otp && req.cookies.email){
        // console.log('match');
        return res.redirect('/genratenewpass');
    }
    else{
        console.log('otp not match');
        return res.redirect('back');
    }  
}

const Genratenewpass = (req,res)=>{
    return res.render('New_Password',{layout : false});
}

const Change_Pass = (req,res)=>{
    // console.log(req.body);
    if(req.body.newPass == req.body.newcPass){
        // console.log(req.cookies.email);
        registermodel.findOne({Email :  req.cookies.email},(err,data)=>{
            if(err){
                console.log('error email');
                return false;
            }
            // console.log(`@@@`+data);
            if(data){
                registermodel.findByIdAndUpdate(data.id,{
                    password : req.body.newPass
                },(err,data)=>{
                    if(err){ console.log('data not found'); return false;}
                    // console.log(data);
                    res.cookie('otp','');
                    res.cookie('email','');
                    return res.redirect('/');
                });
            }
            else{
                console.log('data not match with database');
                return res.redirect('back');
            }
        });
    }
    else{
        console.log('password not same');
        return res.redirect('back');
    }
}

const register  = (req,res)=>{
    return res.render('Register',{layout : false});
}

const register_admin = async (req,res)=>{
    try {
        if(req.body.password == req.body.confirm_password){
            // console.log(req.body);
            const data = await registermodel.create(req.body);
            // console.log(data);
            return res.redirect('/');
        }
        else{
            return res.redirect('back');
        }
    } catch (error) {
        console.log(errors);
        return false;
    }

}

module.exports = {dashboard, AddAdmin, Addrecord_admin,Edit_admin, Show_admin, Delete_data, Update_admin, login, Login_admin, Change_password1234, Edit_password1234, View_profile,Change_email,Edit_email, Logout, Forgetpass, Reset_pass, Checkotp,Matchotp,Genratenewpass,Change_Pass, register, register_admin }