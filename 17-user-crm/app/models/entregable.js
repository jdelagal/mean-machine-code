var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt 		 = require('bcrypt-nodejs');
var Catalogo = mongoose.model('Catalogo');

// Entragabnle schema 
var EntregableSchema   = new Schema({
	nombre: { type: String, required: true, index: { unique: true }},
	fecha: Date,
	entorno: String,
	fecha_prod: Date,
	fecha_pre: Date,
	fecha_demo: Date,
	fecha_int: Date,
	fecha_dev: Date,
	servicio: { type: Schema.ObjectId, ref: 'Catalogo' } 
});

module.exports = mongoose.model('Entregable', EntregableSchema);