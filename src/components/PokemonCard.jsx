import React from 'react';

function PokemonCard({pokemon}) {
    return (
        <div className='container'>
            <div className='content'>
                <h2>{pokemon.name}</h2>
                <div className='pokemon'>
                    <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
                </div>
            </div>
        </div>
    );
};

export default PokemonCard;