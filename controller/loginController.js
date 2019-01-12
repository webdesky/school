var express 	= require('express');
var router 		= express.Router();
var sha1 		= require('sha1');
var admin 		= require('../model/admin');
var moment 		= require('moment');
var changename 	= require("../helper/changefilename");
var fs 			= require('fs');
var async 		= require('async');
var path 		= require('path');
var nodemailer  = require('nodemailer');
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

router.get("/forgot_password", function(req, res){

	        admin.select(function(err,result){
				  res.render('admin/forgot_password',{error : req.flash('msg')});
		 	});

});


router.post("/password_send",function(req , res){

	var email   = req.body.email;
	var incrypt_email = encrypt(email)

	
	findObj	 = { email 		: email }
	tableobj = { tablename	: 'tbl_userlogin' }
    admin.findWhere(tableobj,findObj,function(err,result){
    	if(result==''){
    		req.flash("msg", "This E-mail is not registered");
			var pagedata = {title : "", pagename : "admin/index", error : req.flash('msg')};
			res.render("admin/forgot_password",pagedata);	
    	}else{
    		var transporter = nodemailer.createTransport({
			  service: 'gmail',
			  auth: {
			    user: 'webdeskytechnical@gmail.com',
			    pass: 'webdesky$2018'
			  }
			});

			var mailOptions = {
			  from: 'webdeskytechnical@gmail.com',
			  to: email,
			  subject: 'Forgot Password Reset Link',
			  text: 'Your Password Reset Link localhost:3000/login/change_password?id='+result[0].id+''
			};

			transporter.sendMail(mailOptions, function(error, info){
			  if (error) {
			    var pagedata = {title : "", pagename : "admin/index", error : req.flash('msg')};
				res.render("admin/forgot_password",pagedata);	
			  } else {
			  	req.flash("msg", "A Passsword Reset Link is send to your registered Mail id");
			    var pagedata = {title : "", pagename : "admin/index", error : req.flash('msg')};
				res.render("admin/forgot_password",pagedata);	
			  }
			});
    	}
    	console.log(result);

    }); 
	
});


router.get("/change_password",function(req,res){
	 var id = req.query.id;
	 var pagedata = {title : "", pagename : "admin/index", error : req.flash('msg'),id:id};
			res.render("admin/update_password",pagedata);	
	// console.log(typeof(email))
	// console.log(decrypt(email))
		// var pagedata = {title : "", pagename : "admin/index", error : req.flash('msg')};
		// res.render("admin/change_password",pagedata);	
		// console.log('asgasssss');
});


router.post('/update_password',function(req,res){
	console.log(req.body);
	var password     = req.body.password;
	var c_password   = req.body.confrim_password;
	var user_id      = req.body.user_id;
	var obj   	     = { password : sha1(password)}


	
	if(password == c_password){
		console.log('jsd');
		var where = {id:user_id}
		 var tableobj = {tablename:'tbl_userlogin'};
		 admin.updateWhere(tableobj,where,obj, function(err, result){ 
		 	var pagedata = {title : "", pagename : "admin/index"};
			res.render("admin/success",pagedata);	
		 });
		
	}else{
		console.log('jsdassss');
		 req.flash("msg", "Password And Confirm Password Not Match");
			var pagedata = {title : "", pagename : "Update Password", error : req.flash('msg'),id:user_id};
			res.render("admin/update_password",pagedata);	
            		      	
	}

	console.log(req.body)
});

function encrypt(text) {
 let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
 let encrypted = cipher.update(text);
 encrypted = Buffer.concat([encrypted, cipher.final()]);
 return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
 let iv = Buffer.from(text.iv, 'hex');
 let encryptedText = Buffer.from(text.encryptedData, 'hex');
 let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
 let decrypted = decipher.update(encryptedText);
 decrypted = Buffer.concat([decrypted, decipher.final()]);
 return decrypted.toString();
}

module.exports=router;