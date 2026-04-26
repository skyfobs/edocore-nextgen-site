import ImageSlider from '@/components/ImageSlider';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <ImageSlider />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#003366]">
            Welcome to EduCore Institute
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Educore NextGen institute, is an intellectual destination that draws learners from all over the world. 
                Established to provide practical, real-world education and entrepreneurial development — we are consciously 
                focusing our efforts on building on our strengths and consolidating our achievements.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                From academic discoveries to athletic records, from artistic creations to scientific breakthroughs, 
                our students define our success in every way.
              </p>
              
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Regular evaluations of all programs by a dedicated academic board</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Integrated IT support for effective online and offline learning</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>A dedicated Research Committee to promote research culture in the institution</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>World-renowned and acclaimed faculties for each program to instil knowledge and multi-culture prominence in our students</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Toastmasters club activities to strengthen communication and leadership skills</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Professional Skills Development Programs starting from Freshman to the Senior levels to hone student skills in communication, analysis, and leadership</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Teaching effectiveness committee to improve learning & teaching</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#003366] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Community services committee for opportunities to serve the community through various activities</span>
                </li>
              </ul>
            </div>
            
            <div className="relative h-[600px] bg-gray-200 rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="/welcome-image.jpg" 
                alt="EduCore Institute" 
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Section Header */}
          <h2 className="text-4xl font-bold text-center mb-12 text-[#003366]">
            Our Courses
          </h2>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CourseCard
              title="Finance & Management"
              description="Master strategic leadership and financial analytical tools for modern corporate environments."
              link="/courses/finance-management"
              category="Professional"
              image="/course-finance.jpg"
            />
            <CourseCard
              title="Health & Safety Training"
              description="Comprehensive certification for workplace safety standards and risk assessment management."
              link="/courses/health-safety"
              category="Compliance"
              image="/course-health.jpg"
            />
            <CourseCard
              title="AI Consultancy"
              description="Leverage machine learning and artificial intelligence to transform business operations and insights."
              link="/courses/ai-consultancy"
              category="Technology"
              image="/course-ai.jpg"
            />
            <CourseCard
              title="Cloud Consultancy"
              description="Architecting scalable and secure cloud infrastructure for modern enterprise agility."
              link="/courses/cloud-consultancy"
              category="Enterprise"
              image="/course-cloud.jpg"
            />
            <CourseCard
              title="German Language"
              description="Accelerated language immersion program focusing on business proficiency and cultural fluency."
              link="/courses/german-language"
              category="Linguistics"
              image="/course-german.jpg"
            />
            <CourseCard
              title="Multimedia"
              description="Advanced digital design, video production, and interactive storytelling for the modern web."
              link="/courses/multimedia"
              category="Creative"
              image="/course-multimedia.jpg"
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

function CourseCard({ title, description, link, category, image }: { title: string; description: string; link: string; category: string; image: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl group">
      <div className="h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={400}
          height={192}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
      </div>
      <div className="p-6">
        <span className="inline-block bg-[#88b4ff]/10 text-[#014488] text-xs font-medium px-2 py-1 rounded mb-3">
          {category}
        </span>
        <h3 className="text-2xl font-semibold text-[#001e40] mb-2">{title}</h3>
        <p className="text-gray-600 text-base mb-6 line-clamp-2">{description}</p>
        <Link
          href={link}
          className="inline-flex items-center text-[#003366] font-semibold hover:underline transition-all"
        >
          Learn More
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
