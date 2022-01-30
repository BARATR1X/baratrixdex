const getPokemonUrl = (id) => `http://pokeapi.co/api/v2/pokemon/${id}`;

const generatePokemonPromises = () =>
  Array(89)
    .fill()
    .map((_, index) =>
      fetch(getPokemonUrl(index + 810)).then((response) => response.json())
    );

const generateHTML = (pokemons) =>
  pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map((typeinfo) => typeinfo.type.name);
 
    accumulator += `
      <li class="card ${elementTypes[0]}">
        <img class="card-image " alt="${name}" src="http://cdn.traction.one/pokedex/pokemon/${id}.png"/>
        <h2 class="card-title">${id}. ${name.toUpperCase()}</h2>
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
