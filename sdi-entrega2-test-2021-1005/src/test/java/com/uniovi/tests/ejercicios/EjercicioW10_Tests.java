package com.uniovi.tests.ejercicios;

import static org.junit.Assert.assertTrue;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EjercicioW10_Tests extends BaseTests {

	/**
	 * Sobre una búsqueda determinada (a elección de desarrollador), comprar una
	 * oferta que deja un saldo positivo en el contador del comprobador. Y comprobar
	 * que el contador se actualiza correctamente en la vista del comprador.
	 */
	@Test
	public void Prueba_23() {
		assertTrue(false);
//		PO_LoginView.loginUser0();
//		PO_NavView.accederPagina("offer-menu", "/offer/all");
//
//		PO_Search.search("Oferta 5");
//		List<WebElement> botones = PO_View.checkElement("class", "comprar");
//		botones.get(0).click();
//		PO_View.checkText("14.0");

	}

	/**
	 * Sobre una búsqueda determinada (a elección de desarrollador), comprar una
	 * oferta que deja un saldo 0 en el contador del comprobador. Y comprobar que el
	 * contador se actualiza correctamente en la vista del comprador.
	 */
	@Test
	public void Prueba_24() {
		assertTrue(false);
//		PO_LoginView.loginUser0();
//		PO_NavView.accederPagina("offer-menu", "/offer/all");
//		PO_Search.search("Oferta 4");
//
//		List<WebElement> botones = PO_View.checkElement("class", "comprar");
//		botones.get(0).click();
//
//		PO_View.checkText("0.0");
	}

	/**
	 * Sobre una búsqueda determinada (a elección de desarrollador), intentar
	 * comprar una oferta que esté por encima de saldo disponible del comprador. Y
	 * comprobar que se muestra el mensaje de saldo no suficiente.
	 */
	@Test
	public void Prueba_25() {
		assertTrue(false);
//		PO_LoginView.loginUser0();
//		PO_NavView.accederPagina("offer-menu", "/offer/all");
//		PO_Search.search("Oferta 6");
//
//		List<WebElement> botones = PO_View.checkElement("class", "comprar");
//		botones.get(0).click();
//
//		PO_View.checkKey("offer.buy.error.message", PO_Properties.getSPANISH());
	}

}
