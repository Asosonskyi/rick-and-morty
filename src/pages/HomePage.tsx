import { useEffect, useState } from 'react'
import axios from 'axios';
import { SearchInput } from '../components/SearchInput';
import { CharactersTable } from '../components/CharactersTable';
import { Pagination } from '../components/Pagination';
import { useLocation, useNavigate } from 'react-router-dom';

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

export default function HomePage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);
  const [error, setError] = useState('');

  const location = useLocation();
  const navigate = useNavigate()

  const fetchData = async (url: string) => {
    try {
      const response = await axios.get(url);
      setError('')
      setCharacters(response.data.results);
      setTotalRecords(response.data.info.count);
      setTotalPages(response.data.info.pages);
      setNextPageUrl(response.data.info.next || null);
      setPrevPageUrl(response.data.info.prev || null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError('An error occurred while fetching data.');
    }
  };

  useEffect(() => {
    if(!searchQuery)return
    const initialUrl = `https://rickandmortyapi.com/api/character/?page=${currentPage}&name=${searchQuery}`;
    fetchData(initialUrl);
  }, [searchQuery, currentPage]);


useEffect(() => {
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('name') || '';
  const page = searchParams.get('page') || '1';

  setSearchQuery(search);
  setCurrentPage(parseInt(page, 10));
}, [location.search]);

  const resetSearch = () => {
    setCharacters([])
    setSearchQuery('');
    setCurrentPage(1);
    navigate('/');
  };

  if (error) {
    return (
      <div className="container mx-auto p-4">
      <SearchInput onSearch={setSearchQuery} resetSearch={resetSearch} />
      {error}
    </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <SearchInput onSearch={setSearchQuery} resetSearch={resetSearch} />
      {
        characters.length !== 0 &&
        <CharactersTable characters={characters} />
      }
      {
        characters.length !== 0 &&
        <Pagination 
          totalPages={totalPages}
          currentPage={currentPage}
          nextPage={nextPageUrl} 
          prevPage={prevPageUrl} 
          onNavigate={fetchData} 
        />
      }
    </div>
  );
}
