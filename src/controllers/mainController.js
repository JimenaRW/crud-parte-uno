const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

/* utils */
const toThousand = require('../utils/toThousand');
const priceFinal = require('../utils/priceFinal');


const controller = {
	index: (req, res) => {
		res.render('index', {
			products,
			priceFinal,
			toThousand
		})
	},
	search: (req, res) => {
		let results = products.filter( resultado => resultado.name.toLowerCase().includes(req.query.keywords.trim()))
		
		res.render('results', {
			products : results,
			priceFinal,
			toThousand,
			busqueda : req.query.keywords.trim()

		})
	},
};

module.exports = controller;
