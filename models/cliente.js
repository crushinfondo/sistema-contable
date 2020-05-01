'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
	nombre: String,
	razonSocial: Number,
	fechaCreacion: Date,
	organizacion: { type: Schema.Types.ObjectId, ref: 'Organizacion' }
});

module.exports = mongoose.model('Cliente', ClienteSchema);