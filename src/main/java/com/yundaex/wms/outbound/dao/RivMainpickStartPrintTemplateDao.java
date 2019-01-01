package com.yundaex.wms.outbound.dao;

import com.yundaex.common.dao.BaseDao;
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
 
public interface RivMainpickStartPrintTemplateDao extends BaseDao<RivMainpickStartPrintTemplate> {

	public DataGrid query(QueryCriteria qc);
	
}
