//manejo de toda la logica dentro del fomulario de busqueda
import { useState, useEffect } from 'react';
import ErrorMessage from './ErrorMessage'

function Form() {
  const [pokemonName, setPokemonName] = useState('');    //estado para manejar nombre;lo iniciamos vacio pq es tipo texto y hay que darle el string vacio.
  const [pokemon, setPokemon] = useState(null);      // tiene que ser un false de inicio para que pueda indicar que no existe hasta encuentra la data
  const [error, setError] = useState(null);      //estado para manjar errores; tiene que ser null que no haya nada para al darse el error lo indique.
  const [loading, setLoading] = useState(false);  // tiene que comenzar con false para que dependiendo del cambio del estado indique cuando sea true realmente para indicar el loading. 

  

  const [abilities, setAbilities] = useState([]);     //estado para traducir habilidades


  //function obtener habilidades traducidas
  const fetchAbilitiesInSpanish = async (url) => {
    try{
      const response = await fetch(url);
      if(!response.ok) throw new Error('Error al obtener habilidades');
      const data = await response.json();

      //buscar el nombre en español dentro de anmes
      const spanishName = data.names.find((name) => name.language.name === "es");
      return spanishName ? spanishName.name : "Desconocido";
    }catch (err) {
      return "Desconocido";   //devuelve un texto generico en caso de error
    }
  };

  // Funtion para las busqueda
  const fetchPokemon = async (name) => {
    try {
      setError(null);               //reinicia el message de err antes de la busqueda
      setAbilities([]);        //reinicia las habilidades

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokemon no encontrado');    // si no encuentr da error
      }
      const data = await response.json(); 
      setPokemon(data);                            // guarda el pokemon

      //obtener las habilidades ES
      const abilitiesInSpanish = await Promise.all(
        data.abilities.map(async (ability) => {
          return await fetchAbilitiesInSpanish(ability.ability.url);
        })
      );
      setAbilities(abilitiesInSpanish);      //guarda la traduccion de habilidades
    } catch (err) {
      setError(err.message);
      setPokemon(null);
      setAbilities([]);                              // Borra datos anteriores
    }
  };

  //cuando `pokemonName`cambia hace la busqueda auntomatica
  useEffect(() => {
    if (pokemonName) {
      fetchPokemon(pokemonName);
    }
  }, [pokemonName]);

  //maneja el envio del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPokemon(pokemonName);
  };

  return (
    <div className='pokemonContainer'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pokemonName">Buscar Pokemon:</label>
        <input
          type="text"
          id="pokemonName"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          placeholder="Nombre del Pokemón"
        />
        <button type="submit">Buscar</button>
      </form>
      {error && <ErrorMessage message={error} />}
      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.other.dream_world.front_default} className='pokemonCard' alt={pokemon.name} />
          <p>Altura: {pokemon.height} m</p>
          <p>Peso: {pokemon.weight} kg</p>

          <p>Habilidades: {abilities.length > 0 ? abilities.join(','): "Cargando habilidades..."}</p>
        </div>
      )}
    </div>
  );
}

export default Form;
