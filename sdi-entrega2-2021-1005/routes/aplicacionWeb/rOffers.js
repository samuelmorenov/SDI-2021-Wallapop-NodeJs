module.exports = function (app, swig, gestorBD) {

    app.get("/offer/post", function (req, res) {
        let respuesta = swig.renderFile('views/offer/post.html', {loggedUser: req.session.usuario});
        res.send(respuesta);
    });
    
}