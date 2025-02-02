const mongoose = require('mongoose');

const productSchema = new mongoose.Schema ({
    name : String,
    price :Number,
    description: String,
    imageURL : String ,
    deleiveryTime :String 
});

module.exports = mongoose.model('products', productSchema);