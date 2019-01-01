//-------------------- 代码可变区
//-------------------- 代码可变区
var formTemplate = '#form_wmsc_base_cust_partner';
var fields = 
				[
				{field:'customer_id',name:'仓客户id',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'Y',minLen:0,maxLen:19,precise:0,readOnly:'N',defaultValue:''},
				{field:'partner_code',name:'合作伙伴代码',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:40,precise:0,readOnly:'N',defaultValue:''},
				{field:'partner_name',name:'合作伙伴名称',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:100,precise:0,readOnly:'N',defaultValue:''},
				{field:'partner_s_name',name:'合作伙伴简称',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:30,precise:0,readOnly:'N',defaultValue:''},
				{field:'partner_en_name',name:'英文名称',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:100,precise:0,readOnly:'N',defaultValue:''},
				{field:'post_code',name:'邮编',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:12,precise:0,readOnly:'N',defaultValue:''},
				{field:'partner_tel',name:'电话',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:32,precise:0,readOnly:'N',defaultValue:''},
				{field:'partner_mobile',name:'手机',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:19,precise:0,readOnly:'N',defaultValue:''},
				{field:'partner_fax',name:'传真',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:32,precise:0,readOnly:'N',defaultValue:''},
				{field:'contactor',name:'联系人',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:32,precise:0,readOnly:'N',defaultValue:''},
				{field:'parnter_mail',name:'电子邮箱',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:100,precise:0,readOnly:'N',defaultValue:''},
				{field:'vendor_flag',name:'是否供应商',ctrlType:'easyui-combobox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:1,precise:0,readOnly:'N',defaultValue:''},
				{field:'customer_flag',name:'是否客户',ctrlType:'easyui-combobox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:1,precise:0,readOnly:'N',defaultValue:''},
				{field:'vend_country',name:'所属国家',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:12,precise:0,readOnly:'N',defaultValue:''},
				{field:'vend_province',name:'所属省',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:12,precise:0,readOnly:'N',defaultValue:''},
				{field:'vend_city',name:'所属市',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:12,precise:0,readOnly:'N',defaultValue:''},
				{field:'vend_area',name:'所属区',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:12,precise:0,readOnly:'N',defaultValue:''},
				{field:'vend_address',name:'具体地址',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:200,precise:0,readOnly:'N',defaultValue:''},
				{field:'longitude',name:'地理经度',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:18,precise:0,readOnly:'N',defaultValue:''},
				{field:'latitude',name:'地理纬度',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:18,precise:0,readOnly:'N',defaultValue:''},
				{field:'remark',name:'备注',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:200,precise:0,readOnly:'N',defaultValue:''},
				{field:'hint_code',name:'助记码',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:32,precise:0,readOnly:'N',defaultValue:''},
				{field:'create_type',name:'资料生成方式',ctrlType:'easyui-combobox',ddicTable:'cip_admin_codes',domainId:'create_type',display:'Y',mustFlag:'N',minLen:0,maxLen:0,precise:0,readOnly:'N',defaultValue:''},
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
