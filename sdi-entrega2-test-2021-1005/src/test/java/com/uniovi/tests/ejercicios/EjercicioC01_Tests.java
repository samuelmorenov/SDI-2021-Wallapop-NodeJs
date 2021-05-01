package com.uniovi.tests.ejercicios;

import static org.junit.Assert.assertTrue;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EjercicioC01_Tests extends BaseTestsApi {

	/**
	 * Inicio de sesión con datos válidos.
	 */
	@Test
	public void Prueba_30() {
		assertTrue(false);
	}

	/**
	 * Inicio de sesión con datos inválidos (email existente, pero contraseña
	 * incorrecta).
	 */
	@Test
	public void Prueba_31() {
		assertTrue(false);
	}

	/**
	 * Inicio de sesión con datos válidos (campo email o contraseña vacíos).
	 */
	@Test
	public void Prueba_32() {
		assertTrue(false);
	}

}
