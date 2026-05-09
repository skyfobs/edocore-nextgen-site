import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us - EduCore NextGen Institute',
  description: 'Learn about EduCore NextGen Institute, our mission, vision, and commitment to providing world-class professional training programs.',
};

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-[#003366]">
            Empowering Careers Through World-Class Professional Training
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Founded in Dubai and built for a global audience, EduCore NextGen Institute is where ambition meets structured learning. We deliver practical, industry-focused training programmes that equip professionals and students with the skills to thrive in today's rapidly evolving world.
          </p>
        </div>

        {/* Stats Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-[#003366] mb-2">3,000+</div>
              <div className="text-gray-600 font-medium">Enrolled Students</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#003366] mb-2">2,800+</div>
              <div className="text-gray-600 font-medium">Passed Graduates</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#003366] mb-2">70+</div>
              <div className="text-gray-600 font-medium">Courses Offered</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#003366] mb-2">9+</div>
              <div className="text-gray-600 font-medium">Academic Partners</div>
            </div>
          </div>
        </div>

        {/* Who We Are */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-4xl font-bold mb-6 text-[#003366] text-center">Who We Are</h2>
          <p className="text-2xl font-semibold text-center mb-6 text-[#003366]">
            An Intellectual Destination for Global Learners
          </p>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              EduCore NextGen Institute is an internationally minded educational institution established to provide practical, real-world education and entrepreneurial development. Based in the heart of Business Bay, Dubai, we draw learners from across the UAE and beyond — united by a shared commitment to professional growth and lifelong learning.
            </p>
            <p>
              We are consciously focused on building on our strengths and consolidating our achievements. Our faculty comprises world-renowned experts, our curriculum is continuously reviewed by a dedicated academic board, and our learning environment blends cutting-edge technology with a deeply human approach to teaching. From Finance and AI Consultancy to Health & Safety, Cloud Consultancy, German Language, and Multimedia — every programme at EduCore is designed to open doors and deliver measurable career outcomes.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#003366]">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4 text-[#003366]">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To provide accessible, industry-relevant education and professional training that empowers individuals to advance their careers, lead with confidence, and contribute meaningfully to their organisations and communities — wherever in the world they are.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#003366]">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold mb-4 text-[#003366]">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To become the most trusted professional training institute in the MENA region — recognised for the quality of our graduates, the depth of our academic partnerships, and our unwavering commitment to practical, transformative education.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-4xl font-bold mb-4 text-[#003366] text-center">Why Choose Us</h2>
          <p className="text-xl text-center text-gray-600 mb-12">What Sets EduCore Apart</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-3 text-[#003366]">Expert Instructors</h3>
              <p className="text-gray-700 leading-relaxed">
                Every course is delivered by practitioners with real-world industry experience — not just academics. Our faculty brings live case studies, current tools, and professional networks directly into the classroom.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-3 text-[#003366]">Industry-Relevant Curriculum</h3>
              <p className="text-gray-700 leading-relaxed">
                Our programmes are regularly reviewed by an independent academic board and aligned with employer expectations. We teach skills that are in demand today — and prepare you for what's coming tomorrow.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-3 text-[#003366]">Flexible Learning</h3>
              <p className="text-gray-700 leading-relaxed">
                Whether you prefer live instructor-led sessions or self-paced study, EduCore offers formats that fit around your life. Our integrated IT platform supports seamless learning online and in-person.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-3 text-[#003366]">Career Support</h3>
              <p className="text-gray-700 leading-relaxed">
                From CV workshops and mock interviews to our active alumni network and study abroad partnerships, EduCore is invested in your success far beyond the final exam — from enrolment to employment.
              </p>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-4xl font-bold mb-4 text-[#003366] text-center">Our Values</h2>
          <p className="text-xl text-center text-gray-600 mb-12">The Principles We Work By</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border-l-4 border-[#003366] shadow-sm">
              <h3 className="text-xl font-bold mb-2 text-[#003366]">Excellence in Everything</h3>
              <p className="text-gray-700">
                We hold ourselves to the highest academic and professional standards. Every course, every interaction, and every graduate reflects our commitment to quality.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border-l-4 border-[#003366] shadow-sm">
              <h3 className="text-xl font-bold mb-2 text-[#003366]">Practical Over Theoretical</h3>
              <p className="text-gray-700">
                Education should create real-world impact. We design our programmes around hands-on projects, live simulations, and industry scenarios — not just textbooks.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border-l-4 border-[#003366] shadow-sm">
              <h3 className="text-xl font-bold mb-2 text-[#003366]">Inclusive & Global</h3>
              <p className="text-gray-700">
                We welcome learners from all backgrounds, nationalities, and career stages. Our diverse community is one of our greatest strengths and a reflection of the world our students go on to lead in.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border-l-4 border-[#003366] shadow-sm">
              <h3 className="text-xl font-bold mb-2 text-[#003366]">Continuous Improvement</h3>
              <p className="text-gray-700">
                We never stop learning — about our students, our industry, and ourselves. Regular programme reviews, student feedback loops, and faculty development keep EduCore ahead of the curve.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-[#003366] to-[#004488] text-white p-12 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Take the Next Step in Your Career?</h2>
          <p className="text-lg mb-8">
            Join thousands of students who have transformed their professional lives through EduCore's training programmes. Explore our courses or get in touch with our team today.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-[#003366] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Contact Us Today →
          </Link>
        </div>
      </div>
    </div>
  );
}
