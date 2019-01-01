package ${codePackage}#if($!daoImplPackage).${daoImplPackage}#end;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.yundaex.common.dao.DataGrid;
import com.yundaex.common.dao.QueryCriteria;
import com.yundaex.common.dao.impl.BaseDaoImpl;
import com.yundaex.common.dao.sql.DBHelper;
import com.yundaex.common.security.annotation.EnableDataSecurity;

import ${codePackage}#if($!entityPackage).${entityPackage}#end.${className};
import ${codePackage}#if($!daoPackage).${daoPackage}#end.${className}${daoSuffix};

/**
 * <pre>
 *   Title: ${className}${entitySuffix}.${classSuffix}
 *   Description: ${tableComment}
 *   Copyright: ${companyEnglishName} Copyright (c) ${year}
 *   Company: ${companyChineseName}
 * </pre>
 * 
 * @author ${author}
 * @version ${version}
 * @date ${date}
 */

@Repository
public class ${className}${daoSuffix}Impl extends Base${daoSuffix}Impl<${className}> implements ${className}${daoSuffix} {

	@Override
	//@EnableDataSecurity
	public DataGrid query(QueryCriteria qc) {
		DataGrid dataGrid = super.queryPaginationList(qc);
		return dataGrid;
	}
}
