import React from "react";
import { useState, useRef } from "react";
import Axios from "axios";
import Draggable from "react-draggable";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import pokeNames from "./assets/PokeJSON/pokeNames.json";
import PopUp from "./PopUp";
import "./PokemonRender.css";

export default function PokemonRender() {
  const [pokemon, setPokemon] = useState("");
  const [pokemon1, setPokemon1] = useState({});
  const [pokemon2, setPokemon2] = useState({});
  const [pokemon3, setPokemon3] = useState({});
  const [ability, setAbility] = useState(false);
  const [abilityTwo, setAbilityTwo] = useState(false);
  const [abilityThree, setAbilityThree] = useState(false);
  const [limitReached, setLimitReached] = useState(true);

  function getPokemon() {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then(
      (response) => { Object.keys(pokemon1).length === 0 ?
        setPokemon1(
          {
            name: pokemon,
            species: response.data.species.name,
            img: response.data.sprites.front_default,
            hp: response.data.stats[0].base_stat,
            key: pokemon,
            ability: response.data.abilities[0].ability.name,
          },
        ) : Object.keys(pokemon2).length === 0 ?
        setPokemon2(
          {
            name: pokemon,
            species: response.data.species.name,
            img: response.data.sprites.front_default,
            hp: response.data.stats[0].base_stat,
            key: pokemon,
            ability: response.data.abilities[0].ability.name,
          },
        ) : Object.keys(pokemon3).length === 0 ? 
        setPokemon3(
          {
            name: pokemon,
            species: response.data.species.name,
            img: response.data.sprites.front_default,
            hp: response.data.stats[0].base_stat,
            key: pokemon,
            ability: response.data.abilities[0].ability.name,
          },
        ) : null
        // console.log(response);
        // console.log(pokemonData);
      }
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("STUPID")
    getPokemon();
    setLimitReached(!limitReached)
  };

  const handleKeypress = (e) => {
    // triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleAbility = (e) => {
    e.preventDefault();

    setAbility(!ability)

  };

  const handlePoke = (e) => {
    e.preventDefault();
    setAbility(!ability);
  }

  const handlePoke2 = (e) => {
    e.preventDefault();
    setAbilityTwo(!abilityTwo)
  }

  const handlePoke3 = (e) => {
    e.preventDefault();
    setAbilityThree(!abilityThree)
  }

  const nodeRef = useRef(1); // do get around strictMode
  const nodeRef2 = useRef(2);
  const nodeRef3 = useRef(3);
  return (
    <div className="PokemonRender">
      <h1 className="text-3xl font-bold sm: pb-6">Pokedex</h1>
      <form className="sm: grid-flow-row">
        <input
          className="p-4 text-xs rounded-md w-48 bg-stone-600"
          placeholder="search"
          type="text"
          value={pokemon}
          onKeyDown={handleKeypress}
          onChange={(event) => {
            setPokemon(event.target.value.toLocaleLowerCase());
            {
              // console.log(pokemon);
            }
          }}
        />
        <button
          className="m-8 bg-orange-300 p-4 rounded-md text-xs"
          type="submit"
          onClick={handleSubmit}
        >
          Add Pokemon!
        </button>
        {limitReached && Object.keys(pokemon3).length !== 0 ? setTimeout(() => setLimitReached(!limitReached), 3000) && <div className="animate-bounce pt-2 text-sm">Pokemon Limit Reached!</div> : null}
        <div className="dropDown">
          {pokeNames
            .filter((item) => {
              const searchTerm = pokemon.toLocaleLowerCase();
              const fullName = item.toLocaleLowerCase();
              return (
                searchTerm &&
                fullName.startsWith(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div
                onClick={() => setPokemon(item.toLocaleLowerCase())}
                key={item}
                className="cursor-pointer pb-6"
              >
                {item}
              </div>
            ))}
        </div>
      </form>

      <div className="flex justify-center">
        {
          <Draggable key={pokemon1} nodeRef={nodeRef}>
            <span ref={nodeRef} key={pokemon1.key} className="cursor-pointer" onClick={handlePoke}>
              <TransformComponent>
                <img src={pokemon1.img} className="w-40 m-0 pb-6 "/>
                {ability ? (
                  <div className="flex">
                    <div className="bg-stone-700 rounded-xl cursor-pointer p-4 text-xs">
                      Ability: {pokemon1.ability}
                    </div>
                  </div>
                ) : null}
              </TransformComponent>
            </span>
          </Draggable>     
        }

      </div>
      <div className="flex justify-center">
      {
          <Draggable key={pokemon2} nodeRef={nodeRef2}>
            <span ref={nodeRef2} key={pokemon2.key} className="cursor-pointer" onClick={handlePoke2}>
              <TransformComponent>
                <img src={pokemon2.img} className="w-40 m-0 pb-6 "/>
                {abilityTwo === true ? (
                  <div className="flex">
                    <div className="bg-stone-700 rounded-xl cursor-pointer p-4 text-xs">
                      Ability: {pokemon2.ability}
                    </div>
                  </div>
                ) : null}
              </TransformComponent>
            </span>
          </Draggable>     
        }
        </div>
        <div className="flex justify-center">
      {
          <Draggable key={pokemon3} nodeRef={nodeRef3}>
            <span ref={nodeRef3} key={pokemon3.key} className="cursor-pointer" onClick={handlePoke3}>
              <TransformComponent>
                <img src={pokemon3.img} className="w-40 m-0 pb-6 "/>
                {abilityThree ? (
                  <div className="flex">
                    <div className="bg-stone-700 rounded-xl cursor-pointer p-4 text-xs">
                      Ability: {pokemon3.ability}
                    </div>
                  </div>
                ) : null}
              </TransformComponent>
            </span>
          </Draggable>     
        }
        </div>
    </div>
  );
}
