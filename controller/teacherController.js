var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var teacher = require('../model/teacher');
var moment 		= require('moment');
var changename 	= require("../helper/changefilename");
var fs 			= require('fs');
var async 		= require('async');
var path 		= require('path');

var msg91 = require("msg91")("217251AHzwgfQryg5b08d540", "edurec", "4" );
var fs = require('fs');
var parse = require('csv-parse');
var  Json2csvParser = require('json2csv').Parser;


router.get("/",function(req,res){
 	if(req.session.user_role==4)
		{	
			 findObj  = {user_role  : 4}
			 tableobj = {tablename  :'tbl_registration'}
		  	 column   =	{column 	:'registration_id'}
	         teacher.findCount(tableobj,column,findObj,function(err,parent){
	          	var parent_count  = parent[0].count;
	         	teacher.findCount(tableobj,column,{user_role:3},function(err,student){
	          	var student_count  = student[0].count;
	          		teacher.findCount(tableobj,column,{user_role:4},function(err,teacher){
	          		var teacher_count  = teacher[0].count;
						var pagedata = {title : "Welcome Admin", pagename : "admin/dashboard", message : req.flash('msg'),parent_count:parent_count,student_count:student_count,teacher_count:teacher_count};
					    res.render("admin_layout", pagedata);
					});
				});
			 });
		}else
		{
	        teacher.select(function(err,result){
	           res.render('admin/index');
		 	});
	 	}
});
router.get("/dashboard",function(req,res){
		
  	if(req.session.user_role==4)
		{
		var pagedata = {title : "Welcome Admin", pagename : "teacher/dashboard", message : req.flash('msg')};
	    res.render("admin_layout", pagedata);
	    }else{
	        teacher.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});

/* Delete amy record when click on delete button in list */
router.post("/delete", function(req, res){
    var key = Object.keys(req.body);
 	if(req.session.user_role==4)
	{
	 var findObj = {};
     name = req.body.columname;
     findObj[name] =  req.body.id;
     var tableobj = {tablename:req.body.tablename};
     teacher.deletewhere(tableobj,findObj,function(err,result){
     	res.send(JSON.stringify(result));
     });
    }
    else
    {
	  	    res.render('admin/index');
	}
});	



/* Get All Student Detail */
router.get("/studentlist", function(req, res){
	if(req.session.user_role==4)
	{
		var table  = 'tbl_class';
        tableobj= { tbl_class_routine:' tbl_class_routine',tbl_class:'tbl_class',tbl_section:'tbl_section'} 

        groupby= {class_id:'tbl_class_routine.class_id'}
        orderby= {class_name:'tbl_class.class_name', order:'ASC'}
		teacher.FindTeacherClass(tableobj,groupby,orderby,function(err, result){
		    var class_list 	 = result;


			var pagedata 	 = {Title : "", pagename : "teacher/studentlist", message : req.flash('msg'),class_list:class_list};

			res.render("admin_layout", pagedata);
		});
	}else{
	        teacher.select(function(err,result){
			    res.render('admin/index');
		 	});
	}
});

router.get("/getSection", function(req, res)
{
	if(req.session.user_role==4){
		var class_id =req.query.class_id
	    tableobj= { tbl_class_routine:' tbl_class_routine',tbl_section:'tbl_section'} 
        groupby= {section_id:'tbl_class_routine.section_id'}
        orderby= {section_name:'tbl_section.section_name', order:'DESC'}
        where= { class_id:class_id}
		teacher.FindTeacherSection(tableobj,where,groupby,orderby,function(err, result){
			
		    var section_list = result;
			res.send({section_list:section_list});
		});
	}else{
	        teacher.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}
});

/* Get Student List on selcet of class and section */
router.get("/classsection_studentList", function(req, res)
{
	if(req.session.user_role==4){ 
		var year= req.session.session_year;
		var class_id =req.query.class_id
		var section_id =req.query.section_id
	    var table = {tbl_registration:'tbl_registration',tbl_enroll:'tbl_enroll'};



	    teacher.getstudentlist(table,{class_id:class_id,section_id:section_id,session_year:year},function(err, result){
	    	console.log(result);


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
					 teacher.findWhere(Table,{registration_id:registration_id},function(err, result1){
				     var parents_list  = Object.values(JSON.parse(JSON.stringify(result1)))
				     student_list[n].parentphone=parents_list[0].phone;
				     student_list[n].parentname=parents_list[0].name;
				     student_list[n].parentemail=parents_list[0].email;
				     if(year)
				     {
                        years = year.split("-");
				        student_list[n].nextyear = years[1] +'-'+ (parseInt(years[1])+1);
				     }  
				     
				     done(null);
				     n++;
					});
				}, function(){

                      res.send({student_list:student_list});
			  });
		});
     }else{
	      
		    res.render('admin/index');
	}
}); 

/* OPen Page with class list  */
router.get("/subjectList", function(req, res){
	if(req.session.user_role==4){
 	   var table  = 'tbl_class';
        tableobj= { tbl_class_routine:' tbl_class_routine',tbl_class:'tbl_class',tbl_section:'tbl_section'} 

        groupby= {class_id:'tbl_class_routine.class_id'}
        orderby= {class_name:'tbl_class.class_name', order:'ASC'}
		teacher.FindTeacherClass(tableobj,groupby,orderby,function(err, result){
		    var class_list 	 = result;
  

			var pagedata 	 = {Title : "", pagename : "teacher/subject_list", message : req.flash('msg'),subject_list:"",class_list:class_list};

			res.render("admin_layout", pagedata);
		});
	  
	}else{
	      
		    res.render('admin/index');
		
	}
});

/* Get All subject List on select of class name */
router.get("/classsection_subjectList", function(req, res){  // Ajax Call 
	if(req.session.user_role==4){
		console.log('Hello');
	   var table = 'tbl_subject';
		    var class_id =req.query.class_id;
		    var year= req.session.session_year;
		    var registration_id= req.session.uid;
            tableobj= {tbl_class_routine:' tbl_class_routine',tbl_subject:'tbl_subject'} 
	        where= { class_id:class_id,session_year:year,registration_id:registration_id}
	         
	        
		    teacher.getsubjectlist(tableobj,where,function(err, result){
			 	  var subject_list 	 = result;
				  res.send({subject_list: subject_list});
			});	
	}else{
		    res.render('admin/index');
	}
});

/* 
** Get Class Routine of specified teacher 
*/
router.get("/classroutineList", function(req, res){

	if(req.session.user_role==4){

 	   var table  = 'tbl_class';
        tableobj= { tbl_class_routine:' tbl_class_routine',tbl_class:'tbl_class',tbl_section:'tbl_section'} 

        groupby= {class_id:'tbl_class_routine.class_id'}
        orderby= {class_name:'tbl_class.class_name', order:'ASC'}
		teacher.FindTeacherClass(tableobj,groupby,orderby,function(err, result){
		    var class_list 	 = result;
  

			var pagedata 	 = {Title : "", pagename : "teacher/classRoutineList", message : req.flash('msg'),subject_list:"",class_list:class_list,class_routine:"",routinedata:""};

			res.render("admin_layout", pagedata);
		});
	  
	}else{
	      
		    res.render('admin/index');
		
	}

});

router.post("/classroutineList", function(req, res){

	if(req.session.user_role==4){ 
		var class_id   = req.body.Teacher_class_id;
		var section_id = req.body.Teacher_section_id;
		var registration_id= req.session.uid;
		var session_year = req.session.session_year;



		 var routinedata={};
		  routinedata['class_id']=class_id
		  routinedata['section_id']=section_id
		 
			var day = [ 'sunday', 'monday', 'tuesday','wednesday','thursday','friday','saturday'];
			//console.log(arr3);
				var abc  = [];
				var n = 0;

				async.each(day, function (item, done) {
						 		var class_routine = {tablename : 'tbl_class_routine'}
								teacher.findClassRoutine(class_routine,{class_id:class_id,section_id:section_id,registration_id:registration_id,day:item,session_year:session_year},function(err, result1){
								var class_routine  = Object.values(JSON.parse(JSON.stringify(result1)))
								    abc[n]=class_routine;

                                     if(class_routine.length)
								        routinedata['section_name']=class_routine[n].section_name
								      n++;
								    done(null);
								});
						}, function(){

						 var class_routine = abc
    
						 var table  = 'tbl_class';
				         tableobj= { tbl_class_routine:' tbl_class_routine',tbl_class:'tbl_class',tbl_section:'tbl_section'} 

				         groupby= {class_id:'tbl_class_routine.class_id'}
				         orderby= {class_name:'tbl_class.class_name', order:'ASC'}
						teacher.FindTeacherClass(tableobj,groupby,orderby,function(err, result){
						   var class_list 	 = result;
						   var pagedata = {title : "Welcome Admin", pagename : "teacher/classRoutineList", message : req.flash('msg'),class_routine:class_routine,class_list:class_list,routinedata:routinedata};
						   res.render("admin_layout", pagedata);
						});
					});
			
	}else{

		    res.render('admin/index');
		
	}
});

/*
**   *******  Study Material  ************
*/ 
router.get("/study_material", function(req, res){
	if(req.session.user_role==4){
		
		var table  = 'tbl_class';
        tableobj= { tbl_class_routine:' tbl_class_routine',tbl_class:'tbl_class',tbl_section:'tbl_section'} 
        groupby= {class_id:'tbl_class_routine.class_id'}
        orderby= {class_name:'tbl_class.class_name', order:'ASC'}

		teacher.FindTeacherClass(tableobj,groupby,orderby,function(err, result){
		    var class_list 	 = result;


            
            var tbl_document = {tablename :'tbl_document'}
	        var registration_id = req.session.uid;
	        var session_year=  req.session.session_year;


	        obj={registration_id:registration_id,session_year:session_year}   

		     if(req.query.document_id != undefined ) 
		     {
		     	console.log(req.query.document_id);
		     	 obj={registration_id:registration_id,session_year:session_year,document_id:req.query.document_id} 
		     	   
		     	 teacher.findStudyMaterialDetail(tbl_document,obj,function(err, result){
			 
				    var document_list 	 = result;
					var pagedata 	 	 = {Title : "", pagename : "teacher/study_material", message : req.flash('msg'),document_list:document_list,class_list:class_list};
					res.render("admin_layout", pagedata);
				});
		     }
		     
			 teacher.findStudyMaterial(tbl_document,obj,function(err, result){
			 
			    var document_list 	 = result;
				var pagedata 	 	 = {Title : "", pagename : "teacher/study_material", message : req.flash('msg'),document_list:document_list,class_list:class_list};
				res.render("admin_layout", pagedata);
			});
			
		});
    }else{
	        teacher.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}
});

//Ajax call on select class name drop down 
router.get("/TeachergetAllData", function(req, res){
	if(req.session.user_role==4){

		var class_id =req.query.class_id
	    var registration_id = req.session.uid;
		var session_year=  req.session.session_year;
        tableobj= { tbl_class_routine:' tbl_class_routine',tbl_subject:'tbl_subject'} 
        where= {class_id:'tbl_class_routine.class_id',registration_id:registration_id,session_year:session_year}
		teacher.findassignedsubject(tableobj,where,function(err, result){
            subject_list=result;
			res.send({subject_list:subject_list});
		});
	}else{
	        teacher.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}
});

/* Save Study Material Data posted by teacher */

router.post("/study_material", function(req, res){
  if(req.session.user_role==4){
 	
 
 	
  	var class_id            = req.body.Teacher_class_id;
  	var subject_id  		= req.body.Teacher_subject_id;
  	var title        		= req.body.title;
  	var description    		= req.body.descriptions;
  	var moment = require('moment');
	var created_date = moment().format('YYYY-MM-DD:hh:mm:ss');
	var session_year=  req.session.session_year;
	var registration_id=  req.session.uid;
  	
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
  			created_date	    : created_date,
  			session_year        : session_year,
  			registration_id     : registration_id
  		}

  		var table   = {tablename:'tbl_document'};

  	
  		teacher.insert_all(table,data,function(err, result){

  			res.redirect('/teacher/study_material')
  		});

 
    }else{
	        teacher.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}
});


/***************************************/

/* 
** Academic Syllabus 
*/

/* Get Dafult page of Academic Syllabus */



router.get("/AcademicSyllabus", function(req, res){

	if(req.session.user_role==4){
		
		var class_id   			= req.query.class_id
		var subject_id 			= req.query.subject_id
		var session_year        = req.session.session_year;

        table={ tbl_academic_syllabus:'tbl_academic_syllabus',tbl_class:'tbl_class',tbl_subject:'tbl_subject'}
        obj = {class_id:class_id,subject_id:subject_id,session_year:session_year}

        teacher.findAcademicSyllabus(table,obj,function(err, result){
               syllabuslist= result;

			    res.send(syllabuslist);
				//var pagedata 	 	 = {Title : "", pagename : "teacher/academic_syllabus", message : req.flash('msg'),document_list:document_list,class_list:class_list};
				//res.render("admin_layout", pagedata);

		});
    }else{

	      teacher.select(function(err,result){
		    res.render('admin/index');
	 	  });
	}
});
router.get("/academic_syllabus", function(req, res){

	if(req.session.user_role==4){
		var table  = 'tbl_class';
        tableobj= { tbl_class_routine:' tbl_class_routine',tbl_class:'tbl_class',tbl_section:'tbl_section'} 
        groupby= {class_id:'tbl_class_routine.class_id'}
        orderby= {class_name:'tbl_class.class_name', order:'ASC'}

		teacher.FindTeacherClass(tableobj,groupby,orderby,function(err, result){
		    var class_list 	 = result;
				var pagedata 	 	 = {Title : "", pagename : "teacher/academic_syllabus", message : req.flash('msg'),class_list:class_list,syllabus_list:""};
				res.render("admin_layout", pagedata);
			
		});
    }else{
	        teacher.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}
});

router.post("/academic_syllabus", function(req, res){ 
  if(req.session.user_role==4){
 	
 	
  	var class_id            = req.body.Teacher_class_id;
  	var subject_id  		= req.body.Teacher_subject_id;
  	var title        		= req.body.title;
  	var description    		= req.body.descriptions;
  	var moment = require('moment');
	var created_date = moment().format('YYYY-MM-DD:hh:mm:ss');
	var session_year=  req.session.session_year;
	var registration_id=  req.session.uid;
  	
  	var file = req.files.file;
  	
  
  	var image= '';
  	if(typeof file=="undefined"){

  			var image = '';
  	}else{
	  	var newname = changename(file.name);
	  	var filepath = path.resolve("public/academic_syllabus/"+newname);
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
  			created_date	    : created_date,
  			year        : session_year,
  		}


  		var table   = {tablename:'tbl_academic_syllabus'};
  		teacher.insert_all(table,data,function(err, result)
  		{

  			var table  = 'tbl_class';
	        tableobj= { tbl_class_routine:' tbl_class_routine',tbl_class:'tbl_class',tbl_section:'tbl_section'} 
    	    groupby= {class_id:'tbl_class_routine.class_id'}
        	orderby= {class_name:'tbl_class.class_name', order:'ASC'}

			 

			teacher.FindTeacherClass(tableobj,groupby,orderby,function(err, result){
			      var class_list 	 = result;
			      console.log('class_list',class_list);
			     
			      table={ tbl_academic_syllabus:'tbl_academic_syllabus',tbl_class:'tbl_class',tbl_subject:'tbl_subject'}
			      obj = {class_id:class_id,subject_id:subject_id,session_year:session_year}
				  teacher.findAcademicSyllabus(table,obj,function(err, result){
					 
					   syllabus_list = result;
					   console.log('syllabus_list',syllabus_list);
					   var pagedata 	 	 = {Title : "", pagename : "teacher/academic_syllabus", message : req.flash('msg'),class_list:class_list,syllabus_list:syllabus_list};
				       res.render("admin_layout", pagedata);

				   });
				
			});

	        
  		});

 
    }else{
	        teacher.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}
});


/*
** Get All Attendace of student by teacher 
*/
router.get("/attendance", function(req, res){
	if(req.session.user_role==4){

		var table  = 'tbl_class';
		teacher.findAll({table:table},function(err, result){

		    var class_list 	 = result;
		    teacher.findAllteacher({tablename:'tbl_registration'},function(err, result1){
		    var teacher_list = result1
		    var n =0;
		    async.each(teacher_list, function (item, done) {

						 		console.log(item.registration_id)
						 		
						 		var tbl_attendence = {tablename : 'tbl_attendance'}
						 		var attendence_date= moment().format('DD-MM-YYYY');
								teacher.getTeacherAttendence(tbl_attendence,{attendence_date:attendence_date,student_id:item.registration_id},function(err, result1){
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

				 // console.log(teacher_list)
				 // return false;
						//res.send(teacher_list)
				
			    var pagedata = {title : "Welcome Admin", pagename : "teacher/attendance", message : req.flash('msg'),class_list:class_list,teacher_list:teacher_list};
					    res.render("admin_layout", pagedata);
					
				});
			
			});
		});
    }else{
	        teacher.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}
});


/*
**      *************** Manage Marks ******************** 
*/

router.get("/manage_marks", function(req, res){
	if(req.session.user_role==4){
		
		var table  = 'tbl_class';
        tableobj= { tbl_class_routine:' tbl_class_routine',tbl_class:'tbl_class',tbl_section:'tbl_section'} 
	    groupby= {class_id:'tbl_class_routine.class_id'}
    	orderby= {class_name:'tbl_class.class_name', order:'ASC'}

		teacher.FindTeacherClass(tableobj,groupby,orderby,function(err, result){
		    var class_list 	 = result;
			var pagedata 	 = {Title : "", pagename : "teacher/manage_marks", message : req.flash('msg'),class_list:class_list};
			res.render("admin_layout", pagedata);
		});
	}else{
	        teacher.select(function(err,result){
	     
		    res.render('teacher/index');
			  
		 	});
	}
});






router.get("/manage_marks", function(req, res){
	if(req.session.user_role==4){
		
		var table  = 'tbl_class';
	
		teacher.findAll({table:table},function(err, result){
		    var class_list 	 = result;
			var pagedata 	 = {Title : "", pagename : "admin/manage_marks", message : req.flash('msg'),class_list:class_list};
			res.render("admin_layout", pagedata);
		});
	}else{
	        teacher.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}
});

/*
**  ** Get all marks on manage Marks section  **
*/
router.get("/getStudentAllDetail", function(req, res){
	if(req.session.user_role==4){
		var class_id 	= req.query.class_id
		var section_id	= req.query.section_id
	   	var subject_id  = req.query.subject_id
	   	var exam_id     = req.query.exam_id
	   	var subject_type= req.query.subject_type
	   	//var exam_code   = req.query.exam_code


	    var table  		= {tablename:'tbl_enroll'};
        	var student_detail  = ''; 
        	var n 			= 0;  
        	console.log('Helllllllllllllll')  
			teacher.getStudentsformarks(table,{class_id:class_id,section_id:section_id},function(err, result){

				var student_detail  = result;
				async.each(student_detail, function (item, done) {

					var student_id = item.registration_id;
			 	  	var tbl_marks = {tablename : 'tbl_marks'}
	                var session_year = req.session.session_year;  
					teacher.findWhere(tbl_marks,{year:session_year,student_id:student_id,class_id:class_id,section_id:section_id,subject_id:subject_id,exam_id:exam_id},function(err, result1){
					var table  = {tablename:'tbl_marks'};
					var session_year = req.session.session_year;

                        //admin.getstudentexammarks(table,{session_year:session_year,student_id:student_id,class_id:class_id,section_id:section_id,subject_id:subject_id,exam_id:exam_id},function(err, student_marks){
						  var tbl_formats = {tablename : 'tbl_sheet_formats'}

                            teacher.getcolumnformat(tbl_formats,{class_id:class_id,exam_id:exam_id},function(err, result2){

                              if(result1==undefined || result1=='')
                              {
                                  	
							  		if(subject_type==0)
							  		     student_detail[n].marks=result2[0].otheracivity;
							  		else
							  		 	student_detail[n].marks=result2[0].column;

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
				teacher.getexammarks(table_exam,{class_id:class_id,section_id:section_id,subject_id:subject_id,exam_id:exam_id},function(err,result1){

			    		res.send({student_detail:student_detail,total_marks:result1})
			    	});					
				});
			});
	}else{
	        teacher.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}
});

// Post exam marks 

router.post("/add_manage_marks", function(req, res){
	if(req.session.user_role==4){
		var data = req.body
		var student_id 				= req.body.student_id;
		var class_id 				= req.body.Teacher_class_id;
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
				
	  			teacher.getMarks(table,{student_id:student_id[k],class_id:class_id,section_id:section_id,subject_id:subject_id,exam_id:exam_id},function(err, result1){
	  				 console.log('Exisiting Data-----------',result1);
	  				if(result1!=''){
	  					//console.log('SDssdds')
	  					var id = result1[0].mark_id
	  					var findObj = {};
			     
			         	findObj['mark_id'] = id;


			
					     teacher.deletewhere(table,findObj,function(err,result){

					     });
	  				}
	  			});
			 var table  = {tablename:'tbl_marks'}
			 teacher.insert_all(table,data,function(err, result){

			 })
		 
          }
			res.redirect('/teacher/manage_marks');	
			
    }else{
	        teacher.select(function(err,result){
	     
		    res.render('teacher/index');
			  
		 	});
	}
});


router.get("/getTeacherStudentAttendence", function(req, res){
	if(req.session.user_role==4){
		
		var class_id   			= req.query.class_id
		var section_id 			= req.query.section_id
		var attendence_date		= req.query.attendence_date
		var session_year	    = req.session.session_year
       // console.log(req.query);

        var object = {};

	    	var table  		=  {tbl_attendance : 'tbl_attendance',tbl_enroll:'tbl_enroll',tbl_registration:'tbl_registration'}
        	var student_id  = ''; 
        	var n 			= 0;    
			teacher.getStudent(table,{class_id:class_id,section_id:section_id,session_year:session_year},function(err, result){
						var student_id  = result;
						console.log('student_id',student_id)
						async.each(student_id, function (item, done) {

						 		//console.log(item.registration_id)
						 		
						 		var tbl_attendence = {tablename : 'tbl_attendance'}

								teacher.getStudentAttendence(table,{class_id:class_id,section_id:section_id,attendence_date:attendence_date,student_id:item.registration_id,session_year:session_year},function(err, result1){
									console.log('teacher abc',result1)
								  	if(result1==undefined || result1==''){
								  		   student_id[n].attendence='';
								  	}else{
								  		   student_id[n].attendence=result1[0].status;
								  	}
								  
								    n++;
									
								    done(null);
								});
						}, function(){

					//	console.log(student_id)
						res.send(student_id)
					
						});

			});
		//	console.log(student_id)

			
	}else{
	        teacher.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}
});



router.post("/addAttendence", function(req, res){
	if(req.session.user_role==4){
		    //var type 				= req.body.attendence;
		
			var class_id  			= req.body.Teacher_class_id;
			var section_id 			= req.body.Teacher_section_id;
			var attendence_date		= req.body.teacher_attendence_date;
			var student_id			= req.body.student_id;
			var status				= req.body.status;
			var session_year        = req.session.session_year;

			var check  = Array.isArray(student_id);
			if(check==false){
				var data = {
						class_id 		: class_id,
						section_id		: section_id,
						attendence_date	: attendence_date,
						registration_id : student_id,
						status		    : status,
						created_date 	: moment().format('YYYY-MM-DD:hh:mm:ss'),
						session_year	: req.session.session_year,
						user_role		: 3
					}

					var table   = {tbl_attendance:'tbl_attendance',tbl_enroll : 'tbl_enroll',tablename:'tbl_attendance'};
					
		  			teacher.getStudentAttendence(table,{class_id:class_id,section_id:section_id,attendence_date:attendence_date,student_id:student_id,session_year:session_year},function(err, result1){
		  				console.log('abcbdsdd',result1);
		  				if(result1=='' || result1==undefined){
		  					
		  				}else{
		  					var id = result1[0].attendance_id
		  					var findObj = {};
				            findObj['attendance_id'] = id;
				            teacher.deletewhere(table,findObj,function(err,result){
	                        });
		  				}

		  				
		  			});

		  			
		  			teacher.insert_all(table,data,function(err, result){
			  			
			  		});
			}else{
				for(var k in student_id){

					var data = {
						class_id 		: class_id,
						section_id		: section_id,
						attendence_date	: attendence_date,
						registration_id : student_id[k],
						status		    : status[k],
						created_date 	: moment().format('YYYY-MM-DD:hh:mm:ss'),
						session_year	: req.session.session_year,
						user_role		: 3
					}

					var table   = {tbl_attendance:'tbl_attendance',tbl_enroll :'tbl_enroll'};
					
		  			teacher.getStudentAttendence(table,{class_id:class_id,section_id:section_id,attendence_date:attendence_date,student_id:student_id[k],session_year:session_year},function(err, result1){
		  				console.log(result1);
		  				if(result1!=''){
		  					var id = result1[0].attendance_id
		  					var findObj = {};
				            findObj['attendance_id'] = id;
				            admin.deletewhere(table,findObj,function(err,result){
	                        });
		  				}
		  			});
		  			//console.log(data)
		  			var table_attendance  = {tablename : 'tbl_attendance'}
		  			teacher.insert_all(table_attendance,data,function(err, result){
			  			
			  		});
			  		
				}
			}
		
	    res.redirect('/teacher/attendance')
		//console.log(req.body)

			
	}else{
	        teacher.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}
});



router.get("/QuestionPaper", function(req, res){
	if(req.session.user_role==4){
		var table  = 'tbl_class';
	
		teacher.findAll({table:table},function(err, result){
		    var class_list 	 = result;

		    var table = 'tbl_question_paper';
	 
			 teacher.findquestionpaper({table:table},function(err, result){

			    var question_paper_list 	 = result;
				var pagedata 	 	 = {Title : "", pagename : "teacher/questionpaper", message : req.flash('msg'),question_paper_list:question_paper_list,class_list:class_list};
				res.render("admin_layout", pagedata);
			});
			
		});
    }else{
	        teacher.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}
});


router.post("/QuestionPaper", function(req, res){
  if(req.session.user_role==4){

  	var class_id            = req.body.class_id;
  	var section_id          = req.body.exam_section_id;
  	var subject_id  		= req.body.subject_id;
  	var exam_id  		    = req.body.exam_id;
  	var moment 				= require('moment');
	var dates 				= moment().format('YYYY-MM-DD:hh:mm:ss');
  	var session_year=  req.session.session_year; 
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
  			session_year        : session_year,
  			created_date	    : dates
  		}
  		var table   = {tablename:'tbl_question_paper'};
  	
  		teacher.insert_all(table,data,function(err, result){
			
		});	

  		var table  = 'tbl_class';
	
		teacher.findAll({table:table},function(err, result){
		    var class_list 	 = result;
		    var table = 'tbl_question_paper';
			teacher.findquestionpaper({table:table},function(err, result){
			 	//console.log(result);
			    var question_paper_list 	 = result;
				var pagedata 	 	 = {Title : "", pagename : "admin/questionpaper", message : req.flash('msg'),question_paper_list:question_paper_list,class_list:class_list};
				res.render("admin_layout", pagedata);
			});
		});
     }else{
	        teacher.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}
});


router.get("/getTeacherAllExamData", function(req, res){
	if(req.session.user_role==4){
		var class_id 	= req.query.class_id
		var section_id	= req.query.section_id
	   
			 	var tbl_subject  = {tablename:'tbl_subject'};
			 	teacher.findWhere(tbl_subject,{class_id:class_id},function(err, result){
			 		var subject_list  = result;
			 		var tbl_exam  = {tablename:'tbl_exam_master'};
			 		var session_year = req.session.session_year
			 		teacher.findWhereorderby(tbl_exam,{class_id:class_id,session_year:session_year},{orderby:'exam_name',order:'ASC'},function(err,result){
			 			var exam_list = result
			 			res.send({subject_list:subject_list,exam_list:exam_list});
			 		})
				});
			 	//res.send('Gaurav');
			
	}else{
	        teacher.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}
});



/* 
 ** Get All Exam Name on select of class name only 
*/
router.get("/getTeacherAllExamName", function(req, res){
	if(req.session.user_role==4){
		var class_id 	= req.query.class_id
		//var section_id	= req.query.section_id
	   
			 	var tbl_subject  = {tablename:'tbl_subject'};
			 	teacher.findWhere(tbl_subject,{class_id:class_id},function(err, result){
			 		var subject_list  = result;
			 		var tbl_exam  = {tablename:'tbl_exam_master'};
			 		teacher.findWhereorderby(tbl_exam,{class_id:class_id},{orderby:'exam_name',order:'ASC'},function(err,result){
			 			var exam_list = result
			 			res.send({subject_list:subject_list,exam_list:exam_list});
			 		})
				});
			 	//res.send('Gaurav');
			
	}else{
	        teacher.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}
})


/* 
 ** Get All Scheduled Exam Name of selected subject  
*/
router.get("/getTeacherSecheduledExamName", function(req, res){
	if(req.session.user_role==4){
		var class_id 	= req.query.class_id
		var subject_id 	= req.query.subject_id
		var session_year=  req.session.session_year; 
		var section_id=  req.query.section_id;

			table={tbl_exam_master:"tbl_exam_master",tbl_exam_schedule:"tbl_exam_schedule",tbl_exam_grades:"tbl_exam_grades" }
	 		teacher.get_subject_scheduled_exam(table,{class_id:class_id,section_id:section_id,subject_id:subject_id,session_year:session_year},{orderby:'exam_name',order:'ASC'},{exam_id:'exam_id'},function(err,result){
	 			var exam_list=result
                res.send({exam_list:exam_list});
	 		})
	}else{
	        teacher.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}
});


router.get("/account",function(req,res){
		
  	if(req.session.user_role==4){
  		//console.log(req.session);
  		var teacher_id = req.session.uid;

  		var tableobj = {tablename:'tbl_registration'};
    	teacher.findWhere(tableobj,{ registration_id : teacher_id}, function(err, result){
    			console.log('abc',result);
    		 var pagedata = {title : "Welcome Admin", pagename : "teacher/account", message :'Updated Succesfully',student:result[0]};
	         res.render("admin_layout", pagedata);
  		
    	});
		
	}else{
	        teacher.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});


router.post("/account_information", function(req, res){
	if(req.session.user_role==4){
		

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
  	    teacher.updateWhere(table,where,data, function(err, result){
  	    	res.redirect('/teacher/account')  
  	    });
  	}else if(type =='password'){
  		var new_password    = req.body.new_password;
  		var registration_id = req.body.registration_id;
  		var data       = {
  			password   : sha1(new_password)
  		}

  		var table   = {tablename:'tbl_userlogin'};
  	    var where   = {registration_id : registration_id};
  	    teacher.updateWhere(table,where,data, function(err, result){
  	    	res.redirect('/teacher/account')  
  	    });
  	
 	}
		
	
    }else{
	        teacher.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}
});



router.get("/check_password",function(req,res){
		
  	if(req.session.user_role==4){
  		//console.log(req.session);
  		var password  = req.query.old_password;
  		var teacher_id = req.session.uid;
  	
  		
  		var tableobj = {tablename:'tbl_userlogin'};
    	teacher.findWhere(tableobj,{ registration_id : teacher_id}, function(err, result){
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
	        teacher.select(function(err,result){
	     
		    res.render('admin/index');
			  
		 	});
	}

});
module.exports=router;





