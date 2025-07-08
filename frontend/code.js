axios
.get("http://localhost:3001/quiz").then((response) => {
    console.log(response.data[0].japan.quiz[0]);
})