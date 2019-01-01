package com.yundaex.wms.outbound.service;

import java.util.List;

import com.yundaex.common.dao.DataGrid;
import com.yundaex.common.dao.QueryCriteria;
import com.yundaex.wms.outbound.po.RivMainpickStartPrintTemplate;

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

public interface RivMainpickStartPrintTemplateService {

	public DataGrid query(QueryCriteria qc);
 
	public Object queryDetails(RivMainpickStartPrintTemplate rivMainpickStartPrintTemplate);
	
	public Object propogationModification(List<RivMainpickStartPrintTemplate> list);

}
