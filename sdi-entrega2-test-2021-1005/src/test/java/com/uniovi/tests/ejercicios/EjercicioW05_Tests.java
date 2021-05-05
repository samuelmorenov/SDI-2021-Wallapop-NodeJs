package com.uniovi.tests.ejercicios;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.data.DataList;
import com.uniovi.tests.pageobjects.PO_Click;
import com.uniovi.tests.pageobjects.PO_NavView;
import com.uniovi.tests.pageobjects.PO_View;
import com.uniovi.tests.pageobjects.formularios.PO_LoginView;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EjercicioW05_Tests extends BaseTests {

	/**
	 * Ir a la lista de usuarios, borrar el primer usuario de la lista, comprobar
	 * que la lista se actualiza y que el usuario desaparece.
	 */
	@Test
	public void Prueba_12() {
		PO_LoginView.loginAdmin();
		PO_NavView.accederPagina("user-list", "/user/list");
		
		PO_Click.clickClass("checkbox", 0);
		
		PO_Click.clickText("Eliminar");

		PO_View.checkText(list_titulo);
		PO_View.checkNoText(DataList.usuarios(0).email);
	}

	/**
	 * Ir a la lista de usuarios, borrar el último usuario de la lista, comprobar
	 * que la lista se actualiza y que el usuario desaparece.
	 */
	@Test
	public void Prueba_13() {
		PO_LoginView.loginAdmin();
		PO_NavView.accederPagina("user-list", "/user/list");
		
		PO_Click.clickClass("checkbox", DataList.maxUser-1);

		PO_Click.clickText("Eliminar");

		PO_View.checkText(list_titulo);
		PO_View.checkNoText(DataList.usuarios(DataList.maxUser-1).email);
	}

	/**
	 * Ir a la lista de usuarios, borrar 3 usuarios, comprobar que la lista se
	 * actualiza y que los usuarios desaparecen.
	 */
	@Test
	public void Prueba_14() {
		PO_LoginView.loginAdmin();
		PO_NavView.accederPagina("user-list", "/user/list");
		
		PO_Click.clickClass("checkbox", 0);
		PO_Click.clickClass("checkbox", 1);
		PO_Click.clickClass("checkbox", 2);

		PO_Click.clickText("Eliminar");

		PO_View.checkText(list_titulo);
		PO_View.checkNoText(DataList.usuarios(0).email);
		PO_View.checkNoText(DataList.usuarios(1).email);
		PO_View.checkNoText(DataList.usuarios(2).email);
	}

}
