'use strict'

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sistemacontable', (err, res)=>{
	if (err){
		throw err;
	} else {
		console.log("Base de datos corriendo correctamente.");
	}
});