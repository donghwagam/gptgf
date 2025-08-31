'use client'

import { Layout } from '@/components/layout/layout';

export default function PrivacyPage() {
  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">Privacy Policy</h1>
          
          <div className="text-gray-300 space-y-6 leading-relaxed">
            <p>
              This Privacy Policy describes how GirlfriendGPT ("we," "our," or "us") collects, uses, and shares your personal information when you use our Service.
            </p>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you create an account, use our services, or contact us. This may include your email address, username, and any content you create or share through our Service.
              </p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">How We Use Your Information</h2>
              <p>
                We use the information we collect to provide, maintain, and improve our Service, process transactions, send you technical notices and support messages, and communicate with you about products, services, and promotional offers.
              </p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this Privacy Policy. We may share your information in certain limited circumstances, such as to comply with legal obligations or protect our rights.
              </p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}