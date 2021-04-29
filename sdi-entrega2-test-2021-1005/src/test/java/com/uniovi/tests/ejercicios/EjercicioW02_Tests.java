package com.uniovi.tests.ejercicios;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.data.DataList;
import com.uniovi.tests.pageobjects.PO_NavView;
import com.uniovi.tests.pageobjects.PO_View;
import com.uniovi.tests.pageobjects.formularios.PO_LoginView;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EjercicioW02_Tests extends BaseTests {

	/** Inicio de sesión con datos válidos. */
	@Test
	public void Prueba_05() {
		PO_LoginView.loginUser0();
		PO_View.checkElement("text", profile_titulo);
	}

	/**
	 * Inicio de sesión con datos inválidos (email existente, pero contraseña
	 * incorrecta).
	 */
	@Test
	public void Prueba_06() {
		PO_NavView.clickOption("login", "class", "btn btn-primary");
		PO_LoginView.fillForm(DataList.usuarios(0).email, "incorrecta");
		PO_View.checkElement("text", login_incorrecto);
	}

	/**
	 * Inicio de sesión con datos inválidos (campo email o contraseña vacíos).
	 */
	@Test
	public void Prueba_07() {
		PO_NavView.clickOption("login", "class", "btn btn-primary");
		PO_LoginView.fillForm("", "");
		PO_View.checkNoElement("text", profile_titulo);
	}

	/**
	 * Inicio de sesión con datos inválidos (email no existente en la aplicación).
	 */
	@Test
	public void Prueba_08() {
		PO_NavView.clickOption("login", "class", "btn btn-primary");
		PO_LoginView.fillForm("email@incorrecto.com", DataList.usuarios(0).password);
		PO_View.checkElement("text", login_incorrecto);
	}

}
