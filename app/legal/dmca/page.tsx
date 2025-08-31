'use client'

import { Layout } from '@/components/layout/layout';

export default function DMCAPage() {
  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">DMCA Policy</h1>
          
          <div className="text-gray-300 space-y-6 leading-relaxed">
            <p>
              GirlfriendGPT respects the intellectual property rights of others and expects our users to do the same. We comply with the Digital Millennium Copyright Act (DMCA) and will respond to valid copyright infringement notices.
            </p>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">Filing a DMCA Notice</h2>
              <p>
                If you believe that your copyrighted work has been copied and posted on our platform in a way that constitutes copyright infringement, please provide our designated agent with the following information:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>A physical or electronic signature of the copyright owner or authorized representative</li>
                <li>Identification of the copyrighted work claimed to have been infringed</li>
                <li>Identification of the material claimed to be infringing and information to locate the material</li>
                <li>Your contact information</li>
                <li>A statement of good faith belief that the use is not authorized</li>
                <li>A statement that the information is accurate and you are authorized to act</li>
              </ul>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">Counter-Notice</h2>
              <p>
                If you believe your content was removed in error, you may file a counter-notice with the same information requirements and additional statements regarding your good faith belief that the content was removed by mistake.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}