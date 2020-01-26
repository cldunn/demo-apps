package com.cldbiz.angularSpring.util;

import org.apache.commons.text.StringEscapeUtils;
import org.owasp.validator.html.AntiSamy;
import org.owasp.validator.html.CleanResults;
import org.owasp.validator.html.Policy;
import org.owasp.validator.html.PolicyException;
import org.owasp.validator.html.ScanException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.ResourceLoader;

import com.cldbiz.angularSpring.common.JsonException;
import com.cldbiz.angularSpring.common.JsonFailure;
import com.cldbiz.angularSpring.common.JsonMessage;
import com.cldbiz.angularSpring.spring.bean.AfwMessageSource;

import io.netty.util.internal.StringUtil;

public class AntiSamyUtil {
	private static final Logger logger = LoggerFactory.getLogger(AntiSamyUtil.class);
	private static Policy policy;
	
	@Autowired
	ResourceLoader resourceLoader;
	
	@Autowired
	private static AfwMessageSource messagSource;
	
	static {
		initPolicy();
	}
	
	private static void initPolicy() {
		try {
			policy = Policy.getInstance(AntiSamyUtil.class.getClassLoader().getResourceAsStream("antisamy.xml"));
		} catch (PolicyException ex) {
			throw new JsonFailure(new JsonException(ex));
		}
	}
	
	public static String clean(String input) {
		String cleanHtml = null;
		if (!StringUtil.isNullOrEmpty(input)) {
			AntiSamy as = new AntiSamy();
			try {
				CleanResults cr = as.scan(input, policy);
				if (StringUtil.isNullOrEmpty(cr.getCleanHTML()) || cr.getNumberOfErrors() > 0) {
					throw new JsonFailure(new JsonMessage(messagSource.getMessage("security.antisamy.errors"), cr.getErrorMessages()));
				}
				else {
					cleanHtml = StringEscapeUtils.unescapeHtml4(cr.getCleanHTML());
				}
			} catch (ScanException | PolicyException ex) {
				throw new JsonFailure(new JsonException(ex));
			}
		}
		
		return cleanHtml;
	}
}
