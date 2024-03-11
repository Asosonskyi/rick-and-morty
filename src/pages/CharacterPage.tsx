import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
}

const CharacterPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { search} = location.state || {};

  useEffect(() => {
    const fetchCharacter = async () => {
      const res = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
      setCharacter(res.data);
    };

    fetchCharacter();
  }, [id]);

  if (!character) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 flex flex-col gap-8 items-center">
      <button
        onClick={() => navigate(`/${search}`)}
        className="mb-4 px-4 py-2 w-24 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300"
      >
        Go Back
      </button>
      <div className="max-w-xl mx-auto shadow-lg rounded-lg overflow-hidden">
        <div className="h-56 p-4 w-full flex justify-center items-center overflow-hidden">
          <img src={character.image} alt={character.name} className="max-w-full max-h-full object-contain" />
        </div>
        <div className="p-4">
          <h3 className="text-3xl text-center font-bold mb-2">{character.name}</h3>
          <p className="text-center"><strong>Status:</strong> {character.status}</p>
          <p className="text-center"><strong>Species:</strong> {character.species}</p>
          <p className="text-center"><strong>Gender:</strong> {character.gender}</p>
          <p className="text-center"><strong>Origin:</strong> {character.origin.name}</p>
          <p className="text-center"><strong>Last Known Location:</strong> {character.location.name}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;