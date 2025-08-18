require("dotenv").config();
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const postRoutes = require('./routes/posts')
const categoryRoutes = require('./routes/categories')
const authRoutes = require('./routes/auth')



// Express app
const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(bodyParser.json());
app.use(cors({
  origin: ["http://localhost:5173", "https://blog-app-azure-zeta.vercel.app/"],
  credentials: true, // if using cookies or auth headers
}));

// to server upload files
app.use('/uploads', express.static('uploads'));

//connect  mongoDB
    mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("MongoDB connected Successfully"))
    .catch(err => console.log('MongoDB connection error',err));

// use Routes

    app.use('/api/posts',postRoutes);
    app.use('/api/categories',categoryRoutes);
    app.use('/api/auth',authRoutes)


    app.listen(PORT, ()=> console.log(`Server listening on Port ${PORT}`))
