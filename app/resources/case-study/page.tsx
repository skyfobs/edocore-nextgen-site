import type { Metadata } from 'next';
import Link from 'next/link';

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
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 h-64 md:h-auto bg-gradient-to-r from-[#003366] to-[#004488]"></div>
              <div className="p-8 md:w-2/3">
                <div className="text-sm text-gray-500 mb-2">Success Story</div>
                <h2 className="text-3xl font-bold mb-4 text-[#003366]">
                  [Case Study Title]
                </h2>
                <p className="text-gray-700 mb-4">
                  [Add case study summary here]
                </p>
                <div className="mb-4">
                  <h3 className="font-semibold text-[#003366] mb-2">Key Results:</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• [Add result]</li>
                    <li>• [Add result]</li>
                    <li>• [Add result]</li>
                  </ul>
                </div>
                <Link
                  href="#"
                  className="text-[#003366] font-semibold hover:underline inline-flex items-center"
                >
                  Read Full Case Study
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 h-64 md:h-auto bg-gradient-to-r from-[#004488] to-[#003366]"></div>
              <div className="p-8 md:w-2/3">
                <div className="text-sm text-gray-500 mb-2">Success Story</div>
                <h2 className="text-3xl font-bold mb-4 text-[#003366]">
                  [Case Study Title]
                </h2>
                <p className="text-gray-700 mb-4">
                  [Add case study summary here]
                </p>
                <div className="mb-4">
                  <h3 className="font-semibold text-[#003366] mb-2">Key Results:</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• [Add result]</li>
                    <li>• [Add result]</li>
                    <li>• [Add result]</li>
                  </ul>
                </div>
                <Link
                  href="#"
                  className="text-[#003366] font-semibold hover:underline inline-flex items-center"
                >
                  Read Full Case Study
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 h-64 md:h-auto bg-gradient-to-r from-[#002244] to-[#003366]"></div>
              <div className="p-8 md:w-2/3">
                <div className="text-sm text-gray-500 mb-2">Success Story</div>
                <h2 className="text-3xl font-bold mb-4 text-[#003366]">
                  [Case Study Title]
                </h2>
                <p className="text-gray-700 mb-4">
                  [Add case study summary here]
                </p>
                <div className="mb-4">
                  <h3 className="font-semibold text-[#003366] mb-2">Key Results:</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• [Add result]</li>
                    <li>• [Add result]</li>
                    <li>• [Add result]</li>
                  </ul>
                </div>
                <Link
                  href="#"
                  className="text-[#003366] font-semibold hover:underline inline-flex items-center"
                >
                  Read Full Case Study
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
