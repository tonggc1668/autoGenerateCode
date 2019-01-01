//-------------------- 代码可变区
//-------------------- 代码可变区
var formTemplate = '#form_wmsc_ddic_doc_type';
var fields = 
				[
				{field:'doc_type',name:'单据类型',ctrlType:'easyui-combobox',ddicTable:'',domainId:'',display:'Y',mustFlag:'Y',minLen:0,maxLen:6,precise:0,readOnly:'N',defaultValue:''},
				{field:'doc_type_name',name:'单据类型名称',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:32,precise:0,readOnly:'N',defaultValue:''},
				];



//--------------------- 代码不变区 
var busiParam;
var callUrl;

function init(){
	var urlParam = $$.getParameters();
	var techParam = urlParam.technical; 
	busiParam = urlParam.business;
	callUrl = techParam.refActionUrl + '?actionId=' + techParam.refActionId; 
	getData();
	
	//确定按钮单击事件
	$('#btn_save').bind('click', function() {
		$$.closeJcdfDialog();
	});
	//取消按钮单击事件
	$('#btn_cancel').bind('click', function(){
		$$.closeJcdfDialog();
	});
};

//加载数据
function getData(){
	$$.openProcessingDialog();
	$.ajax({
	   type: 'POST',
	   url: callUrl,
	   dataType:'json',
	   contentType: 'application/json',
	   data: JSON.stringify(busiParam),
	   success: function(oData){
	   	 	$$.closeProcessingDialog();
			if (oData!=null && oData.errorCode == 0) {
				//填充修改记录的历史数据
				$(formTemplate).form('load', transform2UI(oData.data));					
			} else {
	 			$$.showJcdfMessager('提示消息',oData.msg,'warning');
			}
	   }
	});
};

//转换成表单数据
function transform2UI(data){
	var column;
	var formData = {};
	for(var i = 0 ; i<fields.length; i++){
		column = fields[i];
		if(data[column.field]){
			if(column.ctrlType=='easyui-datetimebox'|| column.ctrlType=='easyui-datebox'){
				formData[column.field] = getTimestamp2String(data[column.field]);
			}
			else 
				formData[column.field] = data[column.field];
		}
	}
	return formData;
};
