package com.uniovi.tests.ejercicios;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.pageobjects.PO_Language;
import com.uniovi.tests.pageobjects.PO_NavView;
import com.uniovi.tests.pageobjects.formularios.PO_LoginView;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class Ejercicio12_Tests extends BaseTests {

	/**
	 * Visualizar al menos cuatro páginas haciendo el cambio español/inglés/español
	 * (comprobando que algunas de las etiquetas cambian al idioma correspondiente).
	 * Página principal/Opciones principales de usuario/Listado de usuarios /Vista
	 * de alta de oferta.
	 */
	@Test
	public void Prueba_27() {
		// Login
		PO_NavView.clickOption("login", "class", "btn btn-primary");
		PO_Language.checkChangeIdiom("login.login");

		// Opciones principales de usuario
		PO_LoginView.loginUser0();
		PO_NavView.accederPagina("user-profile", "/user/profile");
		PO_Language.checkChangeIdiom("user.profile.wellcome", "user.profile.intro");
		PO_NavView.logout();

		// Listado de usuarios
		PO_LoginView.loginAdmin();
		PO_NavView.accederPagina("user-list", "/user/list");
		PO_Language.checkChangeIdiom("list.title", "list.intro");
		PO_NavView.logout();

		// Vista de alta de oferta
		PO_LoginView.loginUser0();
		PO_NavView.accederPagina("offer-menu", "/offer/post");
		PO_Language.checkChangeIdiom("offer.post.title");
		PO_NavView.logout();
	}
}
