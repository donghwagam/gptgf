'use client';

import { useState, useEffect } from 'react';
import { Smartphone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/lib/stores/ui-store';

export function PwaInstallPrompt() {
  const { showPwaInstall, setShowPwaInstall } = useUIStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenPrompt = localStorage.getItem('aico-pwa-prompt-seen');
    if (!hasSeenPrompt) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10000); // Show after 10 seconds

      return () => clearTimeout(timer);
    } else {
      setShowPwaInstall(false);
    }
  }, [setShowPwaInstall]);

  const handleInstall = () => {
    localStorage.setItem('aico-pwa-prompt-seen', 'true');
    setShowPwaInstall(false);
    // Note: Real PWA installation logic would go here
  };

  const handleDismiss = () => {
    localStorage.setItem('aico-pwa-prompt-seen', 'true');
    setShowPwaInstall(false);
  };

  return (
    <AnimatePresence>
      {showPwaInstall && isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 w-96 bg-[#151822] border border-[#23283A] rounded-2xl p-6 shadow-[0_6px_30px_rgba(0,0,0,.35)] z-50"
        >
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-[#6C5CE7] to-[#8A63F1] rounded-xl">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                앱을 설치하세요
              </h3>
              <p className="text-sm text-gray-400">
                더 빠르고 편리한 환경에서 AICo.Chat을 즐겨보세요.
              </p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleInstall}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-[#6C5CE7] to-[#8A63F1] hover:from-[#8A63F1] hover:to-[#6C5CE7] text-white font-bold rounded-xl transition-all duration-200"
            >
              지금 설치
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-3 bg-[#23283A] hover:bg-[#2A2F45] text-gray-300 font-medium rounded-xl transition-all duration-200"
            >
              취소
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}