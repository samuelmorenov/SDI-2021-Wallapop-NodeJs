package com.uniovi.tests.ejercicios;

import org.junit.After;
import org.junit.Before;
import org.openqa.selenium.WebDriver;

import com.uniovi.tests.DriverSingleton;

public class BaseTestsApi {
	
	static WebDriver driver = DriverSingleton.getDriver();

	protected static String URL = "https://localhost:8081/cliente.html";
	
	//Parametros de busqueda de textos
	protected static final String login_correcto = "Lista de ofertas";
	protected static final String login_incorrecto = "La combinacion usuario-contraseña es incorrecta.";
	protected static final String conversaciones_correcto = "Lista de Conversaciones";

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