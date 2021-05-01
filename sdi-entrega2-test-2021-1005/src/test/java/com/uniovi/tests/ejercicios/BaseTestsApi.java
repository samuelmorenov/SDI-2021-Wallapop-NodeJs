package com.uniovi.tests.ejercicios;

import org.junit.After;
import org.junit.Before;

import com.uniovi.tests.DriverSingleton;

public class BaseTestsApi {

	protected static String URL = "https://localhost:8081/cliente.html";

	// Antes de cada prueba se navega al URL home de la aplicaciónn
	@Before
	public void setUp() {
		DriverSingleton.getDriver().navigate().to(URL);
	}

	// Después de cada prueba se borran las cookies del navegador
	@After
	public void tearDown() {
		DriverSingleton.getDriver().manage().deleteAllCookies();
	}
}