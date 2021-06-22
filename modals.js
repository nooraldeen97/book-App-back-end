const mongoose = require('mongoose');

  const modals={}

 modals.BooksSchema = new mongoose.Schema({
  name:String,
  description:String,
  status:String,
  imgURL:String
});


 modals.userSchema = new mongoose.Schema({
    email: String,
    books:[modals.BooksSchema]
  });
  

modals.ownerFavoriteBooks = mongoose.model('book', modals.userSchema);

  
module.exports=modals;