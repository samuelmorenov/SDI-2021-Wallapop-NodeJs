module.exports = function (app, swig, gestorBD) {

    app.post('/signup', function (req, res) {
        app.get('logger').info("Se ha entrado en el metodo post de /signup");

        if (req.body.password != req.body.passwordConfirm) {
            app.get('logger').debug("El usuario ha escrito mal la segunda contraseña");
            res.redirect("/signup" +
                "?mensaje=" +
                "Las contraseñas no coinciden." +
                "&tipoMensaje=alert-danger ");
        } else {
            let seguro = app.get("crypto").createHmac('sha256', app.get('clave'))
                .update(req.body.password).digest('hex');

            let criterio = {
                email: req.body.email
            };

            gestorBD.obtenerUsuarios(criterio, function (usuarios) {
                if (usuarios.length > 0) {
                    app.get('logger').debug("El usuario ha intentado registrar un usuario que ya existe");
                    res.redirect("/signup" +
                        "?mensaje=" +
                        "Ese email ya existe." +
                        "&tipoMensaje=alert-danger ");
                } else {
                    let usuario = {
                        name: req.body.name,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: seguro,
                        role: "ROLE_USER",
                        money: 100.0
                    };

                    gestorBD.insertarUsuario(usuario, function (id) {
                        if (id == null) {
                            app.get('logger').error("BD: Error al registar usuario.");
                            res.redirect("/signup" +
                                "?mensaje=" +
                                "Error al registar usuario." +
                                "&tipoMensaje=alert-danger ");
                        } else {
                            app.get('logger').info("Usuario registrado correctamente: "+usuario.email);
                            res.redirect("/login?mensaje=Nuevo usuario registrado.")
                        }
                    });
                }
            });
        }
    });

    app.get("/signup", function (req, res) {
        app.get('logger').info("Se ha entrado en el metodo get de /signup");
        let respuesta = swig.renderFile('views/signup.html', {loggedUser: req.session.usuario});
        res.send(respuesta);
    });

    app.get("/login", function (req, res) {
        app.get('logger').info("Se ha entrado en el metodo get de /login");
        let respuesta = swig.renderFile('views/login.html', {loggedUser: req.session.usuario});
        res.send(respuesta);
    });

    app.post("/login", function (req, res) {
        app.get('logger').info("Se ha entrado en el metodo post de /login");
        let seguro = app.get("crypto").createHmac('sha256', app.get('clave'))
            .update(req.body.password).digest('hex');
        let criterio = {
            email: req.body.email,
            password: seguro
        }
        gestorBD.obtenerUsuarios(criterio, function (usuarios) {
            if (usuarios == null || usuarios.length == 0) {
                req.session.usuario = null;
                app.get('logger').debug("El usuario ha intentado hacer un login sin exito");
                res.redirect("/login" +
                    "?mensaje=" +
                    "La combinacion usuario-contraseña es incorrecta." +
                    "&tipoMensaje=alert-danger ");

            } else {
                app.get('logger').info("El usuario ha realizado un login con exito: "+usuarios[0].email);
                req.session.usuario = usuarios[0];
                res.redirect("/user/profile");
            }
        });
    });

    app.get('/logout', function (req, res) {
        app.get('logger').info(req.session.usuario.email+" ha entrado en el metodo get de /logout");
        req.session.usuario = null;
        let respuesta = swig.renderFile('views/login.html', {loggedUser: req.session.usuario});
        res.send(respuesta);
    });

    app.get("/error", function (req, res) {
        app.get('logger').info(req.session.usuario.email+" ha entrado en el metodo get de /error");
        let texto = req.session.error;
        req.session.error = null;
        app.get('logger').info("El error mostrado ha sido: "+texto);
        let respuesta = swig.renderFile('views/error.html', {
            loggedUser: req.session.usuario,
            texto: texto
        });
        res.send(respuesta);
    });
};