'use strict'

var express = require('express');
var SuscrpcionController = require('../controllers/suscripcion');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/suscripcion'}); 

api.post('/suscripcion', md_auth.ensureAuth, SuscrpcionController.crearSuscrpcion);					//	Crear suscripcion
api.put('/suscripcion/:id', md_auth.ensureAuth, SuscrpcionController.editarSuscrpcion);				//	Editar suscripcion
api.delete('/suscripcion/:id', md_auth.ensureAuth, SuscrpcionController.eliminarSuscrpcion);			//	Eliminar suscripcion
api.get('/suscripcion/:id', md_auth.ensureAuth, SuscrpcionController.obtenerSuscrpcion);				// 	Obtener suscripcion
api.get('/obtener-titulo-suscripcion/:id'. md_auth.ensureAuth, SuscrpcionController.obtenerSuscrpcionTitulo);
api.get('/obtener-descripcion-suscripcion/:id'. md_auth.ensureAuth, SuscrpcionController.obtenerSuscrpcionDescripcion);
api.get('/obtener-valormes-suscripcion/:id'. md_auth.ensureAuth, SuscrpcionController.obtenerSuscrpcionValorMes);
api.get('/obtener-valoranio-suscripcion/:id'. md_auth.ensureAuth, SuscrpcionController.obtenerSuscrpcionValorAnio);

module.exports = api;