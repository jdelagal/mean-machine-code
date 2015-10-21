var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt 		 = require('bcrypt-nodejs');

// user schema 
var UsuarioSchema   = new Schema({
	name: String,
	username: { type: String, required: true, index: { unique: true }},
	password: { type: String, required: true, select: false }
});

// hash the password before the user is saved
UsuarioSchema.pre('save', function(next) {
	var usuario = this;

	// hash the password only if the password has been changed or user is new
	if (!usuario.isModified('password')) return next();

	// generate the hash
	bcrypt.hash(usuario.password, null, null, function(err, hash) {
		if (err) return next(err);

		// change the password to the hashed version
		usuario.password = hash;
		next();
	});
});

// method to compare a given password with the database hash
UsuarioSchema.methods.comparePassword = function(password) {
	var user = this;

	return bcrypt.compareSync(password, usuario.password);
};

module.exports = mongoose.model('Usuario', UserSchema);