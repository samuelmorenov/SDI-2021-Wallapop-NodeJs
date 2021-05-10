module.exports = {
    mongo: null,
    app: null,
    init: function (app, mongo) {
        this.mongo = mongo;
        this.app = app;
    },

    //USUARIOS

    insertarUsuario: function (usuario, funcionCallback) {
        let me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                me.app.get('logger').error(err.message);
                funcionCallback(null);
            } else {
                let collection = db.collection('usuarios');
                collection.insert(usuario, function (err, result) {
                    if (err) {
                        me.app.get('logger').error(err.message);
                        funcionCallback(null);
                    } else {
                        funcionCallback(result.ops[0]._id);
                    }
                    db.close();
                });
            }
        });
    },

    obtenerUsuarios: function (criterio, funcionCallback) {
        let me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                me.app.get('logger').error(err.message);
                funcionCallback(null);
            } else {
                let collection = db.collection('usuarios');
                collection.find(criterio).toArray(function (err, usuarios) {
                    if (err) {
                        me.app.get('logger').error(err.message);
                        funcionCallback(null);
                    } else {
                        funcionCallback(usuarios);
                    }
                    db.close();
                });
            }
        });
    },

    modificarUsuario: function (criterio, usuario, funcionCallback) {
        let me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                me.app.get('logger').error(err.message);
                funcionCallback(null);
            } else {
                let collection = db.collection('usuarios');
                collection.update(criterio, {$set: usuario}, function (err, result) {
                    if (err) {
                        me.app.get('logger').error(err.message);
                        funcionCallback(null);
                    } else {
                        funcionCallback(result);
                    }
                    db.close();
                });
            }
        });
    },

    borrarUsuarios: function (criterio, funcionCallback) {
        let me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                me.app.get('logger').error(err.message);
                funcionCallback(null);
            } else {
                let collection = db.collection('usuarios');
                collection.remove(criterio, function (err, result) {
                    if (err) {
                        me.app.get('logger').error(err.message);
                        funcionCallback(null);
                    } else {
                        funcionCallback(result);
                    }
                    db.close();
                });
            }
        });
    },

    //OFERTAS

    insertarOferta: function (oferta, funcionCallback) {
        let me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                me.app.get('logger').error(err.message);
                funcionCallback(null);
            } else {
                let collection = db.collection('ofertas');
                collection.insert(oferta, function (err, result) {
                    if (err) {
                        me.app.get('logger').error(err.message);
                        funcionCallback(null);
                    } else {
                        funcionCallback(result.ops[0]._id);
                    }
                    db.close();
                });
            }
        });
    },

    obtenerOfertasPaginada: function (criterio, pg, unitsPerPage, funcionCallback) {
        let me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                me.app.get('logger').error(err.message);
                funcionCallback(null);
            } else {
                let collection = db.collection('ofertas');
                collection.count(function (err, count) {
                    collection.find(criterio).skip((pg - 1) * unitsPerPage).limit(unitsPerPage)
                        .toArray(function (err, list) {
                            if (err) {
                                me.app.get('logger').error(err.message);
                                funcionCallback(null);
                            } else {
                                funcionCallback(list, count);
                            }
                            db.close();
                        });
                });
            }
        });
    },

    obtenerOfertas: function (criterio, funcionCallback) {
        let me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                me.app.get('logger').error(err.message);
                funcionCallback(null);
            } else {
                let collection = db.collection('ofertas');
                collection.find(criterio).toArray(function (err, list) {
                    if (err) {
                        me.app.get('logger').error(err.message);
                        funcionCallback(null);
                    } else {
                        funcionCallback(list, count);
                    }
                    db.close();
                });
            }
        });
    },
    
    modificarOferta: function (criterio, oferta, funcionCallback) {
        let me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                me.app.get('logger').error(err.message);
                funcionCallback(null);
            } else {
                let collection = db.collection('ofertas');
                collection.update(criterio, {$set: oferta}, function (err, result) {
                    if (err) {
                        me.app.get('logger').error(err.message);
                        funcionCallback(null);
                    } else {
                        funcionCallback(result);
                    }
                    db.close();
                });
            }
        });
    },

    borrarOferta: function (criterio, funcionCallback) {
        let me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                me.app.get('logger').error(err.message);
                funcionCallback(null);
            } else {
                let collection = db.collection('ofertas');
                collection.remove(criterio, function (err, result) {
                    if (err) {
                        me.app.get('logger').error(err.message);
                        funcionCallback(null);
                    } else {
                        funcionCallback(result);
                    }
                    db.close();
                });
            }
        });
    },

    //CONVERSACIONES

    insertarConversacion: function (conversacion, funcionCallback) {
        let me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                me.app.get('logger').error(err.message);
                funcionCallback(null);
            } else {
                let collection = db.collection('conversaciones');
                collection.insert(conversacion, function (err, result) {
                    if (err) {
                        me.app.get('logger').error(err.message);
                        funcionCallback(null);
                    } else {
                        funcionCallback(result.ops[0]._id);
                    }
                    db.close();
                });
            }
        });
    },

    obtenerConversaciones: function (criterio, funcionCallback) {
        let me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                me.app.get('logger').error(err.message);
                funcionCallback(null);
            } else {
                let collection = db.collection('conversaciones');
                collection.find(criterio).toArray(function (err, conversaciones) {
                    if (err) {
                        me.app.get('logger').error(err.message);
                        funcionCallback(null);
                    } else {
                        funcionCallback(conversaciones);
                    }
                    db.close();
                });
            }
        });
    },

    //MENSAJES

    insertarMensaje: function (mensaje, funcionCallback) {
        let me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                me.app.get('logger').error(err.message);
                funcionCallback(null);
            } else {
                let collection = db.collection('mensajes');
                collection.insert(mensaje, function (err, result) {
                    if (err) {
                        me.app.get('logger').error(err.message);
                        funcionCallback(null);
                    } else {
                        funcionCallback(result.ops[0]._id);
                    }
                    db.close();
                });
            }
        });
    },

    obtenerMesajes: function (criterio, funcionCallback) {
        let me = this;
        this.mongo.MongoClient.connect(this.app.get('db'), function (err, db) {
            if (err) {
                me.app.get('logger').error(err.message);
                funcionCallback(null);
            } else {
                let collection = db.collection('mensajes');
                collection.find(criterio).toArray(function (err, mensajes) {
                    if (err) {
                        me.app.get('logger').error(err.message);
                        funcionCallback(null);
                    } else {
                        funcionCallback(mensajes);
                    }
                    db.close();
                });
            }
        });
    },
};