package com.uniovi.tests.ejercicios;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.data.DataList;
import com.uniovi.tests.pageobjects.PO_Click;
import com.uniovi.tests.pageobjects.PO_View;
import com.uniovi.tests.pageobjects.formularios.PO_LoginView;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EjercicioC05_Tests extends BaseTestsApi {

	/**
	 * Sobre el listado de conversaciones ya abiertas. Pinchar el enlace Eliminar de
	 * la primera y comprobar que el listado se actualiza correctamente.
	 */
	@Test
	public void Prueba_37() {
		PO_LoginView.loginApiUser0();
		PO_View.checkText(login_correcto);

		PO_Click.clickText("Conversaciones");
		PO_View.checkText(conversaciones_correcto);
		PO_View.checkText(DataList.ofertas(5).title);
		PO_Click.clickClass("btn btn-default eliminar", 0);
		PO_Click.clickText("Ofertas");
		PO_Click.clickText("Conversaciones");
		PO_View.checkText(conversaciones_correcto);
		PO_View.checkNoText(DataList.ofertas(5).title);
	}

	/**
	 * Sobre el listado de conversaciones ya abiertas. Pinchar el enlace Eliminar de
	 * la última y comprobar que el listado se actualiza correctamente.
	 */
	@Test
	public void Prueba_38() {
		PO_LoginView.loginApiUser0();
		PO_View.checkText(login_correcto);

		PO_Click.clickText("Conversaciones");
		PO_View.checkText(conversaciones_correcto);
		PO_View.checkText(DataList.ofertas(6).title);
		PO_Click.clickClass("btn btn-default eliminar", 1);
		PO_Click.clickText("Ofertas");
		PO_Click.clickText("Conversaciones");
		PO_View.checkText(conversaciones_correcto);
		PO_View.checkNoText(DataList.ofertas(6).title);
	}
}
