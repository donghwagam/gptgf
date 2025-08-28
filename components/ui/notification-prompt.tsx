'use client';

import { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/lib/stores/ui-store';

export function NotificationPrompt() {
  const { showNotificationPrompt, setShowNotificationPrompt } = useUIStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenPrompt = localStorage.getItem('aico-notification-prompt-seen');
    if (!hasSeenPrompt) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000); // Show after 5 seconds

      return () => clearTimeout(timer);
    } else {
      setShowNotificationPrompt(false);
    }
  }, [setShowNotificationPrompt]);

  const handleAllow = () => {
    localStorage.setItem('aico-notification-prompt-seen', 'true');
    setShowNotificationPrompt(false);
    // Note: Real notification permission request would go here
  };

  const handleDismiss = () => {
    localStorage.setItem('aico-notification-prompt-seen', 'true');
    setShowNotificationPrompt(false);
  };

  return (
    <AnimatePresence>
      {showNotificationPrompt && isVisible && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          className="fixed bottom-6 right-6 w-80 bg-[#151822] border border-[#23283A] rounded-2xl p-6 shadow-[0_6px_30px_rgba(0,0,0,.35)] z-50"
        >
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start space-x-3 mb-4">
            <div className="p-2 bg-[#6C5CE7]/20 rounded-xl">
              <Bell className="w-5 h-5 text-[#6C5CE7]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                알림을 받아보세요
              </h3>
              <p className="text-sm text-gray-400">
                새로운 캐릭터와 업데이트 소식을 놓치지 마세요.
              </p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleAllow}
              className="flex-1 px-4 py-2 bg-[#6C5CE7] hover:bg-[#8A63F1] text-white font-medium rounded-xl transition-all duration-200"
            >
              허용
            </button>
            <button
              onClick={handleDismiss}
              className="flex-1 px-4 py-2 bg-[#23283A] hover:bg-[#2A2F45] text-gray-300 font-medium rounded-xl transition-all duration-200"
            >
              나중에
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}