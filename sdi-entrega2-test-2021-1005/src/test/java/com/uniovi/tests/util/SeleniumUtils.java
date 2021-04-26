package com.uniovi.tests.util;


import static org.junit.Assert.assertTrue;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.uniovi.tests.DriverSingleton;

public class SeleniumUtils {
	
	private static WebDriver driver = DriverSingleton.getDriver();

	
	/**
	 * Espera por la visibilidad de un elemento/s en la vista actualmente cargandose en driver. Para ello se empleará una consulta xpath.
	 * @param driver: apuntando al navegador abierto actualmente.
	 * @param xpath: consulta xpath.
	 * @param timeout: el tiempo máximo que se esperará por la aparición del elemento a buscar con xpath
	 * @return  Se retornará la lista de elementos resultantes de la búsqueda con xpath.
	 */
	static private List<WebElement> EsperaCargaPaginaxpath(String xpath, int timeout)
	{
		WebElement resultado = 
				(new WebDriverWait(driver, timeout)).until(ExpectedConditions.visibilityOfElementLocated(By.xpath(xpath)));
		assertTrue(resultado != null);
		List<WebElement> elementos = driver.findElements(By.xpath(xpath));
	
		return elementos;					
	}

	static private void NoEsperaCargaPaginaxpath(String xpath, int timeout)
	{
		List<WebElement> list = driver.findElements(By.xpath(xpath));		
		assertTrue(list.size() == 0);		
	}

	/**
	 * Espera por la visibilidad de un elemento/s en la vista actualmente cargandose en driver. Para ello se empleará una consulta xpath 
	 * según varios criterios..
	 * 
	 * @param driver: apuntando al navegador abierto actualmente.
	 * @param criterio: "id" or "class" or "text" or "@attribute" or "free". Si el valor de criterio es free es una expresion xpath completa. 
	 * @param text: texto correspondiente al criterio.
	 * @param timeout: el tiempo máximo que se esperará por la apareción del elemento a buscar con criterio/text.
	 * @return Se retornará la lista de elementos resultantes de la búsqueda.
	 */
	static public List<WebElement> EsperaCargaPagina(String criterio, String text, int timeout)
	{
		String busqueda;
		if (criterio.equals("id")) busqueda = "//*[contains(@id,'" + text + "')]";
		else if (criterio.equals("class")) busqueda = "//*[contains(@class,'" + text + "')]";
		else if (criterio.equals("text")) busqueda = "//*[contains(text(),'" + text + "')]";
		else if (criterio.equals("free")) busqueda = text;
		else busqueda = "//*[contains("+criterio+",'" + text + "')]";
	
		return EsperaCargaPaginaxpath(busqueda, timeout);
	}
	
	static public void NoEsperaCargaPagina(String criterio, String text, int timeout)
	{
		String busqueda;
		if (criterio.equals("id")) busqueda = "//*[contains(@id,'" + text + "')]";
		else if (criterio.equals("class")) busqueda = "//*[contains(@class,'" + text + "')]";
		else if (criterio.equals("text")) busqueda = "//*[contains(text(),'" + text + "')]";
		else if (criterio.equals("free")) busqueda = text;
		else busqueda = "//*[contains("+criterio+",'" + text + "')]";
	
		NoEsperaCargaPaginaxpath(busqueda, timeout);
	}
	
	/**
	 * Aborta si el "texto" no está presente en la página actual
	 * @param driver: apuntando al navegador abierto actualmente.
	 * @param texto: texto a buscar
	 */
	static public void textoPresentePagina(String texto)
	{
		List<WebElement> list = driver.findElements(By.xpath("//*[contains(text(),'" + texto + "')]"));		
		assertTrue("Texto " + texto + " no localizado!", list.size() > 0);			
	}

	/**
	 * PROHIBIDO USARLO PARA VERSIÓN FINAL.
	 * Esperar "segundos" durante la ejecucion del navegador 
	 * @param driver: apuntando al navegador abierto actualmente.
	 * @param segundos: Segundos de bloqueo de la ejecución en el navegador.
	 */
	@Deprecated
	static public void esperarSegundos(int segundos){
		synchronized(driver){
			try {
				driver.wait(segundos * 1000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}
}
