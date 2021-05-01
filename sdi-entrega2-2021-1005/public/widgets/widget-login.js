window.history.pushState("", "", "/cliente.html?w=login");
$('#boton-login').click(function () {
    $.ajax({
        url: URLbase + "/login",
        type: "POST",
        data: {
            email: $("#email").val(),
            password: $("#password").val()
        },
        dataType: 'json',
        success: function (respuesta) {
            token = respuesta.token;
            user = $("#email").val();
            Cookies.set('token', respuesta.token);
            $("#contenedor-principal").load("widgets/widget-offers.html");
        },
        error: function (error) {
            Cookies.remove('token');
            user = "";
            $("#widget-login")
                .prepend("<div class='alert alert-danger'>La combinacion usuario-contraseña es incorrecta.</div>");
        }
    });
});