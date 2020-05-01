'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoriaProductoSchema = Schema({
	descripcion: String,
	ganancia: Number,
	imagen: String,
	organizacion: { type: Schema.Types.ObjectId, ref: 'Organizacion' }
});

module.exports = mongoose.model('CategoriaProducto', CategoriaProductoSchema);