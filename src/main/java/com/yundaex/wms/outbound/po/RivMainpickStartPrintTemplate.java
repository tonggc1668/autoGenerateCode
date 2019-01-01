package com.yundaex.wms.outbound.po;

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
 *   Title: RivMainpickStartPrintTemplate.java
 *   Description: 总捡开始打印模板表
 *   Copyright: yundaex.com Copyright (c) 2017
 *   Company: 上海韵达货运有限公司
 * </pre>
 * 
 * @author tonglele
 * @version 1.0
 * @date 2017-11-20
 */

@IdIndicator(name="onh_id")
@MvccSupport
//@SecurityContextConfig(secureOrgField="rpwOrgId",secureOwnerField="rpwOwnerId")
public class RivMainpickStartPrintTemplate extends TransitentCommBasePO {
	
}
