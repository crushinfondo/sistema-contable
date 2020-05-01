'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/usuario'}); 

api.post('/usuario', md_auth.ensureAuth, UsuarioController.crearUsuario);					//	Crear usuario
api.put('/usuario/:id', md_auth.ensureAuth, UsuarioController.editarUsuario);				//	Editar usuario
api.delete('/usuario/:id', md_auth.ensureAuth, UsuarioController.eliminarUsuario);			//	Eliminar usuario
api.get('/usuario/:id', md_auth.ensureAuth, UsuarioController.obtenerUsuario);				// 	Obtener usuario
api.get('/obtener-nombre-usuario/:id', md_auth.ensureAuth, UsuarioController.obtenerNombre);
api.get('/obtener-apellido-usuario/:id', md_auth.ensureAuth, UsuarioController.obtenerApellido);
api.get('/obtener-puesto-usuario/:id', md_auth.ensureAuth, UsuarioController.obtenerPuesto);
api.get('/obtener-email-usuario/:id', md_auth.ensureAuth, UsuarioController.obtenerEmai);
api.get('/obtener-rol-usuario/:id', md_auth.ensureAuth, UsuarioController.obtenerRol);
api.get('/obtener-password-usuario/:id', md_auth.ensureAuth, UsuarioController.obtenerPassword);
api.get('/obtener-fechaCreacion-usuario/:id', md_auth.ensureAuth, UsuarioController.obtenerFechaCreacion);

module.exports = api;