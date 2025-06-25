import React from 'react';
import {useState, useEffect} from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import PokemonCard from './components/PokemonCard';

function App () {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemon, setPokemon] = useState(null); //null because initially no pokemon is selected
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


/* CLASS REVIEW

import { useEffect, useState } from 'react';
import './App.css';

function App () {
  const [namePokemon, setNamePokemon] = useState('')
  const [resultPokemon, setResultPokemon] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getPokemon = async (pokemon) => {
  
    try {
      setIsLoading(true)
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      if(!res.ok) {
        throw new Error(`Pokemon no encontrado ${res.status}`)
      }
      const data = await res.json()
      setResultPokemon(data)
    } catch (err){
      setError(err.message)
      console.error(err)

    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)
    
    const trimName = namePokemon.trim()
    if(!trimName) {
      setResultPokemon(null)
      setError(null)
      return
    }

    const delay = setTimeout(() => {
      getPokemon(namePokemon)
    }, 500)

    return () => clearTimeout(delay)

  }, [namePokemon])

  return (
    <>
    <input 
      type='text'
      placeholder='nopmbre pokemon'
      value={namePokemon}
      onChange={e => setNamePokemon(e.target.value)}
    />
    {isLoading && <div className="spinner"></div> }
    {error && <p>{error}</p>}

    <div className='container'>
      <div className='content'>
        <div className='namePokemon'>
          <div className="evolution">Básico</div>
          <div>
            <h2>Charmander</h2>
          </div>
        </div>
        <div className='pokemon'>
        
        </div>
        <div className='description'>

        </div>
      </div>
    </div> //later on edit it in App.css
    
    {resultPokemon && (
      <>
        <h2>{resultPokemon.name}</h2>
        <img src={resultPokemon.sprites?.front_default} alt={resultPokemon.name} />
      </>
    )}
    
    </>
  )
};

export default App;

*/