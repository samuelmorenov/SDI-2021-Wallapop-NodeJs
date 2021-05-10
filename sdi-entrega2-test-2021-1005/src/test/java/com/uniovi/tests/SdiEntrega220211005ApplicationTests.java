package com.uniovi.tests;

import org.junit.AfterClass;
import org.junit.FixMethodOrder;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

import com.uniovi.tests.ejercicios.*;

@RunWith(Suite.class)
@SuiteClasses({
	EjercicioW01_Tests.class,
	EjercicioW02_Tests.class,
	EjercicioW03_Tests.class,
	EjercicioW04_Tests.class,
	EjercicioW05_Tests.class,
	EjercicioW06_Tests.class,
	EjercicioW07_Tests.class,
	EjercicioW08_Tests.class,
	EjercicioW09_Tests.class,
	EjercicioW10_Tests.class,
	EjercicioW11_Tests.class,
	EjercicioC01_Tests.class,
	EjercicioC02_Tests.class,
	EjercicioC03_Tests.class,
	EjercicioC04_Tests.class,
	EjercicioC05_Tests.class
})
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class SdiEntrega220211005ApplicationTests {

	// Al finalizar la ultima prueba
	@AfterClass
	static public void end() {
		// Cerramos el navegador al finalizar las pruebas
		DriverSingleton.getDriver().quit();
	}

}
