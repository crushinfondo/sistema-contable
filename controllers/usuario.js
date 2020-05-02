'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var Usuario = require('../models/usuario');
var jwt = require('../services/jwt');

function obtenerUsuario(req, res){
	var userId = req.params.id;

	Usuario.findById(userId).populate({path: 'organizacion'}).exec((err, usuario)=>{
		if(err){
			res.status(500).send({message:"Error en la peticion"});
		}else{
			if(!usuario){
				res.status(404).send({message:"El usuario no existe"});
			}else{
				res.status(200).send({usuario:usuario});
			}
		}
	});
}

function crearUsuario(req, res){
	var usuario = new Usuario();
	var params = req.body;

	usuario.nombre = params.nombre;
	usuario.apellido = params.apellido;
	usuario.puesto = params.puesto;
	usuario.email = params.email;
	usuario.rol = params.rol;
	usuario.password = params.password;
	usuario.fechaCreacion = params.fechaCreacion;
	usuario.imagen = "";
	usuario.sucursal = params.sucursal;
	usuario.organizacion = params.organizacion;

	if(params.password){
		bcrypt.hash(params.password, null, null, function(err, hash){
			usuario.password = hash;
			if(usuario.nombre != null && usuario.email != null){
				usuario.save((err, usuarioStored)=>{
					if(err){
						console.log(err);
						res.status(500).send({message:"Ya existe un usuario registrado con esos datos"});
					}else{
						if(!usuarioStored){
							res.status(400).send({message:"No se ha registrado el usuario"});	
						}else{
							res.status(200).send({usuario:usuarioStored});
						}
					}
				});
			}else{
				res.status(200).send({message:"Rellena todos los campos"});
			}
		});
	}
	else{
		res.status(200).send({message:"Introduce la contraseña"});
	}	

}


function loginUsuario(req, res){
	var params = req.body;

	var email = params.email;
	var password = params.password;

	Usuario.findOne({email: email}, (err,usuario)=> {
		if (err){
			res.status(500).send({message: "Error en la peticion"});
		}else{
			if(!usuario){
				res.status(404).send({message: "El correo y/o la contraseña no coinciden con nuestros registros."});
			}else{
				//Comprobar password
				bcrypt.compare(password, usuario.password, function(err, check){
					if(check){
						//Devolver datos del usuario logueado
						if(params.getHash){
							//Devolver un token de JWT
							res.status(200).send({
								token: jwt.createToken(usuario)
							});
						}
						else{
							res.status(200).send({usuario});
						}
					}else{
						res.status(404).send({message: "El correo y/o la contraseña no coinciden con nuestros registros."});
					}
				});
			}
		}
	});
}


function editarUsuario(req, res){
	var usuarioId = req.params.id;
	var update = req.body;

	Usuario.findByIdAndUpdate(usuarioId, update, (err, usuarioUpdated)=>{

		if(err){
			res.status(500).send({message: "Error al actualizar el usuario"});
		}else{
			if(!usuarioUpdated){
				res.status(404).send({message: "No se ha podido actualizar el usuario"});
			}else{
				res.status(200).send({usuario: usuarioUpdated});
			}
		}

	});

}

function eliminarUsuario(req, res){
	var catId = req.params.id;

	Usuario.find({usuario: catId}).remove((err, usuarioRemoved)=>{
		if(err){
			res.status(500).send({message: "Error al eliminar el usuario"});
		}else{
			if(!usuarioRemoved){
				res.status(404).send({message: "El usuario no ha sido eliminada"});
			}else{
				res.status(200).send({usuario: usuarioRemoved});
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
			Usuario.findByIdAndUpdate(catId, {imagen:fileName}, (err, usuarioUpdated)=>{
				if(err){
					res.status(500).send({message: "Error al actualizar el usuario"});
				}else{
					if(!usuarioUpdated){
						res.status(404).send({message: "No se ha podido actualizar el usuario"});
					}else{
						res.status(200).send({usuario: usuarioUpdated});
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
	var pathFile = './uploads/usuarios/'; 

	fs.exists(pathFile + imageFile, function(exists){
		if(exists){
			res.sendFile(path.resolve(pathFile + imageFile));
		}else{
			res.status(200).send({message: "La imagen no existe"});	
		}
	});
}

module.exports = {
	crearUsuario,
	loginUsuario,
	editarUsuario,
	eliminarUsuario,
	obtenerUsuario,
	subirImagen,
	obtenerImagen
};