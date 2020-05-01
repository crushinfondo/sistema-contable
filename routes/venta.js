'use strict'

var express = require('express');
var VentaController = require('../controllers/venta');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/venta'}); 

api.post('/venta', md_auth.ensureAuth, VentaController.crearVenta);					//	Crear venta
api.put('/venta/:id', md_auth.ensureAuth, VentaController.editarVenta);				//	Editar venta
api.delete('/venta/:id', md_auth.ensureAuth, VentaController.eliminarVenta);			//	Eliminar venta
api.get('/venta/:id', md_auth.ensureAuth, VentaController.obtenerVenta);				// 	Obtener venta
api.get('/obtener-fechaventa-venta/:id', md_auth.ensureAuth, VentaController.obtenerFechaVenta);
api.get('/obtener-estado-venta/:id', md_auth.ensureAuth, VentaController.obtenerEstdoVenta);
api.get('/obtener-fechavencimiento-venta/:id', md_auth.ensureAuth, VentaController.obtenerFechaVencimiento);
api.get('/obtener-observacion-venta/:id', md_auth.ensureAuth, VentaController.obtenerObservacion);
api.get('/obtener-archivo-venta/:id', md_auth.ensureAuth, VentaController.obtenerVenta);

module.exports = api;