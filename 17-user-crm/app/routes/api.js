var bodyParser = require('body-parser'); 	// get body-parser
var User       = require('../models/user');
var Catalogo       = require('../models/catalogo');
var Entregable       = require('../models/entregable');
var Consumidor       = require('../models/consumidor');
var Canal       = require('../models/canal');
var Entorno       = require('../models/entorno');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');

// super secret for creating tokens
var superSecret = config.secret;

module.exports = function(app, express) {

	var apiRouter = express.Router();

	// route to generate sample user
	apiRouter.post('/sample', function(req, res) {

		// look for the user named chris
		User.findOne({ 'username': 'chris' }, function(err, user) {

			// if there is no chris user, create one
			if (!user) {
				var sampleUser = new User();

				sampleUser.name = 'Chris';  
				sampleUser.username = 'chris'; 
				sampleUser.password = 'supersecret';

				sampleUser.save();
			} else {
				console.log(user);

				// if there is a chris, update his password
				user.password = 'supersecret';
				user.save();
			}

		});

	});

	// route to authenticate a user (POST http://localhost:8080/api/authenticate)
	apiRouter.post('/authenticate', function(req, res) {

	  // find the user
	  User.findOne({
	    username: req.body.username
	  }).select('name username password').exec(function(err, user) {

	    if (err) throw err;

	    // no user with that username was found
	    if (!user) {
	      res.json({ 
	      	success: false, 
	      	message: 'Authentication failed. User not found.' 
	    	});
	    } else if (user) {

	      // check if password matches
	      var validPassword = user.comparePassword(req.body.password);
	      if (!validPassword) {
	        res.json({ 
	        	success: false, 
	        	message: 'Authentication failed. Wrong password.' 
	      	});
	      } else {

	        // if user is found and password is right
	        // create a token
	        var token = jwt.sign({
	        	name: user.name,
	        	username: user.username
	        }, superSecret, {
	          expiresInMinutes: 1440 // expires in 24 hours
	        });

	        // return the information including token as JSON
	        res.json({
	          success: true,
	          message: 'Enjoy your token!',
	          token: token
	        });
	      }   

	    }

	  });
	});

	// route middleware to verify a token
	apiRouter.use(function(req, res, next) {
		// do logging
		console.log('Somebody just came to our app!');

	  // check header or url parameters or post parameters for token
	  var token = req.body.token || req.query.token || req.headers['x-access-token'];

	  // decode token
	  if (token) {

	    // verifies secret and checks exp
	    jwt.verify(token, superSecret, function(err, decoded) {      

	      if (err) {
	        res.status(403).send({ 
	        	success: false, 
	        	message: 'Failed to authenticate token.' 
	    	});  	   
	      } else { 
	        // if everything is good, save to request for use in other routes
	        req.decoded = decoded;
	            
	        next(); // make sure we go to the next routes and don't stop here
	      }
	    });

	  } else {

	    // if there is no token
	    // return an HTTP response of 403 (access forbidden) and an error message
   	 	res.status(403).send({ 
   	 		success: false, 
   	 		message: 'No token provided.' 
   	 	});
	    
	  }
	});

	// test route to make sure everything is working 
	// accessed at GET http://localhost:8080/api
	apiRouter.get('/', function(req, res) {
		res.json({ message: 'hooray! welcome to our api!' });	
	});

	// on routes that end in /users
	// ----------------------------------------------------
	apiRouter.route('/users')

		// create a user (accessed at POST http://localhost:8080/users)
		.post(function(req, res) {
			
			var user = new User();		// create a new instance of the User model
			user.name = req.body.name;  // set the users name (comes from the request)
			user.username = req.body.username;  // set the users username (comes from the request)
			user.password = req.body.password;  // set the users password (comes from the request)

			user.save(function(err) {
				if (err) {
					// duplicate entry
					if (err.code == 11000) 
						return res.json({ success: false, message: 'A user with that username already exists. '});
					else 
						return res.send(err);
				}

				// return a message
				res.json({ message: 'User created!' });
			});

		})

		// get all the users (accessed at GET http://localhost:8080/api/users)
		.get(function(req, res) {

			User.find({}, function(err, users) {
				if (err) res.send(err);

				// return the users
				res.json(users);
			});
		});

	// on routes that end in /users/:user_id
	// ----------------------------------------------------
	apiRouter.route('/users/:user_id')

		// get the user with that id
		.get(function(req, res) {
			User.findById(req.params.user_id, function(err, user) {
				if (err) res.send(err);

				// return that user
				res.json(user);
			});
		})

		// update the user with this id
		.put(function(req, res) {
			User.findById(req.params.user_id, function(err, user) {

				if (err) res.send(err);

				// set the new user information if it exists in the request
				if (req.body.name) user.name = req.body.name;
				if (req.body.username) user.username = req.body.username;
				if (req.body.password) user.password = req.body.password;

				// save the user
				user.save(function(err) {
					if (err) res.send(err);

					// return a message
					res.json({ message: 'User updated!' });
				});

			});
		})

		// delete the user with this id
		.delete(function(req, res) {
			User.remove({
				_id: req.params.user_id
			}, function(err, user) {
				if (err) res.send(err);

				res.json({ message: 'Successfully deleted' });
			});
		});

// on routes that end in /users
	// ----------------------------------------------------
	apiRouter.route('/catalogos')
		// get all the users (accessed at GET http://localhost:8080/api/catalogos)

				// create a user (accessed at POST http://localhost:8080/users)
		.post(function(req, res) {
			
			var catalogo = new Catalogo();		// create a new instance of the Catalogo model
			catalogo.servicio = req.body.servicio;  // set the catalogos services (comes from the request)
			//catalogo.proceso = req.body.proceso;  // set the catalogos proceso (comes from the request)
			//catalogo.entregable = req.body.entregable;  // set the catalogos entregable (comes from the request)
			//catalogo.entorno = req.body.entorno;  // set the catalogos entorno (comes from the request)
			//catalogo.fecha_prod = req.body.fecha_prod;  // set the catalogos fecha_prod (comes from the request)
			//catalogo.fecha_pre = req.body.fecha_pre;  // set the catalogos fecha_pre (comes from the request)
			//catalogo.fecha_demo = req.body.fecha_demo;  // set the catalogos fecha_demo (comes from the request)
			//catalogo.fecha_int = req.body.fecha_int;  // set the catalogos fecha_int (comes from the request)
			//catalogo.fecha_dev = req.body.fecha_dev;  // set the catalogos fecha_dev (comes from the request)
			catalogo.canal = req.body.canal;  // set the catalogos canal (comes from the request)			
			catalogo.consumidor = req.body.consumidor;  // set the catalogos consumidor (comes from the request)
			
			catalogo.save(function(err) {
				if (err) {
					// duplicate entry
					if (err.code == 11000) 
						return res.json({ success: false, message: 'El catatolo con ese valor del servicio ya existe. '});
					else 
						return res.send(err);
				}

				// return a message
				res.json({ message: 'Catalogo creado.' });
			});

		})

		.get(function(req, res) {	
			
			Catalogo.find({}, function(err, catalogos) {
				if (err) res.send(err);
				//console.log ("catalogos: "+catalogos);
				// return the users
				res.json(catalogos);
			});
		});

	// on routes that end in /catalogos/:catalogo_id
	// ----------------------------------------------------
	apiRouter.route('/catalogos/:catalogo_id')

		// get the catalogo with that id
		.get(function(req, res) {
			Catalogo.findById(req.params.catalogo_id, function(err, catalogo) {
				if (err) res.send(err);

				// return that catalogo
				res.json(catalogo);
			});
		})

		// update the catalogo with this id
		.put(function(req, res) {
			Catalogo.findById(req.params.catalogo_id, function(err, catalogo) {

				if (err) res.send(err);

				// set the new catalogo information if it exists in the request
				if (req.body.servicio) catalogo.servicio = req.body.servicio;

				//if (req.body.proceso) catalogo.proceso = req.body.proceso;
				//if (req.body.entregable) catalogo.entregable = req.body.entregable;
				//if (req.body.entorno) catalogo.entorno = req.body.entorno;
				//if (req.body.fecha_prod) catalogo.fecha_prod = req.body.fecha_prod;
				//if (req.body.fecha_pre) catalogo.fecha_pre = req.body.fecha_pre;
				//if (req.body.fecha_demo) catalogo.fecha_demo = req.body.fecha_demo;
				//if (req.body.fecha_int) catalogo.fecha_int = req.body.fecha_int;
				//if (req.body.fecha_dev) catalogo.fecha_dev = req.body.fecha_dev;
				if (req.body.canal) catalogo.canal = req.body.canal;
				if (req.body.consumidor) catalogo.consumidor = req.body.consumidor;

				// save the catalogo
				catalogo.save(function(err) {
					if (err) res.send(err);

					// return a message
					res.json({ message: 'Catalogo actualizado.' });
				});

			});
		})

		// delete the catalogo with this id
		.delete(function(req, res) {
			Catalogo.remove({
				_id: req.params.catalogo_id
			}, function(err, catalogo) {
				if (err) res.send(err);
				res.json({ message: 'Borrado con Exito.' });
			});
		});

	// on routes that end in /estregables
	// ----------------------------------------------------
	apiRouter.route('/entregables')

		.get(function(req, res) {	
			
			Entregable.find({}, function(err, entregables) {
				Catalogo.populate(entregables, {path: "catalogo"}, function(err, entregables){
					if (err) res.send(err);

					// return the entregables
					res.json(entregables);
					//console.log ("11111111111111 " + entregables);
				});
			});
		});

	// on routes that end in /entregables/:catalogo_id
	// ----------------------------------------------------
	apiRouter.route('/entregables/:catalogo_id')

		// get the entregable with that id
		.get(function(req, res) {
			Entregable.findById(req.params.catalogo_id, function(err, entregable) {
				Catalogo.populate(entregable, {path: 'catalogo'})
				if (err) res.send(err);

				// return that entregable
				res.json(entregable);
			});
		})

		.post(function(req, res) {
			var entregable = new Entregable();		// create a new instance of the Catalogo model
			entregable.nombre = req.body.nombre;  // set the catalogos nombre (comes from the request)
			entregable.entorno = req.body.entorno;  // set the catalogos entorno (comes from the request)
			entregable.catalogo = req.params.catalogo_id;  // set the catalogos entorno (comes from the request)
			entregable.fecha_prod = req.body.fecha_prod;  // set the catalogos fecha_prod (comes from the request)
			if (req.body.fecha_prod) entregable.fecha_prod = req.body.fecha_prod
			else entregable.fecha_prod = new Date;
			
			//catalogo.entregable = req.body.entregable;  // set the catalogos entregable (comes from the request)
			//catalogo.entorno = req.body.entorno;  // set the catalogos entorno (comes from the request)
			//catalogo.fecha_prod = req.body.fecha_prod;  // set the catalogos fecha_prod (comes from the request)
			//catalogo.fecha_pre = req.body.fecha_pre;  // set the catalogos fecha_pre (comes from the request)
			//catalogo.fecha_demo = req.body.fecha_demo;  // set the catalogos fecha_demo (comes from the request)
			//catalogo.fecha_int = req.body.fecha_int;  // set the catalogos fecha_int (comes from the request)
			//catalogo.fecha_dev = req.body.fecha_dev;  // set the catalogos fecha_dev (comes from the request)
		
			entregable.save(function(err) {
				if (err) {
					// duplicate entry
					if (err.code == 11000) 
						return res.json({ success: false, message: 'El entregable con ese valor ya existe. '});
					else 
						return res.send(err);
				}

				// return a message
				res.json({ message: 'Entregable creado.' });
			});

		})

	// on routes that end in /entregables/:entregable_id
	// ----------------------------------------------------
	apiRouter.route('/entregables/:entregable_id')

		// update the catalogo with this id
		.put(function(req, res) {
			Entregable.findById(req.params.entregable_id, function(err, entregable) {

				if (err) res.send(err);

				// set the new catalogo information if it exists in the request
				if (req.body.nombre) entregable.nombre = req.body.nombre;
				if (req.body.entorno) entregable.entorno = req.body.entorno;
				if (req.body.fecha_prod) entregable.fecha_prod = req.body.fecha_prod;

				// save the entregable
				entregable.save(function(err) {
					if (err) res.send(err);

					// return a message
					res.json({ message: 'Entregable Actualizado.' });
				});

			});
		})

		// delete the entregable with this id
		.delete(function(req, res) {
			Entregable.remove({
				_id: req.params.entregable_id
			}, function(err, entregable) {
				if (err) res.send(err);
				res.json({ message: 'Borrado con Exito.' });
			});
		});
		

	// on routes that end in /consumidores
	// ----------------------------------------------------
	apiRouter.route('/consumidores')

		.get(function(req, res) {	
			
			Consumidor.find({}, function(err, consumidores) {
				Catalogo.populate(consumidores, {path: "catalogo"}, function(err, consumidores){
					if (err) res.send(err);

					// return the entregables
					res.json(consumidores);
					//console.log ("11111111111111 " + consumidores);
				});
			});
		});
	// on routes that end in /consumidores/:catalogo_id
	// ----------------------------------------------------
	apiRouter.route('/consumidores/:catalogo_id')
				// get the consumidor with that id
		.get(function(req, res) {
			Consumidor.findById(req.params.catalogo_id, function(err, consumidor) {
				Catalogo.populate(consumidor, {path: 'catalogo'})
				if (err) res.send(err);

				// return that entregable
				res.json(consumidor);
			});
		})

		.post(function(req, res) {
			var consumidor = new Consumidor();		// create a new instance of the Catalogo model
			consumidor.nombre = req.body.nombre;  // set the catalogos nombre (comes from the request)
			consumidor.catalogo = req.params.catalogo_id;  // set the catalogos entorno (comes from the request)

			consumidor.save(function(err) {
				if (err) {
					// duplicate entry
					if (err.code == 11000) 
						return res.json({ success: false, message: 'El consumidor con ese valor ya existe. '});
					else 
						return res.send(err);
				}

				// return a message
				res.json({ message: 'Consumidor creado.' });
			});

		});

	// on routes that end in /entregables/:entregable_id
	// ----------------------------------------------------
	apiRouter.route('/consumidores/:consumidor_id')

				// update the catalogo with this id
		.put(function(req, res) {
			Consumidor.findById(req.params.consumidor_id, function(err, consumidor) {

				if (err) res.send(err);

				// set the new catalogo information if it exists in the request
				if (req.body.nombre) consumidor.nombre = req.body.nombre;

				// save the consumidor
				consumidor.save(function(err) {
					if (err) res.send(err);

					// return a message
					res.json({ message: 'Consumidor Actualizado.' });
				});

			});
		})

		// delete the consumidor with this id
		.delete(function(req, res) {
			Consumidor.remove({
				_id: req.params.consumidor_id
			}, function(err, consumidor) {
				if (err) res.send(err);
				res.json({ message: 'Borrado con Exito.' });
			});
		});

		// on routes that end in /canales
	// ----------------------------------------------------
	apiRouter.route('/canales')

		.get(function(req, res) {	
			
			Canal.find({}, function(err, canales) {
				Consumidor.populate(canales, {path: "consumidor"}, function(err, canales){
					if (err) res.send(err);

					// return the canales
					res.json(canales);
					//console.log ("11111111111111 " + canales);
				});
			});
		});

	// on routes that end in /canales/:consumidor_id
	// ----------------------------------------------------
	apiRouter.route('/canales/:consumidor_id')

		.get(function(req, res) {
			Canal.findById(req.params.consumidor_id, function(err, canal) {
				Consumidor.populate(canal, {path: 'consumidor'})
				if (err) res.send(err);

				// return that entregable
				res.json(canal);
			});
		})
		.post(function(req, res) {
			var canal = new Canal();		// create a new instance of the Catalogo model
			canal.nombre = req.body.nombre;  // set the catalogos nombre (comes from the request)
			canal.consumidor = req.params.consumidor_id;  // set the catalogos entorno (comes from the request)

			canal.save(function(err) {
				if (err) {
					// duplicate entry
					if (err.code == 11000) 
						return res.json({ success: false, message: 'El Canal con ese valor ya existe. '});
					else 
						return res.send(err);
				}

				// return a message
				res.json({ message: 'Canal creado.' });
			});

		});		

	// on routes that end in /canales/:canal_id
	// ----------------------------------------------------
	apiRouter.route('/canales/:canal_id')

				// update the catalogo with this id
		.put(function(req, res) {
			Canal.findById(req.params.canal_id, function(err, canal) {

				if (err) res.send(err);

				// set the new canal information if it exists in the request
				if (req.body.nombre) canal.nombre = req.body.nombre;
				//console.log ("11111111111111 " + canal);
				// save the canal
				canal.save(function(err) {
					if (err) res.send(err);

					// return a message
					res.json({ message: 'Canal Actualizado.' });
				});

			});
		})

		// delete the canal with this id
		.delete(function(req, res) {
			Canal.remove({
				_id: req.params.canal_id
			}, function(err, canal) {
				if (err) res.send(err);
				res.json({ message: 'Borrado con Exito.' });
			});
		});		

	// on routes that end in /entornos
	// ----------------------------------------------------
	apiRouter.route('/entornos')

		.get(function(req, res) {	
			
			Entorno.find({}, function(err, entornos) {
				Entorno.populate(entornos, {path: "entregable"}, function(err, entornos){
					if (err) res.send(err);

					// return the entornos
					res.json(entornos);
					//console.log ("11111111111111 " + entornos);
				});
			});
		});		
	// api endpoint to get user information
	apiRouter.get('/me', function(req, res) {
		res.send(req.decoded);
	});

	return apiRouter;
};
