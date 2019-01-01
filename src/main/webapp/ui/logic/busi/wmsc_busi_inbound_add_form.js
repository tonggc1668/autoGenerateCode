//-------------------- 代码可变区
//-------------------- 代码可变区
var formTemplate = '#form_wmsc_busi_inbound';
var fields = 
				[
				{field:'doc_id',name:'业务单流水号',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'Y',minLen:0,maxLen:32,precise:0,readOnly:'N',defaultValue:''},
				{field:'owned_wh_id',name:'接单仓库id',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:19,precise:0,readOnly:'N',defaultValue:''},
				{field:'ex_wh_code',name:'仓库外部编码',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:40,precise:0,readOnly:'N',defaultValue:''},
				{field:'ref_doc_id',name:'客户业务单号',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:50,precise:0,readOnly:'N',defaultValue:''},
				{field:'ship_comp_id',name:'所属物流公司',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:32,precise:0,readOnly:'N',defaultValue:''},
				{field:'ship_id',name:'送货物流单号',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:32,precise:0,readOnly:'N',defaultValue:''},
				{field:'vendor_partner',name:'供应商id',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:40,precise:0,readOnly:'N',defaultValue:''},
				{field:'partner_name',name:'供应商code',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:40,precise:0,readOnly:'N',defaultValue:''},
				{field:'doc_time',name:'业务单时间',ctrlType:'easyui-datetimebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:0,precise:0,readOnly:'N',defaultValue:''},
				{field:'doc_status',name:'业务单状态',ctrlType:'easyui-combobox',ddicTable:'wmsc_ddic_doc_status',domainId:'doc_status',display:'Y',mustFlag:'N',minLen:0,maxLen:0,precise:0,readOnly:'N',defaultValue:''},
				{field:'cancel_flag',name:'取消标识',ctrlType:'easyui-combobox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:1,precise:0,readOnly:'N',defaultValue:''},
				{field:'wh_trans_type',name:'入库事务码',ctrlType:'easyui-validatebox',ddicTable:'wmsc_ddic_wh_trans',domainId:'wh_trans',display:'Y',mustFlag:'N',minLen:0,maxLen:0,precise:0,readOnly:'N',defaultValue:''},
				{field:'owned_cust_id',name:'所属客户id',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:32,precise:0,readOnly:'N',defaultValue:''},
				{field:'plan_in_time',name:'预计入库时间',ctrlType:'easyui-datetimebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:0,precise:0,readOnly:'N',defaultValue:''},
				{field:'actual_in_time',name:'实际开始时间',ctrlType:'easyui-datetimebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:0,precise:0,readOnly:'N',defaultValue:''},
				{field:'doc_remark',name:'业务单备注',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:200,precise:0,readOnly:'N',defaultValue:''},
				{field:'close_code',name:'业务单完结编码',ctrlType:'easyui-combobox',ddicTable:'wmsc_ddic_close_code',domainId:'close_code',display:'Y',mustFlag:'N',minLen:0,maxLen:0,precise:0,readOnly:'N',defaultValue:''},
				{field:'close_memo',name:'业务单完结备注',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:200,precise:0,readOnly:'N',defaultValue:''},
				{field:'close_time',name:'业务单完结时间',ctrlType:'easyui-datetimebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:0,precise:0,readOnly:'N',defaultValue:''},
				{field:'actual_cube',name:'实际体积',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:15,precise:0,readOnly:'N',defaultValue:''},
				{field:'gross_wgt',name:'实际毛重量',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:15,precise:0,readOnly:'N',defaultValue:''},
				{field:'user_def1',name:'备用字段1',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:60,precise:0,readOnly:'N',defaultValue:''},
				{field:'user_def2',name:'备用字段2',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:60,precise:0,readOnly:'N',defaultValue:''},
				{field:'user_def3',name:'备用字段3',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:60,precise:0,readOnly:'N',defaultValue:''},
				{field:'user_def4',name:'备用字段4',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:60,precise:0,readOnly:'N',defaultValue:''},
				{field:'user_def5',name:'备用字段5',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:60,precise:0,readOnly:'N',defaultValue:''},
				{field:'user_def6',name:'备用字段6',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:60,precise:0,readOnly:'N',defaultValue:''},
				{field:'net_wgt',name:'实际净重',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:15,precise:0,readOnly:'N',defaultValue:''},
				{field:'create_type',name:'资料生成方式',ctrlType:'easyui-combobox',ddicTable:'cip_admin_codes',domainId:'create_type',display:'Y',mustFlag:'N',minLen:0,maxLen:0,precise:0,readOnly:'N',defaultValue:''},
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
