package com.uniovi.tests.data;

public class OfferDto {

	public String title;
	public String description;
	public String price;
	public String status;
	public UserDto creator;
	public UserDto buyer;

	public OfferDto() {
		this.buyer = null;
	}

	public OfferDto(String title, String description, String price, String status, UserDto creator) {
		super();
		this.title = title;
		this.description = description;
		this.price = price;
		this.status = status;
		this.creator = creator;
	}

}
