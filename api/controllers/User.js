const jwt = require('jsonwebtoken')
const User = require('../models/User')

const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'1h'})
}

exports.register = async (req, res) => {
    const {email, password} = req.body

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ 
            message: 'Format d\'email invalide' 
        });
    }

    try{
        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(400).json({message:'Utilisateur déjà exisant'})
        }

        const user = new User({email, password})
        await user.save()

        const token = generateToken(user._id)
        res.status(201).json({
            token,
            user:{
                id: user._id,
                email: user.email
            }
        })
    }
    catch(err){
        res.status(500).json({ message: 'Erreur lors de l\'inscription.' })
    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body

    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:'Identifiants invalides.'})
        }

        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            return res.status(400).json({message:'Identifiants invalides.'})
        }

        const token = generateToken(user._id)
        res.json({
            token,
            user:{
                id: user._id,
                email: user.email
            }
        })
    }
    catch(err){
        res.status(500).json({ message: 'Erreur lors de la connexion.' })
    }
}