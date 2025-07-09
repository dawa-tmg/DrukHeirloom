const express = require("express");
const cors = require('cors');
const quizz = require("./quiz");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());


//READ
app.get("/quiz", (req, res) => {
    res.send(quizz);
});


//Listening to the defined Port
app.listen(port, ()=>{
    console.log('listening to port' + port);
})