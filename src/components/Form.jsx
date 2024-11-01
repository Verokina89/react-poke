//manejo de toda la logica dentro del fomulario de busqueda
import { useState, useEffect } from 'react';
import ErrorMessage from './ErrorMessage'

function Form() {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonName, setPokemonName] = useState('');
  const [error, setError] = useState(null);

  // Funtion para las busqueda
  const fetchPokemon = async (name) => {
    try {
      setError(null);                  // antes de la busqueda reinicia messag err
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokemon no encontrado');   // si no encuentr da error
      }
      const data = await response.json(); 
      setPokemon(data);                           // guarda el pokmn
    } catch (err) {
      setError(err.message); 
      setPokemon(null);              // Borra datos anteriores
    }
  };

  //cuando `pokemonName`cambia hace la busqueda auntomatic
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
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pokemonName">Buscar Pokemon:</label>
        <input
          type="text"
          id="pokemonName"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          placeholder="Escribe el Pokemon aqui"
        />
        <button type="submit">Buscar</button>
      </form>
      {error && <ErrorMessage message={error} />}
      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} className='pokemonCard' alt={pokemon.name} />
          <p>Altura: {pokemon.height}</p>
          <p>Peso: {pokemon.weight}</p>
        </div>
      )}
    </div>
  );
}

export default Form;
