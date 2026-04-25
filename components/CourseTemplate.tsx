import Link from 'next/link';

interface CourseTemplateProps {
  title: string;
  description: string;
}

export default function CourseTemplate({ title, description }: CourseTemplateProps) {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-8 text-[#003366]">
          {title}
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {description}
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-[#003366]">Course Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-[#003366]">Duration</h3>
                <p className="text-gray-700">[Add duration]</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-[#003366]">Level</h3>
                <p className="text-gray-700">[Add level]</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-[#003366]">Format</h3>
                <p className="text-gray-700">[Add format]</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-[#003366]">Certification</h3>
                <p className="text-gray-700">[Add certification info]</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-[#003366]">What You'll Learn</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-[#003366] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                [Add learning outcome]
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-[#003366] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                [Add learning outcome]
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-[#003366] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                [Add learning outcome]
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-[#003366]">Course Curriculum</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-[#003366] pl-4 py-2">
                <h3 className="text-xl font-semibold text-[#003366]">Module 1: [Module Name]</h3>
                <p className="text-gray-700">[Add module description]</p>
              </div>
              <div className="border-l-4 border-[#003366] pl-4 py-2">
                <h3 className="text-xl font-semibold text-[#003366]">Module 2: [Module Name]</h3>
                <p className="text-gray-700">[Add module description]</p>
              </div>
              <div className="border-l-4 border-[#003366] pl-4 py-2">
                <h3 className="text-xl font-semibold text-[#003366]">Module 3: [Module Name]</h3>
                <p className="text-gray-700">[Add module description]</p>
              </div>
            </div>
          </section>

          <div className="bg-[#003366] text-white p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Enroll?</h2>
            <p className="text-lg mb-6">Start your learning journey today</p>
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
