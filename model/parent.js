var con = require('../config/connect');
var empty = require('is-empty');

function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

module.exports.select= function(cb){
	  con.connect(function(err){
	  	    //console.log(obj);
	  	   con.query("SELECT * FROM amendo_user",cb); 
	  });
} 


module.exports.insert_all=function(tableobj, obj, cb){ 
    
      // console.log(obj);
      // return false;
     
     //if(obj.hasOwnProperty("name")>0 || obj.hasOwnProperty("registration_id")>0 )

     if(JSON.stringify(obj) != '{}')
     {
     	con.connect(function(err){
		var que = "INSERT INTO "+tableobj.tablename+" SET ?";
			   
			 con.query(que, obj, function (err, result) {
			 	//console.log("[mysql error]",err);
			 	if (err) throw err;
			 	cb(undefined, result.insertId);
		 	 });
		});
     }
     else
     	cb(undefined, 0);

	 
}


module.exports.findWhere=function(tableobj, obj, cb){
	con.connect(function(err){
		var que = "SELECT * FROM "+tableobj.tablename+" WHERE ";
		var counter = 1;
		for(var k in obj){
			if(counter==1)
			{
				que += k+"= '"+obj[k]+"'";
			}
			else
			{
				que += " AND "+k+"= '"+obj[k]+"' ";

			}
			counter++;
		}
		console.log(que)
		con.query(que, cb);
	});

	
}
module.exports.findWhereorderby=function(tableobj, obj, orerby, cb){
	con.connect(function(err){
		var que = "SELECT * FROM "+tableobj.tablename+" WHERE ";
		var counter = 1;
		for(var k in obj){
			if(counter==1)
			{
				que += k+"= '"+obj[k]+"'";
			}
			else
			{
				que += " AND "+k+"= '"+obj[k]+"' ";

			}
			counter++;
		}

		var que = que+ " ORDER BY "+orerby.orderby+" "+orerby.order

		
		con.query(que, cb);
	});

	
}

module.exports.findCount=function(tableobj,id,obj, cb){
	con.connect(function(err){
		var que = "SELECT count("+id.column+") as count FROM "+tableobj.tablename+" WHERE ";
		var counter = 1;
		for(var k in obj){
			if(counter==1)
			{
				que += k+"= '"+obj[k]+"'";
			}
			else
			{
				que += " AND "+k+"= '"+obj[k]+"' ";

			}
			counter++;
		}
 		//console.log(que)
		con.query(que, cb);
	});
	
}
module.exports.findAll=function(obj, cb){
	//console.log(obj);
	con.connect(function(err){
		var que = "SELECT * FROM "+obj.table+" ";

		con.query(que, cb);
	});
}
module.exports.findAllteacher=function(table, cb){
	//console.log(obj);
	con.connect(function(err){
		var que = "SELECT * FROM "+table.tablename+" WHERE user_role='4'";

		con.query(que, cb);
	});
}
module.exports.findFeeType=function(obj, cb){
	//console.log(obj);
	con.connect(function(err){
		var que = "SELECT * FROM "+obj.table+" LEFT JOIN tbl_class ON tbl_class.class_id="+obj.table+".class_id";

		con.query(que, cb);
	});
}


module.exports.findAllSection=function(obj, cb){
	//console.log(obj);
	con.connect(function(err){
		var que = "SELECT * FROM "+obj.table+"  LEFT JOIN tbl_class ON tbl_class.class_id="+obj.table+".class_id";
	//	console.log(que);
		con.query(que, cb);
	});
}

module.exports.getStudentInfomationByParentId=function(table,obj, cb){
	//console.log(obj);
	con.connect(function(err){
		var que = "SELECT "+table.tablename+".*,tbl_class.class_name,tbl_section.section_name,tbl_class.class_id,tbl_section.section_id FROM "+table.tablename+" LEFT JOIN tbl_enroll ON tbl_enroll.registration_id = "+table.tablename+".registration_id LEFT JOIN tbl_class ON tbl_class.class_id=tbl_enroll.class_id LEFT JOIN tbl_section ON tbl_section.section_id=tbl_enroll.section_id WHERE "+table.tablename+".parent_id="+obj.parent_id+"" ;
		console.log(que);
		con.query(que, cb);
	});
}

module.exports.get_student_information=function(table,obj, cb){
	//console.log(obj);
	con.connect(function(err){
		var que = "SELECT "+table.tablename+".*,tbl_class.class_name,tbl_section.section_name FROM "+table.tablename+" LEFT JOIN tbl_enroll ON tbl_enroll.registration_id = "+table.tablename+".registration_id LEFT JOIN tbl_class ON tbl_class.class_id=tbl_enroll.class_id LEFT JOIN tbl_section ON tbl_section.section_id=tbl_enroll.section_id WHERE "+table.tablename+".registration_id="+obj.student_id+"" ;
		console.log(que);
		con.query(que, cb);
	});
}


module.exports.get_homeWork=function(table,obj, cb){
	//console.log(obj);
	con.connect(function(err){
		var que = "SELECT "+table.tablename+".*,DATE_FORMAT("+table.tablename+".homework_date,'%M %d %Y') as homework_date,tbl_subject.name as subject_name FROM "+table.tablename+" LEFT JOIN tbl_subject ON tbl_subject.subject_id = "+table.tablename+".subject_id WHERE "+table.tablename+".class_id="+obj.class_id+" AND "+table.tablename+".section_id="+obj.section_id+"";
		console.log(que);
		con.query(que, cb);
	});
}


module.exports.getAccademicSyallabus=function(table,obj, cb){
	//console.log(obj);
	con.connect(function(err){
		var que = "SELECT "+table.tablename+".*,tbl_subject.name as subject_name,tbl_class.class_name FROM "+table.tablename+" LEFT JOIN tbl_subject ON tbl_subject.subject_id = "+table.tablename+".subject_id LEFT JOIN tbl_class ON tbl_class.class_id="+table.tablename+".class_id WHERE "+table.tablename+".class_id="+obj.class_id+"";
		console.log(que);
		con.query(que, cb);
	});
}


module.exports.getTransportDetail=function(table,obj, cb){
	//console.log(obj);
	con.connect(function(err){
		var que = "SELECT "+table.tablename+".*,tbl_class.class_name,tbl_section.section_name,tbl_class.class_id,tbl_section.section_id,tbl_transport.route_name,tbl_transport.number_of_vehicle,tbl_transport.route_fare FROM "+table.tablename+" LEFT JOIN tbl_enroll ON tbl_enroll.registration_id = "+table.tablename+".registration_id LEFT JOIN tbl_class ON tbl_class.class_id=tbl_enroll.class_id LEFT JOIN tbl_transport ON tbl_transport.transport_id="+table.tablename+".transport_id LEFT JOIN tbl_section ON tbl_section.section_id=tbl_enroll.section_id WHERE "+table.tablename+".parent_id="+obj.parent_id+"" ;
		console.log(que);
		con.query(que, cb);
	});
}


module.exports.getClassRoutine=function(table,obj, cb){
	//console.log(obj);
	con.connect(function(err){
		var que = "SELECT "+table.tablename+".*,tbl_class.class_name,tbl_section.section_name,tbl_subject.name as subject_name From "+table.tablename+" LEFT JOIN tbl_class ON tbl_class.class_id = "+table.tablename+".class_id LEFT JOIN tbl_section ON tbl_section.section_id="+table.tablename+".section_id LEFT JOIN tbl_subject ON tbl_subject.subject_id="+table.tablename+".subject_id WHERE "+table.tablename+".class_id ="+obj.class_id+" AND "+table.tablename+".section_id = "+obj.section_id+" AND "+table.tablename+".day='"+obj.day+"'" ;
		console.log(que);
		con.query(que, cb);
	});
}


module.exports.getFeesDetail=function(table,obj, cb){

	con.connect(function(err){
		
        var que = "SELECT *  FROM "+table.tablename+" LEFT JOIN tbl_fee_type ON "+table.tablename+".fees_type_id = tbl_fee_type.fee_type_id LEFT JOIN tbl_fees_term ON "+table.tablename+".fees_term_id=tbl_fees_term.term_id WHERE "+table.tablename+".class_id = "+obj.class_id+" AND "+table.tablename+".session_year= '"+obj.session_year+"'";		
		//console.log(que);
		con.query(que, cb);
	});
}

module.exports.getStudentFees=function(table,obj, cb){

	con.connect(function(err){
		//SELECT transport.route_fare ,SUM(transport_payment_master.amount) as paid_amount,SUM(transport_payment_master.discount) as paid_discount from student LEFT JOIN  transport  ON student.transport_id= transport.transport_id LEFT JOIN transport_payment_master ON transport_payment_master.student_id= student.student_id WHERE student.student_id= $student_id
        var que = "SELECT tbl_transport.route_fare,tbl_transport.route_name,tbl_transport.transport_id ,SUM(tbl_transport_payment_master.amount) as paid_amount,SUM(tbl_transport_payment_master.discount) as paid_discount  FROM "+table.tablename+" LEFT JOIN tbl_transport ON "+table.tablename+".transport_id = tbl_transport.transport_id LEFT JOIN tbl_transport_payment_master ON tbl_transport_payment_master.student_id= "+table.tablename+".registration_id WHERE "+table.tablename+".registration_id="+obj.registration_id+"";		
		//console.log(que);
		con.query(que, cb);
	});
}


module.exports.get_paid_fees=function(table,obj, cb){

	con.connect(function(err){
		
        var que = "SELECT *  FROM "+table.tablename+" WHERE "+table.tablename+".fees_id="+obj.fees_id+" AND "+table.tablename+".student_id="+obj.student_id+"";		
		//console.log(que);
		con.query(que, cb);
	});
}


module.exports.getFeesReceipt=function(table,obj ,cb){
	
		con.connect(function(err){
		
		var que = "SELECT collected_by,receipt_number,type,SUM(amount)as total_amount,SUM(discount)as total_discount,"+table.tablename+".date as dates,student_id FROM "+table.tablename+" WHERE "+table.tablename+".student_id="+obj.student_id+" GROUP BY receipt_number	";

	   //console.log(que);
		 con.query(que, cb);
	});
}


module.exports.getTransportFeesReceipt=function(table,obj, cb){

	con.connect(function(err){
		//SELECT transport_payment_master.type,transport_payment_master.amount as total_amount,transport_payment_master.discount as total_discount, transport_payment_master.collected_by,transport_payment_master.date as dates,transport_payment_master.receipt_number from student LEFT JOIN  transport  ON student.transport_id= transport.transport_id LEFT JOIN transport_payment_master ON transport_payment_master.student_id= student.student_id WHERE student.student_id= $student_id
        var que = "SELECT tbl_transport_payment_master.type,tbl_transport_payment_master.amount as total_amount,tbl_transport_payment_master.discount as total_discount, tbl_transport_payment_master.collected_by,tbl_transport_payment_master.date as dates,tbl_transport_payment_master.receipt_number,tbl_transport_payment_master.student_id  FROM "+table.tablename+" INNER JOIN  tbl_transport  ON "+table.tablename+".transport_id= tbl_transport.transport_id LEFT JOIN tbl_transport_payment_master ON tbl_transport_payment_master.student_id= "+table.tablename+".registration_id WHERE "+table.tablename+".registration_id= "+obj.student_id+"";		
		//console.log(que);
		con.query(que, cb);
	});
}

module.exports.updateWhere=function(tableobj,where, obj, cb){
    
    con.connect(function(err){
      var que= "UPDATE "+tableobj.tablename+" SET ";
      var counter = 1;
		for(var k in obj){
			if(counter==1)
			{
				que += k+"= '"+obj[k]+"'";
			}
			else
			{
				que += " , "+k+"= '"+obj[k]+"' ";

			}
			counter++;
		}

	   var key = Object.keys(where);
	   
	   if(key.length>0)

	     que += " WHERE "+key[0]+" = '"+where[key[0]]+"'";	
       con.query(que, cb);
	});
 
}

module.exports.getQuestionPaper=function(table,obj, cb){

	con.connect(function(err){
		
        var que = "SELECT "+table.tablename+".*,tbl_class.class_name,tbl_section.section_name,tbl_subject.name as subject_name,tbl_exam_master.exam_name FROM "+table.tablename+" LEFT JOIN tbl_subject ON tbl_subject.subject_id="+table.tablename+".subject_id LEFT JOIN tbl_exam_master ON tbl_exam_master.exam_id="+table.tablename+".exam_id LEFT JOIN tbl_class ON tbl_class.class_id="+table.tablename+".class_id LEFT JOIN tbl_section ON tbl_section.section_id = "+table.tablename+".section_id WHERE "+table.tablename+".class_id="+obj.class_id+" AND "+table.tablename+".section_id = "+obj.section_id+"";		
		
		con.query(que, cb);
	});
}


module.exports.get_receipt_detail=function(table,obj ,cb){
	
		con.connect(function(err){
		
		var que = "SELECT tbl_student_payment_master.*,tbl_registration.name as student_name,tbl_parent.name as parent_name,tbl_fee_type.fee_type,tbl_fees_term.term_name,tbl_class.class_name,tbl_section.section_name,tbl_fees_structure.fees_amount	 FROM tbl_student_payment_master INNER JOIN tbl_registration ON tbl_registration.registration_id = tbl_student_payment_master.student_id                                                                       INNER JOIN tbl_registration as tbl_parent ON tbl_parent.registration_id=tbl_registration.parent_id                                                       INNER JOIN tbl_fees_structure ON tbl_student_payment_master.fees_id=tbl_fees_structure.fees_id              INNER JOIN tbl_fee_type ON tbl_fees_structure.fees_type_id=tbl_fee_type.fee_type_id                         INNER JOIN tbl_fees_term ON tbl_fees_term.term_id=tbl_fees_structure.fees_term_id                           INNER JOIN tbl_enroll ON tbl_enroll.registration_id=tbl_registration.registration_id                         INNER JOIN tbl_class ON tbl_class.class_id = tbl_enroll.class_id                                             INNER JOIN tbl_section ON tbl_section.section_id = tbl_enroll.section_id   WHERE tbl_student_payment_master.student_id='"+obj.student_id+"' AND tbl_student_payment_master.receipt_number='"+obj.receipt_number+"'";

	    console.log(que);
		 con.query(que, cb);
	});
}


module.exports.get_transport_detail=function(table,obj ,cb){
	
		con.connect(function(err){
		
		var que = "SELECT tbl_registration.name as student_name,tbl_parent.name as parent_name,tbl_transport_payment_master.date as date,tbl_transport_payment_master.amount as amount,tbl_transport_payment_master.discount as discount,tbl_class.class_name,tbl_section.section_name,tbl_transport_payment_master.receipt_number,tbl_transport_payment_master.type,tbl_transport.route_fare FROM tbl_transport_payment_master                                                                                INNER JOIN tbl_registration ON tbl_transport_payment_master.student_id = tbl_registration.registration_id    INNER JOIN tbl_registration as tbl_parent ON tbl_parent.registration_id = tbl_transport_payment_master.student_id                                                                      INNER JOIN tbl_enroll ON tbl_registration.registration_id  = tbl_enroll.registration_id                     INNER JOIN tbl_class ON tbl_enroll.class_id = tbl_class.class_id      INNER JOIN tbl_transport ON tbl_registration.transport_id = tbl_transport.transport_id                                         INNER JOIN tbl_section  ON tbl_enroll.section_id = tbl_section.section_id WHERE tbl_transport_payment_master.student_id='"+obj.student_id+"' AND tbl_transport_payment_master.receipt_number='"+obj.receipt_number+"'";

	   // console.log(que);
		 con.query(que, cb);
	});
}

module.exports.get_exam_marks_list=function(obj, where, orerby, cb){
	con.connect(function(err){
		
		var que = "SELECT "+obj.tbl_marks+".* , "+obj.tbl_registration +".name as student_name , "+obj.tbl_registration +".admission_number  ,"+obj.tbl_subject +".name as subject_name FROM "+obj.tbl_marks+" LEFT JOIN "+obj.tbl_registration +" ON  "+obj.tbl_registration+".registration_id = "+obj.tbl_marks +".student_id  LEFT JOIN "+obj.tbl_subject+" ON "+obj.tbl_subject+".subject_id="+obj.tbl_marks+".subject_id  WHERE  "+obj.tbl_marks+".class_id="+ where.class_id+ " AND "+obj.tbl_marks+".section_id="+ where.section_id+" AND "+obj.tbl_marks+".exam_code='"+where.exam_code+"' AND "+obj.tbl_marks+".student_id="+ where.student_id+" AND "+obj.tbl_marks+".year='"+where.session_year+"' ORDER BY  "+obj.tbl_registration+"."+orerby.orderby+" "+orerby.order ;
		//  console.log('examn',que);
		con.query(que, cb);
	});
}

module.exports.getStudentAttendence=function(table,obj, cb){

	con.connect(function(err){
		 
		//var que = "SELECT *  FROM "+table.tablename+" WHERE "+table.tablename+".class_id="+obj.class_id+" AND "+table.tablename+".section_id="+obj.section_id+" AND "+table.tablename+".attendence_date='"+obj.attendence_date+"' AND "+table.tablename+".registration_id="+obj.student_id+" ";
        // var que = "SELECT *  FROM "+table.tbl_attendance+"                                    LEFT JOIN "+table.tbl_enroll+" ON "+table.tbl_attendance+".registration_id="+table.tbl_enroll+".registration_id WHERE "+table.tbl_attendance+".class_id='"+obj.class_id+"' AND "+table.tbl_attendance+".section_id='"+obj.section_id+"'  AND "+table.tbl_attendance+".registration_id='"+obj.registration_id+"' AND "+table.tbl_enroll+".bonafide_status='0' AND "+table.tbl_enroll+".session_year='"+obj.session_year+"' AND MONTH(attendence_date)='"+obj.month+"'";	
        // console.log(que)	
        var que = "SELECT *  FROM "+table.tbl_attendance+"  LEFT JOIN "+table.tbl_enroll+" ON "+table.tbl_attendance+".registration_id="+table.tbl_enroll+".registration_id WHERE "+table.tbl_attendance+".class_id='"+obj.class_id+"' AND "+table.tbl_attendance+".section_id='"+obj.section_id+"'  AND MONTH("+table.tbl_attendance+".attendence_date) ="+obj.month+" AND "+table.tbl_attendance+".registration_id='"+obj.registration_id+"' AND "+table.tbl_enroll+".bonafide_status='0' AND "+table.tbl_enroll+".session_year='"+obj.session_year+"'";	
        console.log('----------------------',que)	
		con.query(que, cb);
	});
}