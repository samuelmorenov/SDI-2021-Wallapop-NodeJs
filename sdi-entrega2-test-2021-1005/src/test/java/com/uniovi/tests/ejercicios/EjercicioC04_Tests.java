package com.uniovi.tests.ejercicios;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.data.DataList;
import com.uniovi.tests.pageobjects.PO_Click;
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
		
		PO_Click.clickText("Conversaciones");
		PO_View.checkText(conversaciones_correcto);
		PO_View.checkText(DataList.usuarios(1).email);
		PO_View.checkText(DataList.ofertas(5).title);
	}
}
