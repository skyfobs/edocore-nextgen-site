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
                    <p className="text-white/90">A1 to B2 Levels</p>
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
                    <p className="text-gray-900/90">100% Online Live Interactive Classes</p>
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
                    <p className="text-white/90 leading-tight">Course Completion Certification from EDUCORE NEXTGEN</p>
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
