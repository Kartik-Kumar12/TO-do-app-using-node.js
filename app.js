const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const data = require(__dirname +'/data.js');


let items=["Have coffee","Code","Cricket","Sleep","Repeat"];
let workList =[];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.listen(3000, function() {
  console.log("server has started at port number 3000");
});
app.post('/',function(req,res){

   let item = req.body.newItem;

   if(req.body.list === 'Work')
      {
        workList.push(item);
        res.redirect('/work');
      }
   else
      {
        items.push(item);
        res.redirect('/');
      }

});
app.get('/', function(req, res) {

  var day=data.getDate();
  res.render('base', { listTitle: day , items : items });

});
app.get("/work",function(req,res){
  res.render('base',{ listTitle : "Work List", items: workList});
});
app.get('/about',function(req,res){
  res.render('about');
})
