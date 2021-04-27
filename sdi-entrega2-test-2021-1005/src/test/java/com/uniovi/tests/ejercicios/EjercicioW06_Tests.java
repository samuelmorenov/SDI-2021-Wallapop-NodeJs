package com.uniovi.tests.ejercicios;

import static org.junit.Assert.assertTrue;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EjercicioW06_Tests extends BaseTests {

	/**
	 * Ir al formulario de alta de oferta, rellenarla con datos válidos y pulsar el
	 * botón Submit. Comprobar que la oferta sale en el listado de ofertas de dicho
	 * usuario.
	 */
	@Test
	public void Prueba_15() {
		assertTrue(false);
//		PO_LoginView.loginUser0();
//		PO_PostView.addNew("Oferta Test");
//		
//		PO_NavView.accederPagina("offer-menu", "/offer/own");
//		PO_View.checkElement("text", "Oferta Test");
	}

	/**
	 * Ir al formulario de alta de oferta, rellenarla con datos inválidos (campo
	 * título vacío) y pulsar el botón Submit. Comprobar que se muestra el mensaje
	 * de campo obligatorio.
	 */
	@Test
	public void Prueba_16() {
		assertTrue(false);
//		PO_LoginView.loginUser0();
//		
//		PO_NavView.accederPagina("offer-menu", "/offer/post");
//		PO_PostView.fillForm("", "Oferta Test Descripcion", "10,01");		
//		PO_View.checkKey("Error.empty", PO_Properties.getSPANISH());
	}
}
