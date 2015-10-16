var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt 		 = require('bcrypt-nodejs');
var Entregable = mongoose.model('Entregable');

// Entorno schema 
var EntornoSchema   = new Schema({
	nombre: { type: String, required: true, index: { unique: true }},
	fecha_pre: Date,
	fecha_demo: Date,
	fecha_int: Date,
	fecha_lab: Date,
	fecha_dev: Date,
	entregable: { type: Schema.ObjectId, ref: 'Entregable' } 
});

module.exports = mongoose.model('Entorno', EntornoSchema);