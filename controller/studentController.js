var express = require('express');
var router = express.Router();
var sha1 = require('sha1');

var student 		= require('../model/student');
var moment 		= require('moment');
var changename 	= require("../helper/changefilename");
var fs 			= require('fs');
var async 		= require('async');
var path 		= require('path');
  

router.get("/dashboard",function(req,res){
		
  	if(req.session.user_role==3)
		{
		var pagedata = {title : "Welcome Admin", pagename : "student/dashboard", message : req.flash('msg')};
	    res.render("admin_layout", pagedata);
	    }else{
	        student.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});

router.get("/teacher_list",function(req,res){
		
  	if(req.session.user_role==3){
  		
  		

  		var tableobj = {tablename:'tbl_registration'};
    	student.findWhere(tableobj,{ user_role : '4'}, function(err, result){
    		 var pagedata = {title : "Welcome Admin", pagename : "student/teacher_list", message : req.flash('msg'),teacher_list:result};
	         res.render("admin_layout", pagedata);
  		console.log (result);
    	});
		
	}else{
	        student.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});


router.get("/subject_list",function(req,res){
		
  	if(req.session.user_role==3){
  		
  		var student_id  = req.session.uid;

  		var tableobj = {tablename:'tbl_enroll'};
    	student.getSubjectList(tableobj,{ student_id : student_id}, function(err, result){
    		 var pagedata = {title : "Welcome Admin", pagename : "student/subject_list", message : req.flash('msg'),subject_list:result};
	         res.render("admin_layout", pagedata);
  		
    	});
		
	}else{
	        student.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});

router.get("/class_routine",function(req,res){
		
  	if(req.session.user_role==3){
  		//console.log(req.session);
  		var student_id = req.session.uid;
  		var tableobj   = {tablename:'tbl_enroll'};
    	student.findWhere(tableobj,{ registration_id : student_id}, function(err, result){
    		 var class_id   = result[0].class_id;
    		 var section_id = result[0].section_id;
    		 
    		var days  = [
	  			'monday',
	  			'tuesday',
	  			'wednesday',
	  			'thursday',
	  			'friday',
	  			'saturday',
	  			'sunday'
	  			];

  		

  		
  	    var class_routine  = {};
  		async.each(days, function (item, done) {
  				var table_routine  = {tablename:'tbl_class_routine'}
		    	student.getClassRoutine(table_routine,{ class_id : class_id,section_id:section_id,day:item}, function(err, result){
		    		
		    		if(result!=''){
		    		class_routine[item] = result;
		    		}
		    		
		  		done(null);
		    	});
		    	
    	}, function(){
						 console.log('-------class_routine-------',class_routine);
						  var pagedata = {title : "Welcome Admin", pagename : "student/class_routine", message : req.flash('msg'),class_routine:class_routine};
	         				res.render("admin_layout", pagedata);
  		
                      //res.send({class_routine: class_routine});
		}); 
    		
  		
    	});
  	
		
	}else{
	        student.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});


router.get("/study_material",function(req,res){
		
  	if(req.session.user_role==3){
  		//console.log(req.session);
  		var class_id = req.query.class_id;

  		
  		var student_id = req.session.uid;
  		var tableobj   = {tablename:'tbl_enroll'};
    	student.findWhere(tableobj,{ registration_id : student_id}, function(err, result){
    		var class_id   = result[0].class_id
    		var tableobj = {tablename:'tbl_document'};
    		student.getAccademicSyallabus(tableobj,{ class_id : class_id}, function(err, result){

    			var pagedata = {title : "Welcome Admin", pagename : "student/study_material", message : req.flash('msg'),study_material:result};
	         				res.render("admin_layout", pagedata);
    		
  		
    		});
    	});
		
	}else{
	        student.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});


router.get("/accademic_syllabus",function(req,res){
		
  	if(req.session.user_role==3){
  		//console.log(req.session);
  		var student_id = req.session.uid;
  		var tableobj   = {tablename:'tbl_enroll'};
    	student.findWhere(tableobj,{ registration_id : student_id}, function(err, result){
    		var class_id   = result[0].class_id

		    var tableobj = {tablename:'tbl_academic_syllabus'};
		    student.getAccademicSyallabus(tableobj,{ class_id : class_id}, function(err, result){
		    		var pagedata = {title : "Welcome Admin", pagename : "student/accademic_syllabus", message : req.flash('msg'),accademic_syllabus:result};
	         				res.render("admin_layout", pagedata);
		  		//console.log (result);
		    	});
    	});
		
	}else{
	        student.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});


router.get("/account",function(req,res){
		
  	if(req.session.user_role==3){
  		//console.log(req.session);
  		var student_id = req.session.uid;

  		var tableobj = {tablename:'tbl_registration'};
    	student.findWhere(tableobj,{ registration_id : student_id}, function(err, result){
    		
    		 var pagedata = {title : "Welcome Admin", pagename : "student/account", message :'Updated Succesfully',student:result[0]};
	         res.render("admin_layout", pagedata);
  		
    	});
		
	}else{
	        student.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});


router.post("/account_information", function(req, res){
	if(req.session.user_role==3){
		

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
  	    student.updateWhere(table,where,data, function(err, result){
  	    	res.redirect('/student/account')  
  	    });
  	}else if(type =='password'){
  		var new_password    = req.body.new_password;
  		var registration_id = req.body.registration_id;
  		var data       = {
  			password   : sha1(new_password)
  		}

  		var table   = {tablename:'tbl_userlogin'};
  	    var where   = {registration_id : registration_id};
  	    student.updateWhere(table,where,data, function(err, result){
  	    	res.redirect('/student/account')  
  	    });
  	
 	}
		
	
    }else{
	        student.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}
});


router.get("/check_password",function(req,res){
		
  	if(req.session.user_role==3){
  		//console.log(req.session);
  		var password  = req.query.old_password;
  		var student_id = req.session.uid;
  	
  		
  		var tableobj = {tablename:'tbl_userlogin'};
    	student.findWhere(tableobj,{ registration_id : student_id}, function(err, result){
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
	        student.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});


router.get("/homework",function(req,res){
    
    if(req.session.user_role==3){
      
     
     
      var students     = '';
      var homework     = ''; 
      var student_id   = req.session.uid;
      console.log(student_id)
      var tableobj     = {tablename:'tbl_registration'};
      student.get_student_information(tableobj,{registration_id : student_id }, function(err, result){
           console.log(result)
           var class_id   = result[0].class_id
        //console.log(students);
       
           
           var section_id   = result[0].section_id;
           var table_homework = {tablename : 'tbl_homework'}
            student.get_homeWork(table_homework,{class_id : class_id,section_id:section_id}, function(err, result1){
              homework    = result1;
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
                homework[j].student_name     = result[0].name;
                homework[j].class_name       = result[0].class_name;
                homework[j].section_name     = result[0].section_name;
                
                  
                  j++;
                  callback1(null);
                }, function(err) {
                  //console.log(homework);
                   var pagedata = {title : "Welcome Admin", pagename : "student/homework", message : req.flash('msg'),homework:homework};
                   res.render("admin_layout", pagedata);
                  
              });

            } 
         
            });
   
      });
    
  }else{
          student.select(function(err,result){
       
        res.render('admin/index');
        
      });
  }

});


router.get("/payment",function(req,res){
    
    if(req.session.user_role==3){
      //console.log(req.session);
      var student_id = req.session.uid;
     
      var year     = req.session.session_year;
      console.log(year);
      var total      = 0;
      var paid       = 0;
      var discount   = 0;
      var fees_detail='';
      var tableobj     = {tablename:'tbl_registration'};
      student.get_student_information(tableobj,{registration_id : student_id }, function(err, result){
        var table      = {tablename : 'tbl_fees_structure'}
        var class_id   = result[0].class_id;
        

        student.getFeesDetail(table,{class_id:class_id,session_year:year},function(err, result){
            var fees_detail    = result;
            
     //   console.log('asssa',fees_detail);
          var table_student    = {tablename : 'tbl_registration'}
          student.getStudentFees(table_student,{registration_id:student_id},function(err, result){
            var transport_fees   = result;
             

              fees_detail.forEach(function(item, index){
                fees_detail[index].amount_paid="";
                fees_detail[index].discount="";
                
              });
              var i=0;
              async.each(fees_detail, function (item, done){
            
                var fees_id  = item.fees_id;
              
                var table_payment  = {tablename :'tbl_student_payment'};
                student.get_paid_fees(table_payment,{fees_id:fees_id,student_id:student_id},function(err, result){
                
                        if(result=='' || result==undefined || result.length === 0){
                              fees_detail[i].amount_paid = 0.00;
                              fees_detail[i].discount    = 0.00;
                              i++;
                        }else{
                            
                              fees_detail[i].amount_paid = result[0].amount;
                              fees_detail[i].discount    = result[0].discount;
                               i++;
                              
                        }
                             total    += parseInt(item.fees_amount);
                             paid     += parseInt(item.amount_paid);
                             discount   += parseInt(item.discount);
                             done(null);
                  })
              }, function(){
                
                  var table_payment  = {tablename:'tbl_student_payment_master'}
                  student.getFeesReceipt(table_payment,{student_id:student_id},function(err, result){
                    var fees_receipt  = result;
                    //console.log(fees_receipt);return false;
                    var table_transport   = {tablename : 'tbl_registration'}
                    student.getTransportFeesReceipt(table_transport,{student_id:student_id},function(err, result){
                      var transport_receipt   = result; 

                      console.log('sdddsdsd',fees_receipt)
                      var pagedata = {title : "Welcome Admin", pagename : "student/payment", message : req.flash('msg'),fees_detail:fees_detail,transport_fees:transport_fees,fees_receipt:fees_receipt,transport_receipt:transport_receipt,total:total,paid:paid,discount:discount};
                       res.render("admin_layout", pagedata); 
                      // res.send({fees_detail:fees_detail,transport_fees:transport_fees,fees_receipt:fees_receipt,transport_receipt:transport_receipt,total:total,paid:paid,discount,discount});
                    });
                    
                  });
              });   
      
         
          
          
          });
        });
      });
    
    
  }else{
          student.select(function(err,result){
       
        res.render('admin/index');
        
      });
  }

});


router.get("/get_transport_detail", function(req, res)
{
  if(req.session.user_role==3)
  { 
    
    var receipt_number            = req.query.receipt_number;
    var student_id                = req.session.uid;
    student.get_transport_detail({table:'table'},{receipt_number:receipt_number,student_id:student_id},function(err, result){
      var detail      = result;
      var school_name   = req.session.school_name;
      var school_address  = req.session.school_address;
      var school_number   = req.session.phone; 
      var logo        = req.session.logo;
      res.send({detail:detail,school_name:school_name,school_address,school_address,school_number:school_number,logo:logo})


    });
    
    
     }else{
        
        res.render('admin/index');
  }
});


router.get("/get_receipt_detail", function(req, res)
{
  if(req.session.user_role==3)
  { 
    
    var receipt_number            = req.query.receipt_number;
    var student_id                = req.session.uid;
    student.get_receipt_detail({table:'table'},{receipt_number:receipt_number,student_id:student_id},function(err, result){
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


router.get("/exam_marks", function(req, res)
{
  if(req.session.user_role==3)
  { 
    
    var student_id         = req.session.uid;
    var session_year       = req.session.session_year;
      var tableobj         = {tablename:'tbl_enroll'};
      student.findWhere(tableobj,{ registration_id : student_id}, function(err, result){
        var class_id       = result[0].class_id;
        var section_id     = result[0].section_id;
        var tbl_exam       = {tablename:'tbl_exam_master'};
         student.findWhereorderby(tbl_exam,{class_id:class_id,session_year:session_year},{orderby:'exam_name',order:'ASC'},function(err,result1){
            var exam_list = result1; 
            exam_list.forEach(function(item, index){
             exam_list[index].section_id=section_id;
         
            });

            console.log('assasasass',exam_list);
            var pagedata = {title : "Welcome Admin", pagename : "student/exam_marks", message : req.flash('msg'),exam_list:exam_list};
                   res.render("admin_layout", pagedata);

          });

      });
    
    
     }else{
        
        res.render('admin/index');
  }
});  


router.get("/getTabulateMarksList",function(req,res){

   if(req.session.user_role==3){
    var class_id     =  req.query.class_id
    var section_id   =  req.query.section_id
    var exam_id      =  req.query.exam_id
    var session_year =  req.session.session_year; 
    var exam_code    =  req.query.exam_code;
    var student_id   =  req.session.uid;
      
     
                tabulation_list = {};
                tabulardata     = {};
                key             = "data";
             
          // tabulation_list[0].marksheet          = [];
          // tabulation_list[0].otherexammarksheet = [];
          // tabulation_list[0].student_name       = '';
          // console.log(tabulation_list)
       
                    student_id = student_id;
                    table      = {tbl_marks:"tbl_marks",tbl_registration:"tbl_registration",tbl_exam_grades:"tbl_exam_grades",tbl_subject:"tbl_subject" }   
              student.get_exam_marks_list(table,{student_id:student_id,exam_code:exam_code,class_id:class_id,section_id:section_id,exam_id:exam_id,session_year:session_year},{orderby:'name',order:'ASC'},function(err,result){

                        
                        if(result!=''){
                          marksheet='';otherexammarksheet='';
                          result.forEach(function(item, index){
                            if(item.subject_type==1)
                    marksheet += item.subject_name+'='+item.marks +'^';
                  else
                   otherexammarksheet += item.subject_name+'='+item.marks +'^'; 
                });
              
                
                marksheet =   marksheet.substring(0, marksheet.length - 1)
                otherexammarksheet=otherexammarksheet.substring(0, otherexammarksheet.length - 1)
                          tabulation_list['marksheet']        = marksheet;
                          tabulation_list['otherexammarksheet']   = otherexammarksheet;
                          tabulation_list['student_name']     = result[0].student_name;
                          tabulation_list['admission_number']     = result[0].admission_number;
                          //console.log(tabulation_list)
                       }


                         console.log('$$$$$$$$$$$$$$$$$',tabulation_list);
                          var table = {tablename : 'tbl_exam_grades'}
                student.findWhere(table,{class_id:class_id,exam_id:exam_id},function(err,result){
                    var  gradelist = result;
                    console.log(gradelist)
                    res.send({tabulation_list:tabulation_list,gradelist:gradelist});
                });
              }); 
      
  }else{
          student.select(function(err,result){
       
        res.render('admin/index');
        
      });
  }
});
module.exports=router;