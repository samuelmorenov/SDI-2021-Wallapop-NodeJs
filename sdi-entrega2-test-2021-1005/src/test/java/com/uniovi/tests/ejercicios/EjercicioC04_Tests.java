package com.uniovi.tests.ejercicios;

import static org.junit.Assert.assertTrue;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.pageobjects.PO_View;
import com.uniovi.tests.pageobjects.formularios.PO_LoginView;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EjercicioC04_Tests extends BaseTestsApi {

	/**
	 * Mostrar el listado de conversaciones ya abiertas. Comprobar que el listado
	 * contiene las conversaciones que deben ser.
	 */
	@Test
	public void Prueba_36() {
		PO_LoginView.loginApiUser0();
		PO_View.checkText(login_correcto);

		assertTrue(false); // TODO

	}
}
