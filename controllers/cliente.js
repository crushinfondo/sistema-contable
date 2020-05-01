'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var Cliente = require('../models/cliente');
var jwt = require('../services/jwt');

function obtenerCliente(req, res){
	var clienteId = req.params.id;

	Cliente.findById(clienteId).populate({path: 'organizacion'}).exec((err, cliente)=>{
		if(err){
			res.status(500).send({message:"Error en la peticion"});
		}else{
			if(!cliente){
				res.status(404).send({message:"El cliente no existe"});
			}else{
				res.status(200).send({cliente:cliente});
			}
		}
	});
}

function crearCliente(req, res){
	var cliente = new Cliente();
	var params = req.body;

	cliente.nombre = params.nombre;
	cliente.razonSocial = params.razonSocial;
	cliente.fechaCreacion = params.fechaCreacion;
	cliente.organizacion = params.organizacion;

	if(cliente.nombre != null || cliente.razonSocial != null){
		cliente.save((err, clienteStored)=>{
			if(err){
				res.status(500).send({message:"Error al guardar el cliente"});
			}else{
				if(!clienteStored){
					res.status(400).send({message:"No se ha registrado el cliente"});	
				}else{
					res.status(200).send({cliente:clienteStored});
				}
			}
		});
	}else{
		res.status(200).send({message:"Rellena todos los campos"});
	}
}

function editarCliente(req, res){
	var clienteId = req.params.id;
	var update = req.body;

	Cliente.findByIdAndUpdate(clienteId, update, (err, clienteUpdated)=>{

		if(err){
			res.status(500).send({message: "Error al actualizar el cliente"});
		}else{
			if(!clienteUpdated){
				res.status(404).send({message: "No se ha podido actualizar el cliente"});
			}else{
				res.status(200).send({cliente: clienteUpdated});
			}
		}

	});

}

function eliminarCliente(req, res){
	var clienteId = req.params.id;

	Cliente.find({cliente: clienteId}).remove((err, clienteRemoved)=>{
		if(err){
			res.status(500).send({message: "Error al eliminar el cliente"});
		}else{
			if(!clienteRemoved){
				res.status(404).send({message: "El cliente no ha sido eliminado"});
			}else{
				res.status(200).send({cliente: clienteRemoved});
			}
		}
	});

}

module.exports = {
	crearCliente,
	editarCliente,
	eliminarCliente,
	obtenerCliente
};