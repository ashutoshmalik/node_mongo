var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
	title : String,
	price : Number, 
	instock : Boolean, 
	photo : String
});

module.exports = mongoose.model('item', ItemSchema);