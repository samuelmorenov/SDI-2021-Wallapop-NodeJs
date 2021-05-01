package com.uniovi.tests.ejercicios;

import java.util.List;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;
import org.openqa.selenium.WebElement;

import com.uniovi.tests.data.DataList;
import com.uniovi.tests.pageobjects.PO_NavView;
import com.uniovi.tests.pageobjects.PO_Search;
import com.uniovi.tests.pageobjects.PO_View;
import com.uniovi.tests.pageobjects.formularios.PO_LoginView;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EjercicioW10_Tests extends BaseTests {

	/**
	 * Sobre una búsqueda determinada (a elección de desarrollador), comprar una
	 * oferta que deja un saldo positivo en el contador del comprobador. Y comprobar
	 * que el contador se actualiza correctamente en la vista del comprador.
	 */
	@Test
	public void Prueba_23() {
		PO_LoginView.loginUser0();
		PO_NavView.accederPagina("offer-menu", "/offer/all");

		PO_Search.search(DataList.ofertas(3).title);
		List<WebElement> botones = PO_View.checkElement("class", "comprar");
		botones.get(0).click();
		PO_View.checkText("Saldo: 50");

	}

	/**
	 * Sobre una búsqueda determinada (a elección de desarrollador), comprar una
	 * oferta que deja un saldo 0 en el contador del comprobador. Y comprobar que el
	 * contador se actualiza correctamente en la vista del comprador.
	 */
	@Test
	public void Prueba_24() {
		PO_LoginView.loginUser0();
		PO_NavView.accederPagina("offer-menu", "/offer/all");
		PO_Search.search(DataList.ofertas(4).title);

		List<WebElement> botones = PO_View.checkElement("class", "comprar");
		botones.get(0).click();
		
		PO_View.checkText("Saldo: 0");
	}

	/**
	 * Sobre una búsqueda determinada (a elección de desarrollador), intentar
	 * comprar una oferta que esté por encima de saldo disponible del comprador. Y
	 * comprobar que se muestra el mensaje de saldo no suficiente.
	 */
	@Test
	public void Prueba_25() {
		PO_LoginView.loginUser0();
		PO_NavView.accederPagina("offer-menu", "/offer/all");
		PO_Search.search(DataList.ofertas(5).title);

		List<WebElement> botones = PO_View.checkElement("class", "comprar");
		botones.get(0).click();
		PO_View.checkText(buy_saldoInsuficiente);
	}

}
