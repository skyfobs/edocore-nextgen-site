import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Case Studies - EduCore Institute',
  description: 'Explore success stories and case studies from our students and partners.',
};

export default function CaseStudyPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-8 text-[#003366]">
          Case Studies
        </h1>
        
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg text-center text-gray-700 leading-relaxed">
            Discover how our students and partners have achieved success through our programs.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Case Study 1: Cloud Consultancy */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 h-64 md:h-auto relative">
                <Image 
                  src="/case-studies/cloud-case-study.jpg" 
                  alt="Cloud Consultancy Case Study" 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:w-2/3">
                <div className="text-sm text-[#003366] font-semibold mb-2">✦ Success Story</div>
                <h2 className="text-3xl font-bold mb-4 text-[#003366]">
                  From IT Manager to Cloud Consultant: Ahmed's Career Transformation
                </h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Ahmed Al Rashidi spent seven years as an IT infrastructure manager in Dubai before realising that his technical skills needed a strategic edge. After completing EduCore's Cloud Consultancy programme, he transitioned into a senior cloud advisory role at a leading UAE telecoms firm — with a 40% salary increase. "The course gave me the language and frameworks to advise at board level, not just manage servers," he says. Within six months of graduating, Ahmed led a full AWS migration project for a 500-person enterprise, delivering the rollout under budget and ahead of schedule.
                </p>
                <div className="mb-4">
                  <h3 className="font-semibold text-[#003366] mb-2">Key Results</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      40% salary increase
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Senior consultant role secured
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Led full AWS enterprise migration
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Case Study 2: AI Consultancy */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 h-64 md:h-auto relative">
                <Image 
                  src="/case-studies/ai-case-study.jpg" 
                  alt="AI Consultancy Case Study" 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:w-2/3">
                <div className="text-sm text-[#003366] font-semibold mb-2">✦ Success Story</div>
                <h2 className="text-3xl font-bold mb-4 text-[#003366]">
                  How a Dubai Startup Used AI Training to Cut Operational Costs by 30%
                </h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  When Priya Menon joined a Dubai-based logistics startup as an operations lead, the company had no formal data or AI strategy. After enrolling in EduCore's AI Consultancy course, she returned with a clear roadmap — deploying a machine learning model to optimise delivery routing and a predictive analytics dashboard to manage inventory. Within eight months, the startup reduced operational costs by 30% and cut average delivery time by 22%. Priya's story is a testament to how practical AI knowledge, applied correctly, generates measurable business impact even in non-tech companies.
                </p>
                <div className="mb-4">
                  <h3 className="font-semibold text-[#003366] mb-2">Key Results</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      30% cost reduction
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      22% faster deliveries
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      ML model deployed in production
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Case Study 3: Health & Safety */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 h-64 md:h-auto relative">
                <Image 
                  src="/case-studies/health-safety-case-study.jpg" 
                  alt="Health & Safety Case Study" 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:w-2/3">
                <div className="text-sm text-[#003366] font-semibold mb-2">✦ Success Story</div>
                <h2 className="text-3xl font-bold mb-4 text-[#003366]">
                  Safety First: How a Construction Firm Reduced Incidents by 60% After Training
                </h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Al Jaber Construction enrolled twelve of its site supervisors in EduCore's Health & Safety Training programme after a series of near-miss incidents raised concerns with management. Within three months of completing the certification, all twelve supervisors had implemented updated risk assessment processes across their sites. An internal audit six months later revealed a 60% reduction in reported safety incidents and full regulatory compliance across all UAE project sites. The firm has since made EduCore's Health & Safety certification a mandatory requirement for all site-level management hires.
                </p>
                <div className="mb-4">
                  <h3 className="font-semibold text-[#003366] mb-2">Key Results</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      60% fewer safety incidents
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Full regulatory compliance
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Mandatory certification program established
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
