var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt 		 = require('bcrypt-nodejs');
var Entregable = mongoose.model('Entregable');

// Entorno schema 
var EntornoSchema   = new Schema({
	fecha_pre: Date,
	fecha_demo: Date,
	fecha_int: Date,
	fecha_lab: Date,
	fecha_dev: Date,
	entregable: { type: Schema.ObjectId, ref: 'Entregable' ,  unique: true } 
});

module.exports = mongoose.model('Entorno', EntornoSchema);