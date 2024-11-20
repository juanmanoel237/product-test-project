const User = require('../models/User')
const jwt  = require('jsonwebtoken')

const protect = async (req, res, next) => {
    const token = req.headers['authorization']?.replace('Bearer ', '')
    if(!token){
        return res.status(401).json({ message:'Accès refusé token manquant' })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id).select('-password')

        if(!user){
            return res.status(401).json({ message:'Utilisateur introuvable' })
        }
        req.user = user
        next()
    }catch(err){
        console.error(err); 
        res.status(400).json({ message: 'Token invalide.' });
    }
}

module.exports = protect;