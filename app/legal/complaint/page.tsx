'use client'

import { Layout } from '@/components/layout/layout';

export default function ComplaintPage() {
  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">Complaint Policy</h1>
          
          <div className="text-gray-300 space-y-6 leading-relaxed">
            <p>
              We take user complaints seriously and have established this policy to ensure that all concerns are addressed fairly and promptly.
            </p>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">How to File a Complaint</h2>
              <p>
                Complaints can be submitted through our contact form, email, or support ticket system. Please provide as much detail as possible about your concern, including relevant screenshots or documentation.
              </p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">Types of Complaints</h2>
              <p>
                We handle complaints regarding user conduct, content violations, technical issues, billing concerns, privacy matters, and any other issues related to our service.
              </p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">Response Timeline</h2>
              <p>
                We aim to acknowledge all complaints within 24-48 hours and provide a resolution within 5-7 business days. Complex issues may require additional time for thorough investigation.
              </p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">Follow-up</h2>
              <p>
                After resolving a complaint, we may follow up to ensure your satisfaction and to improve our services based on your feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}