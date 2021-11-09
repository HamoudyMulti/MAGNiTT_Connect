var express = require("express");
var router = express.Router();

const posts = [
  {
    username: "Kyle",
    title: "Post 1",
  },
  {
    username: "Jim",
    title: "Post 2",
  },
];


router.get('/',(req,res)=> {
    res.json(posts);
});


router.get('/login',(req,res)=>{
    
});


module.exports = router;