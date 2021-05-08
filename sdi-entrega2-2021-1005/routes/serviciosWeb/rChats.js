module.exports = function (app, gestorBD) {

    app.post("/api/chat/add", function (req, res) {
        let user = null;
        let offerObjectID = null;
        let texto = null;
        try {
            user = res.usuario.toString();
            offerObjectID = gestorBD.mongo.ObjectID(req.body.offerId);
            texto = req.body.text;
        } catch (error) {
            sendError(res, 0);
        }
        app.get('logger').info(user + " ha entrado en el metodo post de /api/chat/add");

        let criterioOfertas = {
            _id: offerObjectID
        };

        //Busqueda de la oferta para toma de datos
        gestorBD.obtenerOfertas(criterioOfertas, function (ofertas, total) {
            if (ofertas == null){
                sendError(res, 1);
            } else if(ofertas.length !== 1) {
                sendError(res, 3);
            } else {
                app.get('logger').debug("Se ha obtenido la oferta con exito");
                let oferta = ofertas[0];

                //Buscamos para saber si existe un chat creado
                let aux1 = { offerId: offerObjectID };
                let aux2 = {  $or: [ {interestedUser: user}, {ownerUser: user},]};
                let criterioChats = { $and: [ aux1, aux2 ] };

                gestorBD.obtenerChats(criterioChats, function (chats, total) {
                    if(chats == null){
                        sendError(res, 1);
                    }
                    else if (chats.length !== 0) {
                        app.get('logger').debug("Ya existe una conversacion anterior");
                        addNewChat(res, offerObjectID, user, oferta.creator,user, texto);
                    } else {
                        app.get('logger').debug("No existe el chat creado");

                        if(oferta.creator === user){
                            app.get('logger').error("El usuario es el creador de la oferta no puede crear un chat");
                            sendError(res, 4);
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

    app.get("/api/chat/conversations", function (req, res) {
        var user = null;
        try {
            user = res.usuario.toString();
        } catch (error) {
            sendError(res, 0);
        }
        app.get('logger').info(user + " ha entrado en el metodo get de /api/chat/conversations");

        let criterio = {  $or: [ {interestedUser: user}, {ownerUser: user},]};
        gestorBD.obtenerConversaciones2(criterio, function (result, total) {
            if (result == null) {
                sendError(res, 1);
            } else {
                let idOfertas = new Array(result.length);
                for(let i = 0; i < result.length; i++){
                    idOfertas[i] = result[i]._id.offerId;
                }
                let criterio = {
                    offerId: { $in: idOfertas }
                };

                gestorBD.obtenerOfertas(criterio,function (ofertas, total) {
                    if (ofertas == null) {
                        sendError(res, 1);
                    } else {
                        app.get('logger').debug("Se ha obtenido la lista de ofertas con exito: "+total);

                        res.status(200);
                        res.send(JSON.stringify(ofertas));
                    }
                });
            }
        });
    });

    app.get("/api/chat/:id", function (req, res) {
        let user = null;
        let offerObjectID = null;
        try {
            user = res.usuario.toString();
            offerObjectID = gestorBD.mongo.ObjectID(req.params.id);
        } catch (error) {
            sendError(res, 0);
        }
        app.get('logger').info(user + " ha entrado en el metodo get de /api/chat/"+offerObjectID);

        let aux1 = { offerId: offerObjectID };
        let aux2 = {  $or: [ {interestedUser: user}, {ownerUser: user},]};
        let criterioChats = { $and: [ aux1, aux2 ] };
        gestorBD.obtenerChats(criterioChats, function (chats, total) {
            if (chats == null) {
                sendError(res, 1);
            } else if(chats.length === 0){
                sendError(res, 3);
            }else {

                app.get('logger').debug("Se han encontrado un total de mensajes de = "+chats.length);
                res.status(200);
                res.send(JSON.stringify(chats));
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
                sendError(res, 2);
            } else{
                app.get('logger').debug("Mensaje creado con exito, offerId = "+offerId+", ID creado = "+chatId);
                res.status(201);
                res.json({mensaje: "Mensaje enviado"});
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