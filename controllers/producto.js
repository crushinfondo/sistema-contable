'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var Producto = require('../models/producto');
var jwt = require('../services/jwt');

function obtenerProducto(req, res){
	var productoId = req.params.id;

	Producto.findById(productoId).populate({path: 'suscripcion'}).exec((err, producto)=>{
		if(err){
			res.status(500).send({message:"Error en la peticion"});
		}else{
			if(!producto){
				res.status(404).send({message:"El producto no existe"});
			}else{
				res.status(200).send({producto:producto});
			}
		}
	});
}

function crearProducto(req, res){
	var producto = new Producto();
	var params = req.body;

	producto.descripcion = params.descripcion;
	producto.preciocosto = params.preciocosto;
	producto.precioventa = params.precioventa;
	producto.imagen = "";
	producto.stockmaximo = params.stockmaximo;
	producto.stockminimo = params.stockminimo;
	producto.fechaCreacion = params.fechaCreacion;
	producto.sucursal = params.sucursal;
	producto.categoriaproducto = params.categoriaproducto;

	if(producto.descripcion != null){
		producto.save((err, productoStored)=>{
			if(err){
				res.status(500).send({message:"Error al guardar el producto"});
			}else{
				if(!productoStored){
					res.status(400).send({message:"No se ha registrado el producto"});	
				}else{
					res.status(200).send({producto:productoStored});
				}
			}
		});
	}else{
		res.status(200).send({message:"Rellena todos los campos"});
	}
}

function editarProducto(req, res){
	var productoId = req.params.id;
	var update = req.body;

	Producto.findByIdAndUpdate(productoId, update, (err, productoUpdated)=>{

		if(err){
			res.status(500).send({message: "Error al actualizar el producto"});
		}else{
			if(!productoUpdated){
				res.status(404).send({message: "No se ha podido actualizar el producto"});
			}else{
				res.status(200).send({producto: productoUpdated});
			}
		}

	});

}

function eliminarProducto(req, res){
	var productoId = req.params.id;

	Producto.find({producto: productoId}).remove((err, productoRemoved)=>{
		if(err){
			res.status(500).send({message: "Error al eliminar el producto"});
		}else{
			if(!productoRemoved){
				res.status(404).send({message: "El producto no ha sido eliminada"});
			}else{
				res.status(200).send({producto: productoRemoved});
			}
		}
	});

}

function subirImagen(req, res){
	var productoId = req.params.id;
	var fileName = 'Imagen no subida';

	if(req.files){
		var filePath = req.files.image.path;
		var fileSplit = filePath.split('\\');
		var fileName = fileSplit[2];

		var extSplit = fileName.split('\.');
		var fileExt = extSplit[1];
		
		if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
			Producto.findByIdAndUpdate(productoId, {imagen:fileName}, (err, productoUpdated)=>{
				if(err){
					res.status(500).send({message: "Error al actualizar el producto"});
				}else{
					if(!productoUpdated){
						res.status(404).send({message: "No se ha podido actualizar el producto"});
					}else{
						res.status(200).send({producto: productoUpdated});
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
	var pathFile = './uploads/productos/'; 

	fs.exists(pathFile + imageFile, function(exists){
		if(exists){
			res.sendFile(path.resolve(pathFile + imageFile));
		}else{
			res.status(200).send({message: "La imagen no existe"});	
		}
	});


}

module.exports = {
	crearProducto,
	editarProducto,
	eliminarProducto,
	obtenerProducto,
	subirImagen,
	obtenerImagen
};