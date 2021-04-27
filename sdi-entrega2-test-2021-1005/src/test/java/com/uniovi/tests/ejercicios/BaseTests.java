package com.uniovi.tests.ejercicios;

import org.junit.After;
import org.junit.Before;
import org.openqa.selenium.WebDriver;

import com.uniovi.tests.DriverSingleton;

public class BaseTests {

	static WebDriver driver = DriverSingleton.getDriver();

	protected static String URL = "https://localhost:8081";

	// Antes de cada prueba se navega al URL home de la aplicaciónn
	@Before
	public void setUp() {
		driver.navigate().to("https://localhost:8081/test/resetDB");
		driver.navigate().to(URL);
	}

	// Después de cada prueba se borran las cookies del navegador
	@After
	public void tearDown() {
		driver.manage().deleteAllCookies();

	}
}
