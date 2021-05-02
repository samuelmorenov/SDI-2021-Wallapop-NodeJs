package com.uniovi.tests.pageobjects.formularios;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import com.uniovi.tests.data.DataList;
import com.uniovi.tests.pageobjects.PO_NavView;
import com.uniovi.tests.pageobjects.config.PO_Config;

public class PO_LoginView extends PO_Config {
	static public void fillForm(String emailp, String passwordp) {

		WebElement email = driver.findElement(By.name("email"));
		email.click();
		email.clear();
		email.sendKeys(emailp);

		WebElement password = driver.findElement(By.name("password"));
		password.click();
		password.clear();
		password.sendKeys(passwordp);

		By boton = By.className("btn");
		driver.findElement(boton).click();

	}

	static public void loginUser0() {
		PO_NavView.clickOption("login", "class", "btn btn-primary");
		PO_LoginView.fillForm(DataList.usuarios(0).email, DataList.usuarios(0).password);
	}
	

	static public void loginApiUser0() {
		PO_LoginView.fillForm(DataList.usuarios(0).email, DataList.usuarios(0).password);
	}

	public static void loginAdmin() {
		PO_NavView.clickOption("login", "class", "btn btn-primary");
		PO_LoginView.fillForm(DataList.admin.email, DataList.admin.password);
	}
}
