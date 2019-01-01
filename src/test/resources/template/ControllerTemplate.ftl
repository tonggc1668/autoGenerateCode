package ${codePackage}#if($!controllerPackage).${controllerPackage}#end;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.yundaex.common.bidiboxing.convert.annotation.BeanToPayload;
import com.yundaex.common.bidiboxing.convert.annotation.PayloadToBean;
import com.yundaex.common.dao.QueryCriteria;
import ${codePackage}#if($!entityPackage).${entityPackage}#end.${className};
import ${codePackage}#if($!servicePackage).${servicePackage}#end.${className}Service;

/**
 * <pre>
 *   Title: ${className}${controllerSuffix}.${classSuffix}
 *   Description: ${tableComment}
 *   Copyright: ${companyEnglishName} Copyright (c) ${year}
 *   Company: ${companyChineseName}
 * </pre>
 * 
 * @author ${author}
 * @version ${version}
 * @date ${date}
 */
@Controller
@RequestMapping(method = { RequestMethod.POST, RequestMethod.GET }, value = "/${urlPrefix}/${lowerName}", produces = "plain/text; charset=UTF-8")
public class ${className}${controllerSuffix} {
	
	@Autowired
	private ${className}Service ${lowerName}Service; 
	
	
	@RequestMapping(value = "/query.do")
	public @BeanToPayload DataGrid query(@PayloadToBean QueryCriteria qc) {
		Object result = ${lowerName}Service.query(qc);
		return result;
	}

	@RequestMapping(value = "/queryDetails.do")
	public @BeanToPayload Object queryDetails(@PayloadToBean ${className} ${lowerName}) {
		Object result = ${lowerName}Service.queryDetails(${lowerName});
		return result;
	}
	
	@RequestMapping(value = "/pgmdf.do")
	public @BeanToPayload Object propogationModification(@PayloadToBean List<${className}> list) {
		Object result = ${lowerName}Service.propogationModification(list);
		return result;
	}
}
