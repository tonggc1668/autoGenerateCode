package ${codePackage}#if($!serviceImplPackage).${serviceImplPackage}#end;

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

import ${codePackage}#if($!entityPackage).${entityPackage}#end.${className};
import ${codePackage}#if($!daoPackage).${daoPackage}#end.${className}${daoSuffix};
import ${codePackage}#if($!servicePackage).${servicePackage}#end.${className}${serviceSuffix};

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

@Service
@Transactional(propagation = Propagation.REQUIRED, rollbackFor = { Exception.class })
public class ${className}${serviceImplSuffix} implements ${className}Service {

	@Autowired
	private ${className}${daoSuffix} ${lowerName}${daoSuffix};

	@Override
	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
	public DataGrid query(QueryCriteria qc) {
		YDAssert.isNotNull(qc);
		YDAssert.isNotNull(qc.getCriterias());
		DataGrid dataGrid = ${lowerName}${daoSuffix}.query(qc);
		return dataGrid;
	}
	
	@Override
	@Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true) 
	public Object queryDetails(${className} ${lowerName}) {
		Object object = null;
		YDAssert.isNotNull(${lowerName});
		//YDAssert.isNotNull(${lowerName}.getDptId());
		//object = ${lowerName}${daoSuffix}.load(${lowerName}.getDptId());
		return object;
	}

	@Override
	public Object propogationModification(List<${className}> list) {
	    List<${className}> returnValue = new ArrayList<${className}>();
	    if (list != null && list.size()>0) {
            doDel(list, returnValue);
		    doUpdate(list, returnValue);
		    doInsert(list, returnValue);
		}
		return returnValue;
	}

	private void doDel(List<${className}> list, List<${className}> returnValue) {
		List<${className}> listsWant = BeanFilterUtil.filterModificationType(list,ModificationConstant.MOD_DEL);
		listsWant = ${lowerName}${daoSuffix}.batchDelele(listsWant);
		returnValue.addAll(listsWant);
	}
	
	private void doUpdate(List<${className}> list, List<${className}> returnValue) {
		List<${className}> listsWant = BeanFilterUtil.filterModificationType(list,ModificationConstant.MOD_UPDATE);
		listsWant = ${lowerName}${daoSuffix}.batchErase(listsWant);
		returnValue.addAll(listsWant);
	}
	
	private void doInsert(List<${className}> list, List<${className}> returnValue) {
		List<${className}> listsWant = BeanFilterUtil.filterModificationType(list,ModificationConstant.MOD_INSERT);
		listsWant = ${lowerName}${daoSuffix}.batchSave(listsWant);
		returnValue.addAll(listsWant);
	}
}
