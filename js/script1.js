const getPokemonUrl = (id) => `http://pokeapi.co/api/v2/pokemon/${id}`;  // atribuindo uma função para o id da url 

const generatePokemonPromises = () =>
  Array(151)  // reserva de arrays de quantidade de pokemons na geração
    .fill()
    .map((_, index) =>
      fetch(getPokemonUrl(index + 1))  // estah dizendo para começar apartir do numero 1 da dex
      .then((response) => response.json()) //
    );

const generateHTML = (pokemons) =>
  pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map((typeinfo) => typeinfo.type.name);

    const index = id < 10 ? "00" : "";  // está atribuindo 2 numeros 0 na frente do numero da dex de cada pokemon até o pokemon numeros menores 9

    const indexTwo = id > 9 && id < 100 ? "0" : ""; // está atribuindo 1 numero 0 na frente do numero da dex de cada pokemon até o pokemon entre os numeros 10 e 99


    //adidcionando os cards de cada pokemon
    accumulator += `
      <li class="card ${elementTypes[0]}">  
        <img class="card-image " alt="${name}" src="https://cdn.traction.one/pokedex/pokemon/${id}.png"/>
        <h2 class="card-title">${index}${indexTwo}${id}. ${name.toUpperCase()}</h2>
        <p class="card-subtitle">${elementTypes.join(" | ").toUpperCase()}</p> 
      </li>`;
    return accumulator;
  }, "");

const insertPokemonsIntoPages = (pokemons) => {
  const ul = document.querySelector('[data-js="pokedex"]');
  ul.innerHTML = pokemons;
};

const pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises).then(generateHTML).then(insertPokemonsIntoPages);
