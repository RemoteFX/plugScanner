import { useState } from 'react';
import { Camera, Upload, ChevronDown, Zap, Target, Lightbulb, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface LandingPageProps {
  onTakePhoto: () => void;
  onLogin: () => void;
  user: { name: string; email: string } | null;
}

export default function LandingPage({ onTakePhoto }: LandingPageProps) {
  const [tipsOpen, setTipsOpen] = useState(false);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Scan Your Spark Plug
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-12">
            Get instant AI-powered feedback to help tune your engine right from your garage.
            Professional analysis in seconds.
          </p>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={onTakePhoto}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/50 transition-all hover:scale-105 active:scale-95"
            >
              <Camera size={24} className="mr-2" />
              Start Scanning
            </button>
            
            <button
              onClick={onTakePhoto}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
            >
              <Upload size={24} className="mr-2" />
              Upload Photo
            </button>
          </div>

          {/* Tips Section */}
          <Collapsible open={tipsOpen} onOpenChange={setTipsOpen}>
            <CollapsibleTrigger className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
              <Lightbulb size={18} />
              <span className="text-sm font-medium">Tips for best results</span>
              <ChevronDown
                size={18}
                className={`transition-transform ${tipsOpen ? 'rotate-180' : ''}`}
              />
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="mt-6 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3">
                      <Lightbulb size={24} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Good Lighting</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Use natural light or a flashlight for clear visibility
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3">
                      <Target size={24} className="text-green-600 dark:text-green-400" />
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Focus on Electrode</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Center the spark plug electrode in frame
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-3">
                      <Camera size={24} className="text-amber-600 dark:text-amber-400" />
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Clean Background</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Avoid cluttered surroundings for accuracy
                    </p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Zap size={24} className="text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Instant Results</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              AI detection in seconds with real-time analysis
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
              <Target size={24} className="text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">95% Accuracy</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Powered by advanced YOLO AI technology
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-4">
              <Lightbulb size={24} className="text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Expert Tips</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Get practical advice for engine maintenance
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle2 size={24} className="text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Save History</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Track your scans and monitor engine health
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Capture Image</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Take a photo of your spark plug using your device camera or upload an existing image
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">2</span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">AI Analysis</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Our AI instantly analyzes the condition and identifies potential issues
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">3</span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Get Results</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Receive detailed feedback and recommendations for your engine
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
