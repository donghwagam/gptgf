'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ 
  title, 
  description, 
  actionLabel, 
  actionHref,
  icon 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8">
      <div className="w-24 h-24 bg-[#23283A] rounded-2xl flex items-center justify-center mb-6">
        {icon || <Plus className="w-8 h-8 text-gray-400" />}
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-3">
        {title}
      </h3>
      
      <p className="text-gray-400 text-center max-w-md mb-8 leading-relaxed">
        {description}
      </p>
      
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="px-6 py-3 bg-gradient-to-r from-[#6C5CE7] to-[#8A63F1] hover:from-[#8A63F1] hover:to-[#6C5CE7] text-white font-bold rounded-2xl transition-all duration-200 transform hover:scale-105"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}