var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

var parent 		= require('../model/parent');
var moment 		= require('moment');
var changename 	= require("../helper/changefilename");
var fs 			= require('fs');
var async 		= require('async');
var path 		= require('path');


router.get("/dashboard",function(req,res){
		
  	if(req.session.user_role==2){
		var pagedata = {title : "Welcome Admin", pagename : "parent/dashboard", message : req.flash('msg')};
	    res.render("admin_layout", pagedata);
	}else{
	        parent.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});


router.get("/student_information",function(req,res){
		
  	if(req.session.user_role==2){
  		//console.log(req.session);
  		var parent_id = req.session.uid;

  		var tableobj = {tablename:'tbl_registration'};
    	parent.getStudentInfomationByParentId(tableobj,{ parent_id : parent_id}, function(err, result){
    		 var pagedata = {title : "Welcome Admin", pagename : "parent/student_information", message : req.flash('msg'),student_information:result};
	         res.render("admin_layout", pagedata);
  		console.log (result);
    	});
		
	}else{
	        parent.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});

router.get("/get_student_information",function(req,res){
		
  	if(req.session.user_role==2){
  		
  		var student_id = req.query.student_id;

  		var tableobj = {tablename:'tbl_registration'};
    	parent.get_student_information(tableobj,{ student_id : student_id}, function(err, result){
    		res.send({student_information : result[0]});
    		//console.log(result);
    		 // var pagedata = {title : "Welcome Admin", pagename : "parent/student_information", message : req.flash('msg'),student_information:result};
	      //    res.render("admin_layout", pagedata);
  		console.log (result);
    	});
		
	}else{
	        parent.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});


router.get("/homework",function(req,res){
		
  	if(req.session.user_role==2){
  		
  		var parent_id    = req.session.uid;	
  		var tableobj     = {tablename:'tbl_registration'};
  		var students     = '';
  		var homework     = ''; 
    	parent.getStudentInfomationByParentId(tableobj,{ parent_id : parent_id}, function(err, result){
    		 
    		var students  = result;
    		//console.log(students);
    		async.each(students, function (itemA, callback) {
    			var class_id     = itemA.class_id;
    			var section_id   = itemA.section_id;
    			var table_homework = {tablename : 'tbl_homework'}
    				parent.get_homeWork(table_homework,{class_id : class_id,section_id:section_id}, function(err, result){
    					homework    = result;
    					if(result=='' || result==undefined){

    					}else{
	    					var j = 0;
		    					homework.forEach(function(items, index){
							 	 	homework[index].student_name="";
							 	 	homework[index].class_name="";
							 	 	homework[index].section_name="";
							 	 	
						 	 	});
	    					async.each(homework, function (itemAChild, callback1) { 
	    					//loop through array
	    					   //  console.log(itemAChild)
					 			homework[j].student_name     = itemA.name;
					 			homework[j].class_name       = itemA.class_name;
					 			homework[j].section_name     = itemA.section_name;
					 			
					    		
						     	j++;
						    	callback1(null);
						    }, function(err) {
							  
    		 				 	callback(null);
							    
							});

						} 

    				
    				});

    				

    				
			}, function(err){
				    if(err) {
					    console.log(err);
					    callback(err);
					}else{
					
						console.log('homework',homework);
			    		  var pagedata = {title : "Welcome Admin", pagename : "parent/homework", message : req.flash('msg'),homework:homework};
				          res.render("admin_layout", pagedata);
					  	 
					  }
		    });
  		
    	});
		
	}else{
	        parent.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});

router.get("/teacher_list",function(req,res){
		
  	if(req.session.user_role==2){
  		
  		

  		var tableobj = {tablename:'tbl_registration'};
    	parent.findWhere(tableobj,{ user_role : '4'}, function(err, result){
    		 var pagedata = {title : "Welcome Admin", pagename : "parent/teacher_list", message : req.flash('msg'),teacher_list:result};
	         res.render("admin_layout", pagedata);
  		console.log (result);
    	});
		
	}else{
	        parent.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});


router.get("/accademic_syllabus",function(req,res){
		
  	if(req.session.user_role==2){
  		//console.log(req.session);
  		var parent_id = req.session.uid;

  		var tableobj = {tablename:'tbl_registration'};
    	parent.getStudentInfomationByParentId(tableobj,{ parent_id : parent_id}, function(err, result){
    		 var pagedata = {title : "Welcome Admin", pagename : "parent/accademic_syllabus", message : req.flash('msg'),student_information:result};
	         res.render("admin_layout", pagedata);
  		console.log (result);
    	});
		
	}else{
	        parent.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});

router.get("/get_accademic_syllabus",function(req,res){
		
  	if(req.session.user_role==2){
  		//console.log(req.session);
  		var class_id = req.query.class_id;

  		var tableobj = {tablename:'tbl_academic_syllabus'};
    	parent.getAccademicSyallabus(tableobj,{ class_id : class_id}, function(err, result){
    		 res.send({accademic_syllabus:result})
  		//console.log (result);
    	});
		
	}else{
	        parent.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});

router.get("/study_material",function(req,res){
		
  	if(req.session.user_role==2){
  		//console.log(req.session);
  		var parent_id = req.session.uid;

  		var tableobj = {tablename:'tbl_registration'};
    	parent.getStudentInfomationByParentId(tableobj,{ parent_id : parent_id}, function(err, result){
    		 var pagedata = {title : "Welcome Admin", pagename : "parent/study_material", message : req.flash('msg'),student_information:result};
	         res.render("admin_layout", pagedata);
  		console.log (result);
    	});
		
	}else{
	        parent.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});

router.get("/get_study_material",function(req,res){
		
  	if(req.session.user_role==2){
  		//console.log(req.session);
  		var class_id = req.query.class_id;

  		var tableobj = {tablename:'tbl_document'};
    	parent.getAccademicSyallabus(tableobj,{ class_id : class_id}, function(err, result){
    		 res.send({study_material:result})
  		//console.log (result);
    	});
		
	}else{
	        parent.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});


router.get("/transport",function(req,res){
		
  	if(req.session.user_role==2){
  		//console.log(req.session);
  		var parent_id = req.session.uid;
  		var tableobj  = {tablename : 'tbl_registration'}
		parent.getTransportDetail(tableobj,{ parent_id : parent_id}, function(err, result){
			var pagedata = {title : "Welcome Admin", pagename : "parent/transport", message : req.flash('msg'),transport:result};
	         res.render("admin_layout", pagedata);
		});
	}else{
	        parent.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});


router.get("/class_routine",function(req,res){
		
  	if(req.session.user_role==2){
  		//console.log(req.session);
  		var parent_id = req.session.uid;

  		var tableobj = {tablename:'tbl_registration'};
    	parent.getStudentInfomationByParentId(tableobj,{ parent_id : parent_id}, function(err, result){
    		 var pagedata = {title : "Welcome Admin", pagename : "parent/class_routine", message : req.flash('msg'),student_information:result};
	         res.render("admin_layout", pagedata);
  		console.log (result);
    	});
		
	}else{
	        parent.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});

router.get("/get_class_routine",function(req,res){
		
  	if(req.session.user_role==2){
  		
  		var class_id   = req.query.class_id;
  		var section_id = req.query.section_id;
  		var tableobj   = {tablename:'tbl_class_routine'};

  		var days  = [
  			'monday',
  			'tuesday',
  			'wednesday',
  			'thursday',
  			'friday',
  			'saturday',
  			'sunday'];

  		

  		
  	    var class_routine  = {};
  		async.each(days, function (item, done) {

		    	parent.getClassRoutine(tableobj,{ class_id : class_id,section_id:section_id,day:item}, function(err, result){
		    		
		    		if(result!=''){
		    		class_routine[item] = result;
		    		}
		    		
		  		done(null);
		    	});
		    	
    	}, function(){
						 console.log('-------class_routine-------',class_routine);
                      res.send({class_routine: class_routine});
		});
		
	}else{
	        parent.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});


router.get("/Payment",function(req,res){
		
  	if(req.session.user_role==2){
  		//console.log(req.session);
  		var parent_id = req.session.uid;

  		var tableobj = {tablename:'tbl_registration'};
    	parent.getStudentInfomationByParentId(tableobj,{ parent_id : parent_id}, function(err, result){
    		 var pagedata = {title : "Welcome Admin", pagename : "parent/Payment", message : req.flash('msg'),student_information:result};
	         res.render("admin_layout", pagedata);
  		console.log (result);
    	});
		
	}else{
	        parent.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});


router.get("/get_payment_information",function(req,res){
		
  	if(req.session.user_role==2){
  		//console.log(req.session);
  		var student_id = req.query.student_id;
  		var class_id   = req.query.class_id;
  		var year       = req.session.session_year;


		var total 	 = 0;
		var paid 	 = 0;
	    var discount = 0;
		var table    = {tablename : 'tbl_fees_structure'}
			parent.getFeesDetail(table,{class_id:class_id,session_year:year},function(err, result){
			    var fees_detail 	 = result;
			    
				//console.log(fees_detail);
				var table_student    = {tablename : 'tbl_registration'}
				parent.getStudentFees(table_student,{registration_id:student_id},function(err, result){
					var transport_fees   = result;
					 

					fees_detail.forEach(function(item, index){
				 	 	  fees_detail[index].amount_paid="";
				 	 	  fees_detail[index].discount="";
				 	 	  
				 	   });
                    var i=0;
					async.each(fees_detail, function (item, done){
					
						var fees_id  = item.fees_id;
					
						var table_payment  = {tablename :'tbl_student_payment'};
						parent.get_paid_fees(table_payment,{fees_id:fees_id,student_id:student_id},function(err, result){
						
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
							parent.getFeesReceipt(table_payment,{student_id:student_id},function(err, result){
								var fees_receipt  = result;
								//console.log(fees_receipt);return false;
								var table_transport   = {tablename : 'tbl_registration'}
								parent.getTransportFeesReceipt(table_transport,{student_id:student_id},function(err, result){var transport_receipt   = result;	
									res.send({fees_detail:fees_detail,transport_fees:transport_fees,fees_receipt:fees_receipt,transport_receipt:transport_receipt,total:total,paid:paid,discount,discount});
								});
								
							});
	             	});		
		
		   
				
				
				});
			});
		
		
	}else{
	        parent.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});


router.get("/account",function(req,res){
		
  	if(req.session.user_role==2){
  		//console.log(req.session);
  		var parent_id = req.session.uid;

  		var tableobj = {tablename:'tbl_registration'};
    	parent.findWhere(tableobj,{ registration_id : parent_id}, function(err, result){
    		
    		 var pagedata = {title : "Welcome Admin", pagename : "parent/account", message :'Updated Succesfully',parent:result[0]};
	         res.render("admin_layout", pagedata);
  		
    	});
		
	}else{
	        parent.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});


router.post("/account_information", function(req, res){
	if(req.session.user_role==2){
		

  	var type         		= req.body.type;
  	if(type =='account'){
  		var name   		    = req.body.name;
  		var phone  		    = req.body.phone;
  		var address 	    = req.body.address;
  		var aadhar_number   = req.body.aadhar_number;
  		var registration_id = req.body.registration_id;
  		var data       = {
  			name          : name,
  			phone         : phone,
  			address		  : address,
  			aadhar_number : aadhar_number
  		}

  		var table   = {tablename:'tbl_registration'};
  	    var where={registration_id : registration_id};
  	    parent.updateWhere(table,where,data, function(err, result){
  	    	res.redirect('/parent/account')  
  	    });
  	}else if(type =='password'){
  		var new_password    = req.body.new_password;
  		var registration_id = req.body.registration_id;
  		var data       = {
  			password   : sha1(new_password)
  		}

  		var table   = {tablename:'tbl_userlogin'};
  	    var where   = {registration_id : registration_id};
  	    parent.updateWhere(table,where,data, function(err, result){
  	    	res.redirect('/parent/account')  
  	    });
  	
 	}
		
	
    }else{
	        parent.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}
});


router.get("/check_password",function(req,res){
		
  	if(req.session.user_role==2){
  		//console.log(req.session);
  		var password  = req.query.old_password;
  		var parent_id = req.session.uid;
  	
  		
  		var tableobj = {tablename:'tbl_userlogin'};
    	parent.findWhere(tableobj,{ registration_id : parent_id}, function(err, result){
    		if(result!=''){
    			//console.log(result[0].password)
    			var old_password  = sha1(password);
    			//console.log(old_password)
    			if(old_password==result[0].password){
    				res.send('0')
    			}else{
    				res.send('1');
    			}
    		}
    	});
    	
		
	}else{
	        parent.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});


router.get("/question_paper",function(req,res){
		
  	if(req.session.user_role==2){
  		//console.log(req.session);
  		var parent_id = req.session.uid;

  		var tableobj = {tablename:'tbl_registration'};
    	parent.getStudentInfomationByParentId(tableobj,{ parent_id : parent_id}, function(err, result){
    		 var pagedata = {title : "Welcome Admin", pagename : "parent/question_paper", message : req.flash('msg'),student_information:result};
	         res.render("admin_layout", pagedata);
  		console.log (result);
    	});
		
	}else{
	        parent.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});



router.get("/get_question_paper",function(req,res){
		
  	if(req.session.user_role==2){
  		//console.log(req.session);
  		var class_id   = req.query.class_id;
  		var section_id = req.query.section_id;
  		var tableobj = {tablename:'tbl_question_paper'};
    	parent.getQuestionPaper(tableobj,{ class_id : class_id,section_id}, function(err, result){
    		
    	 res.send({question_paper:result})
  		//console.log (result);
    	});
		
	}else{
	        parent.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});

router.get("/get_receipt_detail", function(req, res)
{
  if(req.session.user_role==2)
  { 
    
    var receipt_number            = req.query.receipt_number;
    var student_id                = req.query.student_id;
    parent.get_receipt_detail({table:'table'},{receipt_number:receipt_number,student_id:student_id},function(err, result){
      var detail          = result;
      var school_name     = req.session.school_name;
      var school_address  = req.session.school_address; 
      var school_number   = req.session.phone;
      var logo            = req.session.logo;
      res.send({detail:detail,school_name:school_name,school_address,school_address,school_number:school_number,logo:logo})


    });
    
    
     }else{
        
        res.render('admin/index');
  }
}); 


router.get("/get_transport_detail", function(req, res)
{
  if(req.session.user_role==2)
  { 
    
    var receipt_number            = req.query.receipt_number;
    var student_id                = req.query.student_id;
    parent.get_transport_detail({table:'table'},{receipt_number:receipt_number,student_id:student_id},function(err, result){
      var detail          = result;
      var school_name     = req.session.school_name;
      var school_address  = req.session.school_address;
      var school_number   = req.session.phone; 
      var logo            = req.session.logo;
      res.send({detail:detail,school_name:school_name,school_address,school_address,school_number:school_number,logo:logo})


    });
    
    
     }else{
        
        res.render('admin/index');
  }
}); 


router.get("/exam_marks",function(req,res){
		
  	if(req.session.user_role==2){
  		//console.log(req.session);
  		var parent_id = req.session.uid;

  		var tableobj = {tablename:'tbl_registration'};
    	parent.getStudentInfomationByParentId(tableobj,{ parent_id : parent_id}, function(err, result){

    		 
    		 var n=0;
		 	 result.forEach(function(item, index){
		 	 	  result[index].exam='';
		 	 	 
		 	   });
    		 if(result!=''){
    		    async.each(result, function (item, done){
    		    	var class_id     = item.class_id;
    		    	var tbl_exam     = {tablename:'tbl_exam_master'};
    		    	var session_year = req.session.session_year
    		    	parent.findWhereorderby(tbl_exam,{class_id:class_id,session_year:session_year},{orderby:'exam_name',order:'ASC'},function(err,result1){
			 			var exam_list = result1 ;
			 			 
			 			if(exam_list!=''){
			 				result[n].exam = exam_list;
			 				n++;
			 			}
			 			done(null);
			 		});
	    		   
	    		    
			   	}, function(){
			   		console.log(result)
			   		var pagedata = {title : "Welcome Admin", pagename : "parent/exam_marks", message : req.flash('msg'),student_information:result};
	         		res.render("admin_layout", pagedata);
                     // res.send({student_list:student_list});
			  });
    		 }
    		 
  			// console.log (result);
    	});
		
	}else{
	        parent.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

})


router.get("/getTabulateMarksList",function(req,res){

   if(req.session.user_role==2){
		var class_id 	 =  req.query.class_id
		var section_id 	 =  req.query.section_id
		var exam_id 	 =  req.query.exam_id
		var session_year =  req.session.session_year; 
		var exam_code    =  req.query.exam_code;
		var student_id   =  req.query.student_id;
			
     
	              tabulation_list = {};
	              tabulardata     = {};
	              key             = "data";
             
		 	 	  // tabulation_list[0].marksheet          = [];
		 	 	  // tabulation_list[0].otherexammarksheet = [];
		 	 	  // tabulation_list[0].student_name       = '';
		 	 	  // console.log(tabulation_list)
		 	 
                    student_id = student_id;
                    table      = {tbl_marks:"tbl_marks",tbl_registration:"tbl_registration",tbl_exam_grades:"tbl_exam_grades",tbl_subject:"tbl_subject" } 	
	 		        parent.get_exam_marks_list(table,{student_id:student_id,exam_code:exam_code,class_id:class_id,section_id:section_id,exam_id:exam_id,session_year:session_year},{orderby:'name',order:'ASC'},function(err,result){

                        
                        if(result!=''){
	                        marksheet='';otherexammarksheet='';
	                        result.forEach(function(item, index){
	                        	if(item.subject_type==1)
					    		  marksheet += item.subject_name+'='+item.marks +'^';
					    		else
					    		 otherexammarksheet += item.subject_name+'='+item.marks +'^';	
					    	});
					    
					    	
					    	marksheet = 	marksheet.substring(0, marksheet.length - 1)
					    	otherexammarksheet=otherexammarksheet.substring(0, otherexammarksheet.length - 1)
	                        tabulation_list['marksheet']    		= marksheet;
	                        tabulation_list['otherexammarksheet']   = otherexammarksheet;
	                        tabulation_list['student_name'] 		= result[0].student_name;
	                        tabulation_list['admission_number']     = result[0].admission_number;
	                      	//console.log(tabulation_list)
                     	 }


                     	   console.log('$$$$$$$$$$$$$$$$$',tabulation_list);
                     	    var table = {tablename : 'tbl_exam_grades'}
						    parent.findWhere(table,{class_id:class_id,exam_id:exam_id},function(err,result){
					 			    var  gradelist = result;
					 			    console.log(gradelist)
					 			    res.send({tabulation_list:tabulation_list,gradelist:gradelist});
					    	});
	 		        }); 
			
 	}else{
	        parent.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}
});





router.get("/attendence",function(req,res){
		
  	if(req.session.user_role==2){
  		//console.log(req.session);
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
    	parent.getStudentInfomationByParentId(tableobj,{ parent_id : parent_id}, function(err, result){

    		 var pagedata = {title : "Welcome Admin", pagename : "parent/attendence", message : req.flash('msg'),student_information:result,month:month,year:year,nextyear:nextyear};
	         res.render("admin_layout", pagedata);
  		  
    	});
		
	}else{
	        parent.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});



router.get("/get_parent_student_attendance",function(req,res){

   if(req.session.user_role==2){
		var class_id 	      =  req.query.class_id
		var section_id 	      =  req.query.section_id
		var month             =  req.query.month
		var session_year      =  req.session.session_year; 
		var registration_id   =  req.query.registration_id;
		var month		      =  req.query.month;
		
		var student_id        =  {};
		var table             =  { tbl_attendance:'tbl_attendance',tbl_enroll : 'tbl_enroll',tablename:'tbl_attendance' };
					
     	parent.getStudentAttendence(table,{class_id:class_id,section_id:section_id,registration_id:registration_id,session_year:session_year,month:month},function(err, result1){
									//console.log('sas',result1)
								  	if(result1==undefined || result1==''){
								  		   student_id['attendence'] = '';
								  	}else{
								  		   student_id['attendence'] = result1[0].status;
								  	}

								  var attendance= result1;

								  console.log('attendence',result1);
								  res.send({student_attendance : result1})
								  
								   
		});
	             
			
 	}else{
	        parent.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}
});


module.exports=router;