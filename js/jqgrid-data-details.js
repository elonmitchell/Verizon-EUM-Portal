$(function (showThisDetail) {
    $("#details-list").jqGrid({
        url: "getJobDetails.do",
        datatype: "json",
        mtype: "POST",
        postData: {
        jobId: function(){return $("#list .ui-state-highlight").attr("id")}
        },
        colNames: ["EID", "ICCID", "MSISDN", "status", "description", "date initiated"],
        colModel: [
            { name: "d_eid",sortable: true },
			{ name: "d_iccid",sortable: true },
            { name: "d_msisdn", sortable: true},
            { name: "d_status",sortable: true },
            { name: "d_description",sortable: false },
            { name: "d_date_initiated",sortable: true}
        ],
        pager: "#d-pager",
        rowNum: 10,
    rownumbers: true,
        rowList: [5, 10, 15, 20, 25, 50, 75, 100],
    height: 'auto',
        autowidth: 'true',
        width: null,
        shrinkToFit: false,
        //loadonce: true,
        loadComplete: function () {
    $(this).find(">tbody>tr.jqgrow:odd").addClass("row-even");
    $(this).find(">tbody>tr.jqgrow:even").addClass("row-odd");
            if($("#history-detailscontent").is(":hidden")){
         $("#history .max-min").trigger("click");
        }
         $("#history").animate({
            scrollTop: $("#history h2").offset().top
         }, 300);
}
    }); 
}); 

