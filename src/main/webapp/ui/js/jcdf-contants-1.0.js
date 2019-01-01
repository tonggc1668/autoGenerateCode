var appId = '/wmsc';
var appTitle = '仓储总控平台';
var softCompany = '上海东普科技有限公司';
var version='v2.0';

var c_url_login = appId+"/login.html";
var c_url_logout = appId+"/actions/common/user/logout.do?actionId=system_logout";
var c_url_change_pwd = appId+"/actions/org/reset_password.do";
var c_url_has_pwd = appId+"/actions/org/has_password.do";
var c_url_get_user_profile =appId+'/actions/common/user/getUserProfile.do?actionId=system_getUserProfile';
var c_url_get_resources =appId+"/actions/common/user/getResources.do?actionId=system_getResources";
var c_url_ddic =appId+'/actions/common/domain/getDomains.do?domainId=system_getDomains';
var c_url_get_dealthings =appId+'/actions/common/user/getDealThingsCount.do?actionId=system_getDealThingsCount';
var c_url_change_pwd_form = appId + "/ui/view/public/cip_change_user_pwd_form.html?actionId=cip_change_user_pwd_form";
var ddicUrl = appId + '/actions/common/domain/getDomainValues.do?actionId=system_getDomainValues&domainId=';
var urlResource = appId + '/actions/common/user/getResources.do?actionId=system_getResources&resource_id=';
var c_war_name = appId;