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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pb-24 pt-6">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-white mb-1">Settings</h1>
          <p className="text-slate-400">App configuration and info</p>
        </div>

        {/* Connection Status */}
        <Card className="bg-slate-800 border-slate-700 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isOnline ? 'bg-green-500/20' : 'bg-red-500/20'
              }`}>
                <Wifi size={24} className={isOnline ? 'text-green-500' : 'text-red-500'} />
              </div>
              <div>
                <h3 className="text-white mb-1">Raspberry Pi</h3>
                <p className={`text-sm ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
                  {isOnline === null ? 'Checking...' : isOnline ? 'Connected' : 'Offline'}
                </p>
              </div>
            </div>
            <div className={`w-3 h-3 rounded-full ${
              isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'
            }`} />
          </div>
          
          {!isOnline && isOnline !== null && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">
                Unable to connect to Raspberry Pi backend. Check your network connection and ensure the YOLO service is running.
              </p>
            </div>
          )}
        </Card>

        {/* Advanced Settings */}
        <Card className="bg-slate-800 border-slate-700 rounded-2xl mb-6 overflow-hidden">
          <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
            <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-slate-700/50 transition-colors">
              <h3 className="text-white">Advanced Settings</h3>
              <ChevronDown
                size={20}
                className={`text-slate-400 transition-transform ${advancedOpen ? 'rotate-180' : ''}`}
              />
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="px-6 pb-6 space-y-4 border-t border-slate-700 pt-4">
                <div>
                  <p className="text-slate-300 text-sm mb-2">API Endpoint</p>
                  <code className="block bg-slate-900 text-blue-400 p-3 rounded-lg text-sm">
                    http://raspberry-pi.local:5000
                  </code>
                </div>
                <div>
                  <p className="text-slate-300 text-sm mb-2">Model Version</p>
                  <p className="text-slate-400 text-sm">YOLOv8 - Spark Plug Detection</p>
                </div>
                <p className="text-slate-500 text-xs">
                  For technical support, refer to the project documentation.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* About */}
        <Card className="bg-slate-800 border-slate-700 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Info size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-white">About PlugScan</h3>
              <p className="text-slate-400 text-sm">Version 1.0.0</p>
            </div>
          </div>

          <p className="text-slate-300 mb-4 leading-relaxed">
            AI-powered spark plug analysis — right from your garage.
          </p>

          <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
            <p className="text-slate-400 text-sm leading-relaxed">
              PlugScan uses YOLO object detection running on a Raspberry Pi to analyze spark plug conditions and provide instant feedback to help you tune your engine properly.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
