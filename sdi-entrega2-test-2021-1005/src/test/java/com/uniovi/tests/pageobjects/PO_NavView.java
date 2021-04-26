package com.uniovi.tests.pageobjects;

import static org.junit.Assert.assertTrue;

import java.util.List;

import org.openqa.selenium.WebElement;

public class PO_NavView {

	/**
	 * CLicka una de las opciones principales (a href) y comprueba que se vaya a la
	 * vista con el elemento de tipo type con el texto Destino
	 * 
	 * @param driver:       apuntando al navegador abierto actualmente.
	 * @param textOption:   Texto de la opción principal.
	 * @param criterio:     "id" or "class" or "text" or "@attribute" or "free". Si
	 *                      el valor de criterio es free es una expresion xpath
	 *                      completa.
	 * @param textoDestino: texto correspondiente a la búsqueda de la página
	 *                      destino.
	 */
	public static void clickOption(String textOption, String criterio, String textoDestino) {
		// CLickamos en la opción de registro y esperamos a que se cargue el enlace de
		// Registro.
		List<WebElement> elementos = PO_View.checkElement("@href", textOption);
		// Tiene que haber un sólo elemento.
		assertTrue(elementos.size() == 1);
		// Ahora lo clickamos
		elementos.get(0).click();
		// Esperamos a que sea visible un elemento concreto
		elementos = PO_View.checkElement(criterio, textoDestino);
		// Tiene que haber un sólo elemento.
		assertTrue(elementos.size() == 1);
	}

	static public void accederPagina(String lista, String elemento) {
		List<WebElement> elementos = null;
		// Pinchamos en la opción de menu de Notas: //li[contains(@id, 'marks-menu')]/a
		elementos = PO_View.checkElement("free", "//li[contains(@id, '" + lista + "')]/a");
		elementos.get(0).click();
		// Pinchamos en la opción de lista de notas.
		elementos = PO_View.checkElement("free", "//a[contains(@href,'" + elemento + "')]");
		elementos.get(0).click();
	}

	/**
	 * Selecciona el enlace de idioma correspondiente al texto textLanguage
	 * 
	 * @param driver:       apuntando al navegador abierto actualmente.
	 * @param textLanguage: el texto que aparece en el enlace de idioma ("English" o
	 *                      "Spanish")
	 */
	public static void changeIdiom(String textLanguage) {
		// clickamos la opción Idioma.
		List<WebElement> elementos = PO_View.checkElement("id", "btnLanguage");
		elementos.get(0).click();
		// Esperamos a que aparezca el menú de opciones.
		elementos = PO_View.checkElement("id", "languageDropdownMenuButton");
		// SeleniumUtils.esperarSegundos(2);
		// CLickamos la opción Inglés partiendo de la opción Español
		elementos = PO_View.checkElement("id", textLanguage);
		elementos.get(0).click();
	}

	static public void logout() {		
		List<WebElement> elementos = PO_View.checkElement("@href", "logout");
		// Tiene que haber un sólo elemento.
		assertTrue(elementos.size() == 1);
		// Ahora lo clickamos
		elementos.get(0).click();
	}
	
	public static void clickButton(String textoBoton) {
		List<WebElement> elementos = PO_View.checkText(textoBoton);
		assertTrue(elementos.size() == 1);
		elementos.get(0).click();

	}
}