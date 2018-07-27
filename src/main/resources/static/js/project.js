$.prototype.serializeObject=function(){
    var obj=new Object();
    $.each(this.serializeArray(),function(index,param){
        if(!(param.name in obj)){
            obj[param.name]=param.value;
        }
    });
    return obj;
};
$.extend( $.fn.DataTable.defaults, {
    aLengthMenu: [3,5,10,20],
    "searching": false,
    "ordering": false,
    "language": {
        "lengthMenu": "每页 _MENU_ 条",
        "zeroRecords": "没有找到记录",
        "info": "第 _PAGE_/_PAGES_ 页，共 _MAX_ 条",
        "infoEmpty": "无记录",
        "emptyTable":"无记录",
        /*      "infoFiltered": "(从 _TOTAL_ 条记录过滤)",*/
        "infoFiltered": "(共 _TOTAL_ 条)",
        "paginate": {
            "previous": "上一页",
            "next": "下一页"
        }
    }
} );