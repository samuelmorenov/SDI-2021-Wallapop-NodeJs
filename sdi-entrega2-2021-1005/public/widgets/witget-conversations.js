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
            chatActive = false;
            offersTable(respuesta);
        },
        error: function (error) {
            console.log("error");
            chatActive = false;
            $("#contenedor-principal").load("widgets/" + "widget-login.html");
        }
    });
}

function offersTable(conversations) {
    $("#tbody-conversations").empty();
    for (let i = 0; i < conversations.length; i++) {
        $("#tbody-conversations").append(
            "<tr id=" + conversations[i]._id + ">" +
            "<td>" + conversations[i].ownerUser + "</td>" +
            "<td>" + conversations[i].offerTitle + "</td>" +
            "<td>" + this.createButton(conversations[i]) + "</td>" +
            "</tr>"
        );
    }
}

function createButton(conversation) {
    var id = conversation._id;
    var parametros = "\'" + id + "\'";
    var button =
        "<button type='submit' class='btn btn-default chat' " +
        "id='button-chat-" + id + "' " +
        "onclick=chat(" + parametros + ")>" +
        "✉</button>";
    return button;
}

function chat(id) {

}