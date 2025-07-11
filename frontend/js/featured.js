const featuredCardClass = 'bg-cover bg-center bg-no-repea w-full h-70 text-center p-6 flex flex-col justify-end';
const featuredNameClass = 'text-2xl bg-[rgba(0,0,0,.5)] text-white font-semibold';

const homeFeaturedContainer = document.getElementById('homeFeatured');

function renderHomeFeature (image, name){
    const featuredCard = document.createElement('div');
    featuredCard.setAttribute('class', `bg-[url(${image})] ${featuredCardClass}`);

    const featuredName = document.createElement('h2');
    featuredName.setAttribute('class', featuredNameClass);
    featuredName.innerText = name;
    featuredCard.appendChild(featuredName);

    homeFeaturedContainer.appendChild(featuredCard);
}

axios
  .get("http://localhost:3002/featured")
  .then((response) => {
    console.log(response)
    response.data.forEach((elem)=>{
        renderHomeFeature(elem.image, elem.name)
    })
  })