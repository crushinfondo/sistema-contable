'use strict'

var express = require('express');
var ProveedorController = require('../controllers/proveedor');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/proveedor', md_auth.ensureAuth, ProveedorController.crearProveedor);					//	Crear proveedor
api.put('/proveedor/:id', md_auth.ensureAuth, ProveedorController.editarProveedor);				//	Editar proveedor
api.delete('/proveedor/:id', md_auth.ensureAuth, ProveedorController.eliminarProveedor);			//	Eliminar proveedor
api.get('/proveedor/:id', md_auth.ensureAuth, ProveedorController.obtenerProveedor);				// 	Obtener proveedor

module.exports = api;