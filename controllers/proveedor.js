'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var Proveedor = require('../models/proveedor');
var jwt = require('../services/jwt');

function obtenerProveedor(req, res){
	var proveedorId = req.params.id;

	Proveedor.findById(proveedorId).populate({path: 'organizacion'}).exec((err, proveedor)=>{
		if(err){
			res.status(500).send({message:"Error en la peticion"});
		}else{
			if(!proveedor){
				res.status(404).send({message:"El proveedor no existe"});
			}else{
				res.status(200).send({proveedor:proveedor});
			}
		}
	});
}

function crearProveedor(req, res){
	var proveedor = new Proveedor();
	var params = req.body;

	proveedor.nombre = params.nombre;
	proveedor.fechaCreacion = params.fechaCreacion;
	proveedor.organizacion = params.organizacion;

	if(proveedor.nombre != null){
		proveedor.save((err, proveedorStored)=>{
			if(err){
				res.status(500).send({message:"Error al guardar el proveedor"});
			}else{
				if(!proveedorStored){
					res.status(400).send({message:"No se ha registrado el proveedor"});	
				}else{
					res.status(200).send({proveedor:proveedorStored});
				}
			}
		});
	}else{
		res.status(200).send({message:"Rellena todos los campos"});
	}
}

function editarProveedor(req, res){
	var proveedorId = req.params.id;
	var update = req.body;

	Proveedor.findByIdAndUpdate(proveedorId, update, (err, proveedorUpdated)=>{

		if(err){
			res.status(500).send({message: "Error al actualizar el proveedor"});
		}else{
			if(!proveedorUpdated){
				res.status(404).send({message: "No se ha podido actualizar el proveedor"});
			}else{
				res.status(200).send({proveedor: proveedorUpdated});
			}
		}

	});

}

function eliminarProveedor(req, res){
	var proveedorId = req.params.id;

	Proveedor.find({proveedor: proveedorId}).remove((err, proveedorRemoved)=>{
		if(err){
			res.status(500).send({message: "Error al eliminar el proveedor"});
		}else{
			if(!proveedorRemoved){
				res.status(404).send({message: "El proveedor no ha sido eliminada"});
			}else{
				res.status(200).send({proveedor: proveedorRemoved});
			}
		}
	});

}

module.exports = {
	crearProveedor,
	editarProveedor,
	eliminarProveedor,
	obtenerProveedor
};