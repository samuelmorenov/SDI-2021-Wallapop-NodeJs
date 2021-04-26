package com.uniovi.tests.ejercicios;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.pageobjects.PO_NavView;
import com.uniovi.tests.pageobjects.PO_View;
import com.uniovi.tests.pageobjects.formularios.PO_LoginView;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class Ejercicio11_Tests extends BaseTests {

	/**
	 * Ir a la opción de ofertas compradas del usuario y mostrar la lista. Comprobar
	 * que aparecen las ofertas que deben aparecer.
	 */
	@Test
	public void Prueba_26() {
		PO_LoginView.loginUser0();
		PO_NavView.accederPagina("offer-menu", "/offer/purchased");
		PO_View.checkText("Oferta 2");
		PO_View.checkText("Oferta 4");
		PO_View.checkText("Oferta 5");
	}

}
