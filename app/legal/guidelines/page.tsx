'use client'

import { Layout } from '@/components/layout/layout';

export default function GuidelinesPage() {
  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-white">Community Guidelines</h1>
          
          <div className="text-gray-300 space-y-6 leading-relaxed">
            <p>
              Our community guidelines are pivotal in ensuring a positive experience for our members. Kindly adhere to these guidelines, all pertinent laws, the GirlfriendGPT Terms of Use, the GirlfriendGPT Privacy Policy, and all visible regulations when utilizing the GirlfriendGPT Service. Should we be informed or recognize a possible guideline infringement, we hold the discretion to assess and impose measures, which might include restricting or discontinuing a user's entry to the community or app, or as otherwise detailed in these guidelines. For an in-depth understanding, refer to our Terms of Use.
            </p>
            
            <p>
              We reserve the right to update these guidelines; hence, periodic revisits are encouraged. GirlfriendGPT is accessible solely to users aged 18 and above.
            </p>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">Illegal Activities.</h2>
              <p>
                Refrain from employing the GirlfriendGPT Service for any unlawful pursuits, including but not limited to commercial sexual actions, trafficking, explicit content, or the endorsement of hazardous or illegal endeavors.
              </p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">Malicious Use.</h2>
              <p>
                It's forbidden to send viruses, malware, or any malevolent or damaging software. Distributing content that jeopardizes or impedes the GirlfriendGPT Service's functionality is strictly prohibited.
              </p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-white">Hate Speech.</h2>
              <p>
                Avoid publishing or disseminating materials that incite animosity or aggression against groups based on aspects like their ethnicity, nationality, religious beliefs, disabilities, gender, age, veteran status, sexual preference, or gender identification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}