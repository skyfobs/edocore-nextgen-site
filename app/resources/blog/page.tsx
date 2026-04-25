import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog - EduCore Institute',
  description: 'Read our latest articles, insights, and updates on education, training, and career development.',
};

export default function BlogPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-8 text-[#003366]">
          Blog
        </h1>
        
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg text-center text-gray-700 leading-relaxed">
            Stay updated with the latest insights, tips, and news from the world of education and professional development.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-r from-[#003366] to-[#004488]"></div>
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">January 1, 2024</div>
              <h2 className="text-2xl font-bold mb-3 text-[#003366]">
                [Blog Post Title]
              </h2>
              <p className="text-gray-700 mb-4">
                [Add blog post excerpt here]
              </p>
              <Link
                href="#"
                className="text-[#003366] font-semibold hover:underline inline-flex items-center"
              >
                Read More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </article>

          <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-r from-[#004488] to-[#003366]"></div>
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">January 1, 2024</div>
              <h2 className="text-2xl font-bold mb-3 text-[#003366]">
                [Blog Post Title]
              </h2>
              <p className="text-gray-700 mb-4">
                [Add blog post excerpt here]
              </p>
              <Link
                href="#"
                className="text-[#003366] font-semibold hover:underline inline-flex items-center"
              >
                Read More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </article>

          <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-r from-[#002244] to-[#003366]"></div>
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">January 1, 2024</div>
              <h2 className="text-2xl font-bold mb-3 text-[#003366]">
                [Blog Post Title]
              </h2>
              <p className="text-gray-700 mb-4">
                [Add blog post excerpt here]
              </p>
              <Link
                href="#"
                className="text-[#003366] font-semibold hover:underline inline-flex items-center"
              >
                Read More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </article>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">More blog posts coming soon...</p>
        </div>
      </div>
    </div>
  );
}
