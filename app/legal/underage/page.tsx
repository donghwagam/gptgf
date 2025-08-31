'use client'

import { Layout } from '@/components/layout/layout';

export default function UnderagePage() {
  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">Underage Policy</h1>
          
          <div className="text-gray-300 space-y-6 leading-relaxed">
            <p>
              GirlfriendGPT is committed to protecting minors and ensuring that our platform is not accessed by users under the age of 18. This policy outlines our approach to preventing underage access and our procedures for handling violations.
            </p>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">Age Verification</h2>
              <p>
                All users must be at least 18 years of age to access our Service. By creating an account, you represent and warrant that you meet this age requirement. We may implement additional age verification measures as deemed necessary.
              </p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">Reporting Underage Users</h2>
              <p>
                If you become aware of a user who may be under 18 years of age, please report this immediately through our contact channels. We take all reports seriously and will investigate promptly.
              </p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">Account Termination</h2>
              <p>
                Any account found to belong to a user under 18 years of age will be immediately terminated. We reserve the right to request additional documentation to verify age when necessary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}