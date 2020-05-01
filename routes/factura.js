'use strict'

var express = require('express');
var FacturaController = require('../controllers/factura');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/factura'}); 

api.post('/factura', md_auth.ensureAuth, FacturaController.crearFactura);					//	Crear cliente
api.put('/factura/:id', md_auth.ensureAuth, FacturaController.editarFactura);				//	Editar cliente
api.delete('/factura/:id', md_auth.ensureAuth, FacturaController.eliminarFactura);			//	Eliminar cliente
api.get('/factura/:id', md_auth.ensureAuth, FacturaController.obtenerFactura);				// 	Obtener cliente
api.get('/obtener-cuit-factura/:id', md_auth.ensureAuth, FacturaController.obtenerCuit)			//	Obtener el Cuit
api.get('/obtener-estado-factura/:id', md_auth.ensureAuth, FacturaController.obtenerEstado)		//	Obtener el Estado
api.get('/obtener-fechaCreacion-factura/:id', md_auth.ensureAuth, FacturaController.obtenerFechaCreacion)		//Obtener Fecha de Creacion

module.exports = api;