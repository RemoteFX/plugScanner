import { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';
import LandingPage from './components/LandingPage';
import ScanPage from './components/ScanPage';
import ResultsPage from './components/ResultsPage';
import HistoryPage from './components/HistoryPage';
import LearnPage from './components/LearnPage';
import SettingsPage from './components/SettingsPage';
import AuthModal from './components/AuthModal';
import BottomNav from './components/BottomNav';
import LoadingScreen from './components/LoadingScreen';
import { analyzeSparkPlug, DetectionResult } from './utils/mockApi';
import { saveResult } from './utils/storage';

type Page = 'home' | 'scan' | 'history' | 'learn' | 'settings' | 'results';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<DetectionResult | null>(null);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleTakePhoto = () => {
    setCurrentPage('scan');
  };

  const handleImageCapture = async (file: File) => {
    setIsAnalyzing(true);
    
    try {
      const result = await analyzeSparkPlug(file);
      setCurrentResult(result);
      setCurrentPage('results');
      toast('✅ Analysis complete!', {
        description: `Detected: ${result.condition} (${result.confidence.toFixed(1)}% confidence)`,
      });
    } catch (error) {
      toast('❌ Analysis failed', {
        description: 'Could not connect to Raspberry Pi. Please check your connection.',
      });
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRescan = () => {
    setCurrentResult(null);
    setCurrentPage('scan');
  };

  const handleSaveResult = () => {
    if (!user) {
      toast('Sign in required', {
        description: 'Please sign in to save your scan results.',
      });
      setAuthModalOpen(true);
      return;
    }

    if (currentResult) {
      saveResult(currentResult);
      toast('💾 Result saved', {
        description: 'Scan has been added to your history.',
      });
      setCurrentPage('history');
    }
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleLogin = (email: string) => {
    // Mock login - extract name from email
    const name = email.split('@')[0];
    setUser({ name, email });
    toast('👋 Welcome!', {
      description: `Signed in as ${email}`,
    });
  };

  const handleOpenAuth = () => {
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Loading Screen */}
      {isAnalyzing && <LoadingScreen />}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLogin={handleLogin}
      />

      {/* Page Content */}
      {currentPage === 'home' && (
        <LandingPage
          onTakePhoto={handleTakePhoto}
          onLogin={handleOpenAuth}
          user={user}
        />
      )}

      {currentPage === 'scan' && (
        <ScanPage
          onImageCapture={handleImageCapture}
          onBack={() => setCurrentPage('home')}
        />
      )}
      
      {currentPage === 'results' && currentResult && (
        <ResultsPage
          result={currentResult}
          onRescan={handleRescan}
          onSave={handleSaveResult}
          user={user}
        />
      )}
      
      {currentPage === 'history' && (
        <HistoryPage user={user} onLogin={handleOpenAuth} />
      )}
      
      {currentPage === 'learn' && <LearnPage />}
      
      {currentPage === 'settings' && <SettingsPage />}

      {/* Bottom Navigation */}
      <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Toast Notifications */}
      <Toaster
        theme="dark"
        position="top-center"
        toastOptions={{
          style: {
            background: '#1e293b',
            border: '1px solid #334155',
            color: '#f1f5f9',
          },
        }}
      />
    </div>
  );
}
