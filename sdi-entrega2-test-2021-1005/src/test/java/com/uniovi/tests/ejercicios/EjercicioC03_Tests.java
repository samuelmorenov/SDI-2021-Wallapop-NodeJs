package com.uniovi.tests.ejercicios;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.uniovi.tests.pageobjects.PO_Click;
import com.uniovi.tests.pageobjects.PO_View;
import com.uniovi.tests.pageobjects.formularios.PO_ChatView;
import com.uniovi.tests.pageobjects.formularios.PO_LoginView;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EjercicioC03_Tests extends BaseTestsApi {

	/**
	 * Sobre una búsqueda determinada de ofertas (a elección de desarrollador),
	 * enviar un mensaje a una oferta concreta. Se abriría dicha conversación por
	 * primera vez. Comprobar que el mensaje aparece en el listado de mensajes.
	 */
	@Test
	public void Prueba_34() {
		PO_LoginView.loginApiUser0();
		PO_View.checkText(login_correcto);
		PO_Click.clickClass("btn btn-default chat", 1);
		
		String message = "Hola, ¿hay alguna posibilidad de bajar el precio?";
		
		PO_View.checkText("Chat de la oferta:");
		
		PO_ChatView.sendMessage(message);
		
		PO_View.checkText("Chat de la oferta:");
		PO_View.checkText(message);

	}

	/**
	 * Sobre el listado de conversaciones enviar un mensaje a una conversación ya
	 * abierta. Comprobar que el mensaje aparece en el listado de mensajes.
	 */
	@Test
	public void Prueba_35() {
		
		PO_LoginView.loginApiUser0();
		PO_View.checkText(login_correcto);
		PO_Click.clickClass("btn btn-default chat", 2);
		
		String message = "Ok, muchas gracias.";
		PO_View.checkText("Chat de la oferta:");
		PO_View.checkText("Hola, buenas. ¿Habria alguna posibilidad de que se bajara el precio?");
		PO_View.checkText("Hola. Buenas tardes.");
		PO_View.checkText("Lo siento mucho, pero el precio no es negociable.");
		
		PO_ChatView.sendMessage(message);
		PO_View.checkText("Chat de la oferta:");
		PO_View.checkText("Hola, buenas. ¿Habria alguna posibilidad de que se bajara el precio?");
		PO_View.checkText("Hola. Buenas tardes.");
		PO_View.checkText("Lo siento mucho, pero el precio no es negociable.");
		PO_View.checkText(message);
	}

}
