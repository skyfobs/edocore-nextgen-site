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
            <h2 className="text-3xl font-bold mb-6 text-[#003366]">Course Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#003366]">
                <h3 className="text-xl font-semibold mb-2 text-[#003366]">Duration</h3>
                <p className="text-gray-700">3 Months / 6 Months Program</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#003366]">
                <h3 className="text-xl font-semibold mb-2 text-[#003366]">Level</h3>
                <p className="text-gray-700">Beginner to Advanced</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#003366]">
                <h3 className="text-xl font-semibold mb-2 text-[#003366]">Format</h3>
                <p className="text-gray-700">Online Learning</p>
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
