package com.uniovi.tests.ejercicios;

import java.util.List;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;
import org.openqa.selenium.WebElement;

import com.uniovi.tests.pageobjects.PO_NavView;
import com.uniovi.tests.pageobjects.PO_Search;
import com.uniovi.tests.pageobjects.PO_View;
import com.uniovi.tests.pageobjects.config.PO_Properties;
import com.uniovi.tests.pageobjects.formularios.PO_LoginView;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class Ejercicio10_Tests extends BaseTests {

	/**
	 * Sobre una búsqueda determinada (a elección del desarrollador), comprar una
	 * oferta que deja un saldo positivo en el contador del comprador. Comprobar que
	 * el contador se actualiza correctamente en la vista del comprador.
	 */
	@Test
	public void Prueba_23() {
		PO_LoginView.loginUser0();
		PO_NavView.accederPagina("offer-menu", "/offer/all");
		
		
		PO_Search.search("Oferta 5");
		List<WebElement> botones = PO_View.checkElement("class", "comprar");
		botones.get(0).click();
		PO_View.checkText("14.0");
		
	}

	/**
	 * Sobre una búsqueda determinada (a elección del desarrollador), comprar una
	 * oferta que deja un saldo 0 en el contador del comprador. Comprobar que el
	 * contador se actualiza correctamente en la vista del comprador.
	 */
	@Test
	public void Prueba_24() {
		PO_LoginView.loginUser0();
		PO_NavView.accederPagina("offer-menu", "/offer/all");
		PO_Search.search("Oferta 4");

		List<WebElement> botones = PO_View.checkElement("class", "comprar");
		botones.get(0).click();
		
		PO_View.checkText("0.0");
	}

	/**
	 * Sobre una búsqueda determinada (a elección del desarrollador), intentar
	 * comprar una oferta que esté por encima de saldo disponible del comprador. Y
	 * comprobar que se muestra el mensaje de saldo no suficiente.
	 */
	@Test
	public void Prueba_25() {
		PO_LoginView.loginUser0();
		PO_NavView.accederPagina("offer-menu", "/offer/all");
		PO_Search.search("Oferta 6");

		List<WebElement> botones = PO_View.checkElement("class", "comprar");
		botones.get(0).click();
		
		PO_View.checkKey("offer.buy.error.message", PO_Properties.getSPANISH());
	}

}
