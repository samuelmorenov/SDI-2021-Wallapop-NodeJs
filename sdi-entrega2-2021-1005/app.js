//Express, es un marco de aplicación web de back-end para Node.js
let express = require('express');
let app = express();

//Logger
let log4js = require('log4js');
let logger = log4js.getLogger();
logger.level = 'debug';
app.set('logger', logger);

// Establecemos los controles de acceso HTTP
// Debemos especificar todas las headers que se aceptan.
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, UPDATE, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    next();
});

// Jsonwebtoken sirve para la creación de tokens de acceso que permiten la
// propagación de identidad y privilegios
var jwt = require('jsonwebtoken');
app.set('jwt', jwt);

// Configuramos la session
let expressSession = require('express-session');
app.use(expressSession({secret: 'abcdefg', resave: true, saveUninitialized: true}));

// Para poder subir archivos
let fileUpload = require('express-fileupload');
app.use(fileUpload());

// Añadimos el parser para json
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Establecemos el acceso a la carpeta public
app.use(express.static('public'));

// Establecemos el puerto
app.set('port', 8081);

// routerUsuarioToken
var routerUsuarioToken = express.Router();
routerUsuarioToken.use(function (req, res, next) {
    // Obtener el token, vía headers (opcionalmente GET y/o POST).
    var token = req.headers['token'] || req.body.token || req.query.token;
    if (token != null) {
        // Verificar el token
        jwt.verify(token, 'secreto', function (err, infoToken) {
            if (err || (Date.now() / 1000 - infoToken.tiempo) > 240) {
                res.status(403); // Forbidden
                res.json({
                    acceso: false,
                    error: 'Token invalido o caducado'
                });
                // También podríamos comprobar que intoToken.usuario existe
                return;

            } else {
                // Dejamos correr la petición
                res.usuario = infoToken.usuario;
                next();
            }
        });

    } else {
        res.status(403); // Forbidden
        res.json({
            acceso: false,
            mensaje: 'No hay Token'
        });
    }
});

// Definimos el modulo de la base de datos
let mongo = require('mongodb');
let gestorBD = require("./modules/gestorBD.js");
gestorBD.init(app, mongo);

// RouterUsuarioSession
let routerUsuarioSession = express.Router();
routerUsuarioSession.use(function (req, res, next) {
    if (req.session.usuario) {
        // Dejamos correr la petición
        next();
    } else {
        res.redirect("/login");
    }
});

// Establecemos la base de datos
let fs2 = require('fs');
let pass = fs2.readFileSync('pass.txt', 'utf-8');
app.set('db', 'mongodb://admin:' + pass + '@tiendamusica-shard-00-00-8d9nh.mongodb.net:27017,' +
    'tiendamusica-shard-00-01-8d9nh.mongodb.net:27017,' +
    'tiendamusica-shard-00-02-8d9nh.mongodb.net:27017' +
    '/test?ssl=true&replicaSet=tiendamusica-shard-0&authSource=admin&retryWrites=true&w=majority');
app.set('clave', 'abcdefg');

// Definimos el modulo de encriptacion para las contraseñas
let crypto = require('crypto');
app.set('crypto', crypto);

// Definimos el modulo de motor de plantillas
let swig = require('swig');

// Redireccion de rutas
app.get('/', function (req, res) {
    if (req.session.usuario) {
        res.redirect('/user/profile');
    } else {
        res.redirect("/login");
    }
});

// Captura de errores
app.use(function (err, req, res, next) {
    if (!res.headersSent) {
        res.status(400);
        res.redirect('/error');
    }
});

// Aplicar RouterUsuarioSession para los Servicios Web

app.use("/user/list", routerUsuarioSession);
app.use("/user/profile", routerUsuarioSession);
app.use("/offer/post", routerUsuarioSession);
app.use("/offer/own", routerUsuarioSession);
app.use("/offer/all", routerUsuarioSession);
app.use("/logout", routerUsuarioSession);

// Establecimiento de Rutas
//Rutas para la Aplicacion web
require("./routes/aplicacionWeb/rLogInSignUp.js")(app, swig, gestorBD);
require("./routes/aplicacionWeb/rUsers.js")(app, swig, gestorBD);
require("./routes/aplicacionWeb/rOffers.js")(app, swig, gestorBD);

//Rutas para los Servicios Web
require("./routes/serviciosWeb/rUsers")(app, gestorBD);

// Rutas para los Test
require("./routes/test/rTests.js")(app, mongo);

// Arrancamos el servidor
let fs = require('fs');
let https = require('https');
https.createServer({
	key: fs.readFileSync('certificates/alice.key'),
    cert: fs.readFileSync('certificates/alice.crt')
}, app).listen(app.get('port'),function () {
    console.log("Servidor activo: https://localhost:8081");
});