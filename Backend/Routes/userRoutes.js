import express from 'express'
import User from '../model/userModel.js'


const router = express.Router()

router.post("/user" , async (req , res) => {
    const {name , email , password} = req.body


    try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.json({success: false , message: "Email already exists"})
        }
        const newUser = new User({
            name,
            email,
            password
        })

        await newUser.save()

        res.json({success: true , message: "User create successfully"})

    } catch (error) {
        console.log(error);
        res.json({message: error.message})
    }
})

router.delete("/user/:id" , async (req , res) => {
    const { id } = req.params

    try {
        
        const deletedUser = await User.findByIdAndDelete(id);

        if(!deletedUser) {
            return res.json({success: false , message: "User not found"})
        }

        res.json({success: true , message: "User deleted successfully."})

    } catch (error) {   
        console.log(error);
        res.json({message: error.message})
    }
})

router.get('/user', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.json({ success: true, users }); // Include a success field in the response
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message }); // Return a 500 status code for server errors
    }
});

router.put('/user/:id' , async (req , res) => {

    const {id} = req.params
    const {name , email , password} = req.body

    try {
        
        const user = await User.findById(id)

        if(!user) {
            res.json({success: false , message: "User not found"})
        }
        
        user.name = name !== undefined ? name : user.name
        user.email = email !== undefined ? email : user.email
        user.password = password !== undefined ? password : user.password

        await user.save();

        res.json({success: true , message: "User updated successfully",user})
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
})

export default router