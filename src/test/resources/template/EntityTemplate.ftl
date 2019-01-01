package ${codePackage}#if($!entityPackage).${entityPackage}#end;

import java.math.BigDecimal;
import java.util.Date;

import com.yundaex.common.basic.comm.TransitentCommBasePO;
import com.yundaex.common.dao.annotation.AllowUpdateNull;
import com.yundaex.common.dao.annotation.ColumnUniqueConstraint;
import com.yundaex.common.dao.annotation.CompositeUniqueConstraint;
import com.yundaex.common.dao.annotation.IdIndicator;
import com.yundaex.common.dao.annotation.MvccSupport;
import com.yundaex.common.dao.annotation.PropagationSupport;
import com.yundaex.common.dao.annotation.SkipUpdateOperate;
import com.yundaex.common.security.annotation.SecurityContextConfig;
import com.yundaex.common.validation.annotaion.BigDecimal102Precision;
import com.yundaex.common.validation.annotaion.BigDecimal10Precision;
import com.yundaex.common.validation.annotaion.BigDecimal186Precision;
import com.yundaex.common.validation.annotaion.YDLength;
import com.yundaex.common.validation.annotaion.YDNotNull;


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

#if($!IdIndicator)${IdIndicator}#end
@PropagationSupport
@MvccSupport
//@SecurityContextConfig(secureOrgField="rpwOrgId",secureOwnerField="rpwOwnerId")
#if($!CompositeUniqueConstraint)${CompositeUniqueConstraint}#end
public class ${className}#if($!entitySuffix)${entitySuffix}#end extends TransitentCommBasePO {
	${feilds}
}

