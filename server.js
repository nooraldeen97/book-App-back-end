'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const server = express();
server.use(cors());

const PORT = process.env.PORT;


//localhost:3001/test
server.get('/test',(req,res)=>{
    res.send(`its working fine :)))`);
})

// my data base name is books , here we connect mongoose with books data base 
mongoose.connect('mongodb://localhost:27017/books', {useNewUrlParser: true, useUnifiedTopology: true});



const BooksSchema = new mongoose.Schema({
    name:String,
    description:String,
    status:String,
    imgURL:String
  });


const userSchema = new mongoose.Schema({
    email: String,
    books:[BooksSchema]
  });


  const ownerFavoriteBooks = mongoose.model('book', userSchema);


function storeDatacollectios(){
    const myfav = new ownerFavoriteBooks ({
        email :'noor.khalaf307@gmail.com',
        books:[{
            name:'The One Thing',
            description:'In the number one Wall Street Journal bestseller, Gary Keller has identified that behind every successful person is their ONE Thing.',
            status:'Never be in a hurry; do everything quietly and in a calm spirit.',
            imgURL:'https://www.xeniumhr.com/wp-content/uploads/2014/08/IMG_5957-980x653.jpg'
        },{
            name:'Rising Strong',
            description:'Its about digging deep, and formulating your emotions into comprehensible language',
            status:'When things change inside you, things change around you.',
            imgURL:'https://m.media-amazon.com/images/P/B00P5557G2.01._SCLZZZZZZZ_SX500_.jpg'
        },{
            name:'Make Your Bed',
            description:'Little Things That Can Change Your Life...And Maybe the World - Kindle edition by McRaven, Admiral William',
            status:'Peace begins with a smile.',
            imgURL:'https://store.intrepidmuseum.org/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/m/a/make_your_bed.jpg'
        }]
    })

    myfav.save();
}


// storeDatacollectios();

//localhost:3001/book?emailQuery=noor.khalaf307@gmail.com
server.get('/books',getBooksHandler)


function getBooksHandler(req,res){
let enteredEmail = req.query.emailQuery;
ownerFavoriteBooks.find({email:enteredEmail},function(err,ownerData){
if(err){
    console.log('somthing went wrong');
}
else
{
    console.log(ownerData[0].books);
    res.send(ownerData[0].books);
}

})
};





server.listen(PORT,()=>{
    console.log(`listening to the port ${PORT}`);
});