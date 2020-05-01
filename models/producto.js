'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
	descripcion: String,
	preciocosto: Number,
	precioventa: Number,
	imagen: String,
	stockmaximo: Number,
	stockminimo: Number,
	fechaCreacion: Date,
	categoriaproducto: { type: Schema.Types.ObjectId, ref: 'CategoriaProducto' }
});

module.exports = mongoose.model('Producto', ProductoSchema);