const image = document.getElementById("pic");
const ans = document.getElementById("answer");
const ansButton = document.getElementById("answerButton");

axios
  .get("https://api.nasa.gov/planetary/apod?api_key=t3qVdEgFaDgpPYvp7MQ57UHrnTrujf62DQBRLvp7")
  .then((response) => {
    console.log(response.data.url);
    const img = document.createElement('img')
    img.classList = 'w-70 h-70'
    img.src = response.data.url
    image.appendChild(img)

  })

ansButton.addEventListener("click", ()=>{
    ans.classList.toggle("hidden")
})
