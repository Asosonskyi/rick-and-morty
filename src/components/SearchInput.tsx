import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchInputProps {
  initialSearchTerm?: string;
  onSearch: (searchTerm: string) => void;
  resetSearch: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ initialSearchTerm = '', onSearch, resetSearch }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    onSearch(searchTerm);
  };

  useEffect(() => {
    if (searchTerm) {
      navigate(`/?search=${encodeURIComponent(searchTerm)}`, { replace: true });
    }
  }, [searchTerm, navigate]);

  return (
    <div className='flex gap-4 md:gap-10'>
      <div className='w-3/5 md:w-5/6'>
        <label htmlFor="character" className="block text-sm font-medium leading-6 text-gray-900">
          Character name
        </label>
        <div className="mt-2">
          <input
            type="character"
            name="character"
            id="character"
            className="block w-full rounded-md border-0 py-1.5 px-2 h-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Search for characters..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <button
        onClick={() => {
          setSearchTerm('')
          resetSearch()
        }}
        className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700 w-2/5 md:w-1/6 h-12 mt-auto"
      >
        Reset search
      </button>
    </div>
  );
};