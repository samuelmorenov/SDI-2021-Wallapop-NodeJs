package com.uniovi.tests.ejercicios;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.data.DataList;
import com.uniovi.tests.data.OfferDto;
import com.uniovi.tests.pageobjects.PO_NavView;
import com.uniovi.tests.pageobjects.PO_View;
import com.uniovi.tests.pageobjects.formularios.PO_LoginView;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EjercicioW07_Tests extends BaseTests {

	/**
	 * Mostrar el listado de ofertas para dicho usuario y comprobar que se muestran
	 * todas los que existen para este usuario.
	 */
	@Test
	public void Prueba_17() {
		PO_LoginView.loginUser0();

		PO_NavView.accederPagina("offer-menu", "/offer/own");
		
		String userEmail = DataList.usuarios(0).email;
		for (int i = 0; i < DataList.maxOffer; i++) {
			OfferDto oferta = DataList.ofertas(i);
			if(oferta.creator.equals(userEmail)) {
				PO_View.checkElement("text", oferta.title);
				PO_View.checkElement("text", oferta.description);
				PO_View.checkElement("text", oferta.price);
			}
		}
	}

}
