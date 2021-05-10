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
            "<td>" + this.createButtonBorrar(conversations[i]) + "</td>" +
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
        "Acceder al chat</button>";
    return button;
}

function chat(id) {
    chat = {
        offerId : null,
        conversationId : id
    };
    chatActive = true;
    $("#contenedor-principal").load("widgets/widget-chat.html");
}

function createButtonBorrar(conversation) {
    var id = conversation._id;
    var parametros = "\'" + id + "\'";
    var button =
        "<button type='submit' class='btn btn-default eliminar' " +
        "id='button-eliminar-" + id + "' " +
        "onclick=eliminar(" + parametros + ")>" +
        "Eliminar el chat</button>";
    return button;
}

function eliminar(id) {
    $.ajax({
        url: URLbase + "/chat/eliminar",
        type: "POST",
        data: {
            conversationId: id,
        },
        dataType: 'json',
        headers: {"token": token},
        success: function (respuesta) {
            chatActive = false;
            $("#contenedor-principal").load("widgets/witget-conversations.html");
        },
        error: function (error) {
            Cookies.remove('token');
            chatActive = false;
            $("#widget-login")
                .prepend("<div class='alert alert-danger'>Error de borrado.</div>");
        }
    });
}