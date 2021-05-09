module.exports = function (app, mongo) {

    app.get('/test/resetDB', function (req, res) {
        let criterio = {};
        let collection;

        app.get('logger').info("Se ha entrado en el metodo de reseteo de DB");

        //Abrimos la conexion con mongo
        mongo.MongoClient.connect(app.get('db'), function (err, db) {
            if (err) {
                app.get('logger').error("Error al resetear la BD 1: "+err);
                res.send(String("Error al resetear la BD."));
            } else {
                
                //Eliminamos todos los usuarios del sistema
                collection = db.collection('usuarios');
                criterio = {};
                collection.remove(criterio, function (err, result) {
                    if (err) {
                        db.close();
                        app.get('logger').error("Error al resetear la BD 2: "+err);
                        res.send(String("Error al resetear la BD."));
                    }
                    else{

                //Añadimos los usuarios
                let seguro = app.get("crypto").createHmac('sha256', app.get('clave'))
                    .update("123456").digest('hex');
                let seguroAdmin = app.get("crypto").createHmac('sha256', app.get('clave'))
                    .update("admin").digest('hex');
                let dineroInicial = 100;
                let usuarios =
                    [
                        {email: "admin@email.com", name: "Admin", lastName: "Istrador", password: seguroAdmin, role: "ROLE_ADMIN", money: dineroInicial},
                        {email: "pedro@email.com", name: "Pedro", lastName: "Díaz", password: seguro, role: "ROLE_USER", money: dineroInicial},
                        {email: "maria@email.com", name: "María", lastName: "Rodríguez", password: seguro, role: "ROLE_USER", money: dineroInicial},
                        {email: "lucas@email.com", name: "Lucas", lastName: "Núñez", password: seguro, role: "ROLE_USER", money: dineroInicial},
                        {email: "marta@email.com", name: "Marta", lastName: "Almonte", password: seguro, role: "ROLE_USER", money: dineroInicial},
                        {email: "pelayo@email.com", name: "Pelayo", lastName: "Valdes", password: seguro, role: "ROLE_USER", money: dineroInicial},
                        {email: "florentina@email.com", name: "Florentina", lastName: "Azul", password: seguro, role: "ROLE_USER", money: dineroInicial},
                    ];
                collection = db.collection('usuarios');
                collection.insertMany(usuarios, function (err, result) {
                    if (err) {
                        db.close();
                        app.get('logger').error("Error al resetear la BD 3: "+err);
                        res.send(String("Error al resetear la BD."));
                    }
                    else {

                //Eliminamos todas las ofertas del sistema
                collection = db.collection('ofertas');
                criterio = {};
                collection.remove(criterio, function (err, result) {
                    if (err) {
                        db.close();
                        app.get('logger').error("Error al resetear la BD 4: "+err);
                        res.send(String("Error al resetear la BD."));
                    }
                    else {

                let pedro = usuarios[1].email;
                let maria = usuarios[2].email;
                let lucas = usuarios[3].email;

                //Añadimos las ofertas
                let ofertas =
                    [{
                        title: "Titulo Oferta 1",
                        description: "Creada por pedro, sin comprar",
                        date: new Date(),
                        price: 10.01,
                        creator: pedro,
                        buyer: null
                    },{
                        title: "Titulo Oferta 2",
                        description: "Creada por pedro, comprada por maria",
                        date: new Date(),
                        price: 10.01,
                        creator: pedro,
                        buyer: maria
                    },{
                        title: "Titulo Oferta 3",
                        description: "Creada por pedro, comprada por maria",
                        date: new Date(),
                        price: 10.01,
                        creator: pedro,
                        buyer: maria
                    },{
                        title: "Titulo Oferta 4",
                        description: "Creada por maria, sin comprar",
                        date: new Date(),
                        price: 50,
                        creator: maria,
                        buyer: null
                    },{
                        title: "Titulo Oferta 5",
                        description: "Creada por maria, sin comprar",
                        date: new Date(),
                        price: 100,
                        creator: maria,
                        buyer: null
                    },{
                        title: "Titulo Oferta 6",
                        description: "Creada por maria, sin comprar",
                        date: new Date(),
                        price: 150,
                        creator: maria,
                        buyer: null
                    },{
                        title: "Titulo Oferta 7",
                        description: "Creada por maria, comprada por pedro",
                        date: new Date(),
                        price: 10.01,
                        creator: maria,
                        buyer: pedro
                    },{
                        title: "Titulo Oferta 8",
                        description: "Creada por maria, comprada por lucas",
                        date: new Date(),
                        price: 10.01,
                        creator: maria,
                        buyer: lucas
                    }];

                let ofertasInsertadas = null;
                collection = db.collection('ofertas');
                collection.insertMany(ofertas, function (err, result) {
                    if (err) {
                        db.close();
                        app.get('logger').error("Error al resetear la BD 5: "+err);
                        res.send(String("Error al resetear la BD."));
                    }
                    else{
                let ofertasInsertadas = result.insertedIds;

                //Eliminamos todas los chat del sistema
                collection = db.collection('mensajes');
                criterio = {};
                collection.remove(criterio, function (err, result) {
                    if (err) {
                        db.close();
                        app.get('logger').error("Error al resetear la BD 6: "+err);
                        res.send(String("Error al resetear la BD."));
                    }
                    else{

                //Eliminamos todas los chat del sistema
                collection = db.collection('conversaciones');
                criterio = {};
                collection.remove(criterio, function (err, result) {
                    if (err) {
                        db.close();
                        app.get('logger').error("Error al resetear la BD 7: "+err);
                        res.send(String("Error al resetear la BD."));
                    }
                    else{

                //Añadimos la conversacion
                let oferta = ofertasInsertadas[5];
                let offerTitle = "Titulo Oferta 6";
                let conversacion = [{
                    interestedUser: pedro,
                    ownerUser: maria,
                    offerId: oferta,
                    offerTitle: offerTitle
                }];
                let conversacionsInsertadas = null;
                collection = db.collection('conversaciones');
                collection.insertMany(conversacion, function (err, result) {
                    if (err) {
                        db.close();
                        app.get('logger').error("Error al resetear la BD 8: "+err);
                        res.send(String("Error al resetear la BD."));
                    }
                    else{
                let conversacionsInsertadas = result.insertedIds;
                let conversationId = conversacionsInsertadas[0];

                //Añadimos los mensajes

                let mensajes =
                    [{
                        conversationId : conversationId,
                        text: "Hola, buenas. ¿Habria alguna posibilidad de que se bajara el precio?",
                        date: new Date(),
                        read: false,
                        writerUser : pedro
                    },{
                        conversationId : conversationId,
                        text: "Hola. Buenas tardes.",
                        date: new Date(),
                        read: false,
                        writerUser : maria
                    },{
                        conversationId : conversationId,
                        text: "Lo siento mucho, pero el precio no es negociable.",
                        date: new Date(),
                        read: false,
                        writerUser : maria
                    }];
                collection = db.collection('mensajes');
                collection.insertMany(mensajes, function (err, result) {
                    if (err) {
                        db.close();
                        app.get('logger').error("Error al resetear la BD 9: "+err);
                        res.send(String("Error al resetear la BD."));
                    }
                    else{
                        db.close();
                        app.get('logger').info("Base de datos reiniciada.");
                        res.send(String("Base de datos reiniciada."));
                    }
                });
            }});
            }});
            }});
            }});
            }});
            }});
            }});
        }});
    })
};