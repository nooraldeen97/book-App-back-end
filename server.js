'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const modals = require('./modals');
require('dotenv').config();
const server = express();
server.use(cors());
server.use(express.json()); // to deal with req.body 

const PORT = process.env.PORT;


//localhost:3001/test
server.get('/test',(req,res)=>{
    res.send(`its working fine :)))`);
})

// my data base name is books , here we connect mongoose with books data base 
// mongoose.connect('mongodb://localhost:27017/books', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

   


function storeDatacollectios(){
    const myfav = new modals.ownerFavoriteBooks ({
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

//localhost:3001/books?emailQuery=noor.khalaf307@gmail.com
server.get('/books',getBooksHandler)
server.post('/books',addBooksHandler)
server.delete('/books/:id',deleteBooksHandler)
server.put('/books/:id',putBooksHandler)

function getBooksHandler(req,res){
let enteredEmail = req.query.emailQuery;
modals.ownerFavoriteBooks.find({email:enteredEmail},function(err,ownerData){
if(err){
    console.log('somthing went wrong');
}
else
{
    // console.log(ownerData[0].books);
    res.send(ownerData[0].books);
}

})
};


function addBooksHandler (req,res){
    const {email,bookName,description,status}=req.body;
    modals.ownerFavoriteBooks.find({email:email},(err,ownerData)=>{
        if(err){
            console.log('something went wrong!!')
            // console.log(ownerData[0])
        }else
        {
            ownerData[0].books.push({
                name:bookName,
                description:description,
                status:status

            })
            ownerData[0].save();
            res.send(ownerData[0].books);
        }

    })
}

function deleteBooksHandler (req,res){
   const id = req.params.id;
   const email=req.query.email;
    modals.ownerFavoriteBooks.find({email:email},(err,ownerData)=>{
        if(err){
            console.log('something went wrong!!')
            // console.log(ownerData[0])
        }else
        {
        const  newBooks = ownerData[0].books.filter((book)=>{
            if(book._id != id){
                return book;
            }
        })
        ownerData[0].books = newBooks;
        ownerData[0].save();
        // console.log(ownerData);
        // console.log(ownerData.books);
        res.send(ownerData[0].books);

        }

    })
}


function putBooksHandler (req,res){
    const {bookName,description,status,index,email}=req.body;
    const id =req.params.id;
    modals.ownerFavoriteBooks.findOne({email:email},(err,ownerData)=>{
        ownerData.books.splice(index,1, {
            name : bookName,
            description:description,
            status: status
        })
        
        ownerData.save();
        console.log(ownerData.books)
        res.send(ownerData.books)
    })
}




server.listen(PORT,()=>{
    console.log(`listening to the port ${PORT}`);
});