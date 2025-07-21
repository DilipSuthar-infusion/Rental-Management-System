import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Profile from "../models/Profile.model.js";



export const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const existingUser = await User.findOne({where:{ email }});
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            role
        });

        await user.save();
        const profile = await Profile.create({userId: user.id})
        await profile.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};




export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
       
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};





export const createProfile = async (req, res) => {
    try {
      const {workProfile, gender, age, phone, address } = req.body;

      const user = await User.findOne({ where: { id: req.user.id } });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      
      let profile = await Profile.findOne({ where: { userId: user.id } });
  
      if (profile) {
        profile.workProfile = workProfile;
        profile.gender = gender;
        profile.age = age;
        profile.phone = phone;
        profile.address = address;
        await profile.save();
        return res.status(200).json({ message: "Profile updated successfully" });
      
      }
    } catch (error) {
      console.error("Create profile error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };



  export const getUserProfile = async (req, res) => {
    try {
      const profile = await Profile.findOne({
        where: { userId: req.user.id },
        include: [
          {
            model: User,
            attributes: ['id', 'username', 'email', 'role'],
          },
        ],
      });
  
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  

  
      res.status(200).json({ profile });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  