'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FacturaSchema = Schema({
	cuit: String,
	numero: String,
	importe: Number,
	estado: String,
	tipo: String,
	fechaCreacion: Date,
	archivo: String,
	organizacion: { type: Schema.Types.ObjectId, ref: 'Organizacion' },
	venta: { type: Schema.Types.ObjectId, ref: 'Venta' }
});

module.exports = mongoose.model('Cliente', FacturaSchema);