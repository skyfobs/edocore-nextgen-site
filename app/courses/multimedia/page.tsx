import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Multimedia Courses - EduCore Institute',
  description: 'Creative multimedia design and production training courses.',
};

export default function MultimediaPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-8 text-[#003366]">
          Multimedia
        </h1>
        
        <div className="max-w-4xl mx-auto">
          {/* Course Overview */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#003366]">Overview</h2>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Professional Multimedia Design & Production Training</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Develop hands-on expertise across the full multimedia spectrum — from graphic design and video production to audio engineering and interactive digital content. This course equips you with both creative and technical skills demanded by today's media-driven industries.
            </p>
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
                    <p className="text-white/90">10 Weeks</p>
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
                    <p className="text-white/90">Beginner – Intermediate</p>
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
                    <p className="text-gray-900/90">Live + Self-paced</p>
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
                  <span className="text-lg">Core principles of visual design and typography</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">Photo editing and retouching with Adobe Photoshop</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">Vector graphics and illustration with Adobe Illustrator</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">Video shooting, editing and colour grading techniques</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">Audio recording, mixing and sound design fundamentals</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">Motion graphics and 2D animation with After Effects</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">Interactive media and web content production</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg">Publishing and delivering multimedia across platforms</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Course Curriculum */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-[#003366]">Course Curriculum</h2>
            <div className="space-y-6">
              {/* Module 1 */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#003366] text-white rounded-full flex items-center justify-center text-xl font-bold">
                      01
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#003366] mb-2">Foundations of Multimedia & Visual Communication</h3>
                    <p className="text-gray-700 mb-3">
                      Introduction to multimedia elements — text, image, audio, video, and animation. Core design principles: colour theory, composition, and visual hierarchy.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="font-semibold">Week 1</span>
                      <span>•</span>
                      <span>4 lessons</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Module 2 */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#003366] text-white rounded-full flex items-center justify-center text-xl font-bold">
                      02
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#003366] mb-2">Graphic Design & Image Editing</h3>
                    <p className="text-gray-700 mb-3">
                      Working with raster and vector graphics. Photo manipulation, retouching, and compositing in Photoshop. Logo and brand identity design in Illustrator.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="font-semibold">Weeks 2–3</span>
                      <span>•</span>
                      <span>7 lessons</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Module 3 */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#003366] text-white rounded-full flex items-center justify-center text-xl font-bold">
                      03
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#003366] mb-2">Video Production & Editing</h3>
                    <p className="text-gray-700 mb-3">
                      Camera fundamentals, storyboarding, and shooting techniques. Non-linear editing workflows in Premiere Pro, colour grading, and export for multiple platforms.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="font-semibold">Weeks 4–5</span>
                      <span>•</span>
                      <span>8 lessons</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Module 4 */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#003366] text-white rounded-full flex items-center justify-center text-xl font-bold">
                      04
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#003366] mb-2">Audio Production & Sound Design</h3>
                    <p className="text-gray-700 mb-3">
                      Microphone techniques, recording environments, and DAW workflows. Mixing, EQ, compression, and creating soundscapes for video and interactive media.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="font-semibold">Week 6</span>
                      <span>•</span>
                      <span>5 lessons</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Module 5 */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#003366] text-white rounded-full flex items-center justify-center text-xl font-bold">
                      05
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#003366] mb-2">Motion Graphics & 2D Animation</h3>
                    <p className="text-gray-700 mb-3">
                      Keyframe animation, easing, and timing principles. Building motion graphics templates, lower thirds, and animated infographics in After Effects.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="font-semibold">Weeks 7–8</span>
                      <span>•</span>
                      <span>6 lessons</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Module 6 */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#003366] text-white rounded-full flex items-center justify-center text-xl font-bold">
                      06
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#003366] mb-2">Interactive Media & Web Content</h3>
                    <p className="text-gray-700 mb-3">
                      Designing for digital screens and web. Introduction to UI/UX principles, interactive presentations, and producing multimedia content for social and web platforms.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="font-semibold">Week 9</span>
                      <span>•</span>
                      <span>4 lessons</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Module 7 */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#003366] text-white rounded-full flex items-center justify-center text-xl font-bold">
                      07
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#003366] mb-2">Portfolio Development & Industry Readiness</h3>
                    <p className="text-gray-700 mb-3">
                      Assembling a professional multimedia portfolio. Freelancing vs in-house roles, client briefs, file delivery standards, and presenting your work effectively.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="font-semibold">Week 10</span>
                      <span>•</span>
                      <span>4 lessons</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="bg-[#003366] text-white p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Enroll?</h2>
            <p className="text-lg mb-6">Start your multimedia design and production career journey today</p>
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
