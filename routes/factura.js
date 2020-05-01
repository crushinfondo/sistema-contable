'use strict'

var express = require('express');
var FacturaController = require('../controllers/factura');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/facturas'}); 

api.post('/factura', md_auth.ensureAuth, FacturaController.crearFactura);					//	Crear factura
api.put('/factura/:id', md_auth.ensureAuth, FacturaController.editarFactura);				//	Editar factura
api.delete('/factura/:id', md_auth.ensureAuth, FacturaController.eliminarFactura);			//	Eliminar factura
api.get('/factura/:id', md_auth.ensureAuth, FacturaController.obtenerFactura);				// 	Obtener factura
api.post('/subir-archivo-factura/:id', [md_auth.ensureAuth, md_upload], FacturaController.subirArchivo);	//	Subir archivo factura
api.get('/obtener-archivo-factura/:file', FacturaController.obtenerArchivo);							//  Obtener archivo factura

module.exports = api;