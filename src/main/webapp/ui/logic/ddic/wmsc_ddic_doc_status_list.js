//-------------------- 代码可变区
//---------- 数据定义区
var authActions = {}; 
var isDatagridLoaded = false;
var listTemplate = '#wmsc_ddic_doc_status_list';
var formSearchTemplate = '#wmsc_ddic_doc_status_searchForm';
var gridMenuId = '#wmsc_ddic_doc_status_list_menu';
//当前用户需要特殊处理的按钮，不在menubar上显示的 
var metaData = {
		objectId:'wmsc_ddic_doc_status_list',
		objectName:'业务单状态',
		objectKeys:['doc_status'],
		objectFields:
				[
				{field:'doc_status',name:'业务单状态',ctrlType:'easyui-combobox',hidden:false},
				{field:'doc_status_name',name:'业务单状态名称',ctrlType:'easyui-validatebox',hidden:false},
				{field:'create_time',name:'创建时间',ctrlType:'easyui-datetimebox',hidden:false},
				{field:'create_user',name:'创建人',ctrlType:'easyui-validatebox',hidden:false},
				{field:'update_time',name:'修改时间',ctrlType:'easyui-datetimebox',hidden:false},
				{field:'op_user_id',name:'修改人',ctrlType:'easyui-validatebox',hidden:false}
				],
		actionForms:{
			'wmsc_ddic_doc_status_addData':{formId:'wmsc_ddic_doc_status_add_form',formUrl:'ui/view/ddic/wmsc_ddic_doc_status_add_form.html?actionId=wmsc_ddic_doc_status_add_form'},
			'wmsc_ddic_doc_status_getData':{formId:'wmsc_ddic_doc_status_query_form',formUrl:'ui/view/ddic/wmsc_ddic_doc_status_query_form.html?actionId=wmsc_ddic_doc_status_query_form'},
			'wmsc_ddic_doc_status_updateData':{formId:'wmsc_ddic_doc_status_update_form',formUrl:'ui/view/ddic/wmsc_ddic_doc_status_update_form.html?actionId=wmsc_ddic_doc_status_update_form'}
			},
		expellActions:{
			'wmsc_ddic_doc_status_searchData':'',
			'wmsc_ddic_doc_status_exportEntities':''
			}

};
var searchMeta = [
				{field:'doc_status',name:'业务单状态',ctrlType:'easyui-combobox',ddicTable:'',domainId:'',searchFlag:'EQ',mustFlag:'N',defaultValue:''},
];
var bda_data_str_field = {
            wmsc_ddic_doc_status_addData : function (buttonId,actionUrl){
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
            wmsc_ddic_doc_status_deleteData : function (buttonId,actionUrl){
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
            wmsc_ddic_doc_status_exportData : function (buttonId,actionUrl){
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
            wmsc_ddic_doc_status_getData : function (buttonId,actionUrl){
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
            wmsc_ddic_doc_status_importData : function (buttonId,actionUrl){
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
            wmsc_ddic_doc_status_searchData : function (buttonId,actionUrl){
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
            wmsc_ddic_doc_status_updateData : function (buttonId,actionUrl){
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
					techParam.initActionUrl = appId + authActions['wmsc_ddic_doc_status_getData'];
					techParam.initActionId = 'wmsc_ddic_doc_status_getData';
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
