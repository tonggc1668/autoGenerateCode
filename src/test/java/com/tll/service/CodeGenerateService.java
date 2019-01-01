package com.tll.service;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.velocity.VelocityContext;

import com.tll.entity.ColumnData;
import com.tll.util.CodeResourceUtil;
import com.tll.util.CommonPageParser;
import com.tll.util.TableUtil;
import com.tll.util.NameUtils;

public class CodeGenerateService {
	private static final Logger logger = Logger.getLogger(CodeGenerateService.class);

	

	private static String codepath = CodeResourceUtil.CODEPATH;
	private static String webpath = CodeResourceUtil.WEBPATH;
	private static String firstpackage = CodeResourceUtil.FIRSTPACKAGE;
	private static String secpackage = CodeResourceUtil.SECPACKAGE;

	public static String entityPackage = CodeResourceUtil.entityPath.replace("/", ".");
	public static String daoPackage = CodeResourceUtil.daoPath.replace("/", ".");
	public static String daoImplPackage = CodeResourceUtil.daoImplPath.replace("/", ".");
	public static String servicePackage = CodeResourceUtil.servicePath.replace("/", ".");
	public static String serviceImplPackage = CodeResourceUtil.serviceImplPath.replace("/", ".");
	public static String controllerPackage = CodeResourceUtil.controllerPath.replace("/", ".");

	public static void codeGenerate(String tableName) {

		String lowerName = NameUtils.getHumnName(tableName);
		String className = lowerName.substring(0, 1).toUpperCase()+lowerName.substring(1);

		switch (CodeResourceUtil.SCANTABLETYPE) {
		// 1.controller+类，2.第一层包名（项目包名）+controller+类，3.第一层包名（项目包名）+第二层包名（业务包名）+controller+类
		case "1":
			break;
		case "2":
			if (StringUtils.isEmpty(firstpackage)) {
				// 获取表名第一个下划线以前的部分，转小写
				int firstInd = tableName.indexOf("_");
				if (firstInd < 1) {
					return;
				} else {
					firstpackage = tableName.substring(0, firstInd).toLowerCase();
					className = firstpackage.toUpperCase() + "_" + tableName.substring(firstInd + 1).toLowerCase();
				}
			}

			codepath = CodeResourceUtil.CODEPATH + "/" + firstpackage;
			webpath = CodeResourceUtil.WEBPATH + "/" + firstpackage;
			break;
		case "3":
			if (StringUtils.isEmpty(firstpackage)) {
				// 获取表名第一个下划线以前的部分，转小写
				int firstInd = tableName.indexOf("_");
				String last;
				if (firstInd < 1) {
					return;
				} else {
					firstpackage = tableName.substring(0, firstInd).toLowerCase();
					className = firstpackage.toUpperCase() + "_" + tableName.substring(firstInd + 1).toLowerCase();
					last = tableName.substring(firstInd + 1);
				}
				int secInd = last.indexOf("_");
				if (secInd < 1) {
					return;
				} else {
					secpackage = last.substring(0, secInd).toLowerCase();
				}
			}
			codepath = CodeResourceUtil.CODEPATH + "/" + firstpackage + "/" + secpackage;
			webpath = CodeResourceUtil.WEBPATH + "/" + firstpackage + "/" + secpackage;
			break;
		default:
			break;
		}

		String codePackage = codepath.replace("/", ".");
		codePackage = codePackage.substring(codePackage.indexOf("com"));
		String beanPath = codepath + "/" + CodeResourceUtil.entityPath + "/" + className + CodeResourceUtil.entitySuffix
				+ CodeResourceUtil.classSuffix;
		String daoPath = codepath + "/" + CodeResourceUtil.daoPath + "/" + className + CodeResourceUtil.daoSuffix
				+ CodeResourceUtil.classSuffix;
		String daoImplPath = codepath + "/" + CodeResourceUtil.daoImplPath + "/" + className
				+ CodeResourceUtil.daoImplSuffix + CodeResourceUtil.classSuffix;
		String servicePath = codepath + "/" + CodeResourceUtil.servicePath + "/" + className
				+ CodeResourceUtil.serviceSuffix + CodeResourceUtil.classSuffix;
		String serviceImplPath = codepath + "/" + CodeResourceUtil.serviceImplPath + "/" + className
				+ CodeResourceUtil.serviceImplSuffix + CodeResourceUtil.classSuffix;
		String controllerPath = codepath + "/" + CodeResourceUtil.controllerPath + "/" + className
				+ CodeResourceUtil.controllerSuffix + CodeResourceUtil.classSuffix;
		String jspPath = webpath + "/" + lowerName + ".jsp";

		VelocityContext context = new VelocityContext();
		context.put("className", className);
		context.put("lowerName", lowerName);
		context.put("tableName", tableName);
		context.put("codePackage", codePackage);
		
		context.put("urlPrefix", codePackage.substring(codePackage.lastIndexOf(".")+1));
		
		context.put("entityPackage", entityPackage);
		context.put("entitySuffix", CodeResourceUtil.entitySuffix);
		
		context.put("daoPackage", daoPackage);
		context.put("daoSuffix", CodeResourceUtil.daoSuffix);
		context.put("daoImplPackage", daoImplPackage);
		context.put("daoImplSuffix", CodeResourceUtil.daoImplSuffix);
		
		
		context.put("servicePackage", servicePackage);
		context.put("serviceSuffix", CodeResourceUtil.serviceSuffix);
		context.put("serviceImplPackage", serviceImplPackage);
		context.put("serviceImplSuffix", CodeResourceUtil.serviceImplSuffix);
		
		
		context.put("controllerPackage", controllerPackage);
		context.put("controllerSuffix", CodeResourceUtil.controllerSuffix);
		
		context.put("classSuffix", CodeResourceUtil.classSuffix.substring(1));
		
		context.put("companyEnglishName", CodeResourceUtil.companyEnglishName);
		context.put("companyChineseName", CodeResourceUtil.companyChineseName);
		context.put("author", CodeResourceUtil.author);
		context.put("version", CodeResourceUtil.version);
		context.put("year", CodeResourceUtil.year);
		context.put("date", CodeResourceUtil.date);

		try {

			// Map sqlMap = CreateBean.getAutoCreateSql(tableName);
			// context.put("SQL", sqlMap);
			List<ColumnData> dataList = TableUtil.getColumnDatas(tableName);
			context.put("columnDatas", dataList);
			context.put("feilds", TableUtil.getBeanFeilds(tableName,dataList));
			context.put("tableComment", TableUtil.getTableComment(tableName));
			context.put("IdIndicator", TableUtil.getIdIndicator(tableName));
			context.put("CompositeUniqueConstraint", TableUtil.getCompositeUniqueConstraintStr(tableName));
		} catch (Exception e) {
			logger.error(e);
			return;
		}

		CommonPageParser.WriterPage(context, "EntityTemplate.ftl", beanPath);
		CommonPageParser.WriterPage(context, "DaoTemplate.ftl", daoPath);
		CommonPageParser.WriterPage(context, "DaoImplTemplate.ftl", daoImplPath);
		CommonPageParser.WriterPage(context, "ServiceTemplate.ftl",servicePath);
		CommonPageParser.WriterPage(context, "ServiceImplTemplate.ftl", serviceImplPath);
		CommonPageParser.WriterPage(context, "ControllerTemplate.ftl", controllerPath);
		//CommonPageParser.WriterPage(context, "jspTemplate.ftl", jspPath);
	}
}