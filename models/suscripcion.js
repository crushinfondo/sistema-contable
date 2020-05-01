'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SuscripcionSchema = Schema({
	titulo: String,
	descripcion: Number,
	valormes: Number,
	valoranio: Number,
	maxfacturasmensuales: Number,
	maxingresosmensuales: Number,
	maxusuarios: Number,
	maxdepositos: Number,
	esmultimoneda: Boolean,
	esintegracionotrasapps: Boolean
});

module.exports = mongoose.model('Suscripcion', SuscripcionSchema);