'use client'

import { Layout } from '@/components/layout/layout';

export default function TermsPage() {
  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">Terms of Use</h1>
          
          <div className="text-gray-300 space-y-6 leading-relaxed">
            <p>
              Welcome to GirlfriendGPT. These Terms of Use ("Terms") govern your use of our website, mobile applications, and related services (collectively, the "Service"). By accessing or using our Service, you agree to be bound by these Terms.
            </p>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">1. Acceptance of Terms</h2>
              <p>
                By accessing and using this Service, you accept and agree to be bound by the terms and provision of this agreement. Additionally, when using this Service's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
              </p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">2. Age Requirements</h2>
              <p>
                This Service is intended for users who are 18 years of age or older. By using this Service, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into this agreement.
              </p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">3. User Conduct</h2>
              <p>
                You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service in any way that violates any applicable federal, state, local, or international law or regulation.
              </p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">4. Content Ownership</h2>
              <p>
                You retain ownership of any content you submit, post, or display on or through the Service. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, modify, publish, transmit, display and distribute such content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}