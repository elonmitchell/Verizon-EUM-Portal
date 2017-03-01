  resetForm();
//get modify value
$("#modify").change(function(){
  resetForm();
var modification = $(this).val();
setState(modification);

});
//
//select color
$("select").change(function(){
setSelect();
});
function setSelect(){
  $("#main-form-wrap").find("select").each(function(){
    if($(this).val()==""){
    $(this).css({"color":"#bbb"});
  }else{
    $(this).css({"color":"#222"});
  }
});
}
setSelect();
//
//reset the form
function resetForm(){
  //disable buttons
  $(".form-button").each(function(){
    if (!$(this).hasClass("disable")) {
        $(this).addClass("disable");
    }
  });
  //
  // clear description & Search
  $("#job-description").val("");
  $("#search_by").val("");
  $("#search_field").val("");
  $("#search_field").prop('disabled', true).css({"background":"#ccc"});
  // reset radio buttons
  $("input:radio[name='set_state']").prop('checked', false);
  // reset select
  setSelect();
}
//
// set state variations
function setState(modification){
  var slideThis ="#state_"+ modification;
  resetForm();
        $(".mod").hide();
        
        $("#description_li").show("slide", { direction: "left" }, 200);

        $(slideThis).show("slide", { direction: "left" }, 300);

}
//
// enable search field
$("#search_by").change(function(){

if($(this).val()!=""){
     $("#search_field").prop('disabled', false).css({"background":"#fff"});
     //hide job description, group and set state
     $("#description_li").hide();
     $(".mod").hide();
     $("#modify").val("");
     $("#group").val("");
     //change text color
     setSelect()
    }else{
      $("#search_field").prop('disabled', true).css({"background":"#ccc"});
      resetForm();
    }
});
//
//enable search link
$("#search_field").on("input",function(){
  if($(this).val()!=""){
$("#search-details-link").removeClass("disable");
}else{
  $("#search-details-link").addClass("disable");
}
});
//
// enable group go button
$("#group").change(function(){
if($(this).val()!=""){
     $("#overview-link").removeClass("disable");
    }
});
//
//disable the overview button
$("#overview-link").click(function(event){
    if($("#group").val()==""){
     event.stopImmediatePropagation();
    }
  });
//
//disable the search button
$("#search-details-link").click(function(event){
    if($("#search_field").val()==""){
     event.stopImmediatePropagation();
    }
  });
//
// if set state then show group
$("input:radio[name='set_state']").change(function(){
$("#group_li").show("slide", { direction: "left" }, 200);
});
//
//if group the show EID list & submit button
$("#overview-link").click(function(){
  if($("#group").val()!=""){
$("#list_li").show("slide", { direction: "left" }, 200);
$("#submit_li").show("slide", { direction: "left" }, 300);
}
});
//
// slide out
    $('#search-details-link').panelslider({clickClose: false, duration: 200 });
    $('#overview-link').panelslider({clickClose: false, duration: 200 });

    $('.close-panel-bt').click(function() {
      $.panelslider.close();
    });

