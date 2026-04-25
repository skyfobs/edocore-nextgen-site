import type { Metadata } from 'next';

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
        
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg text-center text-gray-700 leading-relaxed mb-8">
            [Add introduction about your study abroad programs here]
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-[#003366]">Available Programs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[#003366]">
                <h3 className="text-2xl font-bold mb-3 text-[#003366]">Program Name</h3>
                <p className="text-gray-700 mb-4">[Add program description]</p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Duration: [Add duration]</li>
                  <li>• Location: [Add location]</li>
                  <li>• Requirements: [Add requirements]</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[#003366]">
                <h3 className="text-2xl font-bold mb-3 text-[#003366]">Program Name</h3>
                <p className="text-gray-700 mb-4">[Add program description]</p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Duration: [Add duration]</li>
                  <li>• Location: [Add location]</li>
                  <li>• Requirements: [Add requirements]</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-[#003366]">Why Study Abroad?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold mb-2 text-[#003366]">Global Perspective</h3>
                <p className="text-gray-700">[Add content]</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-xl font-semibold mb-2 text-[#003366]">Quality Education</h3>
                <p className="text-gray-700">[Add content]</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-xl font-semibold mb-2 text-[#003366]">Career Opportunities</h3>
                <p className="text-gray-700">[Add content]</p>
              </div>
            </div>
          </section>

          <section className="bg-[#003366] text-white p-12 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-lg mb-6">
              [Add call to action text]
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-[#003366] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Apply Now
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
