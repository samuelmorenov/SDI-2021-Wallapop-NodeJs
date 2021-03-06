module.exports = function (app, gestorBD) {

    app.post("/api/chat/add", function (req, res) {
        let user = null;
        let conversationObjectID = null;
        let texto = null;
        try {
            user = res.usuario.toString();
            conversationObjectID = gestorBD.mongo.ObjectID(req.body.conversationId);
            texto = req.body.text;
        } catch (error) {
            sendError(res, 0);
        }
        app.get('logger').info(user + " ha entrado en el metodo post de /api/chat/add");

        let criterio = { _id: conversationObjectID};

        gestorBD.obtenerConversaciones(criterio, function (conversacion) {
            if(conversacion == null){
                sendError(res, 1);
            }
            else if (conversacion.length !== 0) {
                addNewMessage(res, conversationObjectID, texto, user);
            }
        });


    });


    app.get("/api/chat/conversations", function (req, res) {
        var user = null;
        try {
            user = res.usuario.toString();
        } catch (error) {
            sendError(res, 0);
        }
        app.get('logger').info(user + " ha entrado en el metodo get de /api/chat/conversations");

        let criterio = {  $or: [ {interestedUser: user}, {ownerUser: user},]};
        gestorBD.obtenerConversaciones(criterio, function (conversaciones) {
            if(conversaciones == null){
                sendError(res, 1);
            }
            else {
                app.get('logger').debug("Se han encontrado un total de conversaciones de = "+conversaciones.length);
                res.status(200);
                res.send(JSON.stringify(conversaciones));
            }
        });
    });

    app.get("/api/chat/fromOffers/:id", function (req, res) {
        let user = null;
        let offerObjectID = null;
        try {
            user = res.usuario.toString();
            offerObjectID = gestorBD.mongo.ObjectID(req.params.id);
        } catch (error) {
            sendError(res, 0);
        }
        app.get('logger').info(user + " ha entrado en el metodo get de /api/chat/fromOffers/"+offerObjectID);

        //Si existe oferta
        let criterio = {"_id": offerObjectID};
        gestorBD.obtenerOfertas(criterio,function (ofertas, total) {
            if (ofertas == null) {
                sendError(res, 1);
            } if(ofertas.length != 1){
                sendError(res, 3);
            }else {
                existeConversacion(res, offerObjectID, user, function (conversationId){
                    //Si existe conversacion
                    if(conversationId != null){
                        //Buscar mensajes
                        getMessages(res, conversationId, ofertas[0].creator, ofertas[0].title);
                    }
                    //Si no existe conversacion
                    else{
                        //Crear conversacion
                        addNewConversation(res, user, ofertas[0].creator, offerObjectID, ofertas[0].title, function (conversationId){
                            //Buscar mensajes
                            getMessages(res, conversationId, ofertas[0].creator, ofertas[0].title);
                        });
                    }
                });
            }
        });
    });

    app.get("/api/chat/fromConversations/:id", function (req, res) {
        let user = null;
        let conversationObjectID = null;
        try {
            user = res.usuario.toString();
            conversationId = gestorBD.mongo.ObjectID(req.params.id);
        } catch (error) {
            sendError(res, 0);
        }
        app.get('logger').info(user + " ha entrado en el metodo get de /api/chat/fromConversations/"+conversationId);

        let criterio = { _id: conversationId };

        gestorBD.obtenerConversaciones(criterio, function (conversacion) {
            if(conversacion == null){
                sendError(res, 1);
            }
            else if (conversacion.length !== 1) {
                app.get('logger').debug("Conversaciones obtenidas para esa offerta y usuario: "+conversacion.length);
                callback(null);
            } else {
                let c = conversacion[0];

                getMessages(res, conversationId, c.ownerUser, c.offerTitle)
            }
        });

    });

    app.post("/api/chat/eliminar", function (req, res) {
        var user = null;
        var conversationObjectID = null;
        try {
            user = res.usuario.toString();
            conversationObjectID = gestorBD.mongo.ObjectID(req.body.conversationId);
        } catch (error) {
            sendError(res, 0);
        }

        app.get('logger').info(user + " ha entrado en el metodo get de /api/chat/eliminar");

        let criterio = { _id: conversationObjectID };

        gestorBD.obtenerConversaciones(criterio, function (conversaciones) {
            if(conversaciones == null){
                sendError(res, 1);
            }
            else if (conversaciones.length !== 1) {
                app.get('logger').debug("Conversaciones obtenidas para esa offerta y usuario: "+conversaciones.length);
                callback(null);
            } else {
                let conversacion = conversaciones[0];

                if(conversacion.ownerUser != user && conversacion.interestedUser != user){
                    sendError(res, 4);
                } else{

                    let criterioMensajes = { conversationId: conversationObjectID };
                    gestorBD.borrarMensajes(criterioMensajes, function (result) {
                        if (result == null) {
                            sendError(res, 1);
                        } else {
                            let criterioConversaciones = { _id: conversationObjectID };
                            gestorBD.borrarConversaciones(criterioConversaciones, function (result) {
                                if (result == null) {
                                    sendError(res, 1);
                                } else {
                                    app.get('logger').debug("Conversacion eliminada exito, ID = " +conversationObjectID);
                                    res.status(201);
                                    res.json({mensaje: "Conversacion eliminada exito"});
                                }
                            });
                        }
                    });
                }
            }
        });
    });

    function addNewMessage(res, conversationId, text, user) {
        let message = {
            conversationId: conversationId,
            text: text,
            date: new Date(),
            read: false,
            writerUser : user
        }

        gestorBD.insertarMensaje(message, function (messageId) {
            if (messageId == null) {
                sendError(res, 1);
            } else {
                app.get('logger').debug("Mensaje creado con exito, ID creado = " +messageId);
                res.status(201);
                res.json({mensaje: "Mensaje enviado"});
            }
        });
    }

    function addNewConversation(res, interestedUser, ownerUser, offerId, offerTitle, callback){
        let conversacion = {
            interestedUser: interestedUser,
            ownerUser: ownerUser,
            offerId: gestorBD.mongo.ObjectID(offerId),
            offerTitle: offerTitle
        }
        gestorBD.insertarConversacion(conversacion, function (conversacionId) {
            if (conversacionId == null) {
                sendError(res, 2);
            } else {
                app.get('logger').debug("Nueva conversacion creada: "+conversacionId);
                callback(conversacionId);
            }
        });
    }

    function getMessages(res, conversationId, ownerUser, offerTitle){

        let criterioMensajes = { conversationId : conversationId };

        gestorBD.obtenerMesajes(criterioMensajes, function (mensajes) {
            if (mensajes == null) {
                sendError(res, 1);
            } else {
                app.get('logger').debug("Se han encontrado un total de mensajes de = "+mensajes.length);

                let answer = {
                    offerTitle : offerTitle,
                    conversationId : conversationId,
                    messages : mensajes,
                    ownerUser: ownerUser,
                }
                res.status(200);
                res.send(JSON.stringify(answer));
            }
        });
    }

    function existeConversacion(res, offerObjectID, interestedUser, callback){
        let criterio = { offerId: offerObjectID, interestedUser: interestedUser };

        gestorBD.obtenerConversaciones(criterio, function (conversacion) {
            if(conversacion == null){
                sendError(res, 1);
            }
            else if (conversacion.length !== 1) {
                app.get('logger').debug("Conversaciones obtenidas para esa offerta y usuario: "+conversacion.length);
                callback(null);
            } else {
                app.get('logger').debug("Conversacion para esa offerta y usuario encontrada.");
                callback(conversacion[0]._id);
            }
        });
    }

    function sendError(res, cod){
        let error = '';
        let codigo = 500
        switch (cod) {
            case 0:
                error = 'Parametros de la consulta erroneos';
                codigo = 400; //Bad Request
                break;
            case 1:
                error = 'Error de acceso a la base de datos';
                codigo = 500;
                break;
            case 2:
                error = 'Error al crear en la base de datos';
                codigo = 500;
                break;
            case 3:
                error = 'Lista vacia';
                codigo = 404;
                break;
            case 4:
                error = 'Error de logica de negocio';
                codigo = 409; //Conflict
                break;
        }

        app.get('logger').error(error);
        res.status(codigo);
        res.json({
            error: error
        });
    }
}