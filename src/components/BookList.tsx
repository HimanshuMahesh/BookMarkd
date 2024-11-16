import { ChevronDown, Trash2 } from 'lucide-react';
import type { Book, Shelf } from '../types';

interface BookListProps {
  books?: Book[];
  shelves: Shelf[];
  activeShelf: string;
  onMoveBook: (bookId: string, newShelf: string) => void;
  onEditBook: (book: Book) => void;
  onDeleteBook: (bookId: string) => void;
}

export default function BookList({ 
  books = [], 
  shelves, 
  activeShelf, 
  onMoveBook, 
  onEditBook,
  onDeleteBook 
}: BookListProps) {
  if (!books || books.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
        <p className="text-lg text-white/60">Your books will be added here.</p>
      </div>
    );
  }

  const filteredBooks = books.filter((book) => book.shelf === activeShelf);

  if (filteredBooks.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
        <p className="text-lg text-white/60">No books in this shelf.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {filteredBooks.map((book) => (
        <div
          key={book.id}
          className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col w-full transform hover:scale-105 group"
        >
          <div 
            className="relative pt-[140%] cursor-pointer"
            onClick={() => onEditBook(book)}
          >
            <img
              src={book.cover || '/placeholder.svg'}
              alt={`Cover of ${book.title}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteBook(book.id);
              }}
              className="absolute top-2 right-2 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-500/50"
            >
              <Trash2 className="w-4 h-4 text-white" />
              <span className="sr-only">Delete {book.title}</span>
            </button>
          </div>
          <div 
            className="p-4 flex-grow cursor-pointer"
            onClick={() => onEditBook(book)}
          >
            <h3 className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent mb-1 line-clamp-2">
              {book.title}
            </h3>
            <p className="text-xs text-white/60 line-clamp-1">by {book.author}</p>
          </div>
          <div className="p-2 bg-white/5 relative">
            <select
              className="w-full text-xs bg-white/10 text-white rounded-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 appearance-none px-3 py-2 pr-8"
              value={book.shelf}
              onChange={(e) => {
                e.stopPropagation();
                onMoveBook(book.id, e.target.value);
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {shelves.map((shelf) => (
                <option key={shelf.id} value={shelf.id}>
                  {shelf.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 pointer-events-none" />
          </div>
        </div>
      ))}
    </div>
  );
}