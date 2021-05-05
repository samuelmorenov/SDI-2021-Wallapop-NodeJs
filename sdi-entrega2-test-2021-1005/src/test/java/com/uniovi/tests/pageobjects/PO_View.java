package com.uniovi.tests.pageobjects;

import java.util.List;

import org.openqa.selenium.WebElement;

import com.uniovi.tests.pageobjects.config.PO_Config;
import com.uniovi.tests.util.SeleniumUtils;

public class PO_View extends PO_Config {

	/**
	 * Espera por la visibilidad de un elemento/s en la vista actualmente cargandose
	 * en driver..
	 * 
	 * @param driver: apuntando al navegador abierto actualmente.
	 * @param type:
	 * @param text:
	 * @return Se retornará la lista de elementos resultantes de la búsqueda.
	 */
	static public List<WebElement> checkElement(String type, String text) {
		return SeleniumUtils.EsperaCargaPagina(type, text, getTimeout());
	}

	static public void checkNoElement(String type, String text) {
		SeleniumUtils.NoEsperaCargaPagina(type, text, getTimeout());
	}

	static public List<WebElement> checkText(String text) {
		return SeleniumUtils.EsperaCargaPagina("text", text, getTimeout());
	}

	static public void checkNoText(String text) {
		SeleniumUtils.NoEsperaCargaPagina("text", text, getTimeout());
	}
}
