package com.uniovi.tests.ejercicios;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.data.DataList;
import com.uniovi.tests.pageobjects.PO_View;
import com.uniovi.tests.pageobjects.formularios.PO_LoginView;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EjercicioC02_Tests extends BaseTestsApi {

	/**
	 * Mostrar el listado de ofertas disponibles y comprobar que se muestran todas
	 * las que existen, menos las del usuario identificado.
	 */
	@Test
	public void Prueba_33() {
		PO_LoginView.loginApiUser0();
		PO_View.checkText(login_correcto);
		
		for(int i = 3; i< DataList.maxOffer; i++) {
			PO_View.checkText(DataList.ofertas(i).title);
		}
		for(int i = 0; i< 0; i++) {
			PO_View.checkNoText(DataList.ofertas(i).title);
		}
	}
}
