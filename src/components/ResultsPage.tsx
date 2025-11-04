import { CheckCircle, AlertCircle, XCircle, Droplets, Wrench } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { DetectionResult, getConditionColor } from '../utils/mockApi';
import { Badge } from './ui/badge';

interface ResultsPageProps {
  result: DetectionResult;
  onRescan: () => void;
  onSave: () => void;
  user: { name: string; email: string } | null;
}

export default function ResultsPage({ result, onRescan, onSave, user }: ResultsPageProps) {
  const conditionColor = getConditionColor(result.condition);
  
  const getIcon = () => {
    switch (result.condition) {
      case 'Ideal':
        return <CheckCircle size={56} className="text-green-500" strokeWidth={2} />;
      case 'Basah':
        return <Droplets size={56} className="text-blue-500" strokeWidth={2} />;
      case 'Boros':
        return <AlertCircle size={56} className="text-amber-500" strokeWidth={2} />;
      case 'Kering':
        return <XCircle size={56} className="text-red-500" strokeWidth={2} />;
    }
  };

  const getStatusText = () => {
    switch (result.condition) {
      case 'Ideal':
        return 'Your engine is running well!';
      case 'Basah':
        return 'Your spark plug is wet';
      case 'Boros':
        return 'Your engine is running rich';
      case 'Kering':
        return 'Your spark plug is too dry';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pb-24 pt-6">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Image with Overlay */}
        <Card className="bg-slate-800 border-slate-700 rounded-2xl overflow-hidden mb-6">
          <div className="relative aspect-[4/3] bg-slate-900">
            <img
              src={result.imageUrl}
              alt="Analyzed spark plug"
              className="w-full h-full object-cover"
            />
            {result.boundingBox && (
              <div
                className="absolute border-3 rounded-lg"
                style={{
                  borderColor: conditionColor,
                  borderWidth: '3px',
                  left: `${result.boundingBox.x * 100}%`,
                  top: `${result.boundingBox.y * 100}%`,
                  width: `${result.boundingBox.width * 100}%`,
                  height: `${result.boundingBox.height * 100}%`,
                  boxShadow: `0 0 20px ${conditionColor}60`,
                }}
              >
                <div
                  className="absolute -top-10 left-0 px-3 py-1.5 rounded-lg text-sm text-white shadow-lg"
                  style={{ backgroundColor: conditionColor }}
                >
                  {result.condition}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Result Card */}
        <Card className="bg-slate-800 border-slate-700 rounded-2xl p-8 mb-6 text-center">
          <div className="flex justify-center mb-4">
            {getIcon()}
          </div>
          
          <h1 className="text-white mb-2">
            Condition: <span style={{ color: conditionColor }}>{result.condition}</span>
          </h1>
          
          <p className="text-slate-300 text-lg mb-6">
            {getStatusText()}
          </p>

          {/* Confidence Badge */}
          <Badge
            className="px-6 py-2 rounded-full text-lg"
            style={{
              backgroundColor: `${conditionColor}20`,
              color: conditionColor,
              border: `2px solid ${conditionColor}60`,
            }}
          >
            {result.confidence.toFixed(1)}% Confidence
          </Badge>

          {/* Visual Confidence Bar */}
          <div className="mt-6">
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full transition-all rounded-full"
                style={{
                  width: `${result.confidence}%`,
                  backgroundColor: conditionColor,
                }}
              />
            </div>
          </div>
        </Card>

        {/* Feedback Card */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-800/80 border-slate-700 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
              <Wrench size={24} className="text-blue-400" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-white mb-2">What This Means</h3>
              <p className="text-slate-300 leading-relaxed">
                {result.suggestion}
              </p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={onRescan}
            variant="outline"
            className="border-slate-600 bg-slate-700 hover:bg-slate-600 text-slate-100 h-14 rounded-xl"
          >
            Rescan
          </Button>
          <Button
            onClick={onSave}
            disabled={!user}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white h-14 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {user ? 'Save to History' : 'Login to Save'}
          </Button>
        </div>
      </div>
    </div>
  );
}
