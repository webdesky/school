var express 	= require('express');
var router 		= express.Router();
var sha1 		= require('sha1');
var admin 		= require('../model/admin');
var moment 		= require('moment');
var changename 	= require("../helper/changefilename");
var fs 			= require('fs');
var async 		= require('async');
var path 		= require('path');

var msg91 = require("msg91")("217251AHzwgfQryg5b08d540", "edurec", "4" );
var fs = require('fs');
var parse = require('csv-parse');
var  Json2csvParser = require('json2csv').Parser;
//var csv = require('csv');
//var csvobj = csv();

function MyCSV(Fone, Ftwo, Fthree) {
        this.FieldOne = Fone;
        this.FieldTwo = Ftwo;
        this.FieldThree = Fthree;
    }; 

router.get("/",function(req,res){
	 	if(req.session.user_role==1)
		{	
			 findObj  = {user_role  : 2}
			 tableobj = {tablename  :'tbl_registration'}
		  	 column   =	{column 	:'registration_id'}
	         admin.findCount(tableobj,column,findObj,function(err,parent){
	          	var parent_count  = parent[0].count;
	         	admin.findCount(tableobj,column,{user_role:3},function(err,student){
	          	var student_count  = student[0].count;
	          		admin.findCount(tableobj,column,{user_role:4},function(err,teacher){
	          		var teacher_count  = teacher[0].count;
						var pagedata = {title : "Welcome Admin", pagename : "admin/dashboard", message : req.flash('msg'),parent_count:parent_count,student_count:student_count,teacher_count:teacher_count};
					    res.render("admin_layout", pagedata);
					});
				});
			 });
		}else
		{
	        admin.select(function(err,result){

	           res.render('admin/index',{error : req.flash('msg')});
		 	});
	 	}
});
router.post("/", function(req, res){
  
	var u = req.body.username;
	var p = sha1(req.body.password);
   
	admin.findWhere({ username : u}, function(err, result){
		if(result.length==1)
		{
			var data = JSON.parse(JSON.stringify(result[0]));
			if(data.password == p)
			{
				req.session.name = data.full_name;
				req.session.uid = data.registration_id;
				req.user_role   = data.user_role;
 				req.session.is_user_logged_in = true;

					 //res.redirect("/dashboard");
				if(data.user_role==1){
					 findObj  = {user_role  : 2}
				  	 tableobj = {tablename  :'tbl_registration'}
				  	 column   =	{column 	:'registration_id'}
			         admin.findCount(tableobj,column,findObj,function(err,parent){
			          	var parent_count  = parent[0].count;
			         	
			         	admin.findCount(tableobj,column,{user_role:3},function(err,student){
			          	var student_count  = student[0].count;
			          		admin.findCount(tableobj,column,{user_role:4},function(err,teacher){
			          		var teacher_count  = teacher[0].count;
								var pagedata = {title : "Welcome Admin", pagename : "admin/dashboard", message : req.flash('msg'),parent_count:parent_count,student_count:student_count,teacher_count:teacher_count};
							    res.render("admin_layout", pagedata);
							});
						});
					});
	            }else if(data.user_role==2){
	            	var pagedata = {title : "Welcome Admin", pagename : "parent/dashboard", message : req.flash('msg')};
	                res.render("admin_layout", pagedata);
	            

	            }else if(data.user_role==3){
	            	var pagedata = {title : "Welcome Admin", pagename : "student/dashboard", message : req.flash('msg')};
	                res.render("admin_layout", pagedata);
	            }else if(data.user_role==4){
                        

	            	var pagedata = {title : "Welcome Admin", pagename : "teacher/dashboard", message : req.flash('msg')};
	                res.render("admin_layout", pagedata);
	            }
			}
			else
			{
				console.log('This password is incorrect aaaaaa');
				req.flash("msg", "This password is incorrect");
				res.redirect("admin/index");	
			}
		}
		else
		{
			console.log('This username is incorrect');
			req.flash("msg", "This username and password is incorrect");
			res.redirect("admin/index");
		}
	});
});


router.post("/dashboard", function(req, res){

	var u = req.body.username;
	var p = sha1(req.body.password);
    var tableobj = {tablename:'tbl_userlogin'};
    admin.findWhere(tableobj,{ email : u}, function(err, result){
    	console.log(result);
		if(result.length==1)
		{
			var data = JSON.parse(JSON.stringify(result[0]));
			if(data.password == p)
			{
				req.session.name              = data.full_name;
				req.session.uid               = data.registration_id;
				req.session.user_role         = data.user_role;
				req.session.is_user_logged_in = true;
				//console.log('dashboard');
				//console.log(data.user_role);
				if(data.user_role==1){
					 findObj  = {user_role  : 2}
				  	 tableobj = {tablename  :'tbl_registration'}
				  	 column   =	{column 	:'registration_id'}
			         admin.findCount(tableobj,column,findObj,function(err,parent){
			          	var parent_count  = parent[0].count;
			         	
			         	admin.findCount(tableobj,column,{user_role:3},function(err,student){
			          	var student_count  = student[0].count;
			          		admin.findCount(tableobj,column,{user_role:4},function(err,teacher){
			          		var teacher_count  = teacher[0].count;
			          		  admin.findAll({table:'tbl_setting'},function(err, result1){
			          		  	req.session.school_id = result1[0].school_id;
			          		  	req.session.logo = result1[0].logo;
			          		  	req.session.session_year = result1[0].session_year;
			          		  	req.session.school_name = result1[0].school_name;
			          		  	req.session.school_address = result1[0].school_address;

			          		  	req.session.phone = result1[0].phone;
								var pagedata = {title : "Welcome Admin", pagename : "admin/dashboard", message : req.flash('msg'),parent_count:parent_count,student_count:student_count,teacher_count:teacher_count};
							    res.render("admin_layout", pagedata);
							    });
							});
						});
					});
					
	            }else if(data.user_role==2){
	            	admin.findAll({table:'tbl_setting'},function(err, result1){
			          		  	req.session.school_id = result1[0].school_id;
			          		  	req.session.logo = result1[0].logo;
			          		  	req.session.session_year = result1[0].session_year;
			          		  	req.session.school_name = result1[0].school_name;
			          		  	req.session.school_address = result1[0].school_address;

			          		  	req.session.phone = result1[0].phone;
	            	var pagedata = {title : "Welcome Admin", pagename : "parent/dashboard", message : req.flash('msg')};
	                res.render("admin_layout", pagedata);
	            });
	            }else if(data.user_role==3){
	            	admin.findAll({table:'tbl_setting'},function(err, result1){
			          		  	req.session.school_id = result1[0].school_id;
			          		  	req.session.logo = result1[0].logo;
			          		  	req.session.session_year = result1[0].session_year;
			          		  	req.session.school_name = result1[0].school_name;
			          		  	req.session.school_address = result1[0].school_address;

			          		  	req.session.phone = result1[0].phone;
	            	var pagedata = {title : "Welcome Admin", pagename : "student/dashboard", message : req.flash('msg')};
	                res.render("admin_layout", pagedata);
	            });
	            }else if(data.user_role==4){
                     
                    findObj  = {user_role  : 2}
				  	 tableobj = {tablename  :'tbl_registration'}
				  	 column   =	{column 	:'registration_id'}
			         admin.findCount(tableobj,column,findObj,function(err,parent){
			          	var parent_count  = parent[0].count;
			         	
			         	admin.findCount(tableobj,column,{user_role:3},function(err,student){
			          	var student_count  = student[0].count;
			          		admin.findCount(tableobj,column,{user_role:4},function(err,teacher){
			          		var teacher_count  = teacher[0].count;
			          		  admin.findAll({table:'tbl_setting'},function(err, result1){
			          		  	req.session.school_id = result1[0].school_id;
			          		  	req.session.logo = result1[0].logo;
			          		  	req.session.session_year = result1[0].session_year;
			          		  	req.session.school_name = result1[0].school_name;
			          		  	req.session.school_address = result1[0].school_address;

			          		  	req.session.phone = result1[0].phone;
								//var pagedata = {title : "Welcome Admin", pagename : "admin/dashboard", message : req.flash('msg'),parent_count:parent_count,student_count:student_count,teacher_count:teacher_count};
							    //res.render("admin_layout", pagedata);
							     var pagedata = {title : "Welcome Admin", pagename : "teacher/dashboard", message : req.flash('msg')};
	                             res.render("admin_layout", pagedata);
							    });
							});
						});
					}); 

	            	
	            }
			}
			else
			{
				//console.log('This password is incorrectbbbbbbbb');
				req.flash("msg", "This password is incorrect");
				var pagedata = {title : "", pagename : "admin/index", error : req.flash('msg')};
				res.render("admin/index",pagedata);	
			}
		}
		else
		{
			console.log('This username is incorrect');
			req.flash("msg", "This username and password is incorrect");
			res.render("admin/index");	
			//res.redirect("/");
		}
	});
});

router.get("/dashboard", function(req, res){
	if(req.session.user_role==1)
		{

		findObj  = {user_role  : 2}
				  	 tableobj = {tablename  :'tbl_registration'}
				  	 column   =	{column 	:'registration_id'}
			         admin.findCount(tableobj,column,findObj,function(err,parent){
			          	var parent_count  = parent[0].count;
			         	
			         	admin.findCount(tableobj,column,{user_role:3},function(err,student){
			          	var student_count  = student[0].count;
			          		admin.findCount(tableobj,column,{user_role:4},function(err,teacher){
			          		var teacher_count  = teacher[0].count;
								var pagedata = {title : "Welcome Admin", pagename : "admin/dashboard", message : req.flash('msg'),parent_count:parent_count,student_count:student_count,teacher_count:teacher_count};
							    res.render("admin_layout", pagedata);
							});
						});
					});
	    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	 	}
});


router.post("/registration", function(req, res){

 
 	if(req.session.user_role==1){


	 	var register   = req.body.userregister;
	 	var table      = {tablename:'tbl_registration'};
        
        if(req.body.registration_id)
	     {

	          var where= {registration_id:req.body.registration_id}
		      var tableobj = {tablename:'tbl_registration'};
		      var obj= { admission_number : req.body.admission_number,
		      	          aadhar_number:req.body.adhar_number,
		      	          name :req.body.student_name,
		      	          dob:req.body.student_dob ,
		      	          sex:req.body.student_gender ,
		      	          //religion:req.body. ,
		      	          blood_group:req.body.blood_group ,
		      	          address:req.body.address ,
		      	          phone:req.body.student_phone ,
		      	          email:req.body.student_email ,
		      	          mother_name:req.body.mother_name ,
		      	          caste:req.body.caste ,
		      	          subcaste:req.body.sub_caste ,
		      	          transport_id:req.body.transport_id ,
		      	          dormitory_id:req.body.dormitory_id ,
		      	        }

		      admin.updateWhere(tableobj,where,obj, function(err, result){  
                 var whereparent= {registration_id:req.body.parent_id}
                 objparent={
                             name :req.body.parent_name,
                             address :req.body.parent_address,
                             phone :req.body.parent_number,
                             email :req.body.parent_email,
                             profession:req.body.parent_profession
                           };  
                  admin.updateWhere(tableobj,whereparent,objparent, function(err, result){     
			      		res.redirect("/studentList");
			      });
			      if(result)
			      	{
			      		res.redirect("/studentList");
			      	}

		      });
	     }
     	else if(register=='student'){
	 			var data = {
			 		name 		 :req.body.parent_name,	 		
			 		address		 :req.body.parent_address,
			 		phone		 :req.body.parent_number,
			 		email		 :req.body.parent_email,
			 		user_role    :2,
			 		created_date :moment().format('YYYY-MM-DD:hh:mm:ss')
		 		}
		 	
		 	var table      = {tablename:'tbl_registration'};
	 		admin.findWhere(table,{name:req.body.student_name,email:req.body.student_email,phone:req.body.student_phone},function(err, result){
		  	 if(result.length>0)
		  	 {
              var studentdata= { admission_number : req.body.admission_number,
		      	          aadhar_number:req.body.adhar_number,
		      	          name :req.body.student_name,
		      	          dob:req.body.student_dob ,
		      	          sex:req.body.student_gender ,
		      	          //religion:req.body. ,
		      	          blood_group:req.body.blood_group ,
		      	          address:req.body.address ,
		      	          phone:req.body.student_phone ,
		      	          student_email:req.body.student_email ,
		      	          mother_name:req.body.mother_name ,
		      	          caste:req.body.caste ,
		      	          subcaste:req.body.sub_caste ,
		      	          transport_id:req.body.transport_id ,
		      	          dormitory_id:req.body.dormitory_id ,
		      	          name :req.body.parent_name,
                          parent_address :req.body.parent_address,
                          parent_number :req.body.parent_number,
                          parent_email :req.body.parent_email,
                          parent_profession:req.body.parent_profession
		      	        }
              //console.log(studentdata.name);
              //return false;

			    var table  = 'tbl_class';
				
				admin.findAll({table:table},function(err, result){
				    var class_list 	 = result;

					admin.findAll({table:'tbl_transport'},function(err,result){

						 transport_list  = result;

							admin.findAll({table:'tbl_dormitory'},function(err,result){
								 dormitory_list  = result;
                                 //onsole.log('alreadyyyyyyyyyyyyy')
								 req.flash('error','Student already registered')
 								 var pagedata = {title : "Welcome Admin", pagename : "admin/Registration", success : req.flash('success'), error : req.flash('error'),class_list:class_list,transport_list :transport_list,dormitory_list:dormitory_list,admission_number:admission_number,studentdata:studentdata};
								 res.render("admin_layout", pagedata);
								 
						    });	 
						  // console.log(transport_list);
					});
				});	
		  	                            
	           

	           //var  pagedata = {title : "Welcome Admin", pagename : "admin/class", success : req.flash('success'), error : req.flash('error'),classdata:$data,class_list:''};   	
	                 
	          }
		  	 else
		  	 {
		  	 	admin.insert_all(table,data,function(err, result){
		 		var registration_id 	= result;
		 		var login_table  	    = {tablename:'tbl_userlogin'};
		 		var parent_password    = sha1(req.body.parent_password)

			 			var login_data   = {
			 			registration_id : registration_id,
			 			email           : req.body.parent_email,
			 			password        : parent_password,
			 			user_role       : 2

			 		}
		 		
		 		admin.insert_all(login_table,login_data,function(err, result){

		 		});
		 		
			 		var student_data = {
			 			admission_number :req.body.admission_number,
				 		name 		 :req.body.student_name,	 		
				 		caste		 :req.body.caste,
				 		subcaste     :req.body.sub_caste,
				 		dob          :req.body.student_dob,
				 		sex			 :req.body.student_gender,
				 		address		 :req.body.address,
				 		phone		 :req.body.student_phone,
				 		email		 :req.body.student_email,
				 		dormitory_id :req.body.dormitory_id,
				 		transport_id :req.body.transport_id,
				 		aadhar_number:req.body.adhar_number,
				 		blood_group  :req.body.blood_group,
				 		mother_name  :req.body.mother_name,
				 		parent_id    :registration_id,
				 		user_role    :3,
				 		created_date :moment().format('YYYY-MM-DD:hh:mm:ss')
				 	}
			 	

				 	admin.insert_all(table,student_data,function(err, result){
				 			var registration_id  = result
				 			var student_password = sha1(req.body.student_password)
					 		var login_data   = {
					 			registration_id : registration_id,
					 			email           : req.body.student_email,
					 			password        : student_password,
					 			user_role       : 3

					 		}
				 		
					 		admin.insert_all(login_table,login_data,function(err, result){

					 		});

					 		var enroll_table  = {tablename:' tbl_enroll'}
			 				var enroll_data   = {
			 					registration_id  : registration_id,
			 					class_id         : req.body.class_id,
			 					section_id  	 : req.body.section_id,
			 					session_year     : req.session.session_year,
			 					created_date      :moment().format('YYYY-MM-DD:hh:mm:ss')
			 				}
			 				admin.insert_all(enroll_table,enroll_data,function(err, result){

					 		});
			 		});


				});

		  	 } //  IF Close 

		  	});

		 	

	 	}else if(register=='teacher'){
	 		 console.log(req.body);
	 		var teacher_data = {
	 			    name 		 :req.body.teacher_name,	 		
			 		dob          :req.body.teacher_dob,
			 		sex			 :req.body.teacher_gender,
			 		address		 :req.body.teacher_address,
			 		phone		 :req.body.teacher_email,
			 		email		 :req.body.teacher_phone,
			 		aadhar_number:req.body.teacher_adhar_no,
			 		staff_category:req.body.staff_category,
			 		academics     :req.body.academics,
			 		profession     :req.body.teacher_profession,

			 		user_role    :4,
			 		created_date :moment().format('YYYY-MM-DD:hh:mm:ss')
	 		}	

	 		admin.insert_all(table,teacher_data,function(err, result){
	 			var registration_id = result;

	 			var login_table  	    = {tablename:'tbl_userlogin'};
		 		var teacher_password    = sha1(req.body.teacher_password)
			 	
			 	var login_data   = {
			 			registration_id : registration_id,
			 			email           : req.body.teacher_email,
			 			password        : teacher_password,
			 			user_role       : 4

			 	}

			 	admin.insert_all(login_table,login_data,function(err, result){

				});

			});

	 	}else if(register=='accountant'){
	 		var accountant_data = {
	 			    name 		 :req.body.accountant_name,	 		
			 		sex			 :req.body.accountant_gender,
			 		email		 :req.body.accountant_email,
			 		address		 :req.body.accountant_address,
			 		phone		 :req.body.accountant_phone,
			 		academics     :req.body.accountant_academics,
			 		profession     :req.body.accountant_profession,
			 		user_role    :5,
			 		created_date :moment().format('YYYY-MM-DD:hh:mm:ss')
	 		}	


	 		admin.insert_all(table,accountant_data,function(err, result){
	 			var registration_id = result;

	 			var login_table  	    = {tablename:'tbl_userlogin'};
		 		var accountant_password    = sha1(req.body.accountant_password)
			 	
			 	var login_data   = {
			 			registration_id : registration_id,
			 			email           : req.body.accountant_email,
			 			password        : accountant_password,
			 			user_role       : 5

			 	}

			 	admin.insert_all(login_table,login_data,function(err, result){

				});

			});
	 	}else if(register=='librarian'){
	 		var librarian_data = {
	 			    name 		 :req.body.librarian_name,	 		
			 		sex			 :req.body.librarian_gender,
			 		email		 :req.body.librarian_email,
			 		address		 :req.body.librarian_address,
			 		phone		 :req.body.librarian_phone,
			 		academics     :req.body.librarian_academics,
			 		profession     :req.body.librarian_profession,
			 		user_role    :6,
			 		created_date :moment().format('YYYY-MM-DD:hh:mm:ss')
	 		}	

	 		admin.insert_all(table,librarian_data,function(err, result){
	 			var registration_id = result;

	 			var login_table  	       = {tablename:'tbl_userlogin'};
		 		var librarian_password    = sha1(req.body.librarian_password)
			 	
			 	var login_data   = {
			 			registration_id : registration_id,
			 			email           : req.body.librarian_email,
			 			password        : librarian_password,
			 			user_role       : 6

			 	}

			 	admin.insert_all(login_table,login_data,function(err, result){

				});

			});
	 	}


	 	var table_class = 'tbl_class';
	
		admin.findAll({table:table_class},function(err, result){
		    var class_list 	 = result;

		admin.findAll({table:'tbl_transport'},function(err,result){
			 transport_list  = result;

		admin.findAll({table:'tbl_dormitory'},function(err,result){
			 dormitory_list  = result;


			// var student_code = "";
		 //  	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		 //  	for (var i = 0; i < 5; i++)
		 //    student_code += possible.charAt(Math.floor(Math.random() * possible.length));
            admission_number=req.body.admission_number

			var pagedata = {title : "Welcome Admin", pagename : "admin/Registration", message : req.flash('msg'),class_list:class_list,transport_list :transport_list,dormitory_list:dormitory_list,admission_number:admission_number,studentdata:""};

			res.render("admin_layout", pagedata);
			 
	    });	 
	  });
	});
	   // return res.redirect('/Registration');

	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.get("/classsection_studentList", function(req, res)
{
	if(req.session.user_role==1){ 
		var year= req.session.session_year;
		var class_id =req.query.class_id
		var section_id =req.query.section_id
	    var table = {tbl_registration:'tbl_registration',tbl_enroll:'tbl_enroll'};
	    admin.getstudentlist(table,{class_id:class_id,section_id:section_id,session_year:year},function(err, result){
			   var student_list = result;
			   var table = {tablename:'tbl_registration'};
			   var n=0;
		 	   student_list.forEach(function(item, index){
		 	 	  student_list[index].parentname="";
		 	 	  student_list[index].parentphone="";
		 	 	  student_list[index].parentemail="";
		 	 	  student_list[index].nextyear="";
		 	   });
			   async.each(student_list, function (item, done) 
			   {
			 		 var registration_id   =  item['registration_id'];
			 		 var Table = {tablename : 'tbl_registration'}
					 admin.findWhere(Table,{registration_id:registration_id},function(err, result1){
				     var parents_list  = Object.values(JSON.parse(JSON.stringify(result1)))
				     student_list[n].parentphone=parents_list[0].phone;
				     student_list[n].parentname=parents_list[0].name;
				     student_list[n].parentemail=parents_list[0].email;
				     years = year.split("-");
				     student_list[n].nextyear = years[1] +'-'+ (parseInt(years[1])+1);
				     
				     done(null);
				     n++;
					});
				}, function(){
                      res.send({student_list:student_list});
			  });
		});
     }else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
	}
}); 
/* To get student without bonafied */
router.get("/All_studentList", function(req, res)
{
	if(req.session.user_role==1){ 
		var year= req.session.session_year;
		var class_id =req.query.class_id
		var section_id =req.query.section_id
	    var table = {tbl_registration:'tbl_registration',tbl_enroll:'tbl_enroll'};
	    admin.getallstudentlist(table,{class_id:class_id,section_id:section_id,session_year:year},function(err, result){
			   var student_list = result;
			   //console.log(student_list)
			   var table = {tablename:'tbl_registration'};
			   var n=0;
			  //console.log(student_list);
				 	 student_list.forEach(function(item, index){
				 	 	student_list[index].parentname="";
				 	 	student_list[index].parentphone="";
				 	 	student_list[index].parentemail="";
				 	 });
				 	 async.each(student_list, function (item, done) {

					 		var registration_id   =  item['registration_id'];
					 		var Table = {tablename : 'tbl_registration'}
							admin.findWhere(Table,{registration_id:registration_id},function(err, result1){
							     var parents_list  = Object.values(JSON.parse(JSON.stringify(result1)))
							     //console.log('##########',parents_list);
							     student_list[n].parentphone=parents_list[0].phone;
							     student_list[n].parentname=parents_list[0].name;
							     student_list[n].parentemail=parents_list[0].email;
							     done(null);
							     n++;
							});
					}, function(){
                      res.send({student_list:student_list});
					});
		});
     }else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
	}
}); 


/* Get Student Detail */
router.get("/get_studentDetail", function(req, res)
{
	if(req.session.user_role==1){ 
		var registration_id= req.query.registration_id;
		var year= req.session.session_year;
		var class_id =req.query.class_id
		var section_id =req.query.section_id
		var table = {tbl_registration:'tbl_registration',tbl_enroll:'tbl_enroll'};

		
		   admin.getstudentdetail(table,{registration_id:registration_id,class_id:class_id,section_id:section_id,session_year:year},function(err, result){
			   var student_list = result;
			    
			   var table = {tablename:'tbl_registration'};
			   var n=0;
			  //console.log(student_list);
				 	 student_list.forEach(function(item, index){
				 	 	student_list[index].parentname="";
				 	 	student_list[index].parentphone="";
				 	 	student_list[index].parentemail="";
				 	 	student_list[index].school_name="";
				 	 	student_list[index].school_logo="";
				 	 	student_list[index].school_rc_no="";
				 	 	student_list[index].school_address="";
				 	 	student_list[index].school_contact="";
				 	 	student_list[index].school_session_year="";


				 	 });
				 	 async.each(student_list, function (item, done) {

					 		var registration_id   =  item['registration_id'];
					 		var Table = {tablename : 'tbl_registration'}
							admin.findWhere(Table,{registration_id:registration_id},function(err, result1){
							     var parents_list  = Object.values(JSON.parse(JSON.stringify(result1)))
							     
							     student_list[n].parentphone=parents_list[0].phone;
							     student_list[n].parentname=parents_list[0].name;
							     student_list[n].parentemail=parents_list[0].email;
 
                                admin.findAll({table:'tbl_setting'}, function(err,result){
       	                          
       	                             setting= result;
       	                             console.log(setting);
       	                             student_list[n].school_name=setting[0].school_name;
							 	 	 student_list[n].school_logo=setting[0].logo;
							 	 	 student_list[n].school_rc_no=setting[0].school_rc_no;
							 	 	 student_list[n].school_address=setting[0].school_address;
							 	 	 student_list[n].school_contact=setting[0].school_contact;
							 	 	 student_list[n].school_session_year= setting[0].session_year;

							        done(null);
							        n++;
							     });
							});
					}, function(){
						 console.log('-------Student Detail-------',student_list);
                      res.send({student_list:student_list});
					});
		});
	 
     }else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
	}
}); 

/* Get Bonafied Student Detail */
router.get("/get_bonafidestudentDetail", function(req, res)
{
	if(req.session.user_role==1){ 
		var registration_id= req.query.registration_id;
		var year= req.session.session_year;
		var class_id =req.query.class_id
		var section_id =req.query.section_id
		var table = {tbl_registration:'tbl_registration',tbl_enroll:'tbl_enroll',tbl_class:'tbl_class'};

		
		   admin.getbonafieddetail(table,{registration_id:registration_id,class_id:class_id,section_id:section_id,session_year:year},function(err, result){
			   var student_list = result;
			  	
			    
			   var table = {tablename:'tbl_registration'};
			   var n=0;
			  console.log(student_list);
				 	 student_list.forEach(function(item, index){
				 	 	student_list[index].parentname="";
				 	 	//student_list[index].parentphone="";
				 	 	student_list[index].parentemail="";
				 	 	student_list[index].school_name="";
				 	 	student_list[index].school_logo="";
				 	 	student_list[index].school_rc_no="";
				 	 	student_list[index].school_address="";
				 	 	student_list[index].school_contact="";
				 	 	student_list[index].school_session_year="";


				 	 });
				 	 async.each(student_list, function (item, done) {

					 		var registration_id   =  item['parent_id'];
					 		var Table = {tablename : 'tbl_registration'}
							admin.findWhere(Table,{registration_id:registration_id},function(err, result1){
							     var parents_list  = Object.values(JSON.parse(JSON.stringify(result1)))
							     
							     //student_list[n].parentphone=parents_list[0].phone;
							     student_list[n].parentname=parents_list[0].name;
							     student_list[n].parentemail=parents_list[0].email;
 
                                admin.findAll({table:'tbl_setting'}, function(err,result){
       	                          
       	                             setting= result;
       	                             console.log(setting);
       	                             student_list[n].school_name=setting[0].school_name;
							 	 	 student_list[n].school_logo=setting[0].logo;
							 	 	 student_list[n].school_rc_no=setting[0].school_rc_no;
							 	 	 student_list[n].school_address=setting[0].school_address;
							 	 	 student_list[n].school_contact=setting[0].school_contact;
							 	 	 student_list[n].school_session_year= setting[0].session_year;

							        done(null);
							        n++;
							     });
							});
					}, function(){
						 console.log('-------Student Detail-------',student_list);
                      res.send({student_list:student_list});
					});
		});
	 
     }else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
	}
}); 


/* Shift student to New Section on first page load */
router.get("/Shiftsection", function(req, res){ 

    if(req.session.user_role==1)
    {
        admin.findAll({table:'tbl_class'},function(err, result){
             var class_list      = result;
             var pagedata      = {title : "Welcome Admin", pagename : "admin/student_shift",success: req.flash('success'),error: req.flash('error'),class_list:class_list};
             res.render("admin_layout", pagedata); 
        });

    }
     else{
            res.render('admin/index',{error : req.flash('msg')});
    }
});

router.post("/Shiftsection", function(req, res)
{ 

    if(req.session.user_role==1)
    {
        object=req.body;  
        if(object.hasOwnProperty("enroll_id")) 
        {
         if(req.body.enroll_id.length>0)
	      {
            var enroll_list = req.body.enroll_id;
	      	//var obj= { class_name : name,class_abbreviations:numeric_value}
	      	var obj={section_id:req.body.section_id_stop2}
	      	var tableobj = {tablename:'tbl_enroll'};
            var n=0;  
            async.each(enroll_list, function (item, done) {
               var where= {enroll_id:enroll_list[n]}
               admin.updateWhere(tableobj,where,obj, function(err, result){
		           if(result)
		           {	 
		           	  class_list='';
		              
 				   }

		        });
   
                done(null);
				n++;
            }, function(){
            	 req.flash('success',"Student shifted into new section successfully");
                 res.redirect('/Shiftsection');
            });

		  }
        }
        else
        {
        	req.flash('error',"No student selected");
            res.redirect('/Shiftsection');
        } 
    }

});

/* **************  */

/* Promotions of student in new year */
router.get("/classsection_promotion", function(req, res)
{
	if(req.session.user_role==1)
	{ 
		var year= req.session.session_year;
		var class_id =req.query.class_id
		var section_id =req.query.section_id

	    var table = {tbl_registration:'tbl_registration',tbl_enroll:'tbl_enroll'};
	    admin.getstudentlist(table,{class_id:class_id,section_id:section_id,session_year:year},function(err, result){
		   var student_list = result;
		   var table = {tablename:'tbl_registration'};

		   var n=0;
	 	   student_list.forEach(function(item, index){
	 	 	  student_list[index].parentname="";
	 	 	  student_list[index].parentphone="";
	 	 	  student_list[index].parentemail="";
	 	 	  student_list[index].nextyear="";
	 	   });

	 	   //student_list[0].nextyear = years[1] +'-'+ (parseInt(years[1])+1);
		 
		 	    
			   async.each(student_list, function (item, done) 
			   {

			   	     
			 		 var registration_id   =  item['registration_id'];
			 		 var Table = {tablename : 'tbl_registration'}
					 admin.findWhere(Table,{registration_id:registration_id},function(err, result1){
				     var parents_list  = Object.values(JSON.parse(JSON.stringify(result1)))
				     student_list[n].parentphone=parents_list[0].phone;
				     student_list[n].parentname=parents_list[0].name;
				     student_list[n].parentemail=parents_list[0].email;
				     years = year.split("-");
				     student_list[n].nextyear = years[1] +'-'+ (parseInt(years[1])+1);
				     
				     done(null);
				     n++;
					});
					 


				}, function(){
                      res.send({student_list:student_list});
			  });
			    
		});
     }else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
	}
});

router.get("/promotion",function(req,res){
   if(req.session.user_role==1){

   	var table  = 'tbl_class';
	
		admin.findAll({table:table},function(err, result){
			class_list = result;
			 year=req.session.session_year
			 years = year.split("-");
			 nextyear = years[1] +'-'+ (parseInt(years[1])+1);
			session_year= {year:year,nextyear:nextyear}
		  var pagedata = {title : "Welcome Admin", pagename : "admin/promotion", success: req.flash('success'),error: req.flash('error'),class_list:class_list,session_year:session_year};
	    res.render("admin_layout", pagedata);
		});

   }
   else{
	        admin.select(function(err,result){
		    res.render('admin/index',{error : req.flash('msg')});
		 	});
	}
});
router.post("/promotion", function(req, res){
	if(req.session.user_role==1)
	{


        object=req.body;  
        if(object.hasOwnProperty("chk_enroll_id")) 
        {
         if(req.body.chk_enroll_id.length>0)
	      {
				var class_id  			= req.body.teacher_class_id;
				var section_id  			= req.body.teacher_section_id;
				var students =  req.body.chk_enroll_id;
		        var sessions = req.body.session_year;
		        data={};
		        var key = 'toupdate';
		        data[key] = []; // empty Array, which you can push() values into
		        if(Array.isArray(students))
		        {
		          for(i=0;i<students.length;i++)
					{
						str ={enroll_id:students[i],class_id:class_id,section_id:section_id ,session_year:sessions[i]};
			            data[key].push(str); 			
					}	
		        }
		        else
		        {
		        	str ={enroll_id:students,class_id:class_id,section_id:section_id ,session_year:sessions};
			        data[key].push(str); 	
		        }
		        
				 
				data= data.toupdate;
                 
		        n=0;
				async.each(data, function (item, done) {
					var tableobj = {tablename:'tbl_enroll'}; 
					var where= {enroll_id:data[n].enroll_id};
					
					admin.updateWhere(tableobj,where,data[n], function(err, result){
						 done(null);
					});
					 n++; 
		 		}, function(){
		 			req.flash('success',"Student promoted successfully");
		 		       res.redirect('/promotion');
		                     //res.send({student_bonafide: JSON.parse(JSON.stringify(student_list[0])) });
				});
	      }
	    }
	    else
        {
            req.flash('error',"No student selected");
            res.redirect('/promotion');
        } 

		
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

/* ************** */


router.get("/Registration", function(req, res){
	//var class_list = '';
	if(req.session.user_role==1)
		{

         if(req.query.registration_id)
	     {
	     	
          
           admission_number = req.body.admission_number 
		
				var table  = 'tbl_class';
				
				admin.findAll({table:table},function(err, result){
				    var class_list 	 = result;

					admin.findAll({table:'tbl_transport'},function(err,result){
						 transport_list  = result;

							admin.findAll({table:'tbl_dormitory'},function(err,result){
								 dormitory_list  = result;

                               table={tablename:'tbl_registration'};
	     	                   var findObj = {registration_id:req.query.registration_id}
	     	                   
	     	                   admin.findWhere(table,findObj,function(err,result){
				             	studentdata = result;

					            if(result)
					            {

					              var n=0;
					              studentdata.forEach(function(item, index){
								 		studentdata[index].parent_name="";
								 		studentdata[index].parent_address="";
								 		studentdata[index].parent_number="";
								 		studentdata[index].parent_email="";
								 		studentdata[index].parent_profession=""
								 		studentdata[index].section_name=""
								 		studentdata[index].class_name=""
								 		studentdata[index].class_id=""
								 		studentdata[index].section_id=""

								 	});

					              var findObj = {registration_id:result[0].parent_id}
								  admin.findWhere(table,findObj,function(err,result1){
				                        studentdata[0].parent_name= result1[0].name
								 		studentdata[0].parent_address= result1[0].address
								 		studentdata[0].parent_number=result1[0].phone;
								 		studentdata[0].parent_email=result1[0].email;
								 	    studentdata[0].parent_profession=result1[0].profession;
								 	    //admin.findWhere({tablename:'tbl_section'},{section_id:studentdata[0].section_id},function(err,result2){  
								 	    admin.getenrollstudentdetail({tbl_enroll:'tbl_enroll',tbl_class:'tbl_class',tbl_section:'tbl_section'},{registration_id:studentdata[0].registration_id},function(err,result2){
                                          studentdata[0].section_name= result2[0].section_name;
                                          studentdata[0].class_name= result2[0].class_name;
                                          studentdata[0].class_id= result2[0].class_id;
                                          studentdata[0].section_id= result2[0].section_id;
                                          //console.log(studentdata[0]);
								 	    var pagedata = {title : "Welcome Admin", pagename : "admin/Registration", message : req.flash('msg'),class_list:class_list,transport_list :transport_list,dormitory_list:dormitory_list,admission_number:admission_number,studentdata:JSON.parse(JSON.stringify(studentdata[0]))};
                                        res.render("admin_layout", pagedata);
				                       });
				                  });
					            }
					           });
						    });	 
					});
				});
		     }
		     else			
		     {
		     	admission_number = req.body.admission_number 
		
				var table  = 'tbl_class';
				
				admin.findAll({table:table},function(err, result){
				    var class_list 	 = result;

					admin.findAll({table:'tbl_transport'},function(err,result){

						 transport_list  = result;

							admin.findAll({table:'tbl_dormitory'},function(err,result){
								 dormitory_list  = result;

								 var pagedata = {title : "Welcome Admin", pagename : "admin/Registration", message : req.flash('msg'),class_list:class_list,transport_list :transport_list,dormitory_list:dormitory_list,admission_number:admission_number,studentdata:""};

								 res.render("admin_layout", pagedata);
								 
						    });	 
						   console.log(transport_list);
					});
				});
		     }
		  }else{
		        admin.select(function(err,result){
		     
			    res.render('admin/index',{error : req.flash('msg')});
				  
			 	});
		}
});

/* Bonafide Student */

router.get("/bonafide",function(req,res){

  if(req.session.user_role==1)
	{
	  if(req.query.registration_id)
	  {
	  	 
        var year= req.session.session_year;
		var class_id =  req.query.class_id;
		var section_id = req.query.section_id;
	    var table = {tbl_registration:'tbl_registration',tbl_enroll:'tbl_enroll'};
	    admin.getallstudentlist(table,{registration_id:req.query.registration_id,class_id:class_id,section_id:section_id,session_year:year},function(err, result){
			    var student_list = result;
			    //console.log(student_list);
			    var table = {tablename:'tbl_registration'};
			    var n=0;
			 	 student_list.forEach(function(item, index){
			 	 	student_list[index].parentname="";
			 	 	student_list[index].parentphone="";
			 	 	student_list[index].parentemail="";
			 	 });
				 	 async.each(student_list, function (item, done) {

					 		var registration_id   =  item['registration_id'];
					 		var Table = {tablename : 'tbl_registration'}
							admin.findWhere(Table,{registration_id:registration_id},function(err, result1){
							     var parents_list  = Object.values(JSON.parse(JSON.stringify(result1)))
							     //console.log('##########',parents_list);
							     student_list[n].parentphone=parents_list[0].phone;
							     student_list[n].parentname=parents_list[0].name;
							     student_list[n].parentemail=parents_list[0].email;
							     done(null);
							     n++;
							});
					}, function(){
                      res.send({student_bonafide: JSON.parse(JSON.stringify(student_list[0])) });
					});
		});  
	  }
	  else
	  {
        findObj={class_id:req.query.id}
  	    tableobj={tablename:'tbl_class'}
  	    admin.findAll({table:'tbl_class'},function(err, result){
          var class_list      = result;
          var pagedata      = {title : "Welcome Admin", pagename : "admin/student_bonafide",  success: req.flash('success'),error: req.flash('error'),class_list:class_list};
          res.render("admin_layout", pagedata);
  	    });
	  } 	
	   
	}
	else
	{
        admin.select(function(err,result){
           res.render('admin/index',{error : req.flash('msg')});
		});
	}
 
});

router.post("/bonafide", function(req, res)
{ 
    if(req.session.user_role==1)
    {
        object=req.body;


        if(object.hasOwnProperty("enroll_id")) 
        {
         if(req.body.enroll_id.length>0)
	      {

            var enroll_list = req.body.enroll_id;
	      	var moment = require('moment');
	        var bonafide_date = moment().format('YYYY-MM-DD:hh:mm:ss');
	      	var obj = {bonafide_status:1,bonafide_date:bonafide_date}

	      	var tableobj = {tablename:'tbl_enroll'};
            var n=0;  
            
            var check = Array.isArray(enroll_list);
            if(check)
            {
               async.each(enroll_list, function (item, done) {
               var where= {enroll_id:enroll_list[n]}
	               admin.updateWhere(tableobj,where,obj, function(err, result){
			           if(result)
			           {	 
			           	  class_list='';
			              
	 				   }

			        });
	   
	                done(null);
					n++;
	            }, function(){
	            	 req.flash('success',"Student bonafide successfully");
	                 res.redirect('/bonafide');
	            });
            }
            else
            {
               var where= {enroll_id:enroll_list}
               admin.updateWhere(tableobj,where,obj, function(err, result){
		         req.flash('success',"Student bonafide successfully");
                 res.redirect('/bonafide');
		       });
            }
            

		  }
        }
        else
        {  
  			req.flash('error',"No student selected");
            res.redirect('/bonafide');
        } 
    }

});

router.get("/bonafideList", function(req, res){
	if(req.session.user_role==1){
	 var table = 'tbl_enroll'
			 admin.findAll({table:table},function(err, result){
			 	var transport_list = result;
			 	var pagedata = {title : "Welcome Admin", pagename : "admin/transport_list", message : req.flash('msg'),transport_list :transport_list};
	                 res.render("admin_layout", pagedata);

			 });
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

/************/

router.get("/class", function(req, res){
 
	if(req.session.user_role==1)
	{
  	  if(req.query.id)
	  {
  	  	 findObj={class_id:req.query.id}
	  	 tableobj={tablename:'tbl_class'}
         admin.findWhere(tableobj,findObj,function(err,result){
          
          $data=JSON.parse(JSON.stringify(result));
          var pagedata = {title : "Welcome Admin", pagename : "admin/class", success: req.flash('success'),error: req.flash('error'),classdata:$data[0],class_list:''};   	
          res.render("admin_layout", pagedata)
         });
	  }
	  else
	  {
	  	var table = 'tbl_class'
		admin.findAll({table:table},function(err, result){
			var class_list = result;
			var pagedata = {title : "Welcome Admin", pagename : "admin/class", success: req.flash('success'),error: req.flash('error'),class_list :class_list,classdata:''};
		    res.render("admin_layout", pagedata);

		});
	  	// var pagedata = {title : "Welcome Admin", pagename : "admin/class", message : req.flash('msg'),classdata:''};
	  	// res.render("admin_layout", pagedata)
	  }	
	  
	}
	else
	{
        admin.select(function(err,result){
           res.render('admin/index',{error: req.flash('error')});
		});
	}


});

router.post("/delete", function(req, res){
    var key = Object.keys(req.body);
 	if(req.session.user_role==1)
	{
	 var findObj = {};
     name = req.body.columname;
     findObj[name] =  req.body.id;
     var tableobj = {tablename:req.body.tablename};
     admin.deletewhere(tableobj,findObj,function(err,result){
     	res.send(JSON.stringify(result));
     });
     // admin.findWhere(tableobj,findObj, function(err, result){
    	// result=JSON.parse(JSON.stringify(result[0]));
     //  var pagedata = {title : "Welcome Admin", pagename : "admin/class", message : req.flash('msg'),classdata:result};

     //     res.render("admin_layout", pagedata);

     // });
    }
    else
    {
	        //admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	//});
	}

    

	// if(req.session.user_role==1)
	// 	{
	// var pagedata = {title : "Welcome Admin", pagename : "admin/class", message : req.flash('msg')};

	// res.render("admin_layout", pagedata);
	// }else{
	//         admin.select(function(err,result){
	     
	// 	    res.render('admin/index',{error : req.flash('msg')});
			  
	// 	 	});
	// }


});



router.post("/Class", function(req, res){
 	if(req.session.user_role==1)
	{
	  var name          = req.body.name;
	  var numeric_value = req.body.class_abbreviations;//parseInt(req.body.numeric_Value);
	  var moment = require('moment');
	  var created_at = moment().format('YYYY-MM-DD:hh:mm:ss');
	  if(req.body.class_id)
      {
      	var obj= { class_name : name,class_abbreviations:numeric_value}
      	var where= {class_id:req.body.class_id}
      	var tableobj = {tablename:'tbl_class'};
        admin.updateWhere(tableobj,where,obj, function(err, result){
         if(result)
         {	
           var table = 'tbl_class'
				 admin.findAll({table:table},function(err, result){
				 	var class_list = result;
				 	req.flash('success','Record updated successfully')
				 	var pagedata = {title : "Welcome Admin", pagename : "admin/class_list", success : req.flash('success'), error : req.flash('error'),class_list :class_list};
		                 res.render("admin_layout", pagedata);
				 });   
		  }
        });

	  }
	  else
	  {
	  	$data={class_name:name};
	  	admin.findWhere({tablename:'tbl_class'},{class_name : name},function(err, result){
	  	 if(result.length>0)
	  	 {
	  	   //console.log('already exist')
           req.flash('error','Class already exist')
           
           var  pagedata = {title : "Welcome Admin", pagename : "admin/class", success : req.flash('success'), error : req.flash('error'),classdata:$data,class_list:''};   	
                 res.render("admin_layout", pagedata);
          	  			
	  	 }
	  	 else
	  	 {
   
            admin.insert_class({ class_name : name,class_abbreviations:numeric_value,created_at :created_at}, function(err, result){
			 if(result)
				{
					//var data = JSON.parse(JSON.stringify(result[0]));
					 console.log(result);
					 var table = 'tbl_class'
					 admin.findAll({table:table},function(err, result){
					 	var class_list = result;
					 	req.flash('success','Class added successfully')
					 	var pagedata = {title : "Welcome Admin", pagename : "admin/class", success : req.flash('success'), error : req.flash('error'),classdata:"",class_list :class_list};
			                 res.render("admin_layout", pagedata);

					 });
					
				}
				else
				{
					console.log('This username is incorrect');
					req.flash("msg", "This username and password is incorrect");
					res.redirect("/");
				}
		      });

	  	 }
 		});
  	  }
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.get("/classList", function(req, res){
	if(req.session.user_role==1)
		{
	var table = 'tbl_class'
	admin.findAll({table:table},function(err, result){
		var class_list = result;
		var pagedata = {title : "Welcome Admin", pagename : "admin/class_list", success : req.flash('success'), error : req.flash('error'),class_list :class_list};
	    res.render("admin_layout", pagedata);

	});
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});


router.get("/section", function(req, res){
	if(req.session.user_role==1)
		{
	     var table 	   = 'tbl_class';
	     var tableobj  = {tablename:'tbl_section'}
	     
	     	
	        
                
			admin.findAll({table:table},function(err, result){
              var class_list = result;
              console.log(req.query.id);
              var findObj = {section_id:req.query.id}
              if(req.query.id)
              {
               admin.findWhere(tableobj,findObj,function(err,result1){
                if(result1)
                 {
                 	data =JSON.parse(JSON.stringify(result1)); 
                    console.log('ddd') ;
                    console.log(data[0]);
				    var pagedata = {title : "Welcome Admin", pagename : "admin/section", success : req.flash('success'), error : req.flash('error'),class_list:class_list,section_data:data[0],section_list:''};
				    res.render("admin_layout", pagedata);
                 }

 			    });
              }
              else
              {

              	var table = 'tbl_section'
			    admin.findAllSection({table:table},function(err, result){
					 	var section_list = result;
					 	var pagedata = {title : "Welcome Admin", pagename : "admin/section",success : req.flash('success'), error : req.flash('error'),section_list :section_list,class_list:class_list,section_data:''};
			                 res.render("admin_layout", pagedata);

			    });
          //       var pagedata = {title : "Welcome Admin", pagename : "admin/section", message : req.flash('msg'),class_list:class_list,section_data:''};
		        // res.render("admin_layout", pagedata);	
              }
              
		
			});
         
	 }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
	

});

router.post("/section", function(req, res){
 	if(req.session.user_role==1)
		{
		var class_id          = req.body.class_id;
	    var section_name  	  = req.body.section_name;
		if(req.body.section_id) 
		{
	      var obj= { class_id : class_id,section_name:section_name}
	      var where= {section_id:req.body.section_id}
	      var tableobj = {tablename:'tbl_section'};
	      admin.updateWhere(tableobj,where,obj, function(err, result){  
	      	
	      	 if(result)
             {	
             	req.flash('error','Section updated successfully')
                res.redirect('/section');
             }
	      });
 		}
		else
		{
        
	  	 admin.findWhere({tablename:'tbl_section'},{class_id : class_id,section_name:section_name},function(err, result){
	  	 if(result.length>0)
	  	 {
	  	    req.flash('error','Section already exist')
            section_data={
                              class_id:class_id,
                              section_name:section_name
                         }
             var table = 'tbl_section'
			    admin.findAllSection({table:table},function(err, result){
					 	var section_list = result;
					 	var pagedata = {title : "Welcome Admin", pagename : "admin/section_list",success : req.flash('success'), error : req.flash('error'),section_list :section_list};
			                 res.render("admin_layout", pagedata);

			    });
         }
         else
         {
            

			  admin.insert_section({ class_id : class_id,section_name:section_name}, function(err, result){
		     	if(result)
				{
					//var data = JSON.parse(JSON.stringify(result[0]));
					 //console.log(result);
					 var table = 'tbl_section'
					 admin.findAllSection({table:table},function(err, result){
					 	var section_list = result;
					 	req.flash('success','Section added successfully')
					 	var pagedata = {title : "Welcome Admin", pagename : "admin/section_list", success : req.flash('success'), error : req.flash('error'),section_list :section_list};
			                 res.render("admin_layout", pagedata);

					 });
					
				}
				else
				{
					console.log('This username is incorrect');
					req.flash("msg", "This username and password is incorrect");
					res.redirect("/");
				}
			 });
		 } 
         
         });
	    }
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.get("/sectionList", function(req, res){
	if(req.session.user_role==1)
		{
	 var table = 'tbl_section'
	    admin.findAllSection({table:table},function(err, result){
			 	var section_list = result;
			 	var pagedata = {title : "Welcome Admin", pagename : "admin/section_list", success : req.flash('success'), error : req.flash('error'),section_list :section_list};
	                 res.render("admin_layout", pagedata);

	    });
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.get("/transport", function(req, res){
	if(req.session.user_role==1){
         
         
        var tableobj  = {tablename:'tbl_transport'}
	    if(req.query.id)
	     {
           var findObj = {transport_id:req.query.id}
           admin.findWhere(tableobj,findObj,function(err,result){
           if(result)
           {
              var $data =JSON.parse(JSON.stringify(result)); 
              console.log($data[0]);
              var pagedata = {title : "Welcome Admin", pagename : "admin/transport", success: req.flash('success'),error: req.flash('error'),transportdata:$data[0],transport_list:''};
		      res.render("admin_layout", pagedata);
           }
           });
	     }
	     else
	     {
	     	var table = 'tbl_transport'
	     	admin.findAll({table:table},function(err, result){
			 	var transport_list = result;
			 	var pagedata = {title : "Welcome Admin", pagename : "admin/transport",success: req.flash('success'),error: req.flash('error'),transport_list :transport_list,transportdata:''};
	                 res.render("admin_layout", pagedata);

			 });
	    //    var pagedata = {title : "Welcome Admin", pagename : "admin/transport", message : req.flash('msg'),transportdata:''};
		   // res.render("admin_layout", pagedata);	
	     }

	     
		 
    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});


router.post("/transport", function(req, res){
 	if(req.session.user_role==1){
	var route_name          = req.body.route_name;
	var number_of_vehicle  	= req.body.number_of_vehicle;
 	var description 		= req.body.descriptions;
 	var route_fare          = req.body.route_fare;
	var obj= { route_name : route_name,number_of_vehicle:number_of_vehicle,description :description,route_fare:route_fare}
    
    if(req.body.transport_id)
     {
          var where= {transport_id:req.body.transport_id}
	      var tableobj = {tablename:'tbl_transport'};
	      admin.updateWhere(tableobj,where,obj, function(err, result){  

	      	if(result)
	      	{
                req.flash('success',"Transport route updated successfully"); 
	      		res.redirect("/transport");
	      	}

	      });
     }
     else	
     {

          	admin.findWhere({tablename:'tbl_transport'},{ route_name : route_name,number_of_vehicle:number_of_vehicle},function(err, result){
		  	 if(result.length>0)
		  	 {
		  	   //console.log('already exist')
		  	
	           var table = 'tbl_transport'
	     	   admin.findAll({table:table},function(err, result){
                     transportdata= {
                             route_name:route_name,
                             number_of_vehicle:number_of_vehicle,
                             description:description,
                             route_fare:route_fare
	  	                  }
	           
			 	 var transport_list = result;
			 	 req.flash('error','Transport route already exist');
	             var pagedata = {title : "Welcome Admin", pagename : "admin/transport",success: req.flash('success'),error: req.flash('error'),transport_list :transport_list,transportdata:transportdata};
	             res.render("admin_layout", pagedata);
	             
	     	    }); 

		  	 }
	  	 	 else
	  	 	 {
	  	 		admin.insert_transport(obj, function(err, result){
			        if(result)
					{
						//var data = JSON.parse(JSON.stringify(result[0]));
						//console.log(result);
						var table = 'tbl_transport'
						admin.findAll({table:table},function(err, result){
						 	var transport_list = result;
		                    req.flash('success',"Transport route added successfully");  
						 	var pagedata = {title : "Welcome Admin", pagename : "admin/transport", success: req.flash('success'),error: req.flash('error'),transport_list :transport_list,transportdata:''};
				                 res.render("admin_layout", pagedata);

						 });
					}
					else
					{
						console.log('This username is incorrect');
						req.flash("msg", "This username and password is incorrect");
						res.redirect("/");
					}
				});
	  	 	 }
	  	 });
	 }
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.get("/transportList", function(req, res){
	if(req.session.user_role==1){
	 var table = 'tbl_transport'
			 admin.findAll({table:table},function(err, result){
			 	var transport_list = result;
			 	var pagedata = {title : "Welcome Admin", pagename : "admin/transport_list",success: req.flash('success'),error: req.flash('error'),transport_list :transport_list};
	                 res.render("admin_layout", pagedata);

			 });
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});


router.get("/dormitory", function(req, res){
	if(req.session.user_role==1){


	    var tableobj  = {tablename:'tbl_dormitory'}
		if(req.query.id)
	    {
           var findObj = {dormitory_id:req.query.id}
           admin.findWhere(tableobj,findObj,function(err,result){
           if(result)
           {
              var $data =JSON.parse(JSON.stringify(result)); 
              console.log($data[0]);
              var pagedata = {title : "Welcome Admin", pagename : "admin/dormitory", message : req.flash('msg'),dormitoryData:$data[0],dormitory_list:''};
		      res.render("admin_layout", pagedata);
           }
           });
	    }
	    else{
	    	var table = 'tbl_dormitory'
			 admin.findAll({table:table},function(err, result){
			 	var dormitory_list = result;
			 	var pagedata = {title : "Welcome Admin", pagename : "admin/dormitory", message : req.flash('msg'),dormitoryData:'',dormitory_list :dormitory_list};
	                 res.render("admin_layout", pagedata);

			 });
		}
		 // var pagedata = {title : "Welcome Admin", pagename : "admin/dormitory", message : req.flash('msg')};
		 // res.render("admin_layout", pagedata);
    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});


router.post("/addDormitory", function(req, res){
  if(req.session.user_role==1){
	var name          		= req.body.name;
	var number_of_room  	= req.body.number_of_room;
 	var description 		= req.body.descriptions;
 	var moment 				= require('moment');
	var created_at 			= moment().format('YYYY-MM-DD:hh:mm:ss');
	var dormitory_id  		= req.body.dormitory_id;
		if(req.body.dormitory_id)
     	{
     	  var obj = { name : name,number_of_room:number_of_room,description :description}
          var where= {dormitory_id:req.body.dormitory_id}
	      var tableobj = {tablename:'tbl_dormitory'};
	      admin.updateWhere(tableobj,where,obj, function(err, result){  

	      	if(result)
	      	{
	      		res.redirect("/dormitoryList");
	      	}

	      });
     	}else{
			admin.insert_dormitory({ name : name,number_of_room:number_of_room,description :description,created_at:created_at}, function(err, result){
		        console.log(result);
				if(result)
				{
					//var data = JSON.parse(JSON.stringify(result[0]));
					 console.log(result);
					 var table = 'tbl_dormitory'
					 admin.findAll({table:table},function(err, result){
					 	var dormitory_list = result;
					 	var pagedata = {title : "Welcome Admin", pagename : "admin/dormitory_list", message : req.flash('msg'),dormitory_list :dormitory_list};
			                 res.render("admin_layout", pagedata);

					 });
					
				}
				else
				{
					console.log('This username is incorrect');
					req.flash("msg", "This username and password is incorrect");
					res.redirect("/");
				}
			});
		}
     }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.get("/dormitoryList", function(req, res){
	if(req.session.user_role==1){
	 		 var table = 'tbl_dormitory'
			 admin.findAll({table:table},function(err, result){
			 	var dormitory_list = result;
			 	var pagedata = {title : "Welcome Admin", pagename : "admin/dormitory_list", message : req.flash('msg'),dormitory_list :dormitory_list};
	                 res.render("admin_layout", pagedata);

			 });
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.get("/getSection", function(req, res){
	if(req.session.user_role==1){
		var class_id =req.query.class_id
	    var table = {tablename:'tbl_section'};
			admin.findWhere(table,{class_id:class_id},function(err, result){
			 	var section_list = result;
			 	
			 	res.send({section_list:section_list});

				
			 	//res.send('Gaurav');
			});
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.get("/getSubject", function(req, res){
	if(req.session.user_role==1){
		var class_id 	= req.query.class_id
		var section_id  = req.query.section_id

		// console.log(class_id)
		// console.log(section_id)
	    var table = {tablename:'tbl_subject'};
			admin.findWhere(table,{class_id:class_id},function(err, result){
			 	var subject_list = result;
			 	
			 	res.send({subject_list:subject_list});

				
			 	//res.send('Gaurav');
			});
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.get("/logout", function(req, res){
		req.session.destroy();
		res.redirect("/");	
});



router.get("/studentList", function(req, res){
	if(req.session.user_role==1){
		var class_id =req.query.class_id
	    var table = {tablename:'tbl_registration'};
        admin.findAll({table:'tbl_class'},function(err, result){
		    var class_list 	 = result;
			 admin.findWhere(table,{user_role:'3'},function(err, result){
			 	var student_list = result;
			 	var pagedata 	 = {title : "Welcome Admin", pagename : "admin/student_list", message : req.flash('msg'),student_list :student_list,class_list:class_list};
	            res.render("admin_layout", pagedata);


			});
		});	 
	}else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
	}
});

router.get("/teacherList", function(req, res){
	if(req.session.user_role==1){
		
		var class_id =req.query.class_id
	    var table = {tablename:'tbl_registration'};
	    //console.log(table);
			 admin.findWhere(table,{user_role:'4'},function(err, result){
			 	var teacher_list = result;
			 	var pagedata 	 = {title : "Welcome Admin", pagename : "admin/teacher_list", message : req.flash('msg'),teacher_list :teacher_list};
	            res.render("admin_layout", pagedata);
			});
	}else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
	}
});
router.get("/teacherDetail", function(req, res){
	if(req.session.user_role==1){
         
		var registration_id =req.query.registration_id
		console.log(registration_id);
	    var table = {tablename:'tbl_registration'};
	    //console.log(table);
			 admin.findWhere(table,{user_role:'4',registration_id:registration_id},function(err, result){
			 	var teacherdata = result;
			 /* 	 
			     teacherdata.forEach(function(item, index){
			 		teacherdata[index].email="";
			 		//teacherdata[index].parent_address="";
			 	});

			   admin.findWhere({tablename:'tbl_userlogin'},{user_role:'4',registration_id:registration_id},function(err, result1){	 
				    teacherdata[0].email= result1[0].email;    
				   console.log(teacherdata[0]);               
 			 	var pagedata 	 = {title : "Welcome Admin", pagename : "admin/teacheredit", message : req.flash('msg'),teacherdata :JSON.parse(JSON.stringify(teacherdata[0]))};
	            res.render("admin_layout", pagedata);
			  });
			   */
			   var pagedata 	 = {title : "Welcome Admin", pagename : "admin/teacheredit", message : req.flash('msg'),teacherdata :JSON.parse(JSON.stringify(teacherdata[0]))};
	            res.render("admin_layout", pagedata);
		  });	   
	}else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
		
	}
});
router.post("/teacherDetail", function(req, res){
    if(req.body.registration_id)
	     {
	         var obj= {   
	      	          aadhar_number:req.body.aadhar_number,
	      	          name :req.body.teacher_name,
	      	          dob:req.body.teacher_dob ,
	      	          sex:req.body.teacher_gender ,
	      	          address:req.body.teacher_address ,
	      	          phone:req.body.teacher_phone ,
	      	          profession: req.body.teacher_profession,
	      	          academics: req.body.academics,
	      	          show_website: req.body.show_website,
	      	          email: req.body.teacher_email

	      	        }
	      	    //console.log(obj); 
              var where= {registration_id:req.body.registration_id}
		      var tableobj = {tablename:'tbl_registration'};
		      admin.updateWhere(tableobj,where,obj, function(err, result){ 
                  /*		      	
		          var table = { tablename:'tbl_userlogin' }; 
                  var whereteacher= { registration_id:req.body.registration_id }
                  var objuser= {

		              email: req.body.teacher_email,
		      	      password: sha1(req.body.teacher_password)
		          }	  
                  admin.updateWhere(table,whereteacher,objuser, function(err, result){
                    console.log('teacher login Updated');     
			      		res.redirect("/TeacherList");
			      });
			      */
			      res.redirect("/TeacherList");
		      });
	     }

});


router.get("/accountantList", function(req, res){
	if(req.session.user_role==1){
		
		var class_id =req.query.class_id
	    var table = {tablename:'tbl_registration'};
	    console.log(table);
			 admin.findWhere(table,{user_role:'5'},function(err, result){
			 	var accountant_list = result;
			 	console.log(accountant_list);
			 	var pagedata 	 = {title : "Welcome Admin", pagename : "admin/accountant_list", message : req.flash('msg'),accountant_list :accountant_list};
	            res.render("admin_layout", pagedata);
			});
	}else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
		
	}
});
router.get("/accountantDetail", function(req, res){
	if(req.session.user_role==1){
         
		var registration_id =req.query.registration_id
		console.log(registration_id);
	    var table = {tablename:'tbl_registration'};
	    //console.log(table);
			 admin.findWhere(table,{user_role:'5',registration_id:registration_id},function(err, result){
			 	var accountantdata = result;
			 	/*
			 	 accountantdata.forEach(function(item, index){
			 		accountantdata[index].email="";
			 	});

			   admin.findWhere({tablename:'tbl_userlogin'},{user_role:'5',registration_id:registration_id},function(err, result1){	 
				    accountantdata[0].email= result1[0].email;    
				   console.log(accountantdata[0]);               
 			 	var pagedata 	 = {title : "Welcome Admin", pagename : "admin/accountantedit", message : req.flash('msg'),accountantdata :JSON.parse(JSON.stringify(accountantdata[0]))};
	            res.render("admin_layout", pagedata);
			  });
             */
			   var pagedata 	 = {title : "Welcome Admin", pagename : "admin/accountantedit", message : req.flash('msg'),accountantdata :JSON.parse(JSON.stringify(accountantdata[0]))};
	            res.render("admin_layout", pagedata);
		  });	   
	}else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
		
	}
});
router.post("/accountantDetail", function(req, res){
    if(req.body.registration_id)
	     {
	         var obj= {   
	      	           
	      	           name :req.body.accountant_name,
	      	           sex:req.body.accountant_gender ,
	      	           address:req.body.accountant_address ,
	      	           phone:req.body.accountant_phone ,
	      	           profession: req.body.accountant_profession,
	      	           academics: req.body.accountant_academics,
	      	           //show_website: req.body.show_website
	      	           email: req.body.accountant_email
	      	          }
	      	 
              var where= {registration_id:req.body.registration_id}
		      var tableobj = {tablename:'tbl_registration'};
		      admin.updateWhere(tableobj,where,obj, function(err, result){ 
		          
		          /*
		          var table = { tablename:'tbl_userlogin' }; 

                  var whereaccountant= { registration_id:req.body.registration_id }
                  var objuser= {

		              email: req.body.accountant_email,
		      	      password: sha1(req.body.accountant_password)
		          }	  
                  admin.updateWhere(table,whereaccountant,objuser, function(err, result){
                     
			      		res.redirect("/accountantList");
			      });
			      */
			      res.redirect("/accountantList");
		      });
	     }

});


router.get("/librarianList", function(req, res){
	if(req.session.user_role==1){
		
		var class_id =req.query.class_id
	    var table = {tablename:'tbl_registration'};
	    //console.log(table);
			 admin.findWhere(table,{user_role:'6'},function(err, result){
			 	var librarian_list = result;
			 	var pagedata 	 = {title : "Welcome Admin", pagename : "admin/librarian_list", message : req.flash('msg'),librarian_list :librarian_list};
	            res.render("admin_layout", pagedata);
			});
	}else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
		
	}
});
router.get("/librarianDetail", function(req, res){
	if(req.session.user_role==1){
         
		var registration_id =req.query.registration_id
		console.log(registration_id);
	    var table = {tablename:'tbl_registration'};
	    //console.log(table);
			 admin.findWhere(table,{user_role:'6',registration_id:registration_id},function(err, result){
			 	var librariandata = result;
			 	/*
			 	 accountantdata.forEach(function(item, index){
			 		accountantdata[index].email="";
			 	});

			   admin.findWhere({tablename:'tbl_userlogin'},{user_role:'5',registration_id:registration_id},function(err, result1){	 
				    accountantdata[0].email= result1[0].email;    
				   console.log(accountantdata[0]);               
 			 	var pagedata 	 = {title : "Welcome Admin", pagename : "admin/accountantedit", message : req.flash('msg'),accountantdata :JSON.parse(JSON.stringify(accountantdata[0]))};
	            res.render("admin_layout", pagedata);
			  });
             */
			   var pagedata 	 = {title : "Welcome Admin", pagename : "admin/librarianedit", message : req.flash('msg'),librariandata :JSON.parse(JSON.stringify(librariandata[0]))};
	            res.render("admin_layout", pagedata);
		  });	   
	}else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
		
	}
});
router.post("/librarianDetail", function(req, res){
    if(req.body.registration_id)
	     {
	         var obj= {   
	      	           
	      	           name :req.body.librarian_name,
	      	           sex:req.body.librarian_gender ,
	      	           address:req.body.librarian_address ,
	      	           phone:req.body.librarian_phone ,
	      	           profession: req.body.librarian_profession,
	      	           academics: req.body.librarian_academics,
	      	           //show_website: req.body.show_website
	      	           email: req.body.librarian_email
	      	          }
	      	 
              var where= {registration_id:req.body.registration_id}
		      var tableobj = {tablename:'tbl_registration'};
		      admin.updateWhere(tableobj,where,obj, function(err, result){ 
		          
		          /*
		          var table = { tablename:'tbl_userlogin' }; 

                  var whereaccountant= { registration_id:req.body.registration_id }
                  var objuser= {

		              email: req.body.accountant_email,
		      	      password: sha1(req.body.accountant_password)
		          }	  
                  admin.updateWhere(table,whereaccountant,objuser, function(err, result){
                     
			      		res.redirect("/accountantList");
			      });
			      */
			      res.redirect("/librarianList");
		      });
	     }

});

router.get("/Subject", function(req, res){
	if(req.session.user_role==1){
        

    var table  = 'tbl_class';
	admin.findAll({table:table},function(err, result){
	   var class_list 	 = result;
	   var table_subject = 'tbl_subject';
	   console.log(req.query.subject_id);   
        if(req.query.subject_id)
	     {
	         var subject_id=req.query.subject_id;
	          var where= {subject_id:req.query.subject_id}
		      var tableobj = {tablename:table_subject};
		      admin.findWhere(tableobj,{'subject_id': subject_id },function(err, result){
			 	  var subject_list 	 = JSON.parse(JSON.stringify(result[0]));
				  var pagedata 	 	 = {Title : "", pagename : "admin/subject", message : req.flash('msg'),subject_list:subject_list,class_list:class_list};
                  res.render("admin_layout", pagedata);
			    });	
	     }
     	 else 
     	 {
				 admin.findAllsubject({table:table_subject},function(err, result){
				    var subject_list 	 = result;
					var pagedata 	 	 = {Title : "", pagename : "admin/subject", message : req.flash('msg'),subject_list:subject_list,class_list:class_list};
					res.render("admin_layout", pagedata);
				});
     	 }  
	  });
    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});


router.post("/addSubject", function(req, res){
	if(req.session.user_role==1)
	{
		var table   = {tablename:'tbl_subject'};
	 	var data = {
			 		name         :req.body.subject_name,
			 		class_id     :req.body.class_id,	 		
			 		subject_type :req.body.subject_type,
			 		year         :req.session.session_year
		           }
		if(req.body.subject_id)
	     {
	          var where= {subject_id:req.body.subject_id}
		      admin.updateWhere(table,where,data, function(err, result){  
                 if(result)
		      	 {
		      		res.redirect("/subjectList");
		      	 }
		      });
	     }
     	else 
     	{
     	  admin.insert_all(table,data,function(err, result){
			var class_table  = 'tbl_class';
			var table_subject = 'tbl_subject';
	  		var table  = 'tbl_class';
	
			admin.findAll({table:table},function(err, result){
		    	var class_list 	 = result;
				 admin.findAllsubject({table:table_subject},function(err, result){
				    var subject_list 	 = result;
					var pagedata 	 	 = {Title : "", pagename : "admin/subject", message : req.flash('msg'),subject_list:subject_list,class_list:class_list};
					res.render("admin_layout", pagedata);
				});
			});
		  });	
     	}           
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
	

});

router.get("/classsection_subjectList", function(req, res){
	if(req.session.user_role==1){
	   var table = 'tbl_subject';
	   
		    var class_id =req.query.class_id;
            table='tbl_subject';
		    admin.findWhere({tablename:table},{'class_id': class_id },function(err, result){
			 	  var subject_list 	 = result;

			 	  //console.log(subject_list);
				  //var pagedata 	 	 = {Title : "", pagename : "admin/subject_list", message : req.flash('msg'),subject_list:subject_list,class_list:class_list};
				  res.send({subject_list: subject_list});
			});	
		    
			 
	   
	  
	}else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
		
	}
});

router.get("/subjectList", function(req, res){
	if(req.session.user_role==1){
	   var table = 'tbl_subject';
	   admin.findAll({table:'tbl_class'},function(err, result1){
		    var class_list 	 = result1;
		       table='tbl_subject';
		  admin.findAllsubject({table:table},function(err, result){
			 	console.log(result);
			    var subject_list 	 = result;
				var pagedata 	 	 = {Title : "", pagename : "admin/subject_list", message : req.flash('msg'),subject_list:subject_list,class_list:class_list};
				res.render("admin_layout", pagedata);
		   });	
		   
	    });
	  
	}else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
		
	}
});

router.get("/AssignTeacher", function(req, res){
	if(req.session.user_role==1){
		var table  = 'tbl_class';
	    

		admin.findAll({table:table},function(err, result){
		    var class_list 	 = result;
		    var table_teacher = {tablename:'tbl_registration'};
			
			admin.findWhere(table_teacher,{user_role:4},function(err, result){
				var teacher  = result;
				var table = 'tbl_teacherassignment';
          
			 if(req.query.id)
		     {
		          var id=req.query.id;
		          //var where= {id:req.query.id}
			      var tableobj = {table:table};
			      admin.assignedtaeacherdetail(tableobj,{'id': id },function(err, result){
				 	  var assign_list 	 = JSON.parse(JSON.stringify(result));

              		  assign_list= {}
				 	  assigned_id=req.query.id;
					  var pagedata 	 	 = {Title : "", pagename : "admin/assignTeacher", message : req.flash('msg'),assign_list:assign_list,class_list:class_list,teacher:teacher,assigned_id:assigned_id};

					  res.render("admin_layout", pagedata);
				    });	
		     }
	     	 else 
	     	 {
	     	 
              //var table  = 'tbl_registration';
		       var table_teacher = {tablename:'tbl_registration'};
			   admin.findWhere(table_teacher,{user_role:4},function(err, result){
			   	teacher=result;
			   	console.log(teacher);
	     	  	admin.findallteacherassignment({table:table},function(err, result){
				 	//console.log(result);
				 	//return false; 
				 	if(result.length>0)
				      var assign_list 	 = result[0];
				  			      	 if(result.length>0)
				 	  var assign_list 	 = JSON.parse(JSON.stringify(result));
                     else
                     {
                       var assign_list= ""//{class_id:"",section_id:"",teacher_id:""}	
                     }  
              		  

					var pagedata 	 	 = {Title : "", pagename : "admin/assignTeacher", message : req.flash('msg'),assign_list:assign_list,class_list:class_list,teacher:teacher,assigned_id:''};
					res.render("admin_layout", pagedata);
				});

              });


	     	 }	
		    });
		});
    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});
/* Get all teacher based on class */
router.get("/class_teacherList", function(req, res){
	if(req.session.user_role==1){
		var table  = 'tbl_class';
	    var class_id = req.query.class_id; 

		admin.findAll({table:table},function(err, result){
		    var class_list 	 = result;
		    var table_teacher = {tablename:'tbl_registration'};

			admin.findWhere(table_teacher,{user_role:4},function(err, result){
				 var teacher  = result;
				 var table = 'tbl_teacherassignment';
				 admin.getclassassignedteacher({table:table},{class_id:class_id,year:req.session.session_year},function(err, result){
				    var assign_list = result;
				    res.send({assign_list:assign_list});
				});
			});
		});
    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.get("/classRoutine", function(req, res){
	if(req.session.user_role==1){
		var table  = 'tbl_class';
	
		admin.findAll({table:table},function(err, result){

		    var class_list 	 = result;
			var pagedata = {title : "Welcome Admin", pagename : "admin/classRoutine", message : req.flash('msg'),class_list:class_list,rejected_list:''};
			res.render("admin_layout", pagedata);


		});
    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.get("/getAllData", function(req, res){
	if(req.session.user_role==1){
		var class_id =req.query.class_id
	    var table = {tablename:'tbl_section'};
			admin.findWhere(table,{class_id:class_id},function(err, result){
			 	var section_list = result;
			 	var tbl_subject  = {tablename:'tbl_subject'};
			 	admin.findWhere(tbl_subject,{class_id:class_id},function(err, result){
			 		var subject_list  = result;
				 	admin.findWhere(tbl_subject,{class_id:class_id},function(err, result){
				 		res.send({section_list:section_list,subject_list:subject_list});
				 	});
				});
			 	//res.send('Gaurav');
			});
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.post("/add_assignTeacher", function(req, res){
	if(req.session.user_role==1){


		var table   = {tablename:'tbl_teacherassignment'};
	 	var data 	= {

			 		class_id         :req.body.class,
			 		section_id       :req.body.section_id,	 		
			 		subject_id       :req.body.subject_id,
			 		teacher_id       :req.body.teacher_id,
			 		year             :req.session.session_year
		}

       if(req.body.assigned_id)
	     {
	          var where= {id:req.body.assigned_id}
		      admin.updateWhere(table,where,data, function(err, result){  
                 if(result)
		      	 {
		      		res.redirect("/assignteacher_list");
		      	 }
		      });
	     }
     	else 
     	{
	     	admin.insert_all(table,data,function(err, result){
				var table  = 'tbl_class';
		
				admin.findAll({table:table},function(err, result){
				    var class_list 	 = result;

				    var table_teacher = {tablename:'tbl_registration'};
					
					admin.findWhere(table_teacher,{user_role:4},function(err, result){
						var teacher  = result;

						 var table = 'tbl_teacherassignment';
			 
						 admin.findallteacherassignment({table:table},function(err, result){

						    var assign_list 	 = result;
							var pagedata 	 	 = {Title : "", pagename : "admin/assignTeacher", message : req.flash('msg'),assign_list:assign_list,class_list:class_list,teacher:teacher,assigned_id:""};

							res.render("admin_layout", pagedata);
						});
						// var pagedata = {title : "Welcome Admin", pagename : "admin/assignTeacher", message : req.flash('msg'),class_list:class_list,teacher:teacher};
						// res.render("admin_layout", pagedata);
					});
				});
			});	
     	}



	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
	

});


router.get("/assignteacher_list", function(req, res){
	if(req.session.user_role==1){
		

	    var table = 'tbl_teacherassignment';
	 
			 admin.findallteacherassignment({table:table},function(err, result){
			 	console.log(result);
			    var assign_list 	 = result;
				var pagedata 	 	 = {Title : "", pagename : "admin/assignteacher_list", message : req.flash('msg'),assign_list:assign_list,assigned_id:""};

				res.render("admin_layout", pagedata);
			});
	}else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
		
	}
});

router.get("/homeworkList", function(req, res){
	if(req.session.user_role==1){
		
		
	    	var table = 'tbl_homework';
	 
			 admin.findhomework({table:table},function(err, result){
			 	console.log(result);
			    var homework_list 	 = result;
				var pagedata 	 	 = {Title : "", pagename : "admin/homework_list", message : req.flash('msg'),homework_list:homework_list};
				res.render("admin_layout", pagedata);
			});
	}else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
		
	}
});

router.get("/HomeWork", function(req, res){
	if(req.session.user_role==1){
		var table  = 'tbl_class';
	
		admin.findAll({table:table},function(err, result){
		    var class_list 	 = result;

		    var table = 'tbl_homework';
	 
			 admin.findhomework({table:table},function(err, result){
			 	console.log(result);
			    var homework_list 	 = result;
				var pagedata 	 	 = {Title : "", pagename : "admin/homework", message : req.flash('msg'),homework_list:homework_list,class_list:class_list};
				res.render("admin_layout", pagedata);
			});
			
		});
    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.post("/addHomeWork", function(req, res){
  if(req.session.user_role==1){

  	var class_id            = req.body.class_id;
  	var section_id          = req.body.section_id;
  	
  	var subject_id  		= req.body.subject_id;
  	var task        		= req.body.task;
  	var task_description    = req.body.task_description;

  	var moment 				= require('moment');
	var dates 				= moment().format('YYYY-MM-DD:hh:mm:ss');
  	
  	var file = req.files.subject_file;
  	
  	var data = [];
  	for(var k in subject_id){
  		 
  		file1= file[k];
  		var newname = changename(file[k].name);
		var filepath = path.resolve("public/homework_image/"+newname);
		
		file1.mv(filepath, function(err){
			if(err){
				console.log(err);
				return;
			}
		});
		
  		 data = {
  		 	class_id 			: class_id,
  		 	section_id			: section_id,
  		 	teacher_id			: 0,
  			subject_id 			: subject_id[k],
  			task       			: task[k],
  			description    		: task_description[k],
  			file_name     	    : newname,
  			homework_date	    : dates,
  			created_date	    : dates
  		}
  		var table   = {tablename:'tbl_homework'};
  	
  		admin.insert_all(table,data,function(err, result){
			
		});	
	}

  		var table  = 'tbl_class';
	
		admin.findAll({table:table},function(err, result){
		    var class_list 	 = result;
			var pagedata = {title : "Welcome Admin", pagename : "admin/homework", message : req.flash('msg'),class_list:class_list};
			res.render("admin_layout", pagedata);
		});
     }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});


router.get("/getsubjTeach", function(req, res){
	if(req.session.user_role==1){
		var class_id   = req.query.class_id
		var section_id = req.query.section_id
		var day = req.query.day


	    var table = {tablename:'tbl_subject'};
        
			 admin.findWhere(table,{class_id:class_id},function(err, result){
				var subject_list  = result
				var n=0;
				//var day = [ 'sunday', 'monday', 'tuesday','wednesday','thursday','friday','saturday'];
                 
                
				 subject_list.forEach(function(item, index){
				 	   
				 	    subject_list[index].class_routine_id="";
				 		subject_list[index].teacher="";
				 		subject_list[index].routed_teacher_id="";
				 		subject_list[index].routed_teacher_name="";
				 		subject_list[index].routed_time_start="";
				 		subject_list[index].routed_time_start_min=""
				 		subject_list[index].routed_time_end=""
					    subject_list[index].routed_starting_ampm= ""
					    subject_list[index].routed_time_end_min= ""
					    subject_list[index].routed_end_ampm= ""
					   // subject_list[index].routed_day=item

				 	});
				    async.forEachOf(subject_list, function (item,index, done) {

					 		var subject_id   =  item['subject_id'];
					 		//console.log(subject_id)
					 		var teacherTable = {tablename : 'tbl_teacherassignment'}

							admin.findsubjectTeacher(teacherTable,{class_id:class_id,section_id:section_id,subject_id:subject_id},function(err, result1){
								
							    var teacher_list  = Object.values(JSON.parse(JSON.stringify(result1)))
							     subject_list[index].teacher=teacher_list;
                               
                                 var class_routine = {tablename : 'tbl_class_routine'}
                                 if(result1.length)
                                 {
                                 	assignedteacher =JSON.parse(JSON.stringify(result1[0]));  
                                    registration_id= assignedteacher.teacher_id
                                 }
                                 else
                                    registration_id= 0;
                                 

                                   admin.findClassRoutineAllday(class_routine,{class_id:class_id,section_id:section_id,subject_id:subject_id,registration_id:registration_id,day:day},function(err, result){
                                       if(result.length)
                                        {
                                        	routeddata =JSON.parse(JSON.stringify(result[0]))
                                        	subject_list[index].class_routine_id= routeddata.class_routine_id
                                        	subject_list[index].routed_teacher_id=routeddata.registration_id
									 		subject_list[index].routed_teacher_name=routeddata.registration_id
									 		subject_list[index].routed_time_start=routeddata.time_start
									 		subject_list[index].routed_time_start_min=routeddata.time_start_min
									 		subject_list[index].routed_time_end= routeddata.time_end
										    subject_list[index].routed_starting_ampm= routeddata.starting_ampm
										    subject_list[index].routed_time_end_min= routeddata.time_end_min
										    subject_list[index].routed_end_ampm= routeddata.end_ampm
										    //subject_list[index].routed_day= routeddata.day 
                                        }  
 							           done(null);
							          n++;
							       });
							     
							    

							});
					}, function(){
					 var subjectList = subject_list
					   //console.log('Finallllllllllllllllllllll',subjectList);
					 res.send({subject_list:subjectList});
					});
			

			 });

			
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

/* 
*** Fetch Class routine on selcted class id & section id with week day
*** Get Default Data After Form Submit
*/
router.get("/getclassroutine", function(req, res){
	if(req.session.user_role==1){
		var class_id   = req.query.class_id
		var section_id = req.query.section_id
		var day = req.query.day
         //console.log(class_id);
         //return false;

	    var table = {tablename:'tbl_subject'};
        
			 admin.findWhere(table,{class_id:class_id},function(err, result){
				var subject_list  = result
				var n=0;
				//var day = [ 'sunday', 'monday', 'tuesday','wednesday','thursday','friday','saturday'];
                 
                
				 subject_list.forEach(function(item, index){
				 	 
				 		subject_list[index].teacher="";
				 		subject_list[index].routed_teacher_id="";
				 		subject_list[index].routed_teacher_name="";
				 		subject_list[index].routed_time_start="";
				 		subject_list[index].routed_time_start_min=""
				 		subject_list[index].routed_time_end=""
					    subject_list[index].routed_starting_ampm= ""
					    subject_list[index].routed_time_end_min= ""
					    subject_list[index].routed_end_ampm= ""
					   // subject_list[index].routed_day=item

                       
				 	});
				    async.forEachOf(subject_list, function (item,index, done) {

					 		var subject_id   =  item['subject_id'];
					 		//console.log(subject_id)
					 		var teacherTable = {tablename : 'tbl_teacherassignment'}

							admin.findsubjectTeacher(teacherTable,{class_id:class_id,section_id:section_id,subject_id:subject_id},function(err, result1){
								
							    var teacher_list  = Object.values(JSON.parse(JSON.stringify(result1)))
							     subject_list[index].teacher=teacher_list;
                               
                                 var class_routine = {tablename : 'tbl_class_routine'}
                                 if(result1.length)
                                 {
                                 	assignedteacher =JSON.parse(JSON.stringify(result1[0]));  
                                    registration_id= assignedteacher.teacher_id
                                 }
                                 else
                                    registration_id= 0;
                                 

                                   admin.findClassRoutineAllday(class_routine,{class_id:class_id,section_id:section_id,subject_id:subject_id,registration_id:registration_id,day:day},function(err, result){
                                       if(result.length)
                                        {
                                        	routeddata =JSON.parse(JSON.stringify(result[0]))
                                        	subject_list[index].routed_teacher_id=routeddata.registration_id
									 		subject_list[index].routed_teacher_name=routeddata.registration_id
									 		subject_list[index].routed_time_start=routeddata.time_start
									 		subject_list[index].routed_time_start_min=routeddata.time_start_min
									 		subject_list[index].routed_time_end= routeddata.time_end
										    subject_list[index].routed_starting_ampm= routeddata.starting_ampm
										    subject_list[index].routed_time_end_min= routeddata.time_end_min
										    subject_list[index].routed_end_ampm= routeddata.end_ampm
										    //subject_list[index].routed_day= routeddata.day 
                                        }  
 							           done(null);
							          n++;
							       });
							     
							    

							});
					}, function(){
					 var subjectList = subject_list
					   //console.log('Finallllllllllllllllllllll',subjectList);
					 res.send({subject_list:subjectList});
					});
			

			 });

			
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});


router.get("/attendence", function(req, res){
	if(req.session.user_role==1){
		var table  = 'tbl_class';
	
		admin.findAll({table:table},function(err, result){

		    var class_list 	 = result;
		    admin.findAllteacher({tablename:'tbl_registration'},function(err, result1){
		    var teacher_list = result1
		    var n =0;

		    async.each(teacher_list, function (item, done) {

						 		console.log(item.registration_id)
						 		
						 		var tbl_attendence  = {tablename : 'tbl_attendance'}
						 		var attendence_date = moment().format('DD-MM-YYYY');
								admin.getTeacherAttendence(tbl_attendence,{attendence_date:attendence_date,student_id:item.registration_id},function(err, result1){
									console.log(result1)
								  	if(result1==undefined || result1==''){
								  		   teacher_list[n].attendence='';
								  	}else{
								  		   teacher_list[n].attendence=result1[0].status;
								  	}
								  
								    n++;
									
								    done(null);
								});
						}, function(){

				//console.log(teacher_list)
						//res.send(teacher_list)
			    
			    var pagedata = {title : "Welcome Admin", pagename : "admin/attendence", message : req.flash('msg'),class_list:class_list,teacher_list:teacher_list};
					    res.render("admin_layout", pagedata);
					
				});
			
			});
		});
    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

/* 
*** Get Student Attendence Report 
*/
router.get("/studentattendencereport",function(req,res){
   	if(req.session.user_role==1){

  		var parent_id = req.session.uid;
  		var month     = {
  			'1' : 'January',
  			'2' : 'February',
  			'3' : 'March',
  			'4' : 'April',
  			'5' : 'May',
  			'6' : 'June',
  			'7' : 'July',
  			'8' : 'August',
  			'9' : 'September',
  			'10': 'October',
  			'11': 'November',
  			'12': 'December'

  		}
  		var session_year         = req.session.session_year; 
  		var y 					 = session_year.split("-");
  		var year                 = y[0];
  		var nextyear                 = y[1];
  		var tableobj = {tablename:'tbl_registration'};
     
    	var class_id =req.query.class_id
	    var table = {tablename:'tbl_registration'};
        admin.findAll({table:'tbl_class'},function(err, result){
		    var class_list 	 = result;
			 	var pagedata 	 = {title : "Welcome Admin", pagename : "admin/studentattendencereport", message : req.flash('msg'),student_information :"",class_list:class_list,month:month,year:year,nextyear:nextyear};
	            res.render("admin_layout", pagedata);
		});
		
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.get("/get_admin_student_attendance",function(req,res){

   if(req.session.user_role==1){
		var class_id 	      =  req.query.class_id
		var section_id 	      =  req.query.section_id
		var month             =  req.query.month
		var session_year      =  req.session.session_year; 
		var registration_id   =  req.query.registration_id;
		var student_id        =  {};
		var table             =  { tbl_attendance:'tbl_attendance',tbl_enroll : 'tbl_enroll',tablename:'tbl_attendance' };
     	admin.getAdminStudentAttendence(table,{class_id:class_id,section_id:section_id,registration_id:registration_id,session_year:session_year,month:month},function(err, result1){
									//console.log('sas',result1)
		  	if(result1==undefined || result1==''){
		  		   student_id['attendence'] = '';
		  	}else{
		  		   student_id['attendence'] = result1[0].status;
		  	}
		  var attendance= result1;
		  //console.log('attendence',result1);
		  res.send({student_attendance : result1})
		});
 	}else{
        admin.select(function(err,result){
		    res.render('admin/index',{error : req.flash('msg')});
	 	});
	}
});


/* Get Report of attendance for All student */
router.get("/getAdminStudentAttendanceReport",function(req,res){

   if(req.session.user_role==1){
		 
		var month             =  req.query.month_id
		var session_year      =  req.session.session_year; 
		var year              =  req.query.year; 
		var student_id        =  {};
		var table             =  { tbl_attendance:'tbl_attendance',tbl_enroll : 'tbl_enroll',tbl_registration:'tbl_registration' };
     	 
	    var table = {tbl_attendance:'tbl_attendance',tbl_registration:'tbl_registration'};
	    admin.getteacherlist_by_attendence(table,{session_year:session_year,month:month,year:year,user_role:4},function(err, result){
		   	var teacher_list = result;
			   teacher_list.forEach(function(item, index){
			 	 	  teacher_list[index].attendence=[];
			 	 	 
			 	});
		  	 n=0;
		    async.each(teacher_list, function (item, done) {
			  	registration_id=item.registration_id;
	   	        admin.getAdminTeacherAttendence(table,{session_year:session_year,month:month,year:year,user_role:4,registration_id:registration_id},function(err, result1){
	   	        	 
	                   teacher_list[n].attendence =result1
			           n++
			           done(null);
			        });    
	             },function(){
		              //console.log('###############',teacher_list)
		              res.send({teacher_attendance : teacher_list})
		     
	         });        
         });	
 	}else{
        admin.select(function(err,result){
		    res.render('admin/index',{error : req.flash('msg')});
	 	});
	}
});


/* ********************************** */



/* 
*** Get Student Attendence Report 
*/
router.get("/teacherattendencereport",function(req,res){
   	if(req.session.user_role==1){

  		var parent_id = req.session.uid;
  		var month     = {
  			'1' : 'January',
  			'2' : 'February',
  			'3' : 'March',
  			'4' : 'April',
  			'5' : 'May',
  			'6' : 'June',
  			'7' : 'July',
  			'8' : 'August',
  			'9' : 'September',
  			'10': 'October',
  			'11': 'November',
  			'12': 'December'

  		}
  		var session_year         = req.session.session_year; 
  		var y 					 = session_year.split("-");
  		var year                 = y[0];
  		var nextyear                 = y[1];
  		var tableobj = {tablename:'tbl_registration'};


  		
     
    	var class_id =req.query.class_id
	    var table = {tablename:'tbl_registration'};
        admin.findAll({table:'tbl_class'},function(err, result){
		    var class_list 	 = result;
			 	var pagedata 	 = {title : "Welcome Admin", pagename : "admin/teacherattendencereport", message : req.flash('msg'),student_information :"",class_list:class_list,month:month,year:year,nextyear:nextyear};
	            res.render("admin_layout", pagedata);
		});
		
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

/* Get Report of attendance for All student */
router.get("/getAdminTeacherAttendanceReport",function(req,res){

   if(req.session.user_role==1){
		//var class_id 	      =  req.query.class_id
		//var section_id 	      =  req.query.section_id
		var month             =  req.query.month_id
		var session_year      =  req.session.session_year; 
		var year              =  req.query.year; 
		//var student_id        =  {};

     	 
	    var table = {tbl_registration:'tbl_registration',tbl_enroll:'tbl_enroll'};
	    admin.getteacherlist_by_attendence(table,{session_year:session_year,user_role:4},function(err, result){
	    	 
             
		   	var teacher_list = result;
			   teacher_list.forEach(function(item, index){
			 	 	  teacher_list[index].attendence=[];
			 	});
		  	 n=0;
		    async.each(teacher_list, function (item, done) {
			  	registration_id=item.registration_id;
	            var table  =  { tbl_attendance:'tbl_attendance',tbl_enroll : 'tbl_enroll',tablename:'tbl_attendance' };
	   	        admin.getAdminStudentAttendence(table,{class_id:class_id,section_id:section_id,registration_id:registration_id,session_year:session_year,month:month},function(err, result1){
	   	        	 
	                   student_list[n].attendence =result1
			           n++
			           done(null);
			        });    
	             },function(){
		              console.log('###############',student_list)
		              res.send({student_attendance : student_list})
		     
	         });        
         });	
 	}else{
        admin.select(function(err,result){
		    res.render('admin/index',{error : req.flash('msg')});
	 	});
	}
});



/* ****************************** */

router.get("/academic_syllabus", function(req, res){
	if(req.session.user_role==1){
		
		var tableobj  = {tablename:'tbl_academic_syllabus'}
		if(req.query.id)
	    {
            var findObj = {academic_syllabus_id:req.query.id}
            admin.findWhere(tableobj,findObj,function(err,result){
	            if(result){
	               var $data =JSON.parse(JSON.stringify(result[0])); 
	          		var table  = 'tbl_class';
					admin.findAll({table:table},function(err, result){
					  var class_list 	 = result;
					  console.log($data);
		              var pagedata = {title : "Welcome Admin", pagename : "admin/academic_syllabus", message : req.flash('msg'),academic_syllabusData:$data,academic_syllabus:'',class_list:class_list};
				      res.render("admin_layout", pagedata);
				    });
	            }
           	});
	    }
	    else{
			var table  = 'tbl_class';
			admin.findAll({table:table},function(err, result){
			    var class_list 	 = result;
			  
			    var tbl_academic_syllabus = {tablename :'tbl_academic_syllabus'}
		 
				 admin.findAcadmicSyllabus(tbl_academic_syllabus,function(err, result1){
				 	var academic_syllabus  = result1
				 	console.log(class_list);
				 	console.log(academic_syllabus);
					var pagedata 	 	 = {Title : "", pagename : "admin/academic_syllabus", message : req.flash('msg'),academic_syllabusData:'',academic_syllabus:academic_syllabus,class_list:class_list};
					//var pagedata 	 	 = {Title : "", pagename : "admin/academic_syllabus", message : req.flash('msg'),academic_syllabus:academic_syllabus,class_list:class_list,academic_syllabusData:''};
					res.render("admin_layout", pagedata);
				});
				
			});
		}
    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.post("/addAcademicSyllabus", function(req, res){
  if(req.session.user_role==1){
 	 
 	data={};
  	var class_id            = req.body.class_id;
  	var subject_id  		= req.body.subject_id;
  	var title        		= req.body.title;
  	var description    		= req.body.descriptions;
  	var moment 				= require('moment');
	var created_date 		= moment().format('YYYY-MM-DD:hh:mm:ss');
  	var file = req.files.file;
  	var image= '';
  	if(typeof file=="undefined"){
  			var image = '';
  	}else{
	  	var newname = changename(file.name);
	  	var filepath = path.resolve("public/syllabus/"+newname);
	  		file.mv(filepath, function(err){
				if(err){
					console.log(err);
					return;
				}
				else
				{
					
				}

			});

	    var image = newname
	    data['file_name']=image;
	}
        data['class_id']=class_id
    	data['subject_id']=subject_id
    	data['title']=title
    	data['description']=description
    	data['year']=req.session.session_year
  		var table   = {tablename:'tbl_academic_syllabus'};
        if(req.body.academic_syllabus_id)
        {
        	console.log('Updated',data);

            var where={academic_syllabus_id: req.body.academic_syllabus_id};
	  	    admin.updateWhere(table,where,data, function(err, result){
	           if(result)
	           {
	             res.redirect('/academic_syllabus') 	 
	           }
	        });
        }
        else
        {
           	
          admin.insert_all(table,data,function(err, result){
  			res.redirect('/academic_syllabus')
  		  }); 
        }

  		

 
    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.get("/academicSyllabus_list", function(req, res){
	if(req.session.user_role==1){
		
		
	    	var tbl_academic_syllabus = {tablename :'tbl_academic_syllabus'}
	 
			 admin.findAcadmicSyllabus(tbl_academic_syllabus,function(err, result1){
			 
			    var academic_syllabus 	 = result1;
				var pagedata 	 	 	 = {Title : "", pagename : "admin/accademic_syllabus_list", message : req.flash('msg'),academic_syllabus:academic_syllabus};
				res.render("admin_layout", pagedata);
			});
	}else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
		
	}
});

router.get("/getStudentAttendence", function(req, res){
	if(req.session.user_role==1){
		
		var class_id   			= req.query.class_id
		var section_id 			= req.query.section_id
		var attendence_date		= moment(req.query.attendence_date).format('YYYY-MM-DD');//req.query.attendence_date
		var session_year	    = req.session.session_year
       // console.log(req.query);

        var object = {};

	    	var table  		=  {tbl_attendance : 'tbl_attendance',tbl_enroll:'tbl_enroll',tbl_registration:'tbl_registration'}
        	var student_id  = ''; 
        	var n 			= 0;    
			admin.getStudent(table,{class_id:class_id,section_id:section_id,session_year:session_year},function(err, result){
						var student_id  = result;

						console.log(student_id)
						async.each(student_id, function (item, done) {

						  	admin.getStudentAttendence(table,{class_id:class_id,section_id:section_id,attendence_date:attendence_date,student_id:item.registration_id,session_year:session_year},function(err, result1){
									console.log('sas',result1)
								  	if(result1==undefined || result1==''){
								  		   student_id[n].attendence='';
								  	}else{
								  		   student_id[n].attendence=result1[0].status;
								  	}
								  
								    n++;
									
								    done(null);
								});
						}, function(){

					 	console.log("##############",student_id)
						res.send(student_id)
					
						});

			});
		//	console.log(student_id)

			
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.get("/getTeacherAttendence", function(req, res){
	if(req.session.user_role==1){
		
		var class_id   			= req.query.class_id
		var section_id 			= req.query.section_id
		var attendence_date		= req.query.attendence_date
        console.log(req.query);
        var object = {};

	    	var table  		= {tablename:'tbl_registration'};
        	var student_id  = ''; 
        	var n 			= 0;    
			admin.getTeacher(table,{class_id:class_id,section_id:section_id},function(err, result){
						var student_id  = result;
						
						async.each(student_id, function (item, done) {

						 		//console.log(item.registration_id)
						 		
						 		var tbl_attendence = {tablename : 'tbl_attendance'}

								admin.getAttendence(tbl_attendence,{class_id:class_id,section_id:section_id,attendence_date:attendence_date,student_id:item.registration_id},function(err, result1){
									console.log(result1)
								  	if(result1==undefined || result1==''){
								  		   student_id[n].attendence='';
								  	}else{
								  		   student_id[n].attendence=result1[0].status;
								  	}
								  
								    n++;
									
								    done(null);
								});
						}, function(){

						//console.log(student_id)
						res.send(student_id)
					
						});

			});
		//	console.log(student_id)

			
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.post("/addAttendence", function(req, res){

//console.log('bodyyyyyyyyyyyyyyyyyy',req.body);
	if(req.session.user_role==1){
		var type 				= req.body.attendence;
		if(type=='student'){
			var class_id  			= req.body.class_id;
			var section_id 			= req.body.section_id;
			var attendence_date		= moment(req.body.attendence_date).format('YYYY-DD-MM');
 			var student_id			= req.body.student_id;
			var status				= req.body.status;
			var session_year	    = req.session.session_year;
			var check               = Array.isArray(student_id);
			if(check==false){
				var data = {
						class_id 		: class_id,
						section_id		: section_id,
						attendence_date	: attendence_date,
						registration_id : parseInt(student_id),
						status		    : status,
						created_date 	: moment().format('YYYY-MM-DD:hh:mm:ss'),
						session_year	: req.session.session_year,
						user_role		: 3
					}

					var table   = {tbl_attendance:'tbl_attendance',tbl_enroll : 'tbl_enroll',tablename:'tbl_attendance'};
		  			admin.getStudentAttendence(table,{class_id:class_id,section_id:section_id,attendence_date:attendence_date,student_id:student_id,session_year:session_year},function(err, result1){
		  				//console.log('abcbdsdd',result1);
		  				if(result1=='' || result1==undefined){
		  					
		  				}else{
		  					var id = result1[0].attendance_id
		  					var findObj = {};
				            findObj['attendance_id'] = id;
				            admin.deletewhere(table,findObj,function(err,result){
	                        });
		  				}
		  			});
		  			 
		  			admin.insert_all(table,data,function(err, result){
			  			
			  		});
			}else{
				for(var k in student_id){

					var data = {
						class_id 		: class_id,
						section_id		: section_id,
						attendence_date	: attendence_date,
						registration_id : parseInt(student_id[k]),
						status		    : parseInt(status[k]),
						created_date 	: moment().format('YYYY-MM-DD:hh:mm:ss'),
						session_year	: req.session.session_year,
						user_role		: 3
					}

					 

					var table   = {tbl_attendance:'tbl_attendance',tbl_enroll : 'tbl_enroll',tablename:'tbl_attendance'};
		  			admin.getStudentAttendence(table,{class_id:class_id,section_id:section_id,attendence_date:attendence_date,student_id:student_id[k]},function(err, result1){
		  				console.log(result1);
		  				if(result1=='' || result1==undefined){
		  					
		  				}else{
		  					var id = result1[0].attendance_id
		  					var findObj = {};
				            findObj['attendance_id'] = id;
				            admin.deletewhere(table,findObj,function(err,result){
	                        });
		  				}

		  				
		  			});

		  			//console.log('avbc',data);return false;
		  			admin.insert_all(table,data,function(err, result){
			  			
			  		});
		  			//console.log(data)
		  			
			  		
				}
			}
		}else{
			var teacher_id  		= req.body.teacher_id;
			var status 				= req.body.teacher_status;
			var attendence_date		= moment().format('YYYY-MM-DD');
			var check  = Array.isArray(teacher_id);
			if(check==false){
					var data = {
						
						attendence_date	: attendence_date,
						registration_id : teacher_id,
						status		    : status,
						created_date 	: moment().format('YYYY-MM-DD:hh:mm:ss'),
						session_year	: req.session.session_year,
						user_role		: 4
					}

					var table   = {tablename:'tbl_attendance'};
					
		  			admin.getTeacherAttendence(table,{attendence_date:attendence_date,student_id:teacher_id},function(err, result1){
		  				console.log(result1);
		  				if(result1!=''){
		  					console.log('SDssdds')
		  					var id = result1[0].attendance_id
		  					var findObj = {};
				     
				         	findObj['attendance_id'] = id;
				
						     admin.deletewhere(table,findObj,function(err,result){

						     });
		  				}
		  			});
		  			//console.log(data)
		  			admin.insert_all(table,data,function(err, result){
			  			
			  		});
			}else{
				for(var k in teacher_id){

					var data = {
						
						attendence_date	: attendence_date,
						registration_id : teacher_id[k],
						status		    : status[k],
						created_date 	: moment().format('YYYY-MM-DD:hh:mm:ss'),
						session_year	: req.session.session_year,
						user_role		: 4
					}

					var table   = {tablename:'tbl_attendance'};
					
		  			admin.getTeacherAttendence(table,{attendence_date:attendence_date,student_id:teacher_id[k]},function(err, result1){
		  				console.log(result1);
		  				if(result1!=''){
		  					console.log('SDssdds')
		  					var id = result1[0].attendance_id
		  					var findObj = {};
				     
				         	findObj['attendance_id'] = id;
				
						     admin.deletewhere(table,findObj,function(err,result){

						     });
		  				}
		  			});
		  			//console.log(data)
		  			admin.insert_all(table,data,function(err, result){
			  			
			  		});
			  		
				}
			}
		
		}	
	    res.redirect('/attendence')
		//console.log(req.body)

			
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.get("/study_material", function(req, res){
	if(req.session.user_role==1){
		var table  = 'tbl_class';
	
		admin.findAll({table:table},function(err, result){
		    var class_list 	 = result;
		   //   	var pagedata 	 	 = {Title : "", pagename : "admin/study_material", message : req.flash('msg'),class_list:class_list};
			 	// res.render("admin_layout", pagedata);
		    var tbl_document = {tablename :'tbl_document'}
	 
			 admin.findStudyMaterial(tbl_document,function(err, result){
			 
			    var document_list 	 = result;
				var pagedata 	 	 = {Title : "", pagename : "admin/study_material", message : req.flash('msg'),document_list:document_list,class_list:class_list};
				res.render("admin_layout", pagedata);
			});
			
		});
    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});



router.post("/addStudyMaterial", function(req, res){
  if(req.session.user_role==1){
 	

 	console.log(req.body);
 	
  	var class_id            = req.body.class_id;
  	var subject_id  		= req.body.subject_id;
  	var title        		= req.body.title;
  	var description    		= req.body.descriptions;
  	var moment = require('moment');
	var created_date = moment().format('YYYY-MM-DD:hh:mm:ss');
  	
  	var file = req.files.file;
  	
  
  	var image= '';
  	if(typeof file=="undefined"){

  			var image = '';
  	}else{
	  	var newname = changename(file.name);
	  	var filepath = path.resolve("public/study_material/"+newname);

	  		file.mv(filepath, function(err){
				if(err){
					console.log(err);
					return;
				}
			});

	    var image = newname
	}
		
		data = {
  		 	class_id 			: class_id,
  		 	subject_id 			: subject_id,
  			title       		: title,
  			description    		: description,
  			file_name     	    : image,
  			created_date	    : created_date
  		}

  		var table   = {tablename:'tbl_document'};
  	
  		admin.insert_all(table,data,function(err, result){
  			res.redirect('/study_material')
  		});

 
    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});


router.get("/Studymaterial_list", function(req, res){
	if(req.session.user_role==1){
		
		
	    	var tbl_document = {tablename :'tbl_document'}
	 
			 admin.findStudyMaterial(tbl_document,function(err, result){
			 
			    var document_list 	 = result;
				var pagedata 	 	 = {Title : "", pagename : "admin/study_material_list", message : req.flash('msg'),document_list:document_list};
				res.render("admin_layout", pagedata);
			});
	}else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
		
	}
});



router.post("/classRoutine", function(req, res){
  if(req.session.user_role==1){


    	var class_id            = req.body.class_id;
    	var section_id          = req.body.section_id;
     	var subject_id  		= req.body.subject_id;
     	var teacher_id			= req.body.teacher_id;
     	var day 			 	= req.body.day;
     	var time_start			= req.body.time_start;
     	var time_start_min		= req.body.time_start_min;
     	var starting_ampm		= req.body.starting_ampm;
     	var time_end			= req.body.time_end;
     	var time_end_min		= req.body.time_end_min;
     	var end_ampm			= req.body.end_ampm;
     	var created_date 		= moment().format('YYYY-MM-DD:hh:mm:ss');
 
        postdatas=[];
        rejecteddata=[];
 
         if(typeof(teacher_id)!='undefined'||teacher_id!=' ' || teacher_id!= undefined )
         {
         	if(Array.isArray(subject_id))
	         {
	             for(var k in subject_id)
		     	{
		     		if(teacher_id[k]!='')
		     		{
		     		   var data  = {
		     			class_id 		: class_id,
		     			section_id		: section_id,
		     			subject_id  	: subject_id[k],
		     			registration_id : teacher_id[k],
		     			day				: day,
		     			time_start  	: time_start[k],
		     			time_start_min	: time_start_min[k],
		     		    starting_ampm	: starting_ampm[k],
		     			time_end 		: time_end[k],
		     			time_end_min	: time_end_min[k],
		     			end_ampm		: end_ampm[k],
		     			session_year	: req.session.session_year,
		     			created_date	: created_date
		     		  }	
		     		  postdatas.push(data); 
		     		}
		     	} 
	         }
	         else
	         {
	                var data  = {
		     			class_id 		: class_id,
		     			section_id		: section_id,
		     			subject_id  	: subject_id,
		     			registration_id : teacher_id,
		     			day				: day,
		     			time_start  	: time_start,
		     			time_start_min	: time_start_min,
		     		    starting_ampm	: starting_ampm,
		     			time_end 		: time_end,
		     			time_end_min	: time_end_min,
		     			end_ampm		: end_ampm,
		     			session_year	: req.session.session_year,
		     			created_date	: created_date
		     		  }	
		     		  postdatas.push(data); 
	         }

         
          
     	
     	 async.eachSeries(postdatas,function(postdata,done){

           session_year =req.session.session_year

          var table  = {tablename:'tbl_class_routine'};

            where1= {registration_id:postdata.registration_id,time_start:postdata.time_start,time_start_min:postdata.time_start_min,starting_ampm:postdata.starting_ampm,time_end:postdata.time_end,time_end_min:postdata.time_end_min,end_ampm:postdata.end_ampm,session_year:session_year}
          
		          admin.findWhere(table,where1,function(err, result1){
		          	   if(result1.length>0)
		          	   {
		                  where2= {registration_id:postdata.registration_id,time_start:postdata.time_start,time_start_min:postdata.time_start_min,starting_ampm:postdata.starting_ampm,time_end:postdata.time_end,time_end_min:postdata.time_end_min,end_ampm:postdata.end_ampm,session_year:session_year}

		                  admin.findWhere(table,where2,function(err, result2){ 
		                    
		                      if(result2.length>0)
		                      {

		                      	where0= {registration_id:postdata.registration_id,class_id:postdata.class_id,section_id:postdata.section_id,time_start:postdata.time_start,time_start_min:postdata.time_start_min,starting_ampm:postdata.starting_ampm,time_end:postdata.time_end,time_end_min:postdata.time_end_min,end_ampm:postdata.end_ampm,session_year:session_year}

				                     admin.findWhere(table,where0,function(err, result0){
				                     	 
				                      		if(result0.length==0)
				                      		{
					                      	    rejecteddata.push(postdata);
					                      	    req.flash('msg','Teacher Already Assigned');
				                      		}
                                        
				                        done(null);

				                     });
		                      }
		                      else
		                      {
		                      	admin.insert_all(table,postdata,function(err, result){
		                          req.flash('msg','Teacher Assigned Successfully');
		                           done(null);
		          	   	         });  

		                      }

		                  });
		          	   }
		          	   else
		          	   {
		          	   	   admin.insert_all(table,postdata,function(err, result){
		          	   	   	req.flash('msg','Teacher Assigned Successfully');
		                        done(null);
		          	   	   });
		          	   }
                   
		          });	
         
        }, 
          function(){
		     	var table  = 'tbl_class';
				admin.findAll({table:table},function(err, result){
				    var class_list 	 = result;
				     rejecteddata="";
				    //if(rejecteddata.length==0)
                 	 //  req.flash('msg','Teacher Assigned Successfully');

                 	//if(rejecteddata.length!=0) 
                 	//   req.flash('msg','Teacher Already Assigned');
            

					var pagedata = {title : "Welcome Admin", pagename : "admin/classRoutine", message : req.flash('msg'),class_list:class_list,rejected_list:rejecteddata};
					res.render("admin_layout", pagedata);
					
				});	  
        });
     }
     else
     {
     	 req.flash('error',"Select Any tecaher");
     	 res.redirect("/classRoutine")
     }
     
    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});


/* 
** Copy Class Routine  from one week day to all 
*/

router.get("/classRoutineClone", function(req, res){
  if(req.session.user_role==1){

    var day = [ 'monday', 'tuesday','wednesday','thursday','friday','saturday'];
		var class_routine_id  = req.query.class_routine_id;
		var tbl_obj  = {tablename:'tbl_class_routine'};
		admin.findWhere(tbl_obj,{class_routine_id:class_routine_id},function(err, result)
		{

            daydata = JSON.parse( JSON.stringify(result[0]));

            console.log(result[0]);
            d = result[0].day;
            var n = day.indexOf(d);
            postdatas = [];
            async.each(day,function(item,done){
                
                var postdata  = {

	     			class_id 		: daydata.class_id,
	     			section_id		: daydata.section_id,
	     			subject_id  	: daydata.subject_id,
	     			registration_id : daydata.registration_id,
	     			day             : item,
	     			time_start  	: daydata.time_start,
	     			time_start_min	: daydata.time_start_min,
	     		    starting_ampm	: daydata.starting_ampm,
	     			time_end 		: daydata.time_end,
	     			time_end_min	: daydata.time_end_min,
	     			end_ampm		: daydata.end_ampm,
	     			session_year	: req.session.session_year,
	     			created_date	: moment().format('YYYY-MM-DD:hh:mm:ss')

                 }

                 var table  = {tablename:'tbl_class_routine'};

                 where1= {class_id:postdata.class_id, section_id:postdata.section_id,subject_id:postdata.subject_id,day:postdata.day, registration_id:postdata.registration_id,time_start:postdata.time_start,time_start_min:postdata.time_start_min,starting_ampm:postdata.starting_ampm,time_end:postdata.time_end,time_end_min:postdata.time_end_min,end_ampm:postdata.end_ampm,session_year:postdata.session_year}
                 flag=1;
		          admin.findWhere(table,where1,function(err, result1){
		          	   if(result1.length==0)
		          	   {
		          	   	   admin.insert_all(table,postdata,function(err, result){

		                          //req.flash('msg','Teacher Assigned Successfully');
		                           //done(null);
		          	   	   });

		          	   }
		          });
               n++;
            done(null);
		},function(){
				var table  = 'tbl_class';
				admin.findAll({table:table},function(err, result){
				    var class_list 	 = result;
				    rejecteddata="";
                    req.flash('msg','Teacher Assigned Successfully ');                    
					var pagedata = {title : "Welcome Admin", pagename : "admin/classRoutine", message : req.flash('msg'),class_list:class_list,rejected_list:rejecteddata};
					res.render("admin_layout", pagedata);
				});
		  });
      });      

     
    }else{
	        admin.select(function(err,result){
		    res.render('admin/index',{error : req.flash('msg')});
		 	});
	}
});

 
router.get("/classroutineList", function(req, res){
	if(req.session.user_role==1){
						var table  = 'tbl_class';
	
						admin.findAll({table:table},function(err, result){
						    var class_list 	 = result;
 
						var pagedata = {title : "Welcome Admin", pagename : "admin/classRoutineList", message : req.flash('msg'),class_list:class_list,class_routine:''};
 
						res.render("admin_layout", pagedata);
					});
			
	}else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
		
	}
});

router.post("/classroutineList", function(req, res){
	if(req.session.user_role==1){
		var class_id   = req.body.class_id;
		var section_id = req.body.section_id;
			var day = [ 'sunday', 'monday', 'tuesday','wednesday','thursday','friday','saturday'];
			//console.log(arr3);
				var abc  = [];
				var n = 0;
				async.each(day, function (item, done) {

						 		
						 		//console.log(subject_id)
						 		var class_routine = {tablename : 'tbl_class_routine'}

								admin.findClassRoutine(class_routine,{class_id:class_id,section_id:section_id,day:item},function(err, result1){
									//console.log(result1);
								    var class_routine  = Object.values(JSON.parse(JSON.stringify(result1)))
								  //ddd  console.log(class_routine)
								    //class_routine.push(class_routine)
								   // console.log("#####",teacher_list);
								   // if(class_routine!=''){
								    abc[n]=class_routine;
								      n++;
									//}
								    done(null);
								  

								 
								});
						}, function(){

						 var class_routine = abc
  
						var table  = 'tbl_class';
	
						admin.findAll({table:table},function(err, result){
						    var class_list 	 = result;
						var pagedata = {title : "Welcome Admin", pagename : "admin/classRoutineList", message : req.flash('msg'),class_routine:class_routine,class_list:class_list};
						res.render("admin_layout", pagedata);
						});
			
						// res.send({class_routine:class_routine});
						});
			
	}else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
		
	}
});

router.get("/exam", function(req, res){
	if(req.session.user_role==1){
		var table  = 'tbl_class';

		admin.findAll({table:table},function(err, result){
		    var class_list 	 = result;
		    var exam_table   = 'tbl_exam_master';
		    
		    admin.findExam({table:exam_table},function(err, exam_list){
		    	 var exam_list    = exam_list


		    	if(req.query.exam_id != undefined || req.query.exam_id !='')
		    	{
                    admin.findexamDetail({table:exam_table},{exam_id:req.query.exam_id},function(err, exam_data){
                    	if(exam_data!= undefined){
                       		var examdata 	 = exam_data[0];
                       	}else{
                       		var examdata 	 = '';
                       	}
							var pagedata 	 = {Title : "", pagename : "admin/exam", message : req.flash('msg'),class_list:class_list,exam_list:exam_list,examdata:examdata};
							res.render("admin_layout", pagedata);
						
                    });
		    	}
		    	else
		    	{
			    	var exam_list    = exam_list
                 		        
					var pagedata 	 = {Title : "", pagename : "admin/exam", message : req.flash('msg'),class_list:class_list,exam_list:exam_list,examdata:""};
					res.render("admin_layout", pagedata);
		    	}
			});
		});
    }else{
	        admin.select(function(err,result){
		    res.render('admin/index',{error : req.flash('msg')});
		 	});
	}
});

router.post("/exam", function(req, res){
	if(req.session.user_role==1)
	{
		var class_id 	  = req.body.class;
		var exam_code	  = req.body.exam_code;
		var name 		  = req.body.name;

		if(req.body.othername!="")
			var name 		  = req.body.othername;
 
		var created_date  = moment().format('YYYY-MM-DD:hh:mm:ss');
		
		var table = {tablename : 'tbl_exam_master'}
		var data  = {
			class_id   		: class_id,
			exam_code 		: exam_code,
			exam_name  		: name,
			session_year	: req.session.session_year,
			created_date	: created_date
	   }




        if(req.body.exam_id != undefined || req.body.exam_id != '' || req.body.exam_id!=null ) 
        {

	        admin.insert_all(table,data,function(err, result){
	
				var table  = 'tbl_class';
				admin.findAll({table:table},function(err, result){
				    var class_list 	 = result;
				    var exam_table   = 'tbl_exam_master';
				    
				    admin.findExam({table:exam_table},function(err, exam_list){
				    	
				    	var exam_list    = exam_list
						var pagedata 	 = {Title : "", pagename : "admin/exam", message : req.flash('msg'),class_list:class_list,exam_list:exam_list,examdata:""};
						res.render("admin_layout", pagedata);
					});
				});
			});
        	
        }
        else
        {

		  var where= { exam_id:req.body.exam_id }
          admin.updateWhere(table,where,data, function(err, result){

          	    var table  = 'tbl_class';
				admin.findAll({table:table},function(err, result){
				    var class_list 	 = result;
				    var exam_table   = 'tbl_exam_master';
				    
				    admin.findExam({table:exam_table},function(err, exam_list){
				    	
				    	var exam_list    = exam_list
						var pagedata 	 = {Title : "", pagename : "admin/exam", message : req.flash('msg'),class_list:class_list,exam_list:exam_list,examdata:""};
						res.render("admin_layout", pagedata);
					});
				});
          });


        }
		//console.log(req.body)
    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});



router.get("/exam_list", function(req, res){
	if(req.session.user_role==1){
		var exam_table   = 'tbl_exam_master';
		    
	    admin.findExam({table:exam_table},function(err, exam_list){
	    	
	    	var exam_list    = exam_list
			var pagedata 	 = {Title : "", pagename : "admin/exam_list", message : req.flash('msg'),exam_list:exam_list};
			res.render("admin_layout", pagedata);
		});
			
	}else{
	      
		   dmin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
		
	}
});
/* 
** ----- Marksheet Formats ----- 
*/
router.get("/sheet_Formats", function(req, res){
  if(req.session.user_role==1){
		var table  = 'tbl_class';

		admin.findAll({table:table},function(err, result){
		    var class_list 	 = result;
		    var table   = {tbl_sheet_formats:'tbl_sheet_formats',tbl_exam_master:'tbl_exam_master',tbl_class:'tbl_class'};

			admin.getMarksheetFormatList(table,function(err, formate_list){

				 console.log(formate_list); 
  	    	    var formate_list    = formate_list
				var pagedata 	 = {Title : "", pagename : "admin/sheet_formats", message : req.flash('msg'),class_list:class_list,formate_list:formate_list,examdata:""};
				res.render("admin_layout", pagedata);
			});
		});
    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}

});

router.post("/sheet_Formats", function(req, res){
	if(req.session.user_role==1){

        var columns=[];

		var class_id 	   = req.body.class;
		var exam_id 	   = req.body.exam_id;
        var columns        = req.body.column;
        var activity_column= req.body.activity_column;

        var jsonData = {};


	     if(Array.isArray(columns))
	     {
	     	for(var k in columns)
	         {
	         	console.log(columns[k]);
	         	if(columns[k]!='')
	         	{
	         	   var value  = columns[k].replace(/ /g,"_");
		           var value  = value.replace('&',"-");
		           var value  = value.replace('%',"percentage");
		           var value  = value.replace('.',"_");
		           var value  = value.replace(',',"_");
		           var value  = value.replace(':',"_");
		           jsonData[value] = 0;//columns[k];	
	         	}
	         }


	     }
	     else
	     {
	     	 if(columns!=undefined || columns!='')
	     	  {
                
                  var  value = columns.replace(/ /g,"_");
		          var value = value.replace('&',"-");
		          var value = value.replace('%',"percentage");
		          var value  = value.replace('.',"_");
		          var value  = value.replace(',',"_");
		          var value  = value.replace(':',"_");
               	  jsonData[value]=0;

	     	  } 
	     }
           


	     var jsonOtherData = {};
	     if(Array.isArray(activity_column))
	     {
	     	for(var j in activity_column)
	         {
	         	if(activity_column[j]!="")
                {

                  
	         	   var value =activity_column[j].replace(/ /g,"_");
	         	   var value =value.replace('&',"-");
	         	   var value =value.replace('%',"percentage");
	         	  jsonOtherData[value] = 0;//columns[k]; 
	         	}
	         }
	     }
	     else
	     {
	         if(activity_column!=undefined || activity_column!='')
	     	  {
	     	  	//var value =  changespecial_char(activity_column);
	     	  	 var value =activity_column.replace(/ /g,"_");
	         	 var value =value.replace('&',"-");
	         	 var value =value.replace('%',"percentage");
	     	  	jsonOtherData[value]=0;
	     	  } 	
	     }


  		var table = {tablename : 'tbl_sheet_formats'}
		var data  = {
				class_id   		: class_id,
				//section_id 		: section_id,
				exam_id  		: exam_id,
				column          :  JSON.stringify(jsonData),
				otheracivity :  JSON.stringify(jsonOtherData) ,
   		     }


		admin.findWhere(table,{class_id:class_id,exam_id:exam_id},function(err, result){

			if(result.length>0)
			{
                var tableclass  = 'tbl_class';
				  admin.findAll({table:tableclass},function(err, result){
				    var class_list 	 = result;
				    var table   = {tbl_sheet_formats:'tbl_sheet_formats',tbl_exam_master:'tbl_exam_master',tbl_class:'tbl_class'};
				    admin.getMarksheetFormatList(table,function(err, formate_list){

				   
                      var exam_list    = formate_list
                        req.flash('msg',"Already exist");

						var pagedata 	 = {Title : "", pagename : "admin/exam", message : req.flash('msg'),class_list:class_list,exam_list:exam_list,examdata:""};
						res.render("admin_layout", pagedata);

					});
				});
			}
			else
			{
               
              admin.insert_all(table,data,function(err, result){
				var table  = 'tbl_class';
		
				  admin.findAll({table:table},function(err, result){
				     var class_list 	 = result;
				     var table   = {tbl_sheet_formats:'tbl_sheet_formats',tbl_exam_master:'tbl_exam_master',tbl_class:'tbl_class'};
				    admin.getMarksheetFormatList(table,function(err, formate_list){

				    	//console.log(formate_list); 

				    	var exam_list    = formate_list
						var pagedata 	 = {Title : "", pagename : "admin/exam", message : req.flash('msg'),class_list:class_list,exam_list:exam_list,examdata:""};
						res.render("admin_layout", pagedata);
					});
				});
			 });


			}
        

        });



		//console.log(req.body)
    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});
router.get("/exam_schedule", function(req, res){
	if(req.session.user_role==1){
		var table  = 'tbl_class';
	
			admin.findAll({table:table},function(err, result){
			    var class_list 	 		= result;
			    var tbl_exam_schedule   = 'tbl_exam_schedule';
			    
			    admin.findExamSchedule({table:tbl_exam_schedule},function(err, exam_schedule){

			    	var exam_schedule    = exam_schedule
					var pagedata 	 = {Title : "", pagename : "admin/exam_schedule", message : req.flash('msg'),class_list:class_list,exam_schedule:exam_schedule};
					res.render("admin_layout", pagedata);
				});
			});
    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.post("/add_exam_schedule", function(req, res){
	if(req.session.user_role==1){
		var class_id 	  = req.body.class_id;
		var section_id	  = req.body.exam_section_id;
		var subject_id	  = req.body.subject_id;
		var exam_id		  = req.body.exam_id;
		var date 		  = req.body.date;
		var total_marks   = req.body.total_marks;
		
		var table = {tablename : 'tbl_exam_schedule'}
		var data  = {
			class_id   		: class_id,
			section_id 		: section_id,
			subject_id  	: subject_id,
			exam_id			: exam_id,
			totalmarks		: total_marks,
			session_year	: req.session.session_year,
			date			: date
		}

		admin.insert_all(table,data,function(err, result){
			var table  = 'tbl_class';
	
			admin.findAll({table:table},function(err, result){
			    var class_list 	 		= result;
			    var tbl_exam_schedule   = 'tbl_exam_schedule';
			    
			    admin.findExamSchedule({table:tbl_exam_schedule},function(err, exam_schedule){
			    	
			    	var exam_schedule    = exam_schedule
					var pagedata 	 = {Title : "", pagename : "admin/exam_schedule", message : req.flash('msg'),class_list:class_list,exam_schedule:exam_schedule};
					res.render("admin_layout", pagedata);
				});
			});
		});
		//console.log(req.body)
    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.get("/exam_schedule_list", function(req, res){
	if(req.session.user_role==1){
			  var tbl_exam_schedule   = 'tbl_exam_schedule';
			    
			    admin.findExamSchedule({table:tbl_exam_schedule},function(err, exam_schedule){
			    	
			    	var exam_schedule    = exam_schedule
					var pagedata 	 = {Title : "", pagename : "admin/exam_schedule_list", message : req.flash('msg'),exam_schedule:exam_schedule};
					res.render("admin_layout", pagedata);
				});
			
	}else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
		
	}
});

router.get("/exam_grades", function(req, res){
	if(req.session.user_role==1){
		
		var table_grades = 'tbl_exam_grades';
		 var exam_table   = 'tbl_exam_master';

		 var tbl_class  = 'tbl_class';
	
		admin.findAll({table:tbl_class},function(err, class_list){
           var class_list = class_list;		    
		  admin.findExam({table:exam_table},function(err, exam_list){
            var exam_list    = exam_list
			var session_year=req.session.session_year;
			admin.findGradeExamList({tbl_grades:"tbl_grades",tbl_class:"tbl_class",tbl_section:"tbl_section",tbl_exam_grades:"tbl_exam_grades",tbl_exam_master:"tbl_exam_master"},{session_year:session_year},function(err, result){
				  var exam_grades   = result;

                  if(req.query.grade_id)
                  {
                     grade_id = req.query.grade_id;

                     admin.findGradeExamDetail({tbl_grades:"tbl_grades",tbl_class:"tbl_class",tbl_section:"tbl_section",tbl_exam_grades:"tbl_exam_grades",tbl_exam_master:"tbl_exam_master"},{grade_id:grade_id,session_year:session_year},function(err, result){
                       var gradedata= result[0];
                       //console.log(result);
                       var pagedata 	  = {Title : "", pagename : "admin/exam_grades", message : req.flash('msg'),exam_grades:exam_grades,exam_list:exam_list,class_list:class_list,gradedata:gradedata};
				       res.render("admin_layout", pagedata);       

                     });
                  }
                  else
                  {
                  	
				    var pagedata 	  = {Title : "", pagename : "admin/exam_grades", message : req.flash('msg'),exam_grades:exam_grades,exam_list:exam_list,class_list:class_list,gradedata:""};
					res.render("admin_layout", pagedata);
                  }

				    
			});    	
		});    	
	  }); 		
			
    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.post("/exam_grades", function(req, res){
	if(req.session.user_role==1){
		
		var class_id	  = req.body.class_id;
		//var section_id	  = req.body.section_id;
		var exam_id       = req.body.exam_id;
		var name 	  	  = req.body.name;
		var mark_from	  = req.body.mark_from;
		var mark_upto	  = req.body.mark_upto;
		var comment		  = req.body.comment;
		
		var data  = {
			name  	 		: name,
			class_id        : class_id,
			//section_id      : section_id,
			exam_id         : exam_id,
			mark_from 		: mark_from,
			mark_upto  		: mark_upto,
			comment			: comment	
		}

		var table = {tablename : 'tbl_exam_grades'}
		var session_year=req.session.session_year;
		 
		var tbl_class  = 'tbl_class';
		admin.findAll({table:tbl_class},function(err, class_list){
           var class_list = class_list;		 
        
        if(req.body.grade_id)
	     {

	        var table   = {tablename:'tbl_exam_grades'};
		  	 var where= { grade_id:req.body.grade_id }

		  	admin.updateWhere(table,where,data, function(err, result){
                
		       admin.findGradeExamList({tbl_grades:"tbl_grades",tbl_class:"tbl_class",tbl_section:"tbl_section",tbl_exam_grades:"tbl_exam_grades",tbl_exam_master:"tbl_exam_master"},{session_year:session_year},function(err, result){
				    var exam_grades   = result;
				    //console.log(exam_grades);
				    var pagedata 	  = {Title : "", pagename : "admin/exam_grades", message : req.flash('msg'),exam_grades:exam_grades,exam_list:'',class_list:class_list,gradedata:""};
					res.render("admin_layout", pagedata);
			   });   

		    });     	
	     } 
	     else
	     {
	     	 var table   = {tablename:'tbl_exam_grades'}; 
	     	admin.insert_all(table,data,function(err, result){
			
		  	  admin.findGradeExamList({tbl_grades:"tbl_grades",tbl_class:"tbl_class",tbl_section:"tbl_section",tbl_exam_grades:"tbl_exam_grades",tbl_exam_master:"tbl_exam_master"},{session_year:session_year},function(err, result){
				    var exam_grades   = result;
				    //console.log(exam_grades);
				    var pagedata 	  = {Title : "", pagename : "admin/exam_grades", message : req.flash('msg'),exam_grades:exam_grades,exam_list:'',class_list:class_list,gradedata:""};
					res.render("admin_layout", pagedata);
			  });
		    })	

	     } 
          
		  


		})	
		//console.log(req.body)
    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.get("/exam_grades_list", function(req, res){
	if(req.session.user_role==1){
        var session_year=req.session.session_year;
		var table_grades = 'tbl_exam_grades';
		admin.findGradeExamList({tbl_grades:"tbl_grades",tbl_class:"tbl_class",tbl_section:"tbl_section",tbl_exam_grades:"tbl_exam_grades",tbl_exam_master:"tbl_exam_master"},{session_year:session_year},function(err, result){
			    var exam_grades   = result;
			    var pagedata 	  = {Title : "", pagename : "admin/exam_grades_list", message : req.flash('msg'),exam_grades:exam_grades,gradedata:""};
				res.render("admin_layout", pagedata);
		});


	}else{
		    res.render('admin/index',{error : req.flash('msg')});
	}
});

router.get("/getAllExamData", function(req, res){
	if(req.session.user_role==1){
		var class_id 	= req.query.class_id
		var section_id	= req.query.section_id
	   
			 	var tbl_subject  = {tablename:'tbl_subject'};
			 	admin.findWhere(tbl_subject,{class_id:class_id},function(err, result){
			 		var subject_list  = result;
			 		var tbl_exam  = {tablename:'tbl_exam_master'};
			 		var session_year = req.session.session_year
			 		admin.findWhereorderby(tbl_exam,{class_id:class_id,session_year:session_year},{orderby:'exam_name',order:'ASC'},function(err,result){
			 			var exam_list = result
			 			res.send({subject_list:subject_list,exam_list:exam_list});
			 		})
				});
			 	//res.send('Gaurav');
			
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});


/* 
 ** Get All Exam Name on select of class name only 
*/
router.get("/getAllExamName", function(req, res){
	if(req.session.user_role==1){
		var class_id 	= req.query.class_id
		//var section_id	= req.query.section_id
	   
			 	var tbl_subject  = {tablename:'tbl_subject'};
			 	admin.findWhere(tbl_subject,{class_id:class_id},function(err, result){
			 		var subject_list  = result;
			 		var tbl_exam  = {tablename:'tbl_exam_master'};
			 		admin.findWhereorderby(tbl_exam,{class_id:class_id},{orderby:'exam_name',order:'ASC'},function(err,result){
			 			var exam_list = result
			 			res.send({subject_list:subject_list,exam_list:exam_list});
			 		})
				});
			 	//res.send('Gaurav');
			
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});
/* 
 ** Get All Scheduled Exam Name of selected subject  
*/
router.get("/getSecheduledExamName", function(req, res){
	if(req.session.user_role==1){
		var class_id 	= req.query.class_id
		var subject_id 	= req.query.subject_id
		var session_year=  req.session.session_year; 
		var section_id=  req.query.section_id;

			table={tbl_exam_master:"tbl_exam_master",tbl_exam_schedule:"tbl_exam_schedule",tbl_exam_grades:"tbl_exam_grades" }
	 		admin.get_subject_scheduled_exam(table,{class_id:class_id,section_id:section_id,subject_id:subject_id,session_year:session_year},{orderby:'exam_name',order:'ASC'},{exam_id:'exam_id'},function(err,result){
	 			var exam_list=result
                res.send({exam_list:exam_list});
	 		})
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});



router.get("/manage_marks", function(req, res){
	if(req.session.user_role==1){
		
		var table  = 'tbl_class';
	
		admin.findAll({table:table},function(err, result){
		    var class_list 	 = result;
			var pagedata 	 = {Title : "", pagename : "admin/manage_marks", message : req.flash('msg'),class_list:class_list};
			res.render("admin_layout", pagedata);
		});
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.post("/add_manage_marks", function(req, res){
	if(req.session.user_role==1){
		var data = req.body
		
		 

		
		var student_id 				= req.body.student_id;
		var class_id 				= req.body.class_id;
		var section_id  			= req.body.exam_section_id;
		var exam_id    				= req.body.exam_id;

		var subject_id              = req.body.subject_id;
		var subjectname 			= req.body.subjectname;
		var marks 			        = req.body.marks;
		var children_participation  = req.body.children_participation;
		var written_work			= req.body.written_work;
		var project_work			= req.body.project_work;
		var slip_test				= req.body.slip_test;
		var comment					= req.body.comment;
		var marks_total				= req.body.total_marks;
		var marks_obtained			= req.body.marks_obtained;
        var subject_type			= req.body.subject_type;
        var exam_code			    = req.body.exam_code;

         pos=0;
         postdata=[];
		 for(var k in student_id)
		 {
		    str= '{';
           for(i=0; i< (subjectname.length)/(student_id.length);i++)
           {

           	 str+= '"'+subjectname[pos]+'"' +':'+marks[pos]+',';
           	 pos++;
           }
            str=str.slice(0, -1);
            str+= '}'

            var data={
              student_id : student_id[k],
              class_id  			    : class_id,
              exam_id    				: exam_id,
              section_id 				: section_id,
              subject_id                : subject_id,
              mark_total				: marks_total[k],
              marks_obtained			: marks_obtained[k],
              marks                     : str ,
              year                      : req.session.session_year,
              subject_type              : subject_type,
              exam_code                 : exam_code
             }


			var table   = {tablename:'tbl_marks'};
				
	  			admin.getMarks(table,{student_id:student_id[k],class_id:class_id,section_id:section_id,subject_id:subject_id,exam_id:exam_id},function(err, result1){
	  				//console.log(result1);
	  				if(result1!=''){
	  					//console.log('SDssdds')
	  					var id = result1[0].mark_id
	  					var findObj = {};
			     
			         	findObj['mark_id'] = id;
			
					     admin.deletewhere(table,findObj,function(err,result){

					     });
	  				}
	  			});
			 var table  = {tablename:'tbl_marks'}
			 admin.insert_all(table,data,function(err, result){

			 })
		 
          }
			res.redirect('/manage_marks');	
			
    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});


/*
**  ##################  Tabulation Sheets  #####################
*/
router.get("/getMarksExamNameList", function(req, res){
	if(req.session.user_role==1){
		var class_id 	= req.query.class_id
		var section_id 	= req.query.section_id
		var session_year=  req.session.session_year; 

			table={tbl_exam_master:"tbl_exam_master",tbl_marks:"tbl_marks" }
	 		admin.get_marks_exam_list(table,{class_id:class_id,section_id:section_id,session_year:session_year},{orderby:'exam_name',order:'ASC'},function(err,result){
	 			var exam_list=result
                res.send({exam_list:exam_list});
	 		})
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.get("/getTabulateMarksList",function(req,res){

   if(req.session.user_role==1){
		var class_id 	= req.query.class_id
		var section_id 	= req.query.section_id
		var exam_id 	= req.query.exam_id
		var session_year=  req.session.session_year; 
		var exam_code   =  req.query.exam_code

			
        table={tablename:"tbl_marks"}  
        admin.findmarksheetstudent(table,{class_id:class_id,section_id:section_id,exam_id:exam_id,year:session_year},function(err,result){

              tabulation_list=result;
              tabulardata={};
              key="data";
              tabulation_list.forEach(function(item, index){
		 	 	  tabulation_list[index].marksheet=[];
		 	 	  tabulation_list[index].otherexammarksheet=[];
		 	 	  tabulation_list[index].student_name='';
		 	 	  tabulation_list[index].admission_number='';
		 	   });
               n=0 ; 
          
			   async.each(tabulation_list, function (item, done) 
			   {
                   student_id=item.student_id;
                    table={tbl_marks:"tbl_marks",tbl_registration:"tbl_registration",tbl_exam_grades:"tbl_exam_grades",tbl_subject:"tbl_subject" } 	
	 		        admin.get_exam_marks_list(table,{student_id:student_id,exam_code:exam_code,class_id:class_id,section_id:section_id,exam_id:exam_id,session_year:session_year},{orderby:'name',order:'ASC'},function(err,result){

                        if(result!=''){
	                        marksheet='';otherexammarksheet='';
	                        result.forEach(function(item, index){
	                        	if(item.subject_type==1)
					    		  marksheet += item.subject_name+'='+item.marks +'^';
					    		else
					    		 otherexammarksheet += item.subject_name+'='+item.marks +'^';	
					    	});

					    	marksheet =marksheet.substring(0, marksheet.length - 1)
					    	otherexammarksheet=otherexammarksheet.substring(0, otherexammarksheet.length - 1)
	                        tabulation_list[n].marksheet    = marksheet;
	                        tabulation_list[n].otherexammarksheet=otherexammarksheet;
	                        tabulation_list[n].student_name = result[0].student_name;
	                        tabulation_list[n].admission_number = result[0].admission_number;
	                         n++;
	                      done(null);
                     	}
                     	else
                     	{

                     	}


	 		        }); 
			   },function(){
                 console.log('$$$$$$$$$$$$$$$$$',tabulation_list);
			   	  var table = {tablename : 'tbl_exam_grades'}
				  admin.findWhere(table,{class_id:class_id,exam_id:exam_id},function(err,result){
			 			    var  gradelist = result;
			 			    res.send({tabulation_list:tabulation_list,gradelist:gradelist});
			    	});
			   	
			   });
          });
             // return false;
 	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.get("/getMarsksheet",function(req,res){

   if(req.session.user_role==1){
		var class_id 	 = req.query.class_id
		var section_id 	 = req.query.section_id
		var exam_id 	 = req.query.exam_id
		var session_year = req.session.session_year; 
		var student_id   = req.query.student_id;
		var exam_code   =  req.query.exam_code
			
          table={tablename:"tbl_marks"}  
          admin.findmarksheetstudent(table,{student_id:student_id,class_id:class_id,section_id:section_id,exam_id:exam_id,year:session_year},function(err,result){
              

               tabulation_list=result;
               tabulardata={};
               key="data";
                

              tabulation_list.forEach(function(item, index){
		 	 	  tabulation_list[index].marksheet=[];
		 	 	  tabulation_list[index].student_name='';
		 	 	  tabulation_list[index].otherexammarksheet=[];
		 	 	  //tabulation_list[index].FA1+FA2_20percentage=''
		 	   });
               n=0 ; 
			   async.each(tabulation_list, function (item, done) 
			   {
                   student_id=item.student_id;
                   //console.log('studenntttttttttttttt',student_id);
			   	  //var table = {tablename : 'tbl_marks'}
	 		         //admin.findWhere(table,{student_id:student_id,class_id:class_id,exam_id:exam_id},function(err,result){
	 		      table={tbl_marks:"tbl_marks",tbl_registration:"tbl_registration",tbl_exam_grades:"tbl_exam_grades",tbl_subject:"tbl_subject" } 	
	 		      admin.get_averge_marks_FA1FA2(table,{student_id:student_id,class_id:class_id,section_id:section_id,exam_id:exam_id,session_year:session_year},{orderby:'name',order:'ASC'},function(err,FA1FA2){ 
                     
                       //console.log('###############',FA1FA2[0].average);

                       var AVG= FA1FA2[0].average;
                          
	 		         admin.get_exam_marks_list(table,{student_id:student_id,exam_code:exam_code,class_id:class_id,exam_id:exam_id,session_year:session_year,section_id:section_id},{orderby:'name',order:'ASC'},function(err,result){
	 		   	
                         console.log('New-------------',result);

                        marksheet='';
                        result.forEach(function(item, index){
                        	otherexammarksheet="";
				    		 //marksheet += item.subject_name+'='+item.marks +'^';
				    		if(item.subject_type==1)
				    		  {
                                if(item.exam_code=='SM1' || item.exam_code=='SM2')
				    		    { 
				    		    	//marksheet += item.subject_name+'='+FA1FA2[0].average +'^'; 
				    		    	jj= JSON.parse(item.marks)
				    		    	
				    		    	jj["FA1+FA2_20percentage"]=AVG
                                
				    		        marksheet+= item.subject_name+'='+JSON.stringify(jj)+'^'; 
				    		    	

				    		    }
				    		    else
				    		       marksheet += item.subject_name+'='+item.marks +'^';
				    		    

                               // if(item.exam_code=='SM1' || item.exam_code=='SM2')
				    		   //  { 
				    		   //  	//marksheet += item.subject_name+'='+FA1FA2[0].average +'^'; 
				    		   //  	jj= JSON.parse(item.marks)
				    		   //  	jj.forEach(function(item, index){
				 	 		 	 	//   jj[index].ffff='';
							 	    // });

				    		   //  	//jj[1].fff=111;
				    		   //  	jj[1].ffff='11111';

				    		   //  }
				    		   //  console.log(jj);
				    		   //  return false;
				    		  
				    		  }
				    		else
				    		 {
				    		 	//console.log('---------------',item.marks)
				    		 	 otherexammarksheet += item.subject_name+'='+item.marks +'^';	
								 otherexammarksheet=otherexammarksheet.substring(0, otherexammarksheet.length - 1)
                                 tabulation_list[n].otherexammarksheet=otherexammarksheet;
                                 tabulation_list[n].FA1FA2 = FA1FA2[0].average;
				    		 } 

				    	});
				    	
				    	marksheet =marksheet.substring(0, marksheet.length - 1)
                        tabulation_list[n].marksheet    = marksheet;

                        tabulation_list[n].student_name = result[0].student_name;
                        n++;
                      done(null);
	 		        }); 
	 		      });   
			   },function(){
                 console.log('NEW$$$$$$$$$$$$$',tabulation_list);
			   	  var table = {tablename : 'tbl_exam_grades'}
				  admin.findWhere(table,{class_id:class_id,exam_id:exam_id},function(err,result){
				  	    var table_marks  ={ tablename : 'tbl_exam_master' };
				  	       admin.findWhere(table_marks,{class_id:class_id,exam_id:exam_id},function(err,exam_date){
				  	       	    var exam_date = exam_date[0].created_date;

				  	       	    var check = moment(exam_date, 'YYYY/MM/DD');

								var month = check.format('M');
								var day   = check.format('D');
								var year  = check.format('YYYY');
								if(month=12){
									var next_month  = 1;
								}else{
									var next_month  = parseInt(month) +parseInt(1);
								}	
								var last_date = moment(next_month, "MM").daysInMonth();
								var first_start_date = "01-"+month+"-"+year;
								var first_end_date 	 = last_date+"-"+next_month+"-"+year;

								console.log(first_start_date);
								console.log(first_end_date);
								console.log(month);
								console.log(day);
								console.log(year);
								var table_attendence = {tablename : 'tbl_attendance'}
								admin.getTotalAttendence(table_attendence,{class_id:class_id,section_id:section_id,student_id:student_id,first_start_date:first_start_date,first_end_date:first_end_date},function(err,total_attendence){
									//console.log(total_attendence);
									var working_days = total_attendence[0].total_attendence;
									admin.getPresentAttendence(table_attendence,{class_id:class_id,section_id:section_id,student_id:student_id,first_start_date:first_start_date,first_end_date:first_end_date},function(err,present_days){
										var present_days  = present_days[0].present_attendance;
			 			    			var  gradelist = result;
			 			    			res.send({tabulation_list:tabulation_list,gradelist:gradelist,working_days:working_days,present_days:present_days});
			 			    		});
			 			    	});

			 				});
			    	});
			   	
			   });
			    
                      
          });
              
              return false;
 	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

/***********/


router.get("/tabulation_sheet", function(req, res){
	if(req.session.user_role==1){
		
		var table  = 'tbl_class';
	
		admin.findAll({table:table},function(err, result){
		    var class_list 	 = result;
			var pagedata 	 = {Title : "", pagename : "admin/tabulation_sheet", message : req.flash('msg'),class_list:class_list,tabulation_list:""};
			res.render("admin_layout", pagedata);
		});
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});
/*
**  ################## #####################
*/
router.get("/getStudentAllDetail", function(req, res){
	if(req.session.user_role==1){
		var class_id 	= req.query.class_id
		var section_id	= req.query.section_id
	   	var subject_id  = req.query.subject_id
	   	var exam_id     = req.query.exam_id
	   	var subject_type= req.query.subject_type
	   	//var exam_code   = req.query.exam_code


	    var table  		= {tablename:'tbl_enroll'};
        	var student_detail  = ''; 
        	var n 			= 0;    
			admin.getStudentsformarks(table,{class_id:class_id,section_id:section_id},function(err, result){

				var student_detail  = result;
				async.each(student_detail, function (item, done) {

					var student_id = item.registration_id;
			 	  	var tbl_marks = {tablename : 'tbl_marks'}
	                var session_year = req.session.session_year;  
					admin.findWhere(tbl_marks,{year:session_year,student_id:student_id,class_id:class_id,section_id:section_id,subject_id:subject_id,exam_id:exam_id},function(err, result1){
					var table  = {tablename:'tbl_marks'};
					var session_year = req.session.session_year;

                        //admin.getstudentexammarks(table,{session_year:session_year,student_id:student_id,class_id:class_id,section_id:section_id,subject_id:subject_id,exam_id:exam_id},function(err, student_marks){
						  var tbl_formats = {tablename : 'tbl_sheet_formats'}

                            admin.getcolumnformat(tbl_formats,{class_id:class_id,exam_id:exam_id},function(err, result2){

                              if(result1==undefined || result1=='')
                              {
                                  	
							  		if(subject_type==0)
							  		     student_detail[n].marks = result2[0].otheracivity;
							  		else
							  		 	student_detail[n].marks  = result2[0].column;

							  }else{
								  		   
								  	  //if(subject_type==0)
								  	  //   student_detail[n].marks=result1[0].othermarks;
								  	 // else
								  	   	 student_detail[n].marks=result1[0].marks;

							  }
                          	 n++;
						    done(null);
                           });
                        });

				}, function(){
					console.log('Detail of marksssss---- ',student_detail);
					 
					 
				var table_exam 		= {tablename:'tbl_exam_schedule'};
				admin.getexammarks(table_exam,{class_id:class_id,section_id:section_id,subject_id:subject_id,exam_id:exam_id},function(err,result1){

			    		res.send({student_detail:student_detail,total_marks:result1})
			    	});					
				});
			});
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

/* 
**** Question Paper 
*/
router.get("/QuestionPaper", function(req, res){
	if(req.session.user_role==1){
		var table  = 'tbl_class';
	
		admin.findAll({table:table},function(err, result){
		    var class_list 	 = result;

		    var table = 'tbl_question_paper';
	 
			 admin.findquestionpaper({table:table},function(err, result){

			    var question_paper_list 	 = result;
				var pagedata 	 	 = {Title : "", pagename : "admin/questionpaper", message : req.flash('msg'),question_paper_list:question_paper_list,class_list:class_list};
				res.render("admin_layout", pagedata);
			});
			
		});
    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.post("/QuestionPaper", function(req, res){
  if(req.session.user_role==1){

  	var class_id            = req.body.class_id;
  	var section_id          = req.body.exam_section_id;
  	var subject_id  		= req.body.subject_id;
  	var exam_id  		    = req.body.exam_id;
  	var moment 				= require('moment');
	var dates 				= moment().format('YYYY-MM-DD:hh:mm:ss');
  	
  	var file = req.files.quesionpaper_file;
  	var data = [];


  		 
  		file1= file;
  		var newname = changename(file.name);
		var filepath = path.resolve("public/question_paper/"+newname);
		
		file1.mv(filepath, function(err){
			if(err){
				console.log(err);
				return;
			}
		});
		
  		 data = {
  		 	class_id 			: class_id,
  		 	section_id			: section_id,
  		 	subject_id 			: subject_id,
  			file_name     	    : newname,
  			created_date	    : dates
  		}
  		var table   = {tablename:'tbl_question_paper'};
  	
  		admin.insert_all(table,data,function(err, result){
			
		});	

  		var table  = 'tbl_class';
	
		admin.findAll({table:table},function(err, result){
		    var class_list 	 = result;
		    var table = 'tbl_question_paper';
			admin.findquestionpaper({table:table},function(err, result){
			 	//console.log(result);
			    var question_paper_list 	 = result;
				var pagedata 	 	 = {Title : "", pagename : "admin/questionpaper", message : req.flash('msg'),question_paper_list:question_paper_list,class_list:class_list};
				res.render("admin_layout", pagedata);
			});
		});
     }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

/* Send Mark SMS to parent & students */

router.get("/sendmarks", function(req, res){
	if(req.session.user_role==1){

		var table  = 'tbl_class';
		admin.findAll({table:table},function(err, result){
		    var class_list 	 = result;
		    var exam_table   = 'tbl_exam_master';
		    admin.findExam({table:exam_table},function(err, exam_list){
		    	
		       var exam_list    = exam_list

               var pagedata 	 = {Title : "", pagename : "admin/sendmarks", message : req.flash('msg'),class_list:class_list,exam_list:exam_list};
			   res.render("admin_layout", pagedata);
			});
		});
    }else{
	        admin.select(function(err,result){
		    res.render('admin/index',{error : req.flash('msg')});
		 	});
	}
});
router.post("/sendmarks", function(req, res){
	if(req.session.user_role==1){
        
        class_id= req.body.class_id;
        section_id= req.body.exam_section_id;
        exam_id= req.body.exam_id
        session_year=req.session.session_year
        user_role = req.session.user_role 

        table= {tbl_marks:'tbl_marks',tbl_registration:'tbl_registration',tbl_class:'tbl_class'}
        obj = {class_id:class_id,section_id:section_id,exam_id:exam_id,session_year:session_year}
        admin.find_marks_receiver_sms(table,obj,function(err,result){
           
           student_list=result;

          async.each(student_list,function(item,done) {
                 
            obtained =item.marks_obtained;     
            student_name= item.name
            phone = item.phone

            if(user_role==2) //parent 
	          {
                 parent_id =item.parent_id
                 var table = {tablename:'tbl_registration'};

			     admin.findWhere(table,{registration_id:parent_id},function(err, result){

			     	if(result.length>0)
			     	{
			     		phone = result[0].phone
			     	}


			     });
	          }
	          else
	          {

	          }

          },function(){
            var table  = 'tbl_class';
				admin.findAll({table:table},function(err, result){
				    var class_list 	 = result;
				    var exam_table   = 'tbl_exam_master';
				    admin.findExam({table:exam_table},function(err, exam_list){
				    	
				       var exam_list    = exam_list

		               var pagedata 	 = {Title : "", pagename : "admin/sendmarks", message : req.flash('msg'),class_list:class_list,exam_list:exam_list};
					   res.render("admin_layout", pagedata);
					});
				});
          });
             
 
        });
        
     		 
    }else{
	        admin.select(function(err,result){
		    res.render('admin/index',{error : req.flash('msg')});
		 	});
	}
});



router.get("/user_rights", function(req, res){
	if(req.session.user_role==1){
		var table  = 'tbl_class';
	
		admin.findAll({table:table},function(err, result){
		    var class_list 	 = result;

		    var table = 'tbl_rights_menu';
	 
			 admin.findAll({table:table},function(err, result){

			 	console.log(result);
			    var user_rights 	 = result;
			    var table_role  = 'tbl_userrole'
			    admin.findAll({table:table_role},function(err, result){
			    	var user_role   = result;
					var pagedata 	 	 = {Title : "", pagename : "admin/user_rights", message : req.flash('msg'),user_rights:user_rights,class_list:class_list,user_role:user_role};
					res.render("admin_layout", pagedata);
				});
			});
			
		});
    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});



router.get("/matchperentdetail", function(req, res){
	if(req.session.user_role==1){
		var phone =req.query.phone
		var email =req.query.email
	    var table = {tablename:'tbl_registration'};
			admin.findWhere(table,{phone:phone,email:email},function(err, result){
			 	var email_list = result;
			 	
			 	 //console.log(email_list);
			 	 //res.send({parent_email:email_list});

				
			 	//res.send('Gaurav');
			});
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});


router.get("/setting", function(req, res){
	if(req.session.user_role==1){

		var table  = 'tbl_setting';
	    var current_setting = "";
		admin.findAll({table:table},function(err, result){
		    var current_setting 	 = result;

			var pagedata 	 = {Title : "", pagename : "admin/setting", message : req.flash('msg'),current_setting:current_setting};
			res.render("admin_layout", pagedata);
		});

    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});
router.post("/setting", function(req, res){
	if(req.session.user_role==1){
		

  	var school_name         = req.body.school_name;
  	var session_year  		= req.body.session_year;
  	var school_address      = req.body.school_address;

  	var phone       		= req.body.phone;
	var updated_at = moment().format('YYYY-MM-DD:hh:mm:ss');
  	
  	var file = req.files.file;
  	
  
  	var image= '';
  	if(typeof file=="undefined"){

  			var image = '';
  	}else{
	  	var newname = changename(file.name);
	  	var filepath = path.resolve("public/images/"+newname);
	  		file.mv(filepath, function(err){
				if(err){
					console.log(err);
					return;
				}
			});

	    var image = newname
	}
		
	var	data = {
  		 	school_name 	: school_name,
  		 	session_year 	: session_year,
  			school_address  : school_address,

  			phone 			: phone,
  			logo     	    : image,
  			updated_at	    : updated_at
  		}

  		var table   = {tablename:'tbl_setting'};
  	    var where='';
  	    admin.updateWhere(table,where,data, function(err, result){
           if(result)
           {	
	            if(image)
	  		  	  req.session.logo 				= image;
	  		  	if(session_year)
	  		  	  req.session.session_year 		= session_year;
	  		  	if(school_name)
	  		  	  req.session.school_name 		= school_name;
	  		  	if(school_address)
	  		  	  req.session.school_address 	= school_address; 
	  		  	if(phone)
	  		  	  req.session.phone 			= phone; 
			   res.redirect('/setting')  
		   }

        });
    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

/** Send Message ********* */
router.get("/sendmessage", function(req, res){
	if(req.session.user_role==1){
		var table  = 'tbl_class';
	
		admin.findAll({table:table},function(err, result){
		   var class_list 	 = result;

		    table={tablename:'tbl_registration'};
	     	var findObj = {user_role:4}
	     	admin.findWhere(table,findObj,function(err,result){
               teacher_list= result;
              
               
               table={tablename:'tbl_registration'}
               var findObj = {user_role:2}
               admin.findWhere(table,findObj,function(err,result){

                 parent_list= result;
                  //console.log(parent_list);
            	 var pagedata 	 	 = {Title : "", pagename : "admin/sendmessage", message : req.flash('msg'),class_list:class_list,teacher_list:teacher_list,parent_list:parent_list};
		         res.render("admin_layout", pagedata);

               });


		    });

		});
    }else{
	       admin.select(function(err,result){
		      res.render('admin/index',{error : req.flash('msg')});
  	 	   });
	}
});
router.post("/sendmessage",function(req,res){
	//console.log(req.body);
   if(req.session.user_role==1)
    {
      var table = {tbl_registration:'tbl_registration',tbl_enroll:'tbl_enroll'};
      session_year =req.session.session_year

      if(req.body.class_id=="daysscholler")
      {
        where= {condition:'tbl_registration.dormitory_id=0',session_year:session_year}
      }
      else if(req.body.class_id=="hostels")
      {
        where= {condition:'tbl_registration.dormitory_id!=0',session_year:session_year}
      }
      else if(req.body.class_id=="Tstff")
      {
      	var where= {staff_category:'T',user_role:4}
      }
      else if(req.body.class_id=="Nstff")
      {
      	var where= {staff_category:'N',user_role:4}
      }
      else if(req.body.class_id=="ALLT")
      {
        var where= {user_role:4}
      }
      else if(req.body.class_id=="ALLP")
      {
        var where= {user_role:2}
      }
      else 
      {
        where= {registration_id:req.body.class_id}
      }
       
      if(req.body.page=='studentpage') 
       {
          admin.getalldaysscholler(table,where,function(err, result){
       
           	message = req.body.descriptionstudent.replace(/<\/?p>/g,'')
            mobileNo='';
	    	senderdata= JSON.parse(JSON.stringify(result[0]));
             
	    	result.forEach(function(item, index){
	    		if(result[index].phone && result[index].phone!='undefined')
	    		  mobileNo += result[index].phone+',';
	    	});
	    	mobileNo= mobileNo.substring(0, mobileNo.length - 1)
	    	//var mobileNo = [ "XXXXXXXXXX", "XXXXXXXXXX", "XXXXXXXXXX" ];
			//var mobileNo =  "XXXXXXXXXX,XXXXXXXXXX,XXXXXXXXXX";
			msg91.send(mobileNo, message, function(err, response){
              res.redirect('/sendmessage');
			});

	      });	
       }
       else if(req.body.page=='teacherpage') 
       {
       	    var table = {tablename:'tbl_registration'};
            admin.findWhere(table,where,function(err, result){
            message = req.body.descriptionteacher.replace(/<\/?p>/g,'')
            mobileNo='';
	    	senderdata= JSON.parse(JSON.stringify(result[0]));
	    	result.forEach(function(item, index){
	    		if(result[index].phone && result[index].phone!='undefined')
	    		  mobileNo += result[index].phone+',';
	    	});
	    	mobileNo= mobileNo.substring(0, mobileNo.length - 1)
	    	//var mobileNo = [ "XXXXXXXXXX", "XXXXXXXXXX", "XXXXXXXXXX" ];
			//var mobileNo =  "XXXXXXXXXX,XXXXXXXXXX,XXXXXXXXXX";
		      msg91.send(mobileNo, message, function(err, response){
				res.redirect('/sendmessage');
			  });
              
            });
       }
       else if(req.body.page=='parentpage')
       {
       	    var table = {tablename:'tbl_registration'};
            admin.findWhere(table,where,function(err, result){
            message = req.body.descriptionparent.replace(/<\/?p>/g,'')
            mobileNo='';
	    	senderdata= JSON.parse(JSON.stringify(result[0]));
	    	result.forEach(function(item, index){
	    		if(result[index].phone && result[index].phone!='undefined')
	    		  mobileNo += result[index].phone+',';
	    	});
	    	mobileNo= mobileNo.substring(0, mobileNo.length - 1)
	    	//console.log(mobileNo);
	    	//var mobileNo = [ "XXXXXXXXXX", "XXXXXXXXXX", "XXXXXXXXXX" ];
			//var mobileNo =  "XXXXXXXXXX,XXXXXXXXXX,XXXXXXXXXX";
		      msg91.send(mobileNo, message, function(err, response){
				res.redirect('/sendmessage');
			  });
              
            });
       }
 	}
   else
 	{

        admin.select(function(err,result){
		      res.render('admin/index',{error : req.flash('msg')});
  	 	   });
 	}
});

/* Import Bulk Record of student */ 
 
router.get("/bulkimport",function(req,res){

	if(req.session.user_role==1)
    {
     //posts= {"userId": 9,"id": 82,"title": "A very useful title, they say.","body": "I am a useless body"};

    //stringify(posts, { header: true }).pipe(res);
    

       var pagedata 	 	 = {Title : "", pagename : "admin/bulkimport", message : req.flash('msg'),rejected_list:''};
	   res.render("admin_layout", pagedata);

	}
	else
	{
        admin.select(function(err,result){
		      res.render('admin/index',{error : req.flash('msg')});
  	 	   });
	}   
});

router.post("/bulkimport",function(req,res){
      	var file = req.files.bulkfile;
  		var newname = changename(file.name);
		var filepath = path.resolve("public/bulkimport/"+newname);
			
		file.mv(filepath, function(err)
		{
				if(err){
					console.log(err);
					return;
				}
		});
		var csvfile = __dirname + "/../public/bulkimport/"+newname;

  
 
     var csvData=[];
  	  fs.createReadStream(csvfile)
 //delimiter: ':',
		    .pipe(parse({headers: false,columns:true}))
		    .on('data', function(csvrow) {
		    	//console.log(csvrow);
		        csvData.push(csvrow); 

		    })
		    .on('end',function() {
               
               n=0;
               var table      = {tablename:'tbl_registration'};
               
                var rejected   =[]; 

              csvData.forEach(function(item, index){
		 	 	  csvData[index].rejection_reason="";
		 	 	  // csvData[index].existing_student_email="";
		 	 	  // csvData[index].existing_student_parent="";
		 	 	  // csvData[index].existing_admission_number="";
		 	   });
               async.eachSeries(csvData, function (item, done) 
			   {
                  var existparentid=0;existstudentid=0;

                  record={parent_email:item.parent_email,parent_phone:item.parent_phone,admission_number:item.admission_number,student_email:item.student_email,student_phone:item.student_phone}  
                  //record={parent_email:item.parent_email,parent_phone:item.parent_phone}  
                  console.log(record);
			 	  admin.checkrecordexist(table,record,function(err , resultexist){
			 	   

                      //console.log('check parent register ',resultexist.parent_id);  

                     if(resultexist.parent_id==0)
                     {
                     	 var data = {
						 		name 		 :item.parent_name,	 		
						 		address		 :item.parent_address,
						 		phone		 :item.parent_phone,
						 		email		 :item.parent_email,
						 		user_role    :2,
						 		created_date :moment().format('YYYY-MM-DD:hh:mm:ss')
					 		}
                     }
                     else
	                   {
	                   	  data={};
	                  	  existparentid=resultexist.parent_id
	                   } 
                      //console.log('----parent register-----', data); 
				 	 admin.insert_all(table,data,function(err, result){
                        
                         if(resultexist.parent_id==0)  
				 		     var registration_id 	= result;
				 		 else
				 		 	 var registration_id 	= resultexist.parent_id;

				 		var login_table  	    = {tablename:'tbl_userlogin'};
				 		var parent_password     = sha1(item.parent_password)
				 		//console.log('check parent enroll ',resultexist.parent_id);
                         if(resultexist.parent_id==0)
                         {  
                      	   var login_data= {
								 			registration_id  : registration_id,
								 			 email           : item.parent_email,
								 			 password        : parent_password,
								 			 user_role       : 2
				 		 			    }
                          
                           }
                           else
                           { 
                                var login_data= {};
                           }
                         //console.log('----parent enroll-----', login_data);
                       
				 		  admin.insert_all(login_table,login_data,function(err, result){

				 		  });
				 	    
				 		 //console.log('check student register ',resultexist.student_id);
                         //console.log('parent id',registration_id)
				 		 if(resultexist.student_id==0)
				 		 {
				 		 	var student_data = {
						 			admission_number :item.admission_number,
							 		name 		 :item.student_name,	 		
							 		caste		 :item.caste,
							 		subcaste     :item.sub_caste,
							 		dob          :item.student_dob,
							 		sex			 :item.student_gender,
							 		address		 :item.address,
							 		phone		 :item.student_phone,
							 		email		 :item.student_email,
							 		dormitory_id :item.dormitory_id,
							 		transport_id :item.transport_id,
							 		aadhar_number:item.aadhar_number,
							 		blood_group  :item.blood_group,
							 		mother_name  :item.mother_name,
							 		parent_id    :registration_id,
							 		user_role    :3,
							 		created_date :moment().format('YYYY-MM-DD:hh:mm:ss')
							 	}
							 	//console.log(student_data);
				 		 }
				 		 else
				 		 {
				 		 	student_data = {};
				 		 	existstudentid= resultexist.student_id
				 		 	if(resultexist.admission_number!=0)
				 		 	  item.rejection_reason='Repeated Admission Number'
				 		 	else
				 		 	  item.rejection_reason='Repeated phone Or Email'	
				 		 	rejected[n]=item;

				 		 }
 					 	admin.insert_all(table,student_data,function(err, result){
					 			var registration_id  = result
					 			var student_password = sha1(item.student_password)
                                //console.log('check student enroll ',resultexist.student_id);
                                 if(resultexist.student_id==0)
                                 {
                                 	var login_data   = {
							 			registration_id : registration_id,
							 			email           : item.student_email,
							 			password        : student_password,
							 			user_role       : 3

							 		}
							 		
                                 }
                                 else
                                 {
                                     login_data   = {};
                                 } 
                                  
						 		admin.insert_all(login_table,login_data,function(err, result){

						 		});

                                admin.getclass_id_sectionid({class_name:item.class_name,section_name:item.section_name},function(err,result){
							 		var enroll_table  = {tablename:' tbl_enroll'}
							 		//console.log('check student enroll ',resultexist.student_id);
							 		if(resultexist.student_id==0)
							 		{
							 			var enroll_data   = {
						 					registration_id  : registration_id,
						 					class_id         : result[0].class_id,
						 					section_id  	 : result[0].section_id,
						 					session_year     : req.session.session_year,
						 					created_date      :moment().format('YYYY-MM-DD:hh:mm:ss')
						 				}
						 				//console.log('enroll_data',enroll_data);
							 		}
							 		else{
							 			var enroll_data   = {};
							 		} 
					 				
						 			admin.insert_all(enroll_table,enroll_data,function(err, result){
						 					//console.log('rejected',rejected);
	 										//var pagedata = {Title : "", pagename : "admin/bulkimport", message : req.flash('msg'),rejected:rejected[0]};
		   									//res.render("admin_layout", pagedata);
		   								  
					                          
								 	});
					 			   
				 			    })
				 		});
				 		 
					 });
				    
				    done(null);
				     n++;
				   })//check parent exit End 
			 	
			    },function(){
			    	 console.log(rejected);
                      var fields= ['student_name','student_gender','caste','sub_caste','class_name','section_name','aadhar_number','student_dob','transport_id','dormitory_id','student_phone','student_email','student_password','blood_group','admission_number','parent_name','mother_name','parent_address','parent_phone','parent_email','parent_password']

                          const json2csvParser = new Json2csvParser({ fields });
                          const csv = json2csvParser.parse(rejected);
 
						  res.setHeader('Content-disposition', 'attachment; filename=rejected.csv');
						  res.set('Content-Type', 'text/csv');
						  res.status(200).send(csv);

			    	  var pagedata 	 	 = {Title : "", pagename : "admin/bulkimport", message : req.flash('msg'),rejected_list:rejected};
	                  res.render("admin_layout", pagedata);	
                      //res.send({rejected:rejected});
			  }); // asyn close 

		    });

        
});

/* Import Bulk Record of student */ 
router.post("/frontend_setting", function(req, res){
	if(req.session.user_role==1){
		

  	var type         		= req.body.type;
  	if(type =='about_us'){
  		var about_us   = req.body.about_description;

  		var data       = {
  			about_us   : about_us
  		}

  		var table   = {tablename:'tbl_setting'};
  	    var where='';
  	    admin.updateWhere(table,where,data, function(err, result){
  	    	res.redirect('/website')  
  	    });
  	}else if(type =='terms_conditions'){
  		var terms_description   = req.body.terms_description;

  		var data       = {
  			terms_conditions   : terms_description
  		}

  		var table   = {tablename:'tbl_setting'};
  	    var where='';
  	    admin.updateWhere(table,where,data, function(err, result){
  	    	res.redirect('/website')  
  	    });
  	}else if(type=='privacy_policy'){
  		var privacy_description   = req.body.privacy_description;

  		var data       = {
  			privacy_policy   : privacy_description
  		}

  		var table   = {tablename:'tbl_setting'};
  	    var where='';
  	    admin.updateWhere(table,where,data, function(err, result){
  	    	res.redirect('/website')  
  	    });
  	}else if(type=='notice_board'){
  		 
  		var file = req.files.file;
  	
  		
	  	var image= '';
	  	if(typeof file=="undefined"){

	  			var image = '';
	  	}else{
		  	var newname = changename(file.name);
		  	var filepath = path.resolve("public/images/"+newname);
		  		file.mv(filepath, function(err){
					if(err){
						console.log(err);
						return;
					}
				});

		    var image = newname
		}	
		
  		var fd = req.body.date;
		var fromDate = fd.split(" ");
		var dates    = formatDate(fromDate[0],fromDate[1] + " " + fromDate[2]);// 
  		
  		var data  = {
  		 	notice_title    : req.body.title,
  		 	notice          : req.body.notice,
  		 	notice_date		: dates,
  		 	show_on_website	: req.body.show_website,
  		 	created_date    : moment().format('YYYY-MM-DD:hh:mm:ss'),
  		 	image           : image
  		}

  		var table  = {tablename:'tbl_noticeboard'} 
  		if(req.body.notice_id){
	  		    var obj      =  {
			  		 	notice_title    : req.body.title,
			  		 	notice          : req.body.notice,
			  		 	notice_date		: dates,
			  		 	show_on_website	: req.body.show_website,
			  		 	image           : image
			  		}
		        var where    = {notice_id:req.body.notice_id}
		        
		        admin.updateWhere(table,where,obj, function(err, result){  
		      	
		      	if(result)
	            {	
	                 res.redirect('/website');
	            }
	    });
	  		
  		}else{
	  			admin.insert_all(table,data,function(err, result){
		  			res.redirect('/website')
		  		});
  		}


  	}else if(type=='events'){
  		 
  		
  		var fd = req.body.event_date;
		var fromDate = fd.split(" ");
		var dates    = formatDate(fromDate[0],fromDate[1] + " " + fromDate[2]);// 
  		
  		var data  = {
  		 	title    		: req.body.title,
  		 	status          : req.body.status,
  		 	event_date		: dates,
  		 	created_date    : moment().format('YYYY-MM-DD:hh:mm:ss'),
  		 	
  		}

  		var table  = {tablename:'tbl_frontend_events'} 
  		if(req.body.event_id){
	  		    var obj      =  {
			  		 	title    		: req.body.title,
  		 				status          : req.body.status,
  		 				event_date		: dates,
			  		}
		        var where    = {frontend_events_id:req.body.event_id}
		        
		        admin.updateWhere(table,where,obj, function(err, result){  
		      	
		      	if(result)
	            {	
	                 res.redirect('/website');
	            }
	    });
	  		
  		}else{
	  			admin.insert_all(table,data,function(err, result){
		  			res.redirect('/website')
		  		});
  		}


  	}else if(type =='settings'){
  		
  		var school_title       	= req.body.school_title;
  		var school_email   		= req.body.school_email;
  		var phone          		= req.body.phone;
  		var fax  		   		= req.body.fax;
  		var copyright_text 		= req.body.copyright_text;
  		var address  	   		= req.body.address;
  		var geo_code	   		= req.body.geo_code;
  		var recaptcha_site_key  = req.body.recaptcha_site_key;

  		var header_logo = req.files.header_logo;
  	

	  	var header_logo_image= '';
	  	if(typeof header_logo=="undefined"){

	  			var header_logo_image = '';
	  	}else{
		  	var newname = changename(header_logo.name);
		  	var filepath = path.resolve("public/images/"+newname);
		  		header_logo.mv(filepath, function(err){
					if(err){
						console.log(err);
						return;
					}
				});

		    var header_logo_image = newname
		}	

		var footer_logo = req.files.footer_logo;
  	
  		
	  	var footer_logo_image= '';
	  	if(typeof footer_logo=="undefined"){

	  			var footer_logo_image = '';
	  	}else{
		  	var ff = changename(footer_logo.name);
		  	var filepath = path.resolve("public/images/"+ff);
		  		footer_logo.mv(filepath, function(err){
					if(err){
						console.log(err);
						return;
					}
				});

		    var footer_logo_image = ff
		}	

  		var data       = {
				school_title        : school_title,
				school_email	    : school_email,
				phone     			: phone,
				fax 				: fax,
				copyright_text		: copyright_text,
				address 			: address,
				geo_code		    : geo_code,
				recaptcha_site_key  : recaptcha_site_key,
				header_logo 		: header_logo_image,
				footer_logo 		: footer_logo_image
   		 		}

  		var table   = {tablename:'tbl_frontend_settings'};
  	    var where='';
  	    admin.updateWhere(table,where,data, function(err, result){
  	    	res.redirect('/website')  
  	    });

  	}else if(type =='slider'){
  		var title       = req.body.slider_title;
  		var description = req.body.slider_description;
  		var files       = req.files;
  		console.log(files);
  		async.forEachOf(title, function(item, key, callback){
  			var image  = '';
  			var slider = req.files.slider_image;
  			if(slider!="undefined"){
			    if(slider.length>1){
  				

	  				var slider_image = req.files.slider_image[key];
	  	
	  		
				  	var image= '';
				  	if(typeof slider_image=="undefined"){

				  			var image = '';
				  	}else{
					  	var ff = changename(slider_image.name);
					  	var filepath = path.resolve("public/images/"+ff);
					  		slider_image.mv(filepath, function(err){
								if(err){
									console.log(err);
									return;
								}
							});

					    var image = ff
					}	
				}else{
					var slider_image = req.files.slider_image;
	  	
	  		
				  	var image= '';
				  	if(typeof slider_image=="undefined"){

				  			var image = '';
				  	}else{
					  	var ff = changename(slider_image.name);
					  	var filepath = path.resolve("public/images/"+ff);
					  		slider_image.mv(filepath, function(err){
								if(err){
									console.log(err);
									return;
								}
							});

					    var image = ff
					}	
				}
			}

				var data  = {
						title  			: title[key],
						description     : description[key],
						image  			: image
				}
				var table   = {tablename:'tbl_frontend_slider'};
				admin.insert_all(table,data,function(err, result){	

				});
				//console.log(data);
		});

		res.redirect('/website')  
  	}else if(type =='gallery'){

  	    var fd = req.body.date;
		var fromDate = fd.split(" ");
		var dates    = formatDate(fromDate[0],fromDate[1] + " " + fromDate[2]);// 
  		var title   	  	= req.body.title;
  		var description   	= req.body.gallery_description;
  		var show_on_website = req.body.show_on_website;
  		var gallery_image   = req.files.gallery_image;
  		var youtube_link    = req.body.youtube_link;
  		
  		

	    
  		var cover_image = req.files.cover_image;
  		
  		
	  	var cover_logo= '';
	  	if(typeof cover_image=="undefined"){

	  			var cover_logo = '';
	  	}else{
		  	var ff = changename(cover_image.name);
		  	var filepath = path.resolve("public/images/"+ff);
		  		cover_image.mv(filepath, function(err){
					if(err){
						console.log(err);
						return;
					}
				});

		    var cover_logo = ff
		}	


  		var gallery_data   = {
  			title  			: title,
  			description     : description,
  			show_on_website : show_on_website,
  			date_added      : dates,
  			image 			: cover_logo
  		}

  		var table   = {tablename:'tbl_frontend_gallery'};
		admin.insert_all(table,gallery_data,function(err, result){	
		    var frontend_gallery_id  = result;
		    var gallery_image = req.files.gallery_image;

		    if(gallery_image!="undefined"){
			    if(gallery_image.length>1){
			    	async.forEachOf(gallery_image, function(item, key, callback){
						var gallery_logo= '';

						console.log(item)

					  	if(typeof item=="undefined"){

					  			var gallery_logo = '';
					  	}else{
						  	var ff = changename(item.name);
						  	var filepath = path.resolve("public/images/"+ff);
						  		item.mv(filepath, function(err){
									if(err){
										console.log(err);
										return;
									}
								});

						    var gallery_logo = ff
						}	

						var gallery_image = {
							frontend_gallery_id  : frontend_gallery_id,
							image 			     : gallery_logo
						}

						var table_gallery_image  = {tablename:'tbl_frontend_gallery_image'}
						admin.insert_all(table_gallery_image,gallery_image,function(err, result){	

						});		
					 	 		  
		    		callback();
					}, function(err){
					  if(err) {
					    console.log(err);
					    callback(err);
					  }else{
					  	 // res.send('1');
					  }
					});
			    }else{
			    	
				  	var gallery_logo= '';
				  	if(typeof gallery_image=="undefined"){

				  			var gallery_logo = '';
				  	}else{
					  	var ff = changename(gallery_image.name);
					  	var filepath = path.resolve("public/images/"+ff);
					  		gallery_image.mv(filepath, function(err){
								if(err){
									console.log(err);
									return;
								}
							});

					    var gallery_logo = ff
					}	

					var gallery_image = {
						frontend_gallery_id  : frontend_gallery_id,
						image 			     : gallery_logo
					}

					var table_gallery_image  = {tablename:'tbl_frontend_gallery_image'}
					admin.insert_all(table_gallery_image,gallery_image,function(err, result){	

					});



			    }
			}

			if(youtube_link!=''){
					async.forEachOf(youtube_link, function(item, key, callback){
				     	var youtube_link = {
						frontend_gallery_id   : frontend_gallery_id,
						frontend_youtube_link : item
						}

					var table_youtube  = {tablename:'tbl_frontend_gallery_youtube'}
					admin.insert_all(table_youtube,youtube_link,function(err, result){	

					});
					callback();
					}, function(err){
					  if(err) {
					    console.log(err);
					    callback(err);
					  }else{
					  	 // res.send('1');
					  }
					});
			}

			res.redirect('/website');

		});
  		console.log(req.files.gallery_image);

  		console.log(req.body);
  	}
  	
  
  
		
	
    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});
router.get("/accounting_fee_type", function(req, res){
	if(req.session.user_role==1){
		
		var table  = 'tbl_class';
		if(req.query.id){
	  	  	findObj={fee_type_id:req.query.id}
		  	tableobj={tablename:'tbl_fee_type'}
	        admin.findWhere(tableobj,findObj,function(err,result){
	          
	           $data=JSON.parse(JSON.stringify(result));
	           admin.findAll({table:table},function(err, result){
				    var class_list 	 = result;
		           	var pagedata 	 = {title : "Welcome Admin", pagename : "admin/accounting_fee_type", message : req.flash('msg'),fee_data:$data[0],class_list:class_list,fees_type:''};   	
		           	res.render("admin_layout", pagedata);
	        	});
	        });
	  	}else{
	  		
			admin.findAll({table:table},function(err, result){
			    var class_list 	 = result;
				var table_fees   = 'tbl_fee_type';
				admin.findFeeType({table:table_fees},function(err, result){
					var fees_type    = result;
					var pagedata 	 = {Title : "", pagename : "admin/accounting_fee_type", message : req.flash('msg'),fee_data:'',class_list:class_list,fees_type:fees_type};
					res.render("admin_layout", pagedata);
				});
			});
		}
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});


/// get student by class id
router.get("/get_student_by_class_id", function(req, res)
{
	if(req.session.user_role==1)
	{ 
		var year= req.session.session_year;
		var class_id    =req.query.class_id
		var section_id  =req.query.section_id 
		//var section_id =req.query.section_id
	    var table = {tbl_registration:'tbl_registration',tbl_enroll:'tbl_enroll'};
	    admin.getstudentlist_by_class(table,{class_id:class_id,session_year:year,section_id:section_id},function(err, result){
		   var student_list = result;
		  // console.log(student_list)
		   res.send({student_list:student_list});
		   
			    
		});
     }else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
	}
});


router.post("/add_fee_type", function(req, res){
	if(req.session.user_role==1){

		
		var table   = {tablename:'tbl_fee_type'};
	 	var data 	= {
			 		class_id         :req.body.class_id,
			 		fee_type         :req.body.fee_type,	 		
			 		session_year     :req.session.session_year,
			 		created_date 	 :moment().format('YYYY-MM-DD:hh:mm:ss')
		}	

       if(req.body.fee_type_id)
	     {
	     	var update_array 	= {
			 		class_id         :req.body.class_id,
			 		fee_type         :req.body.fee_type,	 		
			 		session_year     :req.session.session_year
			 		
			}	

			
	        var where       = {fee_type_id:req.body.fee_type_id}
		    admin.updateWhere(table,where,update_array, function(err, result){  
                 if(result)
		      	 {
		      		res.redirect("/accounting_fee_type");
		      	 }
		    });
	     }
     	else 
     	{
	     	admin.insert_all(table,data,function(err, result){
	     		var table_class  = 'tbl_class';
				admin.findAll({table:table_class},function(err, result){
				    var class_list 	 = result;
				    var table_fees   = 'tbl_fee_type';
				    admin.findFeeType({table:table_fees},function(err, result){
				    	var fees_type    = result;
						var pagedata 	 = {Title : "", pagename : "admin/accounting_fee_type", message : req.flash('msg'),class_list:class_list,fees_type:fees_type,fee_data:''};
						res.render("admin_layout", pagedata);
					});
				});
			});	
     	}



	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.get("/fees_type_list", function(req, res){
	if(req.session.user_role==1)
		{
	 var table_fees   = 'tbl_fee_type';
				admin.findFeeType({table:table_fees},function(err, result){
				    	var fees_type    = result;
						var pagedata 	 = {Title : "", pagename : "admin/fee_type_list", message : req.flash('msg'),fees_type:fees_type};
						res.render("admin_layout", pagedata);
			    });
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});


// accounting term starts
router.get("/accounting_term", function(req, res){
	if(req.session.user_role==1){
		
		var table  = 'tbl_class';
		if(req.query.id){
	  	  	findObj={term_id:req.query.id}
		  	tableobj={tablename:'tbl_fees_term'}
	        admin.findWhere(tableobj,findObj,function(err,result){
	          
	           $data=JSON.parse(JSON.stringify(result));
	           admin.findAll({table:table},function(err, result){
				    var class_list 	 = result;
		           	var pagedata 	 = {title : "Welcome Admin", pagename : "admin/accounting_fee_term", message : req.flash('msg'),fee_data:$data[0],class_list:class_list,fees_term:''};   	
		           	res.render("admin_layout", pagedata);
	        	});
	        });
	  	}else{
	  		
			admin.findAll({table:table},function(err, result){
			    var class_list 	 = result;
				var table_fees   = 'tbl_fees_term';
				admin.findFeeType({table:table_fees},function(err, result){
					var fees_term    = result;
					var pagedata 	 = {Title : "", pagename : "admin/accounting_fee_term", message : req.flash('msg'),fee_data:'',class_list:class_list,fees_term:fees_term};
					res.render("admin_layout", pagedata);
				});
			});
		}
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.post("/add_fee_term", function(req, res){
	if(req.session.user_role==1){

		
		var table   = {tablename:'tbl_fees_term'};
	 	var data 	= {
			 		class_id         :req.body.class_id,
			 		term_name        :req.body.term_name,	 		
			 		session_year     :req.session.session_year,
			 		start_date       :req.body.start_date,
			 		end_date         :req.body.end_date,
			 		created_date 	 :moment().format('YYYY-MM-DD:hh:mm:ss')
		}	

       if(req.body.term_id)
	     {
	     	var update_array 	= {
			 		class_id         :req.body.class_id,
			 		term_name        :req.body.term_name,	 		
			 		session_year     :req.session.session_year,
			 		start_date       :req.body.start_date,
			 		end_date         :req.body.end_date,
			 		
			}	
	        var where       = {term_id:req.body.term_id}
		    admin.updateWhere(table,where,update_array, function(err, result){  
                 if(result)
		      	 {
		      		res.redirect("/accounting_term");
		      	 }
		    });
	     }
     	else 
     	{
	     	admin.insert_all(table,data,function(err, result){
	     		var table_class  = 'tbl_class';
				admin.findAll({table:table_class},function(err, result){
				    var class_list 	 = result;
				    var tbl_fee_term   = 'tbl_fees_term';
				    admin.findFeeType({table:tbl_fee_term},function(err, result){
				    	var fees_term    = result;
						var pagedata 	 = {Title : "", pagename : "admin/accounting_fee_term", message : req.flash('msg'),class_list:class_list,fees_term:fees_term,fee_data:''};
						res.render("admin_layout", pagedata);
					});
				});
			});	
     	}



	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.get("/fees_term_list", function(req, res){
	if(req.session.user_role==1)
		{
		    var table_fees   = 'tbl_fees_term';
			
			admin.findFeeType({table:table_fees},function(err, result){
				    	var fees_term    = result;
						var pagedata 	 = {Title : "", pagename : "admin/fees_term_list", message : req.flash('msg'),fees_term:fees_term};
						res.render("admin_layout", pagedata);
			    });
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

// accounting fees term ends

// accounting fees structure starts
router.get("/fee_structure", function(req, res){
	if(req.session.user_role==1){
		
		var table  = 'tbl_class';
		if(req.query.id){
	  	  	findObj={fees_id:req.query.id}
		  	tableobj={tablename:'tbl_fees_structure'}
	        admin.findWhere(tableobj,findObj,function(err,result){
	          
	           $data=JSON.parse(JSON.stringify(result));
	           
	           var class_id   = $data[0].class_id;
	           var term_table = {tablename:'tbl_fees_term'}
	            admin.findTermById(term_table,{class_id:class_id},function(err, result){
	            	
	            	var fees_term   = result;
	            	var type_table  = {tablename:'tbl_fee_type'}
	            	admin.findTypeById(type_table,{class_id:class_id},function(err, result){
	            		var fees_type  = result;
			            admin.findAll({table:table},function(err, result){
						    var class_list 	 = result;
				           	var pagedata 	 = {title : "Welcome Admin", pagename : "admin/fees_structure", message : req.flash('msg'),fee_data:$data[0],class_list:class_list,fees_structure:'',fees_term:fees_term,fees_type:fees_type};   	
				           	res.render("admin_layout", pagedata);
			        	});
		      	    });
	       		});
	        });
	  	}else{
	  		
			admin.findAll({table:table},function(err, result){
			    var class_list 	 = result;
				var table_fees   = 'tbl_fees_structure';
				admin.findFeesStructure({table:table_fees},function(err, result){
					var fees_structure    = result;
					var pagedata 	 = {Title : "", pagename : "admin/fees_structure", message : req.flash('msg'),fee_data:'',class_list:class_list,fees_structure:fees_structure};
					res.render("admin_layout", pagedata);
				});
			});
		}
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});


router.post("/add_fees_structure", function(req, res){
	if(req.session.user_role==1){

		
		var table   = {tablename:'tbl_fees_structure'};
	 	var data 	= {
			 		class_id         :req.body.class_id,
			 		fees_term_id     :req.body.fees_term_id,
			 		fees_type_id     :req.body.fees_type_id,	 		
			 		session_year     :req.session.session_year,
			 		fees_amount      :req.body.fees_amount,
			 		created_date 	 :moment().format('YYYY-MM-DD:hh:mm:ss')
		}	

       if(req.body.fees_id)
	     {
	     	var update_array 	= {
			 		class_id         :req.body.class_id,
			 		fees_term_id     :req.body.fees_term_id,
			 		fees_type_id     :req.body.fees_type_id,	 		
			 		session_year     :req.session.session_year,
			 		fees_amount      :req.body.fees_amount
			 		
			}	
	        var where       = {fees_id:req.body.fees_id}
		    admin.updateWhere(table,where,update_array, function(err, result){  
                 if(result)
		      	 {
		      		res.redirect("/fee_structure");
		      	 }
		    });
	     }
     	else 
     	{
	     	admin.insert_all(table,data,function(err, result){
	     		var table_class  = 'tbl_class';
				admin.findAll({table:table_class},function(err, result){
				    var class_list 	 = result;
				    var table_fees   = 'tbl_fees_structure';
					admin.findFeesStructure({table:table_fees},function(err, result){
						var fees_structure    = result;
						var pagedata 	 = {Title : "", pagename : "admin/fees_structure", message : req.flash('msg'),fee_data:'',class_list:class_list,fees_structure:fees_structure};
						res.render("admin_layout", pagedata);
					});
				});
			});	
     	}



	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});

router.get("/fees_structure_list", function(req, res){
	if(req.session.user_role==1)
		{
		    var table_fees   = 'tbl_fees_structure';
			admin.findFeesStructure({table:table_fees},function(err, result){
				var fees_structure    = result;
				var pagedata 	 = {Title : "", pagename : "admin/fees_structure_list", message : req.flash('msg'),fees_structure:fees_structure};
				res.render("admin_layout", pagedata);
			});
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});
// get fees type and term on the basis of class
router.get("/get_fess_tt", function(req, res)
{
	if(req.session.user_role==1)
	{ 
		var year     = req.session.session_year;
		var class_id = req.query.class_id
		//var section_id =req.query.section_id
	    var table_term = {tbl_name : 'tbl_fees_term'};
	    var table_type = {tbl_name : 'tbl_fee_type'};
	    admin.get_fees_type(table_type,{class_id:class_id,session_year:year},function(err, result){
	    	var type_list  = result;
		    admin.get_fees_term(table_term,{class_id:class_id,session_year:year},function(err, result){
			   var term_list = result;
			   
			   res.send({term_list:term_list,type_list:type_list});
			   
				    
			});
		});
     }else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
	}
});


// Student Fees Paymemt System

router.get("/student_payment", function(req, res){
	if(req.session.user_role==1){
		
		var table  = 'tbl_class';
		if(req.query.id){
	  	  	findObj={fee_type_id:req.query.id}
		  	tableobj={tablename:'tbl_fee_type'}
	        admin.findWhere(tableobj,findObj,function(err,result){
	          
	           $data=JSON.parse(JSON.stringify(result));
	           admin.findAll({table:table},function(err, result){
				    var class_list 	 = result;
		           	var pagedata 	 = {title : "Welcome Admin", pagename : "admin/accounting_fee_type", message : req.flash('msg'),fee_data:$data[0],class_list:class_list,fees_type:''};   	
		           	res.render("admin_layout", pagedata);
	        	});
	        });
	  	}else{
	  		
			admin.findAll({table:table},function(err, result){
			    var class_list 	 = result;
				
				var pagedata 	 = {Title : "", pagename : "admin/student_payment", message : req.flash('msg'),class_list:class_list};
				res.render("admin_layout", pagedata);
				
			});
		}
	}else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});


// get fees detail by class and student id
router.get("/ajax_get_student_fees", function(req, res)
{
	if(req.session.user_role==1)
	{ 
		var year        = req.session.session_year;
		var class_id    = req.query.class_id;
		var student_id  = req.query.student_id;

		var total 	 = 0;
		var paid 	 = 0;
	    var discount = 0;
		var table  = {tablename : 'tbl_fees_structure'}
			admin.getFeesDetail(table,{class_id:class_id,session_year:year},function(err, result){
			    var fees_detail 	 = result;
			    
				//console.log(fees_detail);
				var table_student    = {tablename : 'tbl_registration'}
				admin.getStudentFees(table_student,{registration_id:student_id},function(err, result){
					var transport_fees   = result;
					 

					fees_detail.forEach(function(item, index){
				 	 	  fees_detail[index].amount_paid="";
				 	 	  fees_detail[index].discount="";
				 	 	  
				 	   });
                    var i=0;
					async.each(fees_detail, function (item, done){
					
						var fees_id  = item.fees_id;
					
						var table_payment  = {tablename :'tbl_student_payment'};
						admin.get_paid_fees(table_payment,{fees_id:fees_id,student_id:student_id},function(err, result){
						
					  	if(result=='' || result==undefined || result.length === 0){
	                        fees_detail[i].amount_paid = 0.00;
	                        fees_detail[i].discount    = 0.00;
	                        i++;
	                    }
	                    else{
	                    	
	                        fees_detail[i].amount_paid = result[0].amount;
	                        fees_detail[i].discount    = result[0].discount;
	                         i++;
	                        
	                    }
	                     total  	+= parseInt(item.fees_amount);
	                     paid   	+= parseInt(item.amount_paid);
	                     discount   += parseInt(item.discount);
	                    done(null);
	                    
					  	
					  	})
					  	 
					 
				     	 
					
					}, function(){
						
						var table_payment  = {tablename:'tbl_student_payment_master'}
							admin.getFeesReceipt(table_payment,{student_id:student_id},function(err, result){
								var fees_receipt  = result;
								//console.log(fees_receipt);return false;
								var table_transport   = {tablename : 'tbl_registration'}
								admin.getTransportFeesReceipt(table_transport,{student_id:student_id},function(err, result){var transport_receipt   = result;	
									res.send({fees_detail:fees_detail,transport_fees:transport_fees,fees_receipt:fees_receipt,transport_receipt:transport_receipt,total:total,paid:paid,discount,discount});
								});
								
							});
	             	});		
		
		   
				
				
				});
			});
		
     }else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
	}
});


//get transport fees data
router.get("/ajax_get_transport_fees", function(req, res)
{
	if(req.session.user_role==1)
	{ 
		var year        = req.session.session_year;
		
		var student_id  = req.query.user_id;

		
		var table_student   	 = {tablename : 'tbl_registration'}
			admin.getStudentFees(table_student,{registration_id:student_id},function(err, result){
				var transport_fees   = result;
				res.send({transport_fees:transport_fees});
				

			});
		
     }else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
	}
});
// pay fees detail
router.get("/get_payment_data", function(req, res)
{
	if(req.session.user_role==1)
	{ 
		var year        = req.session.session_year;
		var user_id    	= req.query.user_id;
		var fees        = req.query.fees;
		console.log('user_id',user_id);
		console.log('fees_id',fees);
		 var detail = [];
		 var n = 0;
		 		async.each(fees, function (item, done){
			 		 var fees_id   =  item;
			 		 //console.log(fees_id)
			 		 var Table = {tablename : 'tbl_fees_structure'}
					 admin.find_pay_fees(Table,{fees_id:fees_id,session_year:year},function(err, result1){
				     var fees_detail  = Object.values(JSON.parse(JSON.stringify(result1)));
				    	
				      detail[n]  = fees_detail[0];
				     
				     
				     done(null);
				     n++;
					});
				}, function(){
					//  console.log(detail)
					detail.forEach(function(item, index){
				 	 	  detail[index].amount_paid="";
				 	 	  detail[index].discount="";
				 	 	  
				 	   });
                    var i=0;
					async.each(detail, function (item, done){
					//	console.log(item)
						var fees_id  = item.fees_id;
					//	console.log(fees_id);
						var table_payment  = {tablename :'tbl_student_payment'};
						admin.get_paid_fees(table_payment,{fees_id:fees_id,student_id:user_id},function(err, result){
						
					  	if(result=='' || result==undefined){
	                      //	console.log(result)
 							detail[i].amount_paid = 0.00;
	                        detail[i].discount    = 0.00;
	                         i++;
	                      	
	                      	//fees_detail.push({'amount_paid':result[0].amount});
	                       
	                    }
	                    else{
	                         detail[i].amount_paid = result[0].amount;
	                        detail[i].discount    = result[0].discount;
	                         i++;
	                    }
	                     done(null);
	                    
					  	
					  	})
					  	 
					 
				     	 
					
					}, function(){
						   console.log('feeesssss',detail)
	                      res.send({fees_detail:detail});
				  	});		

                     // res.send({fees_detail:detail});
			  	});		
		
		
     }else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
	}
});

// pay fees detail
router.get("/pay_fees", function(req, res)
{
	if(req.session.user_role==1)
	{ 
		var year      			  = req.session.session_year;
		var amount    			  = req.query.amount;
		var fee_id      		  = req.query.fee_id;
		var discount              = req.query.discount;
		var payment_number        = req.query.payment_number;
		var user_id               = req.query.user_id;
		var type                  = req.query.type;
		var fees_type             = req.query.fee_type;
		var fees_term    		  = req.query.term_name;
		
		if(amount.filter)
		var insert_data = [];
		var text 	 	= "";
		var possible 	= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		var table    	= {tablename:'tbl_student_payment_master'}
		for (var i = 0; i < 5; i++){
		    text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		
		var n=0;  
		if(amount!='' && discount!=''){
			console.log('1');
			async.forEachOf(amount, function(item, key, callback){
				if(amount[key]==''){
					amount[key] = 0.00;
				}
				if(discount[key]==''){
					discount[key] = 0.00;
				}
				insert_data   = {
				 		'fees_id'       : fee_id[key],
	                    'amount'        : parseFloat(amount[key]),
	                    'discount'      : parseFloat(discount[key]),
	                    'payment_number': payment_number[key],
	                    'type'          : type[key],
	                    'collected_by'  : 'Admin',
	                    'student_id'    : user_id,
	                    'date'          : moment().format('YYYY-MM-DD:hh:mm:ss'),
	                    'year'          : req.session.session_year,
	                    'receipt_number': text,
	                    'fees_type'     : fees_type[key],
	                    'fees_term'		: fees_term[key]

			    	}

			   
				    admin.insert_all(table,insert_data,function(err, result){	
				    	var table_payment  = {tablename : 'tbl_student_payment'}
				    	
				    	console.log(key)
				    	admin.findPayment(table_payment,{fees_id:fee_id[key],student_id :user_id},function(err, result){
				    		if(result=='' || result==undefined){
				    			insert_data   = {
							 		'fees_id'       : fee_id[key],
				                    'amount'        : amount[key],
				                    'discount'      : discount[key],
				                    'payment_number': payment_number[key],
				                    'type'          : type[key],
				                    'collected_by'  : 'Admin',
				                    'student_id'    : user_id,
				                    'date'          : moment().format('YYYY-MM-DD:hh:mm:ss'),
				                    'year'          : req.session.session_year,
				                    'receipt_number': text,
				                     'fees_type'     : fees_type[key],
	                    		    'fees_term'		: fees_term[key]
						    	}
				    			admin.insert_all(table_payment,insert_data,function(err, result){
				    			});
				    		}else{
				    			 console.log(result);
				    			 var total_amount     = (Number(result[0].amount)   + Number(amount[key])); 
		                         var discount_amount  = (Number(result[0].discount) + Number(discount[key]));
		                         var update_data  	  = {
		                         	'amount'   : total_amount,
		                         	'discount' : discount_amount

		                         }
		                         var where  = {payment_id : result[0].payment_id}
		                         admin.updateWhere(table_payment,where,update_data, function(err, result){ 
		                         });
				    		}

				    		
				    	});
				    });	
			
			  //console.log('/brokers/topics/' + topic + '/partitions/' + key + '/state');
			  callback();
			}, function(err){
			  if(err) {
			    console.log(err);
			    callback(err);
			  }else{
			  	  res.send('1');
			  }
			});
		}else if(amount==''  && discount!='') {
						console.log('2');

			async.forEachOf(discount, function(item, key, callback){
				if(amount[key]==''){
					amount[key] = 0.00;
				}
				if(discount[key]==''){
					discount[key] = 0.00;
				}
				insert_data   = {
				 		'fees_id'       : fee_id[key],
	                    'amount'        : parseFloat(amount[key]),
	                    'discount'      : parseFloat(discount[key]),
	                    'payment_number': payment_number[key],
	                    'type'          : type[key],
	                    'collected_by'  : 'Admin',
	                    'student_id'    : user_id,
	                    'date'          : moment().format('YYYY-MM-DD:hh:mm:ss'),
	                    'year'          : req.session.session_year,
	                    'receipt_number': text,
	                    'fees_type'     : fees_type[key],
	                    'fees_term'		: fees_term[key]
			    	}

			   
				    admin.insert_all(table,insert_data,function(err, result){	
				    	var table_payment  = {tablename : 'tbl_student_payment'}
				    	
				    	console.log(key)
				    	admin.findPayment(table_payment,{fees_id:fee_id[key],student_id :user_id},function(err, result){
				    		if(result=='' || result==undefined){
				    			insert_data   = {
							 		'fees_id'       : fee_id[key],
				                    'amount'        : amount[key],
				                    'discount'      : discount[key],
				                    'payment_number': payment_number[key],
				                    'type'          : type[key],
				                    'collected_by'  : 'Admin',
				                    'student_id'    : user_id,
				                    'date'          : moment().format('YYYY-MM-DD:hh:mm:ss'),
				                    'year'          : req.session.session_year,
				                    'receipt_number': text,
				                    'fees_type'     : fees_type[key],
	                   				'fees_term'		: fees_term[key]
						    	}
				    			admin.insert_all(table_payment,insert_data,function(err, result){
				    			});
				    		}else{
				    			 console.log(result);
				    			 var total_amount     = (Number(result[0].amount)   + Number(amount[key])); 
		                         var discount_amount  = (Number(result[0].discount) + Number(discount[key]));
		                         var update_data  	  = {
		                         	'amount'   : total_amount,
		                         	'discount' : discount_amount

		                         }
		                         var where  = {payment_id : result[0].payment_id}
		                         admin.updateWhere(table_payment,where,update_data, function(err, result){ 
		                         });
				    		}

				    		
				    	});
				    });	
			
			  //console.log('/brokers/topics/' + topic + '/partitions/' + key + '/state');
			  callback();
			}, function(err){
			  if(err) {
			    console.log(err);
			    callback(err);
			  }else{
			  	  res.send('1');
			  }
			});
		}else if(amount!=''  && discount=='') {
						console.log('3');

			async.forEachOf(amount, function(item, key, callback){
				if(amount[key]==''){
					amount[key] = 0.00;
				}
				if(discount[key]==''){
					discount[key] = 0.00;
				}
				insert_data   = {
				 		'fees_id'       : fee_id[key],
	                    'amount'        : parseFloat(amount[key]),
	                    'discount'      : parseFloat(discount[key]),
	                    'payment_number': payment_number[key],
	                    'type'          : type[key],
	                    'collected_by'  : 'Admin',
	                    'student_id'    : user_id,
	                    'date'          : moment().format('YYYY-MM-DD:hh:mm:ss'),
	                    'year'          : req.session.session_year,
	                    'receipt_number': text,
	                    'fees_type'     : fees_type[key],
	                    'fees_term'		: fees_term[key]
			    	}

			   
				    admin.insert_all(table,insert_data,function(err, result){	
				    	var table_payment  = {tablename : 'tbl_student_payment'}
				    	
				    	console.log(key)
				    	admin.findPayment(table_payment,{fees_id:fee_id[key],student_id :user_id},function(err, result){
				    		if(result=='' || result==undefined){
				    			insert_data   = {
							 		'fees_id'       : fee_id[key],
				                    'amount'        : amount[key],
				                    'discount'      : discount[key],
				                    'payment_number': payment_number[key],
				                    'type'          : type[key],
				                    'collected_by'  : 'Admin',
				                    'student_id'    : user_id,
				                    'date'          : moment().format('YYYY-MM-DD:hh:mm:ss'),
				                    'year'          : req.session.session_year,
				                    'receipt_number': text,
				                    'fees_type'     : fees_type[key],
	                    			'fees_term'		: fees_term[key]
						    	}
				    			admin.insert_all(table_payment,insert_data,function(err, result){
				    			});
				    		}else{
				    			 console.log(result);
				    			 var total_amount     = (Number(result[0].amount)   + Number(amount[key])); 
		                         var discount_amount  = (Number(result[0].discount) + Number(discount[key]));
		                         var update_data  	  = {
		                         	'amount'   : total_amount,
		                         	'discount' : discount_amount

		                         }
		                         var where  = {payment_id : result[0].payment_id}
		                         admin.updateWhere(table_payment,where,update_data, function(err, result){ 
		                         });
				    		}

				    		
				    	});
				    });	
			
			  //console.log('/brokers/topics/' + topic + '/partitions/' + key + '/state');
			  callback();
			}, function(err){
			  if(err) {
			    console.log(err);
			    callback(err);
			  }else{
			  	  res.send('1');
			  }
			});
		}
    
		
     }else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
	}
});

router.get("/insert_transport_payment", function(req, res)
{
	if(req.session.user_role==1)
	{ 
		var year      			  = req.session.session_year;
		var amount    			  = req.query.amount;
		var discount              = req.query.discount;
		var payment_number        = req.query.payment_number;
		var student_id            = req.query.student_id;
		var type                  = req.query.type;

		
		
		var insert_data = [];
		var text 	 	= "";
		var possible 	= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		var table    	= {tablename:'tbl_transport_payment_master'}
		for (var i = 0; i < 5; i++){
		    text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		insert_data   = {
				'receipt_number'    : text,
                'student_id'        : student_id,
                'type'              : type,
                'payment_number'    : payment_number,
                'amount'            : amount,
                'discount'          : discount,
                'date'              : moment().format('YYYY-MM-DD:hh:mm:ss'),
                'year'              : year,
                'collected_by'      : 'Admin'
			 		
		    	}



		  admin.insert_all(table,insert_data,function(err, result){	
		  	res.send('1');
		  });
	
    
		
     }else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
	}
});

router.get("/payment_report", function(req, res){
	if(req.session.user_role==1){
		var table  = 'tbl_class';
		var total_fee        = 0;
		var transport_amount = 0;
		admin.findAll({table:table},function(err, result){
		   	    var class_list 	 = result;
		   		async.each(class_list, function (itemA, callback) { //loop through array
   			 //process itemA

   			         var table_section  = {tablename:'tbl_section'}
   			 		 admin.findWhere(table_section,{ class_id : itemA.class_id}, function(err, section){
   			 		 	async.each(section, function (itemAChild, callback1) { //loop through array
						    //process itemAChild
						    var class_id   = itemA.class_id;
						    var section_id = itemAChild.section_id;
							var year       = req.session.session_year;
						    admin.getStudentCount(table_section,{ class_id : class_id,section_id:section_id,year:year}, function(err, count){
						    	var student_count  = count;
						    	//console.log(student_count[0].count_student);
						    	admin.getTotalFeesSchool(table_section,{ class_id : class_id}, function(err, total_fees){
                    				//console.log(total_fees[0]['fees_amount'])
                    				if(total_fees[0]['fees_amount']!=null && student_count!=0){
									
                    				total_fee += parseInt(student_count[0].count_student) * parseInt(total_fees[0]['fees_amount']);
                    				
                    				}

                    				admin.getTransportTotalFees(table_section,{class_id : class_id,section_id:section_id,year:year}, function(err, 	transport_fees){
                    					if(transport_fees!=''){
                    						transport_amount += parseInt(transport_fees[0].route_fare);
                    					}
                    					//console.log(transport_fees)
                    					callback1();
                    				});
						    	});
						    });

						   // callback1();
						     
					    }, function(err) {
						    	 
						    
						      callback();
						});

   			 		 });
						

						//callback();
			    }, function(err) {
			    	//var paid_amount = 0;
			    	//var paid_discount = 0;
			    	//var paid_transport_amount = 0;
			    	var total_fees  = total_fee + transport_amount;
			    	console.log(total_fees)
			    	admin.getTotalPaidFees(function(err,amount){
			    		console.log(amount[0].amount);
			    		if(amount[0]==''){
			    			console.log('a')
			    			var paid_amount    = 0.00;
			    			var paid_discount  = 0.00;
			    		}else{
			    			console.log('2')
			    			var paid_amount    = amount[0].amount;
			    			var paid_discount  = amount[0].discount;
			    		}


			    		admin.getTotalPaidTransportFees(function(err,transport){
			    		console.log(transport);
			    		if(transport!=''){
			    			var paid_transport_amount    = parseInt(transport[0].amount) + parseInt(transport[0].discount);
			    		}else{
			    			var paid_transport_amount    = 0.00;
			    			
			    		}
				    	
				    	var pagedata 	 = {Title : "", pagename : "admin/payment_report", message : req.flash('msg'),class_list:class_list,total_fees:total_fees,paid_amount:paid_amount,paid_discount:paid_discount,paid_transport_amount:paid_transport_amount};
						res.render("admin_layout", pagedata);

			    	});


			    	});

			    	
						
				});
			
		});
    }else{
	        admin.select(function(err,result){
	     
		    res.render('admin/index',{error : req.flash('msg')});
			  
		 	});
	}
});


router.get("/ajax_get_payment_receipt_data", function(req, res)
{
	if(req.session.user_role==1)
	{ 
		var year      			  = req.session.session_year;
		var class_id    	      = req.query.class_id;
		var fees_term_id          = req.query.fees_term_id;
		var fee_type_id        	  = req.query.fee_type_id;
		var section_id        	  = req.query.section_id;
		console.log(class_id);
		console.log(fees_term_id);
		console.log(fee_type_id);
		

            var table  = {tablename : 'tbl_enroll'}
     		var fee_payment  = '';
     		admin.getStudentByClassId(table,{class_id:class_id,year:year,section_id:section_id},function(err, result){

		        var fee_payment 	 = result;
		   		 fee_payment.forEach(function(item, index){
		 	 	  fee_payment[index].transport_fees ="";
		 	 	  fee_payment[index].route_fare		="";
		 	 	  fee_payment[index].total_amount	="";
		 	 	  fee_payment[index].total_discount = "";
		 	 	  fee_payment[index].fees_amount    = "";
		 	    });
				async.forEachOf(fee_payment, function(item, key, callback){
				var table_transport  = {tablename:'tbl_transport_payment_master'}	
			    admin.getTransportFeesByStudentId(table_transport,{student_id:fee_payment[key].student_id},function(err, result){
			    		
			    		var transport_data   = result;
			    		console.log(transport_data);
			    		if(transport_data!=undefined){
				    		if(transport_data[0]['route_fare']!=null){
		                        if(transport_data[0]['transport_paid_amount']!=null || transport_data[0]['transport_paid_discount']!=null ){
		                        
		                        fee_payment[key].transport_fees  = transport_data[0]['transport_paid_amount'] + transport_data[0]['transport_paid_discount'];
		                        fee_payment[key].route_fare      = transport_data[0]['route_fare'];
		                        }else{
		                        	
		                         fee_payment[key].transport_fees = 0.00;
		                         fee_payment[key].route_fare     = transport_data[0]['route_fare'];
		                        }
	                     	}else{
	                     		
		                        fee_payment[key].transport_fees = 'No Transport Taken';
		                        fee_payment[key].route_fare     =  'No Transport Taken';
	                    	 }
                    	 }


                    	callback();
			    });
				
				}, function(err){
				  if(err) {
				    console.log(err);
				    callback(err);
				  }else{
				  		async.forEachOf(fee_payment, function(item, key, callback){
				  			  var where1 = '';
		                      if (class_id!='') {
		                        where1 =  "tbl_fees_structure.class_id = "+class_id+"";
		                      }
		                      
		                      if (fee_type_id!='' && fee_type_id!=0) {
		                        where1 =  " "+where1+"  AND tbl_fees_structure.fees_type_id ="+fee_type_id+"";
		                      }
		                      if (fees_term_id!='') {
		                        where1 =  " "+where1+" AND tbl_fees_structure.fees_term_id = "+fees_term_id+"";
		                      }
		                      
		                      var table_payment  = {tablename:'tbl_student_payment_master'}
							 admin.getAccountingFeesByStudentId(table_payment,{student_id:fee_payment[key].student_id,where1},function(err, result){
							 	 fee_payment[key].total_amount  = result[0]['amount'];
							 	 fee_payment[key].total_discount  = result[0]['discount'];
							 	 var table_fees = {tablename : 'tbl_fees_structure'}
							 	 admin.getTotalFees(table_fees,{where1},function(err, result){
							 	 	var fees_amount  = result;
							 	 	 fee_payment[key].fees_amount  = fees_amount[0]['fees_amount'];
							 	 	
							 	 callback();

							 	});
							 });
			    		
							
						}, function(err){
						  if(err) {
						    console.log(err);
						    callback(err);
						  }else{
								res.send({fee_payment:fee_payment})
						  }
						});

				  }
				});
			
		});
    
		
     }else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
	}
});


router.get("/get_receipt_detail", function(req, res)
{
	if(req.session.user_role==1)
	{ 
		
		var receipt_number    	      = req.query.receipt_number;
		var student_id                = req.query.student_id;
		admin.get_receipt_detail({table:'table'},{receipt_number:receipt_number,student_id:student_id},function(err, result){
			var detail 		 	= result;
			var school_name  	= req.session.school_name;
			var school_address  = req.session.school_address; 
			var school_number   = req.session.phone;
			var logo    		= req.session.logo;
			res.send({detail:detail,school_name:school_name,school_address,school_address,school_number:school_number,logo:logo})


		});
    
		
     }else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
	}
});

router.get("/get_transport_detail", function(req, res)
{
	if(req.session.user_role==1)
	{ 
		
		var receipt_number    	      = req.query.receipt_number;
		var student_id                = req.query.student_id;
		admin.get_transport_detail({table:'table'},{receipt_number:receipt_number,student_id:student_id},function(err, result){
			var detail 		 	= result;
			var school_name  	= req.session.school_name;
			var school_address  = req.session.school_address;
			var school_number   = req.session.phone; 
			var logo    		= req.session.logo;
			res.send({detail:detail,school_name:school_name,school_address,school_address,school_number:school_number,logo:logo})


		});
    
		
     }else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
	}
});


router.get("/website",function(req,res){
	if(req.session.user_role==1)
	{ 
		var table  = 'tbl_setting';
	    var current_setting = "";
		admin.findAll({table:table},function(err, result){
		    var current_setting 	 = result;
		    var table_notice  = 'tbl_noticeboard';
		    admin.findAll({table:table_notice},function(err, noticedata){
		    	var table_events = 'tbl_frontend_events';
		    	admin.findAll({table:table_events},function(err, Events){
		    		var table_settings  = 'tbl_frontend_settings'
		    		admin.findAll({table:table_settings},function(err, settings){
		    			var table_slider  = 'tbl_frontend_slider';
		    			admin.findAll({table:table_slider},function(err, slider_image){
		    				var table_gallery  = 'tbl_frontend_gallery';
		    				admin.findAll({table:table_gallery},function(err, gallery){
								var pagedata 	 = {Title : "", pagename : "admin/website", message : req.flash('msg'),current_setting:current_setting,noticedata:noticedata,Events:Events,settings:settings,slider_image:slider_image,gallery:gallery};
								res.render("admin_layout", pagedata);
							});
						});
					});
				});
			});
		});
	}else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
	}
});
router.post("/add_rights", function(req, res)
{ 

    if(req.session.user_role==1)
    {
        object=req.body; 
        var actions    = [
                'add',
                'edit',
                'delete'
            ]
        var role_id   = object.role_id;
        var user_role = object.user_role;
        var roles     = user_role.toString();
        var rights    = '';
		
		async.each(user_role, function (itemA, callback) { //loop through array
   			 //process itemA
				async.each(actions, function (itemAChild, callback1) { //loop through array
				    //process itemAChild
				    				//console.log(itemA+'_'+itemAChild);
				    				if(object.hasOwnProperty(itemA+'_'+itemAChild)){
				    			  
					        	 		//console.log('a');
				                        rights += 1;
				                    } else {
				                    	//console.log('b');
				                        rights += 0;
				                    }
				    	callback1();
				     
			    }, function(err) {
				    	rights += ','; 
				    
				      callback();
				});
	    }, function(err) {
	    	    var user_rights = {
	    	    	"role_id" 	: role_id,
	    	    	"roles"   	: roles.trim(),
	    	    	"rights"  	: rights.trim(),
	    	    	"created_at": moment().format('YYYY-MM-DD:hh:mm:ss')
	    	    }
	    	    var table  = {tablename :'tbl_user_rights'}

	    	    admin.findWhere(table,{ role_id : role_id}, function(err, result){
	    	    	console.log(result);
	    	    	if(result!=''){
	    	    		admin.updateWhere(table,{ role_id : role_id},user_rights, function(err, result){  
	    	    		});
	    	    	}else{
	    	    		 admin.insert_all(table,user_rights,function(err, result){
			    	    });
	    	    	}
	    	    });
			    	res.redirect("/user_rights");	

	   });
		
        
    }else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
	}

});

router.get("/noticeBoard",function(req,res){
	if(req.session.user_role==1)
	{ 		
			var tableobj = {tablename:'tbl_noticeboard'}
			var findObj  = {notice_id:req.query.id}
            if(req.query.id){
                admin.findWhere(tableobj,findObj,function(err,result1){
	                if(result1){
	                 	data =JSON.parse(JSON.stringify(result1)); 
	                    console.log('ddd') ;
	                    console.log(data[0]);
					    var pagedata = {title : "Welcome Admin", pagename : "admin/noticeBoard", message : req.flash('msg'),noticeBoard : data[0]};
					    res.render("admin_layout", pagedata);
	                }

 			    });
            }else{
            	var pagedata = {title : "Welcome Admin", pagename : "admin/noticeBoard", message : req.flash('msg'),noticeBoard :''};
					    res.render("admin_layout", pagedata);
            }
	}else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
	}
});

router.get("/Events",function(req,res){
	if(req.session.user_role==1)
	{ 		
			var tableobj = {tablename:'tbl_frontend_events'}
			var findObj  = {frontend_events_id:req.query.id}
            if(req.query.id){
                admin.findWhere(tableobj,findObj,function(err,result1){
	                if(result1){
	                 	data =JSON.parse(JSON.stringify(result1)); 
	                    console.log('ddd') ;
	                    console.log(data[0]);
					    var pagedata = {title : "Welcome Admin", pagename : "admin/Events", message : req.flash('msg'),Events : data[0]};
					    res.render("admin_layout", pagedata);
	                }

 			    });
            }
	}else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
	}
});


router.get("/Formative",function(req,res){
	if(req.session.user_role==1)
	{ 		
		console.log(req.query);
		var student_id   = req.query.student_id;
		var class_id     = req.query.class_id;
		var section_id   = req.query.section_id;
		var exam_id      = req.query.exam_id;
			res.render('admin/formative');
	}else{
	      
		    res.render('admin/index',{error : req.flash('msg')});
	}
});

//date format function
function formatDate(date, time2) {
    var from = date.split("-");
    var f = from[2] + "-" + from[1] + "-" + from[0];
    var time1 = time2;

    return f;
}


module.exports=router;