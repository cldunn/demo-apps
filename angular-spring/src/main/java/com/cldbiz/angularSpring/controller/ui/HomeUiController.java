package com.cldbiz.angularSpring.controller.ui;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cldbiz.angularSpring.controller.BaseController;

@RestController
@RequestMapping("/rest/ui/home")
public class HomeUiController extends BaseController {
	private static final Logger logger = LoggerFactory.getLogger(HomeUiController.class);
	
	  @RequestMapping(value="/resource")
	  public Map<String,Object> home() {
	    Map<String,Object> model = new HashMap<String,Object>();
	    model.put("id", UUID.randomUUID().toString());
	    model.put("content", "Hello World");
	    return model;
	  }

}
