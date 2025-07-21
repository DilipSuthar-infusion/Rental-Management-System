import express from 'express';
import { sequelize } from './models/index.js'
import userRoute from './routes/user.route.js'
import propertyRoute from './routes/property.route.js'
import dotenv from 'dotenv';
import './config/passport.js';
import passport from 'passport';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use('/upload', express.static(path.join(__dirname, 'upload')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
const port =  process.env.PORT || 5000;


app.get('/',(req, res)=>{
    res.json("api is running")
})

app.use(userRoute)
app.use(propertyRoute)

app.listen(port, () => {
    sequelize.sync({ force : false }).then(() => {
        console.log("Sync successfully");
    }).catch((err) => {
        console.error("Error during sync:", err);
    });

    console.log(`Server is running on Port ${port}`);
});
