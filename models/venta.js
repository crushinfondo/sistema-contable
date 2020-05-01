'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VentaSchema = Schema({
	fechaventa: String,
	estado: String,
	fechavencimiento: String,
	observacion: String,
	archivo: String,
	imagen: String,
	usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
	cliente: { type: Schema.Types.ObjectId, ref: 'Cliente' },
	formadepago: { type: Schema.Types.ObjectId, ref: 'FormaDePago' },
	productos: [{ type: Schema.Types.ObjectId, ref: 'Producto' }]
});

module.exports = mongoose.model('Venta', VentaSchema);