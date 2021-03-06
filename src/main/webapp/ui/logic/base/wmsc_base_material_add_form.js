//-------------------- 代码可变区
//-------------------- 代码可变区
var formTemplate = '#form_wmsc_base_material';
var fields = 
				[
				{field:'mat_id',name:'货品id',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'Y',minLen:0,maxLen:19,precise:0,readOnly:'N',defaultValue:''},
				{field:'customer_id',name:'仓客户id',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:19,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_code',name:'货品编码',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:40,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_sku',name:'货品sku',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:32,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_name',name:'货品简称',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:32,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_full_name',name:'货品全称',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:100,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_en_name',name:'货品英文名',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:100,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_hint_code',name:'货品助记码',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:32,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_barcode',name:'货品条码',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:32,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_gtin',name:'GTIN全球货品码',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:12,precise:0,readOnly:'N',defaultValue:''},
				{field:'consume_flag',name:'耗材标识',ctrlType:'easyui-combobox',ddicTable:'cip_admin_codes',domainId:'consume_flag',display:'Y',mustFlag:'N',minLen:0,maxLen:0,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_type',name:'货品类别',ctrlType:'easyui-combobox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:6,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_spec',name:'规格型号',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:60,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_weight',name:'单品重量',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:15,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_width',name:'货品宽',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:9,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_high',name:'货品高',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:9,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_length',name:'货品长',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:9,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_cubage',name:'单品体积',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:15,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_unit',name:'计量单位',ctrlType:'easyui-combobox',ddicTable:'wmsc_ddic_mat_unit',domainId:'mat_unit',display:'Y',mustFlag:'N',minLen:0,maxLen:0,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_prise',name:'货品单价',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:24,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_insure_fee',name:'保险费',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:24,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_life_days',name:'货品保值期',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:10,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_abc',name:'ABC分类',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:20,precise:0,readOnly:'N',defaultValue:''},
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
