'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FormaDePagoSchema = Schema({
	tarjeta: String,
	vencimiento: String,
	nombre: String,
	organizacion: { type: Schema.Types.ObjectId, ref: 'Organizacion' },
	proveedor: { type: Schema.Types.ObjectId, ref: 'Proveedor' },
	venta: { type: Schema.Types.ObjectId, ref: 'Venta' }
});

module.exports = mongoose.model('FormaDePago', FormaDePagoSchema);