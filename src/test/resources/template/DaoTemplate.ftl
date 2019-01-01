package ${codePackage}#if($!daoPackage).${daoPackage}#end;

import com.yundaex.common.dao.BaseDao;
import com.yundaex.common.dao.DataGrid;
import com.yundaex.common.dao.QueryCriteria;
import ${codePackage}#if($!entityPackage).${entityPackage}#end.${className};

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
 
public interface ${className}${daoSuffix} extends BaseDao<${className}> {

	public DataGrid query(QueryCriteria qc);
	
}
