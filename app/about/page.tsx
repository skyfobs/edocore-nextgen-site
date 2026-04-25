import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - EduCore Institute',
  description: 'Learn about EduCore Institute, our mission, vision, and commitment to providing quality education and training programs.',
};

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-8 text-[#003366]">
          About Us
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#003366]">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              [Add your mission statement here]
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#003366]">Our Vision</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              [Add your vision statement here]
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#003366]">Who We Are</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              [Add information about your institute here]
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#003366]">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-[#003366]">Expert Instructors</h3>
                <p className="text-gray-700">[Add content here]</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-[#003366]">Industry-Relevant Curriculum</h3>
                <p className="text-gray-700">[Add content here]</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-[#003366]">Flexible Learning</h3>
                <p className="text-gray-700">[Add content here]</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-[#003366]">Career Support</h3>
                <p className="text-gray-700">[Add content here]</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
