'use client'

import { Layout } from '@/components/layout/layout';

export default function ContentRemovalPage() {
  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">Content Removal Policy</h1>
          
          <div className="text-gray-300 space-y-6 leading-relaxed">
            <p>
              This policy outlines the circumstances under which content may be removed from our platform and the procedures for requesting content removal.
            </p>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">Grounds for Removal</h2>
              <p>
                Content may be removed if it violates our Community Guidelines, Terms of Use, or applicable laws. This includes but is not limited to illegal content, harassment, hate speech, or content that infringes on intellectual property rights.
              </p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">Reporting Content</h2>
              <p>
                Users can report content they believe violates our policies through our reporting system. All reports are reviewed by our moderation team and appropriate action is taken based on our guidelines.
              </p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">Appeal Process</h2>
              <p>
                If your content has been removed and you believe this was done in error, you may appeal the decision through our support channels. We will review all appeals fairly and promptly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}