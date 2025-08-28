'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/lib/stores/ui-store';
import { DataRepository } from '@/lib/data';

export function OnboardingModal() {
  const { showOnboarding, setShowOnboarding } = useUIStore();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isAdult, setIsAdult] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  
  const tags = DataRepository.getTags().slice(0, 20); // Show first 20 tags
  const canSave = selectedTags.length >= 5 && selectedTags.length <= 8 && isAdult && acceptedTerms;

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('aico-onboarding-completed');
    if (hasSeenOnboarding) {
      setShowOnboarding(false);
    }
  }, [setShowOnboarding]);

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tagId)) {
        return prev.filter(id => id !== tagId);
      }
      if (prev.length >= 8) {
        return prev;
      }
      return [...prev, tagId];
    });
  };

  const handleSave = () => {
    if (canSave) {
      localStorage.setItem('aico-onboarding-completed', 'true');
      setShowOnboarding(false);
    }
  };

  return (
    <AnimatePresence>
      {showOnboarding && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#151822] rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#23283A]"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  환영합니다! 🥳
                </h2>
                <p className="text-gray-400">
                  5-8개의 관심사를 선택해주세요. 당신이 좋아할 캐릭터를 찾는 데 도움이 됩니다.
                </p>
              </div>
              <button
                onClick={() => setShowOnboarding(false)}
                className="p-2 text-gray-400 hover:text-white rounded-xl transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Tag Selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">관심 태그 선택</h3>
                <span className={`text-sm font-medium ${
                  selectedTags.length >= 5 && selectedTags.length <= 8 
                    ? 'text-[#6C5CE7]' 
                    : 'text-gray-400'
                }`}>
                  {selectedTags.length}/8
                </span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => handleTagToggle(tag.id)}
                    disabled={!selectedTags.includes(tag.id) && selectedTags.length >= 8}
                    className={`px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                      selectedTags.includes(tag.id)
                        ? 'bg-[#6C5CE7] text-white'
                        : 'bg-[#23283A] text-gray-300 hover:bg-[#2A2F45] hover:text-white'
                    }`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Consent Checkboxes */}
            <div className="space-y-4 mb-8">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAdult}
                  onChange={(e) => setIsAdult(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-600 text-[#6C5CE7] focus:ring-[#6C5CE7] focus:ring-2"
                />
                <span className="text-gray-300">
                  저는 <strong className="text-white">18세 이상</strong>임을 확인합니다
                </span>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-600 text-[#6C5CE7] focus:ring-[#6C5CE7] focus:ring-2"
                />
                <span className="text-gray-300">
                  <Link href="/legal/terms" className="text-[#6C5CE7] hover:underline">
                    이용약관
                  </Link>과{' '}
                  <Link href="/legal/privacy" className="text-[#6C5CE7] hover:underline">
                    개인정보처리방침
                  </Link>에 동의합니다
                </span>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={subscribeNewsletter}
                  onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-gray-600 text-[#6C5CE7] focus:ring-[#6C5CE7] focus:ring-2"
                />
                <span className="text-gray-300">
                  뉴스레터를 구독하여 최신 소식을 받아보겠습니다 (선택사항)
                </span>
              </label>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={!canSave}
              className={`w-full py-4 rounded-2xl font-bold transition-all duration-200 ${
                canSave
                  ? 'bg-gradient-to-r from-[#6C5CE7] to-[#8A63F1] hover:from-[#8A63F1] hover:to-[#6C5CE7] text-white'
                  : 'bg-[#23283A] text-gray-500 cursor-not-allowed'
              }`}
            >
              시작하기
            </button>

            {selectedTags.length < 5 && (
              <p className="text-center text-sm text-gray-400 mt-3">
                최소 5개의 태그를 선택해주세요
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}