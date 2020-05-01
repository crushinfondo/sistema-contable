'use strict'

var express = require('express');
var VentaController = require('../controllers/venta');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/ventas'}); 

api.post('/venta', md_auth.ensureAuth, VentaController.crearVenta);					//	Crear venta
api.put('/venta/:id', md_auth.ensureAuth, VentaController.editarVenta);				//	Editar venta
api.delete('/venta/:id', md_auth.ensureAuth, VentaController.eliminarVenta);			//	Eliminar venta
api.get('/venta/:id', md_auth.ensureAuth, VentaController.obtenerVenta);				// 	Obtener venta
api.post('/subir-archivo-venta/:id', [md_auth.ensureAuth, md_upload], VentaController.subirArchivo);	//	Subir archivo factura
api.get('/obtener-archivo-venta/:file', VentaController.obtenerArchivo);							//  Obtener archivo factura

module.exports = api;