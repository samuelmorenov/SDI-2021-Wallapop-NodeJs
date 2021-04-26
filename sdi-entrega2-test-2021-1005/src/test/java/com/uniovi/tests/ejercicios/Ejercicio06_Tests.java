package com.uniovi.tests.ejercicios;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.pageobjects.PO_NavView;
import com.uniovi.tests.pageobjects.PO_View;
import com.uniovi.tests.pageobjects.config.PO_Properties;
import com.uniovi.tests.pageobjects.formularios.PO_LoginView;
import com.uniovi.tests.pageobjects.formularios.PO_PostView;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class Ejercicio06_Tests extends BaseTests {

	/**
	 * Ir al formulario de alta de oferta, rellenarla con datos válidos y pulsar el
	 * botón Submit. Comprobar que la oferta sale en el listado de ofertas de dicho
	 * usuario.
	 */
	@Test
	public void Prueba_16() {
		PO_LoginView.loginUser0();
		PO_PostView.addNew("Oferta Test");
		
		PO_NavView.accederPagina("offer-menu", "/offer/own");
		PO_View.checkElement("text", "Oferta Test");
	}

	/**
	 * Ir al formulario de alta de oferta, rellenarla con datos inválidos (campo
	 * título vacío) y pulsar el botón Submit. Comprobar que se muestra el mensaje
	 * de campo obligatorio.
	 */
	@Test
	public void Prueba_17() {
		PO_LoginView.loginUser0();
		
		PO_NavView.accederPagina("offer-menu", "/offer/post");
		PO_PostView.fillForm("", "Oferta Test Descripcion", "10,01");		
		PO_View.checkKey("Error.empty", PO_Properties.getSPANISH());
	}
}
