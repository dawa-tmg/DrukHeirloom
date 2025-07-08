const express = require("express");
const quizz = require("./quiz");
const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get("/quiz", (req, res) => {
    res.send(quizz);
});

app.listen(port, ()=>{
    console.log('listening to port' + port);
})