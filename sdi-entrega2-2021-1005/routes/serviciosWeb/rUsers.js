module.exports = function (app, gestorBD) {

    app.post("/api/login/", function (req, res) {
        app.get('logger').info("Se ha entrado en el metodo post de /api/login con email: "+req.body.email);

        let seguro = app.get("crypto").createHmac('sha256', app.get('clave'))
            .update(req.body.password).digest('hex');
        let criterio = {
            email: req.body.email,
            password: seguro
        }

        gestorBD.obtenerUsuarios(criterio, function (usuarios) {
            if (usuarios == null || usuarios.length === 0) {
                app.get('logger').debug(req.body.email+ " no se encuentra dentro del sistema");
                res.status(401);//TODO: Revisar tipo
                res.json({
                    autenticado: false
                })
            } else {
                app.get('logger').debug(req.body.email+ " se encuentra dentro del sistema, se devuelve el token");
                var token = app.get('jwt').sign(
                    {
                        usuario: criterio.email,
                        tiempo: Date.now() / 1000
                    },
                    "secreto");
                res.status(200);
                res.json(
                    {
                        autenticado: true,
                        token: token
                    })
            }
        })
    });
}