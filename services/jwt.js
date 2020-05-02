'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "cl4v3s3cr3t4";

exports.createToken = function(usuario){

	var payload = {
		sub: usuario._id,
		nombre: usuario.nombre,
		apellido: usuario.apellido,
		email: usuario.email,
		rol: usuario.rol,
		password: usuario.password,
		fechaCreacion: usuario.fechaCreacion,
		imagen: usuario.imagen,
		sucursal: usuario.sucursal,
		organizacion: usuario.organizacion,
		iat: moment().unix(),
		exp: moment().add(30, 'days').unix()
	};

	return jwt.encode(payload, secret);
};