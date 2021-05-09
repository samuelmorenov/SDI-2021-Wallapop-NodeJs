window.history.pushState("", "", "/cliente.html?w=chat");

var me = this;
me.conversationId = null;

me.loadChat()
me.setInterval(function(){
    if(chatActive){
        me.loadChat() // this will run after every 1 seconds
    }
}, 2000);

function loadChat() {
    $.ajax({
        url: URLbase + "/chat/fromOffers/"+chat.offerId,
        type: "GET",
        data: {},
        dataType: 'json',
        headers: {"token": token},
        success: function (respuesta) {
            $("#tbody-chat").empty();
            $("#h2-tittle").empty();
            chatActive = false;

            if(respuesta != null){
                if(respuesta.messages != null && respuesta.messages.length != 0){
                    chatActive = true;
                    messages = respuesta.messages;
                    tableChat(messages);
                }
                if(respuesta.conversationId != null){
                    me.conversationId = respuesta.conversationId;
                }
                if(respuesta.ownerUser != null && respuesta.offerTitle != null){
                    let title = respuesta.offerTitle;
                    let propietario = respuesta.ownerUser;
                    $("#h2-tittle").append("Chat de la oferta: " + title + ", propiedad del usuario: " + propietario);
                }
            }
        },
        error: function (error) {
            chatActive = false;
            console.log("error");
            $("#tbody-chat").empty();
        }
    });
};

function tableChat(messages) {
    $("#tbody-chat").empty();
    let usuario = user;
    for (let i = 0; i < messages.length; i++) {
        let writerUser = messages[i].writerUser;
        let texto = messages[i].text;


        let fila = "";
        if (writerUser == usuario) {
            fila = "<td align=\"right\" style=\"background-color:#dcf8c6\">" + texto + "</td>";
        } else {
            fila = "<td>" + texto + "</td>";
        }
        $("#tbody-chat").append("<tr>" + fila + "</tr>");
    }
}

$('#button-chat').click(function () {
    var inputChat = $("#input-chat").val();
    if (inputChat == null || inputChat == "") {
        return;
    }

    $.ajax({
        url: URLbase + "/chat/add",
        type: "POST",
        data: {
            conversationId: me.conversationId,
            text: inputChat
        },
        dataType: 'json',
        headers: {"token": token},
        success: function (respuesta) {
            chatActive = false;
            $("#contenedor-principal").load("widgets/widget-chat.html");
        },
        error: function (error) {
            chatActive = false;
            Cookies.remove('token');
            $("#widget-login")
                .prepend("<div class='alert alert-danger'>Error de envio.</div>");
        }
    });
});