import { Home, History, BookOpen, Settings } from 'lucide-react';

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'history', icon: History, label: 'History' },
    { id: 'learn', icon: BookOpen, label: 'Learn' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-800/95 backdrop-blur-lg border-t border-slate-700 z-50 safe-area-bottom">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center gap-1 px-4 py-2 transition-all ${
                  isActive
                    ? 'text-blue-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} className="shrink-0" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
