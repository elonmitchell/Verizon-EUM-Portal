setSelect();
resetForm();

    //Search or modify
$("#main-form #start_operation").change(function () {
    var selectedOperation = $(this).children("option:selected").val();
    //hide all 
    $("#main-form .mod").hide();
    $('input[name="modify"]').prop('checked', false);
    resetForm();
    if(selectedOperation =="modify_operation"){
    $("#main-form #modify_li").show("slide", {
            direction: "left"
        }, 200);
    }else if(selectedOperation =="search_operation"){
            $("#main-form #search_li, #main-form #search_field_li").show("slide", {
            direction: "left"
        }, 200);
    }else{
        $("#main-form .mod").hide();
    }
});
//

// stop the submit if it's grayed out
 $("*").click(function (event) {
    if ($(this).hasClass("disable") || $(this).hasClass("disable-submit")){
        event.stopImmediatePropagation();
    }
});
 //submit search
   $('#search-details-link').click(function(){
        if($('input[name="search_field"]').valid()){
            if($("#search_by_EID").is(":checked")){
                $("#gbox_ICCID-search-list").hide();
                $("#gbox_search-list").show();
         $("#search-list").trigger("reloadGrid");
            }else{
                $("#gbox_search-list").hide();
                $("#gbox_ICCID-search-list").show();
         $("#ICCID-search-list").trigger("reloadGrid");
     }
    }
   });
   //
// trigger search submit
$('#search_field').keydown(function(e) {
    if(e.which == 13) {
        $('#search-details-link').trigger('click');
    }
});


      // disable the search button if the search name is not valid
   $("#main-form-wrap #search_field").on("keyup focus", function(){
    if($(this).valid()){
        $("#search-details-link").removeClass("disable");
    }else{
        $("#search-details-link").addClass("disable");

    }
  });
   //
   //Set search bar test
   $("#main-form #search_field_li #search-details-link").click(function(){
    var sType = $("#main-form #search_li input:checked").next().text();
        $("#search-id-bar #search-type").text(sType + " Search Results");
        $("#boxes #search-pop-type").text(sType);
   });
   // disable the submit button if the job name is not valid
   $("#main-form-wrap #job_field").on("keyup focus", function(){
    if($(this).valid()){
        $("#submit-operations").removeClass("disable");
    }else{
        $("#submit-operations").addClass("disable")
    }
  });
   //
  //
  //
  //get modify value
$("#modify_li input").click(function () {
    $("#overview .prefix, #group_li").hide();
    $("#group").val("");
    $("#overview-bar #current-group").text("");
    resetForm();
    var modification = $(this).val();
        switch(modification){
        case "change":
                $("#overview .prefix").removeClass("profile stop").addClass("change");
                $("#jqgh_overview-list_profiles").text("Profiles on SIM");
        break;
        case "profile":
                $("#overview .prefix").removeClass("change stop").addClass("profile");
                $("#jqgh_overview-list_profiles").text("Available Profiles");

        break;
        case "stop":
                $("#overview .prefix").removeClass("profile change").addClass("stop");
                $("#jqgh_overview-list_profiles").text("Profiles on SIM");
        break;
        default:
    }
            $("#group_li").show("slide", {
            direction: "left"
        }, 500);
});
//
  /*
//get modify value
$("#main-form-wrap #modify").change(function () {
    // in the event that the overview pane is closed
        if($("#main-form-wrap #group option:selected").val()!= $("#overview-bar #current-group").text()){
           $("#main-form-wrap #overview-link").trigger("click");
        }
    //make sure the finish button and submit button is disabled
    $("#main-form-wrap #submit-operations").addClass("disable");
    $("#request_li").hide();
    // reset the request message and replace the loading gif
    $("#request_li #request-message").hide().removeClass("success");
    $("#request_li #request-message span").html("<img src='images/loading.gif' height='20px'>");
    var modification = $(this).val();
    if(modification == "profile"){
        $("#submit-operations").removeClass("disable");
    }
    setState(modification);

});
//
// set state variations
function setState(modification) {
        var slideThis = "#state_" + modification;
        $(".state").hide();
        // reset radio buttons
        $("input:radio[name='set_state']").prop('checked', false);
        $(slideThis).show("slide", {
            direction: "left"
        }, 300);
        $("#submit_li").show("slide", {
            direction: "left"
        }, 500);

    }
    //
    
    //enable the submit button
$("input:radio[name='set_state']").click(function () {
    $("#submit-operations").removeClass("disable");
});
*/
    //enable the request response message
$("#submit-operations").click(function () {
    $("#request_li, #request_li #request-message").show("slide", {
            direction: "left"
        }, 50);
});
//
//select color
$("select").change(function () {
    setSelect();
});
//
function setSelect() {
    $("#main-form-wrap").find("select").each(function () {
        if ($(this).val() == "") {
            $(this).addClass("no-task").removeClass("task");
        } else {
            $(this).addClass("task").removeClass("no-task");;
        }
    });
}
//
//
// AJAX calls
// load the groups ( eid, ccid etc)
$("#overview-link").click(function () {
    //show the group overview table if it is hidden
    $("#overview .prefix").show();
    $("#overview .prefix").slideDown("fast").addClass("active");
    //only reload the grid when the group is different from the one currently displayed
    if($("#main-form-wrap #group option:selected").val()!= $("#overview-bar #current-group").text()){
       $("#overview-list").trigger("reloadGrid");
       $("#overview #next_message").show();
   }
});
//disable / enable the overview button
$("#overview-link").click(function (event) {
    var selectedGroup = $("#group").children("option").filter(":selected").text();
    if ($("#group").val() == "") {
        event.stopImmediatePropagation();
    } else {
        $("#current-group").text(selectedGroup);
    }
});
//
// enable the group button
$("#group").change(function () {
    resetForm();
    if ($(this).val() != "") {
        $("#overview-link").removeClass("disable");
    }
});
//


//
$("#submit-operations").click(function (){
    submitOperation();
   /* switch($("#main-form-wrap #modify_li input:checked").val()){
        case "change":
                changeOperation();
        break;
        case "profile":
                profileOperation();
        break;
        case "stop":
                stopOperation();
        break;
        default:
    }
    */
})
//
//

    //reset the form
function resetForm() {
        //disable buttons
        $(".form-button").each(function () {
            if (!$(this).hasClass("disable")) {
                $(this).addClass("disable");
            }
        });
            // reset the request message and replace the loading gif
    $("#request_li #request-message").hide().removeClass("success");
    $("#request_li #request-message span").html("<img src='images/loading.gif' height='20px'>");
    $("#overview #next_message span").text("You must choose a profile for each EID you wish to modify before you can proceed.").parents("#next_message").removeClass("success");

        // clear description & Search
        $("#job-description").val("");
        $("#job_field").val("");
        // hide Job fields
         $("#job_field_li, #description_li, #profile_message").hide();
         //hide submit
         $("#submit_li").hide();
        // reset select
        setSelect();
    }
    //
    // slide out
$('#overview-link').panelslider({
    clickClose: false,
    duration: 200
});
$('#search-details-link').panelslider({
    clickClose: false,
    duration: 200
});
$('h2 .close-panel-bt').click(function () {
    $.panelslider.close();
});

$(document).ready(function () {
// no spaces or special charaters allowed
jQuery.validator.addMethod("alphanumeric", function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9-_]+$/.test(value);
}); 

jQuery.validator.addMethod("hexachar", function(value, element) {
        return this.optional(element) || /^[a-fA-F0-9]+$/.test(value);
}); 

    $('#main-form').validate({
        rules: {
            job_field: {
                required: true,
                alphanumeric: true
            },
            search_field: {
                required: true,
              //  number: true,
		 hexachar: true,	
                minlength: 4
            }
        },
        messages: {
            job_field: {
                alphanumeric:"Special characters & spaces are not permitted.",
                required: "Job name is required."
            },
             search_field: {
                minlength: "A minimum of 4 characters is required.",
                number:"Only numbers are permitted.",
		hexachar: "Only Hexa format characters are permitted."
            },           
        },
        submitHandler: function (form) {
            return false;
        }
    });

    // trigger the validation
    $('#search-details-link').on('click', function () {
        $('input[name="search_field"]').valid();
    });

});



$(document).ready(function () {
    //get group names for select menu in the main form
    $.ajax({
    url:'getGroupsMNO.do',
    type:'POST',
    dataType: 'json',
    success: function( data ) {
            $.each(data.groups[0].cell, function(i, value) {
                 $('#group').append($('<option>').text(value).attr('value', value));
            });
        }
    });
});
//
