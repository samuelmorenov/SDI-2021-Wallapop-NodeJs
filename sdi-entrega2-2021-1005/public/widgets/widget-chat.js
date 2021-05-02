window.history.pushState("", "", "/cliente.html?w=chat");

this.loadChat();

$('#button-chat').click(function () {
    var inputChat = $("#input-chat").val();
    if (inputChat == null || inputChat == "") {
        return;
    }
    var offerId = chat.offerId;

    $.ajax({
        url: URLbase + "/chat/add",
        type: "POST",
        data: {
            offerId: offerId,
            text: inputChat
        },
        dataType: 'json',
        headers: {"token": token},
        success: function (respuesta) {
            $("#contenedor-principal").load("widgets/widget-chat.html");
        },
        error: function (error) {
            Cookies.remove('token');
            $("#widget-login")
                .prepend("<div class='alert alert-danger'>Error de envio.</div>");
        }
    });
});