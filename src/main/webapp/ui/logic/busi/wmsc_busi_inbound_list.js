//-------------------- 代码可变区
//---------- 数据定义区
var authActions = {}; 
var isDatagridLoaded = false;
var listTemplate = '#wmsc_busi_inbound_list';
var formSearchTemplate = '#wmsc_busi_inbound_searchForm';
var gridMenuId = '#wmsc_busi_inbound_list_menu';
//当前用户需要特殊处理的按钮，不在menubar上显示的 
var metaData = {
		objectId:'wmsc_busi_inbound_list',
		objectName:'仓库入库业务表',
		objectKeys:['doc_id'],
		objectFields:
				[
				{field:'doc_id',name:'业务单流水号',ctrlType:'easyui-validatebox',hidden:false},
				{field:'owned_wh_id',name:'接单仓库id',ctrlType:'easyui-numberbox',hidden:false},
				{field:'ex_wh_code',name:'仓库外部编码',ctrlType:'easyui-validatebox',hidden:false},
				{field:'ref_doc_id',name:'客户业务单号',ctrlType:'easyui-validatebox',hidden:false},
				{field:'ship_comp_id',name:'所属物流公司',ctrlType:'easyui-validatebox',hidden:false},
				{field:'ship_id',name:'送货物流单号',ctrlType:'easyui-validatebox',hidden:false},
				{field:'vendor_partner',name:'供应商id',ctrlType:'easyui-validatebox',hidden:false},
				{field:'partner_name',name:'供应商code',ctrlType:'easyui-validatebox',hidden:false},
				{field:'doc_time',name:'业务单时间',ctrlType:'easyui-datetimebox',hidden:false},
				{field:'doc_status_name',name:'业务单状态',ctrlType:'easyui-validatebox',hidden:false},
				{field:'doc_status',name:'业务单状态',ctrlType:'easyui-combobox',hidden:true},
				{field:'cancel_flag',name:'取消标识',ctrlType:'easyui-combobox',hidden:false},
				{field:'wh_trans_type_name',name:'入库事务码',ctrlType:'easyui-validatebox',hidden:false},
				{field:'wh_trans_type',name:'入库事务码',ctrlType:'easyui-validatebox',hidden:true},
				{field:'owned_cust_id',name:'所属客户id',ctrlType:'easyui-validatebox',hidden:false},
				{field:'plan_in_time',name:'预计入库时间',ctrlType:'easyui-datetimebox',hidden:false},
				{field:'actual_in_time',name:'实际开始时间',ctrlType:'easyui-datetimebox',hidden:false},
				{field:'doc_remark',name:'业务单备注',ctrlType:'easyui-validatebox',hidden:false},
				{field:'close_code_name',name:'业务单完结编码',ctrlType:'easyui-validatebox',hidden:false},
				{field:'close_code',name:'业务单完结编码',ctrlType:'easyui-combobox',hidden:true},
				{field:'close_memo',name:'业务单完结备注',ctrlType:'easyui-validatebox',hidden:false},
				{field:'close_time',name:'业务单完结时间',ctrlType:'easyui-datetimebox',hidden:false},
				{field:'actual_cube',name:'实际体积',ctrlType:'easyui-numberbox',hidden:false},
				{field:'gross_wgt',name:'实际毛重量',ctrlType:'easyui-numberbox',hidden:false},
				{field:'user_def1',name:'备用字段1',ctrlType:'easyui-validatebox',hidden:false},
				{field:'user_def2',name:'备用字段2',ctrlType:'easyui-validatebox',hidden:false},
				{field:'user_def3',name:'备用字段3',ctrlType:'easyui-validatebox',hidden:false},
				{field:'user_def4',name:'备用字段4',ctrlType:'easyui-validatebox',hidden:false},
				{field:'user_def5',name:'备用字段5',ctrlType:'easyui-validatebox',hidden:false},
				{field:'user_def6',name:'备用字段6',ctrlType:'easyui-validatebox',hidden:false},
				{field:'net_wgt',name:'实际净重',ctrlType:'easyui-numberbox',hidden:false},
				{field:'create_type_name',name:'资料生成方式',ctrlType:'easyui-validatebox',hidden:false},
				{field:'create_type',name:'资料生成方式',ctrlType:'easyui-combobox',hidden:true},
				{field:'op_user_id',name:'操作人',ctrlType:'easyui-validatebox',hidden:false},
				{field:'update_time',name:'操作时间',ctrlType:'easyui-datetimebox',hidden:false},
				{field:'creator',name:'创建人',ctrlType:'easyui-validatebox',hidden:false},
				{field:'create_time',name:'创建时间',ctrlType:'easyui-datetimebox',hidden:false}
				],
		actionForms:{
			'wmsc_busi_inbound_addData':{formId:'wmsc_busi_inbound_add_form',formUrl:'ui/view/busi/wmsc_busi_inbound_add_form.html?actionId=wmsc_busi_inbound_add_form'},
			'wmsc_busi_inbound_getData':{formId:'wmsc_busi_inbound_query_form',formUrl:'ui/view/busi/wmsc_busi_inbound_query_form.html?actionId=wmsc_busi_inbound_query_form'},
			'wmsc_busi_inbound_updateData':{formId:'wmsc_busi_inbound_update_form',formUrl:'ui/view/busi/wmsc_busi_inbound_update_form.html?actionId=wmsc_busi_inbound_update_form'}
			},
		expellActions:{
			'wmsc_busi_inbound_searchData':'',
			'wmsc_busi_inbound_exportEntities':''
			}

};
var searchMeta = [
				{field:'doc_id',name:'业务单流水号',ctrlType:'easyui-validatebox',ddicTable:'',domainId:'',searchFlag:'EQ',mustFlag:'N',defaultValue:''},
];
var bda_data_str_field = {
            wmsc_busi_inbound_addData : function (buttonId,actionUrl){
				var form = metaData.actionForms[buttonId];							
	    			if(!form){
	    				throw '行为'+buttonId + ',尚未配置要打开的表单信息';
	    			}
				var techParam = {
						appId:appId,
						srcPageId:metaData.objectId,
						srcTableId:metaData.objectId
				};
				techParam.actionId = form.formId;
				techParam.mode = 'add';
				techParam.refActionUrl = actionUrl;
				techParam.refActionId = buttonId;
				
				var callUrl = $$.buildPageUrl(form.formUrl,techParam, null);
		   		$$.openJcdfDialog(callUrl, '新增'+metaData.objectName, 500, 600);

            },
            wmsc_busi_inbound_deleteData : function (buttonId,actionUrl){
				var selectRow = $$.getSingleSelectRow(metaData.objectId, "请选择你要删除的"+metaData.objectName);
		    	if(selectRow){
		    		var title = "确认";
		    		var msg = "确定删除所选的"+metaData.objectName+"?";
		    		
		    		$.messager.confirm(title, msg, function(r){
		    			if (r){
		    				$$.openProcessingDialog();
		    				var business = {};
							var size = metaData.objectKeys.length;
							var key;
							for(var i=0 ; i< size;i++){
								key = metaData.objectKeys[i];
								business[key] = selectRow[key];
							} 
		    				$.ajax({
		    				   type: "POST",
		    				   url: actionUrl+"?actionId="+buttonId,
		    				   dataType:"json",
		    				   data : JSON.stringify(business),
		    				   contentType: "application/json",
		    				   success: function(data){
		    				   	 	$$.closeProcessingDialog();
		    						if (data && data.errorCode == 0) {
		    							$$.showJcdfMessager('提示消息', '操作成功', 'info');
		    							$$.refreshJcdfDatagrid(metaData.objectId,metaData.objectId);
		    						} else {
		    							$$.showJcdfMessager('提示消息', data.msg, 'warning');
		    						}
		    				   }
		    				});
		    			}
		    		});
		    	}

            },
            wmsc_busi_inbound_exportData : function (buttonId,actionUrl){
            	$.messager.confirm("确认","确定导出"+metaData.objectName+"?",function(r){
            		if(r){
            			var params = $$.serializeToJson(formSearchTemplate);
        				var conditions = [];
        				var search;
        				for(var i=0; i<searchMeta.length;i++){//封装请求参数
        					var condition = {};
        					search = searchMeta[i];
        					if(search.searchFlag=='EQ'){
        						condition.fieldName=search.field;
        						condition.operator=0;
        						condition.lowValue=params[search.field];
        						if(!params[search.field])
        							continue;
        					}else if(search.searchFlag=='BW'){
        						condition.fieldName=search.field;
        						condition.operator=6;
        						condition.lowValue=params[search.field+'_f'];
        						condition.highValue=params[search.field+'_t'];
        						if(condition.highValue==''){
        							condition.operator=0;
        						}
        						if(!condition.lowValue)
        							continue;
        					}
        					conditions.push(condition);
        				}
        				
        				$(formSearchTemplate).form('submit',{    
        				    url:actionUrl+"?actionId="+buttonId,    
        				    onSubmit: function(param){
        				    	param.search_condition = JSON.stringify(conditions)
        				    },
        				    success: function(data){   
        				    	var oData = JSON.parse(data);
        				        if (oData&&oData.errorCode){   
        				        	$$.showJcdfMessager('提示消息', oData.msg, 'warning');   
        				        }    
        				    } 
        				}); 
        				
            		}
            	});

            },
            wmsc_busi_inbound_getData : function (buttonId,actionUrl){
				var selectRow = $$.getSingleSelectRow(metaData.objectId, "请选择你要查看的"+metaData.objectName);

		    		if(selectRow){
					var form = metaData.actionForms[buttonId];							
		    			if(!form){
		    				throw '行为'+buttonId + ',尚未配置要打开的表单信息';
		    			}
		    		
					//build business parameters
					var business = {};
					var size = metaData.objectKeys.length;
					var key;
					for(var i=0 ; i< size;i++){
						key = metaData.objectKeys[i];
						business[key] = selectRow[key];
					} 
					
					//build technical parameters 
					var techParam = {
						appId:appId,
						srcPageId:metaData.objectId,
						srcTableId:metaData.objectId
					};
					techParam.actionId = form.formId;
					techParam.mode = 'display';
					techParam.refActionUrl = actionUrl;
					techParam.refActionId = buttonId;
					
					var callUrl = $$.buildPageUrl(form.formUrl,techParam,business);
	   				$$.openJcdfDialog(callUrl, '查看'+metaData.objectName, 500, 600);
		    		}

            },
            wmsc_busi_inbound_importData : function (buttonId,actionUrl){
            	var form = {};							
            	form.formId = "cip_import_form";
            	form.formUrl = "ui/view/public/cip_import_form.html?actionId=cip_import_form";
            	
    			var techParam = {
						appId:appId,
						srcPageId:metaData.objectId,
						srcTableId:metaData.objectId
					};
				techParam.actionId = form.formId;
				techParam.templateName = metaData.objectId + '.xlsx';//需要优化
				techParam.objectName = metaData.objectName;
				techParam.refActionUrl = actionUrl;
				techParam.refActionId = buttonId;
    			var callUrl = $$.buildPageUrl(form.formUrl,techParam,null);
   				$$.openJcdfDialog(callUrl, '导入'+metaData.objectName, 250, 600);

            },
            wmsc_busi_inbound_searchData : function (buttonId,actionUrl){
				var params = $$.serializeToJson(formSearchTemplate);
				var conditions = [];
				var search;
				for(var i=0; i<searchMeta.length;i++){
					var condition = {};
					search = searchMeta[i];
					if(search.searchFlag=='EQ'){
						condition.fieldName=search.field;
						condition.operator=0;
						condition.lowValue=params[search.field];
						if(!params[search.field])
							continue;
					}
					else if(search.searchFlag=='BW'){
						condition.fieldName=search.field;
						condition.operator=6;
						condition.lowValue=params[search.field+'_f'];
						condition.highValue=params[search.field+'_t'];
						if(condition.highValue==''){
							condition.operator=0;
						}
						if(!condition.lowValue)
							continue;
					}
					conditions.push(condition);
				}
				
				var json = {"search_condition" : JSON.stringify(conditions) };
				
				if(isDatagridLoaded){
					$(listTemplate).datagrid('load', json );
				}else{
					$(listTemplate).datagrid({
						queryParams: json,
						url : actionUrl+"?actionId="+buttonId
					});
					isDatagridLoaded = true;
				}	

            },
            wmsc_busi_inbound_updateData : function (buttonId,actionUrl){
			var selectRow = $$.getSingleSelectRow(metaData.objectId, "请选择你要编辑的"+metaData.objectName);
		    	if(selectRow){
		    		var form = metaData.actionForms[buttonId];							
		    		if(!form){
		    			throw '行为'+buttonId + ',尚未配置要打开的表单信息';
		    		}
					//build business parameters
					var business = {};
					var size = metaData.objectKeys.length;
					var key;
					for(var i=0 ; i< size;i++){
						key = metaData.objectKeys[i];
						business[key] = selectRow[key];
					}
					
					//build technical parameters 
					var techParam = {
						appId:appId,
						srcPageId:metaData.objectId,
						srcTableId:metaData.objectId
					};
					techParam.initActionUrl = appId + authActions['wmsc_busi_inbound_getData'];
					techParam.initActionId = 'wmsc_busi_inbound_getData';
					techParam.actionId = form.formId;
					techParam.mode = 'edit';
					techParam.refActionUrl = actionUrl;
					techParam.refActionId = buttonId;
					
					var callUrl = $$.buildPageUrl(form.formUrl,techParam,business);
	   				$$.openJcdfDialog(callUrl, '编辑'+metaData.objectName, 500, 600);
		    	}

            },
};


///////////--------------------- 代码区；

function init(){
  $('#listTitle').html(metaData.objectName);
	initControlSetting(searchMeta);
	getAuthButtons(metaData.objectId,gridMenuId,authActions,metaData.expellActions);
	initDatagrid();
};

//////--------------------------- 函数区
function doAction(buttonId){
	var actionUrl = authActions[buttonId];
	if(actionUrl){
		if(bda_data_str_field[buttonId])
			bda_data_str_field[buttonId](buttonId,appId+actionUrl);
		else {
			//调用通用Action方法，如果需要调用特定表单，需要自己增强函数体
			alert('尚未定义按钮的响应方法:'+buttonId);
		}
	}
	else {
		alert('当前用户没有该操作授权:'+buttonId);
	}
};

function searchReset(){
	$(formSearchTemplate).form('reset');
};
		
//初始化datagrid
function initDatagrid() {
	$(listTemplate).datagrid({
		height:$$.getDatagridHeight(),
		width:$$.getDatagridWidth(),
		border: true,
		nowrap: true,
		striped: true,
		idField:'',
		columns:buildDataGridFields(),
		onBeforeLoad:function(){$$.clearSelect(metaData.objectId);},
		queryParams:$$.serializeToJson(formSearchTemplate),
		pagination:true,
		rownumbers:true,
		singleSelect:true,
		pageSize : $$.pageSize,
		pageList : $$.pageList,
		toolbar: gridMenuId,
		loadFilter: function(data){
			if (data!=null && data.errorCode>0){
				if(data.msg!=null && data.msg!=''){
					$$.showJcdfMessager('提示消息', data.msg, 'warning');
				}
			}
			return data; 
		}
	});
};

function buildDataGridFields(){
	if(metaData&&metaData.objectFields){
		var size = metaData.objectFields.length;
		var columns=[];
		var objectField;
		for(var i=0;i<size;i++){
			var column = {};
			objectField = metaData.objectFields[i];
			column['field'] = objectField.field;
			column['title'] = objectField.name;
			column['width'] = $$.fillsize(0.1);
			column['align'] = 'center';
			column['hidden']=objectField.hidden;
			if(objectField.ctrlType=='easyui-datetimebox'){
				column['formatter']=function(value,row,index){
	  				var ftime = new Date(value); 
	               return ftime.toLocaleString();
	  			}
			}
			columns.push(column);
		}
		return [columns];
	}
	else {
		throw '没有定义完整的数据metaData';
	}
};
