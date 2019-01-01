//-------------------- 代码可变区
//-------------------- 代码可变区
var formTemplate = '#form_wmsc_base_customer';
var fields = 
				[
				{field:'customer_id',name:'仓客户id',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'Y',minLen:0,maxLen:19,precise:0,readOnly:'N',defaultValue:''},
				{field:'owned_org_id',name:'所属仓网点id',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:10,precise:0,readOnly:'N',defaultValue:''},
				{field:'customer_name',name:'仓客户简称',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:20,precise:0,readOnly:'N',defaultValue:''},
				{field:'cust_full_name',name:'仓客户全称',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:100,precise:0,readOnly:'N',defaultValue:''},
				{field:'cust_contactor',name:'客户联系人',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:32,precise:0,readOnly:'N',defaultValue:''},
				{field:'cust_mobile',name:'客户联系手机',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:19,precise:0,readOnly:'N',defaultValue:''},
				{field:'cust_sign_time',name:'客户签约时间',ctrlType:'easyui-datetimebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:0,precise:0,readOnly:'N',defaultValue:''},
				{field:'cust_country',name:'所属国家',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:12,precise:0,readOnly:'N',defaultValue:''},
				{field:'cust_province',name:'所属省',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:12,precise:0,readOnly:'N',defaultValue:''},
				{field:'cust_city',name:'所属市',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:12,precise:0,readOnly:'N',defaultValue:''},
				{field:'cust_area',name:'所属区',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:12,precise:0,readOnly:'N',defaultValue:''},
				{field:'cust_address',name:'具体地址',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:200,precise:0,readOnly:'N',defaultValue:''},
				{field:'longitude',name:'地理经度',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:18,precise:0,readOnly:'N',defaultValue:''},
				{field:'latitude',name:'地理纬度',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:18,precise:0,readOnly:'N',defaultValue:''},
				{field:'cust_status',name:'客户业务状态',ctrlType:'easyui-combobox',ddicTable:'wmsc_ddic_cust_status',domainId:'cust_status',display:'Y',mustFlag:'N',minLen:0,maxLen:0,precise:0,readOnly:'N',defaultValue:''},
				];



//初始化控件信息

//--------------------- 代码不变区 
var callUrl;
var tableId;
var pageId;
function init(){
	var urlParam = $$.getParameters();
	var techParam = urlParam.technical; 
	pageId=techParam.srcPageId;
	tableId=techParam.srcTableId;
	callUrl = techParam.refActionUrl + '?actionId=' + techParam.refActionId; 
	
	initControlSetting(fields);
	
	//保存按钮单击事件
	$('#btn_save').bind('click', function() {
		submitData();	
	});
	//取消按钮单击事件
	$('#btn_cancel').bind('click', function(){
		$$.closeJcdfDialog();
	});
};

function transform2Backend(data){
	var column;
	var backendData = {};
	for(var i = 0 ; i<fields.length; i++){
		column = fields[i];
		if(data[column.field]){
			if(column.ctrlType=='easyui-datetimebox' || column.ctrlType=='easyui-datebox'){
				backendData[column.field] = getString2Date(data[column.field]);
			}
			else 
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
	//如果数据验证通过(即数据合法)
	$$.openProcessingDialog();
	var resultData = transform2Backend(jsonData);
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
