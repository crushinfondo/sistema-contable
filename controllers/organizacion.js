'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var Organizacion = require('../models/organizacion');
var jwt = require('../services/jwt');

function obtenerOrganizacion(req, res){
	var orgId = req.params.id;

	Organizacion.findById(orgId).populate({path: 'suscripcion'}).exec((err, organizacion)=>{
		if(err){
			res.status(500).send({message:"Error en la peticion"});
		}else{
			if(!organizacion){
				res.status(404).send({message:"La organizacion no existe"});
			}else{
				res.status(200).send({organizacion:organizacion});
			}
		}
	});
}

function crearOrganizacion(req, res){
	var organizacion = new Organizacion();
	var params = req.body;

	organizacion.nombre = params.nombre;
	organizacion.razonsocial = params.razonsocial;
	organizacion.cbu = params.cbu;
	organizacion.cuit = params.cuit;
	organizacion.direccion = params.direccion;
	organizacion.telefono = params.telefono;
	organizacion.email = params.email;
	organizacion.imagen = params.imagen;
	organizacion.plan = params.plan;
	organizacion.fechaCreacion = params.fechaCreacion;
	organizacion.fechaAltaPlan = params.fechaAltaPlan;
	organizacion.fechaVencimientoPlan = params.fechaVencimientoPlan;
	organizacion.pagoRealizado = params.pagoRealizado;
	organizacion.suscripcion = params.suscripcion;

	if(organizacion.nombre != null || organizacion.razonsocial){
		organizacion.save((err, organizacionStored)=>{
			if(err){
				res.status(500).send({message:"Error al guardar la organizacion"});
			}else{
				if(!organizacionStored){
					res.status(400).send({message:"No se ha registrado la organizacion"});	
				}else{
					res.status(200).send({organizacion:organizacionStored});
				}
			}
		});
	}else{
		res.status(200).send({message:"Rellena todos los campos"});
	}
}

function editarOrganizacion(req, res){
	var orgId = req.params.id;
	var update = req.body;

	Organizacion.findByIdAndUpdate(orgId, update, (err, organizacionUpdated)=>{

		if(err){
			res.status(500).send({message: "Error al actualizar la organizacion"});
		}else{
			if(!organizacionUpdated){
				res.status(404).send({message: "No se ha podido actualizar la organizacion"});
			}else{
				res.status(200).send({organizacion: organizacionUpdated});
			}
		}

	});

}

function eliminarOrganizacion(req, res){
	var orgId = req.params.id;

	Organizacion.find({organizacion: orgId}).remove((err, organizacionRemoved)=>{
		if(err){
			res.status(500).send({message: "Error al eliminar la organizacion"});
		}else{
			if(!organizacionRemoved){
				res.status(404).send({message: "La organizacion no ha sido eliminada"});
			}else{
				res.status(200).send({organizacion: organizacionRemoved});
			}
		}
	});

}

function subirImagen(req, res){
	var orgId = req.params.id;
	var fileName = 'Imagen no subida';

	if(req.files){
		var filePath = req.files.image.path;
		var fileSplit = filePath.split('\\');
		var fileName = fileSplit[2];

		var extSplit = fileName.split('\.');
		var fileExt = extSplit[1];
		
		if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
			Organizacion.findByIdAndUpdate(orgId, {imagen:fileName}, (err, organizacionUpdated)=>{
				if(err){
					res.status(500).send({message: "Error al actualizar la organizacion"});
				}else{
					if(!organizacionUpdated){
						res.status(404).send({message: "No se ha podido actualizar la organizacion"});
					}else{
						res.status(200).send({organizacion: organizacionUpdated});
					}
				}
			});
		}else{
			res.status(200).send({message: "La extension del archivo no es valida"});
		}
	}else{
		res.status(200).send({message: "No se ha subido ninguna imagen"});
	}
}

function obtenerImagen(req, res){	
	var imageFile = req.params.imageFile;
	var pathFile = './uploads/organizaciones/'; 

	fs.exists(pathFile + imageFile, function(exists){
		if(exists){
			res.sendFile(path.resolve(pathFile + imageFile));
		}else{
			res.status(200).send({message: "La imagen no existe"});	
		}
	});


}

module.exports = {
	crearOrganizacion,
	editarOrganizacion,
	eliminarOrganizacion,
	obtenerOrganizacion,
	subirImagen,
	obtenerImagen
};