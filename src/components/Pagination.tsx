import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  nextPage: string | null;
  prevPage: string | null;
  onNavigate: (url: string) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, nextPage, prevPage, onNavigate }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  let prevSearch = '';
  let prevPageNumber = '';
  let nextSearch = '';
  let nextPageNumber = '';

  const navigate = useNavigate()

  if (prevPage) {
    const prevPageUrl = new URL(prevPage ? prevPage : '');
    const prevSearchParams = new URLSearchParams(prevPageUrl.search);
    prevSearch = prevSearchParams.get('name') || '';
    prevPageNumber = prevSearchParams.get('page') || '1';
  }

  if (nextPage) {
    const nextPageUrl = new URL(nextPage ? nextPage : '');
    const nextSearchParams = new URLSearchParams(nextPageUrl.search);
    nextSearch = nextSearchParams.get('name') || '';
    nextPageNumber = nextSearchParams.get('page') || '1';
  }

  return (
    <nav className='flex flex-col gap-4 items-center'>
      <ul className="flex flex-wrap justify-center space-x-2 items-center">
        <li className='hidden md:block'>
          <button
            onClick={() => {
              prevPage && onNavigate(prevPage)
              navigate(`/?page=${prevPageNumber}&name=${prevSearch}`, { replace: true })
            }}
            disabled={!prevPage}
            className="px-4 py-2 border rounded hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50"
          >
            Prev
          </button>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className="list-none">
            <button
              onClick={() => {
                onNavigate(`https://rickandmortyapi.com/api/character/?page=${number}&name=${prevSearch || nextSearch}`)
                navigate(`/?page=${number}&name=${prevSearch || nextSearch}`, { replace: true })
              }}
              className="px-4 py-2 border rounded hover:bg-gray-200 transition-colors duration-200"
            >
              {number}
            </button>
          </li>
        ))}
        <li className='hidden md:block'>
          <button
            onClick={() => {
              nextPage && onNavigate(nextPage)
              navigate(`/?page=${nextPageNumber}&name=${nextSearch}`, { replace: true })
            }}
            disabled={!nextPage}
            className="px-4 py-2 border rounded hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50"
          >
            Next
          </button>
        </li>
      </ul>

      <div className='md:hidden flex gap-4'>
        <button
          onClick={() => {
            prevPage && onNavigate(prevPage)
            navigate(`/?page=${prevPageNumber}&name=${prevSearch}`, { replace: true })
          }}
          disabled={!prevPage}
          className="px-4 py-2 border rounded hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50"
        >
          Prev
        </button>
        <button
          onClick={() => {
            nextPage && onNavigate(nextPage)
            navigate(`/?page=${nextPageNumber}&name=${nextSearch}`, { replace: true })
          }}
          disabled={!nextPage}
          className="px-4 py-2 border rounded hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </nav>

  );
};





// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// interface PaginationProps {
//   nextPage: string | null;
//   prevPage: string | null;
//   onNavigate: (url: string) => void;
// }

// export const Pagination: React.FC<PaginationProps> = ({ nextPage, prevPage, onNavigate }) => {
//   let prevSearch = '';
//   let prevPageNumber = '';
//   let nextSearch = '';
//   let nextPageNumber = '';

//   const navigate = useNavigate()

//   if (prevPage) {
//     const prevPageUrl = new URL(prevPage ? prevPage : '');
//     const prevSearchParams = new URLSearchParams(prevPageUrl.search);
//     prevSearch = prevSearchParams.get('name') || '';
//     prevPageNumber = prevSearchParams.get('page') || '1';
//   }

//   if (nextPage) {
//     const nextPageUrl = new URL(nextPage ? nextPage : '');
//     const nextSearchParams = new URLSearchParams(nextPageUrl.search);
//     nextSearch = nextSearchParams.get('name') || '';
//     nextPageNumber = nextSearchParams.get('page') || '1';
//   }

//   return (
//     <nav className='flex gap-4 justify-center items-center'>
//       <button
//         onClick={() => {
//           prevPage && onNavigate(prevPage)
//           navigate(`/?page=${prevPageNumber}&name=${prevSearch}`, { replace: true })
//         }}
//         disabled={!prevPage}
//         className="px-4 py-2 border rounded hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50"
//       >
//         Prev
//       </button>
//       <button
//         onClick={() => {
//           nextPage && onNavigate(nextPage)
//           navigate(`/?page=${nextPageNumber}&name=${nextSearch}`, { replace: true })
//         }}
//         disabled={!nextPage}
//         className="px-4 py-2 border rounded hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50"
//       >
//         Next
//       </button>
//     </nav>
//   );
// };