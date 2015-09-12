var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// user schema
var OrderSchema   = new Schema({
	producto : {
    type : String, required: true, trim: true
  },
  precio : {
    type : Number,
  },
  cantidad : {
    type : Number,
  }
});

module.exports = mongoose.model('Order', OrderSchema);
