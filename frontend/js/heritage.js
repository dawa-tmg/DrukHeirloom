const featureCardContainerClass = 'h-fit w-fit border border-2 border-[#4D99AA] rounded-lg'
const featureImageClass = 'bg-[#4D99AA] h-60'
const featureCardClass = 'h-fit p-3'
const featureTitleClass = 'text-xl text-[#032A33] font-semibold'
const featureTextClass = 'text-lg text-[#032A33]'
const btnclass = 'border border-1 rounded px-3 mt-3 text-lg text-[#032A33]'

const featured = document.getElementById('featured')

function renderImage(title, text){
  const featureCardContainer = document.createElement('div')
  featureCardContainer.setAttribute('class', featureCardContainerClass)

  const featureImage = document.createElement('div')
  featureImage.setAttribute('class', featureImageClass)
  featureCardContainer.appendChild(featureImage)

  const featureCard = document.createElement('div')
  featureCard.setAttribute('class', featureCardClass)

  const featureTitle = document.createElement('h2')
  featureTitle.setAttribute('class', featureTitleClass)
  featureTitle.innerText = title
  featureCard.appendChild(featureTitle)

  const featureText = document.createElement('p')
  featureText.setAttribute('class', featureTextClass)
  featureText.innerText = text
  featureCard.appendChild(featureText)

  const btn = document.createElement('button')
  btn.setAttribute('class', btnclass)
  btn.innerText = 'See More >>>'
  featureCard.appendChild(btn)

  featureCardContainer.appendChild(featureCard)
  featured.appendChild(featureCardContainer)

}



axios
  .get("http://localhost:3001/heritage")
  .then((response) => {
    console.log(response)
    response.data.forEach((elem)=>{
      renderImage(elem.name, elem.description)
    })
  })