import { useState, useRef } from 'react';
import { Camera, Upload, Zap, ZapOff } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import ConnectionStatus from './ConnectionStatus';

interface HomePageProps {
  onImageCapture: (file: File) => void;
}

export default function HomePage({ onImageCapture }: HomePageProps) {
  const [flashEnabled, setFlashEnabled] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageCapture(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-[#0a0e14] pb-24 pt-6">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[#e8eaed] mb-1">PlugScan</h1>
            <p className="text-[#9ca3af]">AI-Powered Spark Plug Analysis</p>
          </div>
          <ConnectionStatus />
        </div>

        {/* Main Scan Card */}
        <Card className="bg-[#151a23] border-[#1e2530] rounded-2xl overflow-hidden mb-6">
          <div className="p-8">
            <h2 className="text-[#e8eaed] mb-4 text-center">Scan Your Spark Plug</h2>
            
            {/* Camera Preview Placeholder */}
            <div className="relative aspect-[4/3] bg-[#0a0e14] rounded-xl mb-6 overflow-hidden border border-[#1e2530]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center flex flex-col items-center">
                  <Camera size={64} className="text-[#00d4ff] mb-4" strokeWidth={1.5} />
                  <p className="text-[#9ca3af]">Camera preview will appear here</p>
                </div>
              </div>
              
              {/* Scan Frame Overlay */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-full max-w-xs aspect-square border-2 border-[#00d4ff] rounded-lg relative">
                  {/* Corner markers */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#00d4ff]" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#00d4ff]" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#00d4ff]" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#00d4ff]" />
                </div>
              </div>
            </div>

            {/* Hint Text */}
            <div className="bg-[#00d4ff]/10 border border-[#00d4ff]/20 rounded-lg p-4 mb-6">
              <p className="text-[#00d4ff] text-center">
                💡 Ensure good lighting and focus on the electrode area
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleUploadClick}
                className="flex-1 bg-[#00d4ff] hover:bg-[#0099cc] text-[#0a0e14] h-14 rounded-xl"
              >
                <Camera size={20} className="mr-2" />
                Take Photo
              </Button>
              <Button
                onClick={handleUploadClick}
                variant="outline"
                className="flex-1 border-[#1e2530] bg-[#1e2530] hover:bg-[#2a3240] text-[#e8eaed] h-14 rounded-xl"
              >
                <Upload size={20} className="mr-2" />
                Upload Photo
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </Card>

        {/* Flashlight Toggle */}
        <Card className="bg-[#151a23] border-[#1e2530] rounded-xl">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {flashEnabled ? (
                <Zap size={20} className="text-[#00d4ff]" />
              ) : (
                <ZapOff size={20} className="text-[#9ca3af]" />
              )}
              <span className="text-[#e8eaed]">Enable Flashlight</span>
            </div>
            <button
              onClick={() => setFlashEnabled(!flashEnabled)}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                flashEnabled ? 'bg-[#00d4ff]' : 'bg-[#1e2530]'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  flashEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Card className="bg-[#151a23] border-[#1e2530] rounded-xl p-4 text-center">
            <div className="text-[#00d4ff] mb-1">4</div>
            <p className="text-[#9ca3af] text-xs">Conditions</p>
          </Card>
          <Card className="bg-[#151a23] border-[#1e2530] rounded-xl p-4 text-center">
            <div className="text-[#00d4ff] mb-1">95%</div>
            <p className="text-[#9ca3af] text-xs">Accuracy</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
