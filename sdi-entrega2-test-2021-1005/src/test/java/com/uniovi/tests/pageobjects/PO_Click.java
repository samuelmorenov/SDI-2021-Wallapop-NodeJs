package com.uniovi.tests.pageobjects;

import static org.junit.Assert.assertTrue;

import java.util.List;

import org.openqa.selenium.WebElement;

public class PO_Click {
	
	/**
	 * Hace click en el elemento con el texto proporcionado
	 */
	public static void clickText(String texto) {
		List<WebElement> elementos = PO_View.checkText(texto);
		assertTrue(elementos.size() == 1);
		elementos.get(0).click();
	}

	/**
	 * Busca el elemento con la clase proporcionada, clicka el primero de la lista
	 * que encuentre y devuelve el id del elemento clickado
	 * 
	 * @param classToSearch Texto de la class a buscar
	 * @return id clickado
	 */
	public static String clickClass(String classToSearch) {
		return clickClass(classToSearch, 0);
	}

	/**
	 * Busca el elemento con la clase proporcionada, clicka el elemento de la
	 * losicion de en lista y devuelve el id del elemento clickado
	 * 
	 * @param classToSearch Texto de la class a buscar
	 * @param position      posicion del elemento que se quiere clickar
	 * @return id clickado
	 */
	public static String clickClass(String classToSearch, int position) {
		List<WebElement> botones = PO_View.checkElement("class", classToSearch);
		WebElement boton = botones.get(position);
		String id = boton.getAttribute("id");
		boton.click();
		return id;
	}
}
