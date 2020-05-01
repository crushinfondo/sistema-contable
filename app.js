'use strict'

var express = require('express');
var bodyParser = require('body-parser');
const configMensaje = require('./services/configMensaje');

var app = express();

// Cargo rutas

var categoria_routes = require('./routes/categoriaproducto');
var cliente_routes = require('./routes/cliente');
var factura_routes = require('./routes/factura');
var formadepago_routes = require('./routes/formadepago');
var organizacion_routes = require('./routes/organizacion');
var producto_routes = require('./routes/producto');
var proveedor_routes = require('./routes/proveedor');
var remito_routes = require('./routes/remito');
var suscripcion_routes = require('./routes/suscripcion');
var usuario_routes = require('./routes/usuario');
var venta_routes = require('./routes/venta');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar cabeceras HTTP

app.use((req, res, next)=>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

// Rutas base

app.use('/api', categoria_routes);
app.use('/api', cliente_routes);
app.use('/api', factura_routes);
app.use('/api', formadepago_routes);
app.use('/api', organizacion_routes);
app.use('/api', producto_routes);
app.use('/api', proveedor_routes);
app.use('/api', remito_routes);
app.use('/api', suscripcion_routes);
app.use('/api', usuario_routes);
app.use('/api', venta_routes);
app.post('/api/enviar-confirmacion', (req, res) => {
 configMensaje(req.body);
 res.status(200).send();
})

module.exports = app;