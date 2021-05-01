package com.uniovi.tests.ejercicios;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.data.DataList;
import com.uniovi.tests.pageobjects.PO_NavView;
import com.uniovi.tests.pageobjects.PO_View;
import com.uniovi.tests.pageobjects.formularios.PO_LoginView;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EjercicioW04_Tests extends BaseTests {

	/**
	 * Mostrar el listado de usuarios y comprobar que se muestran todos los que
	 * existen en el sistema.
	 */
	@Test
	public void Prueba_11() {
		PO_LoginView.loginAdmin();
		PO_NavView.accederPagina("user-list", "/user/list");
		for (int i = 0; i < DataList.maxUser; i++) {
			PO_View.checkText(DataList.usuarios(i).email);
			PO_View.checkText(DataList.usuarios(i).name);
			PO_View.checkText(DataList.usuarios(i).lastName);
		}
	}

}
