'use strict'

var express = require('express');
var OrganizacionController = require('../controllers/organizacion');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/organizacion'}); 

api.post('/organizacion', md_auth.ensureAuth, OrganizacionController.crearOrganizacion);					//	Crear organizacion
api.put('/organizacion/:id', md_auth.ensureAuth, OrganizacionController.editarOrganizacion);				//	Editar organizacion
api.delete('/organizacion/:id', md_auth.ensureAuth, OrganizacionController.eliminarOrganizacion);			//	Eliminar organizacion
api.get('/organizacion/:id', md_auth.ensureAuth, OrganizacionController.obtenerOrganizacion);				// 	Obtener organizacion
api.post('/subir-imagen-organizacion/:id', [md_auth.ensureAuth, md_upload], OrganizacionController.subirImagen);	//	Crear imagen organizacion
api.get('/obtener-imagen-organizacion/:imageFile', OrganizacionController.obtenerImagen);					//	Obtener imagen organizacion
api.get('/obtener-razonsocial-organizacion/:id', md_auth.ensureAuth, OrganizacionController.obtenerRazonSocial);	//Obtener Razon Social
api.get('/obtener-cbu-organizacion/:id', md_auth.ensureAuth, OrganizacionController.obtenerCBU);			//Obtener CBU
api.get('/obtener-cuit-organizacion/:id', md_auth.ensureAuth, OrganizacionController.obtenerCuit);			//Obtener Cuit
api.get('/obtener-direccion-organizacion/:id', md_auth.ensureAuth, OrganizacionController.obtenerDireccion);	//Obtener Direccion
api.get('/obtener-telefono-organizacion/:id', md_auth.ensureAuth, OrganizacionController.obtenerTelefono);	//Obtener Telefono
api.get('/obtener-email-organizacion/:id', md_auth.ensureAuth, OrganizacionController.obtenerEmail);		//Obtener Email
api.get('/obtener-plan-organizacion/:id', md_auth.ensureAuth, OrganizacionController.obtenerPlan);			//Obtener Plan

module.exports = api;