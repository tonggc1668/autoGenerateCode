package com.tll.util;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ResourceBundle;

import org.springframework.util.StringUtils;

public class CodeResourceUtil {
	private static final ResourceBundle bundle = ResourceBundle.getBundle("database");
	private static final ResourceBundle bundlePath = ResourceBundle.getBundle("config");

	public static String DIVER_NAME;
	public static String URL;
	public static String USERNAME;
	public static String PASSWORD;
	public static String DATABASE_NAME;
	public static String DATABASE_TYPE = "mysql";
	public static String SYSTEM_ENCODING;
	public static String SCANTABLETYPE;

	public static boolean ISREPLACE;
	public static String FIRSTPACKAGE;
	public static String SECPACKAGE;
	public static String WEB_ROOT_PACKAGE;
	public static String SOURCE_ROOT_PACKAGE;
	public static String BUSSIPACKAGE;
	public static String PROJECTPATH;
	public static String TEMPLATEPATH;
	public static String CODEPATH ;
	public static String WEBPATH ;
	
	public static String entityPath;
	public static String entitySuffix;
	public static String daoPath;
	public static String daoSuffix;
	public static String daoImplPath;
	public static String daoImplSuffix;
	public static String servicePath;
	public static String serviceSuffix;
	public static String serviceImplPath;
	public static String serviceImplSuffix;
	public static String controllerPath;
	public static String controllerSuffix;
	public static String controllerImplPath;
	public static String controllerImplSuffix;
	public static String classSuffix;
	
	public static String companyEnglishName;
	public static String companyChineseName;
	public static String author;
	public static String version;
	public static String year;
	public static String date;
	
	static {             
		File newFile = new File("");
		try {
			PROJECTPATH = newFile.getCanonicalPath();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		PROJECTPATH = PROJECTPATH.replace("\\", "/");
		DIVER_NAME = bundle.getString("jdbc.driverClassName");
		URL = bundle.getString("jdbc.url");
		USERNAME = bundle.getString("jdbc.username");
		PASSWORD = bundle.getString("jdbc.password");
		DATABASE_NAME = bundle.getString("jdbc.database_name");

		SYSTEM_ENCODING = bundlePath.getString("system_encoding");
		
		SOURCE_ROOT_PACKAGE = bundlePath.getString("source_root_package");
		WEB_ROOT_PACKAGE = bundlePath.getString("webroot_package");
		BUSSIPACKAGE = bundlePath.getString("bussi_package");
		
		//GENERATE_TABLE_ID = bundlePath.getString("generate_table_id");

		if ((URL.indexOf("mysql") >= 0) || (URL.indexOf("MYSQL") >= 0))
			DATABASE_TYPE = "mysql";
		else if ((URL.indexOf("oracle") >= 0) || (URL.indexOf("ORACLE") >= 0)) {
			DATABASE_TYPE = "oracle";
		}
		
		ISREPLACE= bundlePath.getString("isReplace").equalsIgnoreCase("true");
		FIRSTPACKAGE= bundlePath.getString("firstPackage");
		SECPACKAGE= bundlePath.getString("secPackage");
		
		TEMPLATEPATH = PROJECTPATH + "/"+ bundlePath.getString("templatepath");
		
		SCANTABLETYPE=bundlePath.getString("scanTableType");
		CODEPATH = PROJECTPATH + "/"+ SOURCE_ROOT_PACKAGE + "/"+ BUSSIPACKAGE ;
		WEBPATH = PROJECTPATH + "/"+ WEB_ROOT_PACKAGE ;
		
		entityPath= bundlePath.getString("entityPath");
		entitySuffix= bundlePath.getString("entitySuffix");
		daoPath= bundlePath.getString("daoPath");
		daoSuffix= bundlePath.getString("daoSuffix");
		daoImplPath= bundlePath.getString("daoImplPath");
		daoImplSuffix= bundlePath.getString("daoImplSuffix");
		servicePath= bundlePath.getString("servicePath");
		serviceSuffix= bundlePath.getString("serviceSuffix");
		serviceImplPath= bundlePath.getString("serviceImplPath");
		serviceImplSuffix= bundlePath.getString("serviceImplSuffix");
		controllerPath= bundlePath.getString("controllerPath");
		controllerSuffix= bundlePath.getString("controllerSuffix");
		classSuffix= bundlePath.getString("classSuffix");
		
		
		companyEnglishName= bundlePath.getString("companyEnglishName");
		try {
			companyChineseName= new String(bundlePath.getString("companyChineseName").getBytes("ISO-8859-1"),"UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		author= bundlePath.getString("author");
		version= bundlePath.getString("version");
		year= StringUtils.isEmpty(bundlePath.getString("year"))?String.valueOf(DateUtils.getCurrentYear()):bundlePath.getString("year");
		date= StringUtils.isEmpty(bundlePath.getString("year"))?DateUtils.getCurrentDate():bundlePath.getString("year");
	
	}
}