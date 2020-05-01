'use strict'

var express = require('express');
var RemitoController = require('../controllers/remito');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/remitos'}); 

api.post('/remito', md_auth.ensureAuth, RemitoController.crearRemito);					//	Crear remito
api.put('/remito/:id', md_auth.ensureAuth, RemitoController.editarRemito);				//	Editar remito
api.delete('/remito/:id', md_auth.ensureAuth, RemitoController.eliminarRemito);			//	Eliminar remito
api.get('/remito/:id', md_auth.ensureAuth, RemitoController.obtenerRemito);				// 	Obtener remito
api.post('/subir-archivo-remito/:id', [md_auth.ensureAuth, md_upload], RemitoController.subirArchivo);	//	Subir archivo factura
api.get('/obtener-archivo-remito/:file', RemitoController.obtenerArchivo);							//  Obtener archivo factura

module.exports = api;