var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt 		 = require('bcrypt-nodejs');

// Auditoria schema 
var AuditoriaSchema   = new Schema({
	usuario: { type: String},
	accion: { type: String},
	crud: { type: String},
	datos: { type: String},
	fecha: Date
});

module.exports = mongoose.model('Auditoria', AuditoriaSchema);