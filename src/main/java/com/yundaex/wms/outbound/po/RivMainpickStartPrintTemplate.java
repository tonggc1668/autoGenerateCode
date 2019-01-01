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

@IdIndicator(name="onh_id")@PropagationSupport
@MvccSupport
//@SecurityContextConfig(secureOrgField="rpwOrgId",secureOwnerField="rpwOwnerId")
public class RivMainpickStartPrintTemplate extends TransitentCommBasePO {
		//出库通知单ID	@YDNotNull(message = "出库通知单ID不能为空！")	private Integer onhId;		//出库通知单号	@YDNotNull(message = "出库通知单号不能为空！")	@YDLength(max=100,message = "出库通知单号最大长度为100！")	private String onhNoticeNo;		//货主单号	@YDLength(max=40,message = "货主单号最大长度为40！")	private String onhOwnerNo;		//波次任务单ID	private Integer onhWaveRoundId;		//波次任务单号	@YDLength(max=100,message = "波次任务单号最大长度为100！")	private String onhWaveRoundNo;		//打印模板ID	private Integer ptpId;		//打印模板文件名	@YDLength(max=100,message = "打印模板文件名最大长度为100！")	private String ptpFileName;		//模板类型:全局模板;域模板	@YDLength(max=40,message = "模板类型:全局模板;域模板最大长度为40！")	private String ptpTemplateType;		//所属域ID	private Integer ptpDomainId;		//创建用户ID	private Integer createUserId;		//创建时间	private Date createTime;		//修改用户ID	private Integer updateUserId;		//修改时间	private Date updateTime;		//版本号:新增资料为 0，每次修改加 1	private Integer versionNumber;		public Integer getOnhId() {	    return this.onhId;	}	public void setOnhId(Integer onhId) {	    this.onhId=onhId;	}	public String getOnhNoticeNo() {	    return this.onhNoticeNo;	}	public void setOnhNoticeNo(String onhNoticeNo) {	    this.onhNoticeNo=onhNoticeNo;	}	public String getOnhOwnerNo() {	    return this.onhOwnerNo;	}	public void setOnhOwnerNo(String onhOwnerNo) {	    this.onhOwnerNo=onhOwnerNo;	}	public Integer getOnhWaveRoundId() {	    return this.onhWaveRoundId;	}	public void setOnhWaveRoundId(Integer onhWaveRoundId) {	    this.onhWaveRoundId=onhWaveRoundId;	}	public String getOnhWaveRoundNo() {	    return this.onhWaveRoundNo;	}	public void setOnhWaveRoundNo(String onhWaveRoundNo) {	    this.onhWaveRoundNo=onhWaveRoundNo;	}	public Integer getPtpId() {	    return this.ptpId;	}	public void setPtpId(Integer ptpId) {	    this.ptpId=ptpId;	}	public String getPtpFileName() {	    return this.ptpFileName;	}	public void setPtpFileName(String ptpFileName) {	    this.ptpFileName=ptpFileName;	}	public String getPtpTemplateType() {	    return this.ptpTemplateType;	}	public void setPtpTemplateType(String ptpTemplateType) {	    this.ptpTemplateType=ptpTemplateType;	}	public Integer getPtpDomainId() {	    return this.ptpDomainId;	}	public void setPtpDomainId(Integer ptpDomainId) {	    this.ptpDomainId=ptpDomainId;	}	public Integer getCreateUserId() {	    return this.createUserId;	}	public void setCreateUserId(Integer createUserId) {	    this.createUserId=createUserId;	}	public Date getCreateTime() {	    return this.createTime;	}	public void setCreateTime(Date createTime) {	    this.createTime=createTime;	}	public Integer getUpdateUserId() {	    return this.updateUserId;	}	public void setUpdateUserId(Integer updateUserId) {	    this.updateUserId=updateUserId;	}	public Date getUpdateTime() {	    return this.updateTime;	}	public void setUpdateTime(Date updateTime) {	    this.updateTime=updateTime;	}	public Integer getVersionNumber() {	    return this.versionNumber;	}	public void setVersionNumber(Integer versionNumber) {	    this.versionNumber=versionNumber;	}
}

