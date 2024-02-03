import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";

export const signup = async(req, res) =>{
    const {username, email, password} = req.body;
    if(!username || !email || !password || username === '' || email === '' || password === ''){
        return res.status(400).json({message: 'All field are required!'})
    }
    const hashedPass = bcryptjs.hashSync(password, 10)
    const newUser = new User({
        username,
        email,
        password: hashedPass
    })
    try{
        await newUser.save();
        res.json({message: 'Signup successfull'})
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
    

}