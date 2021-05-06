window.history.pushState("", "", "/cliente.html?w=offers");

this.loadOffers();

function loadOffers() {
    $.ajax({
        url: URLbase + "/offer/all",
        type: "GET",
        data: {},
        dataType: 'json',
        headers: {"token": token},
        success: function (respuesta) {
            offers = respuesta;
            chatActive = false;
            offersTable(offers);
        },
        error: function (error) {
            console.log("error");
            chatActive = false;
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
            "<td>" + offers[i].creator + "</td>" +
            "<td>" + this.createButton(offers[i]) + "</td>" +
            "</tr>"
        );
    }
}

function createButton(offers) {
    var id = offers._id;
    var parametros = "\'" + id + "\'";
    var button =
        "<button type='submit' class='btn btn-default chat' " +
        "id='button-chat-" + id + "' " +
        "onclick=chat(" + parametros + ")>" +
        "✉</button>";
    return button;
}

function chat(id) {
    chat = {
        offerId : id
    };
    chatActive = true;
    $("#contenedor-principal").load("widgets/widget-chat.html");
}