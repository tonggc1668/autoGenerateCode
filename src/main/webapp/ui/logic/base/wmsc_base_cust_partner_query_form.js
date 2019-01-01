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
