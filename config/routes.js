var express = require('express');
var router =  express.Router();

router.use('/',require('../controller/adminlogin'));
router.use('/admin',require('../controller/adminlogin'));


router.use('/student',require('../controller/studentController'));
router.use('/parent',require('../controller/parentController'));
router.use('/teacher',require('../controller/teacherController'));


//backdoor_admin,
function backdoor_admin(req, res, next)
{
	if(req.session.user_role==1)
	{	
		var pagedata = {title : "Welcome Admin", pagename : "admin/dashboard", message : req.flash('msg')};
	    res.render("admin_layout", pagedata);
	}
	next();
}


module.exports=router;
