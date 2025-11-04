import { Droplets, Flame, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card } from './ui/card';
import { getConditionColor, SparkPlugCondition } from '../utils/mockApi';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ConditionInfo {
  condition: SparkPlugCondition;
  description: string;
  subtitle: string;
  causes: string[];
  icon: React.ReactNode;
}

export default function LearnPage() {
  const conditions: ConditionInfo[] = [
    {
      condition: 'Ideal',
      subtitle: 'Normal / Healthy',
      description: 'A healthy spark plug with light tan to gray deposits. The electrode shows normal wear and the insulator is clean. This is what you want to see!',
      causes: [
        'Proper air-fuel mixture',
        'Correct ignition timing',
        'Good engine condition',
        'Regular maintenance schedule',
      ],
      icon: <CheckCircle size={32} className="text-green-500" />,
    },
    {
      condition: 'Basah',
      subtitle: 'Wet / Oil-fouled',
      description: 'Wet or oil-fouled plug with black, oily deposits. The electrode and insulator are covered in oil or fuel, preventing proper ignition.',
      causes: [
        'Worn piston rings or valve guides',
        'Oil leaking into combustion chamber',
        'Excessive fuel delivery',
        'Failed ignition system components',
      ],
      icon: <Droplets size={32} className="text-blue-500" />,
    },
    {
      condition: 'Boros',
      subtitle: 'Rich / Carbon-fouled',
      description: 'Carbon-fouled plug with dry, fluffy black deposits. Indicates the engine is running with too much fuel (rich mixture) or incomplete combustion.',
      causes: [
        'Clogged or dirty air filter',
        'Faulty oxygen sensor',
        'Leaking fuel injectors',
        'Excessive idling or short trips',
      ],
      icon: <Flame size={32} className="text-amber-500" />,
    },
    {
      condition: 'Kering',
      subtitle: 'Dry / Lean',
      description: 'White or light gray deposits with possible electrode erosion. Indicates the engine is running too lean (not enough fuel) or experiencing overheating.',
      causes: [
        'Lean air-fuel mixture',
        'Vacuum leaks in intake system',
        'Incorrect spark plug heat range',
        'Engine overheating issues',
      ],
      icon: <AlertTriangle size={32} className="text-red-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pb-24 pt-6">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-white mb-1">Learn About Spark Plugs</h1>
          <p className="text-slate-400">
            Understanding the four main conditions
          </p>
        </div>

        {/* Condition Cards */}
        <div className="space-y-6">
          {conditions.map((item) => {
            const conditionColor = getConditionColor(item.condition);
            
            return (
              <Card
                key={item.condition}
                className="bg-slate-800 border-slate-700 rounded-2xl overflow-hidden"
              >
                {/* Header */}
                <div
                  className="p-6 border-b border-slate-700"
                  style={{
                    background: `linear-gradient(to right, ${conditionColor}15, transparent)`,
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: `${conditionColor}20`,
                        border: `2px solid ${conditionColor}`,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h2 style={{ color: conditionColor }}>
                        {item.condition}
                      </h2>
                      <p className="text-slate-400">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Example Image */}
                  <div className="aspect-video bg-slate-900 rounded-xl mb-6 overflow-hidden">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1662973947884-782d1d46a217?w=800"
                      alt={`Example of ${item.condition} spark plug`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 mb-6 leading-relaxed">{item.description}</p>

                  {/* Common Causes */}
                  <div>
                    <h4 className="text-white mb-3">Common Causes</h4>
                    <ul className="space-y-2">
                      {item.causes.map((cause, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300">
                          <span
                            className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                            style={{ backgroundColor: conditionColor }}
                          />
                          <span>{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Maintenance Tips */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 rounded-2xl p-6 mt-6">
          <h3 className="text-white mb-4">💡 General Maintenance Tips</h3>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start gap-3">
              <span className="text-blue-400">•</span>
              <span>Check spark plugs every 30,000 miles or as recommended by manufacturer</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400">•</span>
              <span>Use the correct spark plug type and gap for your engine</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400">•</span>
              <span>Replace plugs in sets to ensure even performance</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400">•</span>
              <span>Inspect plugs when experiencing engine performance issues</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
