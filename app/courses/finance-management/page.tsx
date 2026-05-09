import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Finance & Management Courses - EduCore Institute',
  description: 'Comprehensive finance and management courses designed to enhance your business acumen and financial expertise.',
};

export default function FinanceManagementPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-8 text-[#003366]">
          Finance & Management
        </h1>
        
        <div className="max-w-4xl mx-auto">
          {/* Course Overview */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#003366]">Course Overview</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Build a strong foundation in finance, business strategy, and management skills with our industry-focused Finance & Management program. This course is designed to prepare students for careers in banking, financial services, corporate management, and entrepreneurship through practical learning and real-world case studies.
            </p>
          </div>

          {/* Course Highlights */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-[#003366]">Course Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#003366]">
                <h3 className="text-xl font-semibold mb-2 text-[#003366]">Duration</h3>
                <p className="text-gray-700">6 Months / 1 Year Program</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#003366]">
                <h3 className="text-xl font-semibold mb-2 text-[#003366]">Level</h3>
                <p className="text-gray-700">Beginner to Advanced</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#003366]">
                <h3 className="text-xl font-semibold mb-2 text-[#003366]">Format</h3>
                <p className="text-gray-700">Online & Offline Hybrid Learning</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#003366]">
                <h3 className="text-xl font-semibold mb-2 text-[#003366]">Certification</h3>
                <p className="text-gray-700">Industry-Recognized Certification from EDUCORE NEXTGEN</p>
              </div>
            </div>
          </section>

          {/* What You'll Learn */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-[#003366]">What You'll Learn</h2>
            <div className="bg-gray-50 p-8 rounded-lg">
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">Financial Management & Budgeting</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">Business Strategy & Leadership Skills</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">Accounting Fundamentals & Taxation</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">Investment & Banking Concepts</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">Communication & Corporate Skills</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">Real-World Business Case Studies</span>
                </li>
              </ul>
            </div>
          </section>

          <div className="bg-[#003366] text-white p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Enroll?</h2>
            <p className="text-lg mb-6">Start your journey in finance and management today</p>
            <Link
              href="/contact"
              className="inline-block bg-white text-[#003366] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us to Enroll
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
