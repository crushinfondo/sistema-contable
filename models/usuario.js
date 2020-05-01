'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
	nombre: String,
	apellido: String,
	puesto: String,
	email: String,
	rol: String,
	password: String,
	fechaCreacion: Date,
	imagen: String,
	sucursal: Number,
	organizacion: { type: Schema.Types.ObjectId, ref: 'Organizacion' }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);