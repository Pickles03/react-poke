import React from 'react';
import {useState, useEffect} from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import PokemonCard from './components/PokemonCard';

function App () {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    if (searchTerm === '') {
      setPokemon(null);
      setError('');
      return;
    }

    const getPokemon = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
        if (!response.ok) {
          throw new Error('Pokemon not found');
        }
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setPokemon(null);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(getPokemon, 500);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  return (
    <div className='App'>
      <h1>Pokemon Search</h1>
      <SearchBar searchTerm={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      {loading && <p>Loading...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      {pokemon && <PokemonCard pokemon={pokemon} />}
    </div>
  );
};

export default App;
