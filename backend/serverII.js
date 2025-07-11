const express = require("express");
const cors = require("cors");
const featured = require("./featured");
const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

//READ
app.get("/featured", (req, res) => {
    res.send(featured);
});

//Listening to the defined Port
app.listen(port, ()=>{
    console.log('listening to port' + port);
})