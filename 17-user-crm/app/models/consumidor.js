var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt 		 = require('bcrypt-nodejs');
var Catalogo = mongoose.model('Catalogo');

// Entragabnle schema 
var ConsumidorSchema   = new Schema({
	nombre: { type: String, required: true, index: { unique: true }},
	//proceso: String,
	canal: String,
	catalogo: { type: Schema.ObjectId, ref: 'Catalogo' } 
});

module.exports = mongoose.model('Consumidor', ConsumidorSchema);