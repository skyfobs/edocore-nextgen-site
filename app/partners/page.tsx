import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Our Partners - EduCore NextGen Institute',
  description: 'Discover our trusted academic and training partners who help us deliver world-class education and expand student opportunities globally.',
};

export default function PartnersPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-[#003366]">
            Our Partners
          </h1>
          <p className="text-2xl font-semibold text-gray-800 mb-4">
            Stronger Together — Partnerships That Expand Your Opportunities
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            At EduCore NextGen Institute, we believe great education is built on great partnerships. We work closely with trusted academic institutions, language academies, and professional training bodies around the world to give our students access to broader learning pathways, internationally recognised certifications, and real-world opportunities that go beyond the classroom.
          </p>
        </div>

        {/* Why We Partner */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-gradient-to-r from-[#003366] to-[#004488] text-white p-10 rounded-xl shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Why We Partner</h2>
            <p className="text-xl font-semibold mb-3">Building Bridges Between Learning and Opportunity</p>
            <p className="text-lg leading-relaxed">
              Every partnership we form is carefully selected to complement our course offerings and serve the long-term goals of our students. Our partners share our commitment to quality education, practical skill development, and student success. Together, we create pathways that connect learners in Dubai and across the MENA region to global academic and career opportunities.
            </p>
          </div>
        </div>

        {/* Featured Partner - German Cafe Academy */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#003366] mb-2">Featured Partner</h2>
          </div>

          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-t-4 border-[#003366]">
            {/* Partner Header */}
            <div className="bg-gradient-to-r from-gray-50 to-white p-8 md:p-12 border-b-2 border-gray-100">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Partner Logo */}
                <div className="relative w-40 h-40 md:w-48 md:h-48 flex-shrink-0">
                  <Image 
                    src="/partners/german-cafe-academy-logo.png" 
                    alt="German Cafe Academy Logo" 
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="text-center md:text-left flex-grow">
                  <h3 className="text-4xl font-bold text-[#003366] mb-2">German Cafe Academy</h3>
                  <p className="text-xl text-gray-700 font-semibold mb-3">Official Language Training Partner of EduCore NextGen Institute</p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <span className="bg-[#003366] text-white px-4 py-2 rounded-full text-sm font-semibold">German Language</span>
                    <span className="bg-[#22c55e] text-white px-4 py-2 rounded-full text-sm font-semibold">Certified Training</span>
                    <span className="bg-[#3b82f6] text-white px-4 py-2 rounded-full text-sm font-semibold">Live & Online Classes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Partner Description */}
            <div className="p-8 md:p-12">
              <div className="prose max-w-none mb-10">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  German Cafe Academy is a specialist German language training institution known for its immersive, communicative approach to language learning. Their methodology blends structured grammar instruction with real-life conversational practice — creating a relaxed yet highly effective learning environment that helps students progress quickly and confidently through CEFR levels from A1 to B2 and beyond.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  With a team of experienced, native-level German instructors and a curriculum tailored for working professionals, students, and career-changers alike, German Cafe Academy brings warmth and rigour to every lesson. Their approach makes German not just a language to learn — but a culture to understand and a career gateway to step through.
                </p>
              </div>

              {/* Course Levels */}
              <div className="mb-10">
                <h4 className="text-2xl font-bold text-[#003366] mb-6">Course Levels Covered</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center border-l-4 border-[#ef4444]">
                    <div className="text-3xl font-bold text-[#003366] mb-1">A1</div>
                    <div className="text-sm text-gray-600">Beginner</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center border-l-4 border-[#3b82f6]">
                    <div className="text-3xl font-bold text-[#003366] mb-1">A2</div>
                    <div className="text-sm text-gray-600">Elementary</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center border-l-4 border-[#facc15]">
                    <div className="text-3xl font-bold text-[#003366] mb-1">B1</div>
                    <div className="text-sm text-gray-600">Intermediate</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center border-l-4 border-[#22c55e]">
                    <div className="text-3xl font-bold text-[#003366] mb-1">B2</div>
                    <div className="text-sm text-gray-600">Upper Intermediate</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center border-l-4 border-[#8b5cf6]">
                    <div className="text-3xl font-bold text-[#003366] mb-1">📝</div>
                    <div className="text-sm text-gray-600">Exam Preparation</div>
                  </div>
                </div>
              </div>

              {/* What This Partnership Means */}
              <div>
                <h4 className="text-2xl font-bold text-[#003366] mb-6">What This Partnership Means for You</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg border-l-4 border-[#3b82f6]">
                    <div className="text-3xl mb-3">🎓</div>
                    <h5 className="text-lg font-bold text-[#003366] mb-2">Internationally Recognised Certification</h5>
                    <p className="text-gray-700">
                      Students completing EduCore's German Language programme gain access to globally accepted language certifications through German Cafe Academy's exam pathways.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-lg border-l-4 border-[#22c55e]">
                    <div className="text-3xl mb-3">👨‍🏫</div>
                    <h5 className="text-lg font-bold text-[#003366] mb-2">Expert Native-Level Instructors</h5>
                    <p className="text-gray-700">
                      EduCore students benefit from German Cafe Academy's team of highly qualified instructors, bringing authentic language expertise directly to the learning experience.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-lg border-l-4 border-[#8b5cf6]">
                    <div className="text-3xl mb-3">🌍</div>
                    <h5 className="text-lg font-bold text-[#003366] mb-2">Pathway to Study & Work in Germany</h5>
                    <p className="text-gray-700">
                      Language certification through this partnership supports applications for Ausbildung programmes, work visas, and higher education opportunities in Germany, Austria, and Switzerland.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-white p-6 rounded-lg border-l-4 border-[#facc15]">
                    <div className="text-3xl mb-3">📱</div>
                    <h5 className="text-lg font-bold text-[#003366] mb-2">Flexible Learning Formats</h5>
                    <p className="text-gray-700">
                      Classes are available in live in-person and online formats, making the combined EduCore and German Cafe Academy experience accessible to learners regardless of schedule or location.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Become a Partner CTA */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-[#003366] to-[#004488] text-white p-10 md:p-12 rounded-xl shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Become an EduCore Partner</h2>
              <p className="text-lg leading-relaxed max-w-3xl mx-auto">
                Are you an academic institution, training provider, or professional organisation looking to collaborate? We are always open to partnerships that create meaningful value for our students and expand the reach of quality education.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center gap-3 bg-white/10 p-4 rounded-lg">
                <div className="text-2xl">🤝</div>
                <div className="text-white font-semibold">Joint course development</div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-4 rounded-lg">
                <div className="text-2xl">📜</div>
                <div className="text-white font-semibold">Co-branded certification</div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-4 rounded-lg">
                <div className="text-2xl">✈️</div>
                <div className="text-white font-semibold">Study abroad pathways</div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-4 rounded-lg">
                <div className="text-2xl">💼</div>
                <div className="text-white font-semibold">Corporate training programmes</div>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/contact"
                className="inline-block bg-white text-[#003366] px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Get in Touch →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
