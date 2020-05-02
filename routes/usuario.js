'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuario');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/usuarios'}); 

api.post('/usuario', UsuarioController.crearUsuario);										//	Crear usuario
api.post('/login', UsuarioController.loginUsuario);											// Login usuario
api.put('/usuario/:id', md_auth.ensureAuth, UsuarioController.editarUsuario);				//	Editar usuario
api.delete('/usuario/:id', md_auth.ensureAuth, UsuarioController.eliminarUsuario);			//	Eliminar usuario
api.get('/usuario/:id', md_auth.ensureAuth, UsuarioController.obtenerUsuario);				// 	Obtener usuario
api.post('/subir-imagen-usuario/:id', [md_auth.ensureAuth, md_upload], UsuarioController.subirImagen);	//	Crear imagen organizacion
api.get('/obtener-imagen-usuario/:imageFile', UsuarioController.obtenerImagen);					//	Obtener imagen organizacion

module.exports = api;