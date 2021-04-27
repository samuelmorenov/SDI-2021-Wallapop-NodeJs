package com.uniovi.tests.pageobjects.config;

import org.openqa.selenium.WebDriver;

import com.uniovi.tests.DriverSingleton;

public class PO_Config {

	@Deprecated
	private static PO_Properties p = new PO_Properties("messages");
	private static int timeout = 2;
	protected static WebDriver driver = DriverSingleton.getDriver();

	public static int getTimeout() {
		return timeout;
	}

	@Deprecated
	public static PO_Properties getP() {
		return p;
	}

}
