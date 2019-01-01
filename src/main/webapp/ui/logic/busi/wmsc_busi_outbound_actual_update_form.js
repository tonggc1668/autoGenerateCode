//-------------------- 代码可变区
//-------------------- 代码可变区
var formTemplate = '#form_wmsc_busi_outbound_actual';
var fields = 
				[
				{field:'doc_id',name:'业务单流水号',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'Y',minLen:0,maxLen:32,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_batch_id',name:'所属批次号',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:32,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_prod_date',name:'生产日期',ctrlType:'easyui-datebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:0,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_expired_date',name:'过期日期',ctrlType:'easyui-datebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:0,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_id',name:'货品id',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'Y',minLen:0,maxLen:19,precise:0,readOnly:'N',defaultValue:''},
				{field:'occ_order',name:'执行序号',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'Y',minLen:0,maxLen:10,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_stock_status',name:'货品状态',ctrlType:'easyui-combobox',ddicTable:'wmsc_ddic_stock_status',domainId:'stock_status',display:'Y',mustFlag:'N',minLen:0,maxLen:0,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_code',name:'货品编码',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:40,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_barcode',name:'货品条码',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:32,precise:0,readOnly:'N',defaultValue:''},
				{field:'mat_spec',name:'规格型号',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:60,precise:0,readOnly:'N',defaultValue:''},
				{field:'delivery_id',name:'物流单号',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:32,precise:0,readOnly:'N',defaultValue:''},
				{field:'carrior_id',name:'承运商id',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:19,precise:0,readOnly:'N',defaultValue:''},
				{field:'pack_type',name:'包装类别',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:10,precise:0,readOnly:'N',defaultValue:''},
				{field:'quant_unit',name:'计量单位',ctrlType:'easyui-combobox',ddicTable:'wmsc_ddic_mat_unit',domainId:'mat_unit',display:'Y',mustFlag:'N',minLen:0,maxLen:0,precise:0,readOnly:'N',defaultValue:''},
				{field:'actual_out_quant',name:'实际出库数量',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:10,precise:0,readOnly:'N',defaultValue:''},
				{field:'actual_out_time',name:'实际开始时间',ctrlType:'easyui-datetimebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:0,precise:0,readOnly:'N',defaultValue:''},
				{field:'close_time',name:'实际完结时间',ctrlType:'easyui-datetimebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:0,precise:0,readOnly:'N',defaultValue:''},
				{field:'actual_cube',name:'实际体积',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:15,precise:0,readOnly:'N',defaultValue:''},
				{field:'gross_wgt',name:'实际毛重量',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:15,precise:0,readOnly:'N',defaultValue:''},
				{field:'net_wgt',name:'实际净重',ctrlType:'easyui-numberbox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:15,precise:0,readOnly:'N',defaultValue:''},
				{field:'remark',name:'备注',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',display:'Y',mustFlag:'N',minLen:0,maxLen:200,precise:0,readOnly:'N',defaultValue:''},
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
