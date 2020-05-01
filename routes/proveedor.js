'use strict'

var express = require('express');
var ProveedorController = require('../controllers/proveedor');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/proveedor'}); 

api.post('/proveedor', md_auth.ensureAuth, ProductoController.crearProveedor);					//	Crear proveedor
api.put('/proveedor/:id', md_auth.ensureAuth, ProductoController.editarProveedor);				//	Editar proveedor
api.delete('/proveedor/:id', md_auth.ensureAuth, ProductoController.eliminarProveedor);			//	Eliminar proveedor
api.get('/proveedor/:id', md_auth.ensureAuth, ProductoController.obtenerProveedor);				// 	Obtener proveedor

module.exports = api;