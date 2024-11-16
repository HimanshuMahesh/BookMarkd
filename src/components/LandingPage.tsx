import { Library } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0D0B1E] text-white font-sans flex flex-col relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] rounded-full bg-orange-500/20 blur-[120px]" />
      
      <header className="relative z-10 border-b border-white/5 backdrop-blur-sm bg-black/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Library className="h-6 w-6 bg-gradient-to-r from-purple-400 to-orange-400 rounded-lg p-1" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              BookMarkd
            </span>
          </div>
          <nav>
            <a 
              href="/app" 
              className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Go to App
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="text-center space-y-8 max-w-3xl">
          <div className="space-y-4">
            <div className="inline-block rounded-full px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 backdrop-blur-sm">
              Your Reading Journey Starts Here
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Your Personal
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mt-2">
                Library Curator
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed">
              Organize and track your reading journey with elegance and simplicity.
            </p>
          </div>
          <div className="flex justify-center">
            <a
              href="/app"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-lg font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90 transition-opacity duration-200"
            >
              Start Your Library
            </a>
          </div>
        </div>
      </main>

      <section id="features" className="relative z-10 py-24 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-6 bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Organize Your Collection
              </h2>
              <p className="text-lg text-white/60">
                Create custom shelves, track your reading progress, and keep your entire library organized in one beautiful place.
              </p>
            </div>
            <div className="space-y-6 bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                Track Your Progress
              </h2>
              <p className="text-lg text-white/60">
                Mark books as currently reading, want to read, or finished. Add personal reviews and notes to remember your thoughts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-8 border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Library className="h-5 w-5 bg-gradient-to-r from-purple-400 to-orange-400 rounded-lg p-1" />
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              BookMarkd
            </span>
          </div>
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} BookMarkd. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}