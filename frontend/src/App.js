import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WaitlistModal } from './components/WaitlistModal';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import './App.css';

function App() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const openWaitlist = () => setIsWaitlistOpen(true);
  const closeWaitlist = () => setIsWaitlistOpen(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar onOpenWaitlist={openWaitlist} />
        
        <Routes>
          <Route 
            path="/" 
            element={<HomePage onOpenWaitlist={openWaitlist} />} 
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        
        <Footer />
        
        <WaitlistModal 
          isOpen={isWaitlistOpen} 
          onClose={closeWaitlist} 
        />
        
        {/* Grain overlay for premium texture */}
        <div className="grain-overlay" aria-hidden="true" />
        
        <Toaster position="bottom-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;
