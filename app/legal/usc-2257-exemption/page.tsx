'use client'

import { Layout } from '@/components/layout/layout';

export default function USC2257Page() {
  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">18 U.S.C. 2257 Exemption</h1>
          
          <div className="text-gray-300 space-y-6 leading-relaxed">
            <p>
              This notice is provided in compliance with 18 U.S.C. § 2257 and 28 C.F.R. Part 75, which requires certain record-keeping and labeling requirements for producers of sexually explicit materials.
            </p>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">Exemption Statement</h2>
              <p>
                The content on this website consists of computer-generated images, text-based conversations, and artificial intelligence-generated materials. No actual persons are depicted in any sexually explicit conduct as defined by 18 U.S.C. § 2256(2)(A).
              </p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">AI-Generated Content</h2>
              <p>
                All characters, personas, and interactions on this platform are entirely artificial and created through artificial intelligence technology. No real individuals are involved in the creation of any content that might be considered sexually explicit.
              </p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">Age Verification</h2>
              <p>
                While our content is AI-generated and does not depict real persons, access to our platform is restricted to users who are 18 years of age or older in compliance with applicable laws and regulations.
              </p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">Compliance</h2>
              <p>
                We maintain strict policies to ensure that all content on our platform complies with applicable laws and regulations. Any content that violates these standards is promptly removed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}