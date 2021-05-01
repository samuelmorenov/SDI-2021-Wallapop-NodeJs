window.history.pushState("", "", "/cliente.html?w=offers");

this.loadOffers();

function loadOffers() {
    console.log("loadOffers");
    $.ajax({
        url: URLbase + "/offer/all",
        type: "GET",
        data: {},
        dataType: 'json',
        headers: {"token": token},
        success: function (respuesta) {
            console.log("success");
            offers = respuesta;
            offersTable(offers);
        },
        error: function (error) {
            console.log("error");
            $("#contenedor-principal").load("widgets/" + "widget-login.html");
        }
    });
}

function offersTable(offers) {
    $("#tbody-offers").empty();
    for (let i = 0; i < offers.length; i++) {
        $("#tbody-offers").append(
            "<tr id=" + offers[i]._id + ">" +
            "<td>" + offers[i].title + "</td>" +
            "<td>" + offers[i].description + "</td>" +
            "<td>" + offers[i].price + "</td>" +
            "<td>" + "</td>" +
            "</tr>"
        );
    }
}