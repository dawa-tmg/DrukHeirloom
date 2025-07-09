const featureCardContainerClass = 'h-fit w-fit border border-2 border-[#4D99AA] rounded-lg'
const featureImageClass = 'bg-[#4D99AA] h-60'
const featureCardClass = 'h-fit p-3 min-h-70'
const featureTitleClass = 'text-xl text-[#032A33] font-semibold'
const featureTextClass = 'text-lg text-[#032A33] truncate-multiline'
const btnclass = 'border border-1 rounded px-3 mt-3 text-lg text-[#032A33] seeMoreBtn'

const featured = document.getElementById('featured')

function renderImage(title, image, text){
  const featureCardContainer = document.createElement('div')
  featureCardContainer.setAttribute('class', featureCardContainerClass)

  const featureImage = document.createElement('div')
  featureImage.setAttribute('class', featureImageClass)
  featureImage.style.backgroundImage = `url('${image}')`
  featureImage.style.backgroundRepeat = 'no-repeat'
  featureImage.style.backgroundSize = 'cover'
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

featured.addEventListener('click', (event) => {
  if (event.target.classList.contains('seeMoreBtn')) {
    const card = event.target.closest('.h-fit.p-3');
    const textElement = card.querySelector('p');

    if (textElement.classList.contains('truncate-multiline')) {
      textElement.classList.remove('truncate-multiline');
      event.target.innerText = 'See Less <<<';
    } else {
      textElement.classList.add('truncate-multiline');
      event.target.innerText = 'See More >>>';
    }
  }
});

axios
  .get("http://localhost:3001/heritage")
  .then((response) => {
    console.log(response)
    response.data.forEach((elem)=>{
      renderImage(elem.name, elem.image, elem.description)
    })
  })

