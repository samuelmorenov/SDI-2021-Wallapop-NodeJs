package com.uniovi.tests.pageobjects.formularios;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import com.uniovi.tests.pageobjects.PO_Click;
import com.uniovi.tests.pageobjects.config.PO_Config;

public class PO_ChatView extends PO_Config {

	static public void sendMessage(String message) {

		WebElement chat = driver.findElement(By.name("chat"));
		chat.click();
		chat.clear();
		chat.sendKeys(message);
		
		PO_Click.clickText("Enviar");

	}
	
}
