import { useEffect, useState } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { checkBackendStatus } from '../utils/mockApi';

export default function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      const status = await checkBackendStatus();
      setIsOnline(status);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  if (isOnline === null) return null;

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs ${
        isOnline
          ? 'bg-[#00ff88]/10 text-[#00ff88]'
          : 'bg-[#ff3b30]/10 text-[#ff3b30]'
      }`}
    >
      {isOnline ? (
        <>
          <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
          <span>Pi Online</span>
        </>
      ) : (
        <>
          <WifiOff size={14} />
          <span>Pi Offline</span>
        </>
      )}
    </div>
  );
}
