const express = require('express');
const passport = require('passport');
const router = express.Router();
const subcategorycont = require('../controller/subcategorycontroller');

router.get('/Add_subcategory',passport.checkAuth,subcategorycont.Add_subcategory);
router.post('/Addrecord_subcategory',subcategorycont.Addrecord_subcategory);
router.get('/Show_subcategory',passport.checkAuth,subcategorycont.Show_subcategory);

router.get('/delete_subcategory/:id',subcategorycont.Delete_subcategory);
router.get('/update_subcategory',subcategorycont.Update_subcategory);

router.post('/Edit_subcategory',subcategorycont.Edit_subcategory);


module.exports = router;