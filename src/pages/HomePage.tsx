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

  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(`https://rickandmortyapi.com/api/character/?name=${searchQuery}&page=${currentPage}`);
      setCharacters(response.data.results);
      setTotalRecords(response.data.info.count);
      setTotalPages(response.data.info.pages);
    };

    if (searchQuery.length >= 2) {
      fetchData();
    } else {
      setCharacters([]);
    }
  }, [searchQuery, currentPage]);

useEffect(() => {
  const searchParams = new URLSearchParams(location.search);
  const pageFromURL = searchParams.get("page") ?? '';
  const searchTermFromURL = searchParams.get("search");
  
  setSearchQuery(searchTermFromURL || '');
  const page = parseInt(pageFromURL, 10);
  setCurrentPage(!isNaN(page) ? page : 1);
}, [location.search]);

  useEffect(() => {
  if (!searchQuery) return;
  const fetchData = async () => {
    const result = await axios(`https://rickandmortyapi.com/api/character/?name=${searchQuery}&page=${currentPage}`);
    if (result.data.results) {
      setCharacters(result.data.results);
    } else {
      setCharacters([]);
    }
  };

  if (searchQuery.length >= 2 || currentPage) {
    fetchData();
  } else {
    setCharacters([]);
  }
}, [searchQuery, currentPage]);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = characters.slice(firstItemIndex, lastItemIndex);


  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const currentSearchParams = new URLSearchParams(location.search);
    if (searchQuery) {
      currentSearchParams.set("search", searchQuery);
    }
    currentSearchParams.set("page", pageNumber.toString());
    navigate(`/?${currentSearchParams.toString()}`, { replace: true });
  };

  const resetSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4">
      <SearchInput onSearch={setSearchQuery} resetSearch={resetSearch} />
      {
        characters.length !== 0 &&
        <CharactersTable characters={currentItems} />
      }
      {
        characters.length !== 0 &&
        <Pagination totalPages={totalPages} paginate={paginate} currentPage={currentPage} />
      }
    </div>
  );
}
