package ${codePackage}#if($!servicePackage).${servicePackage}#end;

import java.util.List;

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

public interface ${className}${serviceSuffix} {

	public DataGrid query(QueryCriteria qc);
 
	public Object queryDetails(${className} ${lowerName});
	
	public Object propogationModification(List<${className}> list);

}
