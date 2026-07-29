const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { log } = require("console");

app.use(express.json());
app.use(cors());

// Database connection with MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

//Image storing engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage });

//Creating upload endpoints for images
app.use('/images',express.static('upload/images'))

app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
});

//Schema for creating products
const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    }
})

app.post('/addproduct',async (req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    try{
        const product = new Product({
            id:id,
            name:req.body.name,
            image:req.body.image,
            category:req.body.category,
            new_price:req.body.new_price,
            old_price:req.body.old_price,
            description:req.body.description,
        });
        console.log(product);
        await product.save();
        console.log("Saved");
        res.json({
            success:true,
            name:req.body.name,
        });
    }catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
            message:error.message,
        });
    }
});

//Creating apis for deleting the product
app.post('/removeproduct', async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
});

//Creating API for
//Creating API for getting all products
app.get('/allproducts', async (req,res)=>{
    let products = await Product.find({});
    console.log("All Product Fetched");
    res.send(products);
})

//Schema creating for user model

const Users = mongoose.model('Users',{
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        unique: true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default: Date.now,
    }
})

//schema creating for newsletter
// This code appears to be creating a schema for a newsletter application using JavaScript and a framework called Mongoose.

const newsletter = mongoose.model('newsletter',{ 
  email: {
    type: String,
    required: true,
    unique: true, // The email field must be unique for each document in the collection
    lowercase: true, // The email field will be converted to lowercase
    validate: {
      validator: (value) => {
        // Using a regular expression to validate the email format
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase());
      },
      message: 'Please enter a valid email' // Error message to display if the email format is invalid
    }
  },
  
});

//Schema craeting for checkoutpage
 
const placeorderSchema = new mongoose.Schema({
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: function(value) {
          const re = /^[0-9]{10}$/;
          return re.test(value);
        },
        message: 'Please enter a valid 10-digit phone number.',
      },
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    upiId: {
      type: String,
      required: true,
      validate: {
        validator: function(value) {
          const re = /^[a-zA-Z0-9.-]{2,256}@[a-zA-Z0-9.-]{2,64}$/;
          return re.test(value);
        },
        message: 'Please enter a valid UPI ID.',
      },
    },
    products: [{
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    }],
  });
  
  const placeorder = mongoose.model('placeorder', placeorderSchema);
  
  //endpoint for placeorder

  app.post('/placeorder', async (req, res) => {
    const { phoneNumber, city, address, products, upiId } = req.body;
  
    // Validate the request body
    if (!phoneNumber || !city || !upiId || !address || !products || !Array.isArray(products) || !products.every(p => p.productId && p.quantity)) {
      return res.status(400).json({ error: 'All fields are required, and products must be an array of objects with productId and quantity properties.' });
    }
  
    // Create a new place order
    const placeOrder = new placeorder({ phoneNumber, city, address, products, upiId });
  
    try {
      const savedPlaceOrder = await placeOrder.save();
      res.status(201).json(savedPlaceOrder);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: 'Something went wrong.' });
    }
  });

//craeting endpoints for newsletter
app.post('/newsletter', async (req, res) => {
    const { email } = req.body;
  
    // Check if the email is already subscribed to the newsletter
    const existingSubscriber = await newsletter.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ success: false, errors: 'Email already subscribed to the newsletter' });
    }
  
    // Create a new newsletter subscriber
    const subscriber = new newsletter({ email });
    await subscriber.save();
  
    // Send a response to the client side
    res.json({ success: true, message: 'Subscribed to the newsletter successfully' });
  });


//creating endpoints for registering the user
app.post('/signup',async(req,res)=>{

    let check = await  Users.findOne({email : req.body.email});  //check if this email is already registered or not
    if(check){
        return res.status(400).json({success:false,errors:'existing user found with same email id'})
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i]=0;
    }
    const user = new  Users({
        name : req.body.username ,
        email : req.body.email,
        password : req.body.password,
        cartData : cart,
    });

    await  user.save();

    const data ={
        user:{
            id:user.id
        }
    }
    const token = jwt.sign(data,'secret_ecom');
    //sending response to client side after successful registration of a user
    res.json({success:true,token,"message":"User has been registered"});
     
})

//creating endpoint for user login
app.post('/login',async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
           res.json({success:true,token, errors:"You are successfully logged in!"});
        }
        else{
            res.json({success:false, errors:"Wrong Password!"});
        }
    }
    else{
        res.json({success:false, errors:"Wrong Email Id!"});
    }
})

//creating end point for newcollection data
app.get('/newcollections',async(req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New Collection Fetched");
    res.send(newcollection);
})

//creating endpoint for popular in women section
app.get('/popularinwomen',async(req,res)=>{
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0,4);
    console.log("Popular in women fetched");
    res.send(popular_in_women);
})

//creating endpoint for popular in women section
app.get('/relatedproduct',async(req,res)=>{
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0,4);
    console.log("Related Product");
    res.send(popular_in_women);
})

//creating middleware to fetch user
const fetchUser = async (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
    }
    else{
        try{
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        }catch (error) {
            res.status(401).send({errors:"Please authenticate using valid token"})
        }
    }
}


//creating endpoint for adding product in cartdata
app.post('/addtocart',fetchUser,async(req,res)=>{
    console.log("added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send('Added');

}) 

//creating endpoint for removing product from cartdata
app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log("removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send('Removed');
}) 

//creating endpoint to get cartdata
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

app.listen(port,(error)=>{
        if(!error)
        {
            console.log("Server running on port"+port)
        }
        else{
            console.log("Error :"+error)
        }
    })