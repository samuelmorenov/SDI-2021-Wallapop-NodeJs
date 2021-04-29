module.exports = function (app, swig, gestorBD) {

    app.get("/offer/post", function (req, res) {
        let respuesta = swig.renderFile('views/offer/post.html', {loggedUser: req.session.usuario});
        res.send(respuesta);
    });

    app.post('/offer/post', function (req, res) {
        if (req.body.price == null ||  req.body.description == null || req.body.title == null){
            res.redirect("/offer/post" +
                "?mensaje=" +
                "No puede haber campos vacios." +
                "&tipoMensaje=alert-danger ");
        }
        if (req.body.price < 1) {
            res.redirect("/offer/post" +
                "?mensaje=" +
                "El precio debe ser de minimo 1€." +
                "&tipoMensaje=alert-danger ");
        } else if (req.body.title.length < 20) {
            res.redirect("/offer/post" +
                "?mensaje=" +
                "El titulo debe tener minimo 5 caracteres." +
                "&tipoMensaje=alert-danger ");
        } else if (req.body.description.length < 20) {
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
                creator: req.session.usuario,
                buyer: null
            };

            gestorBD.insertarOferta(oferta, function (id) {
                if (id == null) {
                    res.redirect("/offer/post" +
                        "?mensaje=" +
                        "Error al crear la oferta." +
                        "&tipoMensaje=alert-danger ");
                } else {
                    res.redirect("/offer/own?mensaje=Oferta registrada con exito.")
                }
            });
        }
    });

    app.get("/offer/all", function (req, res) {
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
                req.session.error = "Error: No se ha podido obtener la lista de ofertas";
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
        let url = 'views/offer/own.html';
        let criterio = { creator: req.session.usuario};
        mostrarListaOfertas(req, res, criterio,url);
    });

    app.get("/offer/purchased", function (req, res) {
        let url = 'views/offer/purchased.html';
        let criterio = { buyer: req.session.usuario};
        mostrarListaOfertas(req, res, criterio,url);
    });

    function mostrarListaOfertas(req, res, criterio, url) {
        gestorBD.obtenerLista('ofertas', criterio, function (ofertas, total) {
            if (ofertas == null) {
                req.session.error = "Error: No se ha podido obtener la lista de ofertas";
                res.redirect('/error');
            } else {
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
        for (let i = 0; i < ofertas.length; i++) {
            let oferta = ofertas[i];
            if(oferta.creator != null && oferta.cretor === usuario){
                oferta["buttonDisabled"] = 'disabled';
                oferta["buttonText"] = 'Propio';
            } else if(oferta.buyer != null && oferta.buyer === usuario){
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