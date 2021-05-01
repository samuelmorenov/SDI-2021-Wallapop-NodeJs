package com.uniovi.tests.ejercicios;

import org.junit.After;
import org.junit.Before;
import org.openqa.selenium.WebDriver;

import com.uniovi.tests.DriverSingleton;

public class BaseTests {

	static WebDriver driver = DriverSingleton.getDriver();

	protected static String URL = "https://localhost:8081";
	
	//Parametros de busqueda de textos
	protected static final String signup_usuarioCorrecto = "Nuevo usuario registrado.";
	protected static final String signup_contraseniaErronea = "Las contraseñas no coinciden.";
	protected static final String signup_emailRepetido = "Ese email ya existe.";
	protected static final String login_incorrecto = "La combinacion usuario-contraseña es incorrecta.";
	protected static final String login_titulo = "Identificación de usuario";
	protected static final String profile_titulo = "Bienvenido de vuelta";
	protected static final String post_incorrecto = "El titulo debe tener minimo 5 caracteres";
	protected static final String own_titulo = "Las ofertas que has creado son las siguientes:";
	protected static final String buy_saldoInsuficiente = "Saldo insuficiente";
	
	
	
	//Bienvenido de vuelta

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
