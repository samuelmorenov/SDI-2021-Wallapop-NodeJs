module.exports = function (app, gestorBD) {

    app.get("/api/offer/all", function (req, res) {
        app.get('logger').info("Se ha entrado en el metodo get de /api/offer/all");

        let criterio = {};
        gestorBD.obtenerOfertas(criterio,function (ofertas, total) {
            if (ofertas == null) {
                app.get('logger').error("BD: Error al obtener la lista de ofertas");
                res.status(500);
                res.json({
                    error: "Error al obtener la lista de ofertas"
                });
            } else {
                app.get('logger').debug("Se ha obtenido la lista de ofertas con exito: "+total);

                res.status(200);
                res.send(JSON.stringify(ofertas));
            }
        });
    });
}