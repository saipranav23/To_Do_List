var express = require("express");
var mongoose= require("mongoose");
var bodyParser = require("body-parser");
var urlencoded = require("body-parser/lib/types/urlencoded");
const req = require("express/lib/request");
const res = require("express/lib/response");
var app = express();


app.set('view engine', 'ejs'); //To use the ejs files
app.use(express.static('public')); //To use the HTML CSS files in public folder
app.use(bodyParser.urlencoded({extended:true}));


mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true,useUnifiedTopology:true}); // connecting to mongodb

const itemSchema ={  //constructing a schema for items
    name:String
}

const Item=mongoose.model("Item",itemSchema);


const item1=new Item({
    name:"ADD TASKS",
})


//const d=[item1,item2,item3];
const d=[];

app.get("/",function(req,res){
    //res.send("Hello");
    Item.find({},function(err,a){
        /*if no items in db insert items

        if(f.length===0){
            Item.insertMany(d,function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Successfully saved items to DB");
                }
            });
            res.redirect("/");
        }
        
        else{
            res.render("list",{newListItems:f});
        }
        */
       res.render("list",{newListItems:a});
    })
})

app.post("/",function(req,res){
    const itemName=req.body.n;
    const item=new Item({
        name:itemName
    });
    item.save();
    res.redirect("/");
});

app.post("/delete",function(req,res){
    //console.log(req.body.checkbox);
    const check=req.body.checkbox;
    Item.findByIdAndRemove(check,function(err){
        if(!err){
            console.log("Successfully deleted");
        }
    });
    res.redirect("/");
})

app.listen(3000,function(){
    console.log("Listening to port 3000");
})


