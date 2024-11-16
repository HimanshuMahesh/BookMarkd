import { useState } from 'react'
import { Library, Search, BookPlus, Menu, X, PlusCircle } from 'lucide-react'
import BookForm from './BookForm'
import BookList from './BookList'
import type { Book, Shelf } from '../types'

const defaultShelves: Shelf[] = [
  { id: 'reading', name: 'Currently Reading' },
  { id: 'to-read', name: 'Want to Read' },
  { id: 'finished', name: 'Finished Reading' }
]

export default function BookShelf() {
  const [books, setBooks] = useState<Book[]>([])
  const [shelves, setShelves] = useState<Shelf[]>(defaultShelves)
  const [activeShelf, setActiveShelf] = useState<string>('reading')
  const [isAddBookOpen, setIsAddBookOpen] = useState(false)
  const [isAddShelfOpen, setIsAddShelfOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [editingShelf, setEditingShelf] = useState<Shelf | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleAddBook = (book: Book) => {
    setBooks([...books, book])
    setIsAddBookOpen(false)
  }

  const handleEditBook = (book: Book) => {
    setBooks(books.map(b => b.id === book.id ? book : b))
    setEditingBook(null)
  }

  const handleMoveBook = (bookId: string, newShelf: string) => {
    setBooks(books.map(book => 
      book.id === bookId ? { ...book, shelf: newShelf } : book
    ))
  }

  const handleAddShelf = (shelfName: string) => {
    const newShelf: Shelf = {
      id: `shelf-${Date.now()}`,
      name: shelfName
    }
    setShelves([...shelves, newShelf])
    setIsAddShelfOpen(false)
  }

  const handleEditShelf = (shelfId: string, newName: string) => {
    setShelves(shelves.map(shelf => 
      shelf.id === shelfId ? { ...shelf, name: newName } : shelf
    ))
    setEditingShelf(null)
  }

  const handleDeleteBook = (bookId: string) => {
    setBooks(books.filter(book => book.id !== bookId))
  }

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#0D0B1E] text-white font-sans relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] rounded-full bg-orange-500/20 blur-[120px]" />

      <div className="flex flex-col h-screen relative z-10">
        {/* Header */}
        <header className="bg-white/5 backdrop-blur-sm border-b border-white/10 p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Library className="h-8 w-8 bg-gradient-to-r from-purple-400 to-orange-400 rounded-lg p-1" />
              <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">BookMarkd.</span>
            </div>
            <button
              className="md:hidden text-white/80 hover:text-white transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block w-64 bg-white/5 backdrop-blur-sm border-r border-white/10 p-6 overflow-y-auto`}>
            <div className="space-y-4">
              <button
                type="button"
                className="w-full flex items-center justify-start px-4 py-3 text-sm font-medium text-white bg-white/5 rounded-md hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                onClick={() => setIsAddBookOpen(true)}
              >
                <BookPlus className="mr-2 h-4 w-4" />
                Add Book
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-start px-4 py-3 text-sm font-medium text-white bg-white/5 rounded-md hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                onClick={() => setIsAddShelfOpen(true)}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Shelf
              </button>
            </div>
            <div className="mt-8">
              <h2 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Shelves</h2>
              <div className="space-y-1">
                {shelves.map((shelf) => (
                  <button
                    key={shelf.id}
                    type="button"
                    className={`w-full text-left px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                      activeShelf === shelf.id
                        ? 'bg-gradient-to-r from-purple-500 to-orange-500 text-white'
                        : 'text-white/80 hover:bg-white/10'
                    }`}
                    onClick={() => setActiveShelf(shelf.id)}
                  >
                    {shelf.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 overflow-auto p-6">
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
                <input
                  className="w-full pl-12 pr-4 py-4 text-base text-white bg-white/5 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-shadow duration-200"
                  placeholder="Search your library..."
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <BookList
              books={filteredBooks}
              shelves={shelves}
              activeShelf={activeShelf}
              onMoveBook={handleMoveBook}
              onEditBook={setEditingBook}
              onDeleteBook={handleDeleteBook}
            />
          </main>
        </div>
      </div>

      {(isAddBookOpen || editingBook) && (
        <BookForm
          shelves={shelves}
          onAddBook={handleAddBook}
          onEditBook={handleEditBook}
          onDeleteBook={handleDeleteBook}
          onClose={() => {
            setIsAddBookOpen(false)
            setEditingBook(null)
          }}
          editingBook={editingBook}
        />
      )}

      {isAddShelfOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#1A1825] rounded-lg p-6 w-full max-w-md border border-white/10">
            <h2 className="text-xl font-bold mb-4 text-white">Add New Shelf</h2>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const shelfName = formData.get('shelfName') as string
              if (shelfName) handleAddShelf(shelfName)
            }}>
              <input
                name="shelfName"
                type="text"
                placeholder="Enter shelf name"
                className="w-full px-4 py-3 bg-white/5 text-white rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-400 mb-4 transition-shadow duration-200"
                required
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddShelfOpen(false)}
                  className="px-6 py-3 text-sm font-medium text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-orange-500 rounded-lg hover:opacity-90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  Add Shelf
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingShelf && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#1A1825] rounded-lg p-6 w-full max-w-md border border-white/10">
            <h2 className="text-xl font-bold mb-4 text-white">Edit Shelf</h2>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const shelfName = formData.get('shelfName') as string
              if (shelfName) handleEditShelf(editingShelf.id, shelfName)
            }}>
              <input
                name="shelfName"
                type="text"
                placeholder="Enter new shelf name"
                defaultValue={editingShelf.name}
                className="w-full px-4 py-3 bg-white/5 text-white rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-400 mb-4 transition-shadow duration-200"
                required
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingShelf(null)}
                  className="px-6 py-3 text-sm font-medium text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-orange-500 rounded-lg hover:opacity-90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}