import React, { useEffect, useState } from 'react';

const RickAndMorthy = () => {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const characterIds = [1, 2, 3, 4, 5, 6]; // IDs de Rick, Morty y Summer

        fetch(`https://rickandmortyapi.com/api/character/${characterIds.join(',')}`)
            .then(response => response.json())
            .then(data => setCharacters(Array.isArray(data) ? data : [data])) // Asegura que sea un array
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
            <h1 className="text-3xl font-bold my-4">Aynose</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {characters.map((character) => (
                    <div key={character.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                        <img src={character.image} alt={character.name} className="rounded-lg w-full" />
                        <h2 className="text-xl font-semibold mt-2">{character.name}</h2>
                        <p>id: {character.id}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RickAndMorthy;

