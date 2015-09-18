var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt 		 = require('bcrypt-nodejs');

// user schema 
var CatalogoSchema   = new Schema({
	servicio: { type: String, required: true, index: { unique: true }},
	proceso: String,
	entregable: String,
	entorno: String,
	fecha_prod: Date,
	fecha_pre: Date,
	fecha_demo: Date,
	fecha_int: Date,
	fecha_dev: Date,
	canal: String,
	consumidor: String
});

module.exports = mongoose.model('Catalogo', CatalogoSchema);