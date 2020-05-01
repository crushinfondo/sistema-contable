'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var Remito = require('../models/remito');
var jwt = require('../services/jwt');

function obtenerRemito(req, res){
	var remitoId = req.params.id;

	Remito.findById(remitoId).populate({path: 'venta'}).exec((err, remito)=>{
		if(err){
			res.status(500).send({message:"Error en la peticion"});
		}else{
			if(!remito){
				res.status(404).send({message:"La remito no existe"});
			}else{
				res.status(200).send({remito:remito});
			}
		}
	});
}

function crearRemito(req, res){
	var remito = new remito();
	var params = req.body;

	remito.nombre = params.nombre;
	remito.fechaCreacion = params.fechaCreacion;
	remito.archivo = "";
	remito.venta = params.venta;

	if(remito.nombre != null){
		remito.save((err, remitoStored)=>{
			if(err){
				res.status(500).send({message:"Error al guardar el remito"});
			}else{
				if(!remitoStored){
					res.status(400).send({message:"No se ha registrado el remito"});	
				}else{
					res.status(200).send({remito:remitoStored});
				}
			}
		});
	}else{
		res.status(200).send({message:"Rellena todos los campos"});
	}
}

function editarRemito(req, res){
	var remitoId = req.params.id;
	var update = req.body;

	Remito.findByIdAndUpdate(remitoId, update, (err, remitoUpdated)=>{

		if(err){
			res.status(500).send({message: "Error al actualizar el remito"});
		}else{
			if(!remitoUpdated){
				res.status(404).send({message: "No se ha podido actualizar el remito"});
			}else{
				res.status(200).send({remito: remitoUpdated});
			}
		}

	});

}

function eliminarRemito(req, res){
	var remitoId = req.params.id;

	Remito.find({remito: remitoId}).remove((err, remitoRemoved)=>{
		if(err){
			res.status(500).send({message: "Error al eliminar el remito"});
		}else{
			if(!remitoRemoved){
				res.status(404).send({message: "El remito no ha sido eliminado"});
			}else{
				res.status(200).send({remito: remitoRemoved});
			}
		}
	});

}

function subirArchivo(req, res){
	var remitoId = req.params.id;
	var fileName = 'Archivo no subido';

	if(req.files){
		var filePath = req.files.image.path;
		var fileSplit = filePath.split('\\');
		var fileName = fileSplit[2];

		var extSplit = fileName.split('\.');
		var fileExt = extSplit[1];
		
		if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif' || fileExt == 'pdf'){
			Remito.findByIdAndUpdate(remitoId, {archivo:fileName}, (err, remitoUpdated)=>{
				if(err){
					res.status(500).send({message: "Error al actualizar el remito"});
				}else{
					if(!remitoUpdated){
						res.status(404).send({message: "No se ha podido actualizar el remito"});
					}else{
						res.status(200).send({remito: remitoUpdated});
					}
				}
			});
		}else{
			res.status(200).send({message: "La extension del archivo no es valida"});
		}
	}else{
		res.status(200).send({message: "No se ha subido ningun archivo"});
	}
}

function obtenerArchivo(req, res){	
	var imageFile = req.params.imageFile;
	var pathFile = './uploads/remitos/'; 

	fs.exists(pathFile + imageFile, function(exists){
		if(exists){
			res.sendFile(path.resolve(pathFile + imageFile));
		}else{
			res.status(200).send({message: "El archivo no existe"});	
		}
	});


}

module.exports = {
	crearRemito,
	editarRemito,
	eliminarRemito,
	obtenerRemito,
	subirArchivo,
	obtenerArchivo
};