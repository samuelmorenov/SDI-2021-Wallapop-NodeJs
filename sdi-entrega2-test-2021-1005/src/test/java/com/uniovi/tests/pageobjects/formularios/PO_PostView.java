package com.uniovi.tests.pageobjects.formularios;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import com.uniovi.tests.pageobjects.PO_NavView;
import com.uniovi.tests.pageobjects.config.PO_Config;

public class PO_PostView extends PO_Config {

	public static void fillForm(String titlep, String descriptionp, String pricep) {
		WebElement title = driver.findElement(By.name("title"));
		title.click();
		title.clear();
		title.sendKeys(titlep);
		WebElement description = driver.findElement(By.name("description"));
		description.click();
		description.clear();
		description.sendKeys(descriptionp);
		WebElement price = driver.findElement(By.name("price"));
		price.click();
		price.clear();
		price.sendKeys(pricep);
		// Pulsar el boton de Alta.
		By boton = By.className("btn");
		driver.findElement(boton).click();
		
	}
	
	public static void addNew(String text) {
		PO_NavView.accederPagina("offer-menu", "/offer/post");
		PO_PostView.fillForm(text, text+" - Descripcion de al menos 20 caracteres.", "10,01");
	}

}
