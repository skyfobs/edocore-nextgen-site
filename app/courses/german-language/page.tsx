import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'German Language Courses - EduCore Institute',
  description: 'Learn German from beginner to advanced levels with certified instructors.',
};

export default function GermanLanguagePage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-8 text-[#003366]">
          German Language
        </h1>
        
        <div className="max-w-4xl mx-auto">
          {/* Course Overview */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#003366]">Course Overview</h2>
            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
              <p>
                The Online German Language Training program at EDUCORE NEXTGEN is designed to help students and professionals develop strong German communication skills through flexible and interactive online learning. This course focuses on improving speaking, listening, reading, and writing skills while building confidence in real-life communication situations.
              </p>
              <p>
                The program is suitable for students, working professionals, and individuals planning for higher education, career opportunities, or migration to German-speaking countries. The course follows a structured learning approach that helps learners understand German grammar, vocabulary, pronunciation, and sentence formation from beginner to advanced levels.
              </p>
              <p>
                Through live online classes, interactive sessions, practical exercises, and personalized guidance, students will receive a complete online learning experience from the comfort of their homes. The training is designed to make language learning simple, engaging, and career-oriented while preparing students for internationally recognized German language proficiency exams.
              </p>
              <p>
                At EDUCORE NEXTGEN, the course combines modern teaching methods with practical communication training to help learners achieve fluency and confidence in the German language.
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
                <p className="text-gray-700">A1 to B2 Levels</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#003366]">
                <h3 className="text-xl font-semibold mb-2 text-[#003366]">Format</h3>
                <p className="text-gray-700">100% Online Live Interactive Classes</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#003366]">
                <h3 className="text-xl font-semibold mb-2 text-[#003366]">Certification</h3>
                <p className="text-gray-700">Course Completion Certification from EDUCORE NEXTGEN</p>
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
                  <span className="text-lg">German Speaking & Communication Skills</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">German Grammar & Sentence Formation</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">Vocabulary Building & Pronunciation</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">Reading, Writing & Listening Practice</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">Real-Life Conversation Training</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">Exam Preparation for German Proficiency Tests</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">Interview & Study Abroad Communication Skills</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">Confidence Building Through Interactive Sessions</span>
                </li>
              </ul>
            </div>
          </section>

          <div className="bg-[#003366] text-white p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Enroll?</h2>
            <p className="text-lg mb-6">Start your German language learning journey today</p>
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
