window.history.pushState("", "", "/cliente.html?w=conversations");

this.loadConversations();

function loadConversations() {
    $.ajax({
        url: URLbase + "/chat/conversations",
        type: "GET",
        data: {},
        dataType: 'json',
        headers: {"token": token},
        success: function (respuesta) {
            console.log("Correcto");
        },
        error: function (error) {
            console.log("error");
            chatActive = false;
            $("#contenedor-principal").load("widgets/" + "widget-login.html");
        }
    });
}