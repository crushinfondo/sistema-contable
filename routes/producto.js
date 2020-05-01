'use strict'

var express = require('express');
var ProductoController = require('../controllers/producto');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/productos'}); 

api.post('/producto', md_auth.ensureAuth, ProductoController.crearProducto);					//	Crear producto
api.put('/producto/:id', md_auth.ensureAuth, ProductoController.editarProducto);				//	Editar producto
api.delete('/producto/:id', md_auth.ensureAuth, ProductoController.eliminarProducto);			//	Eliminar producto
api.get('/producto/:id', md_auth.ensureAuth, ProductoController.obtenerProducto);				// 	Obtener producto
api.post('/subir-imagen-producto/:id', [md_auth.ensureAuth, md_upload], ProductoController.subirImagen);	//	Subir archivo factura
api.get('/obtener-imagen-producto/:imageFile', ProductoController.obtenerImagen);							//  Obtener archivo factura

module.exports = api;