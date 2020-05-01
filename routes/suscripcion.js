'use strict'

var express = require('express');
var SuscrpcionController = require('../controllers/suscripcion');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/suscripcion', md_auth.ensureAuth, SuscrpcionController.crearSuscrpcion);					//	Crear suscripcion
api.put('/suscripcion/:id', md_auth.ensureAuth, SuscrpcionController.editarSuscrpcion);				//	Editar suscripcion
api.delete('/suscripcion/:id', md_auth.ensureAuth, SuscrpcionController.eliminarSuscrpcion);			//	Eliminar suscripcion
api.get('/suscripcion/:id', md_auth.ensureAuth, SuscrpcionController.obtenerSuscrpcion);				// 	Obtener suscripcion

module.exports = api;