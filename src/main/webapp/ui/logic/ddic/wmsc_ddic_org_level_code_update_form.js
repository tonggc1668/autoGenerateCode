//-------------------- 代码可变区
//-------------------- 代码可变区
var formTemplate = '#form_wmsc_ddic_org_level_code';
var fields = 
				[
				{field:'org_level_code',name:'网点业务等级',ctrlType:'easyui-combobox',ddicTable:'',domainId:'',display:'Y',mustFlag:'Y',minLen:0,maxLen:6,precise:0,readOnly:'N',defaultValue:''},
				{field:'org_level_code_name',name:'网点业务等级名称',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:32,precise:0,readOnly:'N',defaultValue:''},
				];



//-------------------- 代码可变区
var busiParam;
var callUrl;
var initUrl;
var tableId;
var pageId;
function init(){
	var urlParam = $$.getParameters();
	var techParam = urlParam.technical; 
	pageId=techParam.srcPageId;
	tableId=techParam.srcTableId;
	busiParam = urlParam.business;
	
	callUrl = techParam.refActionUrl + '?actionId=' + techParam.refActionId; 
	initUrl = techParam.initActionUrl + '?actionId=' + techParam.initActionId; 
	
	initControlSetting(fields);//这里有初始化的必要
	
	getData();
	//保存按钮单击事件
	$('#btn_save').bind('click', function() {
		submitData();	
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
	   url: initUrl,
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


var srcData;
function transform2UI(data){
	srcData = data;
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

function transform2Backend(data){
	var column;
	var backendData = {};
	for(var i = 0 ; i<fields.length; i++){
		column = fields[i];
		if(data[column.field]){
			backendData[column.field] = data[column.field];
		}
	}
	return backendData;
}

//提交数据
function submitData(){
	if (!$(formTemplate).form('validate')) {
		return false;
	}
	var jsonData = $$.serializeToJson(formTemplate);
	if(!jsonData) return false;
	
	var backendData = transform2Backend(jsonData);
	var resultData = {};
	for(var columnId in srcData){//只是上传自己修改过的字段
		if(srcData[columnId]!=backendData[columnId]){
			resultData[columnId] = backendData[columnId];
		}
	}
	resultData = {'keys':busiParam, 'fields':resultData};
	
	//如果数据验证通过(即数据合法)
	$$.openProcessingDialog();
	//ajax提交数据
	$.ajax({
		type : 'POST',
		url : callUrl,
		dataType : 'json',
		data : JSON.stringify(resultData),
		contentType: 'application/json',
		success : function(data) {
			$$.closeProcessingDialog();
			if (data && data.errorCode==0) {
				$$.showJcdfMessager('提示消息', '操作成功', 'info');
				$$.closeJcdfDialog();
				$$.refreshJcdfDatagrid(pageId,tableId);
			} else {
				$$.showJcdfMessager('提示消息', data.msg+'('+data.errorCode+')', 'warning');
			}
		}
	});
};
