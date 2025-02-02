const bcrypt = require('bcrypt');

exports.getAllProducts = async (req , res )=> {
    try{
        const products = await products.find();
        res.json({mssg : "All Products"});
    }catch(err){
        res.status(500).json({mssg: err.mssg});
    }
};

exports.getProductByID = async (req, res) => {
    try{
        const products = await products.findById(req.params.id);
        res.json({mssg : "Product by ID "});
    }catch (err) {
        res.status(500).json({mssg:err.mssg});
    }
};

exports.getCart = async(req , res) => {
        const cart = req.session.cart || [];
        res.json({mssg : "Get cart"});
};

exports.addToCart = async(req , res) => {
    const {ProductID , quantity} = req.body;
    if(!req.session.cart) req.session.cart = [];
    req.session.cart.push({ProductID , quantity});
    res.json({mssg: "Added to Cart"});
};

exports.removeFromCart = async(req , res) => {
    const {ProductID} = req.params;
    if(!req.session.cart) req.session.cart = [];
    req.session.cart =  req.session.cart.filter(item => item.ProductID !== ProductID);
    res.json({mssg: "Removed from Cart"});
};

exports.RegisterUser = async(req , res) => {
    const{email , password} = req.body ;
    try{
        const hashedPassword = await bcrypt.hash(password , 8);
        const newUser = newUser({email, password :hashedpassword});
        await newUser.save();
        res.status(201).json({mssg: 'User Created'});
    }catch (err){
        res.status(500).json({mssg: err.mssg});
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
        req.session.userId = user._id;
        res.json({ message: 'Login successful' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};
  
exports.logoutUser = (req, res) => {
    req.session.destroy(err => {
    if (err) return res.status(500).json({ message: 'Logout failed' });
    res.json({ message: 'Logout successful' });
    });
};

