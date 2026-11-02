import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { Navbar } from './components/Navbar.jsx';
import { Footer } from './components/Footer.jsx';
import { AuthModal } from './components/AuthModal.jsx';

import { HomePage } from './pages/HomePage.jsx';
import { DictionaryPage } from './pages/DictionaryPage.jsx';
import { LearnPage } from './pages/LearnPage.jsx';
import { GrammarPage } from './pages/GrammarPage.jsx';
import { StatsPage } from './pages/StatsPage.jsx';
import { AttributionPage } from './pages/AttributionPage.jsx';
import { VerifyEmailPage } from './pages/VerifyEmailPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';

function AppContent() {
  return (
    <div className="h-screen w-full flex flex-col bg-white dark:bg-[#121316] text-slate-900 dark:text-slate-100 transition-colors overflow-hidden">
      <Navbar />
      <main className="flex-1 min-h-0 w-full overflow-hidden relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<DictionaryPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/grammar" element={<GrammarPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/attribution" element={<div className="h-full overflow-y-auto"><AttributionPage /></div>} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/activate" element={<VerifyEmailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
