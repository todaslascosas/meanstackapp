const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	product_name:{
		type:String,
		required:true
	},
	product_desc:{
		type:String,
		required:true
	},
	price:{
		type:String,
		required: true
	},
});

const Product = module.exports = mongoose.model('Product', productSchema);
