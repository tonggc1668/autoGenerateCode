var formTemplate = '#form_import';
var callUrl;//上传文件的url
var downloadUrl;//下载模板的url
var templateName;//下载模板的名字
var objectName;

function init(){
	var urlParam = $$.getParameters();
	var techParam = urlParam.technical; 
	templateName = techParam.templateName;
	objectName = techParam.objectName;
	
	callUrl = techParam.refActionUrl + '?actionId=' + techParam.refActionId; 
	downloadUrl = callUrl; 
	
	//保存按钮单击事件
	$('#btn_save').bind('click', function() {
		$(formTemplate).submit();
	});
	
	//实现ajax提交form表单，Excel导入数据
	$(formTemplate).form({
        url:callUrl,
        onSubmit: function(){
        	if(checkExcelUploadFile()){
				$$.openProcessingDialog();
			}else{
				return false;
			}
        },
        success:function(data){
			$$.closeProcessingDialog();
			var data=JSON.parse(data)
			if (data && data.errorCode==0) {
				$$.showJcdfMessager('提示消息', data.msg, 'info');
				$$.closeJcdfDialog();
			} else {
				$$.showJcdfMessager('提示消息', data.msg+'('+data.errorCode+')', 'warning');
			}
		}
	}); 
	//取消按钮单击事件
	$('#btn_cancel').bind('click', function(){
		$$.closeJcdfDialog();
	});
	
	//为下载模板指定url
	$('#import_template').attr('href',downloadUrl+'&templateName='+encodeURI(encodeURI(templateName)));
}

//检查导入输入框，所选文件的合法性
function checkExcelUploadFile() {
	var file = $("#importFile").val();
	if(!file) {
		$$.showJcdfMessager('提示消息',"请选择将要导入的文件！", 'warning');
	} else {
		var index = file.lastIndexOf(".");
		if(index < 0) {
			$$.showJcdfMessager('提示消息',"请选择Excel文件(*.xls或*.xlsx)!",'warning');
		} else {
			var ext = file.substring(index + 1, file.length);
			if("xls" != ext && "xlsx" != ext) {
				$$.showJcdfMessager('提示消息',"请选择Excel文件(*.xls或*.xlsx)!",'warning');
			} else {
				return true;
			}
		}
	}
	return false;
}