import { useState } from 'react';
import { Camera, Upload, ChevronDown, Zap, Target, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface LandingPageProps {
  onTakePhoto: () => void;
  onLogin: () => void;
  user: { name: string; email: string } | null;
}

export default function LandingPage({ onTakePhoto, onLogin, user }: LandingPageProps) {
  const [tipsOpen, setTipsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pb-20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-screen-xl mx-auto px-4 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <Zap size={24} className="text-white" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-white">PlugScan</h3>
            </div>
          </div>
          
          {user ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shrink-0">
                <span className="text-white text-sm font-medium">{user.name[0].toUpperCase()}</span>
              </div>
              <span className="text-slate-300 hidden sm:inline truncate">{user.name.split(' ')[0]}</span>
            </div>
          ) : (
            <Button
              onClick={onLogin}
              variant="outline"
              className="border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-700"
            >
              Login / Sign up
            </Button>
          )}
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-white mb-4 text-4xl sm:text-5xl">
            Scan Your Spark Plug
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl mb-8">
            Instant AI feedback to help tune your engine right from your garage.
          </p>

          {/* Large Take Photo Button */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <button
              onClick={onTakePhoto}
              className="group relative w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-2xl shadow-blue-500/50 transition-all hover:scale-105 active:scale-95 flex flex-col items-center justify-center"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
              <Camera size={64} className="text-white mb-2 relative z-10" strokeWidth={1.5} />
              <p className="text-white relative z-10">Take Photo</p>
            </button>
            
            <button
              onClick={onTakePhoto}
              className="text-slate-400 hover:text-slate-300 text-sm flex items-center gap-2 transition-colors"
            >
              <Upload size={16} strokeWidth={2} />
              or upload a photo
            </button>
          </div>

          {/* Tips Section */}
          <Collapsible open={tipsOpen} onOpenChange={setTipsOpen}>
            <CollapsibleTrigger className="flex items-center gap-2 mx-auto text-slate-400 hover:text-slate-300 transition-colors">
              <Lightbulb size={18} strokeWidth={2} />
              <span className="text-sm">Tips for a good detection</span>
              <ChevronDown
                size={18}
                className={`transition-transform ${tipsOpen ? 'rotate-180' : ''}`}
                strokeWidth={2}
              />
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="mt-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                      <Lightbulb size={20} className="text-blue-400" strokeWidth={2} />
                    </div>
                    <div className="text-left">
                      <h4 className="text-slate-200 text-sm mb-1">Good Lighting</h4>
                      <p className="text-slate-400 text-xs">
                        Use natural light or a flashlight
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                      <Target size={20} className="text-blue-400" strokeWidth={2} />
                    </div>
                    <div className="text-left">
                      <h4 className="text-slate-200 text-sm mb-1">Focus on Electrode</h4>
                      <p className="text-slate-400 text-xs">
                        Center the spark plug in frame
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                      <Camera size={20} className="text-blue-400" strokeWidth={2} />
                    </div>
                    <div className="text-left">
                      <h4 className="text-slate-200 text-sm mb-1">Clean Background</h4>
                      <p className="text-slate-400 text-xs">
                        Avoid cluttered surroundings
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 shrink-0">
              <Zap size={24} className="text-white" strokeWidth={2} />
            </div>
            <h4 className="text-slate-200 mb-1">Instant Results</h4>
            <p className="text-slate-400 text-sm">
              AI detection in seconds
            </p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3 shrink-0">
              <Target size={24} className="text-white" strokeWidth={2} />
            </div>
            <h4 className="text-slate-200 mb-1">Accurate Analysis</h4>
            <p className="text-slate-400 text-sm">
              Powered by YOLO AI
            </p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 shrink-0">
              <Lightbulb size={24} className="text-white" strokeWidth={2} />
            </div>
            <h4 className="text-slate-200 mb-1">Helpful Tips</h4>
            <p className="text-slate-400 text-sm">
              Practical engine advice
            </p>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-center text-slate-500 text-sm mt-12">
          AI-powered spark plug analysis — right from your garage.
        </p>
      </div>
    </div>
  );
}
