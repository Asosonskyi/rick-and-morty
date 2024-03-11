import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

interface CharactersTableProps {
  characters: Character[];
}

export const CharactersTable: React.FC<CharactersTableProps> = ({characters}) => {
  const navigate = useNavigate();
  const location = useLocation();

  
  return (
    <div className="my-4 overflow-x-auto">
      <table className="w-full table-auto">
        <thead className="text-center">
          <tr>
            <th className="px-1 py-1">Name</th>
            <th className="px-1 py-1">Status</th>
            <th className="px-1 py-1">Species</th>
            <th className="px-1 py-1">Image</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {characters.map((character) => (
            <tr key={character.id} onClick={() => navigate(`/character/${character.id}`, { state: { search: location.search } })} className="cursor-pointer">
              <td className="border px-1 py-1">{character.name}</td>
              <td className="border px-1 py-1">{character.status}</td>
              <td className="border px-1 py-1">{character.species}</td>
              <td className="border px-1 py-1">
                <img src={character.image} alt={character.name} className="w-10 h-10 md:w-20 md:h-20 rounded-full mx-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};