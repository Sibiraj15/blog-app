const express = require("express");
const router = express.Router();
const Category = require('../models/catergory');
const Post = require('../models/postModel');
const { title } = require("process");
const multer = require("multer");
const path = require('path');

const { json } = require("body-parser");



// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage });

// Get All post
router.get('/', async(req, res)=>{
    try {
        const posts = await  Post.find();
        res.json(posts)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Get a single post by id 
router.get('/:id', async(req, res)=>{
     try {
        const post = await  Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({message: 'Post not found'})
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({message: error.message})
    }   
})

// Create a new post
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      author: req.body.author,
      image: req.file ? `/uploads/${req.file.filename}` : null, // save path for frontend
    });

    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Update an existing post
router.put('/:id',async(req, res) =>{
    try {
        const post = await  Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({message: 'Post not found'})
        } 

        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        post.category = req.body.category || post.category;
        post.author = req.body.author || post.author;
        post.image = req.body.image || post.image;
        post.updatedAt = Date.now();

        const updatedPost = await post.save();
        res.json(updatedPost)

    } catch (error) {
      res.status(400).json({message: error.message})
  
    }
})

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const { email } = req.body; // logged-in user's email sent from frontend
    const existingPost = await Post.findById(req.params.id);

    if (!existingPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the logged-in user's email matches the author
    if (existingPost.author !== email) {
      return res.status(403).json({ message: 'You can only delete your own posts' });
    }

    await Post.findByIdAndDelete(existingPost._id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// fetch post by categoryID
router.get('/category/:categoryId', async(req, res) => {
    try {
        const categoryId = req.params.categoryId;

        // validate categoryID
        const categoryExists = await Category.findById(categoryId);
        if(!categoryExists){
            return res.status(404).json({message: ' Invalid Category ID'})
        }
        
        // fetch posts
        const posts = await Post.find({category: categoryId}).populate('category');
        res.status(200).json(posts);

    } catch (error) {
            res.status(500).json({message: error.message})

    }
})

// Get all posts of a specific user by email
router.get('/my-posts/:email', async (req, res) => {
  try {
    const userPosts = await Post.find({ author: req.params.email }).sort({ createdAt: -1 });
    res.json(userPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;