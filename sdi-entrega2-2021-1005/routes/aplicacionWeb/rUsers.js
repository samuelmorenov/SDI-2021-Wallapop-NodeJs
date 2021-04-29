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
        let unitsPerPage = 100;
        let criterio = {};

        if (req.query.busqueda != null) {
            let busqueda = {
                $or:
                    [
                        {"email": {$regex: ".*" + req.query.busqueda + ".*"}},
                        {"name": {$regex: ".*" + req.query.busqueda + ".*"}},
                        {"lastName:": {$regex: ".*" + req.query.busqueda + ".*"}}
                    ]
            };
            criterio = {$and: [criterio, busqueda]};
        }

        let pg = parseInt(req.query.pg); // Es String !!!
        if (req.query.pg == null) { // Puede no venir el param
            pg = 1;
        }

        gestorBD.obtenerListaPaginada('usuarios', criterio, pg, unitsPerPage, function (users, total) {
            if (users == null) {
                app.get('logger').error("BD: Error al obtener la lista de ofertas");
                req.session.error = "Error: No se ha podido obtener la lista de usuarios";
                res.redirect('/error');
            } else {
                app.get('logger').debug("Se ha obtenido la lista de usuarios con exito");
                let ultimaPg = total / unitsPerPage;
                if (total % unitsPerPage > 0) { // Sobran decimales
                    ultimaPg = ultimaPg + 1;
                }
                let paginas = []; // paginas mostrar
                for (let i = pg - 2; i <= pg + 2; i++) {
                    if (i > 0 && i <= ultimaPg) {
                        paginas.push(i);
                    }
                }
                
                let respuesta = swig.renderFile('views/user/list.html',
                    {
                        loggedUser: req.session.usuario,
                        users: users,
                        paginas: paginas,
                        actual: pg
                    });
                res.send(respuesta);
            }
        });

    });

}