const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const guardar = (productos = products) => fs.writeFileSync(productsFilePath, JSON.stringify(productos,null,2), 'utf-8');

/* utils */
const toThousand = require('../utils/toThousand');
const priceFinal = require('../utils/priceFinal');

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {
			products,
			toThousand,
			priceFinal

		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let producto = products.find( product => product.id === +req.params.id)
		res.render('detail', {
			producto,
			toThousand,
			priceFinal

		})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	// Create -  Method to store
	store: (req, res) => {
		
		const {name, price, discount, category, description} = req.body
		
		let product = {
			id : products[products.length - 1].id + 1,
			name,
			price : +price,
			discount : +discount,
			category,
			description
		}
		products.push(product)
		guardar()
		res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		let product = products.find( product => product.id === +req.params.id)
		res.render('product-edit-form',{
		product	
		})
	},
	// Update - Method to update
	update: (req, res) => {
		const {name, price, discount, category, description} = req.body
		products.map(producto => {
			if (producto.id === +req.params.id) {
				producto.name = name;
				producto.price = +price;
				producto.discount = +discount;
				producto.category = category;
				producto.description = description;
			}
		});
		guardar()
		res.redirect('/products')
		
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let productsModify = products.filter(product => product.id !== +req.params.id)
		guardar(productsModify)
		res.redirect('/products')
		
	}
	
};

module.exports = controller;