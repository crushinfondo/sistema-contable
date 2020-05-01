'use strict'

var express = require('express');
var FormaDePagoController = require('../controllers/formadepago');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/formadepago', md_auth.ensureAuth, FormaDePagoController.crearFormaDePago);					//	Crear forma de pago
api.put('/formadepago/:id', md_auth.ensureAuth, FormaDePagoController.editarFormaDePago);				//	Editar forma de pago
api.delete('/formadepago/:id', md_auth.ensureAuth, FormaDePagoController.eliminarFormaDePago);			//	Eliminar forma de pago
api.get('/formadepago/:id', md_auth.ensureAuth, FormaDePagoController.obtenerFormaDePago);				// 	Obtener forma de pago

module.exports = api;