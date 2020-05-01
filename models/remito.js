'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RemitoSchema = Schema({
	nombre: String,
	fechaCreacion: Date,
	archivo: String,
	venta: { type: Schema.Types.ObjectId, ref: 'Venta' }
});

module.exports = mongoose.model('Remito', RemitoSchema);