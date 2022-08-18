const express = require('express');
const router = express.Router();
const passport = require('passport');
const categorycontroller = require('../controller/categorycontroller');

router.get('/Add_category',passport.checkAuth,categorycontroller.Add_category);
router.get('/Show_category',passport.checkAuth,categorycontroller.Show_category);

router.post('/Addrecord_category',categorycontroller.Addrecord_category);

router.get('/category_delete',categorycontroller.Category_delete);
router.get('/category_update/:id',categorycontroller.Category_update);
router.post('/Edit_category',categorycontroller.Category_edit);

module.exports = router;