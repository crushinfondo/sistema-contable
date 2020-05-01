'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var Suscripcion = require('../models/suscripcion');
var jwt = require('../services/jwt');

function obtenerSuscripcion(req, res){
	var suscripcionId = req.params.id;

	Suscripcion.findById(suscripcionId).exec((err, suscripcion)=>{
		if(err){
			res.status(500).send({message:"Error en la peticion"});
		}else{
			if(!suscripcion){
				res.status(404).send({message:"La suscripcion no existe"});
			}else{
				res.status(200).send({suscripcion:suscripcion});
			}
		}
	});
}

function crearSuscripcion(req, res){
	var suscripcion = new Suscripcion();
	var params = req.body;

	suscripcion.titulo = params.titulo;
	suscripcion.descripcion = params.descripcion;
	suscripcion.valormes = params.valormes;
	suscripcion.valoranio = params.valoranio;
	suscripcion.maxfacturasmensuales = params.maxfacturasmensuales;
	suscripcion.maxingresosmensuales = params.maxingresosmensuales;
	suscripcion.maxusuarios = params.maxusuarios;
	suscripcion.maxdepositos = params.maxdepositos;
	suscripcion.esmultimoneda = params.esmultimoneda;
	suscripcion.esintegracionotrasapps = params.esintegracionotrasapps;

	if(suscripcion.titulo != null){
		suscripcion.save((err, suscripcionStored)=>{
			if(err){
				res.status(500).send({message:"Error al guardar la suscripcion"});
			}else{
				if(!suscripcionStored){
					res.status(400).send({message:"No se ha registrado la suscripcion"});	
				}else{
					res.status(200).send({suscripcion:suscripcionStored});
				}
			}
		});
	}else{
		res.status(200).send({message:"Rellena todos los campos"});
	}
}

function editarSuscripcion(req, res){
	var suscripcionId = req.params.id;
	var update = req.body;

	Suscripcion.findByIdAndUpdate(suscripcionId, update, (err, suscripcionUpdated)=>{

		if(err){
			res.status(500).send({message: "Error al actualizar la suscripcion"});
		}else{
			if(!suscripcionUpdated){
				res.status(404).send({message: "No se ha podido actualizar la suscripcion"});
			}else{
				res.status(200).send({suscripcion: suscripcionUpdated});
			}
		}

	});

}

function eliminarSuscripcion(req, res){
	var suscripcionId = req.params.id;

	Suscripcion.find({suscripcion: suscripcionId}).remove((err, suscripcionRemoved)=>{
		if(err){
			res.status(500).send({message: "Error al eliminar la suscripcion"});
		}else{
			if(!suscripcionRemoved){
				res.status(404).send({message: "La suscripcion no ha sido eliminada"});
			}else{
				res.status(200).send({suscripcion: suscripcionRemoved});
			}
		}
	});

}

module.exports = {
	crearSuscripcion,
	editarSuscripcion,
	eliminarSuscripcion,
	obtenerSuscripcion
};