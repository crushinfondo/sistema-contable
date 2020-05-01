'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var Venta = require('../models/venta');
var jwt = require('../services/jwt');

function obtenerVenta(req, res){
	var ventaId = req.params.id;

	Venta.findById(ventaId).exec((err, venta)=>{
		if(err){
			res.status(500).send({message:"Error en la peticion"});
		}else{
			if(!venta){
				res.status(404).send({message:"La venta no existe"});
			}else{
				res.status(200).send({venta:venta});
			}
		}
	});
}

function crearVenta(req, res){
	var venta = new venta();
	var params = req.body;

	venta.fechaventa = params.fechaventa;
	venta.estado = params.estado;
	venta.fechavencimiento = params.fechavencimiento;
	venta.observacion = params.observacion;
	venta.archivo = "";
	venta.usuario = params.usuario;
	venta.cliente = params.cliente;
	venta.formadepago = params.formadepago;
	venta.productos = params.productos;

	if(venta.fechaventa != null){
		venta.save((err, ventaStored)=>{
			if(err){
				res.status(500).send({message:"Error al guardar la venta"});
			}else{
				if(!ventaStored){
					res.status(400).send({message:"No se ha registrado la venta"});	
				}else{
					res.status(200).send({venta:ventaStored});
				}
			}
		});
	}else{
		res.status(200).send({message:"Rellena todos los campos"});
	}
}

function editarVenta(req, res){
	var ventaId = req.params.id;
	var update = req.body;

	Venta.findByIdAndUpdate(ventaId, update, (err, ventaUpdated)=>{

		if(err){
			res.status(500).send({message: "Error al actualizar la venta"});
		}else{
			if(!ventaUpdated){
				res.status(404).send({message: "No se ha podido actualizar la venta"});
			}else{
				res.status(200).send({venta: ventaUpdated});
			}
		}

	});

}

function eliminarVenta(req, res){
	var ventaId = req.params.id;

	Venta.find({venta: ventaId}).remove((err, ventaRemoved)=>{
		if(err){
			res.status(500).send({message: "Error al eliminar la venta"});
		}else{
			if(!ventaRemoved){
				res.status(404).send({message: "La venta no ha sido eliminada"});
			}else{
				res.status(200).send({venta: ventaRemoved});
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
	crearVenta,
	editarVenta,
	eliminarVenta,
	obtenerVenta,
	subirArchivo,
	obtenerArchivo
};