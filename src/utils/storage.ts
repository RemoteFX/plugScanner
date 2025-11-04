// Local storage utilities for scan history
// In production, you may want to use Supabase for persistent cloud storage

import { DetectionResult } from './mockApi';

const STORAGE_KEY = 'plugscan_history';

export const saveResult = (result: DetectionResult): void => {
  const history = getHistory();
  history.unshift(result);
  
  // Keep only last 50 results
  if (history.length > 50) {
    history.pop();
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

export const getHistory = (): DetectionResult[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    // Convert timestamp strings back to Date objects
    return parsed.map((item: any) => ({
      ...item,
      timestamp: new Date(item.timestamp),
    }));
  } catch {
    return [];
  }
};

export const deleteResult = (id: string): void => {
  const history = getHistory().filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

export const clearHistory = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
