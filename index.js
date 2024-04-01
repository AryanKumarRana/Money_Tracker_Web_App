
var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
require("dotenv").config();     

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect("mongodb+srv://aryanrana150303:"+
process.env.MONGO_PASSWORD +
"@cluster0.6bozywn.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;

db.on('error',()=> console.log("Error in Connecting to Database"));
db.on('open',()=> console.log("Connected to Database"));
app.get('/sign_up',(req,res)=>{
    var category_select = req.query.category_select;
    var amount_input = req.query.amount_input;
    var date_input = req.query.date_input;

    var data = {
        "category_select": category_select,
        "amount_input": amount_input,
        "date_input": date_input,
    }
    db.collection('money_tracker').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });
    return res.redirect('index.html')
})

app.get("/",(req,res)=>{
    // res.send("Hello From Server")
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);

console.log("Listening on PORT 3000");
