import React, { useState, useEffect } from 'react';
import { TheStackChapter } from './components/chapter2/TheStackChapter';
import { ThaniHeritageChapter } from './components/chapter1/ThaniHeritageChapter';

export function App() {
  // Check URL hash or query param: defaults to 'chapter2' (The Stack @ Sawang Chanyatham)
  const getInitialChapter = (): 'chapter1' | 'chapter2' => {
    if (typeof window === 'undefined') return 'chapter2';
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    if (hash === '#chapter1' || hash === '#ch1' || hash === '#theheritage' || search.includes('chapter=1')) {
      return 'chapter1';
    }
    return 'chapter2';
  };

  const [activeChapter, setActiveChapter] = useState<'chapter1' | 'chapter2'>(getInitialChapter);

  // Sync with browser back/forward and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#chapter1' || hash === '#ch1' || hash === '#theheritage') {
        setActiveChapter('chapter1');
      } else if (hash === '#chapter2' || hash === '#ch2' || hash === '') {
        setActiveChapter('chapter2');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const switchChapter = (chapter: 'chapter1' | 'chapter2') => {
    setActiveChapter(chapter);
    window.location.hash = chapter === 'chapter1' ? '#chapter1' : '#chapter2';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-slate-100">
      {activeChapter === 'chapter2' ? (
        <TheStackChapter onNavigateToChapter1={() => switchChapter('chapter1')} />
      ) : (
        <ThaniHeritageChapter onNavigateToChapter2={() => switchChapter('chapter2')} />
      )}
    </div>
  );
}

export default App;
