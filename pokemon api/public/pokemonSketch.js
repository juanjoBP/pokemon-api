const pokeImage = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokemonByTypes = document.querySelector('[data-poke-types]');
const statsPoke = document.querySelector('[data-poke-stats]');
const pokeCard = document.querySelector('[data-poke-card]');
const nameP = document.querySelector('[data-poke-name]');
const imgP = document.querySelector('[data-poke-img]');
const none = document.getElementById('none');

const typeByColors = {
  psychic: '#FFC6D9',
  ghost: '#561D25',
  bug: '#A2FAA3',
  poison: '#795663',
  ground: '#D2B074',
  dragon: '#DA627D',
  steel: '#1D8A99',
  fighting: '#2F2F2F',
  electric: '#FFEA70',
  normal: '#B09398',
  fire: '#FF675C',
  water: '#0596C7',
  ice: '#AFEAFD',
  rock: '#999799',
  flying: '#7AE7C7',
  grass: '#4A9681',
  
};

const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const expand = () => {
  searchBtn.classList.toggle("close");
  input.classList.toggle("square");
};

searchBtn.addEventListener("click", expand);


const searchPokemon = event => {
  event.preventDefault();
  pokeImage.className = 'img-container'
  imgP.className = 'poke-img'
  pokeId.className = 'poke-id'
  pokemonByTypes.className = 'poke-types'
  statsPoke.className='poke-stats'

  const { value } = event.target.pokemon;
  if (value === ''){
    window.location.reload(true);
  }
  fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then(data => data.json())
    .then(response => renderPokemonData(response))
    
}

const renderPokemonData = data => {
  const sprite = data.sprites.front_default;
  const { stats, types } = data;
  console.log(data)

  nameP.textContent = data.name;
  imgP.setAttribute('src', sprite);
  pokeId.textContent = `Nº ${data.id}`;
  setCardColor(types);
  renderpokemonByTypes(types);
  renderstatsPoke(stats)

}


const setCardColor = types => {
  const firstColor = typeByColors[types[0].type.name];
  const secondColor = types[1] ? typeByColors[types[1].type.name] : typeByColors.default;
  imgP.style.background =  `radial-gradient(${secondColor} 33%, ${firstColor} 33%)`;
  imgP.style.backgroundSize = ' 5px 5px';
}
const renderpokemonByTypes = types => {
  pokemonByTypes.innerHTML= '';
  types.forEach(type => {
    const typeHtml = document.createElement("div");
    typeHtml.style.color = typeByColors[type.type.name];
    typeHtml.textContent=type.type.name
    pokemonByTypes.appendChild(typeHtml)
  });
}

const renderstatsPoke = stats => {
  statsPoke.innerHTML= '';
  stats.forEach(stat => {
    const statHtml = document.createElement('div');
    const statHtmlName = document.createElement('div')
    const statHtmlAmount = document.createElement('div')
    statHtmlName.textContent = stat.stat.name
    statHtmlAmount.textContent= stat.base_stat
    statHtml.appendChild(statHtmlName);
    statHtml.appendChild(statHtmlAmount);
    statsPoke.appendChild(statHtml)
  });
}



