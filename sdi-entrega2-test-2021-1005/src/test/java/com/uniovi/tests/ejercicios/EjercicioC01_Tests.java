package com.uniovi.tests.ejercicios;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.data.DataList;
import com.uniovi.tests.pageobjects.PO_View;
import com.uniovi.tests.pageobjects.formularios.PO_LoginView;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EjercicioC01_Tests extends BaseTestsApi {

	/**
	 * Inicio de sesión con datos válidos.
	 */
	@Test
	public void Prueba_30() {
		PO_LoginView.fillForm(DataList.usuarios(0).email, DataList.usuarios(0).password);
		PO_View.checkText(login_correcto);
	}

	/**
	 * Inicio de sesión con datos inválidos (email existente, pero contraseña
	 * incorrecta).
	 */
	@Test
	public void Prueba_31() {
		PO_LoginView.fillForm(DataList.usuarios(0).email, "incorrecta");
		PO_View.checkText(login_incorrecto);
	}

	/**
	 * Inicio de sesión con datos válidos (campo email o contraseña vacíos).
	 */
	@Test
	public void Prueba_32() {
		PO_LoginView.fillForm(DataList.usuarios(0).email, "");
		PO_View.checkText(login_incorrecto);
	}

}
