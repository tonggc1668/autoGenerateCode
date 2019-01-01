package com.tll.util;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.util.CollectionUtils;

import com.tll.entity.ColumnData;

public class TableUtil {
	
	private static final Logger logger = Logger.getLogger(TableUtil.class);
	
	private static HashMap<String,ArrayList<ColumnData>> columnDatasHashMap= new HashMap<String,ArrayList<ColumnData>>();
	private static HashMap<String, ArrayList<String>> constraintsmap = new HashMap<String,ArrayList<String>>();
	private static ApplicationContext ctx;
	private static JdbcTemplate jdbcTemplate;
	private static String databaseName = CodeResourceUtil.DATABASE_NAME;
	
	static {
		try {
		ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
	    jdbcTemplate = (JdbcTemplate) ctx.getBean("jdbcTemplate");
			//Class.forName("com.mysql.jdbc.Driver");
		} catch (Exception e) {
			logger.error(e);
		}
	}

	public static String getDatabaseName() {
		return databaseName;
	}

	public static void setDatabaseName(String databaseName) {
		TableUtil.databaseName = databaseName;
	}
	
	/*public void setMysqlInfo(String url, String username, String password) {
		this.url = url;
		this.username = username;
		this.password = password;
	}*/

	/*public void setConnection(Connection connection) {
		this.connection = connection;
	}*/

/*	public static Connection getConnection() throws SQLException {
		if (connection == null) {
			return DriverManager.getConnection(url, username, password);
		}else {
			return connection;
		}
	}*/

	/*@SuppressWarnings({ "unchecked", "rawtypes" })
	public static List<String> getTables() throws SQLException {
		Connection con = getConnection();
		PreparedStatement ps = con.prepareStatement(SQLTables);
		ResultSet rs = ps.executeQuery();
		List list = new ArrayList();
		while (rs.next()) {
			String tableName = rs.getString(1);
			list.add(tableName);
		}
		rs.close();
		ps.close();
		con.close();
		return list;
	}*/
	
	//要得到字段的属性：字段名，字段类型，注释，数值最大长度,数值小数长度,字符最大长度，是否必填,默认值，主键，自增
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static ArrayList<ColumnData> getColumnDatasByCache(String tableName)  {
		if (columnDatasHashMap.containsKey(tableName)) {
			return columnDatasHashMap.get(tableName);
		}
		ArrayList columnDatas = getColumnDatas(tableName);
		columnDatasHashMap.put(tableName, columnDatas);
		return columnDatas;
	}
	
	public static ArrayList<ColumnData> getColumnDatas(String tableName)  {
		String sql = "select column_name ,data_type,column_comment,numeric_precision,numeric_scale,"
				+ "character_maximum_length,is_nullable,column_default,column_key,extra,character_set_name"
				+ " from information_schema.columns where table_name =  '"
				+ tableName + "' " + "and table_schema =  '" + databaseName + "'";

		final ArrayList<ColumnData> columnDatas = new ArrayList<ColumnData>();
		jdbcTemplate.query(sql, new RowCallbackHandler(){
			@Override
			public void processRow(ResultSet rs) throws SQLException {
				String name = rs.getString(1);
				System.out.println(name);
				String type = rs.getString(2);
				String comment = rs.getString(3);
				String precision = rs.getString(4);
				String scale = rs.getString(5);
				String charmaxLength = rs.getString(6);
				String nullable = getNullAble(rs.getString(7));
				String columnDefault = rs.getString(8);
				String columnKey = rs.getString(9);
				String extra = rs.getString(10);
				String characterSetName = rs.getString(11);
				type = getType(type, precision, scale);
						
				ColumnData cd = new ColumnData();
				cd.setColumnName(name);
				cd.setDataType(type);
				cd.setColumnType(rs.getString(2));
				cd.setColumnComment(comment);
				cd.setPrecision(precision);
				cd.setScale(scale);
				cd.setCharMaxLength(charmaxLength);
				cd.setNullable(nullable);
				formatFieldClassType(cd);
				cd.setColumnDefault(getColumnDefaultValue(columnDefault,type,characterSetName));
				cd.setColumnKey(columnKey);
				cd.setExtra(extra);
				cd.setCharSetName(characterSetName);
				columnDatas.add(cd);
			}
		});
		return columnDatas;
	}
	
    public static ColumnData getColumnData(String tableName,String columnName) {
    	ArrayList<ColumnData> columnDatas = getColumnDatasByCache(tableName);
    	for (ColumnData columnData : columnDatas) {
			if (columnData.getColumnName().equalsIgnoreCase(columnName)) {
				return columnData;
			}
		}
    	columnDatas = getColumnDatas(tableName);
    	for (ColumnData columnData : columnDatas) {
			if (columnData.getColumnName().equalsIgnoreCase(columnName)) {
				columnDatasHashMap.put(tableName, columnDatas);
				return columnData;
			}
		}
    	return null;
	}
    
	public static String getBeanFeilds(String tableName,List<ColumnData> dataList) throws SQLException, UnsupportedEncodingException {
		StringBuffer str = new StringBuffer();
		StringBuffer getset = new StringBuffer();
		for (ColumnData d : dataList) {
			String name = NameUtils.getHumnName(d.getColumnName());
			String type = d.getDataType();
			String comment = d.getColumnComment();

			String maxChar = name.substring(0, 1).toUpperCase();
			str.append("\r\t").append("//").append(comment).append("\r\t");
			HashMap<String, String> uniqueConstraintsMap = getColumnUniqueConstraintMap(tableName); 
			if (uniqueConstraintsMap.size() > 0) {
				for (Entry<String, String> entry : uniqueConstraintsMap.entrySet()) {
					String key = entry.getKey();
					String value = entry.getValue();
					if (d.getColumnName().equalsIgnoreCase(key)) {
						str.append(value).append("\r\t");
					}
				}
			}
			if (d.getNullable().equalsIgnoreCase("N") && d.getColumnDefault() == null 
					&& !d.getColumnName().equalsIgnoreCase("CREATE_USER_ID") 
					&& !d.getColumnName().equalsIgnoreCase("CREATE_TIME") 
					&& !d.getColumnName().equalsIgnoreCase("UPDATE_USER_ID") 
					&& !d.getColumnName().equalsIgnoreCase("UPDATE_TIME") 
					&& !d.getColumnName().equalsIgnoreCase("VERSION_NUMBER") 
					&& !d.getExtra().equalsIgnoreCase("auto_increment")
					) {
				str.append("@YDNotNull(message = \""+d.getColumnComment()+"不能为空！\")").append("\r\t");
			}
			if (StringUtils.isNotBlank(d.getCharMaxLength())) {
				str.append("@YDLength(max="+d.getCharMaxLength()+",message = \""+d.getColumnComment()+"最大长度为"+d.getCharMaxLength()+"！\")").append("\r\t");
			}
			if (d.getDataType().contains("BigDecimal")) {
				int right = Integer.parseInt(d.getScale());
				int left = Integer.parseInt(d.getPrecision())-right;
				int all = left + right;
				String decimalStr = null;
				if (all == 10 && right ==0) {
					decimalStr = "@BigDecimal10Precision";
					str.append(decimalStr+"(message = \""+d.getColumnComment()+"必须满足"+left+"位整数，"+right+"位小数！\")").append("\r\t");
				}else if (all == 10 && right ==2) {
					decimalStr = "@BigDecimal102Precision";
					str.append(decimalStr+"(message = \""+d.getColumnComment()+"必须满足"+left+"位整数，"+right+"位小数！\")").append("\r\t");
				}else if (all == 18 && right ==6) {
					decimalStr = "@BigDecimal186Precision";
					str.append(decimalStr+"(message = \""+d.getColumnComment()+"必须满足"+left+"位整数，"+right+"位小数！\")").append("\r\t");
				}
			}
			str.append("private ").append(type + " ").append(name).append(";\r\t");
			String method = maxChar + name.substring(1, name.length());
			getset.append("\r\t").append("public ").append(type + " ").append("get" + method + "() {\r\t");
			getset.append("    return this.").append(name).append(";\r\t}\r");
			getset.append("\r\t").append("public void ").append("set" + method + "(" + type + " " + name + ") {\r\t");
			getset.append("    this." + name + "=").append(name).append(";\r\t}\r");
		}
		String argv = str.toString();
		String method = getset.toString();
		return argv + method;
	}

	//得到表的注释
	public static String getTableComment(String tableName) throws SQLException {
		String sql = "select TABLE_COMMENT" + " from information_schema.TABLES where table_name =  '" + tableName + "' "
				+ "and table_schema =  '" + databaseName + "'";
		
		return jdbcTemplate.queryForObject(sql, String.class);
	}
	
/*	public static ArrayList<String> getTableConstraintsByCache(String tableName,String constraintName) throws SQLException  {
		ArrayList<String> columnNames = null;
		if (constraintsmap.containsKey(tableName+"#"+constraintName)) {
			return constraintsmap.get(tableName+"#"+constraintName);
		}
		getTableConstraints(tableName);
		if (constraintsmap.containsKey(tableName+"#"+constraintName)) {
			return constraintsmap.get(tableName+"#"+constraintName);
		}
		return columnNames;
	}
	
	public static ArrayList<String> getTableConstraints(String tableName,String constraintName) throws SQLException  {
		ArrayList<String> columnNames = null;
		HashMap<String, ArrayList<String>> map = getTableConstraints(tableName);
		if (map.containsKey(tableName+"#"+constraintName)) {
			return map.get(tableName+"#"+constraintName);
		}
		return columnNames;
	}
	
	public static ArrayList<String> getColumnCommentsByname(List<ColumnData> columnDatas,ArrayList<String> ColumnNames) throws SQLException  {
		ArrayList<String> columnComments = new ArrayList<String>();
		for (String columnName : ColumnNames) {
			for (ColumnData columnData : columnDatas) {
				if (columnData.getColumnName().equalsIgnoreCase(columnName)) {
					columnComments.add(columnData.getColumnComment());
				}
			}
		}
		return columnComments;
	}*/
	
	public static HashMap<String, ArrayList<String>> getTableConstraintsByCache(String tableName) throws SQLException  {
		if (constraintsmap.size()==0) {
			return getTableConstraints(tableName);
		}
		for (Entry<String, ArrayList<String>> entry : constraintsmap.entrySet()) {
			String key = entry.getKey();
			if (key.contains(tableName)) {
				return constraintsmap;
			}
		}
		return getTableConstraints(tableName);
	}
	
	//得到表的约束,PRIMARY,IDX_UNI_NAME_TYPE
	public static HashMap<String, ArrayList<String>> getTableConstraints(String tableName) throws SQLException {
		String sql = "select CONSTRAINT_NAME,COLUMN_NAME from information_schema.KEY_COLUMN_USAGE where table_name =  '" + tableName + "' "
				+ "and table_schema =  '" + databaseName + "'";
		HashMap<String, ArrayList<String>> map = new HashMap<String,ArrayList<String>>();
		List<Map<String, Object>> querylist = jdbcTemplate.queryForList(sql);
		for (Map<String, Object> listMap : querylist) {
			String constraintName = (String)listMap.get("CONSTRAINT_NAME");
			String columnName =(String)listMap.get("COLUMN_NAME");
			if (map.containsKey(tableName+"#"+constraintName)) {
				ArrayList<String> list = map.get(tableName+"#"+constraintName);
				list.add(columnName);
			}else {
				ArrayList<String> list = new ArrayList<String>();
				list.add(columnName);
				map.put(tableName+"#"+constraintName, list);
			}
		}
		/*jdbcTemplate.query(sql, new RowCallbackHandler(){
			@Override
			public void processRow(ResultSet rs) throws SQLException {
				while (rs.next()) {
					String constraintName = rs.getString(1);
					String columnName = rs.getString(2);
					if (map.containsKey(tableName+"#"+constraintName)) {
						ArrayList<String> list = map.get(tableName+"#"+constraintName);
						list.add(columnName);
					}else {
						ArrayList<String> list = new ArrayList<String>();
						list.add(columnName);
						map.put(tableName+"#"+constraintName, list);
					}
				}
			}
		});*/
		if (constraintsmap.size() == 0) {
			constraintsmap = map;
		}else {
			for (Entry<String, ArrayList<String>> entry : map.entrySet()) {
				String key = entry.getKey();
				ArrayList<String> value = entry.getValue();
				constraintsmap.put(key, value);
			}
		}
		return map;
	}
	
	//得到表的主键,PRIMARY
	public static ArrayList<String> getPrimaryKeys(String tableName) throws SQLException {
		ArrayList<String> list = null;
		HashMap<String, ArrayList<String>> map = getTableConstraintsByCache(tableName);
		if (map.size()>0) {
			list = map.get(tableName+"#"+"PRIMARY");
		}
		return list;
	}
	
	//得到表的主键,PRIMARY
	public static String getPrimaryKey(String tableName) throws SQLException {
		String primaryKey = null;
		ArrayList<String> list = getPrimaryKeys(tableName);
		if (!CollectionUtils.isEmpty(list)) {
			primaryKey = list.get(0).toLowerCase();
		}
		return primaryKey;
	}
	
	// 得到表的主键,PRIMARY
	public static String getIdIndicator(String tableName) throws SQLException {
		String idIndicator = null;
		String primaryKey = getPrimaryKey(tableName);
		if (primaryKey != null) {
			idIndicator = "@IdIndicator(name=\"" + primaryKey + "\")\r";
		}
		return idIndicator;
	}
	
	//得到表的组合约束
	public static String getCompositeUniqueConstraintStr(String tableName) throws SQLException, UnsupportedEncodingException {
		String compositeuniqueConstraintStr = null;
		StringBuilder compositeuniqueConstraintSb = new StringBuilder();
		HashMap<String, ArrayList<String>> map = getTableConstraintsByCache(tableName);
		
		HashMap<String, ArrayList<String>> uniqueConstraintsMap = new HashMap<String, ArrayList<String>>();
		if (map.size()>0) {
			for (Entry<String, ArrayList<String>> entry : map.entrySet()) {
				String key = entry.getKey();
				if (key.equalsIgnoreCase(tableName+"#"+"PRIMARY")) {
					continue;
				}
				ArrayList<String> list = entry.getValue();
				
				if (list.size()<=1) {
					continue;
				}
				
				StringBuilder compositeKey = new StringBuilder();
				StringBuilder message = new StringBuilder();
				message.append("\"已存在相同");
				for (String columnName : list) {
					compositeKey.append("\"").append(columnName).append("\",");
					message.append("「").append(getColumnComment(tableName,columnName)).append("」,");
					
				}
				compositeKey.deleteCharAt(compositeKey.length()-1);
				message.deleteCharAt(message.length()-1);
				message.append("的记录，不能保存。\"");
				ArrayList<String> uniqueConstraintList = new ArrayList<String>();
				uniqueConstraintList.add(compositeKey.toString());
				uniqueConstraintList.add(message.toString());
				uniqueConstraintsMap.put(key, uniqueConstraintList);
			}
			if (uniqueConstraintsMap.size()>0) {
				compositeuniqueConstraintSb.append("@CompositeUniqueConstraint(");
				for (Entry<String, ArrayList<String>> entry : uniqueConstraintsMap.entrySet()) {
					int i=1;
					ArrayList<String> list = entry.getValue();
					String compositeKey = "compositeKey"+i+" = {"+list.get(0)+"},";
					String message = "message"+i+"="+list.get(1)+",";
					compositeuniqueConstraintSb.append(compositeKey);
					compositeuniqueConstraintSb.append(message);
					i++;
				}
				compositeuniqueConstraintStr = compositeuniqueConstraintSb.substring(0, compositeuniqueConstraintSb.length()-1);
				compositeuniqueConstraintStr += ")\r";
			}
		}
		return compositeuniqueConstraintStr;
	}
	
	//得到表的唯一约束
	public static HashMap<String, String> getColumnUniqueConstraintMap(String tableName) throws SQLException, UnsupportedEncodingException {
		ArrayList<ColumnData> columnDatas = getColumnDatas(tableName);
		HashMap<String, ArrayList<String>> map = getTableConstraintsByCache(tableName);
		
		HashMap<String, String> uniqueConstraintsMap = new HashMap<String, String>();
		if (map.size()>0) {
			for (Entry<String, ArrayList<String>> entry : map.entrySet()) {
				String key = entry.getKey();
				if (key.equalsIgnoreCase(tableName+"#"+"PRIMARY")) {
					continue;
				}
				ArrayList<String> list = entry.getValue();
				
				if (list.size()==0 || list.size()>1 ) {
					continue;
				}
				for (ColumnData columnData : columnDatas) {
					if (columnData.getColumnName().equalsIgnoreCase(list.get(0))) {
						String constraintStr = "@ColumnUniqueConstraint(message=\"已存在相同「"+columnData.getColumnComment()+"」的记录，不能保存。\")";
						uniqueConstraintsMap.put(columnData.getColumnName(), constraintStr);
					}
				}
			}
		}
		return uniqueConstraintsMap;
	}
	
	//得到表的注释
	public static String getColumnComment(String tableName,String columnName) throws SQLException, UnsupportedEncodingException {
		String columnComment = null;
		ColumnData columnData = getColumnData(tableName,columnName);
		if (columnData != null) {
			columnComment = columnData.getColumnComment();
		}
		return columnComment;
	}
/*	private String formatTableName(String name) {
		String[] split = name.split("_");
		if (split.length > 1) {
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < split.length; i++) {
				String tempName = split[i].substring(0, 1).toUpperCase() + split[i].substring(1, split[i].length());
				sb.append(tempName);
			}

			return sb.toString();
		}
		String tempName = split[0].substring(0, 1).toUpperCase() + split[0].substring(1, split[0].length());
		return tempName;
	}*/

	private static void formatFieldClassType(ColumnData columnt) {
		String fieldType = columnt.getColumnType();
		String scale = columnt.getScale();

		if ("N".equals(columnt.getNullable())) {
			columnt.setOptionType("required:true");
		}
		if (("datetime".equals(fieldType)) || ("time".equals(fieldType))) {
			columnt.setClassType("easyui-datetimebox");
		} else if ("date".equals(fieldType)) {
			columnt.setClassType("easyui-datebox");
		} else if ("int".equals(fieldType)) {
			columnt.setClassType("easyui-numberbox");
		} else if ("number".equals(fieldType)) {
			if ((StringUtils.isNotBlank(scale)) && (Integer.parseInt(scale) > 0)) {
				columnt.setClassType("easyui-numberbox");
				if (StringUtils.isNotBlank(columnt.getOptionType()))
					columnt.setOptionType(columnt.getOptionType() + "," + "precision:2,groupSeparator:','");
				else
					columnt.setOptionType("precision:2,groupSeparator:','");
			} else {
				columnt.setClassType("easyui-numberbox");
			}
		} else if (("float".equals(fieldType)) || ("double".equals(fieldType)) || ("decimal".equals(fieldType))) {
			columnt.setClassType("easyui-numberbox");
			if (StringUtils.isNotBlank(columnt.getOptionType()))
				columnt.setOptionType(columnt.getOptionType() + "," + "precision:2,groupSeparator:','");
			else
				columnt.setOptionType("precision:2,groupSeparator:','");
		} else {
			columnt.setClassType("easyui-validatebox");
		}
	}

	public static String getType(String dataType, String precision, String scale) {
		dataType = dataType.toLowerCase();
		/*if (dataType.contains("char")||dataType.contains("text"))
			dataType = "java.lang.String";
		else if (dataType.contains("bit"))
			dataType = "java.lang.Boolean";
		else if (dataType.contains("bigint"))
			dataType = "java.lang.Long";
		else if (dataType.contains("int"))
			dataType = "java.lang.Integer";
		else if (dataType.contains("float"))
			dataType = "java.lang.Float";
		else if (dataType.contains("double"))
			dataType = "java.lang.Double";
		else if (dataType.contains("number")) {
			if ((StringUtils.isNotBlank(scale)) && (Integer.parseInt(scale) > 0))
				dataType = "java.math.BigDecimal";
			else if ((StringUtils.isNotBlank(precision)) && (Integer.parseInt(precision) > 6))
				dataType = "java.lang.Long";
			else
				dataType = "java.lang.Integer";
		} else if (dataType.contains("decimal"))
			dataType = "BigDecimal";
		else if (dataType.contains("date"))
			dataType = "java.util.Date";
		else if (dataType.contains("time"))
			dataType = "java.sql.Timestamp";
		else if (dataType.contains("clob"))
			dataType = "java.sql.Clob";
		else {
			dataType = "java.lang.Object";
		}*/
		if(dataType.equalsIgnoreCase("tinyint") || dataType.equalsIgnoreCase("smallint")
        		|| dataType.equalsIgnoreCase("mediumint")  || dataType.equalsIgnoreCase("int") 
        		|| dataType.equalsIgnoreCase("integer")){  
            return "Integer";   
        }else if(dataType.equalsIgnoreCase("bigint")){  
            return "Long";  
        }else if(dataType.equalsIgnoreCase("float")){  
            return "Float"; 
        }else if(dataType.equalsIgnoreCase("double")){  
            return "Double"; 
        }else if(dataType.equalsIgnoreCase("decimal")|| dataType.equalsIgnoreCase("numeric")){  
            return "BigDecimal"; 
        }else if(dataType.equalsIgnoreCase("varchar") || dataType.equalsIgnoreCase("char")   
                || dataType.equalsIgnoreCase("TINYTEXT") || dataType.equalsIgnoreCase("MEDIUMTEXT")   
                || dataType.equalsIgnoreCase("LONGTEXT") || dataType.equalsIgnoreCase("text") 
                || dataType.equalsIgnoreCase("ENUM") || dataType.equalsIgnoreCase("SET") ){  
            return "String"; 
        }else if(dataType.equalsIgnoreCase("BLOB") || dataType.equalsIgnoreCase("TINYBLOB")   
                || dataType.equalsIgnoreCase("LONGBLOB") || dataType.equalsIgnoreCase("MEDIUMIBLOB")
                || dataType.equalsIgnoreCase("binary") || dataType.equalsIgnoreCase("VARBINARY")
                || dataType.equalsIgnoreCase("bit")){  
            return "Byte[]";    
        }
        /*else if(dataType.equalsIgnoreCase("date") || dataType.equalsIgnoreCase("YEAR")){  
            return "java.sql.Date";  
        }else if(dataType.equalsIgnoreCase("time")){  
            return "java.sql.Time";     
        }else if(dataType.equalsIgnoreCase("datetime") ||dataType.equalsIgnoreCase("Timestamp")){  
            return "java.sql.Timestamp"; 
        }*/
        else if(dataType.equalsIgnoreCase("date") || dataType.equalsIgnoreCase("YEAR")
        		 || dataType.equalsIgnoreCase("time") 
        		 || dataType.equalsIgnoreCase("datetime") || dataType.equalsIgnoreCase("Timestamp")){  
            return "Date";  
        }
        else {
        	return "Object";
		}
	}

	public static void getPackage(int type, String createPath, String content, String packageName, String className, String extendsClassName, String[] importName) throws Exception {
		if (packageName == null) {
			packageName = "";
		}
		StringBuffer sb = new StringBuffer();
		sb.append("package ").append(packageName).append(";\r");
		sb.append("\r");
		for (int i = 0; i < importName.length; i++) {
			sb.append("import ").append(importName[i]).append(";\r");
		}
		sb.append("\r");
		sb.append("/**\r *  entity. @author wolf Date:" + new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()) + "\r */");
		sb.append("\r");
		sb.append("\rpublic class ").append(className);
		if (extendsClassName != null) {
			sb.append(" extends ").append(extendsClassName);
		}
		if (type == 1)
			sb.append(" ").append("implements java.io.Serializable {\r");
		else {
			sb.append(" {\r");
		}
		sb.append("\r\t");
		sb.append("private static final long serialVersionUID = 1L;\r\t");
		String temp = className.substring(0, 1).toLowerCase();
		temp = temp + className.substring(1, className.length());
		if (type == 1) {
			sb.append("private " + className + " " + temp + "; // entity ");
		}
		sb.append(content);
		sb.append("\r}");
		System.out.println(sb.toString());
		createFile(createPath, "", sb.toString());
	}

	/*public String getTablesNameToClassName(String tableName) {
		String tempTables = formatTableName(tableName);
		return tempTables;
	}*/

	public static void createFile(String path, String fileName, String str) throws IOException {
		FileWriter writer = new FileWriter(new File(path + fileName));
		writer.write(new String(str.getBytes("utf-8")));
		writer.flush();
		writer.close();
	}

	public static Map<String, Object> getAutoCreateSql(String tableName) throws Exception {
		Map sqlMap = new HashMap();
		List columnDatas = getColumnDatas(tableName);
		String columns = getColumnSplit(columnDatas);
		String formatColumns = getFormatColumnSplit(columnDatas);
		String[] columnList = getColumnList(columns);
		String columnFields = getColumnFields(columns);
		String insert = "insert into " + tableName + "(" + columns.replaceAll("\\|", ",") + ")\n values(#{" + formatColumns.replaceAll("\\|", "},#{") + "})";
		String update = getUpdateSql(tableName, columnList);
		String updateSelective = getUpdateSelectiveSql(tableName, columnDatas);
		String selectById = getSelectByIdSql(tableName, columnList);
		String delete = getDeleteSql(tableName, columnList);
		sqlMap.put("columnList", columnList);
		sqlMap.put("columnFields", columnFields);
		sqlMap.put("insert", insert.replace("#{createTime}", "now()").replace("#{updateTime}", "now()"));
		sqlMap.put("update", update.replace("#{createTime}", "now()").replace("#{updateTime}", "now()"));
		sqlMap.put("delete", delete);
		sqlMap.put("updateSelective", updateSelective);
		sqlMap.put("selectById", selectById);
		return sqlMap;
	}

	public static String getDeleteSql(String tableName, String[] columnsList) throws SQLException {
		StringBuffer sb = new StringBuffer();
		sb.append("delete ");
		sb.append("\t from ").append(tableName).append(" where ");
		sb.append(columnsList[0]).append(" = #{").append(NameUtils.getHumnName(columnsList[0])).append("}");
		return sb.toString();
	}

	public static String getSelectByIdSql(String tableName, String[] columnsList) throws SQLException {
		StringBuffer sb = new StringBuffer();
		sb.append("select <include refid=\"Base_Column_List\" /> \n");
		sb.append("\t from ").append(tableName).append(" where ");
		sb.append(columnsList[0]).append(" = #{").append(NameUtils.getHumnName(columnsList[0])).append("}");
		return sb.toString();
	}

	public static String getColumnFields(String columns) throws SQLException {
		String fields = columns;
		if ((fields != null) && (!"".equals(fields))) {
			fields = fields.replaceAll("[|]", ",");
		}
		return fields;
	}

	public static String[] getColumnList(String columns) throws SQLException {
		String[] columnList = columns.split("[|]");
		return columnList;
	}

	public static String getUpdateSql(String tableName, String[] columnsList) throws SQLException {
		StringBuffer sb = new StringBuffer();

		for (int i = 1; i < columnsList.length; i++) {
			String column = columnsList[i];
			if (!"CREATETIME".equals(column.toUpperCase())) {
				if ("UPDATETIME".equals(column.toUpperCase()))
					sb.append(column + "=now()");
				else {
					sb.append(column + "=#{" + NameUtils.getHumnName(column) + "}");
				}
				if (i + 1 < columnsList.length)
					sb.append(",");
			}
		}
		String update = "update " + tableName + " set " + sb.toString() + " where " + columnsList[0] + "=#{" + NameUtils.getHumnName(columnsList[0]) + "}";
		return update;
	}

	public static String getUpdateSelectiveSql(String tableName, List<ColumnData> columnList) throws SQLException {
		StringBuffer sb = new StringBuffer();
		ColumnData cd = (ColumnData) columnList.get(0);
		sb.append("\t<trim  suffixOverrides=\",\" >\n");
		for (int i = 1; i < columnList.size(); i++) {
			ColumnData data = (ColumnData) columnList.get(i);
			String columnName = data.getColumnName();
			sb.append("\t<if test=\"").append(NameUtils.getHumnName(columnName)).append(" != null ");

			if ("String" == data.getDataType()) {
				sb.append(" and ").append(NameUtils.getHumnName(columnName)).append(" != ''");
			}
			sb.append(" \">\n\t\t");
			sb.append(columnName + "=#{" + NameUtils.getHumnName(columnName) + "},\n");
			sb.append("\t</if>\n");
		}
		sb.append("\t</trim>");
		String update = "update " + tableName + " set \n" + sb.toString() + " where " + cd.getColumnName() + "=#{" + NameUtils.getHumnName(cd.getColumnName()) + "}";
		return update;
	}

	public static String getColumnSplit(List<ColumnData> columnList) throws SQLException {
		StringBuffer commonColumns = new StringBuffer();
		for (ColumnData data : columnList) {
			commonColumns.append(data.getColumnName() + "|");
		}
		return commonColumns.delete(commonColumns.length() - 1, commonColumns.length()).toString();
	}

	public static String getFormatColumnSplit(List<ColumnData> columnList) throws SQLException {
		StringBuffer commonColumns = new StringBuffer();
		for (ColumnData data : columnList) {
			commonColumns.append(data.getFormatColumnName() + "|");
		}
		return commonColumns.delete(commonColumns.length() - 1, commonColumns.length()).toString();
	}
	
	public static String getNullAble(String nullable) {
		if (("YES".equals(nullable)) || ("yes".equals(nullable)) || ("y".equals(nullable)) || ("Y".equals(nullable))) {
			return "Y";
		}
		if (("NO".equals(nullable)) || ("N".equals(nullable)) || ("no".equals(nullable)) || ("n".equals(nullable))) {
			return "N";
		}
		return null;
	}
	
	public static Object getColumnDefaultValue(String columnDefault,String dataType,String characterSetName)
	  {
		if (columnDefault ==null) {
			return null;
		}
		try {
			if(dataType.equalsIgnoreCase("Integer")){  
	            return Integer.parseInt(columnDefault);   
	        }else if(dataType.equalsIgnoreCase("Long")){  
	            return Long.parseLong(columnDefault);  
	        }else if(dataType.equalsIgnoreCase("Float")){  
	            return Float.parseFloat(columnDefault); 
	        }else if(dataType.equalsIgnoreCase("Double")){  
	            return Double.parseDouble(columnDefault); 
	        }else if(dataType.equalsIgnoreCase("BigDecimal")){  
	            return new BigDecimal(columnDefault); 
	        }else if(dataType.equalsIgnoreCase("String")){  
	            return columnDefault; 
	        }else if(dataType.equalsIgnoreCase("Byte[]")){
	        	if (StringUtils.isBlank(characterSetName)) {
	        		return columnDefault.getBytes();    
				}
	            return columnDefault.getBytes(characterSetName);    
	        }
		    return null;
		} catch (Exception e) {
			logger.error(e);
		    return null;
		}
	  }

	public static Object getColumnDefaultValue(String tableName,String columnName) {
		Object columnDefaultValue = null;
		ColumnData columnData = getColumnData(tableName,columnName);
		if (columnData != null) {
			columnDefaultValue = columnData.getColumnDefault();
		}
		return columnDefaultValue;
	}

	public static Boolean isColumnNullAble(String tableName,String columnName) {
		Boolean flag = null;
		ColumnData columnData = getColumnData(tableName,columnName);
		if (columnData != null) {
			if (columnData.getNullable().equalsIgnoreCase("Y")) {
				return true;
			}else if (columnData.getNullable().equalsIgnoreCase("N")) {
				return false;
			}
		}
		return flag;
	}
	
	
	public static Boolean isColumnsNullAble(String tableName,String[] columnNames) {
		Boolean flag = null;
		if (columnNames != null && columnNames.length >1) {
			for (String columnName : columnNames) {
				Boolean columnNullAbleflag = isColumnNullAble(tableName,columnName);
				if (columnNullAbleflag == null) {
					break;
				}else if (columnNullAbleflag) {
					flag = true;
					break;
				}else {
					flag = false;
				}
			}
		}
		return flag;
	}
}