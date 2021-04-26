package com.uniovi.tests.ejercicios;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.pageobjects.PO_View;
import com.uniovi.tests.pageobjects.config.PO_Properties;
import com.uniovi.tests.pageobjects.formularios.PO_LoginView;
import com.uniovi.tests.util.SeleniumUtils;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class Ejercicio13_Tests extends BaseTests {

	/**
	 * Intentar acceder sin estar autenticado a la opción de listado de usuarios del
	 * administrador. Se deberá volver al formulario de login.
	 */
	@Test
	public void Prueba_28() {
		driver.navigate().to(URL + "/user/list");
		PO_View.checkKey("login.login", PO_Properties.getSPANISH());
		PO_View.checkNoKey("list.intro", PO_Properties.getSPANISH());
	}

	/**
	 * Intentar acceder sin estar autenticado a la opción de listado de ofertas
	 * propias de un usuario estándar. Se deberá volver al formulario de login.
	 */
	@Test
	public void Prueba_29() {
		driver.navigate().to(URL + "/user/own");
		PO_View.checkKey("login.login", PO_Properties.getSPANISH());
		PO_View.checkNoKey("list.intro", PO_Properties.getSPANISH());
	}

	/**
	 * Estando autenticado como usuario estándar intentar acceder a la opción de
	 * listado de usuarios del administrador. Se deberá indicar un mensaje de acción
	 * prohibida.
	 */
	@Test
	public void Prueba_30() {
		PO_LoginView.loginUser0();
		driver.navigate().to(URL + "/user/list");
		//PO_View.checkText("HTTP Status 403");
		SeleniumUtils.textoPresentePagina("HTTP Status 403");
		PO_View.checkNoKey("list.intro", PO_Properties.getSPANISH());
	}

}
