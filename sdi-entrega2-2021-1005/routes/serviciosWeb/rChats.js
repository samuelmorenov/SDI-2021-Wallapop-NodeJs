module.exports = function (app, gestorBD) {

    app.post("/api/chat/add", function (req, res) {
        let user = res.usuario;
        app.get('logger').info(user + " ha entrado en el metodo post de /api/chat/add");

        let offerObjectID = gestorBD.mongo.ObjectID(req.body.offerId);
        let texto = req.body.text;

        let criterioOfertas = {
            _id: offerObjectID
        };

        //Busqueda de la oferta para toma de datos
        gestorBD.obtenerOfertas(criterioOfertas, function (ofertas, total) {
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
                let aux1 = { offerId: offerObjectID };
                let aux2 = {  $or: [ {interestedUser: user}, {ownerUser: user},]};
                let criterioChats = { $and: [ aux1, aux2 ] };

                gestorBD.obtenerChats(criterioChats, function (chats, total) {
                    if(chats == null){
                        app.get('logger').error("Error al obtener el chat");
                        res.status(500); //TODO: Revisar tipo
                        res.json({
                            error: "Error al crear el chat"
                        });
                    }
                    else if (chats.length !== 0) {
                        app.get('logger').debug("Ya existe una conversacion anterior");
                        addNewChat(res, offerObjectID, user, oferta.creator,user, texto);
                    } else {
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
                            addNewChat(res, offerObjectID, user, oferta.creator,user, texto);
                        }
                    }
                });
            }
        });
    });

    app.get("/api/chat/:id", function (req, res) {
        let user = res.usuario;
        if(req.params == null){
            app.get('logger').error("BD: Error al obtener el chat");
            res.status(500); //TODO: Revisar tipo
            res.json({
                error: "Error al obtener el chat"
            });
        }
        let offerObjectID = gestorBD.mongo.ObjectID(req.params.id);
        app.get('logger').info(user + " ha entrado en el metodo get de /api/chat/"+offerObjectID);

        let aux1 = { offerId: offerObjectID };
        let aux2 = {  $or: [ {interestedUser: user}, {ownerUser: user},]};
        let criterioChats = { $and: [ aux1, aux2 ] };
        gestorBD.obtenerChats(criterioChats, function (chats, total) {
            if (chats == null) {
                app.get('logger').error("BD: Error al obtener el chat");
                res.status(500); //TODO: Revisar tipo
                res.json({
                    error: "Error al obtener el chat"
                });
            } if(chats.length === 0){
                app.get('logger').debug("No existen chats con offerId = "+offerObjectID);
                res.status(500); //TODO: Revisar tipo
                res.json({
                    error: "No existe un chat anterior."
                });
            }else {

                app.get('logger').debug("Se han encontrado un total de mensajes de = "+chats.length);
                res.status(200);
                res.send(JSON.stringify(chats));
            }
        });
    });

    app.get("/api/chat/conversation", function (req, res) {
        let user = res.usuario;
        app.get('logger').info(user + " ha entrado en el metodo get de /api/chat/conversation");

        let criterioChats = { interestedUser: user };
        gestorBD.obtenerChats(criterioChats, function (chatsInterested, total) {
            if (chatsInterested == null) {
                app.get('logger').error("BD: Error al obtener el chat");
                res.status(500); //TODO: Revisar tipo
                res.json({
                    error: "Error al obtener el chat"
                });
            } else {
                let criterioChats = { ownerUser: user };
                gestorBD.obtenerChats(criterioChats, function (chatsOwner, total) {
                    if (chatsOwner == null) {
                        app.get('logger').error("BD: Error al obtener el chat");
                        res.status(500); //TODO: Revisar tipo
                        res.json({
                            error: "Error al obtener el chat"
                        });
                    } else {
                        let o = JSON.stringify(chatsOwner);
                        let i = JSON.stringify(chatsInterested);


                        res.status(500); //TODO: Revisar tipo
                        res.json({
                            error: "Error al obtener el chat"
                        });
                    }
                });
            }
        });
    });

    function addNewChat(res, offerId, interestedUser, ownerUser, user, text){
        let chat = {
            interestedUser : interestedUser,
            ownerUser : ownerUser,
            writerUser : user,
            offerId : gestorBD.mongo.ObjectID(offerId),
            text: text,
            date: new Date(),
            read: false
        }

        gestorBD.insertarChat(chat, function (chatId) {
            if(chatId == null){
                app.get('logger').error("BD: Error al crear el chat");
                res.status(500); //TODO: Revisar tipo
                res.json({
                    error: "Error al crear el chat"
                });
            } else{
                app.get('logger').debug("Mensaje creado con exito, offerId = "+offerId+", ID creado = "+chatId);
                res.status(201);
                res.json({mensaje: "Mensaje enviado"});
            }
        });
    }
}