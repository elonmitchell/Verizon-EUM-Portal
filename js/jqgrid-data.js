$(function () {
    $("#list").jqGrid({
        url: "UploadProfile.do",
        datatype: "json",
        mtype: "GET",
        colNames: ["Profile", "Description", "Date Initiated", "Status"],
        colModel: [
            { name: "profile",sortable: true },
            { name: "description", sortable: true},
            { name: "date",sortable: true },
            { name: "status",sortable: true }
        ],
        pager: "#pager",
        rowNum: 10,
        rowList: [5, 10, 15, 20, 25, 50, 75, 100],
        height: 'auto',
        autowidth: 'true',
        multiselect: true,
        width: null,
        shrinkToFit: false,
        sortname: "dateInitiated",
        sortorder: "desc",
        //loadonce: true,
        loadComplete: function (data) {
    $(this).find(">tbody>tr.jqgrow:odd").addClass("row-even");
    $(this).find(">tbody>tr.jqgrow:even").addClass("row-odd");
	$("#details-list").trigger("reloadGrid");


}
    });
});