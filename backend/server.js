const express = require("express");
const cors = require('cors');
const quiz = require("./quiz");
const heritage = require("./heritage");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());


//READ
app.get("/quiz", (req, res) => {
    res.send(quiz);
});

app.get("/heritage", (req, res) => {
    res.send(heritage);
});


//Listening to the defined Port
app.listen(port, ()=>{
    console.log('listening to port' + port);
})