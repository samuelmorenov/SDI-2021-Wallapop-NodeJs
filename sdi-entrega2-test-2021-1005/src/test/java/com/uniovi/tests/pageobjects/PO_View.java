package com.uniovi.tests.pageobjects;

import java.util.List;

import org.openqa.selenium.WebElement;

import com.uniovi.tests.pageobjects.config.PO_Config;
import com.uniovi.tests.util.SeleniumUtils;

public class PO_View extends PO_Config {

	/**
	 * Espera por la visibilidad de un texto correspondiente a la propiedad key en
	 * el idioma locale en la vista actualmente cargandose en driver..
	 * 
	 * @param driver: apuntando al navegador abierto actualmente.
	 * @param key:    clave del archivo de propiedades.
	 * @param locale: Retorna el índice correspondient al idioma. 0 p.SPANISH y 1
	 *                p.ENGLISH.
	 * @return Se retornará la lista de elementos resultantes de la búsqueda.
	 */
	@Deprecated
	static public List<WebElement> checkKey(String key, int locale) {
		return SeleniumUtils.EsperaCargaPagina("text", getP().getString(key, locale), getTimeout());
	}

	@Deprecated
	static public void checkNoKey(String key, int locale) {
		SeleniumUtils.NoEsperaCargaPagina("text", getP().getString(key, locale), getTimeout());
	}

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
