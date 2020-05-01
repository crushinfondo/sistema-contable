'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProveedorSchema = Schema({
	nombre: String,
	fechaCreacion: Date,
	organizacion: { type: Schema.Types.ObjectId, ref: 'Organizacion' }
});

module.exports = mongoose.model('Proveedor', ProveedorSchema);