'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var CategoriaProducto = require('../models/categoriaproducto');
var jwt = require('../services/jwt');

function obtenerCategoriaProducto(req, res){
	var catId = req.params.id;

	CategoriaProducto.findById(catId).populate({path: 'organizacion'}).exec((err, categoria)=>{
		if(err){
			res.status(500).send({message:"Error en la peticion"});
		}else{
			if(!categoria){
				res.status(404).send({message:"La categoria no existe"});
			}else{
				res.status(200).send({categoria:categoria});
			}
		}
	});
}

function crearCategoriaProducto(req, res){
	var categoria = new CategoriaProducto();
	var params = req.body;

	categoria.descripcion = params.descripcion;
	categoria.ganancia = params.ganancia;
	categoria.imagen = "";
	categoria.organizacion = params.organizacion;

	if(categoria.descripcion != null){
		categoria.save((err, categoriaStored)=>{
			if(err){
				res.status(500).send({message:"Error al guardar la categoria"});
			}else{
				if(!categoriaStored){
					res.status(400).send({message:"No se ha registrado la categoria"});	
				}else{
					res.status(200).send({categoria:categoriaStored});
				}
			}
		});
	}else{
		res.status(200).send({message:"Rellena todos los campos"});
	}
}

function editarCategoriaProducto(req, res){
	var catId = req.params.id;
	var update = req.body;

	CategoriaProducto.findByIdAndUpdate(catId, update, (err, categoriaUpdated)=>{

		if(err){
			res.status(500).send({message: "Error al actualizar la categoria"});
		}else{
			if(!categoriaUpdated){
				res.status(404).send({message: "No se ha podido actualizar la categoria"});
			}else{
				res.status(200).send({categoria: categoriaUpdated});
			}
		}

	});

}

function eliminarCategoriaProducto(req, res){
	var catId = req.params.id;

	CategoriaProducto.find({categoria: catId}).remove((err, categoriaRemoved)=>{
		if(err){
			res.status(500).send({message: "Error al eliminar la categoria"});
		}else{
			if(!categoriaRemoved){
				res.status(404).send({message: "La categoria no ha sido eliminada"});
			}else{
				res.status(200).send({categoria: categoriaRemoved});
			}
		}
	});

}

function subirImagen(req, res){
	var catId = req.params.id;
	var fileName = 'Imagen no subida';

	if(req.files){
		var filePath = req.files.image.path;
		var fileSplit = filePath.split('\\');
		var fileName = fileSplit[2];

		var extSplit = fileName.split('\.');
		var fileExt = extSplit[1];
		
		if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
			CategoriaProducto.findByIdAndUpdate(catId, {imagen:fileName}, (err, categoriaUpdated)=>{
				if(err){
					res.status(500).send({message: "Error al actualizar la categoria"});
				}else{
					if(!categoriaUpdated){
						res.status(404).send({message: "No se ha podido actualizar la categoria"});
					}else{
						res.status(200).send({categoria: categoriaUpdated});
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
	var pathFile = './uploads/categorias/'; 

	fs.exists(pathFile + imageFile, function(exists){
		if(exists){
			res.sendFile(path.resolve(pathFile + imageFile));
		}else{
			res.status(200).send({message: "La imagen no existe"});	
		}
	});


}

module.exports = {
	crearCategoriaProducto,
	editarCategoriaProducto,
	eliminarCategoriaProducto,
	obtenerCategoriaProducto,
	subirImagen,
	obtenerImagen
};