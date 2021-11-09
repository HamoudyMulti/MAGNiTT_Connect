var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.use((req, res, next) => {
//   console.log(req.originalUrl);
//   next();
// });

const logger = (req,res,next) => {
  console.log(req.originalUrl);
  next();
}

// router.get("/",logger,(req,res)=> {
  
//   res.render('index', {text123:"World"});
// });

router.get("/",logger,(req,res)=> {
  
  res.json([
    {id:1, username: "somebody"},
    {id:2, username:"hhey"}
  ]);
});









module.exports = router;
