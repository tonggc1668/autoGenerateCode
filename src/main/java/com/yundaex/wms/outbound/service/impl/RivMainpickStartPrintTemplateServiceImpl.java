package com.yundaex.wms.outbound.service.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import com.alibaba.fastjson.JSON;
import com.yundaex.common.dao.DataGrid;
import com.yundaex.common.dao.ModificationConstant;
import com.yundaex.common.dao.QueryCriteria;
import com.yundaex.common.security.helper.DataSecurityHelper;
import com.yundaex.common.security.annotation.EnableDataSecurity;
import com.yundaex.common.validation.asserts.YDAssert;
import com.yundaex.utility.bean.filter.BeanFilterUtil;
import com.yundaex.wms.outbound.dto.WaveSearchOutBoundNoticeDTO;

import com.yundaex.wms.outbound.po.RivMainpickStartPrintTemplate;
import com.yundaex.wms.outbound.dao.RivMainpickStartPrintTemplateDao;
import com.yundaex.wms.outbound.service.RivMainpickStartPrintTemplateService;

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

@Service
@Transactional(propagation = Propagation.REQUIRED, rollbackFor = { Exception.class })
public class RivMainpickStartPrintTemplateServiceImpl implements RivMainpickStartPrintTemplateService {

	@Autowired
	private RivMainpickStartPrintTemplateDao rivMainpickStartPrintTemplateDao;

	@Override
	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	public DataGrid query(QueryCriteria qc) {
		YDAssert.isNotNull(qc);
		YDAssert.isNotNull(qc.getCriterias());
		DataGrid dataGrid = rivMainpickStartPrintTemplateDao.query(qc);
		return dataGrid;
	}
	
	@Override
	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true) 
	public Object queryDetails(RivMainpickStartPrintTemplate rivMainpickStartPrintTemplate) {
		Object object = null;
		YDAssert.isNotNull(rivMainpickStartPrintTemplate);
		//YDAssert.isNotNull(rivMainpickStartPrintTemplate.getDptId());
		//object = rivMainpickStartPrintTemplateDao.load(rivMainpickStartPrintTemplate.getDptId());
		return object;
	}

	@Override
	public Object propogationModification(List<RivMainpickStartPrintTemplate> list) {
	    List<RivMainpickStartPrintTemplate> returnValue = new ArrayList<RivMainpickStartPrintTemplate>();
	    if (list != null && list.size()>0) {
            doDel(list, returnValue);
		    doUpdate(list, returnValue);
		    doInsert(list, returnValue);
		}
		return returnValue;
	}

	private void doDel(List<RivMainpickStartPrintTemplate> list, List<RivMainpickStartPrintTemplate> returnValue) {
		List<RivMainpickStartPrintTemplate> listsWant = BeanFilterUtil.filterModificationType(list,ModificationConstant.MOD_DEL);
		listsWant = rivMainpickStartPrintTemplateDao.batchDelele(listsWant);
		returnValue.addAll(listsWant);
	}
	
	private void doUpdate(List<RivMainpickStartPrintTemplate> list, List<RivMainpickStartPrintTemplate> returnValue) {
		List<RivMainpickStartPrintTemplate> listsWant = BeanFilterUtil.filterModificationType(list,ModificationConstant.MOD_UPDATE);
		listsWant = rivMainpickStartPrintTemplateDao.batchErase(listsWant);
		returnValue.addAll(listsWant);
	}
	
	private void doInsert(List<RivMainpickStartPrintTemplate> list, List<RivMainpickStartPrintTemplate> returnValue) {
		List<RivMainpickStartPrintTemplate> listsWant = BeanFilterUtil.filterModificationType(list,ModificationConstant.MOD_INSERT);
		listsWant = rivMainpickStartPrintTemplateDao.batchSave(listsWant);
		returnValue.addAll(listsWant);
	}
}
