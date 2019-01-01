package com.yundaex.wms.outbound.controller;

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
import com.yundaex.wms.outbound.po.RivMainpickStartPrintTemplate;
import com.yundaex.wms.outbound.service.RivMainpickStartPrintTemplateService;

/**
 * <pre>
 *   Title: RivMainpickStartPrintTemplateController.java
 *   Description: 总捡开始打印模板表
 *   Copyright: yundaex.com Copyright (c) 2017
 *   Company: 上海韵达货运有限公司
 * </pre>
 * 
 * @author tonglele
 * @version 1.0
 * @date 2017-11-20
 */
@Controller
@RequestMapping(method = { RequestMethod.POST, RequestMethod.GET }, value = "/outbound/rivMainpickStartPrintTemplate", produces = "plain/text; charset=UTF-8")
public class RivMainpickStartPrintTemplateController {
	
	@Autowired
	private RivMainpickStartPrintTemplateService rivMainpickStartPrintTemplateService; 
	
	
	@RequestMapping(value = "/query.do")
	public @BeanToPayload DataGrid query(@PayloadToBean QueryCriteria qc) {
		Object result = rivMainpickStartPrintTemplateService.query(qc);
		return result;
	}

	@RequestMapping(value = "/queryDetails.do")
	public @BeanToPayload Object queryDetails(@PayloadToBean RivMainpickStartPrintTemplate rivMainpickStartPrintTemplate) {
		Object result = rivMainpickStartPrintTemplateService.queryDetails(rivMainpickStartPrintTemplate);
		return result;
	}
	
	@RequestMapping(value = "/pgmdf.do")
	public @BeanToPayload Object propogationModification(@PayloadToBean List<RivMainpickStartPrintTemplate> list) {
		Object result = rivMainpickStartPrintTemplateService.propogationModification(list);
		return result;
	}
}
