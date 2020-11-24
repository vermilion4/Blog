//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const ejs = require("ejs");
var _ = require('lodash');

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


 mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser:true, useUnifiedTopology:true});

const postSchema = mongoose.Schema({
  title:{type:String, required:true},
  content:{type:String, required:true}
});

const post = new mongoose.model('Post', postSchema)

app.get('/',function(req,res){
  
    post.find(function(err,posts){
        if(err){
            console.log(err);
        }else{
            res.render('home',{posts:posts});
        }
    })
})


app.get('/about', function(req,res){
  res.render('about',{aC:aboutContent})
})

app.get('/contact', function(req,res){
  res.render('contact',{cC:contactContent})
})

app.get('/compose', function(req,res){
  res.render('compose');
 
})

app.post('/compose', function(req,res){
const{title,content} = req.body;

const newPost = new post({title,content});

newPost.save(function(err){
  if(err){
    console.log(err)
  }else{
    res.redirect('/');
  }
})

});

app.get('/posts/:topic',function(req,res){
  const url = req.params.topic;
post.find(function(err,posts){
  if(err){
    console.log(err)
  }else{
    // for(var i = 0; i<posts.length; i++){
    //   if(_.lowerCase(url) == _.lowerCase(posts[i].title)){
    //  res.render('post',{title:posts[i].title,
    //                    content:posts[i].content});
    posts.forEach(function(poster){
      if(_.lowerCase(url) == _.lowerCase(poster.title)){
        res.render('post',{title:poster.title,
                        content:poster.content});
      }
    })
      }
    })
  })
// }).stream()
// .on('post',function(poster) {
//   const head = poster.title;
//      if(_.lowerCase(url) == _.lowerCase(head)){
//     res.render('post',{title:poster.title,
//                        content:poster.text})
//   }else{
//     console.log('Not Compatible');
//   }
// })

  
   









app.listen(3000, function() {
  console.log("Server started on port 3000");
});
