// Variáveis que armazenam os elementos do HTML
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

// Variável que armazena o número do Pokémon que será exibido
let searchPokemon = 1;

// Função que faz a requisição para a API da PokéAPI e retorna em formato json
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

// Função que renderiza o Pokémon na tela
const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    // console.log(data)
    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        let pokemonGif = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        if (pokemonGif === null) {
            pokemonImage.src = './src/images/interrogacao.gif';
        } else {
            pokemonImage.src = pokemonGif;
        }
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'block';
        pokemonImage.src = './src/images/interrogacao.gif';
        pokemonName.innerHTML = 'Not found :☹️';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);