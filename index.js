'use strict'

var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:4dm1n@cluster0-t3tir.mongodb.net/test?retryWrites=true&w=majority', (err, res)=>{
	if (err){
		throw err;
	} else {
		console.log("Base de datos corriendo correctamente");
	}
});