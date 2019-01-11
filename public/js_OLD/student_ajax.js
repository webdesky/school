function student_check_password(old_password){

	var old_password = old_password;

	$.ajax({
				url: "/student/check_password",
						method: "GET",
						dataType: "json",
						data: {
								old_password   : old_password
								
						},
					success: function(response) {
						console.log(response)
								if(response==1){
									 $('.old_error').text('Old Password Not Match');
									 $('#old_password').val('').focus();
								}else{
									 $('.old_error').text('');
								}

					},
					error: function() {
							alert("error");
					}

	});
}

function student_password_verify(cnfrm_password){
	var new_password   = $('#new_password').val();
	var cnfrm_password = cnfrm_password;

	if(new_password==''){
	 $('.new_error').text('Please Enter New Password First');
	 $('#cnfrm_password').val('');
	}

	if(new_password!=cnfrm_password){
	 $('.cnfrm_error').text('New Password And Confirm Password Not Match');
	 $('#cnfrm_password').val(''); 
	}else{
		$('.cnfrm_error').text('');
	}
}

function get_transport_receipt_detail_student(receipt_number){
        var receipt_number  = receipt_number;
        //var student_id      = $('#student_id').val();
        $.ajax({
                 url: '/student/get_transport_detail',
                 type: 'GET',
                 data : {
                        receipt_number:receipt_number,
                   //     student_id:student_id
                        },

                 success: function(response)
                 {
                    console.log(response);
                     var detail         = response.detail;
                     var school_name    = response.school_name;
                     var school_address = response.school_address;
                     var school_phone   = response.school_number;
                     var logo           = response.logo;


                     if(detail!=''){
                                $('#school_name').text(school_name);
                                $('#school_address').text(school_address);
                                $('#school_phone').text(school_phone);
                                $('#payment_date').text(detail[0].date);
                                $('#student_name').text(detail[0].student_name);
                                $('#parent_name').text(detail[0].parent_name);
                                $('#class_name').text(detail[0].class_name);
                                $('#section_name').text(detail[0].section_name);
                                $('#receipt_number').text(detail[0].receipt_number);
                                $('#school_logo').attr('src','../../../images/'+logo+'')
                                $('#fees_receipt_data tbody').html('');
                                var sum = 0;
                                var due = 0;
                            for (var i = 0; i <= detail.length-1; i++) {
                                var count  = i +1;
                                var amount             = (parseFloat(detail[i]['amount']) + parseFloat(detail[i]['discount']));
                                $('#fees_receipt_data tbody').append('<tr><td style=" border: 1px solid #cacaca;  padding:15px;" class="bolds">'+count+'</td><td colspan="2" style=" border: 1px solid #cacaca;  padding:15px;" class="bolds">Transport Fees</td><td style=" border: 1px solid #cacaca;  padding:15px;" >'+amount+'</td></tr>');
                                $('#type').text(detail[i].type);
                                   sum  +=  parseFloat(amount) || 0;
                                   due  +=  parseFloat(detail[i].route_fare);
                            }
                            var remaining_amount  = due - sum;
                            $('#fees_receipt_data tbody').append('<tr><td class="bolds" colspan="3" style=" border: 1px solid #cacaca;  padding:15px;  text-align: center;">Total Amount Paid</td> <td style=" border: 1px solid #cacaca;  padding:15px;">'+sum+'</td></tr><tr><td class="bolds" colspan="3" style=" border: 1px solid #cacaca;  padding:15px;  text-align: center;">Overall Due Amount</td> <td style=" border: 1px solid #cacaca;  padding:15px;">'+remaining_amount+'</td></tr>');

                            $('#number_word').text(convertNumberToWords(sum));


                            $('.gaurav').hide();
                            $('#fees_receipt_modal').modal('show');
                     }

                   
                 }
          });
        console.log(receipt_number);
    }


    function get_receipt_detail_student(receipt_number){
        var receipt_number  = receipt_number;
      //  var student_id      = $('#student_id').val();
        $.ajax({
                 url: '/student/get_receipt_detail',
                 type: 'GET',
                 data : {
                        receipt_number:receipt_number,
                      //  student_id:student_id
                        },

                 success: function(response)
                 {
                    console.log(response);
                     var detail         = response.detail;
                     var school_name    = response.school_name;
                     var school_address = response.school_address;
                     var school_phone   = response.school_number;
                     var logo           = response.logo;

                     if(detail!=''){
                                $('#school_name').text(school_name);
                                $('#school_address').text(school_address);
                                $('#school_phone').text(school_phone);
                                $('#payment_date').text(detail[0].date);
                                $('#student_name').text(detail[0].student_name);
                                $('#parent_name').text(detail[0].parent_name);
                                $('#class_name').text(detail[0].class_name);
                                $('#section_name').text(detail[0].section_name);
                                 $('#school_logo').attr('src','../../../images/'+logo+'');
                                $('#receipt_number').text(detail[0].receipt_number);
                                $('#fees_receipt_data tbody').html('');
                                var sum = 0;
                                var due = 0 ;
                            for (var i = 0; i <= detail.length-1; i++) {
                                var count  = i +1;
                                var amount             = (parseFloat(detail[i]['amount']) + parseFloat(detail[i]['discount']));
                                $('#fees_receipt_data tbody').append('<tr><td style=" border: 1px solid #cacaca;  padding:15px;" class="bolds">'+count+'</td><td style=" border: 1px solid #cacaca;  padding:15px;" class="bolds">'+detail[i].fee_type+'</td><td style=" border: 1px solid #cacaca;  padding:15px;" class="bolds">'+detail[i].term_name+'</td><td style=" border: 1px solid #cacaca;  padding:15px;" >'+amount+'</td></tr>');
                                $('#type').text(detail[i].type);
                                   sum  +=  parseFloat(amount) || 0;
                                   due  +=  parseFloat(detail[i].fees_amount);
                            }
                            var remaining_amount  = due - sum;
                            $('#fees_receipt_data tbody').append('<tr><td class="bolds" colspan="3" style=" border: 1px solid #cacaca;  padding:15px;  text-align: center;">Total Amount Paid</td> <td style=" border: 1px solid #cacaca;  padding:15px;">'+sum+'</td></tr><tr><td class="bolds" colspan="3" style=" border: 1px solid #cacaca;  padding:15px;  text-align: center;">Overall Due Amount</td> <td style=" border: 1px solid #cacaca;  padding:15px;">'+remaining_amount+'</td></tr>');

                            $('#number_word').text(convertNumberToWords(sum));


                             $('.gaurav').show();
                            $('#fees_receipt_modal').modal('show');
                     }

                   
                 }
          });
        console.log(receipt_number);
    }




function get_student_exam_marks(class_id,section_id)
{
    var class_id    = class_id;
    var section_id  = section_id;
    var exam_id     = $('#student_exam_id').val();
    var exam_code   = $('#student_exam_code').val();
    
     var class_name = $('#class_id').find(":selected").text();
     var section_name = $('#section_id').find(":selected").text();
      $('#tabulation_thead tbody').html('');
      $('#tabulation_table thead').html('');
        

        if(exam_id==''){
          alert('Please Select Exam First');
          return false;
        }
        $.ajax({
            url: "/student/getTabulateMarksList",
            method: "GET",
            dataType: "json",
            data: {
                class_id   : class_id,
                section_id : section_id,
                exam_id    : exam_id,
                exam_code  : exam_code
                //student_id : student_id
            },
            success: function(response) {
             
                var tabulationlist     = response.tabulation_list;
                var gradelist          = response.gradelist;
                 console.log(tabulationlist)
                 console.log(gradelist)
                $('.tabulation_table tbody').html('');
                $('.tabulation_table thead').html('');
                dynamicheader='';
                dynamictbody='';

                studentinfo=''
                console.log(tabulationlist);
                if(jQuery.isEmptyObject(tabulationlist))
                {
                          $('#tabulationsheet').hide();
                }else{  
                  dynamicheader='<tr><th>Admission Number</th><th>Student NAME</th>';

                   
                    //for (var i = 0; i < tabulationlist.length; i++) 
                   // {
                      console.log('gaureav')
                       total = 0.0;
                      // count= i+1; 
                       dynamictbody+='<tr><td>'+tabulationlist.admission_number+'</td><td>'+tabulationlist.student_name+'</td>' 

                      // dynamictbody+='<tr><td>'+tabulationlist[i].student_name+'</td>' 

                        marksheetstr = tabulationlist.marksheet;
                        singlesubject =marksheetstr.split('^')

                        for(var j=0; j<singlesubject.length; j++)
                        {

                           subjectmasrk =singlesubject[j].split('=');    
                           subject_name=  subjectmasrk[0];
                           marks=  subjectmasrk[1];

                           //json = JSON.parse(tabulationlist[i].marks);
                           json= JSON.parse(marks);
                           keys = Object.keys(json)
                            mydata= "'"+ JSON.stringify(keys)+"'";
                            //if(i==0)
                            //{
                           subjecttotal=0.0;
                           for(k=0;k<keys.length;k++)
                           {

                               subjecttotal+=json[keys[k]];
                               total+= json[keys[k]];
                           }
                         
                           dynamicheader+='<th>'+subject_name+'</th>';

                           dynamictbody+='<td>'+subjecttotal+'</td>';
                        }
                       averagemarks= total/j;
                       var grade = ''
                           for (var l = 0; l < gradelist.length; l++) 
                           {
                                var mm= gradelist[l].student_name
                                from = gradelist[l].mark_from;
                                upto =  gradelist[l].mark_upto
                                 if(averagemarks >= from    && averagemarks <= upto  )
                                    grade = gradelist[l].name ;
                          }
                           // onclick="Formative1('+tabulationlist[i].student_id+','+tabulationlist[i].class_id+','+tabulationlist[i].section_id+')
                          //var href = "/Formative/?student_id="+tabulationlist[i].student_id+"&class_id="+class_id+"&section_id="+section_id+"&exam_id="+exam_id+"";
                          dynamictbody+='<td>'+total+'</td>'    
                          dynamictbody+='<td>'+grade+'</td>'
                          code = "'"+tabulationlist.exam_code+"'"; 
                          classname= "'"+class_name+"'";
                          sectionname = "'"+section_name+"'" ;
                          student_name = "'"+tabulationlist.student_name+"'";
                          // if(tabulationlist.exam_code=='SM1'||tabulationlist.exam_code=='SM2')
                          //   dynamictbody+='<td><a href="#"  onclick="Summative('+tabulationlist.student_id+','+class_id+','+section_id+','+exam_id+','+code+','+student_name+','+classname+','+sectionname+')">view</a></td></tr>'
                          // else
                          //   dynamictbody+='<td><a href="#"  onclick="Formative('+tabulationlist.student_id+','+class_id+','+section_id+','+exam_id+','+code+','+student_name+','+classname+','+sectionname+')">view</a></td></tr>'


                    // }
                    dynamicheader+='<th>Total</th><th>Grade</th></tr>'; 
                      /* Grade System */
               
                $("#tabulationsheet").show();
                console.log('aaaa',dynamicheader);
                console.log('bbbb',dynamictbody)
                $('.tabulation_table thead').append(dynamicheader);
                $('.tabulation_table tbody').append(dynamictbody);
                
                }
                
            },
            error: function() {
                alert("error");
            }
        });
    
}

function getStudentExamCode()
{
    
    exam_code = $( "#student_exam_id option:selected" ).attr('data-value'); 
    console.log(exam_code)
    //$("#exam_name").atrr('data-value'); 
    $("#student_exam_code").val(exam_code); 
    
}
