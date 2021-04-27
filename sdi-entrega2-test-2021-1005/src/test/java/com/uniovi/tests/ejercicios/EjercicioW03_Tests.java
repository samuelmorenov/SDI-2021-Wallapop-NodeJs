package com.uniovi.tests.ejercicios;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.pageobjects.PO_NavView;
import com.uniovi.tests.pageobjects.PO_View;
import com.uniovi.tests.pageobjects.formularios.PO_LoginView;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EjercicioW03_Tests extends BaseTests {
	
	private static final String login = "Identificación de usuario";

	/**
	 * Hacer click en la opción de salir de sesión y comprobar que se redirige a la
	 * página de inicio de sesión (Login).
	 */
	@Test
	public void Prueba_09() {
		PO_LoginView.loginUser0();
		PO_NavView.clickOption("logout", "class", "btn btn-primary");
		PO_View.checkElement("text", login);
	}

	/**
	 * Comprobar que el botón cerrar sesión no está visible si el usuario no está
	 * autenticado.
	 */
	@Test
	public void Prueba_10() {
		PO_LoginView.loginUser0();
		PO_NavView.clickOption("logout", "class", "btn btn-primary");
		PO_View.checkNoElement("text", "checkElement");
	}

}
