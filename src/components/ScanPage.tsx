import { useRef } from 'react';
import { Camera, Upload, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface ScanPageProps {
  onImageCapture: (file: File) => void;
  onBack: () => void;
}

export default function ScanPage({ onImageCapture, onBack }: ScanPageProps) {
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pb-20 pt-6">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={2} />
          </button>
          <div className="min-w-0 flex-1">
            <h2 className="text-white truncate">Upload Spark Plug Photo</h2>
            <p className="text-slate-400 text-sm truncate">Take or choose a photo to analyze</p>
          </div>
        </div>

        {/* Upload Card */}
        <Card className="bg-slate-800 border-slate-700 rounded-2xl overflow-hidden mb-6">
          <div className="p-8">
            {/* Camera Preview Area */}
            <div className="relative aspect-[4/3] bg-slate-900 rounded-xl mb-6 overflow-hidden border-2 border-dashed border-slate-700 hover:border-blue-500 transition-colors cursor-pointer group"
              onClick={handleUploadClick}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Camera size={48} className="text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-slate-200 mb-2">Take a Photo</h3>
                  <p className="text-slate-400 text-sm">
                    or tap to upload from your device
                  </p>
                </div>
              </div>
              
              {/* Scan frame overlay */}
              <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
                <div className="w-full max-w-xs aspect-square rounded-lg relative">
                  {/* Corner markers */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400/50" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-400/50" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400/50" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400/50" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleUploadClick}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white h-14 rounded-xl"
              >
                <Camera size={20} className="mr-2" strokeWidth={2} />
                Take Photo
              </Button>
              <Button
                onClick={handleUploadClick}
                variant="outline"
                className="flex-1 border-slate-600 bg-slate-700 hover:bg-slate-600 text-slate-100 h-14 rounded-xl"
              >
                <Upload size={20} className="mr-2" strokeWidth={2} />
                Upload from Device
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

        {/* Quick Tips */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 rounded-xl p-6">
          <h4 className="text-slate-200 mb-3">Quick Tips</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-3 text-slate-300 text-sm">
              <span className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-blue-400 text-xs font-medium">1</span>
              </span>
              <span>Make sure the spark plug is clean and visible</span>
            </li>
            <li className="flex items-start gap-3 text-slate-300 text-sm">
              <span className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-blue-400 text-xs font-medium">2</span>
              </span>
              <span>Use good lighting — natural light works best</span>
            </li>
            <li className="flex items-start gap-3 text-slate-300 text-sm">
              <span className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-blue-400 text-xs font-medium">3</span>
              </span>
              <span>Focus on the electrode and insulator area</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
