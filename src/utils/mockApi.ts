// Mock API for Raspberry Pi YOLO detection backend
// Replace these with actual API calls to your Raspberry Pi

export type SparkPlugCondition = 'Basah' | 'Boros' | 'Ideal' | 'Kering';

export interface DetectionResult {
  id: string;
  condition: SparkPlugCondition;
  confidence: number;
  imageUrl: string;
  timestamp: Date;
  suggestion: string;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

// Simulated delay for API call
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get condition color - updated for friendlier palette
export const getConditionColor = (condition: SparkPlugCondition): string => {
  switch (condition) {
    case 'Basah':
      return '#3b82f6'; // blue-500
    case 'Boros':
      return '#f59e0b'; // amber-500
    case 'Ideal':
      return '#10b981'; // green-500
    case 'Kering':
      return '#ef4444'; // red-500
  }
};

// Get maintenance suggestion
export const getSuggestion = (condition: SparkPlugCondition): string => {
  switch (condition) {
    case 'Basah':
      return 'Check spark plug seals or oil contamination. The plug shows signs of moisture which may indicate oil leakage or coolant intrusion.';
    case 'Boros':
      return 'Inspect air filter or injectors for leaks. The rich carbon deposits suggest the engine is running with too much fuel.';
    case 'Ideal':
      return 'Engine running well — no action needed. Continue regular maintenance schedule.';
    case 'Kering':
      return 'Check for vacuum leaks or lean fuel mixture. The dry, white deposits indicate the engine is running too lean or hot.';
  }
};

// Mock API call to Raspberry Pi YOLO backend
export const analyzeSparkPlug = async (imageFile: File): Promise<DetectionResult> => {
  // Simulate network delay (1.5-3 seconds)
  await delay(1500 + Math.random() * 1500);

  // In production, replace with actual API call:
  // const formData = new FormData();
  // formData.append('image', imageFile);
  // const response = await fetch('http://raspberry-pi-ip:5000/analyze', {
  //   method: 'POST',
  //   body: formData
  // });
  // return await response.json();

  // Mock detection result
  const conditions: SparkPlugCondition[] = ['Basah', 'Boros', 'Ideal', 'Kering'];
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  const confidence = 75 + Math.random() * 20; // 75-95% confidence

  const imageUrl = URL.createObjectURL(imageFile);

  return {
    id: `scan-${Date.now()}`,
    condition,
    confidence: Math.round(confidence * 100) / 100,
    imageUrl,
    timestamp: new Date(),
    suggestion: getSuggestion(condition),
    boundingBox: {
      x: 0.2 + Math.random() * 0.2,
      y: 0.2 + Math.random() * 0.2,
      width: 0.4 + Math.random() * 0.2,
      height: 0.4 + Math.random() * 0.2,
    },
  };
};

// Check Raspberry Pi connection status
export const checkBackendStatus = async (): Promise<boolean> => {
  // In production, replace with actual health check:
  // try {
  //   const response = await fetch('http://raspberry-pi-ip:5000/health');
  //   return response.ok;
  // } catch {
  //   return false;
  // }

  // Mock: randomly return online/offline for demo
  return Math.random() > 0.1; // 90% online
};
