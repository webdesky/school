$('#class_id').on('change',function(){
	var class_id = $(this).val();
	//alert(class_id);
    if(class_id=="")
    {
        alert("Please select class")
        return false;
    }

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
           
            var option = '<option value="">--Section--</option>';
            for (var i = 0; i < section.length; i++) {
                option += '<option value="' + section[i].section_id + '">' + section[i].section_name + '</option>';
            }
            $('#section_id').html('');
            $("#section_id").html(option);
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

$('#teacher_class_id').on('change',function(){

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
 
    $('#myTable').DataTable({

        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ]
    });


    
     $('.datatable').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
           
        ]
    });
  //  $('#fees_report_table').DataTable();
     $( ".attendence_date" ).datepicker({
          dateFormat: 'dd-mm-yy'
     });

 
     //CKEDITOR.replace('descriptionstudent');
     CKEDITOR.replace('descriptionteacher', {
            toolbar: [
            //{ name: 'document', items: [  'NewPage', 'Preview', '-', 'Templates' ] }, // Defines toolbar group with name (used to create voice label) and items in 3 subgroups.
            [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ],          // Defines toolbar group without name.
            '/',                                                                                    // Line break - next group will be placed in new line.
            { name: 'basicstyles', items: [ 'Bold', 'Italic' ] },

        ]
     });
     CKEDITOR.replace('descriptionparent', {
            toolbar: [
            //{ name: 'document', items: [  'NewPage', 'Preview', '-', 'Templates' ] }, // Defines toolbar group with name (used to create voice label) and items in 3 subgroups.
            [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ],          // Defines toolbar group without name.
            '/',                                                                                    // Line break - next group will be placed in new line.
            { name: 'basicstyles', items: [ 'Bold', 'Italic' ] },

        ]
     });

     CKEDITOR.replace( 'descriptionstudent', {
            toolbar: [
            //{ name: 'document', items: [  'NewPage', 'Preview', '-', 'Templates' ] }, // Defines toolbar group with name (used to create voice label) and items in 3 subgroups.
            [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ],          // Defines toolbar group without name.
            '/',                                                                                    // Line break - next group will be placed in new line.
            { name: 'basicstyles', items: [ 'Bold', 'Italic' ] },

        ]
     });
   // $('#example').DataTable();



     $("#start_date").datepicker({
         dateFormat: 'dd-mm-yy'
     });
     
     $("#end_date").datepicker({
         dateFormat: 'dd-mm-yy'
     });

     CKEDITOR.replace('description');
   // $('#example').DataTable();


});
$("#addslider").click(function() {
   $("#app").append('<div class="clearfix"></div><div><div class="form-group row"><label for="exampleInputEmail2" class="col-sm-2 col-form-label" >Title</label><div class="col-sm-4"><input type="text" name="slider_title" class="form-control" placeholder="Enter Title"> </div><label for="exampleInputPassword2" class="col-sm-2 col-form-label">Slider Image</label> <div class="col-sm-4"> <input type="file" name="slider_image" class="form-control"></div></div><div class="clearfix"></div><div class="form-group row"><label for="exampleInputPassword2" class="col-sm-2 col-form-label">Description</label><div class="col-sm-10"><textarea class="form-control" name="slider_description" placeholder="Enter Slider Description" rows="8"></textarea></div></div><i class="fa fa-minus-circle remove" aria-hidden="true" id="removeButton" style="font-size:25px;margin-left: 15px;"></i></div>');
});

$("#add_links").click(function() {
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
function delete_record(id, tr_id,tablename,columname) {        
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


 function get_all_data(id){
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


function get_all_exam_data(id){
    var section_id  = id
    var class_id    = $('#class_id').val();

    
   
    $.ajax({
        url: "/getAllExamData",
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
            

            get_all_exam_name(class_id);
            
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

 function get_scheduled_exam()
 {
      var class_id    = $('#class_id').val();
      var section_id    = $('#exam_section_id').val();
      var subject_id    = $('#subject_id').val();
      var section_id    = $("#exam_section_id").val();
    
   
    $.ajax({
        url: "/getSecheduledExamName",
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

/*
**  Get all exam name list on select class & section in tabulation sheet 
*/
function get_marks_exam_list()
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
function get_tabulate_exam_marks()
{

     var class_id    = $('#class_id').val();
     var section_id  = $('#section_id').val();
     var exam_id     = $('#exam_id').val();
     //console.log($('#exam_code').val())
     var exam_code     = $("#exam_id option:selected" ).attr('data-value');
     var class_name = $('#class_id').find(":selected").text();
     var section_name = $('#section_id_stop').find(":selected").text();
     
     $('#tabulation_thead tbody').html('');
     $('#tabulation_table thead').html('');
   
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
                $('.tabulation_table tbody').html('');
                $('.tabulation_table thead').html('');
                dynamicheader='';
                dynamictbody='';

                studentinfo=''
             
                if(tabulationlist.length>0)
                {
                     dynamicheader='<tr><th>Admission Number</th><th>Student NAME</th>';

                   
                    for (var i = 0; i < tabulationlist.length; i++) 
                    {
                       total = 0.0;
                       count= i+1; 
                       dynamictbody+='<tr><td>'+tabulationlist[i].admission_number+'</td><td>'+tabulationlist[i].student_name+'</td>' 

                      // dynamictbody+='<tr><td>'+tabulationlist[i].student_name+'</td>' 

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

                               subjecttotal+=json[keys[k]];
                               total+= json[keys[k]];
                           }
                           if(i==0) 
                           dynamicheader+='<th>'+subject_name+'</th>';

                           dynamictbody+='<td>'+subjecttotal+'</td>';
                        }
                       averagemarks= total/j;
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
                          classname= "'"+class_name+"'";
                          sectionname = "'"+section_name+"'" ;
                          student_name = "'"+tabulationlist[i].student_name+"'";
                          if(tabulationlist[i].exam_code=='SM1'||tabulationlist[i].exam_code=='SM2')
                            dynamictbody+='<td><a href="#"  onclick="Summative('+tabulationlist[i].student_id+','+class_id+','+section_id+','+exam_id+','+code+','+student_name+','+classname+','+sectionname+')">view</a></td></tr>'
                          else
                            dynamictbody+='<td><a href="#"  onclick="Formative('+tabulationlist[i].student_id+','+class_id+','+section_id+','+exam_id+','+code+','+student_name+','+classname+','+sectionname+')">view</a></td></tr>'


                     }
                    dynamicheader+='<th>Total</th><th>Grade</th><th>Action</th></tr>'; 
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
        url: "/getAllData",
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


function getsubteacher(day){
    var section_id  = $('#section_id').val();
    var class_id    = $('#class_id').val();
    var day = day;

    $.ajax({
        url: "/getsubjTeach",
        method: "GET",
        dataType: "json",
        data: {
            class_id: class_id,
            section_id:section_id,
            day:day
        },
        success: function(response) {

             var subject  = response.subject_list;
              $('.routineTable tbody').html('');
              $('#subjectTable tbody').html('');
              if(subject.length>0){
                for (var i = 0; i < subject.length; i++) {
                   
                    var teacher_list = subject[i].teacher;
                  
                    var count = i+1;
                   
                    mytable= "'tbl_class_routine'";
                    field= "'class_routine_id'";
                    if(teacher_list.length==0){
                        $('.routineTable tbody').append('<tr id="tr_'+i+'"><td>'+count+'</td><td>'+subject[i].name+'</td><td><input type="hidden" Class="form_control" name="subject_id"  id="subject_id" value="'+subject[i].subject_id+'" disabled="disabled"><select  class="form-control" id="teacher_id_'+i+'" name="teacher_id"  disabled="disabled"><option value="">Select Teacher</option></select></td><td><select id="starting_hour'+i+'" name="time_start" class="form-control time"   disabled="disabled"><option value="" >Hour</option></select><select id="starting_minute'+i+'" name="time_start_min" class="form-control time"  disabled="disabled"><option value=""  >Minute</option></select><select name="starting_ampm" id="starting_ampm" class="form-control time"  disabled="disabled"><option value="1">am</option><option value="2">pm</option></select></td><td><select id="end_hour'+i+'" name="time_end" class="form-control time"  disabled="disabled"><option value="" >Hour</option></select><select id="end_minute'+i+'" name="time_end_min" class="form-control time"  disabled="disabled"><option value="" >Minute</option></select><select name="end_ampm" id="end_ampm" class="form-control time"  disabled="disabled"><option value="1">am</option><option value="2">pm</option></select></td><td><a class="btn btn-success mr-2" href="/classRoutineClone/?class_routine_id='+ subject[i].class_routine_id +'" > Copy</a></a><a href="#" onclick="delete_record('+ subject[i].class_routine_id +','+i+','+mytable+','+field+')"><button type="button" class="btn btn-danger btn-fw"><i class="mdi mdi-alert-outline"></i>Delete</button></a></td></tr>');
                    }else{
                         $('.routineTable tbody').append('<tr id="tr_'+i+'"><td>'+count+'</td><td>'+subject[i].name+'</td><td><input type="hidden" Class="form_control" name="subject_id"  id="subject_id" value="'+subject[i].subject_id+'"><select class="form-control" id="teacher_id_'+i+'" name="teacher_id" ><option value="">Select Teacher</option></select></td><td><select id="starting_hour'+i+'" name="time_start" class="form-control time"><option value="">Hour</option></select><select id="starting_minute'+i+'" name="time_start_min" class="form-control time"><option value="">Minute</option></select><select name="starting_ampm" id="starting_ampm'+i+'" class="form-control time"></select></td><td><select id="end_hour'+i+'" name="time_end" class="form-control time"><option value="">Hour</option></select><select id="end_minute'+i+'" name="time_end_min" class="form-control time"><option value="">Minute</option></select><select id="end_ampm'+i+'"name="end_ampm" id="end_ampm" class="form-control time" ></select></td><td><a class="btn btn-success mr-2" href="/classRoutineClone/?class_routine_id='+ subject[i].class_routine_id +'" > Copy</a><a href="#" onclick="delete_record('+ subject[i].class_routine_id +','+i+','+ mytable +','+field+')"><button type="button" class="btn btn-danger btn-fw"><i class="mdi mdi-alert-outline"></i>Delete</button></a></td></tr>');
                    }

                    //console.log("#teacher_id_"+i)
                    for (var j = 0; j < teacher_list.length; j++) 
                    {
                        if(teacher_list[j].registration_id==subject[i].routed_teacher_id)
                          $("#teacher_id_"+i).append('<option  selected value="'+teacher_list[j].registration_id+'">'+teacher_list[j].name+'</option>');
                        else
                          $("#teacher_id_"+i).append('<option  value="'+teacher_list[j].registration_id+'">'+teacher_list[j].name+'</option>');
                    }

                    for (var k = 0; k <= 12 ; k++) 
                    {
                        
                        if(k==subject[i].routed_time_start)// && subject[i].routed_time_start!="") 
                            $("#starting_hour"+i).append('<option selected  value="'+k+'">'+k+'</option>');
                        else
                            $("#starting_hour"+i).append('<option  value="'+k+'">'+k+'</option>');

                        if(k==subject[i].routed_time_end )//&& subject[i].routed_time_end !="") 
                            $("#end_hour"+i).append('<option  selected value="'+k+'">'+k+'</option>');
                        else
                            $("#end_hour"+i).append('<option value="'+k+'">'+k+'</option>');
                    }

                    for (var g = 0; g <= 11 ; g++) 
                    {
                        if(g*5==subject[i].routed_time_start_min )//&& subject[i].routed_time_start_min!="" )
                            $("#starting_minute"+i).append('<option selected value="'+g * 5+'">'+g * 5+'</option>');
                        else
                            $("#starting_minute"+i).append('<option value="'+g * 5+'">'+g * 5+'</option>');

                        if(g*5 == subject[i].routed_time_end_min)// && subject[i].routed_time_end_min !="") 
                           $("#end_minute"+i).append('<option selected value="'+g * 5+'">'+g * 5+'</option>');
                        else
                           $("#end_minute"+i).append('<option value="'+g * 5+'">'+g * 5+'</option>');

                    }
                    
                       
                     if(subject[i].routed_starting_ampm==1)  
                        $("#starting_ampm"+i).append('<option selected value="'+1+'">am</option>');
                     else
                        $("#starting_ampm"+i).append('<option value="'+1+'">am</option>');
                      
                     if(subject[i].routed_starting_ampm==2)   
                        $("#starting_ampm"+i).append('<option selected value="'+2+'">pm</option>');
                     else
                        $("#starting_ampm"+i).append('<option value="'+2+'">pm</option>'); 

                     if(subject[i].routed_end_ampm==1)  
                        $("#end_ampm"+i).append('<option selected value="'+1+'">am</option>');
                     else
                        $("#end_ampm"+i).append('<option value="'+1+'">am</option>');
                      
                     if(subject[i].routed_end_ampm==2)   
                        $("#end_ampm"+i).append('<option selected value="'+2+'">pm</option>');
                     else
                        $("#end_ampm"+i).append('<option value="'+2+'">pm</option>'); 

               }
                $('.routineTable').DataTable();
                }else{
                    $('.routineTable tbody').append('<tr><td>NO DATA FOUND<td></tr>');   
                }
            $('#classroutine').show();

            
            
        },
        error: function() {
            alert("error");
        }
    });
}

function getStudentAttendence(attendence_date){
    var attendence_date         = moment(attendence_date).format('YYYY-DD-MM'); 
    var class_id                = $('#class_id').val();
    var section_id              = $('#section_id').val();

    // console.log(attendence_date);
    // return

    $.ajax({
        url: "/getStudentAttendence",
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
                    $('#attendence tbody').append('<tr><td>'+count+'</td><td>'+response[i].admission_number+'</td><td>'+response[i].name+'</td><td><input type="hidden"  name="student_id"   value="'+response[i].registration_id+'"><select class="form-control select" id="status" name="status"><option value="0">Select Attendence</option><option value="1">Present</option><option value="2">Absent</option></select></td></tr>');
                }else if(response[i].attendence==1){
                    $('#attendence tbody').append('<tr><td>'+count+'</td><td>'+response[i].admission_number+'</td><td>'+response[i].name+'</td><td><input type="hidden"  name="student_id"   value="'+response[i].registration_id+'"><select class="form-control select" id="status" name="status"><option value="0">Select Attendence</option><option value="1" selected>Present</option><option value="2">Absent</option></select></td></tr>');
                }else if(response[i].attendence==2){
                    $('#attendence tbody').append('<tr><td>'+count+'</td><td>'+response[i].admission_number+'</td><td>'+response[i].name+'</td><td><input type="hidden"  name="student_id"   value="'+response[i].registration_id+'"><select class="form-control select" id="status" name="status"><option value="0">Select Attendence</option><option value="1" >Present</option><option value="2" selected>Absent</option></select></td></tr>');
                }
                
            }
            $('.table1').DataTable();
           // $('#attendence').DataTable();
            $('#attendenceTable').show();
            
            
            
        },
        error: function() {
            alert("error");
        }
    });
}

function getTeacherAttendence(attendence_date){
    var attendence_date         = attendence_date;
    var class_id                = $('#teacher_class_id').val();
    var section_id              = $('#teacher_section_id').val();

    $.ajax({
        url: "/getTeacherAttendence",
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
                    $('#attendence tbody').append('<tr><td>'+count+'</td><td>'+response[i].name+'</td><td><input type="hidden"  name="student_id"  id="student_id" value="'+response[i].registration_id+'"><select class="form-control select" id="status" name="status"><option value="0">Select Attendence</option><option value="1">Present</option><option value="2">Absent</option></select></td></tr>');
                }else if(response[i].attendence==1){
                    $('#attendence tbody').append('<tr><td>'+count+'</td><td>'+response[i].name+'</td><td><input type="hidden"  name="student_id"  id="student_id" value="'+response[i].registration_id+'"><select class="form-control select" id="status" name="status"><option value="0">Select Attendence</option><option value="1" selected>Present</option><option value="2">Absent</option></select></td></tr>');
                }else if(response[i].attendence==2){
                    $('#attendence tbody').append('<tr><td>'+count+'</td><td>'+response[i].name+'</td><td><input type="hidden"  name="student_id"  id="student_id" value="'+response[i].registration_id+'"><select class="form-control select" id="status" name="status"><option value="0">Select Attendence</option><option value="1" >Present</option><option value="2" selected>Absent</option></select></td></tr>');
                }
                
            }
            $('#attendenceTable').show();
            
            
            
        },
        error: function() {
            alert("error");
        }
    });
}

function setStatus(status){
       
       $('.select').each(function(){
             $(this).val(status);
       })
       return false;

}



function get_student_detail()
{
    var class_id    = $('#class_id').val();
    var section_id  = $('#exam_section_id').val();
    var subject_id  = $('#subject_id').val();
    var subject_type  =$('#subject_id').find(':selected').attr('data-value') //$('#subject_id').attr('data-value');
    var exam_id     = $('#exam_id').val();
    var exam_code   =$('#exam_id').find(':selected').attr('data-value')

     $.ajax({
        url: "/getStudentAllDetail",
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
                  
                    
                  // var children_participation = student_detail[i].marks['childrens_participation'];
                  // var written_work           = student_detail[i].marks['written_work'];
                  // var project_work           = student_detail[i].marks['project_work'];
                  // var slip_test              = student_detail[i].marks['slip_test'];
                  // var comment                = student_detail[i].marks['comment'];
                  // var marks_get              = Number(children_participation) + Number(written_work) + Number(project_work) + Number(slip_test);
                }else{
                  // var children_participation = '0.00';
                  // var written_work           = '0.00';
                  // var project_work           = '0.00';
                  // var slip_test              = '0.00';
                  // var comment                = '';
                  // var marks_get              = '0.00';
                }
   

                // $('#manage_marks tbody').append('<tr><td>'+count+'</td><td>'+student_detail[i].name+'</td><td><input type="hidden"  name="student_id"  id="student_id_'+student_detail[i].registration_id+'" value="'+student_detail[i].registration_id+'"><input type="text" class="form-control" name="children_participation" id="children_participation_'+student_detail[i].registration_id+'" onblur="check_manage_marks('+student_detail[i].registration_id+',1)" value="'+children_participation+'"><span id="children_error_'+student_detail[i].registration_id+'" class="error"></span></td><td><input type="text" class="form-control" name="written_work" id="written_work_'+student_detail[i].registration_id+'" onblur="check_manage_marks('+student_detail[i].registration_id+',2)" value="'+written_work+'"><span id="written_error_'+student_detail[i].registration_id+'" class="error"></span></td><td><input type="text" class="form-control" name="project_work" id="project_work_'+student_detail[i].registration_id+'" onblur="check_manage_marks('+student_detail[i].registration_id+',3)" value="'+project_work+'"><span id="project_error_'+student_detail[i].registration_id+'" class="error"></span></td><td><input type="text" class="form-control" name="slip_test" id="slip_test_'+student_detail[i].registration_id+'" onblur="check_manage_marks('+student_detail[i].registration_id+',4)" value="'+slip_test+'"><span id="slip_error_'+student_detail[i].registration_id+'" class="error"></span></td><td><input type="text" class="form-control" name="marks_obtained" disabled value="'+marks_get+'" id="marks_obtained_'+student_detail[i].registration_id+'"><span id="marks_error_'+student_detail[i].registration_id+'"></span></td><td><input type="text" class="form-control"  disabled value="'+total_marks+'" id="total_marks_'+student_detail[i].registration_id+'"><input type="hidden" class="form-control" name="total_marks"  value="'+total_marks+'"></td><td><input type="text" class="form-control" name="comment" value="'+comment+'"></td></tr>');

             
           
                
               // if(student_detail[i].othermarks!=undefined || student_detail[i].othermarks!='')
               // {

               //     var studentname = student_detail[i].name
               //      var comment     = student_detail[i].othermarks['comment'] ? student_detail[i].othermarks['comment'] : "";
                   

               //       //console.log(student_detail[i].marks)
               //      json = JSON.parse(student_detail[i].othermarks);

               //      keys = Object.keys(json)
               //      mydata= "'"+ JSON.stringify(keys)+"'";



                   
               //      if(student_detail[i].othermarks!=''){

               //       dynamicheader='';

               //        if(keys.length>0 )
               //        {
                        
               //          otherdynamicheader='<tr><th>#</th><th>Name</th>';
                        
               //          var marks_get = 0.0;
               //          mydata='';
               //          for(k=0;k<keys.length;k++)
               //          {
               //             mydata += keys[k].replace(/ /g,"_")+'^';
               //          }
               //          mydata= mydata.slice(0, -1)
                        
               //          for(k=0;k<keys.length;k++)
               //          {
               //               //heading = 
               //              otherdynamicheader+='<th>'+keys[k].replace(/_/g," ")+'</th>';

               //              if(k==0)
               //               otherdynamicdata+='<tr><td>'+ count +'</td><td><input type="hidden"  name="student_id"  id="student_id_'+student_detail[i].registration_id+'" value="'+student_detail[i].registration_id+'">'+ studentname +'</td>'

                               
               //                   var marks_get = Number(json[keys[k]]); 

                                 
               //                   var name =keys[k].toString();
               //                   var name = name.replace(/ /g,"_");
                                 
               //                   //var textboxname=textboxname.replace(/,/g,"$"); //"'"+name+"'";
               //                   var student_id   = "'"+student_detail[i].registration_id+"'";
               //                   var mystring     = "'"+mydata+"'";
               //                   otherdynamicdata+='<td><input type="hidden" class="subjectname_'+k+'" name="subjectname" value="'+name+'"><input type="text" class="form-control" name="marks" id="'+name+'_'+student_detail[i].registration_id+'" onblur="check_manage_marks1('+student_id+','+mystring+' )" value="'+json[keys[k]]+'"><span id="children_error_'+student_detail[i].registration_id+'" class="error"></span></td>'
               //          }  

               //          otherdynamicdata+='<td><input type="text" class="form-control" name="marks_obtained" disabled value="'+marks_get+'" id="marks_obtained_'+student_detail[i].registration_id+'"><span id="marks_error_'+student_detail[i].registration_id+'"></span></td><span id="marks_error_'+student_detail[i].registration_id+'"></span></td><td><input type="hidden" class="form-control" name="total_marks"  value="'+total_marks+'"><input type="text" class="form-control"  disabled value="'+total_marks+'" name="total_marks" id="total_marks_'+student_detail[i].registration_id+'">'
               //        }
     
               //       otherdynamicheader+='<th>Marks Obtained</th><th>Total Marks</th><th>Comment</th>' 
               //       otherdynamicdata+='<td><input type="text" class="form-control" name="comment" value="'+comment+'"></td></tr>'
               //      }

               // }


            }

            $('#manage_marks thead').append(dynamicheader);  
            $('#manage_marks tbody').append(dynamicdata)
             $('#table_manage').show();



            //  $('#other_manage_marks thead').append(otherdynamicheader);  
            // $('#other_manage_marks tbody').append(otherdynamicdata)
            //  $('#other_table_manage').show();



      

            
            
            
        },
        error: function() {
            alert("error");
        }
    });
    
}
function check_manage_marks1(user_id,keys)
{
    var marks_obtained         = $("#marks_obtained_"+user_id+"").val();
    var total_marks            = $("#total_marks_"+user_id+"").val();
    arr= keys.split('^');
    //console.log(arr);
    value =0.00;
   var marks_get=0.00
   if(Array.isArray(arr))
   {

      for(i=0;i<arr.length;i++)
       {
         value = $("#"+arr[i]+"_"+user_id+"").val();
         if(!$.isNumeric(value)) 
          {
            value = 0.00
          }
          //$("."+"subjectname_"+k).val();
          
           
           //subject_name = arr[i]+':'+ $("#"+arr[i]+"_"+user_id+"").val();


          // $(".subjectname_"+i).val(subject_name);
          // console.log($("."+"subjectname_"+i).val());

           //alert($("."+"subjectname_"+k).val());

           marks_get += Number(value);
           $("#marks_obtained_"+user_id+"").val(marks_get);
           $("#hidden_marks_obtained_"+user_id+"").val(marks_get);


            var marks_available = Number(total_marks);
           
           // if(marks_get>marks_available){
           //    $("#children_error_"+user_id+"").text('Please Enter Less Then Total Marks');
           //    $("#"+arr[i]+"_"+user_id+"").val('0.00');
           //    $("#"+arr[i]+"_"+user_id+"").focus();
           //  }else{
           //          $("#children_error_"+user_id+"").text('');
           //  }
           
       }

   }
   else
   {
            value = $("#"+arr[i]+"_"+user_id+"").val();
             marks_get += Number(value);    
            $("#marks_obtained_"+user_id+"").val(marks_get);
            var marks_available = Number(total_marks);
           
           
   }

   if(marks_get>marks_available){
              $("#children_error_"+user_id+"").text('Please Enter Less Then Total Marks');
              $("#"+arr[i]+"_"+user_id+"").val('0.00');
              $("#"+arr[i]+"_"+user_id+"").focus();
            }else{
                    $("#children_error_"+user_id+"").text('');
            }
   
    

}

function check_manage_marks(user_id,type,name){
        if(type==1){


            var children_participation = $("#children_participation_"+user_id+"").val();
            var written_work           = $("#written_work_"+user_id+"").val();
            var project_work           = $("#project_work_"+user_id+"").val();
            var slip_test              = $("#slip_test_"+user_id+"").val();
            var marks_obtained         = $("#marks_obtained_"+user_id+"").val();
            var total_marks            = $("#total_marks_"+user_id+"").val();
            
            if(!$.isNumeric(children_participation)) { 
               $("#children_participation_"+user_id+"").val(0.00);
               var children_participation  = 0.00;
            }
            if(!$.isNumeric(written_work)) { 
               $("#written_work_"+user_id+"").val(0.00);
               var written_work            = 0.00;
            }
            if(!$.isNumeric(project_work)) { 
               $("#project_work_"+user_id+"").val(0.00);
               var project_work            = 0.00;
            }
            if(!$.isNumeric(slip_test)) { 
               $("#slip_test_"+user_id+"").val(0.00);
               var slip_test            = 0.00;
            }
            var marks_get       = Number(children_participation) + Number(written_work) + Number(project_work) + Number(slip_test);
            $("#marks_obtained_"+user_id+"").val(marks_get);
            var marks_available = Number(total_marks);
            //console.log(marks_get)
            //console.log(marks_available)
            if(marks_get>marks_available){
                $("#children_error_"+user_id+"").text('Please Enter Less Then Total Marks');
                $("#children_participation_"+user_id+"").val('0.00');
                $("#children_participation_"+user_id+"").focus();
            }else{
                $("#children_error_"+user_id+"").text('');
            }
        }else if(type==2){
            var children_participation = $("#children_participation_"+user_id+"").val();
            var written_work           = $("#written_work_"+user_id+"").val();
            var project_work           = $("#project_work_"+user_id+"").val();
            var slip_test              = $("#slip_test_"+user_id+"").val();
            var marks_obtained         = $("#marks_obtained_"+user_id+"").val();
            var total_marks            = $("#total_marks_"+user_id+"").val();
            
            if(!$.isNumeric(children_participation)) { 
               $("#children_participation_"+user_id+"").val(0.00);
               var children_participation  = 0.00;
            }
            if(!$.isNumeric(written_work)) { 
               $("#written_work_"+user_id+"").val(0.00);
               var written_work  = 0.00;

            }
            if(!$.isNumeric(project_work)) { 
               $("#project_work_"+user_id+"").val(0.00);
                var project_work  = 0.00;

            }
            if(!$.isNumeric(slip_test)) { 
               $("#slip_test_"+user_id+"").val(0.00);
               var slip_test  = 0.00;

            }

            var marks_get = Number(children_participation) + Number(written_work) + Number(project_work) + Number(slip_test);
             $("#marks_obtained_"+user_id+"").val(marks_get);
            var marks_available = Number(total_marks);
            
            if(marks_get>marks_available){
                $("#written_error_"+user_id+"").text('Please Enter Less Then Total Marks');
                $("#written_work_"+user_id+"").val('0.00');
                $("#written_work_"+user_id+"").focus();
            }else{
                $("#written_error_"+user_id+"").text('');
            }
        }else if(type==3){
            var children_participation = $("#children_participation_"+user_id+"").val();
            var written_work           = $("#written_work_"+user_id+"").val();
            var project_work           = $("#project_work_"+user_id+"").val();
            var slip_test              = $("#slip_test_"+user_id+"").val();
            var marks_obtained         = $("#marks_obtained_"+user_id+"").val();
            var total_marks            = $("#total_marks_"+user_id+"").val();
            
            if(!$.isNumeric(children_participation)) { 
               $("#children_participation_"+user_id+"").val(0.00);
               var children_participation =  0.00

            }
            if(!$.isNumeric(written_work)) { 
               $("#written_work_"+user_id+"").val(0.00);
               var written_work =  0.00

            }
            if(!$.isNumeric(project_work)) { 
               $("#project_work_"+user_id+"").val(0.00);
               var project_work =  0.00

            }
            if(!$.isNumeric(slip_test)) { 
               $("#slip_test_"+user_id+"").val(0.00);
               var slip_test =  0.00

            }

            var marks_get = Number(children_participation) + Number(written_work) + Number(project_work) + Number(slip_test);
             $("#marks_obtained_"+user_id+"").val(marks_get);
            var marks_available = Number(total_marks);
            //console.log(marks_get)
            //console.log(marks_available)
            if(marks_get>marks_available){
                $("#project_error_"+user_id+"").text('Please Enter Less Then Total Marks');
                $("#project_work_"+user_id+"").val('0.00');
                $("#project_work_"+user_id+"").focus();
            }else{
                $("#project_error_"+user_id+"").text('');
            }

        }else if(type==4){
            var children_participation = $("#children_participation_"+user_id+"").val();
            var written_work           = $("#written_work_"+user_id+"").val();
            var project_work           = $("#project_work_"+user_id+"").val();
            var slip_test              = $("#slip_test_"+user_id+"").val();
            var marks_obtained         = $("#marks_obtained_"+user_id+"").val();
            var total_marks            = $("#total_marks_"+user_id+"").val();
            
            if(!$.isNumeric(children_participation)) { 
               $("#children_participation_"+user_id+"").val(0.00);
               var children_participation = 0.00;

            }
            if(!$.isNumeric(written_work)) { 
               $("#written_work_"+user_id+"").val(0.00);
                var written_work = 0.00;

            }
            if(!$.isNumeric(project_work)) { 
               $("#project_work_"+user_id+"").val(0.00);
               var project_work = 0.00;

            }
            if(!$.isNumeric(slip_test)) { 
               $("#slip_test_"+user_id+"").val(0.00);
               var slip_test = 0.00;

            }

            var marks_get = Number(children_participation) + Number(written_work) + Number(project_work) + Number(slip_test);
             $("#marks_obtained_"+user_id+"").val(marks_get);
            var marks_available = Number(total_marks);
           
            if(marks_get>marks_available){
                $("#slip_error_"+user_id+"").text('Please Enter Less Then Total Marks');
                $("#slip_test_"+user_id+"").val('0.00');
                $("#slip_test_"+user_id+"").focus();
            }else{
                $("#slip_error_"+user_id+"").text('');
            }
        }
    }


/* Get list of all student on specific class & section */
function get_studentlist()
{
     var classid = $('#class_id').find(":selected").val();
     var sectionid = $('#section_id_stop').find(":selected").val();
     var classname = $('#class_id').find(":selected").text();
     var sectionname = $('#section_id_stop').find(":selected").text();

     
        $.ajax({
            url: "/classsection_studentList",
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
                       tablerow+='<td>'+sectionname+'</td><td>'+students[i].parentname+'</td><td>'+students[i].parentphone+'</td>';
                       tablerow+='<td><a href="/Registration?registration_id='+students[i].registration_id+'"><button type="button" class="btn btn-dark btn-fw"><i class="mdi mdi-cloud-download"></i>Edit</button>';
                       //tablerow+='</a><a href="#"><button type="button" class="btn btn-danger btn-fw"><i class="mdi mdi-alert-outline"></i>Delete</button></a></td></tr>';
                       tablerow+='</a><a href="#" onclick="delete_record('+students[i].registration_id+','+i+','+mytable+','+field+')"><button type="button" class="btn btn-danger btn-fw"><i class="mdi mdi-alert-outline"></i>Delete</button></a></td></tr>';
                       
                       //delete_record('+students[i].registration_id+','+i+','+tbl_registration+','+registration_id+') 
                 }
                 $('.studentlistTable tbody').append(tablerow);
                 $(".studentlistTable").DataTable();
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
/* registration form */ 

/* Get Subject list of subject on specific class & section */
function get_subjectlist()
{
     var classid = $('#classid').find(":selected").val();
     var classname = $('#classid').find(":selected").text();
     //alert(classid);

     $.ajax({
        url: "/classsection_subjectList",
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
                   tablerow+='<tr id=tr_'+i+' ><td>'+ (i+1) +'</td><td>'+classname+'</td><td>'+subjects[i].name+'</td><td>'+ subjecttype +'</td>';
                   tablerow+='<td><a href="/Subject?subject_id='+subjects[i].subject_id+'"><button type="button" class="btn btn-dark btn-fw"><i class="mdi mdi-cloud-download"></i>Edit</button>';
                   tablerow+='</a><a href="#" onclick="delete_record('+subjects[i].subject_id+','+i+','+mytable+','+field+')"><button type="button" class="btn btn-danger btn-fw"><i class="mdi mdi-alert-outline"></i>Delete</button></a></td></tr>';                    
             }

             $('.subjectlistTable tbody').append(tablerow);
             $('.subjectlistTable').DataTable();
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
/* registration form */ 

/* Get All teacher on change of class */ 
function get_teacherlist(classid)
{
     //var classid = $('#class').find(":selected").val();
     //var classname = $('#class').find(":selected").text();
     $.ajax({
        url: "/class_teacherList",
        method: "GET",
        dataType: "json",
        data: {
            class_id: classid,
        },
        success: function(response) {
            
            $('.teacherlistTable tbody').empty();
            $(".teachertable").show();   
            

            teachers = response.assign_list;
            
            //console.log('########',teachers);
            //console.log(teachers.length);

            tablerow='';
            mytable= "'tbl_teacherassignment'";
            field= "'id'";
            if(teachers.length>0){ 
              for (var i = 0; i < teachers.length; i++) {
                   tablerow+='<tr id="tr_'+i+'"><td>'+ (i+1) +'</td><td>'+teachers[i].class_name+'</td><td>'+teachers[i].section_name+'</td><td>'+teachers[i].subject_name+'</td><td>'+teachers[i].teacher_name+'</td>';
                   
                   tablerow+='<td><a href="/AssignTeacher?id='+teachers[i].id+'"><button type="button" class="btn btn-dark btn-fw"><i class="mdi mdi-cloud-download"></i>Edit</button>';
                   tablerow+='</a><a href="#" onclick="delete_record('+teachers[i].id+','+i+','+mytable+','+field+')"><button type="button" class="btn btn-danger btn-fw"><i class="mdi mdi-alert-outline"></i>Delete</button></a></td></tr>';
             }

             $('.teacherlistTable tbody').append(tablerow);
            }
            else{
                console.log('NotFound');
                $('.teacherlistTable tbody').html('');
               $('.teacherlistTable tbody').append('<tr ><td colspan="8">NO DATA FOUND<td></tr>');  
            }
        },
        error: function() {
            alert("error");
        }
    });
}
/* Get All teacher on change of class */ 
 

/* Get all Student on change of section for section shift */ 
function getStudentToshift(attendence_date){
    
    //var attendence_date         = attendence_date;
    var class_id                = $('#class_id').val();
    var section_id              = $('#section_id_stop').val();
   
            
            $.ajax({
                url: "/classsection_studentList",
                method: "GET",
                dataType: "json",
                data: {
                    class_id        : class_id,
                    section_id      : section_id,
                    //attendence_date : attendence_date
                   
                },
                success: function(response) {
                    
                    var student_list =response.student_list;
                    $('.tableshift tbody').html('');
                     $('#shiftTable').show();
                    console.log(student_list.length);
                    if(student_list.length>0)
                    {
                      for (var i = 0; i < student_list.length; i++) {
                         var count = i+1;
                         $('.tableshift tbody').append('<tr><td>'+count+'&nbsp;<input type="checkbox" value="'+student_list[i].enroll_id+'" name="enroll_id"></td><td> '+student_list[i].name+'</td></tr>');
                       }

                       $('.tableshift').DataTable();
                     
                    }
                    else
                    {
                       $('.tableshift tbody').append('<tr ><td colspan="2">NO DATA FOUND<td></tr>');  
                    }
                    
                    
                },
                error: function() {
                    alert("error");
                }
            });
    
}
/* ************* */

/* Get all Student on change of section for Bonafide */ 
function getStudentTobonafide(attendence_date){
    
    //var attendence_date         = attendence_date;
    var class_id                = $('#class_id').val();
    var section_id              = $('#section_id_stop').val();

    if(class_id=="")
    {
        alert("Please select class");
        return false;
    }

    if(section_id=="")
    {
        alert("Please select section");
        return false;
    }

    $.ajax({
        url: "/All_studentList",
        method: "GET",
        dataType: "json",
        data: {
            class_id        : class_id,
            section_id      : section_id,
            //attendence_date : attendence_date
        },
        success: function(response) {
            var student_list =response.student_list;
            $('.tableshift tbody').html('');
            $('#shiftTable').show();
            if(student_list.length>0)
            {
              for (var i = 0; i < student_list.length; i++) {
                 var count = i+1;
                 var checked='';
                 if(student_list[i].bonafide_status ==1)
                    {
                        checked='checked'; 
                        $link = '?registration_id='+student_list[i].registration_id+'&class_id='+student_list[i].class_id+'&section_id='+student_list[i].section_id;
                        $link ="#"
                        $('.tableshift tbody').append('<tr><td>'+count+'&nbsp;<input '+ checked +' type="checkbox" value="'+student_list[i].enroll_id+'" name="enroll_id"></td> <td> '+student_list[i].admission_number+'</td><td> '+student_list[i].name+'</td><td> <input type="button" class="btn btn-primary" onclick="bonafidemodal('+student_list[i].registration_id+','+student_list[i].class_id+','+student_list[i].section_id+')" value="View"></td><td>&nbsp;</td></tr>');
                    } 
                    else
                        $('.tableshift tbody').append('<tr><td>'+count+'&nbsp;<input '+ checked +' type="checkbox" value="'+student_list[i].enroll_id+'" name="enroll_id"></td><td> '+student_list[i].admission_number+'</td><td> '+student_list[i].name+'</td><td>&nbsp;</td><td> <input type="button" class="btn btn-primary" onclick="bonafidemodal('+student_list[i].registration_id+','+student_list[i].class_id+','+student_list[i].section_id+')" value="View"></td></tr>');


               }

               $('.tableshift').DataTable();
             
            }
            else
            {
               $('.tableshift tbody').append('<tr ><td colspan="2">NO DATA FOUND<td></tr>');  
            }
            
            
        },
        error: function() {
            alert("error");
        }
    });
}
/* ************* */

/* Get all student for promotions */

function getStudentforpromotion(){
    var attendence_date         = attendence_date;
    var class_id                = $('#class_id').val();
    var section_id              = $('#section_id').val();

    if(class_id=="")
    {
        alert("Please select class");
        return false;
    }

    if(section_id=="")
    {
        alert("Please select section");
        return false;
    }
    $.ajax({
        url: "/classsection_promotion",
        method: "GET",
        dataType: "json",
        data: {
            class_id        : class_id,
            section_id      : section_id,
            //attendence_date : attendence_date
        },
        success: function(response) {

            student_list =response.student_list;
            //console.log('rrrrrrrrrrrr',student_list); 
            $('.attendence tbody').html('');
            for (var i = 0; i < student_list.length; i++) 
            {
                var count = i+1;
                // if(student_list[i].student_list==undefined || response[i].student_list==0){
                $('.attendence tbody').append('<tr><td> <input type="checkbox" value="'+student_list[i].enroll_id+'"  name="chk_enroll_id"></td><td > '+ student_list[i].admission_number+' </td> <td>'+student_list[i].name+'</td><td> <select class="form-control select" id="session_year" name="session_year"><option value="'+student_list[i].session_year+'">'+student_list[i].session_year+'</option> <option value="'+student_list[i].nextyear+'">'+student_list[i].nextyear+'</option> </select></td></tr>');
                
            }
            $('.attendence').DataTable();
            $('#attendenceTable').show();
        },
        error: function() {
            alert("error");
        }
    });
}
/* ******************** */
function bonafidemodal(registration_id,class_id,section_id)
{
    //$('#myModal').modal('show');
    var modalval='';
    var class_id                = $('#class_id').val();
    var section_id              = $('#section_id_stop').val();

    $.ajax({
        url: "/get_bonafidestudentDetail",
        method: "GET",
        dataType: "json",
        data: {
            class_id        : class_id,
            section_id      : section_id,
            registration_id : registration_id
        },
        success: function(response) {
            var student_list =response.student_list;
            console.log(student_list);
            $('.book').html('')
            
            if(student_list.length>0)
            {
              for (var i = 0; i < student_list.length; i++) {
                 var count = i+1;
                 var checked='';
                   parts = student_list[i].bonafide_date.split('T');
                   Bpartdate = parts[0].split('-')
                   bonafidedate = Bpartdate[2] + '-' + Bpartdate[1] + '-' + Bpartdate[0];

                   parts = student_list[i].created_date.split('T');
                   Apartdate = parts[0].split('-')
                   admissiondate = Apartdate[2] + '-' + Apartdate[1] + '-' + Apartdate[0];

                   var months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

                   if(student_list[i].bonafide_date== '0000-00-00 00:00:00')
                       bonafidedate= moment().format('D MMM, YYYY');
                   
                     //bonafidedate= moment().format('D MMM, YYYY');

                    link="http://localhost:3000/images/"+student_list[i].school_logo ;
                  
                    //link="http://panchavatividyalaya.com/images/panchavati-logo.png";


                   modalval+= '<div class="page" id="print-content"><div class="subpage">';
                   modalval += '<div style="width: 30%; float: left; position: relative;"><img style="width: 550px; border-radius: 10px; position: absolute; clip: rect(0px 163px 173px 4px);" src="'+link+'" alt="gffffff"></div>'

                   modalval +='<div style="width: 70%; float: right;"><h1 style="text-align: center;margin-top: 0; text-transform: uppercase; font-size: 40px;">'+student_list[i].school_name +'</h1><p style="text-align: center; font-size: 21px; line-height: 24px; font-weight: 500;"><span>Rc. No.</span>'+student_list[i].school_rc_no +' <br> '+student_list[i].school_address +'   </p><p style="text-align: center; font-size: 20px; font-weight: 600;">BONAFIDE & CONDUCT CERTIFICATE</p></div>'; 

                   modalval += '<div style="clear: both;"></div><br><div style="width: 50%; float: left;"><span style="font-size: 20px; font-weight: 500;"> Admission No. </span> <span style="border-bottom: solid 1px #333; width: 180px; display: -webkit-inline-box;">'+student_list[i].admission_number +' </span></div>';
                   modalval +='<div style="width: 50%; float: left; text-align: right;"><span style="font-size: 20px; font-weight: 500;"> Date. </span>  <span style="border-bottom: solid 1px #333; width: 180px; display: -webkit-inline-box;">'+bonafidedate+'</span></div>';

                   modalval +='<div style="clear: both;"></div><br><div style="width: 100%;"><span style="font-size: 20px; font-weight: 500;"> This is to certify that Master/Kumari </span><span style="border-bottom: solid 1px #333; width: 530px; display: -webkit-inline-box;">'+student_list[i].name +'</span></div>';

                   modalval +='<div style="clear: both;"></div><br><div style="width: 100%;"><span style="font-size: 20px; font-weight: 500;"> S/o. D/o. </span><span style="border-bottom: solid 1px #333; width: 645px; display: -webkit-inline-box;"> '+student_list[i].parentname +' </span><span style="font-size: 20px; font-weight: 500;"> Is was a Bonafide </span></div>';

                   modalval += '<div style="clear: both;"></div><br><div style="width: 100%;"><span style="font-size: 20px; font-weight: 500;"> Student of this Institute for the period from </span><span style="border-bottom: solid 1px #333; width: 220px; display: -webkit-inline-box;">'+Apartdate[0]+'</span><span style="font-size: 20px; font-weight: 500;"> to </span><span style="border-bottom: solid 1px #333; width: 77px; display: -webkit-inline-box;">'+Bpartdate[0]+'</span><span style="font-size: 20px; font-weight: 500;"> Studying/ </span></div>';

                   modalval +='<div style="clear:both;"></div><br><div style="width: 100%;"><span style="font-size: 20px; font-weight: 500;"> Studied in Class </span><span style="border-bottom: solid 1px #333; width: 150px; display: -webkit-inline-box;">'+student_list[i].class_name +'</span><span style="font-size: 20px; font-weight: 500;"> During the academic year </span><span style="border-bottom: solid 1px #333; width: 305px; display: -webkit-inline-box;">'+student_list[i].session_year+'</span></div>';

                    modalval +='<div style="clear:both"></div><br><div style="width: 100%;"><span style="font-size: 20px; font-weight: 500;"> His/Her Date of Birth is </span><span style="border-bottom: solid 1px #333; width: 150px; display: -webkit-inline-box;">'+student_list[i].dob +'</span><span style="font-size: 20px; font-weight: 500;"> (in words) </span><span style="border-bottom: solid 1px #333; width: 395px; display: -webkit-inline-box;">'+convertDateInWords(student_list[i].dob)+'</span></div>'; 

                    modalval +='<div style="clear: both;"></div><br><div style="width: 100%;"><span style="font-size: 20px; font-weight: 500;"> as recorded in our School / Admission Register. </span></div><div style="clear: both"></div><br><div style="width: 100%;"><span style="font-size: 20px; font-weight: 500;"> To the best of my knowledge and belief his / her Conduct is </span><span style="border-bottom: solid 1px #333; width: 255px; display: -webkit-inline-box;"></span></div> ';

                    modalval += '<div style="clear: both;"></div><br><div style="width: 100%;"><div style="float: right; text-align: center; margin-top: 50px;"><span style="font-size: 40px; font-weight: 600; font-style: italic; color: #333;"> Head of the Institution </span></div></div>';

                    modalval += '</div></div>' ;
                    $('.book').append(modalval);
               }
                $('#bonafideModal').modal('show');
             
            }
            else
            {
               $('.tableshift tbody').append('<tr ><td colspan="2">NO DATA FOUND<td></tr>');  
            }

           
            





            
        },
        error: function() {
            alert("error");
        }
    });
}
    
/* ##############  */

function get_student_by_class(section_id){
    var class_id     = $('#class_id').val();
    var section_id   = section_id
    $.ajax({
        url: "/get_student_by_class_id",
        method: "GET",
        dataType: "json",
        data: {
            class_id        : class_id,
            section_id      : section_id,
            //registration_id : registration_id
        },
        success: function(response) {
            var student_list =response.student_list;
            console.log(student_list);
            $('.book').html('')
            
            if(student_list.length>0)
            {
              for (var i = 0; i < student_list.length; i++) {
                 var count = i+1;
                 var checked='';
                   parts = student_list[i].bonafide_date.split('T');
                   Bpartdate = parts[0].split('-')
                   bonafidedate = Bpartdate[2] + '-' + Bpartdate[1] + '-' + Bpartdate[0];

                   parts = student_list[i].created_date.split('T');
                   Apartdate = parts[0].split('-')
                   admissiondate = Apartdate[2] + '-' + Apartdate[1] + '-' + Apartdate[0];

                   var months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

                   if(student_list[i].bonafide_date== '0000-00-00 00:00:00')
                       bonafidedate= moment().format('D MMM, YYYY');
                   
                     //bonafidedate= moment().format('D MMM, YYYY');

                    link="http://localhost:3000/images/"+student_list[i].school_logo ;
                  
                    //link="http://panchavatividyalaya.com/images/panchavati-logo.png";


                   modalval+= '<div class="page" id="print-content"><div class="subpage">';
                   modalval += '<div style="width: 30%; float: left; position: relative;"><img style="width: 550px; border-radius: 10px; position: absolute; clip: rect(0px 163px 173px 4px);" src="'+link+'" alt="gffffff"></div>'

                   modalval +='<div style="width: 70%; float: right;"><h1 style="text-align: center;margin-top: 0; text-transform: uppercase; font-size: 40px;">'+student_list[i].school_name +'</h1><p style="text-align: center; font-size: 21px; line-height: 24px; font-weight: 500;"><span>Rc. No.</span>'+student_list[i].school_rc_no +' <br> '+student_list[i].school_address +'   </p><p style="text-align: center; font-size: 20px; font-weight: 600;">BONAFIDE & CONDUCT CERTIFICATE</p></div>'; 

                   modalval += '<div style="clear: both;"></div><br><div style="width: 50%; float: left;"><span style="font-size: 20px; font-weight: 500;"> Admission No. </span> <span style="border-bottom: solid 1px #333; width: 180px; display: -webkit-inline-box;">'+student_list[i].admission_number +' </span></div>';
                   modalval +='<div style="width: 50%; float: left; text-align: right;"><span style="font-size: 20px; font-weight: 500;"> Date. </span>  <span style="border-bottom: solid 1px #333; width: 180px; display: -webkit-inline-box;">'+bonafidedate+'</span></div>';

                   modalval +='<div style="clear: both;"></div><br><div style="width: 100%;"><span style="font-size: 20px; font-weight: 500;"> This is to certify that Master/Kumari </span><span style="border-bottom: solid 1px #333; width: 530px; display: -webkit-inline-box;">'+student_list[i].name +'</span></div>';

                   modalval +='<div style="clear: both;"></div><br><div style="width: 100%;"><span style="font-size: 20px; font-weight: 500;"> S/o. D/o. </span><span style="border-bottom: solid 1px #333; width: 645px; display: -webkit-inline-box;"> '+student_list[i].parentname +' </span><span style="font-size: 20px; font-weight: 500;"> Is was a Bonafide </span></div>';

                   modalval += '<div style="clear: both;"></div><br><div style="width: 100%;"><span style="font-size: 20px; font-weight: 500;"> Student of this Institute for the period from </span><span style="border-bottom: solid 1px #333; width: 220px; display: -webkit-inline-box;">'+Apartdate[0]+'</span><span style="font-size: 20px; font-weight: 500;"> to </span><span style="border-bottom: solid 1px #333; width: 77px; display: -webkit-inline-box;">'+Bpartdate[0]+'</span><span style="font-size: 20px; font-weight: 500;"> Studying/ </span></div>';

                   modalval +='<div style="clear:both;"></div><br><div style="width: 100%;"><span style="font-size: 20px; font-weight: 500;"> Studied in Class </span><span style="border-bottom: solid 1px #333; width: 150px; display: -webkit-inline-box;">'+student_list[i].class_name +'</span><span style="font-size: 20px; font-weight: 500;"> During the academic year </span><span style="border-bottom: solid 1px #333; width: 305px; display: -webkit-inline-box;">'+student_list[i].session_year+'</span></div>';

                    modalval +='<div style="clear:both"></div><br><div style="width: 100%;"><span style="font-size: 20px; font-weight: 500;"> His/Her Date of Birth is </span><span style="border-bottom: solid 1px #333; width: 150px; display: -webkit-inline-box;">'+student_list[i].dob +'</span><span style="font-size: 20px; font-weight: 500;"> (in words) </span><span style="border-bottom: solid 1px #333; width: 395px; display: -webkit-inline-box;">'+student_list[i].dob +'</span></div>'; 

                    modalval +='<div style="clear: both;"></div><br><div style="width: 100%;"><span style="font-size: 20px; font-weight: 500;"> as recorded in our School / Admission Register. </span></div><div style="clear: both"></div><br><div style="width: 100%;"><span style="font-size: 20px; font-weight: 500;"> To the best of my knowledge and belief his / her Conduct is </span><span style="border-bottom: solid 1px #333; width: 255px; display: -webkit-inline-box;"></span></div> ';

                    modalval += '<div style="clear: both;"></div><br><div style="width: 100%;"><div style="float: right; text-align: center; margin-top: 50px;"><span style="font-size: 40px; font-weight: 600; font-style: italic; color: #333;"> Head of the Institution </span></div></div>';

                    modalval += '</div></div>' ;
                    $('.book').append(modalval);
               }
                $('#bonafideModal').modal('show');
             
            }
            else
            {
               $('.tableshift tbody').append('<tr ><td colspan="2">NO DATA FOUND<td></tr>');  
            }

           
            





            
        },
        error: function() {
            alert("error");
        }
    });
}


function get_student_by_class_section(section_id){
    var class_id     = $('#class_id').val();
    var section_id   = section_id
    $.ajax({
        url: "/get_student_by_class_id",
        method: "GET",
        dataType: "json",
        data: {
            class_id        : class_id,
            section_id      : section_id
        },
        success: function(response) {
            console.log(response)
             student_list =response.student_list;
             $('#student_id').html('');
             $('#student_id').append('<option value=>Select Student</option>');
                for (var i = 0; i < student_list.length; i++) 
                {
                    $('#student_id').append('<option value='+student_list[i].registration_id+'>'+student_list[i].name+'</option>');
                }     
        },
        error: function() {
            alert("error");
        }
    });
}

// function printDiv(divName) {
//         var printContents = document.getElementById(divName).innerHTML;
//         w=window.open();
//         w.document.write(printContents);
//         w.print();
//         //w.close();
//         return true;

//     }

function printDiv(elem)
{
    console.log(document.getElementById(elem).innerHTML)
    var mywindow = window.open('', 'PRINT', 'height=600,width=800');

    mywindow.document.write('<html><head><title>BONAFIDE CERTIFICATE</title>');
    mywindow.document.write('</head><body >');
   // mywindow.document.write('<img src="http://panchavatividyalaya.com/images/panchavati-logo.png" alt="gffffff">');
    mywindow.document.write(document.getElementById(elem).innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
}
/* ##############  */

/* Enabled Other Option in */

$("#exam_name").on('change',function(){

   if($(this).children(":selected").attr("id")=='others');
   {
      $(".othername").show();
   }


});


/* 
** Formative1 Marksheet 
*/



function Formative1(student_id,class_id,section_id)
{
    //$('#myModal').modal('show');
    var modalval='';
    //var class_id     = $('#class_id').val();
    //var section_id     = $('#section_id_stop').val();

    var class_id    = $('#class_id').val();
    var section_id    = $('#section_id').val();
    var exam_id    = $('#exam_id').val();
    var student_id =student_id

    $.ajax({
        url: "/getMarsksheet",
            method: "GET",
            dataType: "json",
            data: {
                class_id   : class_id,
                section_id : section_id,
                exam_id    : exam_id,
                student_id : student_id 
            },
           success: function(response) {
            var student_list =response.student_list;
            console.log(response);
            $('.marksheet').html('dasd')
            
            if(student_list.length>0)
            {
                $('#markseetmodal').modal('show');
            }
            else
            {
               $('.tableshift tbody').append('<tr ><td colspan="2">NO DATA FOUND<td></tr>');  
            }
        },
        error: function() {
            alert("error");
        }
    });
}




    function get_fees_tt(class_id){

        var class_id   = class_id
        $.ajax({
            url: "/get_fess_tt",
            method: "GET",
            dataType: "json",
            data: {
                class_id        : class_id,
                //section_id      : section_id,
                //attendence_date : attendence_date
            },
            success: function(response) {
                console.log(response)
                var type_list = response.type_list;
                var term_list = response.term_list;

                $('#fee_type_id').html('');
                $('#fee_type_id').append("<option value=''>Select Fees Type</option>");
                for (var i = 0; i < type_list.length; i++) 
                {
                    $('#fee_type_id').append('<option value='+type_list[i].fee_type_id+'>'+type_list[i].fee_type+'</option>');
                }

                $('#fees_term_id').html('');
                $('#fees_term_id').append("<option value=''>Select Fees Term</option>");
                for (var i = 0; i < term_list.length; i++) 
                {
                    $('#fees_term_id').append('<option value='+term_list[i].term_id+'>'+term_list[i].term_name+'</option>');
                }
                
               
            },
            error: function() {
                alert("error");
            }
        });
    }

    function ajax_get_student_fees(){        
        var class_id    = $('#class_id').val();
        var student_id  = $('#student_id').val();
        if(student_id==''){
            alert('please select student first');
            return false;   
        }
        $.ajax({
                url: "/ajax_get_student_fees",
                method: "GET",
                dataType: "json",
                data: {
                    class_id        : class_id,
                    student_id      : student_id
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
                    for (var i = 0; i < fees_detail.length; i++) {
                        var count = i+1;
                        var amount_paid       = parseFloat(fees_detail[i]['amount_paid']) + parseFloat(fees_detail[i]['discount']);
                        var remaining_amount  = parseFloat(fees_detail[i]['fees_amount'])  - amount_paid;
                         if(remaining_amount==0){
                            $('#fees_detail_table tbody').append('<tr><td><input type="checkbox" name="fees_id" value='+fees_detail[i].fees_id+' disabled></td><td>'+count+'</td><td>'+fees_detail[i].fee_type+'</td><td>'+fees_detail[i].term_name+'</td><td>'+fees_detail[i].fees_amount+'</td><td>'+ fees_detail[i].amount_paid +'</td><td>'+fees_detail[i].discount+' </td><td>'+ '0.00'  +'</td><td>Paid</td></tr>');
                        }else{
                            $('#fees_detail_table tbody').append('<tr><td><input type="checkbox" name="fees_id" value='+fees_detail[i].fees_id+'></td><td>'+count+'</td><td>'+fees_detail[i].fee_type+'</td><td>'+fees_detail[i].term_name+'</td><td>'+fees_detail[i].fees_amount+'</td><td>'+ fees_detail[i].amount_paid +'</td><td>'+fees_detail[i].discount+' </td><td>'+ remaining_amount  +'</td><td>UnPaid</td></tr>');
                        }
         
                    }
                    $('#fees_detail').show();
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
                               $('#transport_fees_table tbody').append('<tr><td><input type="checkbox" name="transport_id" value='+transport_fees[i].transport_id+' disabled></td><td>'+count+'</td><td>'+transport_fees[i].route_name+'</td><td>'+transport_fees[i].route_fare+'</td><td>'+transport_fees[i].paid_amount+'</td><td>'+transport_fees[i].paid_discount+'</td><td>'+'0.00'+'</td><td>Paid</td></tr>');
                            }else{
                                   $('#transport_fees_table tbody').append('<tr><td><input type="checkbox" name="transport_id" value='+transport_fees[i].transport_id+'></td><td>'+count+'</td><td>'+transport_fees[i].route_name+'</td><td>'+transport_fees[i].route_fare+'</td><td>'+transport_fees[i].paid_amount+'</td><td>'+transport_fees[i].paid_discount+'</td><td>'+remaining_amount+'</td><td>UnPaid</td></tr>');
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
                               $('#fees_receipt_table tbody').append('<tr><td>'+count+'</td><td>'+fees_receipt[i].collected_by+'</td><td>'+fees_receipt[i].receipt_number+'</td><td>'+amount+'</td><td><button onclick="get_receipt_detail('+receipt_number+')"><i class="fa fa-eye" aria-hidden="true"></i></button></td></tr>');
             
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
                                    $('#transport_receipt_table tbody').append('<tr><td>'+count+'</td><td>'+transport_receipt[i].collected_by+'</td><td>'+transport_receipt[i].receipt_number+'</td><td>'+amount+'</td><td><button onclick="get_transport_receipt_detail('+receipt_number+')"><i class="fa fa-eye" aria-hidden="true"></i></button></td></tr>');
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

    function paid_fees(){
           var favorite = [];
            $.each($("input[name='fees_id']:checked"), function(){            
                favorite.push($(this).val());
            });
            var data =[];
           
            var user_id = $('#student_id').val();
            $.ajax({
               url: '/get_payment_data',
               type: 'GET',
               data : {
                      fees:favorite,
                      user_id: user_id
                      },

               success: function(response)
               {
                var data = response.fees_detail;
                console.log(response);
                //console.log(data.length);   
              
               // if(data!=''){
                 $('#payment_data').html('');
                 $('#payment_data').append('<tr><th scope="col">#</th><th scope="col">Fee Type</th><th scope="col">Fee Term</th><th scope="col">Total Fee</th><th scope="col">Amount paid</th><th scope="col">Amount Remaining</th><th scope="col" colspan="2">Payment Type</th><th scope="col">Discount</th><th scope="col">Pay</th></tr>');
                  
                    for (var i = 0; i <= data.length-1; i++) {
                      var count             = i + parseFloat('1');
                      var amount_paid       = parseFloat(data[i]['amount_paid']) + parseFloat(data[i]['discount']);
                      var remaining_amount  = parseFloat(data[i]['fees_amount'])  - amount_paid;
                      
                      $('#payment_data').append('<tr><td>'+ count +'</td><td>'+ data[i]['fee_type'] +'<input type="hidden" name="fee_type[]" id="fee_type" value="'+ data[i]['fee_type'] +'"></td><td><input type="hidden" name="term_name[]" id="term_name" value='+ data[i]['term_name'] +'>'+ data[i]['term_name'] +'</td><td>'+ data[i]['fees_amount'] +'</td><td>'+amount_paid+'</td><td>'+remaining_amount+'</td><td><select name="payment_type[]" id="payment_type_'+ data[i]['fees_id'] +'" onChange="payment_type('+data[i]['fees_id']+')"><option value="cash">Cash</option><option value="dd">DD</option><option value="cheque">Cheque</option></select></td><td><input type="text" name="payment_number[]" id="payment_number_'+ data[i]['fees_id'] +'" style="display:none;" placeholder="Enter payment Number"></td><td><input type="text" name="discount[]" min="0" id="discounts_'+ data[i]['fees_id'] +'" onblur="discount_validation(this.value,'+data[i]['fees_id']+')"></td><td><input type="text" name="amount[]" id="amounts_'+ data[i]['fees_id'] +'" min="0" onblur="amount_validation(this.value,'+data[i]['fees_id']+')"><input type="hidden" name="fee_id[]" id="fee_id" value='+ data[i]['fees_id'] +'></td><input type="hidden"  id="remaining_amount_'+ data[i]['fees_id'] +'" value='+ remaining_amount + '></td></tr></span>');
                      
                      count++;
                    }
                   $('#myModal11').modal('show');
                //}
               }
           });
    }


    function  payment_type(id) {
       
         var payment_type =  $('#payment_type_'+id+' option:selected').val();
         if(payment_type=='dd' || payment_type=='cheque' ){
          
        
          $('#payment_number_'+id+'').show();
        
         }else{
       
          $('#payment_number_'+id+'').hide();
         }
        
        }


        function discount_validation($discount,id){

        $('#discounts_'+id+'').val($('#discounts_'+id+'').val().replace(/[^0-9\.]/g,''));
            if ((event.which != 46 || $('#discounts_'+id+'').val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {

                event.preventDefault();

            }
        var remaining_amount = $('#remaining_amount_'+id+'').val();
        var amount           = $('#amounts_'+id+'').val();
        if($discount<0){
          $('#discounts').val('');
          return false;
        }
        if(amount==''){
          var amount = parseInt('0');
        }
        var discount         = parseFloat($discount) + parseFloat(amount);
        if(parseFloat(discount) > parseFloat(remaining_amount)){
          $('#error').text('you have to pay '  + remaining_amount + '  only');
          $('#discounts_'+id+'').val('');
         // alert('you have to pay'+ remaining_amount+'');
        }else{
            $('#error').text('');
        }
    }

    function amount_validation($amount,id){
        
        $('#amounts_'+id+'').val($('#amounts_'+id+'').val().replace(/[^0-9\.]/g,''));
            if ((event.which != 46 || $('#amounts_'+id+'').val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {

                event.preventDefault();

            }
        var remaining_amount = $('#remaining_amount_'+id+'').val();
        var discount         = $('#discounts_'+id+'').val();
        console.log('remaining amount',remaining_amount);
        if(discount==''){
          var discount   = parseFloat('0');
        }
        if($amount<0){
          $('#amounts').val('');
          return false;
        }
        var amount           = parseFloat($amount) + parseFloat(discount);
        //console.log(amount);
        if(parseFloat(amount) > parseFloat(remaining_amount)){
          $('#error').text('you have to pay '  + remaining_amount + '  only');
          $('#amounts_'+id+'').val('');
         
        }else{
            $('#error').text('');
        }
    }

    function pay_fees(){
         var fee_id = $("input[name='fee_id[]']")
                .map(function(){return $(this).val();}).get();

         var amount = $("input[name='amount[]']")
                .map(function(){return $(this).val();}).get();

         var discount = $("input[name='discount[]']")
                .map(function(){return $(this).val();}).get();

         var payment_number = $("input[name='payment_number[]']")
                .map(function(){return $(this).val();}).get();

         var fee_type      =  $("input[name='fee_type[]']")
                .map(function(){return $(this).val();}).get();
        
         var term_name      =  $("input[name='term_name[]']")
                .map(function(){return $(this).val();}).get();
         var user_id = $('#student_id').val();
        
         var type    = $("select[name='payment_type[]'] option:selected").map(function(){return $(this).val();}).get();
         console.log(fee_id);
         console.log(type);
         console.log(amount);
         console.log(user_id);

      
          $.ajax({
                 url: '/pay_fees' ,
                 type: 'GET',
                 data : {
                        fee_id:fee_id,
                        amount:amount,
                        discount:discount,
                        user_id: user_id,
                        type   : type,
                        payment_number:payment_number,
                        fee_type,
                        term_name
                        },

                 success: function(response)
                 {
                    if(response=='1'){
                         $('#myModal11').modal('toggle');
                        ajax_get_student_fees();
                    }
                    console.log(response);
                    // if(response!=''){
                    //   $('#myModal').modal('toggle');
                    //   get_fees_data();
                    // }
                    // else{
                    //   $('#error').text('Please enter amount');
                    // }
                 }
          });
    } 

    function pay_transport_fees(){
         if($("input[name='transport_id']:checked").length>0){
          var user_id = $('#student_id').val();
            $.ajax({
               url: '/ajax_get_transport_fees' ,
               type: 'GET',
               data : {
                      
                      user_id: user_id
                      },

               success: function(response)
               {
                console.log(response)
                var data = response.transport_fees
                $('#transport_payment_data').html('');
               
                  
                    for (var i = 0; i <= data.length-1; i++) {
                      var count             = i + parseFloat('1');
                       var amount_paid       = parseFloat(data[i]['paid_amount']) + parseFloat(data[i]['paid_discount']);
                       var remaining_amount  = parseFloat(data[i]['route_fare'])  - amount_paid;
                      
                      $('#transport_payment_data ').append('<tr><th scope="col">#</th><th scope="col">Id</th><th scope="col">Fee</th><th scope="col">Total Amount</th><th scope="col">Paid</th><th scope="col">discount</th><th scope="col">Balance</th><th scope="col" colspan="2">Payment Status</th><th scope="col">Discount</th><th scope="col">Pay</th></tr><tr><td></td><td>1</td><td>'+data[i].route_name+'</td><td>'+ data[i].route_fare +'</td><td>'+data[i].paid_amount+'</td><td>'+data[i].paid_discount+'</td><td>'+remaining_amount+'</td><td><select name="transport_type[]" id="transport_type" onChange="transport_type()"><option value="cash">Cash</option><option value="dd">DD</option><option value="cheque">Cheque</option></select></td><td><input type="text" name="transport_number" id="transport_number" style="display:none;" placeholder="Enter payment Number"></td><td><input type="text" name="transport_discount" min="0" id="trasnport_discounts" onblur="transport_discount_validation(this.value)"></td><td><input type="text" name="transport_amount" id="transport_amounts" min="0" onblur="transport_amount_validation(this.value)"><input type="hidden"  id="transport_remaining_amount" value='+remaining_amount+'></td></tr><span id="transport_error"></span>');
                      
                      count++;
                    }
                   $('#transport_model').modal('show');
               
               }
           });
         }
      } 



       function transport_amount_validation($amount){
        
        $('#transport_amounts').val($('#transport_amounts').val().replace(/[^0-9\.]/g,''));
            if ((event.which != 46 || $('#transport_amounts').val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }

            var remaining_amount = $('#transport_remaining_amount').val();
            var discount         = $('#trasnport_discounts').val();
            if(isNaN(discount)){
              discount  = parseFloat('0');
            }
            //console.log(remaining_amount);
        if(discount==''){
          var discount   = parseFloat('0');
        }
        if($amount<0){
          $('#transport_amounts').val('');
          return false;
        }
        var amount           = parseFloat($amount) + parseFloat(discount);
        //console.log(amount);
        if(parseFloat(amount) > parseFloat(remaining_amount)){
          $('#transport_error').text('you have to pay '  + remaining_amount + '  only');
          $('#transport_amounts').val('');
         
        }else{
            $('#transport_error').text('');
        }
      }

      function transport_discount_validation($discount){
        
        $('#trasnport_discounts').val($('#trasnport_discounts').val().replace(/[^0-9\.]/g,''));
            if ((event.which != 46 || $('#trasnport_discounts').val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }

             var remaining_amount = $('#transport_remaining_amount').val();
             var amount           = $('#transport_amounts').val();
        if($discount<0){
          $('#trasnport_discounts').val('');
          return false;
        }
        if(amount==''){
          var amount = parseInt('0');
        }
        var discount         = parseFloat($discount) + parseFloat(amount);
        if(parseFloat(discount) > parseFloat(remaining_amount)){
          $('#transport_error').text('you have to pay '  + remaining_amount + '  only');
          $('#trasnport_discounts').val('');
         // alert('you have to pay'+ remaining_amount+'');
        }else{
            $('#transport_error').text('');
        }
      }   



        function  transport_type() {
          
         var transport_type =  $('#transport_type option:selected').val();
         if(transport_type=='dd' || transport_type=='cheque' ){
          $('#transport_number').show();
         }else{
          $('#transport_number').hide();
         }
        
        }  

        function insert_transport_fees(){
         var amount      = $('#transport_amounts').val();
         var discount    = $('#trasnport_discounts').val();
         var student_id  = $('#student_id').val();
         var type        = $('#transport_type option:selected').val();    
         var type_number = $('#transport_number').val();

         $.ajax({
                 url: '/insert_transport_payment',
                 type: 'GET',
                 data : {
                        amount:amount,
                        discount:discount,
                        student_id: student_id,
                        type   : type,
                        payment_number:type_number
                        },

                 success: function(response)
                 {
                    if(response!=''){
                      $('#transport_model').modal('toggle');
                      ajax_get_student_fees();
                    }
                    else{
                      $('#error').text('Please enter amount');
                    }
                 }
          });

      }


      function receipt_model(receipt_number){
        alert(receipt_number);
      }



      function get_accounting_type_term(){
        var class_id   = $('#class_id').val();
        var section_id = $('#section_id').val();

        console.log(class_id);
        console.log
      }


      function ajax_get_payment_receipt_data(){
        var class_id      = $('#class_id').val();
        var fees_term_id  = $('#fees_term_id').val();
        var fee_type_id   = $('#fee_type_id').val();
        var section_id    = $('#section_id').val();
        if(class_id==''){
            alert('please select class first');
            return false;
        }
        $.ajax({
                 url: '/ajax_get_payment_receipt_data',
                 type: 'GET',
                 data : {
                        class_id     :class_id,
                        fees_term_id :fees_term_id,
                        fee_type_id  :fee_type_id,
                        section_id   :section_id
                        },

                 success: function(response)
                 {
                    console.log(response);
                    var fees_report = response.fee_payment;
                    if(fees_report!=''){
                        $('#fees_report_table tbody').html('');
                        for (var i = 0; i < fees_report.length; i++) {
                            var count = i+1;
                               
                          if(fees_report[i]['fees_amount']==null){
                        $('$fees_report_table tbody').append('<tr><td colspan="6">No data Found</td></tr>');
                        return false;
                      }

                      if(fees_report[i]['total_amount']==null){
                          fees_report[i]['total_amount'] = 0;
                      }
                      if(fees_report[i]['total_discount']==null){
                          fees_report[i]['total_discount'] = 0;
                      }
                      
                      if(fees_report[i]['transport_fees']!='No Transport Taken' && fees_report[i]['route_fare']!='No Transport Taken'){

                      var remaining_amount             = (parseFloat(fees_report[i]['fees_amount']) + parseFloat(fees_report[i]['route_fare'])) - (parseFloat(fees_report[i]['total_amount']) + parseFloat(fees_report[i]['total_discount']) + parseFloat(fees_report[i]['transport_fees']));

                    }else{
                      var remaining_amount             = parseFloat(fees_report[i]['fees_amount']) - (parseFloat(fees_report[i]['total_amount']) + parseFloat(fees_report[i]['total_discount']) );
                    }
                    

                      $('#fees_report_table tbody').append('<tr><td>'+ count +'</td><td>'+ fees_report[i]['name'] +'</td><td style="color:blue;">'+ fees_report[i]['fees_amount']+'</td><td style="color:blue;">'+ fees_report[i]['route_fare']+'</td><td>'+ fees_report[i]['total_discount'] +'</td><td style="color:green;">'+ fees_report[i]['total_amount'] +'</td><td>'+ fees_report[i]['transport_fees'] +'</td><td style="color:red;">'+ remaining_amount  +'</td></tr>');
                      $('#fees_report_table').DataTable();
                        }
                        $('#fees_report').show();
                    }else{
                         $('#fees_report').hide();
                    }
                 }
        });

      }

    function get_receipt_detail(receipt_number){
        var receipt_number  = receipt_number;
        var student_id      = $('#student_id').val();
        $.ajax({
                 url: '/get_receipt_detail',
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
                            $('#fees_receipt_modal').modal('show');
                     }

                   
                 }
          });
        console.log(receipt_number);
    }

    function get_transport_receipt_detail(receipt_number){
        var receipt_number  = receipt_number;
        var student_id      = $('#student_id').val();
        $.ajax({
                 url: '/get_transport_detail',
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

    function Formative(student_id,class_id,section_id,exam_id,exam_code,student_name,class_name,section_name)

    {
        var student_id   = student_id;
        var class_id     = class_id;
        var section_id   = section_id;
        var exam_id      = exam_id;
        var exam_code    = exam_code;
        var class_name   = class_name;
        var section_name = section_name;
         
        //console.log(exam_code);

     $.ajax({
        url: "/getMarsksheet",
            method: "GET",
            dataType: "json",
            data: {
                class_id   : class_id,
                section_id : section_id,
                exam_id    : exam_id,
                student_id : student_id ,
                exam_code  : exam_code
            },
           success: function(response) {
            var tabulation_list =response.tabulation_list;
             var gradelist          = response.gradelist;
             var working_days       = response.working_days;
             var present_days       = response.present_days;
            console.log(response);
             $('#Formative_modal tbody').html('');
                 $('#Formative_modal thead').html('');
                dynamicheader='';
                dynamictbody='';
            if(tabulation_list.length>0)
            {
                  $("#studentinfo").empty();
                  student_info= '<div class="row student-info" style="width:100%"><div class="col-xs-6 col-sm-6"><p>Name: <b>'+student_name+'</b></p></div><div class="col-xs-6 col-sm-2"><p>Class: <b>'+class_name+' </b></p></div><div class="col-xs-6 col-sm-2"><p>Section: <b>'+section_name+'</b></p></div></div>'   
                  $("#studentinfo").append(student_info);        



               
                    dynamicheader ='<tr><th>Sr.No</th><th>Subject</th>';
                   
                    var keys = 0;
                    for (var i = 0; i < tabulation_list.length; i++) 
                    {
                       total = 0.0;
                       count= i+1; 
                       

                        marksheetstr = tabulation_list[i].marksheet;
                        singlesubject =marksheetstr.split('^')
                        console.log(singlesubject);
                        for(var j=0; j<singlesubject.length; j++)
                        {
                           var serial = j+1;
                           subjectmasrk =singlesubject[j].split('=');    
                           subject_name=  subjectmasrk[0];
                           marks=  subjectmasrk[1];
                           console.log(marks);
                           //json = JSON.parse(tabulationlist[i].marks);
                           json= JSON.parse(marks);
                           keys = Object.keys(json)
                            mydata= "'"+ JSON.stringify(keys)+"'";
                            //if(i==0)
                            //{
                            //  console.log('keys',+keys);
                           subjecttotal=0.0;

                           dynamictbody+='<tr><td>'+serial+'</td>' 
                           dynamictbody+='<td>'+subject_name+'</td>';
                           var total  = 0 ;
                           for(k=0;k<keys.length;k++)
                             {

                              dynamictbody+='<td>'+json[keys[k]]+'</td>'
                              total +=json[keys[k]];
                             }
                          // dynamictbody+='<td>'+total+'</td>'    
                          //dynamictbody+='<td>'+grade+'</td>'
                          dynamictbody+='<td>'+total+'</td>'
                           var grade = '';
                           averagemarks= total/singlesubject.length;
                           for (var l = 0; l < gradelist.length; l++) 
                           {
                                var mm= gradelist[l].student_name
                                from = gradelist[l].mark_from;
                                upto =  gradelist[l].mark_upto
                                 if(averagemarks >= from    && averagemarks <= upto  )
                                    grade = gradelist[l].name ;
                          }
                          dynamictbody+='<td>'+grade+'</td></tr>'
                           // if(i==0) 
                            
                           // dynamictbody+='<td>'+subjecttotal+'</td>';
                        }

                        if(i==0){
                          for(k=0;k<keys.length;k++)
                             {
                                 
                                  dynamicheader+='<th>'+keys[k].replace(/_/g," ")+'</th>';
                                
                             }
                        }
                       // averagemarks= total/j;
                       //     for (var l = 0; l < gradelist.length; l++) 
                       //     {
                       //          var mm= gradelist[l].student_name
                       //          from = gradelist[l].mark_from;
                       //          upto =  gradelist[l].mark_upto
                       //           if(averagemarks >= from    && averagemarks <= upto  )
                       //              grade = gradelist[l].name ;
                       //    }
                           // onclick="Formative1('+tabulationlist[i].student_id+','+tabulationlist[i].class_id+','+tabulationlist[i].section_id+')
                          //var href = "/Formative/?student_id="+tabulationlist[i].student_id+"&class_id="+class_id+"&section_id="+section_id+"&exam_id="+exam_id+"";
                          
                     }
                      dynamicheader+='<th>Total 20%</th><th>Grade</th></tr>';
                     $('#Formative_modal thead').append(dynamicheader);
                      $('#Formative_modal tbody').append(dynamictbody);

                      var result = [];
                      var tr    = $('#Formative_modal tbody tr ').length 
                      var total = $('#Formative_modal tbody tr td').length;
                      var column_count  = total /tr;
                      $('#Formative_modal tbody tr').each(function(){
                        var i = 0;
                        $('td', this).each(function(index, val){
                          
                          if(index!=1 && index !=0 && index!= column_count-1){
                            if(!result[i]) result[i] = 0;
                        
                             result[i] += parseInt($(val).text());
                              i++;
                            }
                        });
                      });
                     var grand_total  = 0;
                     var dynamic_total  = '<tr><td colspan=2>Total</td>';
                     for (i = 0; i < result.length; ++i) {
    
                          dynamic_total += '<td>'+result[i]+'</td>';
                          grand_total +=result[i];
                        }

                        console.log(grand_total);
                        var grand_grade = '';
                               averagemarks= grand_total/tr;
                               for (var l = 0; l < gradelist.length; l++) 
                               {
                                    var mm= gradelist[l].student_name
                                    from = gradelist[l].mark_from;
                                    upto =  gradelist[l].mark_upto
                                     if(averagemarks >= from    && averagemarks <= upto  )
                                        grand_grade = gradelist[l].name ;
                              }
                      dynamic_total   += '<td>'+grand_grade+'</td></tr>'; 
                      $('#total_grade').text(grand_grade);
                      $('#working_days').text(working_days);
                      $('#present_days').text(present_days);

                      $('#total_working_days').text(working_days);
                      $('#total_present_days').text(present_days);
                      $('#Formative_modal tbody').append(dynamic_total);

                      var dynamic_grade  = '<tr><td colspan=2>Grade</td>';
                       for (i = 0; i < result.length; ++i) {
                               var grade = '';
                               averagemarks= result[i]/tr;
                               for (var l = 0; l < gradelist.length; l++) 
                               {
                                    var mm= gradelist[l].student_name
                                    from = gradelist[l].mark_from;
                                    upto =  gradelist[l].mark_upto
                                     if(averagemarks >= from    && averagemarks <= upto  )
                                        grade = gradelist[l].name ;
                              }

                              dynamic_grade   += '<td>'+grade+'</td>';
                         
                        }
                        

                         dynamic_grade   += '<td></td></tr>'; 
                          $('#Formative_modal tbody').append(dynamic_grade);
                     console.log(dynamic_total);
                   // dynamicheader+='<th>Total</th><th>Grade</th><th>Marks Card</th></tr>'; 
                  console.log(dynamicheader);
                  console.log(dynamictbody)

                $('#markseetmodal').modal('show');
                return true;
            }
            else
            {
               $('.tableshift tbody').append('<tr ><td colspan="2">NO DATA FOUND<td></tr>');  
            }
        },
        error: function() {
            alert("error");
        }
    });


    }

    function Summative(student_id,class_id,section_id,exam_id,exam_code,student_name,class_name,section_name)

    {
        var student_id   = student_id;
        var class_id     = class_id;
        var section_id   = section_id;
        var exam_id      = exam_id;
        var exam_code    = exam_code;
        
        //console.log(exam_code);

     $.ajax({
        url: "/getMarsksheet",
            method: "GET",
            dataType: "json",
            data: {
                class_id   : class_id,
                section_id : section_id,
                exam_id    : exam_id,
                student_id : student_id ,
                exam_code  : exam_code
            },
           success: function(response) {
            var tabulation_list =response.tabulation_list;
             var gradelist          = response.gradelist;
             var working_days       = response.working_days;
             var present_days       = response.present_days;
            console.log(response);
             $('#Summative_modal tbody').html('');
                 $('#Summative_modal thead').html('');
                dynamicheader='';
                dynamictbody='';
            if(tabulation_list.length>0)
            {

                   $("#studentinfo1").empty();
                  student_info= '<div class="row student-info" style="width:100%"><div class="col-xs-6 col-sm-6"><p>Name: <b>'+student_name+'</b></p></div><div class="col-xs-6 col-sm-2"><p>Class: <b>'+class_name+' </b></p></div><div class="col-xs-6 col-sm-2"><p>Section: <b>'+section_name+'</b></p></div></div>'
               
                    dynamicheader ='<tr><th>Sr.No</th><th>Subject</th>';
                    $("#studentinfo1").append(student_info);


               
                   
                    var keys = 0;
                    for (var i = 0; i < tabulation_list.length; i++) 
                    {
                       total = 0.0;
                       count= i+1; 
                       

                        marksheetstr = tabulation_list[i].marksheet;
                        singlesubject =marksheetstr.split('^')
                        console.log(singlesubject);
                        for(var j=0; j<singlesubject.length; j++)
                        {
                           var serial = j+1;
                           subjectmasrk =singlesubject[j].split('=');    
                           subject_name=  subjectmasrk[0];
                           marks=  subjectmasrk[1];
                           console.log(marks);
                           //json = JSON.parse(tabulationlist[i].marks);
                           json= JSON.parse(marks);
                           keys = Object.keys(json)
                            mydata= "'"+ JSON.stringify(keys)+"'";
                            //if(i==0)
                            //{
                            //  console.log('keys',+keys);
                           subjecttotal=0.0;

                           dynamictbody+='<tr><td>'+serial+'</td>' 
                           dynamictbody+='<td>'+subject_name+'</td>';
                           var total  = 0 ;
                           for(k=0;k<keys.length;k++)
                             {

                              dynamictbody+='<td>'+json[keys[k]]+'</td>'
                              total +=json[keys[k]];
                             }
                          // dynamictbody+='<td>'+total+'</td>'    
                          //dynamictbody+='<td>'+grade+'</td>'
                          dynamictbody+='<td>'+total+'</td>'
                           var grade = '';
                           averagemarks= total/singlesubject.length;
                           for (var l = 0; l < gradelist.length; l++) 
                           {
                                var mm= gradelist[l].student_name
                                from = gradelist[l].mark_from;
                                upto =  gradelist[l].mark_upto
                                 if(averagemarks >= from    && averagemarks <= upto  )
                                    grade = gradelist[l].name ;
                          }
                          dynamictbody+='<td>'+grade+'</td></tr>'
                           // if(i==0) 
                            
                           // dynamictbody+='<td>'+subjecttotal+'</td>';
                        }

                        if(i==0){
                          for(k=0;k<keys.length;k++)
                             {
                                  var columnname=keys[k].replace(/_/g," ");
                                  var columnname =columnname.replace('-',"&");
                                  var columnname =columnname.replace('percentage',"%");
                                  var columnname =columnname.replace('.'," ");
                                  var columnname =columnname.replace(','," ");
                                  var columnname =columnname.replace(':'," "); 

                                  dynamicheader+='<th>'+columnname+'</th>';
                                
                             }
                        }
                       // averagemarks= total/j;
                       //     for (var l = 0; l < gradelist.length; l++) 
                       //     {
                       //          var mm= gradelist[l].student_name
                       //          from = gradelist[l].mark_from;
                       //          upto =  gradelist[l].mark_upto
                       //           if(averagemarks >= from    && averagemarks <= upto  )
                       //              grade = gradelist[l].name ;
                       //    }
                           // onclick="Formative1('+tabulationlist[i].student_id+','+tabulationlist[i].class_id+','+tabulationlist[i].section_id+')
                          //var href = "/Formative/?student_id="+tabulationlist[i].student_id+"&class_id="+class_id+"&section_id="+section_id+"&exam_id="+exam_id+"";
                          
                     }
                      dynamicheader+='<th>Total 20%</th><th>Grade</th></tr>';
                     $('#Summative_modal thead').append(dynamicheader);
                      $('#Summative_modal tbody').append(dynamictbody);

                      var result = [];
                      var tr    = $('#Summative_modal tbody tr ').length 
                      var total = $('#Summative_modal tbody tr td').length;
                      var column_count  = total /tr;
                      $('#Summative_modal tbody tr').each(function(){

                        var i = 0;
                        $('td', this).each(function(index, val){
                          
                          if(index!=1 && index !=0 && index!= column_count-1){
                            if(!result[i]) result[i] = 0;
                        
                             result[i] += parseInt($(val).text());
                              i++;
                            }
                        });
                      });
                     var grand_total  = 0;
                     var dynamic_total  = '<tr><td colspan=2>Total</td>';
                     for (i = 0; i < result.length; ++i) {
    
                          dynamic_total += '<td>'+result[i]+'</td>';
                          grand_total +=result[i];
                        }

                        console.log(grand_total);
                        var grand_grade = '';
                               averagemarks= grand_total/tr;
                               for (var l = 0; l < gradelist.length; l++) 
                               {
                                    var mm= gradelist[l].student_name
                                    from = gradelist[l].mark_from;
                                    upto =  gradelist[l].mark_upto
                                     if(averagemarks >= from    && averagemarks <= upto  )
                                        grand_grade = gradelist[l].name ;
                              }
                      dynamic_total   += '<td>'+grand_grade+'</td></tr>'; 
                      $('#total_grade').text(grand_grade);
                      $('#working_days').text(working_days);
                      $('#present_days').text(present_days);

                      $('#total_working_days').text(working_days);
                      $('#total_present_days').text(present_days);
                      $('#Summative_modal tbody').append(dynamic_total);

                      var dynamic_grade  = '<tr><td colspan=2>Grade</td>';
                       for (i = 0; i < result.length; ++i) {
                               var grade = '';
                               averagemarks= result[i]/tr;
                               for (var l = 0; l < gradelist.length; l++) 
                               {
                                    var mm= gradelist[l].student_name
                                    from = gradelist[l].mark_from;
                                    upto =  gradelist[l].mark_upto
                                     if(averagemarks >= from    && averagemarks <= upto  )
                                        grade = gradelist[l].name ;
                              }

                              dynamic_grade   += '<td>'+grade+'</td>';
                         
                        }
                        

                         dynamic_grade   += '<td></td></tr>'; 


                         /* Co-curriculam Activty */
                         curriculam='';
                          $("#co-curricular tbody").html('');


                         for (var i = 0; i < tabulation_list.length; i++) 
                         {
                              marksheetstr = tabulation_list[i].otherexammarksheet;
                               // singlesubject =marksheetstr.split('^')
                                subjectmasrk =marksheetstr.split('=');    

                                json=  JSON.parse(subjectmasrk[1]);

                                keys=Object.keys(json)
                                //console.log(singlesubject);
 
                                   var total  = 0 ;
                                   for(k=0;k<keys.length;k++)
                                     {
                                       //subject_name= keys[k].replace('%',"percentage");
                                        var subject_name= keys[k].replace(/_/g," ");
                                        var subject_name =subject_name.replace('-',"&");
                                        var subject_name =subject_name.replace('percentage',"%");
                                        var subject_name =subject_name.replace('.'," ");
                                        var subject_name =subject_name.replace(','," ");
                                        var subject_name =subject_name.replace(':'," "); 

                                      curriculam+='<tr><td>'+subject_name+'</td>';  
                                      curriculam+='<td>'+json[keys[k]]+'</td>'
                                      //total =json[keys[k]];
                                      var grade = '';
                                      averagemarks= json[keys[k]]; 
                                      total +=json[keys[k]]
                                      for (var l = 0; l < gradelist.length; l++) 
                                      {
                                            var mm= gradelist[l].student_name
                                            from = gradelist[l].mark_from;
                                            upto =  gradelist[l].mark_upto
                                             if(averagemarks >= from    && averagemarks <= upto  )
                                                grade = gradelist[l].name ;
                                      }
                                      curriculam+='<td>'+grade+'</td><tr>'
                                   }
                                    
                                   averagemarks= total/l; 
                                   totalgrade= '';
                                   for (var l = 0; l < gradelist.length; l++) 
                                      {
                                            var mm= gradelist[l].student_name
                                            from = gradelist[l].mark_from;
                                            upto =  gradelist[l].mark_upto
                                             if(averagemarks >= from    && averagemarks <= upto  )
                                                totalgrade = gradelist[l].name ;
                                      }
                                    curriculam+='<tr><td>TOTAL GRADE</td><td>'+total+'</td><td>'+totalgrade+'</td></tr>'
                                 
                         } 
                          $("#co-curricular tbody").append(curriculam);


                          $('#Summative_modal tbody').append(dynamic_grade);
  
                  $('#summativemarkseetmodal').modal('show');
                return true;
            }
            else
            {
               $('.tableshift tbody').append('<tr ><td colspan="2">NO DATA FOUND<td></tr>');  
            }
        },
        error: function() {
            alert("error");
        }
    });


    }

    function convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}


function convertDateInWords(date_str) {
 var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  temp_date = date_str.split("/");
  return temp_date[0] + " " + months[Number(temp_date[1]) - 1]+ " "+ temp_date[2] ;
}



function PrintElem()
{
    
    try 
    {
        var printContent = document.getElementById('printSection').innerHTML;
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
   
/* Get Exam Code */

function getexamcode()
{
    exam_code = $( "#exam_name option:selected" ).attr('data-value'); 
    //$("#exam_name").atrr('data-value'); 
    $("#exam_code").val(exam_code); 
    
}
$('#exam_id').on('change',function(){
 
    $("#exam_code").val($("#exam_id option:selected" ).attr('data-value')); 

});    

/* ConvertSpecial Charatcter */
function changespecial_char(item)
{
    var value=item.replace(/ /g,"_");
    value =value.replace('&',"-");
    value =value.replace('%',"percentage");
    value =value.replace('.',"_");
    value =value.replace(',',"_");
    value =value.replace(':',"_");
   return value;
}


/* Get list of all student on specific class & section on attendance Section */
function get_studentlist_attendance()
{
     var classid = $('#class_id').find(":selected").val();
     var sectionid = $('#section_id_stop').find(":selected").val();
     var classname = $('#class_id').find(":selected").text();
     var sectionname = $('#section_id_stop').find(":selected").text();
     var month = $('#month_id').find(":selected").val();
     var year = $('#currentyear').find(":selected").val();
     if(classid=="")
     {
        alert("Please select Class");
        return false;
     }
     if(sectionid=="")
     {
        alert("Please select section");
        return false;
     }
     $.ajax({
        url: "/getAdminStudentAttendanceReport",
        method: "GET",
        dataType: "json",
        data: {
            class_id: classid,
            section_id: sectionid,
            month_id : month,
            year : year
        },
        success: function(response) {
            // students= response.student_attendance;
            $('#student_attendance_table tbody').html('');
              $('#student_attendance_table thead').empty();
              days= moment(year+"-"+month, "YYYY-MM").daysInMonth() ;
              var student_attendance  = response.student_attendance;
             if(student_attendance.length>0){ 
              var calendar = '<tr><td>Name  Day-></td>';
              var attendance='<tr>'
              for (var j= 0; j< student_attendance.length; j++)
              {
                 attendance += '<td>'+student_attendance[j].name+'</td>';
                for (var i = 1; i <= days; i++) 
                { 
                     if(j==0)
                       calendar += '<td>'+i+'</td>';
                     flag=false;
                     if(student_attendance[j].attendence!=undefined)
                     {
                       
                       date = year+'-'+month+'-'+ i;
                       date =moment(date).format('YYYY-MM-DD');
                       stu_attendance= student_attendance[j].attendence;
                       if(stu_attendance!=undefined)
                       for(var k= 0; k<stu_attendance.length; k++)   
                        { 
                          status_date= stu_attendance[k].attendence_date;
                            if(date==status_date)  
                            {
                              if(stu_attendance[k].status==1)
                                attendance+= '<td style="background:green">P</td>';
                              else
                              if(stu_attendance[k].status==2)
                                attendance+= '<td style="background:red">A</td>';

                              flag=true;
                            }
                        }
                        if(flag==false)
                         attendance+= '<td style="background:White">&nbsp;</td>';
                     }
                }
                attendance+='</tr>'

              }
  
              calendar+='</tr>';

              $('#student_attendance_table thead').append(calendar);
              $('#student_attendance_table tbody').append(attendance);
              $('#attendance').show();
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

/* 
** Get attendance view of student from list 
*/
 
function get_admin_student_attendance(class_id,section_id,registration_id)
{

    
    var class_id        = class_id;
    var section_id      = section_id;
    var registration_id = registration_id;
    var month           = $('#month_id').val();
    var year = $("#currentyear").val();
      $.ajax({
            url: "/get_admin_student_attendance",
            method: "GET",
            dataType: "json",
            data: {
                class_id   : class_id,
                section_id : section_id,
               // exam_id    : exam_id,
               // exam_code  : exam_code,
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


/* Get list of all teacher attendence of Month with year */

function get_teacherlist_attendance()
{
     var classid = $('#class_id').find(":selected").val();
     var sectionid = $('#section_id_stop').find(":selected").val();
     var classname = $('#class_id').find(":selected").text();
     var sectionname = $('#section_id_stop').find(":selected").text();
     var month = $('#month_id').find(":selected").val();
     var year = $('#year').find(":selected").val();
     if(classid=="")
     {
        alert("Please select Class");
        return false;
     }
     if(sectionid=="")
     {
        alert("Please select section");
        return false;
     }
     $.ajax({
        url: "/getAdminStudentAttendanceReport",
        method: "GET",
        dataType: "json",
        data: {
            class_id: classid,
            section_id: sectionid,
            month_id : month,
            year : year
        },
        success: function(response) {
             
            $('#student_attendance_table tbody').html('');
              $('#student_attendance_table thead').empty();
              days= moment(year+"-"+month, "YYYY-MM").daysInMonth() ;
              var teacher_attendance  = response.teacher_attendance;
             if(teacher_attendance.length>0){ 
              var calendar = '<tr><td>Name  Day-></td>';
              var attendance='<tr>'
              for (var j= 0; j< teacher_attendance.length; j++)
              {
                 attendance += '<td>'+teacher_attendance[j].name+'</td>';
                for (var i = 1; i <= days; i++) 
                { 
                     if(j==0)
                       calendar += '<td>'+i+'</td>';
                     flag=false;
                     if(teacher_attendance[j].attendence!=undefined)
                     {
                       
                       date = year+'-'+month+'-'+ i;
                       date =moment(date).format('YYYY-MM-DD');
                       stu_attendance= teacher_attendance[j].attendence;
                       if(stu_attendance!=undefined)
                       for(var k= 0; k<stu_attendance.length; k++)   
                        { 
                          status_date= stu_attendance[k].attendence_date;
                            if(date==status_date)  
                            {
                              if(stu_attendance[k].status==1)
                                attendance+= '<td style="background:green">P</td>';
                              else
                              if(stu_attendance[k].status==2)
                                attendance+= '<td style="background:red">A</td>';

                              flag=true;
                            }
                        }
                        if(flag==false)
                         attendance+= '<td style="background:White">&nbsp;</td>';
                     }
                }
                attendance+='</tr>'

              }
  
              calendar+='</tr>';

              $('#student_attendance_table thead').append(calendar);
              $('#student_attendance_table tbody').append(attendance);
              $('#attendance').show();
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


