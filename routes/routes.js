const express = require('express');
const router = express.Router();
const User = require('../models/user');
const config = require('../config/database');
const passport = require('passport');

const jwt = require('jsonwebtoken');


const Contact = require('../models/contacts');
const Product = require('../models/products');
//retreiving contacts
router.get('/contact',(req,res,next)=>{
        Contact.find(function(err,contacts){
      	res.json(contacts);
      })
});

//retreiving products
router.get('/product',(req,res,next)=>{
        Product.find(function(err,products){
      	res.json(products);
      })
});

//add contacts
router.post('/contact',(req,res,next)=>{
	let newContact = new Contact({
		first_name:req.body.first_name,
		last_name:req.body.last_name,
		middle_name:req.body.middle_name,
		phone:req.body.phone
	}); 

	newContact.save((err,contact)=>{
     if(err){
     	res.json({msg:'failed to add contact'+err});
     }else{
     	res.json({msg:'Contact added successfully'});
     }

	});

});

router.delete('/contact/:id',(req,res,next)=>{
	//logic to delete contact

	Contact.remove({_id:req.params.id},function(err,result){
		if(err){
			res.json(err);
		}else{
			res.json(result);
		}
	})
});

//add product

router.post('/product',(req,res,next)=>{
	let newProduct = new Product({
		product_name:req.body.product_name,
		product_desc:req.body.product_desc,
		price:req.body.price
	}); 

	newProduct.save((err,product)=>{
     if(err){
     	res.json({msg:'failed to add product'+err});
     }else{
     	res.json({msg:'Product added successfully'});
     }

	});

});

//delete product

router.delete('/product/:id',(req,res,next)=>{
	//logic to delete contact

	Product.remove({_id:req.params.id},function(err,result){
		if(err){
			res.json(err);
		}else{
			res.json(result);
		}
	})
});

//Register
router.post('/register',(req, res, next)=>{
	let newUser = new User({
		name: req.body.name,  
		email:req.body.email,
		username:req.body.username,
		password:req.body.password
	}); 

	User.addUser(newUser, (err,user) =>{
		if(err){
			res.json({success:false, msg:"Failed to register user"});
		}else{
			res.json({success:true, msg:"User registered"});
		}
	});
});

//Authenticate
router.post('/authenticate',(req, res, next)=>{
	const username = req.body.username;
	const password = req.body.password;

	User.getUserByUsername(username, (err,user)=>{
	
		if(!user){
			return res.json({success:false, msg:"user not found "+err});
		}
		User.comparePassword(password, user.password, (err, isMatch)=>{
			
			if(isMatch){
				const token = jwt.sign(user.toJSON(), config.secret, {
					expiresIn:604800// 1 week
				});

				res.json({
					success: true,
					token: 'JWT '+token,
					user: {
						id:user._id,
						name: user.name,
						username:user.username,
						email:user.email
					}
				});
             }else{
             	return res.json({success: false, msg:"wrong password "+err});
             }
		}); 
	});
});

//Profile
router.get('/profile',passport.authenticate('jwt',{session:false}),(req, res, next)=>{
	res.json({user: req.user});
});



module.exports = router;