package com.uniovi.tests.pageobjects;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import com.uniovi.tests.pageobjects.config.PO_Config;

public class PO_Search extends PO_Config {
	static public void search(String text) {

		WebElement busqueda = driver.findElement(By.name("searchText"));
		busqueda.click();
		busqueda.clear();
		busqueda.sendKeys(text);

		By boton = By.className("btn");
		driver.findElement(boton).click();

	}
}
