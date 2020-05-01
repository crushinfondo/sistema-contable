'use strict'

var express = require('express');
var SuscripcionController = require('../controllers/suscripcion');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/suscripcion', md_auth.ensureAuth, SuscripcionController.crearSuscripcion);					//	Crear suscripcion
api.put('/suscripcion/:id', md_auth.ensureAuth, SuscripcionController.editarSuscripcion);				//	Editar suscripcion
api.delete('/suscripcion/:id', md_auth.ensureAuth, SuscripcionController.eliminarSuscripcion);			//	Eliminar suscripcion
api.get('/suscripcion/:id', md_auth.ensureAuth, SuscripcionController.obtenerSuscripcion);				// 	Obtener suscripcion

module.exports = api;