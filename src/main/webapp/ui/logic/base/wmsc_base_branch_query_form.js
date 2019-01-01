//-------------------- 代码可变区
//-------------------- 代码可变区
var formTemplate = '#form_wmsc_base_branch';
var fields = 
				[
				{field:'org_id',name:'仓网点id',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'Y',minLen:0,maxLen:10,precise:0,readOnly:'N',defaultValue:''},
				{field:'org_name',name:'仓网点简称',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:20,precise:0,readOnly:'N',defaultValue:''},
				{field:'org_full_name',name:'仓网点名称',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:100,precise:0,readOnly:'N',defaultValue:''},
				{field:'org_level_code',name:'仓网点业务等级',ctrlType:'easyui-combobox',ddicTable:'wmsc_ddic_org_level_code',domainId:'org_level_code',display:'Y',mustFlag:'N',minLen:0,maxLen:0,precise:0,readOnly:'N',defaultValue:''},
				{field:'wh_dlry_flag',name:'仓配一体标识',ctrlType:'easyui-combobox',ddicTable:'cip_admin_codes',domainId:'wh_dlry_flag',display:'Y',mustFlag:'N',minLen:0,maxLen:0,precise:0,readOnly:'N',defaultValue:''},
				{field:'org_status',name:'仓网点状态',ctrlType:'easyui-combobox',ddicTable:'cip_admin_codes',domainId:'org_status',display:'Y',mustFlag:'N',minLen:0,maxLen:0,precise:0,readOnly:'N',defaultValue:''},
				{field:'org_reg_time',name:'加盟时间',ctrlType:'easyui-datetimebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:0,precise:0,readOnly:'N',defaultValue:''},
				{field:'resp_name',name:'机构负责人',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:32,precise:0,readOnly:'N',defaultValue:''},
				{field:'resp_tel',name:'机构联系电话',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:32,precise:0,readOnly:'N',defaultValue:''},
				{field:'resp_mobile',name:'机构负责人手机',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:19,precise:0,readOnly:'N',defaultValue:''},
				{field:'resp_mail',name:'机构负责人邮件',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:60,precise:0,readOnly:'N',defaultValue:''},
				{field:'resp_wx',name:'机构负责人微信',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:32,precise:0,readOnly:'N',defaultValue:''},
				{field:'org_country',name:'所在国家',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:12,precise:0,readOnly:'N',defaultValue:''},
				{field:'org_province',name:'所在省',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:12,precise:0,readOnly:'N',defaultValue:''},
				{field:'org_city',name:'所在市',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:12,precise:0,readOnly:'N',defaultValue:''},
				{field:'org_area',name:'所在区',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:12,precise:0,readOnly:'N',defaultValue:''},
				{field:'org_address',name:'具体地址',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:100,precise:0,readOnly:'N',defaultValue:''},
				{field:'sup_org_id',name:'上级管理仓网点',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:10,precise:0,readOnly:'N',defaultValue:''},
				{field:'longitude',name:'地理经度',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:18,precise:0,readOnly:'N',defaultValue:''},
				{field:'latitude',name:'地理纬度',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:18,precise:0,readOnly:'N',defaultValue:''},
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
