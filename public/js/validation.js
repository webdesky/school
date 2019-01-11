$(document).ready(function(){

/* Get value of specific user on register page */


    
    user =$("input[type=radio][name='register']:checked").val()

    $(".userregister").val(user);
    

    $( ".abc" ).change(function() {
       $(".userregister").val('');
       user =$("input[type=radio][name='register']:checked").val()
       $(".userregister").val(user);
    });

/**********/
     
     
});

$('form[id="student_register"]').validate({

 rules: {
          student_name: 'required',
          student_gender: 'required',
          caste : 'required',
          sub_caste : 'required',
          class_id : 'required',
          section_id : 'required',
          adhar_number : 'required',
          datepicker : 'required',
          
          
          address : 'required',
          student_email : {
              required: true,
              email: true,
                },
          student_phone :{
                           required: true,
                           digits: true,
                           minlength: 10,
                         },  
          student_password : 'required',
          admission_number : 'required',
          parent_password : 'required',
          parent_name : 'required',
          
          parent_address : 'required',
          parent_number : {
                           required: true,
                           digits: true,
                           minlength: 10,
                          },
          parent_email : {
                            required: true,
                            email: true,
                         },
           
        },
        messages: {
          student_name: 'This field is required',
          student_gender:'This field is required',
          caste:'This field is required',
          sub_caste :'This field is required',
          //class_id :'This field is required',
          section_id :'This field is required',
          adhar_number :'This field is required',
          datepicker :'This field is required',
          sub_caste :'This field is required',
          sub_caste :'This field is required',
          sub_caste :'This field is required',
          //transport_id :'This field is required',
          //dormitory_id :'This field is required',
          address :'This field is required',
          email :'This field is required Or Email is Not Valid',
          student_phone :'This field is required OR Number is not Valid',
          student_password :'This field is required',
          admission_number :'This field is required',
          blood_group :'This field is required',
          parent_name :'This field is required',
          mother_name :'This field is required',
          parent_address :'This field is required',
          parent_number :'This field is required',
          parent_email :'This field is required',
          parent_password :'This field is required',
          parent_profession :'This field is required',
        },
        submitHandler: function(form) {
          form.submit();
        }
});


$('form[id="teacher_register"]').validate({

 rules: {
          teacher_name: 'required',
          teacher_gender: 'required',
          teacher_adhar_no: 'required',
          teacher_dob: 'required',
          show_website: 'required',
          //teacher_designation: 'required',
          teacher_address: 'required',
          teacher_phone:{
                           required: true,
                           digits: true,
                           minlength: 10,
                         }, 
          teacher_email: {
                            required: true,
                            email: true,
                         },
          teacher_password: 'required',
          academics: 'required',
          //teacher_profession: 'required',
          staff_category : 'required',
        },
        messages: {
          teacher_name: 'This field is required',
          teacher_gender: 'This field is required',
          teacher_adhar_no: 'This field is required',
          teacher_dob: 'This field is required',
          show_website: 'This field is required',
          teacher_designation: 'This field is required',
          teacher_address: 'This field is required',
          teacher_phone: 'This field is required',
          teacher_email: 'This field is required',
          teacher_password: 'This field is required',
          academics: 'This field is required',
          teacher_profession: 'This field is required',
          staff_category: 'This field is required',
        },
        submitHandler: function(form) {
          form.submit();
        }
});

$('form[id="accountant_register"]').validate({

 rules: {
          accountant_name: 'required',
          accountant_gender: 'required',
          accountant_email: {
                              required: true,
                              email: true,
                            },
          accountant_password: 'required',
          accountant_address: 'required',
          accountant_phone:{
                              required: true,
                              digits: true,
                              minlength: 10,
                           }, 
          accountant_academics: 'required',
          accountant_profession : 'required',
        },
        messages: {
          accountant_name: 'This field is required',
          accountant_gender: 'This field is required',
          accountant_email: 'This field is required',
          accountant_password: 'This field is required',
          accountant_address: 'This field is required',
          accountant_phone: 'This field is required',
          accountant_academics: 'This field is required',
          accountant_profession: 'This field is required',
        },
        submitHandler: function(form) {
          form.submit();
        }
});

$('form[id="librarian_register"]').validate({

 rules: {
          librarian_name: 'required',
          librarian_gender: 'required',
          librarian_email:{
                              required: true,
                              email: true,
                          },
          librarian_password: 'required',
          librarian_address: 'required',
          librarian_phone:{
                              required: true,
                              digits: true,
                              minlength: 10,
                          }, 
          librarian_academics: 'required',
          librarian_profession : 'required',
        },
        messages: {

          librarian_name: 'This field is required',
          librarian_gender: 'This field is required',
          librarian_email: 'This field is required',
          librarian_password: 'This field is required',
          librarian_address: 'This field is required',
          librarian_phone: 'This field is required',
          librarian_academics: 'This field is required',
          librarian_profession: 'This field is required',
        },
        submitHandler: function(form) {
          form.submit();
        }
});

$('form[id="form_shiftsection"]').validate({

 rules: {
          class_id: 'required',
          section_id_stop: 'required',
          section_id_stop2: 'required'
        },
        messages: {
          class_id: 'This field is required',
          section_id_stop: 'This field is required',
          section_id_stop2: 'This field is required'
        },
        submitHandler: function(form) {
          form.submit();
        }
}); 

$('form[id="form_transport"]').validate({

 rules: {
          route_name: 'required',
          number_of_vehicle: 'required',
          route_fare:{
                        required: true,
                        digits: true,
                        //minlength: 10,
                      }, 
          //descriptions : 'required',
        },
        messages: {

          route_name: 'This field is required',
          number_of_vehicle: 'This field is required',
          route_fare: 'This field is required',
           
        },
        submitHandler: function(form) {
          form.submit();
        }
}); 

$('form[id="form_dormitory"]').validate({

 rules: {
          name: 'required',
          number_of_room: 'required',
          route_fare:{
                        required: true,
                        digits: true,
                        minlength: 10,
                      }, 
          //descriptions : 'required',
        },
        messages: {

          name: 'This field is required',
          number_of_room: 'This field is required',
          route_fare: 'This field is required',
           
        },
        submitHandler: function(form) {
          form.submit();
        }
});
$('form[id="form_class"]').validate({

 rules: {
          name: 'required',
          class_abbreviations: 'required',
          //descriptions : 'required',
        },
        messages: {
          name: 'This field is required',
          class_abbreviations: 'This field is required',
        },
        submitHandler: function(form) {
          form.submit();
        }
});  
$('form[id="form_section"]').validate({

 rules: {
          class_id: 'required',
          section_name: 'required',
          //descriptions : 'required',
        },
        messages: {
          class_id: 'This field is required',
          section_name: 'This field is required',
        },
        submitHandler: function(form) {
          form.submit();
        }
});
$('form[id="form_academicsyllabus"]').validate({

 rules: {
          class_id: 'required',
          subject_id: 'required',
          title :  'required',
          section_name: 'required',
          //descriptions : 'required',
          //file: 'required',
        },
        messages: {
          class_id: 'This field is required',
          subject_id: 'This field is required',
          title: 'This field is required',
          section_name: 'This field is required',
          file: 'This field is required',
        },
        submitHandler: function(form) {
          form.submit();
        }
});

$('form[id="form_subject"]').validate({

 rules: {
          class_id: 'required',
          subject_name:'required',
          subject_type: 'required',
          //descriptions : 'required',
        },
        messages: {
          class_id: 'This field is required',
          subject_name: 'This field is required',
          subject_type: 'This field is required',
        },
        submitHandler: function(form) {
          form.submit();
        }
});
$('form[id="form_assignteacher"]').validate({

 rules: {
          class: 'required',
          section_id:'required',
          subject_id: 'required',
          teacher_id: 'required',
          //descriptions : 'required',
        },
        messages: {
          class: 'This field is required',
          section_id: 'This field is required',
          subject_id: 'This field is required',
          teacher_id: 'This field is required',
        },
        submitHandler: function(form) {
          form.submit();
        }
});
$('form[id="form_studymaterial"]').validate({

 rules: {
          class_id: 'required',
          subject_id:'required',
          title: 'required',
          file: 'required',
          descriptions : 'required',
        },
        messages: {
          class_id: 'This field is required',
          subject_id: 'This field is required',
          title: 'This field is required',
          file: 'This field is required',
          descriptions: 'This field is required',
        },
        submitHandler: function(form) {
          form.submit();
        }
});
$('form[id="form_addexam"]').validate({

 rules: {
          class: 'required',
          section_id:'required',
          name: 'required',
        },
        messages: {
          class: 'This field is required',
          section_id: 'This field is required',
          name: 'This field is required',
        },
        submitHandler: function(form) {
          form.submit();
        }
});
$('form[id="form_examschedule"]').validate({

 rules: {
          class_id: 'required',
          exam_section_id:'required',
          subject_id: 'required',
          exam_id : 'required',
          date : 'required',
          total_marks: 'required',
        },
        messages: {
          class_id: 'This field is required',
          exam_section_id: 'This field is required',
          subject_id: 'This field is required',
          exam_id: 'This field is required',
          date: 'This field is required',
          total_marks: 'This field is required',
        },
        submitHandler: function(form) {
          form.submit();
        }
});

$('form[id="form_grade"]').validate({

 rules: {
          name: 'required',
          mark_from:'required',
          mark_upto: 'required',
          class_id : 'required',
          //section_id : 'required',
          exam_id : 'required',

        },
        messages: {
          name: 'This field is required',
          mark_from: 'This field is required',
          mark_upto: 'This field is required',
          class_id : 'This field is required',
          section_id :'This field is required',
          exam_id : 'This field is required',           

        },
        submitHandler: function(form) {
          form.submit();
        }
});


$('form[id="form_setting"]').validate({

 rules: {
          school_name: 'required',
          //file:'required',
          school_address: 'required',
          session_year : 'required',
        },
        messages: {
          school_name: 'This field is required',
          //file: 'This field is required',
          school_address: 'This field is required',
          session_year: 'This field is required',
        },
        submitHandler: function(form) {
          form.submit();
        }
});

$('form[id="form_promotion"]').validate({

 rules: {
          teacher_class_id: 'required',
          //file:'required',
          teacher_section_id: 'required',
           
        },
        messages: {
          school_name: 'This field is required',
          //file: 'This field is required',
          school_address: 'This field is required',
          session_year: 'This field is required',
        },
        submitHandler: function(form) {
          form.submit();
        }
});

/* Bulk Import Validation */
$('form[id="form_bulimport"]').validate({
 rules: {
          bulkfile: 'required',
        },
        messages: {
          bulkfile: 'Please upload File',
        },
        submitHandler: function(form) {
          form.submit();
        }
});

$("#checkAll").click(function(){
    $('input:checkbox').not(this).prop('checked', this.checked);
});

/* Send Marks SMS */
$('form[id="form_sendmarkssms"]').validate({

 rules: {
          class_id: 'required',
           
          exam_section_id: 'required',
          exam_id: 'required',
          user_role: 'required',
        },
        messages: {
          class_id: 'This field is required',
          exam_section_id: 'This field is required',
          exam_id: 'This field is required',
          user_role: 'This field is required',
        },
        submitHandler: function(form) {
          form.submit();
        }
});


/* 
** Genrate Dynamic Textbox using javascript 
*/

// function GetDynamicTextBox(value){
//     return '<input name = "column" class="form-control" type="text" value = "' + value + '" />'+'<input type="button" value="Remove" onclick = "RemoveTextBox(this)" />'
// }
// function AddTextBox() {
//     var div = document.createElement('DIV');
//     div.innerHTML = GetDynamicTextBox("");
//     document.getElementById("TextBoxContainer").appendChild(div);
// }
 
// function RemoveTextBox(div) {
//     document.getElementById("TextBoxContainer").removeChild(div.parentNode);
// }
 
// function RecreateDynamicTextboxes() {
//    // var values = eval('<%= Values %>');
//     if (values != null) {
//         var html = "";
//         for (var i = 0; i < values.length; i++) {
//             html += "<div>" + GetDynamicTextBox(values[i]) + "</div>";
//         }
//         document.getElementById("TextBoxContainer").innerHTML = html;
//     }
// }
// window.onload = RecreateDynamicTextboxes;

 

/*

    $(document).ready(function(){

       $( "form" ).submit(function( event ) {
  

         var phone = $("#parent_number").val();
         var email = $("#parent_email").val();
        // matchparentdetail(email,phone)
       	 //if(matchparentdetail(email,phone))
       	 

          // $('input[type="text"]').each(function() {
          //     if ($.trim($(this).val()) == '') {
          //           isValid = false;
          //           $(this).css({
          //               "border": "1px solid red",
          //               "background": "#FFCECE"
          //           });
          //       }
          //       else {
          //           $(this).css({
          //               "border": "",
          //               "background": ""
          //           });
          //       }
          //   });

          // $('select').change(function() {
          //    if ($.trim($(this).val()) == ''){
          //       isValid = false;
          //    }
          //    else {
          //           $(this).css({
          //               "border": "",
          //               "background": ""
          //           });
          //       }
          //  }); 

          
          // if (isValid == false)
          //    {
          //    alert('sss');
          //      event.preventDefault();
          //      return false;
          //    }   
          //  else
          //       alert('Thank you for submitting');
            
      });

});
      
      */
 
 