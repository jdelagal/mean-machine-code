var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt 		 = require('bcrypt-nodejs');
var Consumidor = mongoose.model('Consumidor');

// Entragabnle schema 
var CanalSchema   = new Schema({
	nombre: { type: String, required: true, index: { unique: true }},
	//proceso: String,
	consumidor: { type: Schema.ObjectId, ref: 'Consumidor' } 
});

module.exports = mongoose.model('Canal', CanalSchema);