package com.tll.entity;

import com.tll.util.NameUtils;

public class ColumnData
{
  public static final String OPTION_REQUIRED = "required:true";
  public static final String OPTION_NUMBER_INSEX = "precision:2,groupSeparator:','";
  private String columnName;
  private String dataType;
  private String columnComment;
  private String columnType;
  private String charMaxLength = "";
  private String nullable;
  private String scale;
  private String precision;
  private String classType = "";

  private String optionType = "";
  
  
  private Object columnDefault;
  private String columnKey;
  private String extra;
  private String charSetName;

  public String getFormatColumnName() {
	return columnName!=null?NameUtils.getHumnName(columnName):"";
}
  public String getColumnName()
  {
    return columnName;
  }
  public void setColumnName(String columnName) {
    this.columnName = columnName;
  }
  public String getDataType() {
    return dataType;
  }
  public void setDataType(String dataType) {
    this.dataType = dataType;
  }
  public String getColumnComment() {
    return columnComment;
  }
  public void setColumnComment(String columnComment) {
    this.columnComment = columnComment;
  }
  public String getScale() {
    return scale;
  }
  public String getPrecision() {
    return precision;
  }
  public void setScale(String scale) {
    this.scale = scale;
  }
  public void setPrecision(String precision) {
    this.precision = precision;
  }
  public String getClassType() {
    return classType;
  }
  public String getOptionType() {
    return optionType;
  }
  public String getNullable() {
    return nullable;
  }
  public void setClassType(String classType) {
    this.classType = classType;
  }
  public void setOptionType(String optionType) {
    this.optionType = optionType;
  }
  public void setNullable(String nullable) {
    this.nullable = nullable;
  }
  public String getColumnType() {
    return columnType;
  }
  public void setColumnType(String columnType) {
    this.columnType = columnType;
  }
public Object getColumnDefault() {
	return columnDefault;
}
public void setColumnDefault(Object columnDefault) {
	this.columnDefault = columnDefault;
}
public String getColumnKey() {
	return columnKey;
}
public void setColumnKey(String columnKey) {
	this.columnKey = columnKey;
}
public String getExtra() {
	return extra;
}
public void setExtra(String extra) {
	this.extra = extra;
}
public String getCharMaxLength() {
	return charMaxLength;
}
public void setCharMaxLength(String charMaxLength) {
	this.charMaxLength = charMaxLength;
}
public String getCharSetName() {
	return charSetName;
}
public void setCharSetName(String charSetName) {
	this.charSetName = charSetName;
}
}