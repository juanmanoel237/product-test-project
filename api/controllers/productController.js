const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Produit inexistant ou introuvable' });
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.createProduct = async (req, res) => {
    const { name, type, price, rating, warranty_years, available } = req.body;

    try {
        const product = await Product.create({
            name,
            type,
            price,
            rating,
            warranty_years,
            available,
            userId: req.user.id,
        });

        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, type, price, rating, warranty_years, available } = req.body;

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Produit inexistant ou introuvable' });
        }

        // Vérifier que l'utilisateur connecté est le propriétaire
        if (product.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Accès refusé : Vous ne pouvez pas modifier ce produit.' });
        }

        product.name = name || product.name;
        product.type = type || product.type;
        product.price = price || product.price;
        product.rating = rating || product.rating;
        product.warranty_years = warranty_years || product.warranty_years;
        product.available = available || product.available;

        await product.save();
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Produit inexistant ou introuvable' });
        }

        if (product.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Accès refusé : Vous ne pouvez pas supprimer ce produit.' });
        }

        await product.deleteOne();
        res.status(200).json({ message: 'Produit supprimé avec succès.' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
