module.exports = function (app, swig, gestorBD) {

    app.get("/user/list", function (req, res) {
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
                req.session.error = "Error: No se ha podido obtener la lista de usuarios";
                res.redirect('/error');
            } else {
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