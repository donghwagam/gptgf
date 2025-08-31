'use client'

import { Layout } from '@/components/layout/layout';

export default function BlockedContentPage() {
  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">Blocked Content Policy</h1>
          
          <div className="text-gray-300 space-y-6 leading-relaxed">
            <p>
              This policy describes the types of content that are prohibited on our platform and the measures we take to prevent such content from being shared.
            </p>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">Prohibited Content</h2>
              <p>
                We prohibit content that includes but is not limited to: illegal activities, non-consensual content, content involving minors, extreme violence, terrorism, harassment, hate speech, and content that violates intellectual property rights.
              </p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">Content Filtering</h2>
              <p>
                We employ both automated systems and human moderators to detect and remove prohibited content. Our systems are continuously updated to improve detection capabilities.
              </p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">User Responsibilities</h2>
              <p>
                Users are responsible for ensuring that all content they share complies with our policies and applicable laws. Repeated violations may result in account suspension or termination.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}