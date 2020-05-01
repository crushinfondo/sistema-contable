'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrganizacionSchema = Schema({
	nombre: String,
	razonsocial: String,
	cbu: String,
	cuit: String,
	direccion: String,
	telefono: String,
	email: String,
	imagen: String,
	plan: String,
	fechaCreacion: Date,
	fechaAltaPlan: Date,
	fechaVencimientoPlan: Date,
	pagoRealizado: Boolean,
	suscripcion: { type: Schema.Types.ObjectId, ref: 'Suscripcion' }
});

module.exports = mongoose.model('Organizacion', OrganizacionSchema);