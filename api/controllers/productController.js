const Product = require('../models/Product')

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' })
    }
}

exports.createproduct = async (req, res) => {
    const { name, type, price, rating, warranty_years, available } = req.body

    try {
        const product = await Product.create({ name, type, price, rating, warranty_years, available })
        res.status(201).json(product)
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' })
    }
}

exports.updateProduct = async (req, res) => {
    const { id } = req.params
    const { name, type, price, rating, warranty_years, available } = req.body

    try {
        const product = await Product.findByIdAndUpdate(
            id, 
            { name, type, price, rating, warranty_years, available }, 
            { new: true }
        )
        if (!product) {
            return res.status(404).json({ message: 'Produit inexistant ou introuvable' })
        }
        return res.status(200).json(product)
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' })
    }
}

exports.deleteProduct = async (req, res) => {
    const { id } = req.params

    try {
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json({ message: 'Produit inexistant ou introuvable' })
        }
        return res.status(200).json({ message: 'Produit supprimé' })
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' })
    }
}