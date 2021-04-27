module.exports = function (app, mongo) {

    app.get('/test/resetDB', function (req, res) {
        let criterio = {};
        let collection;

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
                        res.send(String("Error al resetear la BD."));
                    }
                });

                //Añadimos los usuarios
                let seguro = app.get("crypto").createHmac('sha256', app.get('clave'))
                    .update("123456").digest('hex');
                let seguroAdmin = app.get("crypto").createHmac('sha256', app.get('clave'))
                    .update("admin").digest('hex');
                let usuarios =
                    [
                        {email: "admin@email.com", name: "Admin", lastName: "Istrador", password: seguroAdmin, role: "ROLE_ADMIN", money: 100.0},
                        {email: "pedro@email.com", name: "Pedro", lastName: "Díaz", password: seguro, role: "ROLE_USER", money: 100.0},
                        {email: "lucas@email.com", name: "Lucas", lastName: "Núñez", password: seguro, role: "ROLE_USER", money: 100.0},
                        {email: "maria@email.com", name: "María", lastName: "Rodríguez", password: seguro, role: "ROLE_USER", money: 100.0},
                        {email: "marta@email.com", name: "Marta", lastName: "Almonte", password: seguro, role: "ROLE_USER", money: 100.0},
                        {email: "pelayo@email.com", name: "Pelayo", lastName: "Valdes", password: seguro, role: "ROLE_USER", money: 100.0},
                        {email: "florentina@email.com", name: "Florentina", lastName: "Azul", password: seguro, role: "ROLE_USER", money: 100.0},
                    ];
                collection = db.collection('usuarios');
                collection.insertMany(usuarios, function (err, result) {
                    if (err) {
                        db.close();
                        res.send(String("Error al resetear la BD."));
                    }
                });

                res.send(String("Base de datos reiniciada."));
                db.close();
            }
        });
    })
};