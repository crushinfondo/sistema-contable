'use strict'

var express = require('express');
var ProductoController = require('../controllers/producto');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/producto'}); 

api.post('/producto', md_auth.ensureAuth, ProductoController.crearProducto);					//	Crear producto
api.put('/producto/:id', md_auth.ensureAuth, ProductoController.editarProducto);				//	Editar producto
api.delete('/producto/:id', md_auth.ensureAuth, ProductoController.eliminarProducto);			//	Eliminar producto
api.get('/producto/:id', md_auth.ensureAuth, ProductoController.obtenerProducto);				// 	Obtener producto
api.get('/obtener-descripcion-producto/:id', md_auth.ensureAuth, ProductoController.obtenerDescripcion);	//Obtener descripcion
api.get('/obtener-preciocosto-producto/:id', md_auth.ensureAuth, ProductoController.obtenerPrecioCosto);	//Obtener preciocosto
api.get('/obtener-precioventa-producto/:id', md_auth.ensureAuth, ProductoController.obtenerPrecioVenta);	//Obtener precioventa
api.get('/obtener-stockmaximo-producto/:id', md_auth.ensureAuth, ProductoController.obtenerStockMaximo);	//Obtener stockmaximo
api.get('/obtener-stockminimo-producto/:id', md_auth.ensureAuth, ProductoController.obtenerStockMinimo);	//Obtener stockminimo
module.exports = api;