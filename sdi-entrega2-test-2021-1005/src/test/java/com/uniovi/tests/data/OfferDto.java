package com.uniovi.tests.data;

public class OfferDto {

	public String title;
	public String description;
	public String price;
	public String status;
	public String creator;
	public String buyer;

	public OfferDto() {
	}

	public OfferDto(String title, String description, String price, String status, String creator, String buyer) {
		super();
		this.title = title;
		this.description = description;
		this.price = price;
		this.status = status;
		this.creator = creator;
		this.buyer = buyer;
	}

}
