package com.uniovi.tests.ejercicios;

import static org.junit.Assert.assertTrue;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EjercicioW03_Tests extends BaseTests {

	/**
	 * Hacer click en la opción de salir de sesión y comprobar que se redirige a la
	 * página de inicio de sesión (Login).
	 */
	@Test
	public void Prueba_09() {
		assertTrue(false);
		//PO_LoginView.loginUser0();
		//PO_NavView.clickOption("logout", "class", "btn btn-primary");
		//PO_View.checkKey("login.message", PO_Properties.getSPANISH());
	}

	/**
	 * Comprobar que el botón cerrar sesión no está visible si el usuario no está
	 * autenticado.
	 */
	@Test
	public void Prueba_10() {
		assertTrue(false);
		//PO_LoginView.loginUser0();
		//PO_NavView.clickOption("logout", "class", "btn btn-primary");
		//PO_View.checkNoKey("logout.message", PO_Properties.getSPANISH());
	}

}
