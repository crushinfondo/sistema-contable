'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var FormaDePago = require('../models/formadepago');
var jwt = require('../services/jwt');

function obtenerFormaDePago(req, res){
}

function crearFormaDePago(req, res){
}

function editarFormaDePago(req, res){
}

function eliminarFormaDePago(req, res){
}

module.exports = {
	crearFormaDePago,
	editarFormaDePago,
	eliminarFormaDePago,
	obtenerFormaDePago
};