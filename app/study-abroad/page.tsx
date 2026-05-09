import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Study Abroad Programs - EduCore Institute',
  description: 'Explore international study opportunities and study abroad programs offered by EduCore Institute.',
};

export default function StudyAbroadPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-8 text-[#003366]">
          Study Abroad Programs
        </h1>
        
        {/* Overview Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[#003366] text-center">Overview</h2>
          <div className="text-lg text-gray-700 leading-relaxed space-y-4">
            <p>
              EDUCORE NEXTGEN provides complete study abroad guidance for students who wish to pursue higher education and global career opportunities in leading international destinations. Our expert team supports students throughout the entire process, including career guidance, course selection, university applications, admission support, documentation, visa assistance, and pre-departure preparation.
            </p>
            <p>
              We help students choose the right country, university, and career pathway based on their academic background, interests, and future goals. With personalized guidance and professional support, EDUCORE NEXTGEN aims to make the study abroad journey simple, transparent, and successful.
            </p>
            <p className="font-semibold text-[#003366]">
              We currently provide study abroad assistance for the following destinations:
            </p>
          </div>
        </div>

        {/* Country Images Row */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Germany Image */}
            <div>
              <div className="relative h-48 rounded-lg overflow-hidden shadow-lg border-2 border-[#003366]">
                <Image 
                  src="/countries/germany.jpg" 
                  alt="Germany" 
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <p className="text-center mt-3 font-semibold text-[#003366] text-lg">Germany</p>
            </div>

            {/* UK Image */}
            <div>
              <div className="relative h-48 rounded-lg overflow-hidden shadow-lg border-2 border-[#003366]">
                <Image 
                  src="/countries/uk.jpg" 
                  alt="United Kingdom" 
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <p className="text-center mt-3 font-semibold text-[#003366] text-lg">United Kingdom</p>
            </div>

            {/* Australia Image */}
            <div>
              <div className="relative h-48 rounded-lg overflow-hidden shadow-lg border-2 border-[#003366]">
                <Image 
                  src="/countries/australia.jpg" 
                  alt="Australia" 
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <p className="text-center mt-3 font-semibold text-[#003366] text-lg">Australia</p>
            </div>

            {/* Austria Image */}
            <div>
              <div className="relative h-48 rounded-lg overflow-hidden shadow-lg border-2 border-[#003366]">
                <Image 
                  src="/countries/austria.jpg" 
                  alt="Austria" 
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <p className="text-center mt-3 font-semibold text-[#003366] text-lg">Austria</p>
            </div>
          </div>
        </div>

        {/* Countries Section */}
        <div className="max-w-6xl mx-auto">
          <section className="mb-12">
            <h2 className="text-4xl font-bold mb-10 text-[#003366] text-center">Study Destinations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Germany */}
              <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#003366] hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-3">🇩🇪</div>
                  <h3 className="text-3xl font-bold text-[#003366]">Germany</h3>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Germany is one of the most preferred destinations for international students due to its world-class education system, affordable tuition fees, strong economy, and excellent career opportunities. Students can access high-quality education, research opportunities, and globally recognized degrees while experiencing a rich cultural environment.
                </p>
                <h4 className="font-semibold text-[#003366] mb-3 text-lg">Opportunities in Germany</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Public & Private Universities
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Affordable Education Options
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Strong Job Market & Career Growth
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Opportunities in Engineering, IT, Healthcare & Management
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Post-Study Work Opportunities
                  </li>
                </ul>
              </div>

              {/* United Kingdom */}
              <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#003366] hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-3">🇬🇧</div>
                  <h3 className="text-3xl font-bold text-[#003366]">United Kingdom</h3>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  The UK is home to some of the world's top-ranked universities and offers globally recognized qualifications with excellent academic standards. Students benefit from diverse cultural experiences, modern learning environments, and strong career opportunities across various industries.
                </p>
                <h4 className="font-semibold text-[#003366] mb-3 text-lg">Opportunities in the UK</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Internationally Recognized Degrees
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Shorter Course Duration
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Strong Career & Internship Opportunities
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    High-Quality Education System
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Multicultural Student Environment
                  </li>
                </ul>
              </div>

              {/* Australia */}
              <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#003366] hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-3">🇦🇺</div>
                  <h3 className="text-3xl font-bold text-[#003366]">Australia</h3>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Australia is known for its globally respected universities, student-friendly environment, and excellent quality of life. The country offers strong academic programs, practical learning opportunities, and attractive post-study work options for international students.
                </p>
                <h4 className="font-semibold text-[#003366] mb-3 text-lg">Opportunities in Australia</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Globally Ranked Universities
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Work While Studying Opportunities
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Post-Study Work Visa Benefits
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Practical & Industry-Focused Learning
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Safe & Student-Friendly Environment
                  </li>
                </ul>
              </div>

              {/* Austria */}
              <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#003366] hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-3">🇦🇹</div>
                  <h3 className="text-3xl font-bold text-[#003366]">Austria</h3>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Austria offers high-quality education, affordable tuition fees, and a peaceful European lifestyle for international students. The country is gaining popularity among students seeking academic excellence and career opportunities in Europe.
                </p>
                <h4 className="font-semibold text-[#003366] mb-3 text-lg">Opportunities in Austria</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Affordable Education & Living Costs
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    High Academic Standards
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    European Career Exposure
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Safe & Peaceful Environment
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#003366] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Opportunities for International Students
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Our Services Section */}
          <section className="mb-16 bg-gray-50 p-10 rounded-lg">
            <h2 className="text-4xl font-bold mb-8 text-[#003366] text-center">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 text-lg">Career & Course Counseling</span>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 text-lg">University Selection Assistance</span>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 text-lg">Admission & Documentation Support</span>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 text-lg">Visa Processing Guidance</span>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 text-lg">German & English Language Training</span>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 text-lg">Interview & Pre-Departure Support</span>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 text-lg">Accommodation Assistance</span>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-[#003366] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 text-lg">Complete Student Support Services</span>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-[#003366] text-white p-12 rounded-lg text-center">
            <h2 className="text-4xl font-bold mb-4">Start Your Global Education Journey</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Take the first step toward your international education and career goals with EDUCORE NEXTGEN. Our dedicated team is here to guide you at every stage of your study abroad journey.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-[#003366] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Get Started Today
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
