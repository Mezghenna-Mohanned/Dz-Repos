import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import RepositoryList from './components/RepositoryList';
import Footer from './components/Footer';

function App() {
  const [sortBy, setSortBy] = useState<'stars' | 'commits' | 'updated'>('stars');
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <Navbar 
          onSortChange={setSortBy} 
          currentSort={sortBy} 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <main className="flex-grow container mx-auto px-4 py-8 mt-16">
          <RepositoryList sortBy={sortBy} searchQuery={searchQuery} />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;