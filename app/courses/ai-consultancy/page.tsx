import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Consultancy Courses - EduCore Institute',
  description: 'Expert training in artificial intelligence, machine learning, and AI consultancy services.',
};

export default function AIConsultancyPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-8 text-[#003366]">
          AI Consultancy
        </h1>
        
        <div className="max-w-4xl mx-auto">
          {/* Course Overview */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#003366]">Course Overview</h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
              <p>
                The AI Consultancy program at EDUCORE NEXTGEN is designed to help students and professionals understand the rapidly growing field of Artificial Intelligence and its applications in modern businesses and industries. This course provides practical knowledge of AI tools, business automation, data-driven decision-making, and AI-powered solutions that are transforming today's digital world.
              </p>
              <p>
                Students will learn how Artificial Intelligence is used in areas such as business management, marketing, customer service, healthcare, finance, and content creation. The program focuses on real-world applications of AI, helping learners understand how to use modern AI technologies to improve productivity, efficiency, and business growth.
              </p>
              <p>
                This course is ideal for students, entrepreneurs, business professionals, and individuals who want to build a future-ready career in AI consultancy, digital transformation, and technology-based business solutions. Through practical training, live projects, and industry-oriented learning, students will gain hands-on experience with AI tools and strategies used in real business environments.
              </p>
              <p>
                At EDUCORE NEXTGEN, the course combines technical understanding with business-oriented AI applications to help learners develop both practical skills and professional confidence in the field of Artificial Intelligence.
              </p>
            </div>
          </div>

          {/* Course Highlights */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-[#003366]">Course Highlights</h2>
            <div className="space-y-8 max-w-4xl">
              {/* Duration */}
              <div className="relative flex items-center">
                <div className="bg-[#ef4444] text-white py-6 px-6 md:px-8 rounded-l-lg flex-grow relative z-10 shadow-lg flex items-center gap-4">
                  <svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-bold">Duration</h3>
                    <p className="text-white/90">3 Months / 6 Months Program</p>
                  </div>
                  <div className="absolute right-[-20px] md:right-[-30px] top-0 w-0 h-0 border-t-[44px] border-t-transparent border-b-[44px] border-b-transparent border-l-[20px] md:border-l-[30px] border-l-[#ef4444]"></div>
                </div>
                <div className="absolute left-4 bottom-[-12px] z-0">
                  <div className="w-20 h-3 bg-black/20 skew-x-[45deg] blur-sm"></div>
                  <div className="w-24 h-4 bg-[#b91c1c] absolute top-[-8px] left-0 rounded-bl-lg opacity-60"></div>
                </div>
              </div>

              {/* Level */}
              <div className="relative flex items-center">
                <div className="bg-[#3b82f6] text-white py-6 px-6 md:px-8 rounded-l-lg flex-grow relative z-10 shadow-lg flex items-center gap-4">
                  <svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-bold">Level</h3>
                    <p className="text-white/90">Beginner to Advanced</p>
                  </div>
                  <div className="absolute right-[-20px] md:right-[-30px] top-0 w-0 h-0 border-t-[44px] border-t-transparent border-b-[44px] border-b-transparent border-l-[20px] md:border-l-[30px] border-l-[#3b82f6]"></div>
                </div>
                <div className="absolute left-4 bottom-[-12px] z-0">
                  <div className="w-20 h-3 bg-black/20 skew-x-[45deg] blur-sm"></div>
                  <div className="w-24 h-4 bg-[#1d4ed8] absolute top-[-8px] left-0 rounded-bl-lg opacity-60"></div>
                </div>
              </div>

              {/* Format */}
              <div className="relative flex items-center">
                <div className="bg-[#facc15] text-gray-900 py-6 px-6 md:px-8 rounded-l-lg flex-grow relative z-10 shadow-lg flex items-center gap-4">
                  <svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-bold">Format</h3>
                    <p className="text-gray-900/90">Online Learning</p>
                  </div>
                  <div className="absolute right-[-20px] md:right-[-30px] top-0 w-0 h-0 border-t-[44px] border-t-transparent border-b-[44px] border-b-transparent border-l-[20px] md:border-l-[30px] border-l-[#facc15]"></div>
                </div>
                <div className="absolute left-4 bottom-[-12px] z-0">
                  <div className="w-20 h-3 bg-black/20 skew-x-[45deg] blur-sm"></div>
                  <div className="w-24 h-4 bg-[#eab308] absolute top-[-8px] left-0 rounded-bl-lg opacity-60"></div>
                </div>
              </div>

              {/* Certification */}
              <div className="relative flex items-center">
                <div className="bg-[#22c55e] text-white py-6 px-6 md:px-8 rounded-l-lg flex-grow relative z-10 shadow-lg flex items-center gap-4">
                  <svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-bold">Certification</h3>
                    <p className="text-white/90 leading-tight">Industry-Recognized Certification from EDUCORE NEXTGEN</p>
                  </div>
                  <div className="absolute right-[-20px] md:right-[-30px] top-0 w-0 h-0 border-t-[44px] border-t-transparent border-b-[44px] border-b-transparent border-l-[20px] md:border-l-[30px] border-l-[#22c55e]"></div>
                </div>
                <div className="absolute left-4 bottom-[-12px] z-0">
                  <div className="w-20 h-3 bg-black/20 skew-x-[45deg] blur-sm"></div>
                  <div className="w-24 h-4 bg-[#15803d] absolute top-[-8px] left-0 rounded-bl-lg opacity-60"></div>
                </div>
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
                  <span className="text-lg">Introduction to Artificial Intelligence & AI Tools</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">AI-Powered Business Automation</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">ChatGPT & Generative AI Applications</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">AI for Marketing & Content Creation</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">Data Analysis & AI-Based Decision Making</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">AI in Business Strategy & Operations</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">Practical AI Consulting Skills</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">Real-World AI Project Experience</span>
                </li>
              </ul>
            </div>
          </section>

          <div className="bg-[#003366] text-white p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Enroll?</h2>
            <p className="text-lg mb-6">Start your AI consultancy career journey today</p>
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
