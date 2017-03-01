$(document).ready(function () {
    //get group names for select menu in the main form
    $.ajax({
    url:'https://xvzw20.xdev.motive.com/smdp_war-0.0.1-SNAPSHOT/downloadProfile.do',
    type:'POST',
    dataType: 'json',
    postData: {
        jobName: function(){return $("#main-form-wrap #job_field").val()},
        jobDescription: function(){return $("#main-form-wrap #job-description").val()},
        groupName: function(){return $("#main-form-wrap #group option:selected").val()},
        modifyType: function(){return $("#main-form-wrap #modify option:selected").val()},
        enabledProfile: function(){return $("#main-form-wrap input[name=set_state]:checked").val()},
        eidn: function(){
             var allRows =[];
             var eidCell = $("#overview-list td[aria-describedby='overview-list_eidList']")
             eidCell.each(function() {
                var eachRow = {};
                var msisdnSelected = $(this).siblings(".msisdn-num").find(".msisdn-select option:selected");
                var ccidSplit = msisdnSelected.val().split(/\s+/);

                eachRow["eid"] = $(this).html();
                eachRow["ccid"] = ccidSplit[2];
                eachRow["msisdn"] = msisdnSelected.text() ;
                allRows.push(eachRow);
             });
             return json.stringify(allRows);
         },
    },
    success: function( data ) {
            if(data.response.statusCode == "200"){
                $("#request_li #request-message span").text(data.response.statusMessage);
            }else{

                $("#request_li #request-message span").text(data.response.statusMessage);
                $("#request_li #request-message").removeClass("success");
            }
        },
    error: function( data ) {
        $("#request_li #request-message span").text(data.response.statusMessage);
        }
    });
});
