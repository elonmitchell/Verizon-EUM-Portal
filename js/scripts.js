//add build number
$("#build-num").load("build-number.txt");
var getHistory="";
//load form vm
$("#main-form-wrap").load("templates/form.vm");
//
//slide draws left/right
$(".arrow").click(function () {
    $(".arrow.slide").toggleClass("active");
});
//switch max min icon
$(".max-min").click(function (){
    $(this).toggleClass("active");
});
//slide draws up/down button details
$("#history .max-min").click(function () {
    var draw = $("#history-detailscontent");
    toggleDraw(draw);
});
//slide draws up/down button details
$("#overview-bar .max-min").click(function () {
    var draw = $("#overview .prefix");
    toggleDraw(draw);
});
//slide draws up/down button details
$("#search-details .max-min").click(function () {
    var draw = $("#search-details .prefix");
    toggleDraw(draw);
});
//slide draws up/down button history
$("#page > h2 .max-min").click(function () {
    var draw = $("#history-content");
    toggleDraw(draw);
});
$("#history-content").slideDown("fast");
//fix fixed position left-area
var topOffset = parseInt($('#left-area').css('top'));
$(window).scroll(function () {
    $('#left-area').css({
        'top': -Math.abs($(this).scrollTop()) + topOffset
    });
});
//

//download details
$("#details-bar .download").click(function () {
    if(!$(this).hasClass("disable")){
      var fileId = $("#list .ui-state-highlight").attr("id");
    $("body").append("<iframe src='downloadJobDetails.do?jobId=" + fileId + "' style='display: none;' ></iframe>");
        }else{
            $(this).addClass(disable);
        }
});
//slide draws up/down
function toggleDraw(draw) {
        if (draw.hasClass("active")) {
            draw.slideUp("fast");
        } else {
            draw.slideDown("fast");
        }
        draw.toggleClass("active");
    }
//show modify subscription select
$("#finished").click(function (event) {
    if ($(this).hasClass("disable")) {
        event.stopImmediatePropagation();
    } else {
        $("#next_message").hide();
        $("#overview .prefix").slideUp(500, function(){
            //after the overview table has been hidden show the job name, job description and submit button
            $("#job_field_li").show("slide", {
                 direction: "left"
            }, 300);
            $('input[name="job_field"]').valid();
            $('input[name="job_field"]').focus();
            $("#description_li").show("slide", {
                 direction: "left"
            }, 500);
            //show submit button
            $("#submit_li").show("slide", {
                 direction: "left"
            }, 700);
        });
        $("#overview .prefix").removeClass("active");

        //reset the request message
        $("#request_li #request-message").hide().removeClass("success");
        //make sure the submit button is disabled
        $("#main-form-wrap #submit-operations").addClass("disable");
    }
});

var qr_code = {
        url: "",
        tableData: "",
        iframe: $('.generated-qrcode'),
        model: function(select,obj){
            obj.tableData = select.parent().parent().siblings('.qr-image');
            obj.eid = select.parent().parent().siblings('.eid').text();
            obj.profileID = select.find(':selected').text();
            obj.iccid = select.find(":selected").attr('iccid');
            obj.url = "generateQR.do?eid="+ this.eid +"&profileId="+ this.profileID +"&iccid="+ this.iccid;
        },
        create: function(select){
            //create model
            this.model(select,this);
            //add url for qr code
            this.iframe.find("iframe").attr("src",this.url);
        },
        isMatching: function(selection){
            //create object to store values
            var sel = {};
            this.model(selection,sel);
            return ((sel.tableDate === this.tableData) && (sel.eid === this.eid) && (sel.profileID === this.profileID))
        },
        show: function(qr_image){
            //position and show
            this.iframe.show();
        },
        remove: function(select){
            var frameDoc,
            iframe = this.iframe.find('iframe');
            //when you select options, do the following..
            //reset info
            this.url = "";
            this.tableData = ""
            //don't show QR image
            if(select) select.parent().parent().siblings('.qr-image').html(" ");
            //iframe remove src
            iframe.attr("src",this.url).contents().find("body").html('');
            //remove iframes src link then hide
            this.iframe.hide();
        }
}

//
// check to see if profiles have been changed
$("#overview-list").on("change", ".msisdn-select", function () {
    msisdnChange();

    //remove any content there
    qr_code.remove($(this));

    if (!$(this).val() == ""){
        //generate the correct url depending on your selection
        qr_code.create($(this));
        //Auto check the add checkbox when select changes
        $(this).parent().parent().prevAll().children("input").prop('checked', true).removeAttr("disabled");
        //Auto check the enable checkbox when select changes
        $(this).parent().parent().nextAll(".msisdn-enable").children().prop('checked', true).removeAttr("disabled");
        $(this).parent().parent().nextAll(".msisdn-disable").children().removeAttr("disabled");
        isFinished = true;
    }


   /* $("#overview-list").find("select.active").each(function () {

        if ($(this).val() == "") {
            $("#overview-bar #next_message span").text("You must choose a profile for each EID you wish to modify before you can proceed.").parents("#name_message").removeClass("success");
            //uncheck enable/disable is no profile is chosen
            $(this).parent().parent().nextAll().children().prop('checked', false);
             //clear descriptions
            $(this).parent().parent().nextAll().children().prop('checked', false);
            $(this).parent().nextAll().children().prop('checked', false);
            isFinished = false;
            //make sure the finish button and submit button is disabled
            $("#o-pager .custom-button").addClass("disable");
            $("#main-form-wrap #submit-operations").addClass("disable");
            findDuplicates("");
            return isFinished;
        }

    });
*/
   // if (isFinished) {
            createArray();
       // }
});
//
function msisdnChange(){

        //reset the request message
        $("#request_li #request-message").hide().removeClass("success");
        //make sure the submit button is disabled
        $("#main-form-wrap #submit-operations").addClass("disable");
        //reset the Modify Subscription  select
        //$("#modify_li").hide();
        $("#submit_li").hide();

}
//
//
//add "profiles on sim state"
$("#overview-list").on({

    mousedown: function() {
        //clear the states
        var clearMe = $(this);
        clearState(clearMe);
    //get the options that are active/default
    var isActive = $(this).children(".state-is-active");
    var isDefault = $(this).children(".default-is-true");
    var both = $(this).children(".default-is-true.state-is-active");
    //

                isActive.append(" Active");
                isDefault.append(" Default");

            if(both){
                both.text(both.text().replace(" Active Default"," Default is active"));
            }

    }
}, ".msisdn-select");

//Clear profile state
function clearState(clearMe){

    clearMe.children(".state-is-active.default-is-true").text(clearMe.children(".state-is-active.default-is-true").text().replace(" Default is active",""));
    clearMe.children(".state-is-active").text(clearMe.children(".state-is-active").text().replace(" Active",""));
    clearMe.children(".default-is-true").text(clearMe.children(".default-is-true").text().replace(" Default",""));

}
//
function createArray(){
    var msisdnArray = [];
    $("#overview-list").find(".msisdn-select").each(function () {
        //get the text of each MSISDN select element and add it to an array
        var msisdValue = $("option:selected", this).text();
        msisdnArray.push(msisdValue);
    });
    console.log(msisdnArray.join(", "))
    findDuplicates(msisdnArray);
}
// check if there are any duplicates
//

function findDuplicates(msisdnArray) {
    var duplicates ="";
    // clear dup messages
    $("#overview-list").find(".msisdn-num span").remove(".dup");
    //loop throught the array
    for(var i = 0;i < msisdnArray.length; i++) {
        //check for duplicates
        if((msisdnArray.lastIndexOf(msisdnArray[i]) != i) && (duplicates.indexOf(msisdnArray[i]) == -1)) {
            //make sure the finish button and submit button is disabled
            $("#o-pager .custom-button").addClass("disable");
            $("#main-form-wrap #submit-operations").addClass("disable");
            duplicates = msisdnArray[i];
            //search each row to see if the duplicate is in that row
            $("#overview-list").find(".jqgrid-rownum").each(function () {
                var selectedOpt = $(this).siblings().find(".msisdn-select option:selected");
                var optText = selectedOpt.attr("msisdn");
                if(optText !="" && optText == duplicates){
                    //add a dup message in the cell
                    selectedOpt.parents(".msisdn-num").children(".conflict-message").html("<span class='dup'><span class='icon'></span>Conflict</span>");
                    $("#overview-bar #next_message span").text("You must choose a profile for an EID you wish to modify before you can proceed.").parents("#next_message").removeClass("success");
                }
            });
        }else{
            goFinish();
        }
    }
}
// enable the overview Next button
function goFinish() {

    // wait a fraction of a second before
    setTimeout(function() {
    var getCheckBoxes = $("#overview-list").find(".add-this.added");
    console.log(getCheckBoxes.length );
    if(!$("#overview-list").find(".msisdn-num .dup").length && getCheckBoxes.length){
        $("#o-pager .custom-button").removeClass("disable");
        // show precced message in green
        $("#overview-bar #next_message span").text("After choosing profiles and setting profile states, click Next to proceed.").parents("#next_message").addClass("success");
    }else{
        $("#o-pager .custom-button").addClass("disable");
        $("#overview-bar #next_message span").text("You must choose a profile for an EID you wish to modify before you can proceed.").parents("#next_message").removeClass("success");
    }
     if(!getCheckBoxes.length){
         $("#o-pager .custom-button").addClass("disable");
        $("#overview-bar #next_message span").text("You must choose a profile for an EID you wish to modify before you can proceed.").parents("#next_message").removeClass("success");
    }
}, 200);
}
//
// clock
var d = new Date();
$("#date-stamp").html(d);
//
//history search hide show
$('#history-search, .close-search').click(function (event) {
    if($('#history-bar:hidden') && $('#history-content:hidden')){
        $("#history-content").slideDown("fast");
        $('#history-bar').slideToggle('fast');
    } else if($('#history-bar:visible') && $('#history-content:hidden')){
        // do nothing
    } else{
    $('#history-bar').slideToggle('fast');
}
});
// date picker
$(function() {
  $( ".datepicker" ).datepicker({
    showOn: "button",
    buttonImage: "images/calendar-icon.png",
    buttonImageOnly: true,
    buttonText: "Select date"
  });
});
//

$(document).ready(function () {


    // resize on doc ready
    resizeToWin();
    //
    //sorter custom marker
    $("#jqgh_overview-list_msisdn").removeClass("ui-jqgrid-sortable");
    $("#jqgh_overview-list_profile_des").removeClass("ui-jqgrid-sortable");
    $(".ui-jqgrid-sortable").prepend("<div class='sortable'></div>");
    $(".ui-jqgrid-sortable").click(function () {
        $(this).children(".sortable").hide();
        $(this).parents(".ui-th-column").siblings().find(".sortable").show();

    });
    //
    //resize elements to fit
    function resizeToWin() {
        qr_code.remove();
        $("#overview h2 .close-panel-bt").trigger("click");
        var h = $(window).height();
            w = $(window).width();

        $("#app-wrap").width(w - 2).height(h - 2);
        $("#bottom-area, #info-body, #left-area").height(h - 83);
        $("#page").width(w - 22);
        $(".panel .content").width(w - 289);
        $("#history").height(h - 113);
        $("#main-form-wrap").height(h - 142);
    };
    //resize on window size change
    $(window).resize(function () {
            resizeToWin();
        })
        // resize the history width
    $(".right-panel-link").click(function () {
        var w = $(window).width();
        if ($(this).hasClass("active")) {

            $("#page").width(w - 29);
        } else {

            setTimeout(function () {
                resizeToWin()

            }, 500);
        }
    });
    //
});
// add profile discription for each MSISDN
$(document.body).on("change", ".msisdn-select", function () {
    var self = $(this);
    if (!self.val() == ""){
        self.parent().parent().prevAll(".add-this").addClass("added");
    }
    paintProfile(self);
});
//

function paintProfile(self){

        if (self.val() == ""){
        $(this).removeClass("active");

         //unmark row as added
      self.parent().parent().prevAll(".add-this").removeClass("added");
      self.parent().parent().prevAll(".add-this").children().prop('checked', false).attr("disabled", true)
        //remove description
        self.parent().parent().next().empty();
        //uncheck the add checkbox when select changes
        self.parent().parent().prevAll().children().prop('checked', false);
        //uncheck the enable checkbox when select changes
        self.parent().parent().nextAll(".msisdn-enable").children().prop('checked', false).attr("disabled", true);
        //disable the next button if there are no MSISDN's selected
        goFinish() ;

    }else {
    self.addClass("active");
    //mark row as added
    var activeState = $("option:selected", self).val();
    var iccid = $("option:selected", self).attr("iccid");
    var subscriptionType = $("option:selected", self).attr("subscription-type");
    var imsi = $("option:selected", self).attr("imsi");
    // enable the finish button for download subscription
    if(self.parents(".jqgrow").children(".add-this").hasClass("added")){
        $("#o-pager .custom-button").removeClass("disable");
    }
    //add qr image
    qr_code.tableData.html('<div class="qr-url" target="_blank"></div>');
    //create Profile description table
    var msisdnDescription = "<table class='msisdnDescription'><tr>"
    +"<td>ICCID <span class='active-profile-marker'></span></td>"
    +"<td>IMSI</td>"
    +"<td>Subscription Type</td></tr>"
    +"<tr><td class='iccid-num'>"+iccid+"</td>"
    +"<td>"+imsi+"</td>"
    +"<td>"+subscriptionType+" <div class='default-profile-marker'></div><div class='active-error-profile-marker'></div></td>"
    +"</tr></table>";
        self.parent().parent().next().html(msisdnDescription);
            if(activeState == "active"){
         self.parent().parent().nextAll(".msisdn-des").find(".active-profile-marker").text("Active Profile");
         //Active profile can only be disabled
         self.parent().parent().nextAll(".msisdn-enable").children().prop('checked', false).attr("disabled", true);
         self.parent().parent().nextAll(".msisdn-disable").children().prop('checked', true).attr("disabled", true);
        }else{
            //enable checked
           self.parent().parent().nextAll(".default-profile-marker").removeClass("message");
        self.parent().parent().nextAll(".msisdn-enable").children().prop('checked', true).attr("disabled", false);
         self.parent().parent().nextAll(".msisdn-disable").children().prop('checked', false).attr("disabled", true);
        }// disallow default profiles from being stopped

        if(self.find("option:selected").hasClass("default-is-true") && $("#modify_stop").prop('checked')){
            self.parent().parent().prevAll().children().attr("disabled", true).prop('checked', false);
            self.parent().parent().nextAll(".msisdn-des").find(".default-profile-marker").text("The default profile cannot be deleted.").addClass("message message-slim");
            $(this).removeClass("active");
            self.parent().parent().prevAll(".add-this").removeClass("added");

           goFinish() ;

        }//uncheck active profile
        if($("option:selected", self).hasClass("state-is-active") && $("#modify_change").prop('checked')){
            self.parent().parent().nextAll(".msisdn-des").find(".active-error-profile-marker").text("This profile is currently active. You may disable it by checking add.").addClass("message message-slim");
            self.parent().parent().nextAll(".msisdn-enable").children().prop('checked', false).attr("disabled", true);
         self.parent().parent().nextAll(".msisdn-disable").children().prop('checked', true).attr("disabled", false);
            // in the event that the default is active
                if($("option[value='active']", self).hasClass("default-is-true")){
                    self.parent().parent().nextAll(".msisdn-des").find(".active-error-profile-marker").text("The default profile cannot be disabled.").addClass("message message-slim");
                    self.parent().parent().prevAll().children().trigger("click").attr("disabled", true).prop('checked', false);
                    self.parent().parent().nextAll(".msisdn-enable").children().prop('checked', false).attr("disabled", true);
                    self.parent().parent().nextAll(".msisdn-disable").children().prop('checked', false).attr("disabled", true);
                }

            $(this).removeClass("active");
            self.parent().parent().prevAll(".add-this").removeClass("added");
            //$(".default-profile-marker").text("This profile can not be stopped.").addClass("message");

           goFinish() ;
        }
    }

}
$(document.body).on('click','.qr-url',function(){
    //this is where the valus are for the qr code
    select = $(this).parent().siblings('.msisdn-num').find('select')
    //before we show user the code, make sure it matches the selected row
    if(!qr_code.isMatching(select)){
        // close it
        qr_code.remove();
        // create new code
        qr_code.create(select)
    }
    //show it
    qr_code.show($(this));
});
$('.generated-qrcode .close').click(function(){
    //hide iframe and such
    qr_code.remove();
});


// add profile Iccid details link
$(document.body).on("change", ".s-msisdn-select", function () {
    var msisdn = $("option:selected", this).val();
        var eid =  $(this).parent().parent().prev().text();
    if(msisdn !=""){
    //create view details link
    var viewLink = "<span class='details-link' eid='"+eid+"' title='"+msisdn+"'>View details</span>";
        $(this).parent().parent().next().html(viewLink);
        }else{
            $(this).parent().parent().next().html("");
        }
});

//
//disable/ disable overview checkboxes
$(document.body).on("click", ".add-this input", function (event) {
    // the selected msisdn
    var pState = $(this).parent().nextAll(".msisdn-num").children().children().children("option:selected");
    // check if the msisdn is both active and default
    if(pState.hasClass("state-is-active") && pState.hasClass("default-is-true")){
      event.stopImmediatePropagation();
      return false;
    }

  if ($(this).is(":checked")) {

    $(this).parent().nextAll().children().removeAttr("disabled");
    $(this).parent().nextAll().children().children().removeAttr("disabled");
    //done to check finish state
    $(this).parent().nextAll().children().children().trigger("change");
    $(this).parent().addClass("added");
console.log("ischecked");
  } else {

   //$(this).parent().nextAll().children().attr("disabled", true);
    //$(this).parent().nextAll().children().children().attr("disabled", true);
    //done to check finish state

    $(this).parent().nextAll(".msisdn-des").empty();
    $(this).parent().nextAll().children().children().prop('selectedIndex', 0).trigger("change");
    $(this).prop('checked', false);
    $(this).parent().removeClass("added");
    $(this).parent().nextAll().children().prop('checked', false).attr("disabled", true);
    console.log("notchecked");
  }
});

//
$(document.body).on("click", ".msisdn-enable input", function () {
  if ($(this).is(":checked")) {
    $(this).parent().next().children().prop('checked', false);
  }else{
     $(this).parent().next().children().prop('checked', true);
  }
    });
//
$(document.body).on("click", ".msisdn-disable input", function () {
  if ($(this).is(":checked")) {
    $(this).parent().prev().children().prop('checked', false);
  }else{
     $(this).parent().prev().children().prop('checked', true);
  }
    });
//
// add the .details-link class so the jqgrid can get the value
$(document.body).on("click", ".details-link", function () {
    // set up the url for the ajax call
    var searchBy = $("#main-form-wrap #search_li input:checked").val();
    //
    $(".details-link").removeClass("show-detail-for");
    ;
      $(".modal-link").trigger("click");
    setTimeout(function() {
      $("#details-overlay").jqGrid("setGridParam",{url : 'get'+ searchBy +'Details.do'}).trigger("reloadGrid");
}, 500);
    $(this).addClass("show-detail-for");
    //show EID or ICCID header on pop-up
var getICCID = $(this).attr("title");
var getEID = $(this).attr("eid");
var attr = $(this).attr('eid');
// For some browsers, `attr` is undefined; for others,
// `attr` is false.  Check for both.
if (typeof attr !== typeof undefined && attr !== false) {
    $("#iccid-head #iccid-ref").text(getEID);
}else{
   $("#iccid-head #iccid-ref").text(getICCID);
}
})
//




//
$(document.body).on("click", "#ICCID-search-list .details-link a", function () {
     // set up the url for the ajax call
    var searchBy = $("#main-form-wrap #search_li input:checked").val();
    $(".details-link").removeClass("show-detail-for");
    $(".modal-link").trigger("click");
    $(this).parent().addClass("show-detail-for");
      $(".modal-link").trigger("click");
    setTimeout(function() {
      $("#details-overlay").jqGrid("setGridParam",{url : 'get'+ searchBy +'Details.do'}).trigger("reloadGrid");
}, 500);
 })
//
// Jqgrid calls
$(document.body).on("click", "#list .ui-row-ltr", function () {
$("#details-list").trigger("reloadGrid");
$("#details-bar .download").removeClass("disable")
});
//

//AJAX call
    $("#history-bar .refresh").click(function () {
    if(!    validate_twoDates()){
        $("#date_message").html("From date should be earlier than to date! Please change and try again.");
        $("#date_message").addClass("date_message");
 	$("#date_message").addClass("message");
    }else{
        $("#date_message").removeClass("date_message");
	$("#date_message").removeClass("message");
        $("#date_message").html("");
          showHistory();
        $("#details-list").trigger("reloadGrid");
    }
    });
//

function validate_twoDates() {
      var $dateStart = $("#from-date").val();
      var $dateEnd = $("#to-date").val();
if($dateStart.length>0 && $dateEnd.length >0){
      return($dateEnd > $dateStart);
}else{
	return 1;
}
    }

