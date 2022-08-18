const express = require('express');
const passport = require('passport');
const router = express.Router();
const dashcontroller = require('../controller/dashcontroller');

router.get('/',dashcontroller.login);
router.get('/dashboard',passport.checkAuth,dashcontroller.dashboard);
router.get('/Add_Admin',passport.checkAuth,dashcontroller.AddAdmin);
router.post('/Addrecord_admin',dashcontroller.Addrecord_admin);
router.get('/Admin_showdata',passport.checkAuth,dashcontroller.Show_admin);
router.get('/Admin_delete/:id',dashcontroller.Delete_data);
router.get('/Admin_update',dashcontroller.Update_admin);
router.post('/Edit_admin',dashcontroller.Edit_admin);

router.get('/register',dashcontroller.register);
router.post('/register_admin',dashcontroller.register_admin);

router.post('/login_admin',passport.authenticate('local',{ failureRedirect : '/' }),dashcontroller.Login_admin);

router.get('/change_email',passport.checkAuth,dashcontroller.Change_email);
router.post('/edit_email',dashcontroller.Edit_email);
router.get('/logout',dashcontroller.Logout);

router.get('/forgetpass',dashcontroller.Forgetpass);
router.post('/forget_password',dashcontroller.Reset_pass);

router.get('/checkotp',dashcontroller.Checkotp);
router.post('/matchotp',dashcontroller.Matchotp);

router.get('/genratenewpass',dashcontroller.Genratenewpass);
router.post('/change_pass',dashcontroller.Change_Pass);

router.use('/category',require('./categoryrouter'));
router.use('/subcategory',require('./subcategoryrouter'));

module.exports = router;