package com.uniovi.tests.ejercicios;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.data.UserList;
import com.uniovi.tests.pageobjects.PO_NavView;
import com.uniovi.tests.pageobjects.PO_View;
import com.uniovi.tests.pageobjects.formularios.PO_RegisterView;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EjercicioW01_Tests extends BaseTests {
	
	private static final String usuarioCorrecto = "Nuevo usuario registrado.";
	private static final String contraseniaErronea = "Las contraseñas no coinciden.";
	private static final String emailRepetido = "Ese email ya existe.";

	/** Registro de Usuario con datos válidos. */
	@Test
	public void Prueba_01() {
		PO_NavView.clickOption("signup", "class", "btn btn-primary");
		PO_RegisterView.fillForm(UserList.usuariosTest(0).email, UserList.usuariosTest(0).name,
				UserList.usuariosTest(0).lastName, UserList.usuariosTest(0).password,
				UserList.usuariosTest(0).password);
		PO_View.checkElement("text", usuarioCorrecto);
	}

	/** Registro de Usuario con datos inválidos: email vacío */
	@Test
	public void Prueba_02_a() {
		PO_NavView.clickOption("signup", "class", "btn btn-primary");
		PO_RegisterView.fillForm("", UserList.usuariosTest(0).name, UserList.usuariosTest(0).lastName,
				UserList.usuariosTest(0).password, UserList.usuariosTest(0).password);
		PO_View.checkNoElement("text", usuarioCorrecto);
	}

	/** Registro de Usuario con datos inválidos: nombre vacío */
	@Test
	public void Prueba_02_b() {
		PO_NavView.clickOption("signup", "class", "btn btn-primary");
		PO_RegisterView.fillForm("correo_prueba@email.com", "", UserList.usuariosTest(0).lastName,
				UserList.usuariosTest(0).password, UserList.usuariosTest(0).password);
		PO_View.checkNoElement("text", usuarioCorrecto);
	}

	/** Registro de Usuario con datos inválidos: apellidos vacío */
	@Test
	public void Prueba_02_c() {
		PO_NavView.clickOption("signup", "class", "btn btn-primary");
		PO_RegisterView.fillForm("correo_prueba@email.com", UserList.usuariosTest(0).name, "",
				UserList.usuariosTest(0).password, UserList.usuariosTest(0).password);
		PO_View.checkNoElement("text", usuarioCorrecto);
	}

	/**
	 * Registro de Usuario con datos inválidos (repetición de contraseña inválida).
	 */
	@Test
	public void Prueba_03() {
		PO_NavView.clickOption("signup", "class", "btn btn-primary");
		PO_RegisterView.fillForm("correo_prueba@email.com", UserList.usuariosTest(0).name,
				UserList.usuariosTest(0).lastName, UserList.usuariosTest(0).password,
				UserList.usuariosTest(0).password + "e");
		PO_View.checkElement("text", contraseniaErronea);

	}

	/** Registro de Usuario con datos inválidos (email existente). */
	@Test
	public void Prueba_04() {
		PO_NavView.clickOption("signup", "class", "btn btn-primary");
		PO_RegisterView.fillForm(UserList.usuarios(0).email, UserList.usuariosTest(0).name,
				UserList.usuariosTest(0).lastName, UserList.usuariosTest(0).password,
				UserList.usuariosTest(0).password);
		PO_View.checkElement("text", emailRepetido);
	}

}
