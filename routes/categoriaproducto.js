'use strict'

var express = require('express');
var CategoriaProductoController = require('../controllers/categoriaproducto');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/categoriaproductos'}); 

api.post('/categoriaproducto', md_auth.ensureAuth, CategoriaProductoController.crearCategoriaProducto);								//	Crear categoria	
api.put('/categoriaproducto/:id', md_auth.ensureAuth, CategoriaProductoController.editarCategoriaProducto);					//	Editar categoria
api.delete('/categoriaproducto/:id', md_auth.ensureAuth, CategoriaProductoController.eliminarCategoriaProducto);			//	Eliminar categoria
api.get('/categoriaproducto/:id', md_auth.ensureAuth, CategoriaProductoController.obtenerCategoriaProducto);				// 	Obtener categoria
api.post('/subir-imagen-categoriaproducto/:id', [md_auth.ensureAuth, md_upload], CategoriaProductoController.subirImagen);	//	Crear imagen categoria
api.get('/obtener-imagen-categoriaproducto/:imageFile', CategoriaProductoController.obtenerImagen);							// Obtener imagen categoria
api.get('/obtener-ganancia-categoriaproducto/:id', md_auth.ensureAuth, CategoriaProductoController.obtenerGanancia);         // Obtener Ganancia

module.exports = api;