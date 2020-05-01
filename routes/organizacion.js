'use strict'

var express = require('express');
var OrganizacionController = require('../controllers/organizacion');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/organizaciones'}); 

api.post('/organizacion', md_auth.ensureAuth, OrganizacionController.crearOrganizacion);					//	Crear organizacion
api.put('/organizacion/:id', md_auth.ensureAuth, OrganizacionController.editarOrganizacion);				//	Editar organizacion
api.delete('/organizacion/:id', md_auth.ensureAuth, OrganizacionController.eliminarOrganizacion);			//	Eliminar organizacion
api.get('/organizacion/:id', md_auth.ensureAuth, OrganizacionController.obtenerOrganizacion);				// 	Obtener organizacion
api.post('/subir-imagen-organizacion/:id', [md_auth.ensureAuth, md_upload], OrganizacionController.subirImagen);	//	Crear imagen organizacion
api.get('/obtener-imagen-organizacion/:imageFile', OrganizacionController.obtenerImagen);					//	Obtener imagen organizacion

module.exports = api;