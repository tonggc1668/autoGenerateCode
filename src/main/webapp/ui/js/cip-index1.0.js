
//记录窗口中间内容展示区的高度，便于后面所欲iframe的统一控制
var centerHeight = 0;
//进入首页默认初始化tab
var userData = JSON.parse(localStorage.getItem("userData"));
$(function(){
    setCurrentUser();
    getUserMenus();
	centerHeight = $("#welcomeTab").parent().height()-4;
	$('#centerTab').tabs({
		cache:false,
		onLoad:function(panel){
			var plugin = panel.panel('options').title;
		},
		onClose:function() {
			return false;
		},
		onSelect:function(title,index) {}
	});
	bindTabEvent();  
    bindTabMenuEvent(); 
    
    $('#appTitle').html(appTitle);
    $('#appHeader').html(appTitle);
    $('#softCompany').html(softCompany);
    
});
//以tab的形式打开一个模块
function openNewTab(id){
	var title = $("#"+id).text();
	var href = $("#"+id).attr("link");
	if ($('#centerTab').tabs('exists',title)){
		$('#centerTab').tabs('select', title);
	} else {
		$('#centerTab').tabs('add',{
			id:id,
			title:title,
			content:'<iframe id="'+id+'" name="'+id+'" width="100%" height="'+centerHeight+'" src="'+href+'" frameborder="0" scrolling="auto" marginheight="0" marginwidth="0"></iframe>',
			closable:true
		});
	}
}

//打开对话框
function jcdfDialog(frameName, href, title, maxHeight, maxWidth, widthRate) {
	var dialogDiv = $("#jcdfDiglogDiv");
	if(!dialogDiv || dialogDiv.length <= 0) {
		var html = '<div id="jcdfDiglogDiv" style="display: none;">'+
			'<iframe id="jcdfDiglogDivIframe" name="" width="100%" height="200" src="" frameborder="0" scrolling="auto" marginheight="0" marginwidth="0"></iframe>'+
			'</div>';
		$("body").append(html);
	}
	$("#jcdfDiglogDivIframe").attr('src', href);
	$('#jcdfDiglogDiv').css('display','');
	$('#jcdfDiglogDiv').dialog({
		title:title,
		modal:true,
		maximizable:true,
		resizable:true,
		closed: false,
		onOpen:function() {
			$$.fillDialogWidthAndHeight("jcdfDiglogDiv", widthRate, maxHeight, maxWidth);
			$("#jcdfDiglogDivIframe").height($("#jcdfDiglogDivIframe").parent().height()-4);
		},
		onResize:function() {
			$("#jcdfDiglogDivIframe").height($("#jcdfDiglogDivIframe").parent().height()-4);
		},
		onClose:function() {
			$("#jcdfDiglogDivIframe").attr('src', 'about:blank');
		}
	});
}

//绑定tab的双击事件、右键事件  
function bindTabEvent(){  
    $(".tabs-inner").live('dblclick',function(){  
        var subtitle = $(this).children("span").text();  
        if($(this).next().is('.tabs-close')){  
            $('#centerTab').tabs('close',subtitle);  
        }  
    });  
    $(".tabs-inner").live('contextmenu',function(e){  
        $('#mm').menu('show', {  
            left: e.pageX,  
            top: e.pageY  
     });  
     var subtitle =$(this).children("span").text();  
     $('#mm').data("currtab",subtitle);  
     $('#centerTab').tabs('select', subtitle);
     return false;  
    });  
 } 

//绑定tab右键菜单事件  
function bindTabMenuEvent() {  
    //关闭当前  
    $('#mm-tabclose').click(function() {  
        var currtab_title = $('#mm').data("currtab");  
        if (currtab_title!="欢迎页面") {  
            $('#centerTab').tabs('close', currtab_title);  
        }  
    });  
    //全部关闭  
    $('#mm-tabcloseall').click(function() {  
        $('.tabs-inner span').each(function(i, n) {  
            if ($(this).parent().next().is('.tabs-close')) {  
                var t = $(n).text();  
                $('#centerTab').tabs('close', t);  
            }  
        });  
    });  
    //关闭除当前之外的TAB  
    $('#mm-tabcloseother').click(function() {  
        var currtab_title = $('#mm').data("currtab");  
        $('.tabs-inner span').each(function(i, n) {  
            if ($(this).parent().next().is('.tabs-close')) {  
                var t = $(n).text();  
                if (t != currtab_title)  
                    $('#centerTab').tabs('close', t);  
            }  
        });  
    });  
    //关闭当前右侧的TAB  
    $('#mm-tabcloseright').click(function() {  
        var nextall = $('.tabs-selected').nextAll();  
        if (nextall.length == 0) {  
            return false;  
        }  
        nextall.each(function(i, n) {  
            if ($('a.tabs-close', $(n)).length > 0) {  
                var t = $('a:eq(0) span', $(n)).text();  
                $('#centerTab').tabs('close', t);  
            }  
        });  
        return false;  
    });  
    //关闭当前左侧的TAB  
    $('#mm-tabcloseleft').click(function() {  
        var prevall = $('.tabs-selected').prevAll();  
        if (prevall.length == 1) {  
            return false;  
        }  
        prevall.each(function(i, n) {  
            if ($('a.tabs-close', $(n)).length > 0) {  
                var t = $('a:eq(0) span', $(n)).text();  
                $('#centerTab').tabs('close', t);  
            }  
        });  
        return false;  
    });  
}  

//关闭窗口
function closeJcdfDialog() {
	$('#jcdfDiglogDiv').dialog('close');
}

function closeModalDialog() {
	$('#modalDiglogDiv').dialog('close');
}

//弹出消息提示框
function showJcdfMessager(frameName, title, msg, icon, fn) {
	title = !title ? "提示消息" : title;
	msg = !msg ? "?":msg;
	icon = !icon ? "info":icon;
	$.messager.alert(title, msg, icon, fn);	
}

//弹出确认消息框
function showJcdfConfirm(frameName, title, msg, fn) {
	title = !title ? "确认" : title;
	msg = !msg ? "?" : msg;
	$.messager.confirm(title, msg,fn);
}


/**
 *	系统密码修改和退出功能控制
 */	
function bindButtons(){
	//绑定修改密码按钮
	//$("#password").bind('click', openPasswordForm);
	//绑定退出系统按钮
	$("#logout").bind('click', function(){
		$.messager.confirm('提示消息', "确定退出?", function(r){
			if (r) {
				$.ajax({
					type : "POST",
					url : c_url_logout,
					dataType : "json",
					success : function(oData) {
						localStorage.removeItem("userData");
						window.location.href = c_url_login;
					}
				});
			}
		});
	});
	
	//修改密码
	$("#change_pwd").bind('click', function(){
		var tempUrl = c_url_change_pwd_form + "&user_id=" + userData.user_id + "&user_name=" + userData.user_name;
		$$.openJcdfDialog(tempUrl, '修改用户密码', 500, 600);
	});
};

//判断用户是否需要重置密码
function isPasswordChangeRequired(){
//	if(userData!=null && userData.orgData!=null && (userData.orgData.orgType=="2" || userData.orgData.orgType=="22")){
//		$.ajax({
//			type : "POST",
//			url : c_url_has_pwd,
//			dataType : "json",
//			success : function(oData) {
//				if (oData && oData.xSuccess && oData.hasPassword!=undefined && !oData.hasPassword) {
//					$('#setPassDialog').dialog('open');
//				}
//			}
//		});
//	}
};

function openPasswordForm(){
	
};

function setCurrentUser(){
	$.ajax({
		type : "POST",
		url : c_url_get_user_profile,
		cache : false,
		async: false,
		dataType : "json",
		success : function(data) {
			if (null != data && data.errorCode==0) {
				var userData = data.data;
				$("#userName").html(userData.user_name);
				$("#userId").html(userData.user_id);
				changePasswd(userData);				
				getDealThingsCount(userData.user_id);
			}  else {
				$$.showJcdfMessager('提示消息', data.msg, 'warning'); 
			}
		
        }
	});
};

function getUserMenus(){
	$.ajax({
		type : "POST",
		url : c_url_get_resources,
		cache : false,
		dataType : "json",
		success : function(data) {
			if (null != data && data.errorCode==0) {
				generateMenu(data.data);
			    $('#sysMenu').accordion('select', 0);
			}  else {
				$$.showJcdfMessager('提示消息', data.msg, 'warning'); 
			}
		}
	});
};

function generateMenu(menus){
	var lis="";
	for(var i=0;i<menus.length;i++){
		if(menus[i].type=="F"&&menus[i].level==0){
			var iconCls = "";
			$("#sysMenu").accordion("add",{
				title:menus[i].name,
				iconCls:iconCls,
				content:"<div style='padding: 1px;'><ul class='easyui-tree'>"+
				generateMenu(menus[i].menus)+
				"</ul></div>"
			});
		} else if(menus[i].type=="F"){
			lis+="<li><span>"+menus[i].name+"</span><ul>"+generateMenu(menus[i].menus)+"</ul></li>";
		}else if(menus[i].type=="A"){
			lis+="<li>"+
			"<a id="+menus[i].id+" link='../../"+menus[i].url+"' onclick=openNewTab('"+menus[i].id+"') >"+menus[i].name+"</a>"+
		    "</li>";
		}
	}
	return lis;
};


function getDealThingsCount(user_id){
	$.ajax({
		type : "POST",
		url : c_url_get_dealthings+"&user_id="+user_id,
		cache : false,
		async: false,
		dataType : "json",
		success : function(data) {
			if (null != data && data.errorCode==0) {
				var dealCount = data.data;
				$("#deal_count").html(dealCount);
			}  else {
				$$.showJcdfMessager('提示消息', data.msg, 'warning'); 
			}
		}
	});
}

/*查询当前用户添加的快速工具*/
function getToolData(){	
    var getTool = appId + "/actions/admin_user2res/getToolData.do?actionId=cip_admin_resource_getToolData";
         $.ajax({
					type : "POST",
					url :  getTool,				
					dataType : "json",
					contentType : "application/json",
					success : function(data) {
					$$.closeProcessingDialog();
				    if (data&& data.errorCode == 0) {								
					    var datas = data.data;	
					    showIcon(datas);				
				    } else {
					$$.showJcdfMessager('提示消息', data.msg,'warning');
			    }
		     }
		});
}
/*拼接显示首页应用图标 */
function showIcon(datas){
   var img ="";
   var length = datas.length;
   var x;
   for(var i=0;i<length;i++){
	 var data = datas[i];
	 var id = data.resource_id;
	 var userId=data.user_id;
	 var name = data.resource_name; 
	 var icon = data.resource_image;
	 if(icon==null || icon==""){
		 icon=1;
		 x=0;
	 }
	 if(icon>=1 && icon<8){
         x=-106*(icon-1)-(icon-1)*29;
         img += '<div class="toolParent"><div onclick="toolClick(\''+id+'\',\''+userId+'\')" class="tool-icon" style="background: url(\'../img/welicon.png\') no-repeat '+x+'px 0px;"><span class="tool_del"><img onclick="toolDel(event,\''+id+'\',\''+userId+'\')" src="../img/tool_del.png "/></span></div><div class="tool-name">'+name+'</div></div>'+' '; 	       
      }
	 if(icon>=8 && icon<15){
         x=-106*(icon-8)-(icon-8)*29;
         img += '<div class="toolParent"><div onclick="toolClick(\''+id+'\',\''+userId+'\')" class="tool-icon" style="background: url(\'../img/welicon.png\') no-repeat '+x+'px -136px;"><span class="tool_del"><img onclick="toolDel(event,\''+id+'\',\''+userId+'\')" src="../img/tool_del.png "/></span></div><div class="tool-name">'+name+'</div></div>'+' '; 	       
     }
     if(icon>=15 && icon<22){
          x=-106*(icon-15)-(icon-15)*29;
          img += '<div class="toolParent"><div onclick="toolClick(\''+id+'\',\''+userId+'\')" class="tool-icon" style="background: url(\'../img/welicon.png\') no-repeat '+x+'px -268px;"><span class="tool_del"><img onclick="toolDel(event,\''+id+'\',\''+userId+'\')" src="../img/tool_del.png "/></span></div><div class="tool-name">'+name+'</div></div>'+' '; 	       
     }
     if(icon>=22 && icon<=28){
          x=-106*(icon-22)-(icon-22)*29;
          img += '<div class="toolParent"><div onclick="toolClick(\''+id+'\',\''+userId+'\')" class="tool-icon" style="background: url(\'../img/welicon.png\') no-repeat '+x+'px -404px;"><span class="tool_del"><img onclick="toolDel(event,\''+id+'\',\''+userId+'\')" src="../img/tool_del.png "/></span></div><div class="tool-name">'+name+'</div></div>'+' '; 	       
     }
   }
   /*拼接上添加资源工具图标*/
     img += '<div class="toolParent"><div class="tool-icon" style="background: url(\'../img/welicon.png\') no-repeat -810px -404px;" onclick="addTool()"></div><div class="tool-name">操作</div></div>'+' '; 	       
    $('#tool-icon').html(img);		    	     
   };
   /* 初始化定义页面点击事件 */
var editLogo = "0";
function toolClick(id, userId) {
	if (editLogo == "0") {
		openNewTab(id);// 跳转tab
	}
	if (editLogo == "1") {
		updataTool(id, userId);// 修改页面
	}
}
   /* 对快速工具栏进行编辑 */
var changLogo= "1";//第一次点击编辑
function edit() {
	if(changLogo == "1"){
		editLogo = "1";
		$(".tool_del").show();
		$('#edit').html("完成");
		$("#editImg").attr('src','../img/finish.png'); 
		changLogo= "2";
		return false;
	}
	if(changLogo= "2"){
		editLogo = "0";
		changLogo= "1";
		$(".tool_del").hide(); 
		window.location.reload();//刷新页面
	}
	
}
   /* 添加新的工具栏图标 */
function addTool() {
	var addFormUrl = 'admin/cip_admin_user2res_form.html?actionId=cip_admin_user2res_form&mode=add';
	var actionUrl = appId + "/actions/admin_user2res/addData.do";
	var buttonId = "cip_admin_user2res_addData";
	jcdfDialog("", addFormUrl + "&actionUrl=" + actionUrl + "&refActionId=" + buttonId, '新增信息', 400, 650, 0.98, true);
};
   /* 修改工具栏信息 */
function updataTool(id, userId) {
	var updateFormUrl = 'admin/cip_admin_user2res_form.html?actionId=cip_admin_user2res_form&mode=edit';
	var actionUrl = appId + "/actions/admin_user2res/updateData.do";
	var buttonId = "cip_admin_user2res_updateData";
	jcdfDialog("", updateFormUrl + "&actionUrl=" + actionUrl + "&refActionId="+ buttonId + "&resource_id=" + id + "&user_id=" + userId, '修改信息',400, 650, 0.98, true);
}
 

 /* 删除工具栏信息 */
function toolDel(evt, id, userId) {
	evt = evt ? evt : window.event;
	evt.cancelBubble ? evt.cancelBubble = true : evt.stopPropagation();
	$.messager.confirm('提示消息',"确定删除?",function(r) {
						if (r) {
							var jsonData = {
								"resource_id" : id,
								"user_id" : userId
							};
							var url = appId + "/actions/admin_user2res/deleteData.do?actionId=cip_admin_user2res_deleteData";
							$.ajax({
								type : "POST",
								url : url,
								dataType : "json",
								data : JSON.stringify(jsonData),
								contentType : "application/json",
								success : function(oData) {
									if (oData && oData.errorCode == 0) {
										$$.showJcdfMessager('提示消息', '操作成功','info');
									} else {
										$$.showJcdfMessager('提示消息', oData.msg,'warning');
									}
								}
							});
						}
					});
}


//隐藏grid++ reportview
function hideReportView(frameName){
	if(window.frames[frameName] && window.frames[frameName].$ && window.frames[frameName].$('#report_view')){
		window.frames[frameName].$('#report_view').hide();
	}
}
//显示report view
function showReportView(frameName){
	if(window.frames[frameName] && window.frames[frameName].$ && window.frames[frameName].$('#report_view')){
		window.frames[frameName].$('#report_view').show();
	}
}
//回调函数
function invokeParentMethod(fn, args) {
	var argsStr = "";
	var methodStr = "";
	if (arguments.length > 1) {
		for (var i = 1; i < arguments.length; i=i+1) {
			argsStr = argsStr ? argsStr+',"'+arguments[i]+'"' : '"'+arguments[i]+'"';
		}
		if (argsStr) {
			methodStr = arguments[0]+"("+argsStr+")";
		} else {
			methodStr = methodStr[0];
		}
		eval('window.frames["'+sonFrameName+'"].'+methodStr);
	}
}

/**
*	系统密码修改和退出功能控制
*/	
$(function(){
	//查看问题
	$("#deal_count").bind('click', function(){		
		jcdfDialog("",'admin/cip_admin_question_list.html?actionId=cip_admin_question_list&isAdmin=0', '查看问题', 750, 1000, 0.98);
	});
	//查看问题
	$("#problem_check").bind('click', function(){		
		jcdfDialog("","admin/cip_admin_question_form.html?actionId=cip_admin_question_form&isAdmin=0&mode=add&actionUrl="+appId+"/actions/admin_question/addData.do&refActionId=cip_admin_question_addData", '提出问题', 350, 550, 0.98);
	});
	//退出系统
	$("#logout").bind('click', function(){
		$.messager.confirm('提示消息', "确定退出?", function(r){
			if (r) {
				$.ajax({
					type : "POST",
					url : c_url_logout,
					dataType : "json",
					success : function(oData) {
						if (oData && oData.errorCode ==0 ) {
							window.location.href = c_url_login;
						}else{
							$$.showJcdfMessager('提示消息', oData.msg, 'warning');
						}
					}
				});
			}
		});
	});
	//修改密码
	$("#resetPwd").bind('click',function(){
		jcdfDialog("", 'admin/cip_admin_change_password.html?actionId=cip_admin_change_password', '修改密码', 350, 550, 0.98);
	});	
	/**
	 *从contants.js中动态加载 项目title和版本号
	 */
	$("#appTitle").html(appTitle);
	$("#copyright-version").html(version);
	 document.title=appTitle;
	/*显示index页面快捷工具*/
	getToolData();
});

//检查密码重置时间
function validate(data){
	var settime = (data.pwd_set_time).replace(/-/g,"/").replace(/\.0/,'');
	var setdate = new Date(settime);
	var nowdate = new Date();
	var num = (nowdate-setdate)/(1000*3600*24); 
	if(num >= data.pwd_reset_days){
		return true;
	}
}

//强制修改密码
function changePasswd(userData){
	if(!(userData.user_pwd_init == null) && !(userData.pwd_set_time == null) && !(userData.pwd_reset_days == null)){
		if(userData.user_pwd_init == 1 ){
			jcdfDialog("", 'admin/cip_admin_change_password.html?actionId=cip_admin_change_password&flag=init', '修改密码', 300, 650, 0.98, false);
		}else if(validate(userData)){
			jcdfDialog("", 'admin/cip_admin_change_password.html?actionId=cip_admin_change_password&flag=timeout', '修改密码', 300, 650, 0.98, false);
		}
	}
}