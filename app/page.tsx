import ImageSlider from '@/components/ImageSlider';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <ImageSlider />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#003366]">
            Welcome to EduCore Institute
          </h2>
          <p className="text-lg text-center max-w-3xl mx-auto text-gray-700 mb-8">
            We are a leading educational institute dedicated to providing high-quality courses and training programs. 
            Our mission is to empower students with the knowledge and skills needed to succeed in today's competitive world.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#003366]">
            Our Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CourseCard
              title="Finance & Management"
              description="Comprehensive courses in finance and business management"
              link="/courses/finance-management"
            />
            <CourseCard
              title="Health & Safety Training"
              description="Professional health and safety certification programs"
              link="/courses/health-safety"
            />
            <CourseCard
              title="AI Consultancy"
              description="Expert training in artificial intelligence and machine learning"
              link="/courses/ai-consultancy"
            />
            <CourseCard
              title="Cloud Consultancy"
              description="Cloud computing and infrastructure management courses"
              link="/courses/cloud-consultancy"
            />
            <CourseCard
              title="German Language"
              description="Learn German from beginner to advanced levels"
              link="/courses/german-language"
            />
            <CourseCard
              title="Multimedia"
              description="Creative multimedia design and production training"
              link="/courses/multimedia"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#003366] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of students who have transformed their careers with us
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-[#003366] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
}

function CourseCard({ title, description, link }: { title: string; description: string; link: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#003366]">
      <h3 className="text-2xl font-bold mb-3 text-[#003366]">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        href={link}
        className="text-[#003366] font-semibold hover:underline inline-flex items-center"
      >
        Learn More
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
