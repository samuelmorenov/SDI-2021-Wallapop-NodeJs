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


        let criterio = {email: { $nin: [req.session.usuario.email] }};

        gestorBD.obtenerUsuarios(criterio, function (users, total) {
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

    app.post("/user/delete", function (req, res) {
        app.get('logger').info(req.session.usuario.email + " ha entrado en el metodo post de /user/delete");

        if(req.session.usuario.role !== "ROLE_ADMIN"){
            app.get('logger').error("Se ha intentado acceder a un metodo que solo es de administrador");
            req.session.error = "Error: Se ha intentado acceder a un metodo que solo es de administrador";
            res.redirect('/error');
        }

        let checkboxes = req.body.checkbox;
        if(!Array.isArray(checkboxes)){
            checkboxes = [checkboxes]
        }
        let criterio = {
            email: { $in: checkboxes }
        }

        gestorBD.borrarUsuarios(criterio, function (result) {
            if (result == null) {
                app.get('logger').error("BD: Error al borrar la oferta");
                req.session.error = "Error al eliminar la oferta";
                res.redirect('/error');
            } else {
                app.get('logger').debug("Se ha borrado la oferta con exito");
                res.redirect("/user/list");
            }
        });
    });
}