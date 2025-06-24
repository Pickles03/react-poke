import React from 'react';

function PokemonCard({pokemon}) {
    return (
        <div>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
    );
};

export default PokemonCard;