'use client'

import { Layout } from '@/components/layout/layout';
import Link from 'next/link';

const legalSections = [
  { name: 'Community Guidelines', path: '/legal/guidelines' },
  { name: 'Terms of Use', path: '/legal/terms' },
  { name: 'Privacy Policy', path: '/legal/privacy' },
  { name: 'Underage Policy', path: '/legal/underage' },
  { name: 'Content Removal Policy', path: '/legal/content-removal' },
  { name: 'Blocked Content Policy', path: '/legal/blocked-content' },
  { name: 'DMCA Policy', path: '/legal/dmca' },
  { name: 'Complaint Policy', path: '/legal/complaint' },
  { name: '18 U.S.C. 2257 Exemption', path: '/legal/usc-2257-exemption' }
];

export default function LegalPage() {
  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-white">Legal Information</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {legalSections.map((section, index) => (
              <Link 
                key={index}
                href={section.path}
                className="bg-zinc-800 hover:bg-zinc-700 transition-colors duration-200 
                          text-white font-medium py-6 px-6 rounded-lg text-center
                          border border-zinc-700 hover:border-zinc-600 block"
              >
                {section.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}