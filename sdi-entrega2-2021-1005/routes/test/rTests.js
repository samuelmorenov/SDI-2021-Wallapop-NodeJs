module.exports = function (app, mongo) {

    app.get('/test/resetDB', function (req, res) {
        let criterio = {};
        let collection;

        app.get('logger').info("Se ha entrado en el metodo de reseteo de DB");

        //Abrimos la conexion con mongo
        mongo.MongoClient.connect(app.get('db'), function (err, db) {
            if (err) {
                res.send(String("Error al resetear la BD."));
            } else {
                
                //Eliminamos todos los usuarios del sistema
                collection = db.collection('usuarios');
                criterio = {};
                collection.remove(criterio, function (err, result) {
                    if (err) {
                        db.close();
                        app.get('logger').error("Error al resetear la BD.");
                        res.send(String("Error al resetear la BD."));
                    }
                });

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
                        app.get('logger').error("Error al resetear la BD.");
                        res.send(String("Error al resetear la BD."));
                    }
                });

                //Eliminamos todas las ofertas del sistema
                collection = db.collection('ofertas');
                criterio = {};
                collection.remove(criterio, function (err, result) {
                    if (err) {
                        db.close();
                        app.get('logger').error("Error al resetear la BD.");
                        res.send(String("Error al resetear la BD."));
                    }
                });

                let pedro = usuarios[1].email;
                let maria = usuarios[2].email;

                //Añadimos las ofertas
                let ofertas =
                    [{
                        title: "Titulo Oferta 1",
                        description: "Creada por pedro, sin comprar",
                        date: new Date(),
                        price: 11.11,
                        status: "CREATED",
                        creator: pedro,
                        buyer: null
                    },{
                        title: "Titulo Oferta 2",
                        description: "Creada por pedro, comprada por maria",
                        date: new Date(),
                        price: 22.22,
                        status: "SOLDOUT",
                        creator: pedro,
                        buyer: maria
                    },{
                        title: "Titulo Oferta 3",
                        description: "Creada por pedro, comprada por maria",
                        date: new Date(),
                        price: 33.33,
                        status: "SOLDOUT",
                        creator: pedro,
                        buyer: maria
                    },{
                        title: "Titulo Oferta 4",
                        description: "Creada por maria, sin comprar",
                        date: new Date(),
                        price: 44.44,
                        status: "CREATED",
                        creator: maria,
                        buyer: null
                    },{
                        title: "Titulo Oferta 5",
                        description: "Creada por maria, sin comprar",
                        date: new Date(),
                        price: 55.55,
                        status: "CREATED",
                        creator: maria,
                        buyer: null
                    },{
                        title: "Titulo Oferta 6",
                        description: "Creada por maria, sin comprar",
                        date: new Date(),
                        price: 66.66,
                        status: "CREATED",
                        creator: maria,
                        buyer: null
                    },{
                        title: "Titulo Oferta 7",
                        description: "Creada por maria, comprada por pedro",
                        date: new Date(),
                        price: 77.77,
                        status: "SOLDOUT",
                        creator: maria,
                        buyer: pedro
                    }];

                collection = db.collection('ofertas');
                collection.insertMany(ofertas, function (err, result) {
                    if (err) {
                        db.close();
                        app.get('logger').error("Error al resetear la BD.");
                        res.send(String("Error al resetear la BD."));
                    }
                });

                db.close();
                app.get('logger').info("Base de datos reiniciada.");
                res.send(String("Base de datos reiniciada."));
            }
        });
    })
};