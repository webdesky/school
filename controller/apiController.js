var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var admin = require('../model/api');

  

router.get("/",function(req,res){
		
     admin.select(function(err,result){
     	
     	res.send(result);

        
	 });
});

router.post("/", function(req, res){
 	console.log(req.body);
	// var u = req.body.username;
	// var p = sha1(req.body.password);
    
	// admin.findWhere({ username : u}, function(err, result){
 //       console.log(result);
	// 	if(result.length==1)
	// 	{
	// 		var data = JSON.parse(JSON.stringify(result[0]));
	// 		if(data.password == p)
	// 		{
	// 			req.session.name = data.full_name;
	// 			req.session.uid = data.id;
	// 			req.session.is_user_logged_in = true;
	// 			console.log('dashboard');
	// 				 //res.redirect("/dashboard");
	// 				 var pagedata = {title : "Welcome Admin", pagename : "admin/dashboard", message : req.flash('msg')};
	//                  res.render("admin_layout", pagedata);
	// 		}
	// 		else
	// 		{
	// 			console.log('This password is incorrect');
	// 			req.flash("msg", "This password is incorrect");
	// 			res.redirect("/adminlogin");	
	// 		}
	// 	}
	// 	else
	// 	{
	// 		console.log('This username is incorrect');
	// 		req.flash("msg", "This username and password is incorrect");
	// 		res.redirect("/adminlogin");
	// 	}
	// });
});

module.exports=router;