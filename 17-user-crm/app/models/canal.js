var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt 		 = require('bcrypt-nodejs');

// canal schema 
var CanalSchema   = new Schema({
	id: { type: String, required: true, index: { unique: true }},
	nombre: String,
	descripcion: String,
	fecha: String,
	protocolo: String,
});

module.exports = mongoose.model('Canal', CanalSchema);