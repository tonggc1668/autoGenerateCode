package com.yundaex.wms.outbound.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.yundaex.common.dao.DataGrid;
import com.yundaex.common.dao.QueryCriteria;
import com.yundaex.common.dao.impl.BaseDaoImpl;
import com.yundaex.common.dao.sql.DBHelper;
import com.yundaex.common.security.annotation.EnableDataSecurity;

import com.yundaex.wms.outbound.po.RivMainpickStartPrintTemplate;
import com.yundaex.wms.outbound.dao.RivMainpickStartPrintTemplateDao;

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

@Repository
public class RivMainpickStartPrintTemplateDaoImpl extends BaseDaoImpl<RivMainpickStartPrintTemplate> implements RivMainpickStartPrintTemplateDao {

	@Override
	//@EnableDataSecurity
	public DataGrid query(QueryCriteria qc) {
		DataGrid dataGrid = super.queryPaginationList(qc);
		return dataGrid;
	}
}
