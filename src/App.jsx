import { useState } from "react";
import "./App.css";
import Axios from "axios";
import PokeCard from "./PokeCard";

function App() {
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState([]);

  function getPokemon() {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then(
      (response) => {
        setPokemonData([...pokemonData, {
          hp: response.data.stats[0].base_stat,
          img: response.data.sprites.front_default,
        }])
        console.log(pokemonData)
      }
    );
  }
  return (
    <div className="App">
      <h1 className="text-3xl font-bold">Pokedex!</h1>
      <input
        className="p-2 rounded-md w-48"
        placeholder="search pokemon"
        type="text"
        onChange={(event) => {
          setPokemon(event.target.value);
        }}
      />
      <button className="m-8 bg-orange-300 p-2 rounded-md" onClick={getPokemon}>
        search
      </button>
      <div className="flex justify-center">
        {pokemonData.map((guy) => {(
          <PokeCard img={guy.img} hp={guy.hp} />
        )})}
      </div>
    </div>
  );
}

export default App;
