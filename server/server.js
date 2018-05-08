var mongoose 	= require('mongoose');
var express 	= require('express');
var bodyParser 	= require('body-parser');
var cors 		= require('cors');
var item 		= require('../model/item.js');
var expressObj 	= express();

var port = process.env.PORT || 8090;
var router = express.Router();

expressObj.use(bodyParser.urlencoded({
	extended:true
}));
expressObj.use(bodyParser.json());
expressObj.use(cors());
expressObj.use('/api', router);
expressObj.listen(port);

//Mongodb connection
mongoose.connect('mongodb://localhost:27017/node');

//Route before any other route
router.use(function(req, res, next) {
	//Do logging OR authentication
	console.log('Logging of all request will be done here');
	next();
})

//Create new item
router.route('/items').post(function(req, res) {
	
	var i = new item();
	i.title = req.body.title;
	i.price = req.body.price;
	i.instock = req.body.instock;
	i.photo = req.body.photo;
	
	i.save(function (err) {
		if(err) {
			res.send(err);
		}
		res.send({message: 'Item Created !'});
	})
});


//Return all the items
router.route('/items').get(function (req, res) {
	item.find(function (err, items) {
		if (err) {
			res.send(err);
		} 
		res.send(items);
	});
});

//Update the item
router.route('/items/:item_id').put(function (req, res) {
	item.findById(req.param.item_id, function(err, item) {
		if (err) {
			res.send(err);
		} 
		
		item.title = req.body.title;
		item.price = req.body.price;
		item.instock = req.body.instock;
		item.photo = req.body.photo;
		
		item.save(function (err) {
			if (err) {
				res.send(err);				
			}
			res.send({message: 'Item Updated !'});
		})
	}) 
});

console.log('REST api is running at ' + port);

