$('#Teacher_class_id').on('change',function(){
	var class_id = $(this).val();
	//alert(class_id);

	 $.ajax({
        url: "/teacher/getSection",
        method: "GET",
        dataType: "json",
        data: {
            class_id: class_id
           
        },
        success: function(response) {
        	//console.log(response)
            var section  = response.section_list;
           
            var option = '<option value="">--Section--</option>';
            for (var i = 0; i < section.length; i++) {
                option += '<option value="' + section[i].section_id + '">' + section[i].section_name + '</option>';
            }
            $('#Teacher_section_id').html('');
            $("#Teacher_section_id").html(option);
            $('#exam_section_id').html('');
            $('#exam_section_id').html(option)

            /* For Registration & other pages */ 
                 $('#section_id_stop').html('');
                 $("#section_id_stop").html(option);
            /* */
            /* For Shift section & other pages */ 
                 $('#section_id_stop2').html('');
                 $("#section_id_stop2").html(option);
            /* */
            
        },
        error: function() {
            alert("error");
        }
    });
});

$('#teacher_section_id1').on('change',function(){

    var class_id = $(this).val();

     $.ajax({
        url: "/getSection",
        method: "GET",
        dataType: "json",
        data: {
            class_id: class_id
           
        },
        success: function(response) {
            //console.log(response)
            var section  = response.section_list;
           
            var option = '<option value="">-- Select Section --</option>';
            for (var i = 0; i < section.length; i++) {
                option += '<option value="' + section[i].section_id + '">' + section[i].section_name + '</option>';
            }
            $('#teacher_section_id').html('');
            $("#teacher_section_id").html(option);

           
            
        },
        error: function() {
            alert("error");
        }
    });
});
$('#section_id').on('change',function(){
    var section_id = $(this).val();
    var class_id   = $('#class_id').val();

    if(class_id==''){
        alert('please select Class');
        return false;
    }
    if(section_id==''){
        alert('please select Section');  
        return false; 
    }
    //alert(class_id);

     $.ajax({
        url: "/getSubject",
        method: "GET",
        dataType: "json",
        data: {
            class_id: class_id,
            section_id :section_id
           
        },
        success: function(response) {
            var subject  = response.subject_list;

            $('#subjectTable tbody').html('');
            for (var i = 0; i < subject.length; i++) {
                var count = i+1;
                
                   $('#subjectTable tbody').append('<tr><td>'+count+'</td><td>'+subject[i].name+'</td><td><input type="hidden" Class="form_control" name="subject_id"  id="subject_id" value="'+subject[i].subject_id+'"><input type="text" name="task" id="task" class="form_control"></td><td><textarea class="form_control" name="task_description" id="task_description" cols="50" rows="3"></textarea></td><td><input type="file" name="subject_file" id="subject_file"></td></tr>');
 
            }
            $('#tableId').show();
            /* Enabled days drop down after section select on class routine page */
            $("#day").prop("disabled",false);

        },
        error: function() {
            alert("error");
        }
    });
});



$('input[name="register"]').change(function(){

    var radio = $(this).val();
    if(radio=='student'){
        $('#teacher').hide();
        $('#accountant').hide();
        $('#student').show();
        $('#librarian').hide();
        $('#stud').addClass('abc');
        $('#teach').removeClass('abc');
        $('#acc').removeClass('abc');
        $('#lib').removeClass('abc');
    }else if(radio=='teacher'){
        $('#teacher').show();
        $('#accountant').hide();
        $('#student').hide();
          $('#librarian').hide();
         $('#stud').removeClass('abc');
        $('#teach').addClass('abc');
        $('#acc').removeClass('abc');
         $('#lib').removeClass('abc');
    }else if(radio=='accountant'){
        $('#teacher').hide();
        $('#accountant').show();
        $('#student').hide();
         $('#librarian').hide();
        $('#stud').removeClass('abc');
        $('#teach').removeClass('abc');
        $('#acc').addClass('abc');
        $('#lib').removeClass('abc');

    }else if(radio=='librarian'){
        $('#teacher').hide();
        $('#accountant').hide();
        $('#student').hide();
         $('#librarian').show();
        $('#stud').removeClass('abc');
        $('#teach').removeClass('abc');
        $('#acc').removeClass('abc');
        $('#lib').addClass('abc');

    }
     
    });

$('input[name="attendence"]').change(function(){
    var radio = $(this).val();
    if(radio=='student'){
        $('#attendence_teacher').hide();
        $('#attendence_student').show();
        $('#teach').removeClass('abc');
        $('#stud').addClass('abc');

    }else if(radio='teacher'){
        $('#attendence_teacher').show();
        $('#attendence_student').hide();
        $('#teach').addClass('abc');
        $('#stud').removeClass('abc');
    }
   

});

$(document).ready( function () {
 
   //  $('#myTable').DataTable({

   //      buttons: [
   //          'copyHtml5',
   //          'excelHtml5',
   //          'csvHtml5',
   //          'pdfHtml5'
   //      ]
   //  });

   //  $('#fees_report_table').DataTable();
   //   $( ".attendence_date" ).datepicker({
   //        dateFormat: 'dd-mm-yy'
   //   });

 
   //   //CKEDITOR.replace('descriptionstudent');
   //   CKEDITOR.replace('descriptionteacher', {
   //          toolbar: [
   //          //{ name: 'document', items: [  'NewPage', 'Preview', '-', 'Templates' ] }, // Defines toolbar group with name (used to create voice label) and items in 3 subgroups.
   //          [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ],          // Defines toolbar group without name.
   //          '/',                                                                                    // Line break - next group will be placed in new line.
   //          { name: 'basicstyles', items: [ 'Bold', 'Italic' ] },

   //      ]
   //   });
   //   CKEDITOR.replace('descriptionparent', {
   //          toolbar: [
   //          //{ name: 'document', items: [  'NewPage', 'Preview', '-', 'Templates' ] }, // Defines toolbar group with name (used to create voice label) and items in 3 subgroups.
   //          [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ],          // Defines toolbar group without name.
   //          '/',                                                                                    // Line break - next group will be placed in new line.
   //          { name: 'basicstyles', items: [ 'Bold', 'Italic' ] },

   //      ]
   //   });

   //   CKEDITOR.replace( 'descriptionstudent', {
   //          toolbar: [
   //          //{ name: 'document', items: [  'NewPage', 'Preview', '-', 'Templates' ] }, // Defines toolbar group with name (used to create voice label) and items in 3 subgroups.
   //          [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ],          // Defines toolbar group without name.
   //          '/',                                                                                    // Line break - next group will be placed in new line.
   //          { name: 'basicstyles', items: [ 'Bold', 'Italic' ] },

   //      ]
   //   });
   // // $('#example').DataTable();



   //   $("#start_date").datepicker({
   //       dateFormat: 'dd-mm-yy'
   //   });
     
   //   $("#end_date").datepicker({
   //       dateFormat: 'dd-mm-yy'
   //   });

   //   CKEDITOR.replace('description');
   // // $('#example').DataTable();


});
$("#add").click(function() {
   $("#app").append('<div class="clearfix"></div><div><div class="form-group row"><label for="exampleInputEmail2" class="col-sm-2 col-form-label" >Title</label><div class="col-sm-4"><input type="text" name="slider_title" class="form-control" placeholder="Enter Title"> </div><label for="exampleInputPassword2" class="col-sm-2 col-form-label">Slider Image</label> <div class="col-sm-4"> <input type="file" name="slider_image" class="form-control"></div></div><div class="clearfix"></div><div class="form-group row"><label for="exampleInputPassword2" class="col-sm-2 col-form-label">Description</label><div class="col-sm-10"><textarea class="form-control" name="slider_description" placeholder="Enter Slider Description" rows="8"></textarea></div></div><i class="fa fa-minus-circle remove" aria-hidden="true" id="removeButton" style="font-size:25px;margin-left: 15px;"></i></div>');
});

$("#links").click(function() {
   $("#youtube_link").append('<div><div class="form-group row"><label for="exampleInputEmail2" class="col-sm-2 col-form-label">Youtube Link</label><div class="col-sm-4"><input type="text" name="youtube_link" class="form-control" placeholder="Enter Youtube Link"></div><i class="fa fa-minus-circle remove" aria-hidden="true" id="removeButton" style="font-size:25px;margin-left: 15px;"></i></div></div>');
});

$("#columnlinks").click(function() {
   $("#coulmn_link").append('<div><div class="form-group row"><label for="sheetcolumn" class="col-sm-4 col-form-label">Add Column</label><div class="col-sm-6"><input type="text" name="column" class="form-control" placeholder="Enter Column name"></div><i class="fa fa-minus-circle remove" aria-hidden="true" id="removeButton" style="font-size:25px;margin-left: 15px;"></i></div></div>');
});

$("#activitylinks").click(function() {
   $("#activity_link").append('<div><div class="form-group row"><label for="sheetcolumn" class="col-sm-4 col-form-label">Other Activity</label><div class="col-sm-6"><input type="text" name="activity_column" class="form-control" placeholder="Enter Other Acivity column name"></div><i class="fa fa-minus-circle remove" aria-hidden="true" id="removeButton" style="font-size:25px;margin-left: 15px;"></i></div></div>');
});

$("body").on("click", ".remove", function() {
$(this).closest("div").remove();
});
function Teacher_delete_record(id, tr_id,tablename,columname) {        

     swal({            
         title: "Are you sure?",            
         text: "you want to delete?",            
         type: "warning",            
         showCancelButton: true,            
         closeOnConfirm: false,            
         confirmButtonText: "Yes, Delete it!",            
         confirmButtonColor: "#ec6c62"        
     }, function() {            
        $.ajax({                
            url: "/teacher/delete",                

            data: {                    
                id: id, 
                tablename: tablename,//'hospitals'                
                columname:columname
            },                
            type: "POST",                
            success: function (response) { 

                console.log(response);                   
                swal("Done!", "It was succesfully deleted!", "success");                    
                $('#tr_'+tr_id).remove();                    
                //delete_hospital_from_users(id);                
            },                
            error: function (xhr, ajaxOptions, thrownError) {   
            //console.log('fail');                 
                swal("Error deleting!", "Please try again", "error");                
            }            
        });        
    });    
 }

function delete_teacher_question_record(id, tr_id,tablename,columname) {        

     swal({            
         title: "Are you sure?",            
         text: "you want to delete?",            
         type: "warning",            
         showCancelButton: true,            
         closeOnConfirm: false,            
         confirmButtonText: "Yes, Delete it!",            
         confirmButtonColor: "#ec6c62"        
     }, function() {            
        $.ajax({                
            url: "/teacher/delete",                

            data: {                    
                id: id, 
                tablename: tablename,//'hospitals'                
                columname:columname
            },                
            type: "POST",                
            success: function (response) { 

                console.log(response);                   
                swal("Done!", "It was succesfully deleted!", "success");                    
                $('#tr_'+tr_id).remove();                    
                //delete_hospital_from_users(id);                
            },                
            error: function (xhr, ajaxOptions, thrownError) {   
            //console.log('fail');                 
                swal("Error deleting!", "Please try again", "error");                
            }            
        });        
    });    
 }
  /* Get list of all student on specific class & section */
function Teacher_get_studentlist()
{
     var classid = $('#Teacher_class_id').find(":selected").val();
     var sectionid = $('#Teacher_section_id').find(":selected").val();
     var classname = $('#Teacher_class_id').find(":selected").text();
     var sectionname = $('#Teacher_section_id').find(":selected").text();

     $.ajax({
        url: "/teacher/classsection_studentList",
        method: "GET",
        dataType: "json",
        data: {
            class_id: classid,
            section_id: sectionid
        },
        success: function(response) {
           
           $(".studenttable").show();

          $('.studentlistTable tbody').html('');
             students= response.student_list;
             tablerow='';
            if(students.length>0){ 
                mytable= "'tbl_registration'";
                field= "'registration_id'";
              for (var i = 0; i < students.length; i++) {
               

                   tablerow+='<tr id=tr_'+i+' ><td>'+ i +'</td><td>'+students[i].admission_number+'</td><td>'+students[i].name+'</td><td>'+classname+'</td>';
                   tablerow+='<td>'+sectionname+'</td><td>'+students[i].parentname+'</td><td>'+students[i].parentphone+'</td></tr>';
                   
                   //tablerow+='<td><a href="/Registration?registration_id='+students[i].registration_id+'"><button type="button" class="btn btn-dark btn-fw"><i class="mdi mdi-cloud-download"></i>Edit</button>';
                   
                   //tablerow+='</a><a href="#" onclick="delete_record('+students[i].registration_id+','+i+','+mytable+','+field+')"><button type="button" class="btn btn-danger btn-fw"><i class="mdi mdi-alert-outline"></i>Delete</button></a></td></tr>';
                   
                   
             }
             $('.studentlistTable tbody').append(tablerow);
            }
            else{
                $('.studentlistTable tbody').html('');
               $('.studentlistTable tbody').append('<tr ><td colspan="8">NO DATA FOUND<td></tr>');  
            }
        },
        error: function() {
            alert("error");
        }
    });
      
}




 

function delete_event_record(id, tr_id,tablename,columname) {        
     swal({            
         title: "Are you sure?",            
         text: "you want to delete?",            
         type: "warning",            
         showCancelButton: true,            
         closeOnConfirm: false,            
         confirmButtonText: "Yes, Delete it!",            
         confirmButtonColor: "#ec6c62"        
     }, function() {            
        $.ajax({                
            url: "/delete",                
            data: {                    
                id: id, 
                tablename: tablename,//'hospitals'                
                columname:columname
            },                
            type: "POST",                
            success: function (response) { 

                console.log(response);                   
                swal("Done!", "It was succesfully deleted!", "success");                    
                $('#event_'+tr_id).remove();                    
                //delete_hospital_from_users(id);                
            },                
            error: function (xhr, ajaxOptions, thrownError) {   
            //console.log('fail');                 
                swal("Error deleting!", "Please try again", "error");                
            }            
        });        
    });    
 }

function delete_slider_record(id, tr_id,tablename,columname) {        
     swal({            
         title: "Are you sure?",            
         text: "you want to delete?",            
         type: "warning",            
         showCancelButton: true,            
         closeOnConfirm: false,            
         confirmButtonText: "Yes, Delete it!",            
         confirmButtonColor: "#ec6c62"        
     }, function() {            
        $.ajax({                
            url: "/delete",                
            data: {                    
                id: id, 
                tablename: tablename,//'hospitals'                
                columname:columname
            },                
            type: "POST",                
            success: function (response) { 

                console.log(response);                   
                swal("Done!", "It was succesfully deleted!", "success");                    
                $('#slider_'+tr_id).remove();                    
                //delete_hospital_from_users(id);                
            },                
            error: function (xhr, ajaxOptions, thrownError) {   
            //console.log('fail');                 
                swal("Error deleting!", "Please try again", "error");                
            }            
        });        
    });    
 }

 function delete_gallery_record(id, tr_id,tablename,columname) {        
     swal({            
         title: "Are you sure?",            
         text: "you want to delete?",            
         type: "warning",            
         showCancelButton: true,            
         closeOnConfirm: false,            
         confirmButtonText: "Yes, Delete it!",            
         confirmButtonColor: "#ec6c62"        
     }, function() {            
        $.ajax({                
            url: "/delete",                
            data: {                    
                id: id, 
                tablename: tablename,//'hospitals'                
                columname:columname
            },                
            type: "POST",                
            success: function (response) { 

                console.log(response);                   
                swal("Done!", "It was succesfully deleted!", "success");                    
                $('#gallery_'+tr_id).remove();                    
                //delete_hospital_from_users(id);                
            },                
            error: function (xhr, ajaxOptions, thrownError) {   
            //console.log('fail');                 
                swal("Error deleting!", "Please try again", "error");                
            }            
        });        
    });    
 }


 function Teacher_get_all_data(id){
    var class_id = id;
    $.ajax({
        url: "/getAllData",
        method: "GET",
        dataType: "json",
        data: {
            class_id: class_id
        },
        success: function(response) {
            // console.log(response)
            var section  = response.section_list;
            var subject  = response.subject_list;
            var option = '<option value="">-- Select Section --</option>';
            for (var i = 0; i < section.length; i++) {
                option += '<option value="' + section[i].section_id + '">' + section[i].section_name + '</option>';
            }
            $('#section_id').html('');
            $("#section_id").html(option);

            var option = '<option value="">-- Select subject --</option>';
            for (var i = 0; i < subject.length; i++) {
                option += '<option value="' + subject[i].subject_id + '">' + subject[i].name + '</option>';
            }
            $('#subject_id').html('');
            $("#subject_id").html(option);
            
            /*
            ***  To get Below table data on change of class in assign teacher form 
            */

                get_teacherlist(class_id) 

            /* ***************  */

        },
        error: function() {
            alert("error");
        }
    });
 }

/* Get Subject list of subject on specific class & section */
function Teacher_get_subjectlist()
{
     var classid = $('#classid').find(":selected").val();
     var classname = $('#classid').find(":selected").text();
     //alert(classid);

     $.ajax({
        url: "/teacher/classsection_subjectList",
        method: "GET",
        dataType: "json",
        data: {
            class_id: classid,
        },
        success: function(response) {
             $(".subjecttable").show();   
            $('.subjectlistTable tbody').empty();
           
            subjects= response.subject_list;
            tablerow='';subjecttype ='';
            mytable= "'tbl_subject'";
            field= "'subject_id'";
            if(subjects.length>0){ 
              for (var i = 0; i < subjects.length; i++) {

                   if(subjects[i].subject_type)
                      subjecttype='Main Subject';
                   else
                      subjecttype='Other Subject';
                   tablerow+='<tr id=tr_'+i+' ><td>'+ (i+1) +'</td><td>'+classname+'</td><td>'+subjects[i].name+'</td><td>'+ subjecttype +'</td>/tr>';
                   //tablerow+='<td><a href="/Subject?subject_id='+subjects[i].subject_id+'"><button type="button" class="btn btn-dark btn-fw"><i class="mdi mdi-cloud-download"></i>Edit</button>';
                   //tablerow+='</a><a href="#" onclick="delete_record('+subjects[i].subject_id+','+i+','+mytable+','+field+')"><button type="button" class="btn btn-danger btn-fw"><i class="mdi mdi-alert-outline"></i>Delete</button></a></td></tr>';                    
             }

             $('.subjectlistTable tbody').append(tablerow);
            }
            else{
                console.log('NotFound');
                $('.subjectlistTable tbody').html('');
               $('.subjectlistTable tbody').append('<tr ><td colspan="8">NO DATA FOUND<td></tr>');  
            }
        },
        error: function() {
            alert("error");
        }
    });
      
}



 function get_all_exam_name(id){
    //var section_id  = id
    var class_id    = id;//$('#class_id').val();
    
   
    $.ajax({
        url: "/getAllExamName",
        method: "GET",
        dataType: "json",
        data: {
            class_id   : class_id,
           
        },
        success: function(response) {
            var exam     = response.exam_list;

            var option = '<option value="">--Exam--</option>';
            for (var i = 0; i < exam.length; i++) {
                option += '<option value="' + exam[i].exam_id + '">' + exam[i].exam_name + '</option>';
            }
            $('#exam_id').html('');
            $("#exam_id").html(option);
            
        },
        error: function() {
            alert("error");
        }
    });
 }


 /* Get Scheduled exam list on click on subject in manage Marks  */

 function get_teacher_scheduled_exam()
 {
      var class_id    = $('#Teacher_class_id').val();
      var section_id    = $('#Teacher_section_id').val();
      var subject_id    = $('#subject_id').val();
     
    
   
    $.ajax({
        url: "/teacher/getTeacherSecheduledExamName",
        method: "GET",
        dataType: "json",
        data: {
            class_id   : class_id,
            section_id : section_id,
            subject_id : subject_id
            //section_id : section_id
           
        },
        success: function(response) {

            var exam     = response.exam_list;

            var option = '<option value="">--Exam--</option>';
            $('#exam_id').html('');
            if(exam.length>0)
            {
              for (var i = 0; i < exam.length; i++) {
                option += '<option data-value="'+exam[i].exam_code+'" value="' + exam[i].exam_id + '">' + exam[i].exam_name + '</option>';
              }    
            }
           
            $('#subject_type').val( $( "#subject_id option:selected" ).attr('data-value'));
            $('#exam_id').html('');
            $("#exam_id").html(option);
            
        },
        error: function() {
            alert("error");
        }
    });
 }

/*
**  Get all exam name list on select class & section in tabulation sheet 
*/
function Teacher_get_marks_exam_list()

{
       var class_id    = $('#class_id').val();
       var section_id    = $('#section_id').val();

       
   
        $.ajax({
            url: "/getMarksExamNameList",
            method: "GET",
            dataType: "json",
            data: {
                class_id   : class_id,
                section_id : section_id,
            },
            success: function(response) {

                var exam     = response.exam_list;

                var option = '<option value="">--Exam--</option>';
                $('#exam_id').html('');
                if(exam.length>0)
                {
                  for (var i = 0; i < exam.length; i++) {
                    option += '<option data-value="'+ exam[i].exam_code+'" value="' + exam[i].exam_id + '">' + exam[i].exam_name + '</option>';
                  }    
                }
                
                $('#exam_id').html('');
                $("#exam_id").html(option);
                
            },
            error: function() {
                alert("error");
            }
        });
}

/*
**  get exam marks from exam list 
*/
function Teacher_get_tabulate_exam_marks()

{

     var class_id    = $('#class_id').val();
     var section_id  = $('#section_id').val();
     var exam_id     = $('#exam_id').val();
     //console.log($('#exam_code').val())
     var exam_code     = $("#exam_id option:selected" ).attr('data-value');

   
        $.ajax({
            url: "/getTabulateMarksList",
            method: "GET",
            dataType: "json",
            data: {
                class_id   : class_id,
                section_id : section_id,
                exam_id    : exam_id,
                exam_code  : exam_code
            },
            success: function(response) {

                var tabulationlist     = response.tabulation_list;
                var gradelist          = response.gradelist;

               // $('.routineTable tbody').html('');
               // $('#subjectTable tbody').html('');
                
               // $('#tabulation_table tbody').html('');
                $('#tabulation_thead tbody').html('');
                 $('#tabulation_table thead').html('');
                dynamicheader='';
                dynamictbody='';
                if(tabulationlist.length>0)
                {
                     dynamicheader='<tr><th>Student NAME</th>';

                   
                    for (var i = 0; i < tabulationlist.length; i++) 
                    {
                       total = 0.0;
                       count= i+1; 
                       dynamictbody+='<tr><td>'+tabulationlist[i].student_name+'</td>' 

                        marksheetstr = tabulationlist[i].marksheet;
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
                                //heading = 
                                //dynamicheader+='<th>'+keys[k].replace(/_/g," ")+'</th>'; // get key  of json
                               // dynamictbody+='<td>'+json[keys[k]]+'</td>'   // value of key 
                               subjecttotal+=json[keys[k]];
                               total+= json[keys[k]];
                           }
                           if(i==0) 
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
                          code = "'"+tabulationlist[i].exam_code+"'"; 
                          if(tabulationlist[i].exam_code=='SM1'||tabulationlist[i].exam_code=='SM2')
                            dynamictbody+='<td><a href="#"  onclick="Summative('+tabulationlist[i].student_id+','+class_id+','+section_id+','+exam_id+','+code+')">view</a></td></tr>'
                          else
                            dynamictbody+='<td><a href="#"  onclick="Formative('+tabulationlist[i].student_id+','+class_id+','+section_id+','+exam_id+','+code+')">view</a></td></tr>'

                     }
                    dynamicheader+='<th>Total</th><th>Grade</th><th>Marks Card</th></tr>'; 
                      /* Grade System */
               }
                $("#tabulationsheet").show();
                $('.tabulation_table thead').append(dynamicheader);
                $('.tabulation_table tbody').append(dynamictbody);
                
                
            },
            error: function() {
                alert("error");
            }
        });

}

  


function getSubject(id){
    var class_id = id;
    

    $.ajax({
        url: "teacher/getAllData",

        method: "GET",
        dataType: "json",
        data: {
            class_id: class_id
           
        },
        success: function(response) {
           // console.log(response)
            //var section  = response.section_list;
            var subject  = response.subject_list;
            // var option = '<option value="">-- Select Section --</option>';
            // for (var i = 0; i < section.length; i++) {
            //     option += '<option value="' + section[i].section_id + '">' + section[i].section_name + '</option>';
            // }
            // $('#section_id').html('');
            // $("#section_id").html(option);

            var option = '<option value="">-- Select subject --</option>';
            for (var i = 0; i < subject.length; i++) {
                option += '<option value="' + subject[i].subject_id + '">' + subject[i].name + '</option>';
            }
            $('#subject_id').html('');
            $("#subject_id").html(option);
            
        },
        error: function() {
            alert("error");
        }
    });
 }

 /* 
 ** Get all data of teacher class subject 
 */

 function TeachergetSubject(id){
    var class_id = id;
    

    $.ajax({
        url: "/teacher/TeachergetAllData",
        method: "GET",
        dataType: "json",
        data: {
            class_id: class_id
           
        },
        success: function(response) {
            var subject  = response.subject_list;
            var option = '<option value="">-- Select subject --</option>';
            for (var i = 0; i < subject.length; i++) {
                option += '<option value="' + subject[i].subject_id + '">' + subject[i].name + '</option>';
            }
            $('#Teacher_subject_id').html('');
            $("#Teacher_subject_id").html(option);
            
        },
        error: function() {
            alert("error");
        }
    });
 }


 /* Get All Study Material of teacher class and subject only */
 function TeacherGetAcademicSyllabus()
 {
    
    var class_id = $("#Teacher_class_id").val();
    var subject_id = $("#Teacher_subject_id").val();

    

    $.ajax({
        url: "/teacher/AcademicSyllabus",
        method: "GET",
        dataType: "json",
        data: {
            class_id: class_id,
            subject_id : subject_id
        },
        success: function(response) {
            var syllabuslist  = response;
            console.log(syllabuslist)
              appendata="";
            //$("#divsyllabustable").empty();
            $(".syllabustable tbody").empty();
            for (var i = 0; i < syllabuslist.length; i++) {
                   
                    mytable= "'tbl_academic_syllabus'";
                    field= "'academic_syllabus_id'";
                    var count = i+1;
                    appendata+='<tr id="tr_'+i+'"><td>'+i+'</td><td>'+syllabuslist[i].class_name+'</td><td>'+syllabuslist[i].name+'</td><td>'+syllabuslist[i].title+'</td><td>'+syllabuslist[i].description+'</td>';   
                    appendata+='<td><a href="#" onclick="Teacher_delete_record('+syllabuslist[i].academic_syllabus_id+','+i+','+mytable+','+field+')"><button type="button" class="btn btn-danger btn-fw"><i class="mdi mdi-alert-outline"></i>Delete</button></a><td><tr>';
               }     

             
            // var option = '<option value="">-- Select subject --</option>';
            // for (var i = 0; i < subject.length; i++) {
            //     option += '<option value="' + subject[i].subject_id + '">' + subject[i].name + '</option>';
            // }
            $("#divsyllabustable").show();
            $(".syllabustable tbody").append(appendata);
            
        },
        error: function() {
            alert("error");
        }
    });

 }

 /* Manage Marsk */
 function Teacher_get_all_exam_data(id){

    var section_id  = id
    var class_id    = $('#Teacher_class_id').val();

    
   
    $.ajax({
        url: "/teacher/getTeacherAllExamData",
        method: "GET",
        dataType: "json",
        data: {
            class_id   : class_id,
            section_id : section_id
           
        },
        success: function(response) {
           // console.log(response)
            //var section  = response.section_list;

            var subject  = response.subject_list;
            var exam     = response.exam_list;
            var option = '<option value="">--subject--</option>';
            for (var i = 0; i < subject.length; i++) {
                option += '<option data-value="'+subject[i].subject_type+'" value="' + subject[i].subject_id + '">' + subject[i].name + '</option>';
            }
            $('#subject_id').html('');
            $("#subject_id").html(option);
            

           // get_all_exam_name(class_id);
            
        },
        error: function() {
            alert("error");
        }
    });
 }

 function Teacher_get_all_exam_name(id){
    //var section_id  = id
    var class_id    = id;//$('#class_id').val();
    
   
    $.ajax({
        url: "/teacher/getAllExamName",
        method: "GET",
        dataType: "json",
        data: {
            class_id   : class_id,
           
        },
        success: function(response) {
            var exam     = response.exam_list;

            var option = '<option value="">--Exam--</option>';
            for (var i = 0; i < exam.length; i++) {
                option += '<option value="' + exam[i].exam_id + '">' + exam[i].exam_name + '</option>';
            }
            $('#exam_id').html('');
            $("#exam_id").html(option);
            
        },
        error: function() {
            alert("error");
        }
    });
 }

 /* Get Scheduled exam list on click on subject in manage Marks  */

 function Teacher_get_scheduled_exam()
 {
      var class_id    = $('#Teacher_class_id').val();
      var section_id    = $('#exam_section_id').val();
      var subject_id    = $('#subject_id').val();
      //var section_id    = $("#exam_section_id").val();
    
   
    $.ajax({
        url: "/teacher/getTeacherSecheduledExamName",
        method: "GET",
        dataType: "json",
        data: {
            class_id   : class_id,
            section_id : section_id,
            subject_id : subject_id,
            section_id : section_id
           
        },
        success: function(response) {

            var exam     = response.exam_list;

            var option = '<option value="">--Exam--</option>';
            $('#exam_id').html('');
            if(exam.length>0)
            {
              for (var i = 0; i < exam.length; i++) {
                option += '<option data-value="'+exam[i].exam_code+'" value="' + exam[i].exam_id + '">' + exam[i].exam_name + '</option>';
              }    
            }
           
            $('#subject_type').val( $( "#subject_id option:selected" ).attr('data-value'));
            $('#exam_id').html('');
            $("#exam_id").html(option);
            
        },
        error: function() {
            alert("error");
        }
    });
 }
 /* Get Exam Code */

function Teacher_getexamcode()
{
    exam_code = $( "#exam_name option:selected" ).attr('data-value'); 
    //$("#exam_name").atrr('data-value'); 
    $("#exam_code").val(exam_code); 
    
}

/*
** Teacher Get 
*/
function Teacher_get_student_detail()
{
    var class_id    = $('#Teacher_class_id').val(); 
    var section_id  = $('#exam_section_id').val();
    var subject_id  = $('#subject_id').val();
    var subject_type  =$('#subject_id').find(':selected').attr('data-value') //$('#subject_id').attr('data-value');
    var exam_id     = $('#exam_id').val();
    var exam_code   =$('#exam_id').find(':selected').attr('data-value')

     $.ajax({
        url: "/teacher/getStudentAllDetail",
        method: "GET",
        dataType: "json",
        data: {
            class_id        : class_id,
            section_id      : section_id,
            subject_id      : subject_id,
            exam_id         : exam_id,
            subject_type : subject_type,
            exam_code    : exam_code
            
        },
        success: function(response) {
           // console.log(response)
            var student_detail = response.student_detail
            var total_marks    = response.total_marks[0].totalmarks;
            //var othermarks    = response.total_marks[0].othermarks;

            $('#manage_marks tbody').html('');
            $('#manage_marks thead').html('');

            dynamicdata='';  otherdynamicdata='';
            for (var i = 0; i < student_detail.length; i++) {
                var count = i+1;
                var studentname = student_detail[i].name
                var comment     = student_detail[i].marks['comment'] ? student_detail[i].marks['comment'] : "";
               

                    console.log(student_detail[i].marks)
                json = JSON.parse(student_detail[i].marks);

                keys = Object.keys(json)
                mydata= "'"+ JSON.stringify(keys)+"'";



               
                if(student_detail[i].marks!=''){

                 dynamicheader='';
                  if(keys.length>0 )
                  {
                    
                    dynamicheader='<tr><th>#</th><th>Name</th>';
                    
                    var marks_get = 0.0;
                    var marks_obtained= 0.00;
                    mydata='';
                    for(k=0;k<keys.length;k++)
                    {
                       mydata += keys[k].replace(/ /g,"_")+'^';
                    }
                    mydata= mydata.slice(0, -1)
                    
                    for(k=0;k<keys.length;k++)
                    {
                         //heading = 
                         columname =keys[k].replace(/_/g," ")
                         columname =columname.replace(/-/g,"&") 
                         columname =columname.replace(/percentage/g,"%") 
                        dynamicheader+='<th>'+columname +'</th>';

                        if(k==0)
                         dynamicdata+='<tr><td>'+ count +'</td><td><input type="hidden"  name="student_id"  id="student_id_'+student_detail[i].registration_id+'" value="'+student_detail[i].registration_id+'">'+ studentname +'</td>'

                           
                             var marks_get = Number(json[keys[k]]); 
                              marks_obtained += marks_get;
                             
                             var name =keys[k].toString();
                             var name = name.replace(/ /g,"_");
                             
                             //var textboxname=textboxname.replace(/,/g,"$"); //"'"+name+"'";
                             var student_id   = "'"+student_detail[i].registration_id+"'";
                             var mystring     = "'"+mydata+"'";
                             dynamicdata+='<td><input type="hidden" class="subjectname_'+k+'" name="subjectname" value="'+name+'"><input type="text" class="form-control" name="marks" id="'+name+'_'+student_detail[i].registration_id+'" onblur="check_manage_marks1('+student_id+','+mystring+' )" value="'+json[keys[k]]+'"><span id="children_error_'+student_detail[i].registration_id+'" class="error"></span></td>'
                    }   

                    dynamicdata+='<td> <input type="hidden"   name="marks_obtained" id="hidden_marks_obtained_'+student_detail[i].registration_id+'" value="'+marks_obtained+'"><input type="text" class="form-control" name="marks_obtained" disabled value="'+marks_obtained+'" id="marks_obtained_'+student_detail[i].registration_id+'"><span id="marks_error_'+student_detail[i].registration_id+'"></span></td><span id="marks_error_'+student_detail[i].registration_id+'"></span></td><td><input type="hidden" class="form-control" name="total_marks"  value="'+total_marks+'"><input type="text" class="form-control"  disabled value="'+total_marks+'" name="total_marks" id="total_marks_'+student_detail[i].registration_id+'">'
                  } 
 
                 dynamicheader+='<th>Marks Obtained</th><th>Total Marks</th><th>Comment</th>' 
                 dynamicdata+='<td><input type="text" class="form-control" name="comment" value="'+comment+'"></td></tr>'
                }else{
                }
            }
            $('#manage_marks thead').append(dynamicheader);  
            $('#manage_marks tbody').append(dynamicdata)
            $('#table_manage').show();
       },
        error: function() {
            alert("error");
        }
    });
}



function getTeacherStudentAttendence(attendence_date){
    var attendence_date         = attendence_date;
    var class_id                = $('#Teacher_class_id').val();
    var section_id              = $('#Teacher_section_id').val();

    $.ajax({
        url: "/teacher/getTeacherStudentAttendence",
        method: "GET",
        dataType: "json",
        data: {
            class_id        : class_id,
            section_id      : section_id,
            attendence_date : attendence_date
           
        },
        success: function(response) {
            console.log(response)
            $('#attendence tbody').html('');
            for (var i = 0; i < response.length; i++) {
                 var count = i+1;
                 console.log(response.attendence)
                if(response[i].attendence==undefined || response[i].attendence==0){
                    $('#attendence tbody').append('<tr><td>'+count+'</td><td>'+response[i].admission_number+'</td><td>'+response[i].name+'</td><td><input type="hidden"  name="student_id"  id="student_id" value="'+response[i].registration_id+'"><select class="form-control select" id="status" name="status"><option value="0">Select Attendence</option><option value="1">Present</option><option value="2">Absent</option></select></td></tr>');
                }else if(response[i].attendence==1){
                    $('#attendence tbody').append('<tr><td>'+count+'</td><td>'+response[i].admission_number+'</td><td>'+response[i].name+'</td><td><input type="hidden"  name="student_id"  id="student_id" value="'+response[i].registration_id+'"><select class="form-control select" id="status" name="status"><option value="0">Select Attendence</option><option value="1" selected>Present</option><option value="2">Absent</option></select></td></tr>');
                }else if(response[i].attendence==2){
                    $('#attendence tbody').append('<tr><td>'+count+'</td><td>'+response[i].admission_number+'</td><td>'+response[i].name+'</td><td><input type="hidden"  name="student_id"  id="student_id" value="'+response[i].registration_id+'"><select class="form-control select" id="status" name="status"><option value="0">Select Attendence</option><option value="1" >Present</option><option value="2" selected>Absent</option></select></td></tr>');
                }
                
            }
            $('#attendenceTable').show();
            
            
            
        },
        error: function() {
            alert("error");
        }
    });
}



function get_teacher_all_exam_data(id){
    var section_id  = id
    var class_id    = $('#Teacher_class_id').val();

    
   
    $.ajax({
        url: "/teacher/getTeacherAllExamData",
        method: "GET",
        dataType: "json",
        data: {
            class_id   : class_id,
            section_id : section_id
           
        },
        success: function(response) {
          console.log(response)
            //var section  = response.section_list;

            var subject  = response.subject_list;
            var exam     = response.exam_list;
            var option = '<option value="">--subject--</option>';
            for (var i = 0; i < subject.length; i++) {
                option += '<option data-value="'+subject[i].subject_type+'" value="' + subject[i].subject_id + '">' + subject[i].name + '</option>';
            }
            $('#subject_id').html('');
            $("#subject_id").html(option);
            

            get_all_teacher_exam_name(class_id);
            
        },
        error: function() {
            alert("error");
        }
    });
 }

function get_all_teacher_exam_name(id){
    //var section_id  = id
    var class_id    = id;//$('#class_id').val();
    
   
    $.ajax({
        url: "/teacher/getTeacherAllExamName",
        method: "GET",
        dataType: "json",
        data: {
            class_id   : class_id,
           
        },
        success: function(response) {
            var exam     = response.exam_list;

            var option = '<option value="">--Exam--</option>';
            for (var i = 0; i < exam.length; i++) {
                option += '<option value="' + exam[i].exam_id + '">' + exam[i].exam_name + '</option>';
            }
            $('#exam_id').html('');
            $("#exam_id").html(option);
            
        },
        error: function() {
            alert("error");
        }
    });
 }


function teacher_check_password(old_password){

  var old_password = old_password;

  $.ajax({
        url: "/teacher/check_password",
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


function teacher_password_verify(cnfrm_password){
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
