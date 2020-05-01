'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var Factura = require('../models/factura');
var jwt = require('../services/jwt');

function obtenerFactura(req, res){
	var facturaId = req.params.id;

	Factura.findById(facturaId).populate({path: 'organizacion'}).populate({path: 'venta'}).exec((err, factura)=>{
		if(err){
			res.status(500).send({message:"Error en la peticion"});
		}else{
			if(!factura){
				res.status(404).send({message:"La factura no existe"});
			}else{
				res.status(200).send({factura:factura});
			}
		}
	});
}

function crearFactura(req, res){
	var factura = new Factura();
	var params = req.body;

	factura.cuit = params.cuit;
	factura.numero = params.numero;
	factura.importe = params.importe;
	factura.estado = params.estado;
	factura.tipo = params.tipo;
	factura.fechaCreacion = params.fechaCreacion;
	factura.archivo = "";
	factura.organizacion = params.organizacion;
	factura.venta = params.venta;

	if(factura.nombre != null || factura.razonSocial != null){
		factura.save((err, facturaStored)=>{
			if(err){
				res.status(500).send({message:"Error al guardar la factura"});
			}else{
				if(!facturaStored){
					res.status(400).send({message:"No se ha registrado la factura"});	
				}else{
					res.status(200).send({factura:facturaStored});
				}
			}
		});
	}else{
		res.status(200).send({message:"Rellena todos los campos"});
	}
}

function editarFactura(req, res){
	var facturaId = req.params.id;
	var update = req.body;

	Factura.findByIdAndUpdate(facturaId, update, (err, facturaUpdated)=>{

		if(err){
			res.status(500).send({message: "Error al actualizar la factura"});
		}else{
			if(!facturaUpdated){
				res.status(404).send({message: "No se ha podido actualizar la factura"});
			}else{
				res.status(200).send({factura: facturaUpdated});
			}
		}

	});

}

function eliminarFactura(req, res){
	var facturaId = req.params.id;

	Factura.find({factura: facturaId}).remove((err, facturaRemoved)=>{
		if(err){
			res.status(500).send({message: "Error al eliminar la factura"});
		}else{
			if(!facturaRemoved){
				res.status(404).send({message: "La factura no ha sido eliminado"});
			}else{
				res.status(200).send({factura: facturaRemoved});
			}
		}
	});

}

function subirArchivo(req, res){
	var facturaId = req.params.id;
	var fileName = 'Archivo no subido';

	if(req.files){
		var filePath = req.files.image.path;
		var fileSplit = filePath.split('\\');
		var fileName = fileSplit[2];

		var extSplit = fileName.split('\.');
		var fileExt = extSplit[1];
		
		if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif' || fileExt == 'pdf'){
			Factura.findByIdAndUpdate(facturaId, {archivo:fileName}, (err, facturaUpdated)=>{
				if(err){
					res.status(500).send({message: "Error al actualizar la factura"});
				}else{
					if(!facturaUpdated){
						res.status(404).send({message: "No se ha podido actualizar la factura"});
					}else{
						res.status(200).send({factura: facturaUpdated});
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
	var pathFile = './uploads/facturas/'; 

	fs.exists(pathFile + imageFile, function(exists){
		if(exists){
			res.sendFile(path.resolve(pathFile + imageFile));
		}else{
			res.status(200).send({message: "El archivo no existe"});	
		}
	});


}

module.exports = {
	crearFactura,
	editarFactura,
	eliminarFactura,
	obtenerFactura,
	subirArchivo,
	obtenerArchivo
};