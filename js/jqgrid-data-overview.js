$(function () {
    $("#overview-list").jqGrid({
        url: "getEIDListByGroupName.do",
        //url: "data-overview.json",
        datatype: "json",
        mtype: "POST",
        postData: {
            groupName: function(){return $("#main-form-wrap #group option:selected").val()},
            modType: function(){return $("#main-form-wrap #modify_li input:checked").val()}
        },
        colNames: ["ADD","EID", "Profiles on SIM", "Profile Description","QR Code","Enable","Disable"],
        colModel: [{
            name: 'addThis',
            width: 50,
            sortable: false,
            classes: 'add-this',
            editable:true,
            edittype:'checkbox',
            editoptions: { value:"True:False"},
            formatter: "checkbox",
            formatoptions: {disabled : true, } ,
        },
        {
            name: 'eidList',
            width: 150,
            classes: 'eid',
            sortable: true,
        }, {
            name: 'profiles',
            width: 180,
            sortable: false,
            classes: 'msisdn-num',
            formatter: function (cellvalue) {

                var allOptions;
                //var activePro = "<option iccid='"+ cellvalue.activeProfile[0].ICCID +"' subscription-type ='"+cellvalue.activeProfile[0].SUBSCRIPTIONTYPE +"' imsi='"+cellvalue.activeProfile[0].IMSI +"\'>" + cellvalue.activeProfile[0].MSISDN + "</option>";
                //var cellvalue = JSON.stringify(cellvalue.profiles);
                //alert(cellvalue);
                for (var i = 0, keys = Object.keys(cellvalue.profiles), l = keys.length; i < l; i++) {
                    var option = "<option value='"+ cellvalue.profiles[i].STATE +"' msisdn='"+ cellvalue.profiles[i].MSISDN +"' iccid='"+ cellvalue.profiles[i].ICCID +"' subscription-type ='"+cellvalue.profiles[i].SUBSCRIPTIONTYPE +"' class ='state-is-"+ cellvalue.profiles[i].STATE +" default-is-"+cellvalue.profiles[i].DEFAULT +"' imsi='"+cellvalue.profiles[i].IMSI +"\'>" + cellvalue.profiles[i].MSISDN + "</option>";
                    allOptions += option;

                }

                //var color = (rowObject[1]<=650 || rowObject['account']<=650) ? 'red':'black';  //when the grid first load, it used integer as the index of the array, after loadComplete, the grid will use the column name as the index.

                return '<div class="conflict-message"></div><div class="styled"><select class="select medium msisdn-select" role="select"><option value="">Select an MSISDN</option>' + allOptions + '</select></div>';


            }
        },
        {
            name: 'profile_des',
            sortable: false,
            classes: 'msisdn-des',
            width: "auto"
        },
        {
            name: 'QR_Code',
            sortable: false,
            width: 100,
            editType: 'image',
            classes: 'qr-image'
        },
        {
            name: 'Enable',
            formatter: "checkbox",
            sortable: false,
            classes: 'msisdn-enable',
            width: 100,
            editable:true,
            edittype:'checkbox',
            formatoptions: {disabled : true} ,

        },
        {
            name: 'Disable',
            formatter: "checkbox",
            sortable: false,
            classes: 'msisdn-disable',
            width: 100,
            editable:true,
            edittype:'checkbox',
            formatoptions: {disabled : true} ,

        },
         ],
        // pager: "#o-pager",
        // rowNum: 5,
        rownumbers: true,
        //    rowList: [5, 10, 15],
        height: 'auto',
        autowidth: 'true',
        width: null,
        shrinkToFit: false,
        sortorder: 'asc',
        sortname: 'eidList',
        cmTemplate: { title: false },
        //loadonce: true,
        //viewrecords: true,

        loadComplete: function () {

            var profiles = $("#overview-list").find(".msisdn-select");
             profiles.addClass("profile");
            //enable active profile add checkbox
            profiles.parent().parent().siblings(".add-this").children().removeAttr("disabled");
            //
            $("#overview-list").find(">tbody>tr.jqgrow:odd").addClass("row-even");
            $("#overview-list").find(">tbody>tr.jqgrow:even").addClass("row-odd");
            //set the MSISDN to the active profile
            $("#overview-list").find(".msisdn-select").each(function () {



                //add value to checkboxes
            $(this).parent().parent().nextAll(".msisdn-enable").children().val("enable");
            $(this).parent().parent().nextAll(".msisdn-disable").children().val("disable");

                $(this).val("active");
                if ($(this).val() !="active"){
                    $(this).val("");
                   $(this).parent().parent().siblings().children().prop('checked', false);
                }else{
                    $(this).parent().parent().nextAll(".msisdn-enable").children().prop('checked', true);
               }

               var self = $(this);
                //update messages
                 paintProfile(self);
            });
           //switch between checkboxes and radio buttons
                $(".prefix.change .msisdn-enable input, .prefix.change .msisdn-disable input").attr("type","radio");
                $(".prefix.profile .msisdn-enable input, .prefix.profile .msisdn-disable input").attr("type","checkbox");

        }
    });
});



$(function () {
    $("#search-list").jqGrid({
        url: "getLikeEID.do",
        datatype: "json",
        mtype: "POST",
        postData: {
            searchString: function(){return $("#main-form-wrap #search_field").val()}
        },
        colNames: ["EID", "MSISDN","Details"],
        colModel: [{
            name: 'eidList',
            width: 150,
            sortable: true,
        }, {
            name: 'MSISDN',
            width: 175,
            sortable: false,
            classes: 'iccid-num',
            formatter: function (cellvalue) {

                var allOptions;

                    for (var i in cellvalue.MSISDN) {
                    var option = "<option value='"+ cellvalue.MSISDN[i] +"\'>" + cellvalue.MSISDN[i] + "</option>";
                    allOptions += option;
                }

                return '<div class="styled"><select class="select medium s-msisdn-select" role="select"><option value="">Select an MSISDN</option>' + allOptions + '</select></div>';

            }
        },
        {
            name: 'details_des',
            sortable: false,
            classes: 'details-des'

        },

         ],
        // pager: "#o-pager",
        // rowNum: 5,
        rownumbers: true,
        //    rowList: [5, 10, 15],
        height: 'auto',
        autowidth: 'true',
        width: null,
        shrinkToFit: false,
        sortorder: 'asc',
        sortname: 'eidList',
        cmTemplate: { title: false },
        //loadonce: true,
        //viewrecords: true,

        loadComplete: function () {
            $(this).find(">tbody>tr.jqgrow:odd").addClass("row-even");
            $(this).find(">tbody>tr.jqgrow:even").addClass("row-odd");

            ///$("#overview-list").setColProp('profiles', { editoptions: { value: profiles} });
        }
    });
});
    //
    $(function () {
    $("#ICCID-search-list").jqGrid({
        url: "getLikeICCID.do",
        datatype: "json",
        mtype: "POST",
        postData: {
            searchString: function(){return $("#main-form-wrap #search_field").val()}
        },
        colNames: ["ICCID"],
        colModel: [{
            name: 'iccidList',
            width: 175,
            sortable: true,
            formatter:'showlink',
            formatoptions:{baseLinkUrl:'#'},
            classes: 'details-link',
        },

         ],
        // pager: "#o-pager",
        // rowNum: 5,
        rownumbers: true,
        //    rowList: [5, 10, 15],
        height: 'auto',
        autowidth: 'true',
        width: null,
        shrinkToFit: false,
        //loadonce: true,
        //viewrecords: true,

        loadComplete: function () {
            $(this).find(">tbody>tr.jqgrow:odd").addClass("row-even");
            $(this).find(">tbody>tr.jqgrow:even").addClass("row-odd");

            ///$("#overview-list").setColProp('profiles', { editoptions: { value: profiles} });
        }
    });
});
    //
    $(function () {
    $("#details-overlay").jqGrid({
        url: "getICCIDDetails.do",
        datatype: "json",
        mtype: "POST",
        postData: {
            ICCIDNum: function(){return $("#search-details .show-detail-for").attr("title")},
            msisdn: function(){return $("#search-details .show-detail-for").attr("title")}
        },
        colNames: ["",""],
        colModel: [{
            name: 'iccidList',
            width: 150,
            sortable: false,
        },
        {
            name: 'details_des',
            sortable: false,
            classes: 'details-des'

        },

         ],
        // pager: "#o-pager",
        // rowNum: 5,
        rownumbers: false,
        //    rowList: [5, 10, 15],
        height: 'auto',
        autowidth: 'true',
        width: null,
        shrinkToFit: false,
        cmTemplate: { title: false },
        //loadonce: true,
        //viewrecords: true,

        loadComplete: function () {
            $(this).find(">tbody>tr.jqgrow:odd").addClass("row-even");
            $(this).find(">tbody>tr.jqgrow:even").addClass("row-odd");

            ///$("#overview-list").setColProp('profiles', { editoptions: { value: profiles} });
        }
    });
});


