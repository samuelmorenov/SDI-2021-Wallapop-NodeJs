package com.uniovi.tests.ejercicios;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.pageobjects.PO_Click;
import com.uniovi.tests.pageobjects.PO_NavView;
import com.uniovi.tests.pageobjects.PO_View;
import com.uniovi.tests.pageobjects.formularios.PO_LoginView;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EjercicioW08_Tests extends BaseTests {

	/**
	 * Ir a la lista de ofertas, borrar la primera oferta de la lista, comprobar que
	 * la lista se actualiza y que la oferta desaparece.
	 */
	@Test
	public void Prueba_18() {
		PO_LoginView.loginUser0();

		PO_NavView.accederPagina("offer-menu", "/offer/own");
		String id = PO_Click.clickClass("btn");

		PO_View.checkText(own_titulo);
		PO_View.checkNoElement("id", id);
	}

	/**
	 * Ir a la lista de ofertas, borrar la última oferta de la lista, comprobar que
	 * la lista se actualiza y que la oferta desaparece.
	 */
	@Test
	public void Prueba_19() {
		PO_LoginView.loginUser0();

		PO_NavView.accederPagina("offer-menu", "/offer/own");
		String id = PO_Click.clickClass("btn");

		PO_View.checkText(own_titulo);
		PO_View.checkNoElement("id", id);
	}

}
