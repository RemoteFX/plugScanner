import { useState, useEffect } from 'react';
import { Trash2, Calendar, LogIn } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { DetectionResult, getConditionColor } from '../utils/mockApi';
import { getHistory, deleteResult, clearHistory } from '../utils/storage';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

interface HistoryPageProps {
  user: { name: string; email: string } | null;
  onLogin: () => void;
}

export default function HistoryPage({ user, onLogin }: HistoryPageProps) {
  const [history, setHistory] = useState<DetectionResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<DetectionResult | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    setHistory(getHistory());
  };

  const handleDelete = (id: string) => {
    deleteResult(id);
    loadHistory();
    if (selectedResult?.id === id) {
      setSelectedResult(null);
    }
  };

  const handleClearAll = () => {
    clearHistory();
    loadHistory();
    setSelectedResult(null);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Show login prompt if not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pb-24 pt-6">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="bg-slate-800 border-slate-700 rounded-2xl p-12 max-w-md text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0">
                <LogIn size={40} className="text-white" strokeWidth={2} />
              </div>
              <h2 className="text-white mb-3">Sign In Required</h2>
              <p className="text-slate-300 mb-6">
                Sign in to save and view your spark plug scans across all your devices.
              </p>
              <Button
                onClick={onLogin}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white h-12 rounded-xl"
              >
                <LogIn size={20} className="mr-2" strokeWidth={2} />
                Sign In / Sign Up
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pb-24 pt-6">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-white mb-1">Scan History</h1>
            <p className="text-slate-400">{history.length} total scans</p>
          </div>
          {history.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 size={16} className="mr-2" strokeWidth={2} />
                  Clear All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-slate-800 border-slate-700">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-white">Clear all history?</AlertDialogTitle>
                  <AlertDialogDescription className="text-slate-300">
                    This will permanently delete all scan results. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-slate-700 border-slate-600 text-slate-200">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleClearAll}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    Delete All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        {history.length === 0 ? (
          <Card className="bg-slate-800 border-slate-700 rounded-2xl p-12">
            <div className="text-center flex flex-col items-center">
              <Calendar size={64} className="text-slate-500 mb-4" strokeWidth={1.5} />
              <h3 className="text-white mb-2">No scans yet</h3>
              <p className="text-slate-400">
                Your scan history will appear here after you analyze your first spark plug.
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {history.map((result) => {
              const conditionColor = getConditionColor(result.condition);
              
              return (
                <Card
                  key={result.id}
                  className="bg-slate-800 border-slate-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedResult(result)}
                >
                  <div className="flex gap-4 p-4">
                    {/* Thumbnail */}
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0">
                      <img
                        src={result.imageUrl}
                        alt="Spark plug scan"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="min-w-0 flex-1">
                          <h4
                            className="mb-1 truncate"
                            style={{ color: conditionColor }}
                          >
                            {result.condition}
                          </h4>
                          <p className="text-slate-400 text-xs">
                            {formatDate(result.timestamp)}
                          </p>
                        </div>
                        <span
                          className="px-2 py-1 rounded text-xs whitespace-nowrap shrink-0"
                          style={{
                            backgroundColor: `${conditionColor}20`,
                            color: conditionColor,
                          }}
                        >
                          {result.confidence.toFixed(1)}%
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm line-clamp-2">
                        {result.suggestion}
                      </p>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(result.id);
                      }}
                      className="text-slate-500 hover:text-red-400 transition-colors p-2 shrink-0"
                    >
                      <Trash2 size={18} strokeWidth={2} />
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Detail Modal */}
        {selectedResult && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
            onClick={() => setSelectedResult(null)}
          >
            <Card
              className="bg-slate-800 border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h3 className="text-white mb-4">Scan Details</h3>
                
                {/* Image */}
                <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden mb-4">
                  <img
                    src={selectedResult.imageUrl}
                    alt="Spark plug scan"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Condition</span>
                    <span
                      style={{ color: getConditionColor(selectedResult.condition) }}
                    >
                      {selectedResult.condition}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Confidence</span>
                    <span className="text-slate-100">
                      {selectedResult.confidence.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Date</span>
                    <span className="text-slate-100">
                      {new Date(selectedResult.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-4 mb-6">
                  <h4 className="text-white mb-2">Recommendation</h4>
                  <p className="text-slate-300">{selectedResult.suggestion}</p>
                </div>

                <Button
                  onClick={() => setSelectedResult(null)}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white h-12 rounded-xl"
                >
                  Close
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
