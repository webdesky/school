function get_student_information(student_id){
	var student_id  = student_id;

	 $.ajax({
        url: "/parent/get_student_information",
            method: "GET",
            dataType: "json",
            data: {
                student_id : student_id 
            },
           success: function(response) {

           	console.log(response);
           	var student = response.student_information;
           	$('#student_name').text(student.name);
           	$('#class_name').text(student.class_name);
           	$('#section_name').text(student.section_name);
           	$('#dob').text(student.dob);
           	$('#gender').text(student.sex);
           	$('#phone').text(student.phone);
           	$('#email').text(student.email);
           	$('#address').text(student.address);
           	$('#student_information').modal('show');
           
        },
        error: function() {
            alert("error");
        }
    });
}

function get_accademic_syllabus(class_id){
	var class_id  = class_id;


	$.ajax({
        url: "/parent/get_accademic_syllabus",
            method: "GET",
            dataType: "json",
            data: {
                class_id : class_id 
            },
           success: function(response) {

           	console.log(response);
           	$('#accademic_syllabus_table tbody').html('');
           	var accademic_syllabus  = response.accademic_syllabus;

           	for (var i = 0; i <= accademic_syllabus.length-1; i++) {
                var count  = i +1;
                var href = '<a href=../../images/'+accademic_syllabus[i].file_name+' download>Download</a>'
                $('#accademic_syllabus_table tbody').append('<tr><td style=" border: 1px solid #cacaca;  padding:15px;" class="bolds">'+count+'</td><td style=" border: 1px solid #cacaca;  padding:15px;" class="bolds">'+accademic_syllabus[i].class_name+'</td><td style=" border: 1px solid #cacaca;  padding:15px;" class="bolds">'+accademic_syllabus[i].subject_name+'</td><td style=" border: 1px solid #cacaca;  padding:15px;" >'+accademic_syllabus[i].title+'</td><td style=" border: 1px solid #cacaca;  padding:15px;" >'+accademic_syllabus[i].description+'</td><td style=" border: 1px solid #cacaca;  padding:15px;" >'+href+'</td></tr>');
                                
            }
            $('#accademic').show();
       
        },
        error: function() {
            alert("error");
        }
    });


}

function get_study_material(class_id){
	var class_id  = class_id;


	$.ajax({
        url: "/parent/get_study_material",
            method: "GET",
            dataType: "json",
            data: {
                class_id : class_id 
            },
           success: function(response) {

           	console.log(response);
           	$('#study_material tbody').html('');
           	var study_material  = response.study_material;

           	for (var i = 0; i <= study_material.length-1; i++) {
                var count  = i +1;
                var href = '<a href=../../images/'+study_material[i].file_name+' download>Download</a>'
                $('#study_material tbody').append('<tr><td style=" border: 1px solid #cacaca;  padding:15px;" class="bolds">'+count+'</td><td style=" border: 1px solid #cacaca;  padding:15px;" class="bolds">'+study_material[i].class_name+'</td><td style=" border: 1px solid #cacaca;  padding:15px;" class="bolds">'+study_material[i].subject_name+'</td><td style=" border: 1px solid #cacaca;  padding:15px;" >'+study_material[i].title+'</td><td style=" border: 1px solid #cacaca;  padding:15px;" >'+study_material[i].description+'</td><td style=" border: 1px solid #cacaca;  padding:15px;" >'+href+'</td></tr>');
                                
            }
            $('#study').show();
       
        },
        error: function() {
            alert("error");
        }
    });



}

function get_class_routine(class_id,section_id){
  var class_id   = class_id;
  var section_id = section_id;

  $.ajax({
        url: "/parent/get_class_routine",
            method: "GET",
            dataType: "json",
            data: {
                class_id   : class_id,
                section_id : section_id
            },
           success: function(response) {

           
            var  class_routine = response.class_routine;
            console.log(class_routine);
            $('#class_routine_table tbody').html('');
            var count  = 1;
            $.each(class_routine, function(key, value) {
              console.log(key)
              var detail  = '';


               $.each(value, function(skey, svalue) {
                 detail += '<div class="btn-group open"><button class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="true">'+svalue.subject_name+' ('+svalue.time_start+':'+svalue.time_start_min+'-'+svalue.time_end+':'+svalue.time_end_min+')<span class="caret"></span></button></div>';
               
               });
             
              $('#class_routine_table tbody').append('<tr><td>'+count+'</td><td>'+key+'</td><td>'+detail+'</td></tr>');
               count++;
            });
            
            $('#routine').show();
        },
        error: function() {
            alert("error");
        }
    });
}



function get_payment_information(student_id,class_id){
  var student_id   = student_id;
  var class_id     = class_id

  $.ajax({
        url: "/parent/get_payment_information",
            method: "GET",
            dataType: "json",
            data: {
                student_id   : student_id,
                class_id     : class_id
                
            },
           success: function(response) {
                         console.log(response.total)
                    var fees_detail         = response.fees_detail;
                    var transport_fees      = response.transport_fees;
                    var fees_receipt        = response.fees_receipt;
                    var transport_receipt   = response.transport_receipt;

                    var total             = response.total;
                    var paid              = response.paid;
                    var fees              = response.fees;
                    var discount          = response.discount;

                  $('#total').text(total);
                  $('#paid').text(paid);
                  $('#discount').text(discount);
                  $('#amount').text(parseFloat(total)- parseFloat((paid + discount)));
                  $('#top_heading').show();

                    $('#fees_detail_table tbody').html('');
                    if(fees_detail!=''){
                    for (var i = 0; i < fees_detail.length; i++) {
                        var count = i+1;
                        var amount_paid       = parseFloat(fees_detail[i]['amount_paid']) + parseFloat(fees_detail[i]['discount']);
                        var remaining_amount  = parseFloat(fees_detail[i]['fees_amount'])  - amount_paid;
                         if(remaining_amount==0){
                            $('#fees_detail_table tbody').append('<tr><td>'+count+'</td><td>'+fees_detail[i].fee_type+'</td><td>'+fees_detail[i].term_name+'</td><td>'+fees_detail[i].fees_amount+'</td><td>'+ fees_detail[i].amount_paid +'</td><td>'+fees_detail[i].discount+' </td><td>'+ '0.00'  +'</td><td>Paid</td></tr>');
                        }else{
                            $('#fees_detail_table tbody').append('<tr></td><td>'+count+'</td><td>'+fees_detail[i].fee_type+'</td><td>'+fees_detail[i].term_name+'</td><td>'+fees_detail[i].fees_amount+'</td><td>'+ fees_detail[i].amount_paid +'</td><td>'+fees_detail[i].discount+' </td><td>'+ remaining_amount  +'</td><td>UnPaid</td></tr>');
                        }
         
                    }
                    $('#fees_detail').show();
                    }
                    if(transport_fees!=''){
                        $('#transport_fees_table tbody').html('');
                        for (var i = 0; i < transport_fees.length; i++) {
                            var count = i+1;

                            if(transport_fees[i].paid_amount==null){
                                transport_fees[i].paid_amount = 0.00;
                            }

                            if(transport_fees[i].paid_discount==null){
                                transport_fees[i].paid_discount = 0.00;
                            }

                            var amount_paid       = parseFloat(transport_fees[i]['paid_amount']) + parseFloat(transport_fees[i]['paid_discount']);
                            var remaining_amount  = parseFloat(transport_fees[i]['route_fare'])  - amount_paid;
                            if(remaining_amount==0){
                               $('#transport_fees_table tbody').append('<tr><td>'+count+'</td><td>'+transport_fees[i].route_name+'</td><td>'+transport_fees[i].route_fare+'</td><td>'+transport_fees[i].paid_amount+'</td><td>'+transport_fees[i].paid_discount+'</td><td>'+'0.00'+'</td><td>Paid</td></tr>');
                            }else{
                                   $('#transport_fees_table tbody').append('<tr><td>'+count+'</td><td>'+transport_fees[i].route_name+'</td><td>'+transport_fees[i].route_fare+'</td><td>'+transport_fees[i].paid_amount+'</td><td>'+transport_fees[i].paid_discount+'</td><td>'+remaining_amount+'</td><td>UnPaid</td></tr>');
                            }
             
                        }
                        $('#transport_fees').show();
                    }

                    if(fees_receipt!=''){
                        $('#fees_receipt_table tbody').html('');
                        for (var i = 0; i < fees_receipt.length; i++) {
                            var count = i+1;
                        // data-toggle="modal" data-target="#fees_receipt_modal"
                                var amount       = parseFloat(fees_receipt[i]['total_amount']) + parseFloat(fees_receipt[i]['total_discount']);
                                var receipt_number  = "'"+fees_receipt[i].receipt_number+"'";
                               $('#fees_receipt_table tbody').append('<tr><td>'+count+'</td><td>'+fees_receipt[i].collected_by+'</td><td>'+fees_receipt[i].receipt_number+'</td><td>'+amount+'</td><td><button onclick="get_receipt_detail_parent('+receipt_number+','+fees_receipt[i].student_id+')"><i class="fa fa-eye" aria-hidden="true"></i></button></td></tr>');
             
                        }
                        $('#fees_receipt').show();
                    }else{
                         $('#fees_receipt').hide();
                    }

                    if(transport_receipt!=''){
                        $('#transport_receipt_table tbody').html('');
                        for (var i = 0; i < transport_receipt.length; i++) {
                            var count = i+1;
                                if(transport_receipt[i]['receipt_number']!=null){
                                   
                                    var amount       = parseFloat(transport_receipt[i]['total_amount']) + parseFloat(transport_receipt[i]['total_discount']);

                                    var receipt_number  = "'"+transport_receipt[i].receipt_number+"'";
                                    $('#transport_receipt_table tbody').append('<tr><td>'+count+'</td><td>'+transport_receipt[i].collected_by+'</td><td>'+transport_receipt[i].receipt_number+'</td><td>'+amount+'</td><td><button onclick="get_transport_receipt_detail_parent('+receipt_number+','+transport_receipt[i].student_id+')"><i class="fa fa-eye" aria-hidden="true"></i></button></td></tr>');
                                }else{
                                     $('#transport_receipt').hide();
                               }
             
                        }
                        $('#transport_receipt').show();
                    }else{
                         $('#transport_receipt').hide();
                    }
           
            
       
        },
        error: function() {
            alert("error");
        }
    });
}

function get_transport_receipt_detail_parent(receipt_number,student_id){
        var receipt_number  = receipt_number;
        var student_id      = student_id;
        $.ajax({
                 url: '/parent/get_transport_detail',
                 type: 'GET',
                 data : {
                        receipt_number:receipt_number,
                        student_id:student_id
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
                                $('#payment_date').text(detail[0].dates);
                                $('#student_name').text(detail[0].student_name);
                                $('#parent_name').text(detail[0].parent_name);
                                $('#class_name').text(detail[0].class_name);
                                $('#section_name').text(detail[0].section_name);
                                $('#receipt_number').text(detail[0].receipt_number);
                                if(logo!=''){
                                $('#school_logo').attr('src','../../../images/'+logo+'')
                                }
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
                            $('#fees_receipt_modal_parent').modal('show');
                     }

                   
                 }
          });
        console.log(receipt_number);
    }
function check_password(old_password){

  var old_password = old_password;

  $.ajax({
        url: "/parent/check_password",
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

function password_verify(cnfrm_password){
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


function get_question_paper(class_id,section_id){
  var class_id     = class_id;
  var section_id   = section_id;


    $.ajax({
        url: "/parent/get_question_paper",
            method: "GET",
            dataType: "json",
            data: {
                class_id   : class_id,
                section_id : section_id
                
            },
          success: function(response) {
           
            $('#question_paper tbody').html('');
            var question_paper  = response.question_paper;
             console.log(response.question_paper);
            for (var i = 0; i <= question_paper.length-1; i++) {
                var count  = i +1;
                var href = '<a href=../../images/'+question_paper[i].file_name+' download>Download</a>'
                $('#question_paper tbody').append('<tr><td style=" border: 1px solid #cacaca;  padding:15px;" class="bolds">'+count+'</td><td style=" border: 1px solid #cacaca;  padding:15px;" class="bolds">'+question_paper[i].class_name+'</td><td style=" border: 1px solid #cacaca;  padding:15px;" class="bolds">'+question_paper[i].section_name+'</td><td style=" border: 1px solid #cacaca;  padding:15px;" class="bolds">'+question_paper[i].subject_name+'</td><td style=" border: 1px solid #cacaca;  padding:15px;" >'+href+'</td></tr>');
                                
            }
            $('#question').show();
       

          },
          error: function() {
              alert("error");
          }

  });


}


function get_receipt_detail_parent(receipt_number,student_id){
        var receipt_number  = receipt_number;
         var student_id     = student_id;
        $.ajax({
                 url: '/parent/get_receipt_detail',
                 type: 'GET',
                 data : {
                        receipt_number:receipt_number,
                         student_id:student_id
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
                            $('#fees_receipt_modal_parent').modal('show');
                     }

                   
                 }
          });
       // console.log(receipt_number);
    }

function getParentexamCode(id)
{
    console.log(id)
    exam_code = $( "#exam_"+id+" option:selected" ).attr('data-value'); 
    console.log(exam_code)
    //$("#exam_name").atrr('data-value'); 
    $("#exam_code_"+id+"").val(exam_code); 
    
}


function get_parent_exam_marks(class_id,registration_id,section_id)
{
    var class_id    = class_id;
    var section_id  = section_id;
    var exam_id     = $('#exam_'+registration_id).val();
    var exam_code   = $('#exam_code_'+registration_id).val();
    var student_id  = registration_id;
     var class_name = $('#class_id').find(":selected").text();
     var section_name = $('#section_id').find(":selected").text();
      $('#tabulation_thead tbody').html('');
      $('#tabulation_table thead').html('');
        

        if(exam_id==''){
          alert('Please Select Exam First');
          return false;
        }
        $.ajax({
            url: "/parent/getTabulateMarksList",
            method: "GET",
            dataType: "json",
            data: {
                class_id   : class_id,
                section_id : section_id,
                exam_id    : exam_id,
                exam_code  : exam_code,
                student_id : student_id
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
                    //  console.log('gaureav')
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
                       var grade = '';
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


function PrintTabularSheet()
{
    
    try 
    {
        var printContent = document.getElementById('print_tabular').innerHTML;
        var windowUrl = '';
        var uniqueName = new Date();
        var windowName = 'Print' + uniqueName.getTime();
        var printWindow = window.open(windowUrl, windowName, 'left=50000,top=50000,width=0,height=0');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    }
    catch (e) 
    {
        self.print();
    }
} 

function get_parent_student_attendance(class_id,section_id,registration_id)
{

    
    var class_id        = class_id;
    var section_id      = section_id;
    var registration_id = registration_id;
    var month           = $('#month_id').val();

    var year = $("#currentyear").val();
      $.ajax({
            url: "/parent/get_parent_student_attendance",
            method: "GET",
            dataType: "json",
            data: {
                class_id   : class_id,
                section_id : section_id,
                registration_id : registration_id,
                month        :month
            },
            success: function(response) {

              $('#student_attendance_table tbody').html('');
              $('#student_attendance_table thead').empty();
              days= moment(year+"-"+month, "YYYY-MM").daysInMonth() ;
              var student_attendance  = response.student_attendance;
              var calendar = '<tr>';
              var attendance='<tr>'
              for (var i = 1; i <= days; i++) {
                 
                  calendar += '<td>'+i+'</td>';
                  date = year+'-'+month+'-'+ i;
                  date =moment(date).format('YYYY-MM-DD');
                  flag=false;
                  for (var j= 0; j< student_attendance.length; j++)
                  {

                    status_date= student_attendance[j].attendence_date;
                    if(date==status_date)  
                    {
                      if(student_attendance[j].status==1)
                        attendance+= '<td style="background:green">P</td>';
                      else
                      if(student_attendance[j].status==2)
                        attendance+= '<td style="background:red">A</td>';

                      flag=true;
                    }

                  }
                  if(flag==false)
                    attendance+= '<td style="background:White">&nbsp;</td>';
              }
              attendance+='</tr>'
              calendar+='</tr>';

              $('#student_attendance_table thead').append(calendar);
              $('#student_attendance_table tbody').append(attendance);
              $('#attendance').show();

            },
            error: function() {
                alert("error");
            }
      });
}

// View Attendance Report 

function get_attendace_report(class_id,section_id){
  var class_id     = class_id;
  var section_id   = section_id;


    $.ajax({
        url: "/parent/get_question_paper",
            method: "GET",
            dataType: "json",
            data: {
                class_id   : class_id,
                section_id : section_id
                
            },
          success: function(response) {
           
            $('#question_paper tbody').html('');
            var question_paper  = response.question_paper;
             console.log(response.question_paper);
            for (var i = 0; i <= question_paper.length-1; i++) {
                var count  = i +1;
                var href = '<a href=../../images/'+question_paper[i].file_name+' download>Download</a>'
                $('#question_paper tbody').append('<tr><td style=" border: 1px solid #cacaca;  padding:15px;" class="bolds">'+count+'</td><td style=" border: 1px solid #cacaca;  padding:15px;" class="bolds">'+question_paper[i].class_name+'</td><td style=" border: 1px solid #cacaca;  padding:15px;" class="bolds">'+question_paper[i].section_name+'</td><td style=" border: 1px solid #cacaca;  padding:15px;" class="bolds">'+question_paper[i].subject_name+'</td><td style=" border: 1px solid #cacaca;  padding:15px;" >'+href+'</td></tr>');
                                
            }
            $('#question').show();
       

          },
          error: function() {
              alert("error");
          }

  });


}