import { useState, useEffect } from 'react';
import { Wifi, Info, ChevronDown } from 'lucide-react';
import { Card } from './ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { checkBackendStatus } from '../utils/mockApi';

export default function SettingsPage() {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      const status = await checkBackendStatus();
      setIsOnline(status);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Settings</h1>
          <p className="text-slate-600 dark:text-slate-400">App configuration and system info</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Connection Status */}
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  isOnline ? 'bg-green-100 dark:bg-green-500/20' : 'bg-red-100 dark:bg-red-500/20'
                }`}>
                  <Wifi size={28} className={isOnline ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Raspberry Pi</h3>
                  <p className={`text-sm font-medium ${isOnline ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {isOnline === null ? 'Checking...' : isOnline ? 'Connected' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              }`} />
            </div>
            
            {!isOnline && isOnline !== null && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl">
                <p className="text-red-700 dark:text-red-400 text-sm">
                  Unable to connect to Raspberry Pi backend. Check your network connection and ensure the YOLO service is running.
                </p>
              </div>
            )}

            {isOnline && (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl">
                <p className="text-green-700 dark:text-green-400 text-sm">
                  System is ready for analysis. All services are operational.
                </p>
              </div>
            )}
          </Card>

          {/* About */}
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Info size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">About PlugScan</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Version 1.0.0</p>
              </div>
            </div>

            <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
              AI-powered spark plug analysis — right from your garage.
            </p>

            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                PlugScan uses YOLO object detection running on a Raspberry Pi to analyze spark plug conditions and provide instant feedback to help you tune your engine properly.
              </p>
            </div>
          </Card>
        </div>

        {/* Advanced Settings */}
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-2xl mt-6 overflow-hidden shadow-sm">
          <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
            <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Advanced Settings</h3>
              <ChevronDown
                size={20}
                className={`text-slate-500 dark:text-slate-400 transition-transform ${advancedOpen ? 'rotate-180' : ''}`}
              />
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="px-6 pb-6 space-y-4 border-t border-slate-200 dark:border-slate-700 pt-4">
                <div>
                  <p className="text-slate-700 dark:text-slate-300 text-sm font-medium mb-2">API Endpoint</p>
                  <code className="block bg-slate-100 dark:bg-slate-900 text-blue-600 dark:text-blue-400 p-3 rounded-lg text-sm font-mono">
                    http://raspberry-pi.local:5000
                  </code>
                </div>
                <div>
                  <p className="text-slate-700 dark:text-slate-300 text-sm font-medium mb-2">Model Version</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">YOLOv8 - Spark Plug Detection</p>
                </div>
                <div>
                  <p className="text-slate-700 dark:text-slate-300 text-sm font-medium mb-2">Detection Categories</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">Normal</span>
                    <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-xs font-medium">Carbon Fouled</span>
                    <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full text-xs font-medium">Oil Fouled</span>
                    <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-xs font-medium">Overheated</span>
                  </div>
                </div>
                <p className="text-slate-500 dark:text-slate-500 text-xs mt-4">
                  For technical support and documentation, visit the project repository.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </div>
    </div>
  );
}
