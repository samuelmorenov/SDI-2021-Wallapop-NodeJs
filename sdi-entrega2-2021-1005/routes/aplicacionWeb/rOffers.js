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

    app.get("/offer/own", function (req, res) {
        let criterio = {};

        gestorBD.obtenerLista('ofertas', criterio, function (ofertas, total) {
            if (ofertas == null) {
                req.session.error = "Error: No se ha podido obtener la lista de ofertas";
                res.redirect('/error');
            } else {
                let respuesta = swig.renderFile('views/offer/own.html',
                    {
                        loggedUser: req.session.usuario,
                        offers: ofertas
                    });
                res.send(respuesta);
            }
        });
    });

}