const express = require("express");
const users = require("./users");
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

let quizzes = [
    {
        id: 1,
        question: ,
        options:,
        answer: ,
    },
    {
        id: 1,
        question: ,
        options:,
        answer: ,
    },
    {
        id: 1,
        question: ,
        options:,
        answer: ,
    }
]
