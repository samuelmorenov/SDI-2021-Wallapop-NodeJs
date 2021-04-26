package com.uniovi.tests.ejercicios;

import static org.junit.Assert.assertTrue;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.pageobjects.PO_NavView;
import com.uniovi.tests.pageobjects.PO_Search;
import com.uniovi.tests.pageobjects.PO_View;
import com.uniovi.tests.pageobjects.formularios.PO_LoginView;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class Ejercicio09_Tests extends BaseTests {

	/**
	 * Hacer una búsqueda con el campo vacío y comprobar que se muestra la página
	 * que corresponde con el listado de las ofertas existentes en el sistema
	 */
	@Test
	public void Prueba_21() {
		PO_LoginView.loginUser0();
		PO_NavView.accederPagina("offer-menu", "/offer/all");
		int total = PO_View.checkElement("class", "fila").size();

		PO_NavView.accederPagina("offer-menu", "/offer/all");
		PO_Search.search("");

		int parcial = PO_View.checkElement("class", "fila").size();

		assertTrue(total == parcial);
	}

	/**
	 * Hacer una búsqueda escribiendo en el campo un texto que no exista y comprobar
	 * que se muestra la página que corresponde, con la lista de ofertas vacía.
	 */
	@Test
	public void Prueba_22() {
		PO_LoginView.loginUser0();

		PO_NavView.accederPagina("offer-menu", "/offer/all");
		PO_Search.search("NombreInexistente");

		PO_View.checkNoElement("class", "fila");
	}

}
