package com.uniovi.tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class DriverSingleton {

	private static WebDriver driver = null;

	public static void setDriver() {
		String PathFirefox65 = "C:\\Program Files\\Mozilla Firefox\\firefox.exe";
		String Geckdriver024 = ".\\lib\\geckodriver024win64.exe";

		System.setProperty("webdriver.firefox.bin", PathFirefox65);
		System.setProperty("webdriver.gecko.driver", Geckdriver024);
		driver = new FirefoxDriver();
	}

	public static WebDriver getDriver() {
		if (driver == null) setDriver();
		return driver;
	}

}
