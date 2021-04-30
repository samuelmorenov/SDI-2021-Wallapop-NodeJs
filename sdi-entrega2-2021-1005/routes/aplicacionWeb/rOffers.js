module.exports = function (app, swig, gestorBD) {

    app.get("/offer/post", function (req, res) {
        app.get('logger').info(req.session.usuario.email+" ha entrado en el metodo get de /offer/post");
        let respuesta = swig.renderFile('views/offer/post.html', {loggedUser: req.session.usuario});
        res.send(respuesta);
    });

    app.post('/offer/post', function (req, res) {
        app.get('logger').info(req.session.usuario.email+" ha entrado en el metodo post de /offer/post");
        if (req.body.price == null ||  req.body.description == null || req.body.title == null){
            app.get('logger').debug("El usuario ha dejado campos vacios");
            res.redirect("/offer/post" +
                "?mensaje=" +
                "No puede haber campos vacios." +
                "&tipoMensaje=alert-danger ");
        }
        if (req.body.price < 1) {
            app.get('logger').debug("El usuario a escrito un precio erroneo");
            res.redirect("/offer/post" +
                "?mensaje=" +
                "El precio debe ser de minimo 1€." +
                "&tipoMensaje=alert-danger ");
        } else if (req.body.title.length < 5) {
            app.get('logger').debug("El usuario a titulo un precio erroneo");
            res.redirect("/offer/post" +
                "?mensaje=" +
                "El titulo debe tener minimo 5 caracteres." +
                "&tipoMensaje=alert-danger ");
        } else if (req.body.description.length < 20) {
            app.get('logger').debug("El usuario a escrito una descripcion erroneo");
            res.redirect("/offer/post" +
                "?mensaje=" +
                "La descripcion debe tener minimo 20 caracteres." +
                "&tipoMensaje=alert-danger ");
        }  else {
            let oferta = {
                title: req.body.title,
                description: req.body.description,
                date: new Date(),
                price: req.body.price,
                status: "CREATED",
                creator: req.session.usuario.email,
                buyer: null
            };

            gestorBD.insertarOferta(oferta, function (id) {
                if (id == null) {
                    app.get('logger').error("BD: Error al registar oferta.");
                    res.redirect("/offer/post" +
                        "?mensaje=" +
                        "Error al crear la oferta." +
                        "&tipoMensaje=alert-danger ");
                } else {
                    app.get('logger').info("Oferta registrada con exito: "+oferta);
                    res.redirect("/offer/own?mensaje=Oferta registrada con exito.")
                }
            });
        }
    });

    app.get("/offer/all", function (req, res) {
        app.get('logger').info(req.session.usuario.email+" ha entrado en el metodo get de /offer/all");
        let url = 'views/offer/all.html';

        let unitsPerPage = 100;
        let criterio = {};

        let busquedaText = req.query.searchText;
        if (busquedaText != null) {
            let busqueda = {
                $or:
                    [
                        {"title": {$regex: ".*" + busquedaText + ".*"}},
                        {"description": {$regex: ".*" + busquedaText+ ".*"}}
                    ]
            };
            criterio = {$and: [criterio, busqueda]};
        }

        let pg = parseInt(req.query.pg); // Es String !!!
        if (req.query.pg == null) { // Puede no venir el param
            pg = 1;
        }

        gestorBD.obtenerListaPaginada('ofertas', criterio, pg, unitsPerPage, function (ofertas, total) {
            if (ofertas == null) {
                app.get('logger').error("BD: Error al obtener la lista de ofertas");
                req.session.error = "Error: No se ha podido obtener la lista de ofertas";
                res.redirect('/error');
            } else {
                app.get('logger').debug("Se ha obtenido la lista de ofertas con exito");

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

                ofertas = addAdditionalInformation(ofertas, req.session.usuario);

                let respuesta = swig.renderFile(url,
                    {
                        loggedUser: req.session.usuario,
                        offers: ofertas,
                        paginas: paginas,
                        actual: pg,
                    });
                res.send(respuesta);
            }
        });

    });

    app.get("/offer/own", function (req, res) {
        app.get('logger').info(req.session.usuario.email+" ha entrado en el metodo get de /offer/own");
        let url = 'views/offer/own.html';
        let criterio = { creator: req.session.usuario.email};
        mostrarListaOfertas(req, res, criterio,url);
    });

    app.get("/offer/purchased", function (req, res) {
        app.get('logger').info(req.session.usuario.email+" ha entrado en el metodo get de /offer/purchased");
        let url = 'views/offer/purchased.html';
        let criterio = { buyer: req.session.usuario.email};
        mostrarListaOfertas(req, res, criterio,url);
    });

    app.post("/offer/delete", function (req, res) {
        app.get('logger').info(req.session.usuario.email + " ha entrado en el metodo post de /offer/delete");
        let id = req.body.offerId;
        let criterio = {"_id": gestorBD.mongo.ObjectID(id)};
        app.get('logger').debug("Borrar con criterio: "+id);

        gestorBD.borrarOferta(criterio, function (canciones) {
            if (canciones == null) {
                app.get('logger').error("BD: Error al borrar la oferta");
                req.session.error = "Error al eliminar la cancion";
                res.redirect('/error');
            } else {
                app.get('logger').debug("Se ha borrado la oferta con exito");
                res.redirect("/offer/own");
            }
        });
    });

    function mostrarListaOfertas(req, res, criterio, url) {
        app.get('logger').info("Se ha entrado en el metodo mostrarListaOfertas");
        gestorBD.obtenerLista('ofertas', criterio, function (ofertas, total) {
            if (ofertas == null) {
                app.get('logger').error("BD: Error al obtener la lista de ofertas");
                req.session.error = "Error: No se ha podido obtener la lista de ofertas";
                res.redirect('/error');
            } else {
                app.get('logger').debug("Se ha obtenido la lista de ofertas con exito");
                let respuesta = swig.renderFile(url,
                    {
                        loggedUser: req.session.usuario,
                        offers: ofertas
                    });
                res.send(respuesta);
            }
        });
    };

    function addAdditionalInformation(ofertas, usuario){
        app.get('logger').info("Se ha entrado en el metodo addAdditionalInformation");
        for (let i = 0; i < ofertas.length; i++) {
            let oferta = ofertas[i];
            if(oferta.creator != null && oferta.cretor === usuario.email){
                oferta["buttonDisabled"] = 'disabled';
                oferta["buttonText"] = 'Propio';
            } else if(oferta.buyer != null && oferta.buyer === usuario.email){
                oferta["buttonDisabled"] = 'disabled';
                oferta["buttonText"] = 'Comprado';
            } else if(oferta.status != null && oferta.status === "SOLDOUT"){
                oferta["buttonDisabled"] = 'disabled';
                oferta["buttonText"] = 'Vendido';
            } else {
                oferta["buttonDisabled"] = 'enabled';
                oferta["buttonText"] = 'Comprar';
            }
        }
        return ofertas;
    };

}