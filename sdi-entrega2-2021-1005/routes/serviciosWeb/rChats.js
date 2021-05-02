module.exports = function (app, gestorBD) {

    app.post("/api/chat/add", function (req, res) {
        let user = res.usuario;
        app.get('logger').info(user + " ha entrado en el metodo post de /api/chat/add");

        let id = req.body.offerId;
        let texto = req.body.text;

        let criterio = {
            _id: gestorBD.mongo.ObjectID(id)
        };

        //Busqueda de la oferta para toma de datos
        gestorBD.obtenerOfertas(criterio, function (ofertas, total) {
            if (ofertas == null || ofertas.length !== 1) {
                app.get('logger').error("BD: Error al obtener la lista de ofertas");
                res.status(500); //TODO: Revisar tipo
                res.json({
                    error: "Error al obtener la lista de ofertas"
                });
            } else {
                app.get('logger').debug("Se ha obtenido la oferta con exito");
                let oferta = ofertas[0];

                //Buscamos para saber si existe un chat creado
                criterio = {offerId: gestorBD.mongo.ObjectID(oferta._id)};
                gestorBD.obtenerChats(criterio, function (chats, total) {
                    if (chats == null || chats.length !== 0) {
                        app.get('logger').debug("No existe el chat creado");

                        if(oferta.creator === user){
                            app.get('logger').error("El usuario es el creador de la oferta no puede crear un chat");
                            res.status(500); //TODO: Revisar tipo
                            res.json({
                                error: "Error al crear el chat"
                            });
                        }
                        else{
                            app.get('logger').error("El usuario no es el creador de la oferta, se procede a crear un chat");

                            addNewChat(user.email, oferta.creator, oferta._id, function(chatId){
                                if(chatId == null){
                                    app.get('logger').error("BD: Error al crear el chat");
                                    res.status(500); //TODO: Revisar tipo
                                    res.json({
                                        error: "Error al crear el chat"
                                    });
                                } else{
                                    app.get('logger').info("Chat creado con exito: "+id);
                                    addNewMensaje(chatId, texto, function (result){
                                        app.get('logger').info("Mensaje creado con exito: "+result);
                                        res.status(201);
                                        res.json({mensaje: "Mensaje enviado"});
                                    });
                                }
                            });
                        }
                    } else {
                        let chatId = chats[0]._id;
                        app.get('logger').debug("Se ha obtenido la oferta con exito: "+chatId);
                        addNewMensaje(chatId, texto, function (result){
                            app.get('logger').info("Mensaje creado con exito: "+result);
                            res.status(201);
                            res.json({mensaje: "Mensaje enviado"});
                        });
                    }
                });
            }
        });
    });

    function addNewChat(interestedUser, ownerUser, OfferId, callback){
        let chat = {
            interestedUser : interestedUser,
            ownerUser : ownerUser,
            OfferId : OfferId
        }

        gestorBD.insertarChat(chat, function (id) {
            callback(id);
        });
    }

    function addNewMensaje(chatId, text, callback){
        let mensaje = {
            chatId : chatId,
            text: text,
            date: new Date(),
            read: false
        };
        gestorBD.insertarMensaje(mensaje, function (id) {
            callback(id);
        });
    };
}