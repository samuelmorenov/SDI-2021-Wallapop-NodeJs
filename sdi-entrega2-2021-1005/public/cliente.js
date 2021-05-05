var token;
var URLbase = "https://localhost:8081/api";
var user = "";
var chatActive = false;

$("#contenedor-principal").load("widgets/widget-login.html");

function widgetOfertas() {
    chatActive = false;
    $("#contenedor-principal").load("widgets/widget-offers.html");
}
