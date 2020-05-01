'use strict'

var express = require('express');
var ClienteController = require('../controllers/cliente');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/cliente'}); 

api.post('/cliente', md_auth.ensureAuth, ClienteController.crearCiente);					//	Crear cliente
api.put('/cliente/:id', md_auth.ensureAuth, ClienteController.editarCiente);				//	Editar cliente
api.delete('/cliente/:id', md_auth.ensureAuth, ClienteController.eliminarCiente);			//	Eliminar cliente
api.get('/cliente/:id', md_auth.ensureAuth, ClienteController.obtenerCiente);				// 	Obtener cliente

module.exports = api;