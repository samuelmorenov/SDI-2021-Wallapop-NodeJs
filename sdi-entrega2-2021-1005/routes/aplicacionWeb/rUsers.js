module.exports = function (app, swig, gestorBD) {

    app.get("/user/profile", function (req, res) {
        app.get('logger').info(req.session.usuario.email+" ha entrado en el metodo get de /user/profile");
        let respuesta = swig.renderFile('views/user/profile.html',
            {
                loggedUser: req.session.usuario
            });
        res.send(respuesta);
    });

    app.get("/user/list", function (req, res) {
        app.get('logger').info(req.session.usuario.email+" ha entrado en el metodo get de /user/list");
        let criterio = {};

        gestorBD.obtenerLista('usuarios', criterio, function (users, total) {
            if (users == null) {
                app.get('logger').error("BD: Error al obtener la lista de ofertas");
                req.session.error = "Error: No se ha podido obtener la lista de usuarios";
                res.redirect('/error');
            } else {
                app.get('logger').debug("Se ha obtenido la lista de usuarios con exito");
                
                let respuesta = swig.renderFile('views/user/list.html',
                    {
                        loggedUser: req.session.usuario,
                        users: users
                    });
                res.send(respuesta);
            }
        });
    });
}