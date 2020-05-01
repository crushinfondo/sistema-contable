'use strict'

var express = require('express');
var ClienteController = require('../controllers/cliente');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/cliente', md_auth.ensureAuth, ClienteController.crearCliente);					//	Crear cliente
api.put('/cliente/:id', md_auth.ensureAuth, ClienteController.editarCliente);				//	Editar cliente
api.delete('/cliente/:id', md_auth.ensureAuth, ClienteController.eliminarCliente);			//	Eliminar cliente
api.get('/cliente/:id', md_auth.ensureAuth, ClienteController.obtenerCliente);				// 	Obtener cliente

module.exports = api;