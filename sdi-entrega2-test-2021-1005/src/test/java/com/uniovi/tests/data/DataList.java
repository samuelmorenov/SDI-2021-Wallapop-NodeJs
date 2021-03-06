package com.uniovi.tests.data;

public class DataList {

	static final String[] roles = { "ROLE_USER", "ROLE_ADMIN" };
	static final String[] status = { "CREATED", "SOLDOUT" };

	public static final int maxUser = 6;
	public static final int maxOffer = 8;

	public final static UserDto admin = new UserDto("admin@email.com", "Admin", "Istrador", "admin", roles[1]);

	public final static UserDto usuarios(int iterator) {
		UserDto[] list = new UserDto[maxUser];
		list[0] = new UserDto("pedro@email.com", "Pedro", "Díaz", "123456", roles[0]);
		list[1] = new UserDto("maria@email.com", "María", "Rodríguez", "123456", roles[0]);
		list[2] = new UserDto("lucas@email.com", "Lucas", "Núñez", "123456", roles[0]);
		list[3] = new UserDto("marta@email.com", "Marta", "Almonte", "123456", roles[0]);
		list[4] = new UserDto("pelayo@email.com", "Pelayo", "Valdes", "123456", roles[0]);
		list[5] = new UserDto("florentina@email.com", "Florentina", "Azul", "123456", roles[0]);
		return list[iterator];
	}

	public final static UserDto usuariosTest(int iterator) {
		UserDto[] list = new UserDto[1];
		list[0] = new UserDto("liliana@email.com", "Liliana", "Gomez", "123456", roles[0]);

		return list[iterator];
	}

	public final static OfferDto ofertas(int iterator) {
		OfferDto[] list = new OfferDto[maxOffer];
		
		list[0] = new OfferDto("Titulo Oferta 1", "Creada por pedro, sin comprar", 
				"10.01", status[0], usuarios(0).email, null);
		
		list[1] = new OfferDto("Titulo Oferta 2", "Creada por pedro, comprada por maria", 
				"10.01", status[1], usuarios(0).email, usuarios(1).email);
		
		list[2] = new OfferDto("Titulo Oferta 3", "Creada por pedro, comprada por maria", 
				"10.01", status[1], usuarios(0).email, usuarios(1).email);
		
		list[3] = new OfferDto("Titulo Oferta 4", "Creada por maria, sin comprar", 
				"50", status[0], usuarios(1).email, null);
		
		list[4] = new OfferDto("Titulo Oferta 5", "Creada por maria, sin comprar", 
				"100", status[0], usuarios(1).email, null);
		
		list[5] = new OfferDto("Titulo Oferta 6", "Creada por maria, sin comprar",  
				"150", status[0], usuarios(1).email, null);
		
		list[6] = new OfferDto("Titulo Oferta 7", "Creada por maria, comprada por pedro", 
				"10.01", status[1], usuarios(1).email, usuarios(0).email);
		
		list[7] = new OfferDto("Titulo Oferta 8", "Creada por maria, comprada por lucas", 
				"10.01", status[1], usuarios(1).email, usuarios(2).email);
		
		return list[iterator];
	}

}
