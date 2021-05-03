module.exports = function (app, gestorBD) {

    app.post("/api/chat/add", function (req, res) {
        let user = res.usuario;
        app.get('logger').info(user + " ha entrado en el metodo post de /api/chat/add");

        let offerId = gestorBD.mongo.ObjectID(req.body.offerId);
        let texto = req.body.text;

        let criterio = {
            _id: offerId
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
                    if (chats == null || chats.length === 0) {
                        app.get('logger').debug("No existe el chat creado");

                        if(oferta.creator === user){
                            app.get('logger').error("El usuario es el creador de la oferta no puede crear un chat");
                            res.status(500); //TODO: Revisar tipo
                            res.json({
                                error: "Error al crear el chat"
                            });
                        }
                        else{
                            app.get('logger').debug("El usuario no es el creador de la oferta, se procede a crear un chat");

                            addNewChat(user.email, oferta.creator, oferta._id, function(chatId){
                                if(chatId == null){
                                    app.get('logger').error("BD: Error al crear el chat");
                                    res.status(500); //TODO: Revisar tipo
                                    res.json({
                                        error: "Error al crear el chat"
                                    });
                                } else{
                                    app.get('logger').info("Chat creado con exito: "+chatId);
                                    addNewMensaje(chatId, texto, function (idMensaje){
                                        app.get('logger').info("Mensaje creado con exito: "+idMensaje);
                                        res.status(201);
                                        res.json({mensaje: "Mensaje enviado"});
                                    });
                                }
                            });
                        }
                    } else {
                        let chatId = chats[0]._id;
                        app.get('logger').debug("Se ha obtenido la oferta con exito: "+chatId);
                        addNewMensaje(chatId, texto, function (idMensaje){
                            app.get('logger').info("Mensaje creado con exito: "+idMensaje);
                            res.status(201);
                            res.json({mensaje: "Mensaje enviado"});
                        });
                    }
                });
            }
        });
    });

    app.get("/api/chat/:id", function (req, res) {
        let user = res.usuario;
        let offerId = gestorBD.mongo.ObjectID(req.params.id);
        app.get('logger').info(user + " ha entrado en el metodo get de /api/chat/"+offerId);

        var criterio = {offerId: offerId};
        gestorBD.obtenerChats(criterio, function (chats, total) {
            if (chats == null) {
                app.get('logger').error("BD: Error al obtener el chat");
                res.status(500); //TODO: Revisar tipo
                res.json({
                    error: "Error al obtener el chat"
                });
            } if(chats.length !== 1){
                app.get('logger').debug("No existe un chat(offerId = "+offerId+") anterior. chats.length = "+chats.length);
                res.status(500); //TODO: Revisar tipo
                res.json({
                    error: "No existe un chat anterior."
                });
            }else {
                var criterio = {chatId: chats[0]._id};
                gestorBD.obtenerMensajes(criterio, function (mensajes, total) {
                    if (mensajes == null){
                        app.get('logger').error("BD: Error al obtener los mensajes");
                        res.status(500); //TODO: Revisar tipo
                        res.json({
                            error: "Error al obtener el chat"
                        });
                    } else if(mensajes.length === 0) {
                        app.get('logger').error("No hay mensajes");
                        res.status(500); //TODO: Revisar tipo
                        res.json({
                            error: "No hay mensajes"
                        });
                    } else {
                        res.status(200);
                        res.send(JSON.stringify(mensajes));
                    }
            });
        }
        });
    });

    function addNewChat(interestedUser, ownerUser, offerId, callback){
        let chat = {
            interestedUser : interestedUser,
            ownerUser : ownerUser,
            offerId : offerId
        }

        gestorBD.insertarChat(chat, function (id) {
            app.get('logger').debug("Chat insertado, offerId = "+offerId+", ID creado = "+id);
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
            app.get('logger').debug("Mensaje insertado, chatId = "+chatId+", ID creado = "+id);
            callback(id);
        });
    };
}