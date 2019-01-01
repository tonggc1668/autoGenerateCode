package com.tll.controller;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;

import com.tll.service.CodeGenerateService;

public class CodeGeneraterControler {
	public static void main(String[] args) {
		String tableName="riv_mainpick_start_print_template";
		 //String tableName="riv_replenishment_warning_l";
		 //String tableName="riv_outbound_notice_h_archive";
		 CodeGenerateService.codeGenerate(tableName);
	}
}
 