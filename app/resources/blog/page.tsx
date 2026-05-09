import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Blog - EduCore Institute',
  description: 'Read our latest articles, insights, and updates on education, training, and career development.',
};

export default function BlogPage() {
  // Dynamic date calculation - current month going back 5 months
  const getMonthYear = (monthsAgo: number) => {
    const date = new Date();
    date.setMonth(date.getMonth() - monthsAgo);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

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
          {/* AI Consultancy */}
          <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 relative">
              <Image 
                src="/blog/ai-blog.jpg" 
                alt="AI Consultancy Blog" 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">{getMonthYear(0)}</div>
              <h2 className="text-2xl font-bold mb-3 text-[#003366]">
                How AI Consultancy Skills Are Reshaping the Modern Workplace
              </h2>
              <p className="text-gray-700 mb-4">
                Artificial intelligence is no longer a technology only for engineers. Today, businesses across every sector are hiring professionals who can bridge the gap between AI capabilities and real business strategy.
              </p>
              <Link
                href="#"
                className="text-[#003366] font-semibold hover:underline inline-flex items-center"
              >
                Read More →
              </Link>
            </div>
          </article>

          {/* Cloud Consultancy */}
          <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 relative">
              <Image 
                src="/blog/cloud-blog.jpg" 
                alt="Cloud Consultancy Blog" 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">{getMonthYear(1)}</div>
              <h2 className="text-2xl font-bold mb-3 text-[#003366]">
                Why Every Enterprise Needs a Cloud Consultant in 2026
              </h2>
              <p className="text-gray-700 mb-4">
                Cloud adoption has moved from a trend to a business necessity, yet many organisations still struggle to migrate, optimise, and govern their cloud environments effectively.
              </p>
              <Link
                href="#"
                className="text-[#003366] font-semibold hover:underline inline-flex items-center"
              >
                Read More →
              </Link>
            </div>
          </article>

          {/* Finance & Management */}
          <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 relative">
              <Image 
                src="/blog/finance-blog.jpg" 
                alt="Finance & Management Blog" 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">{getMonthYear(2)}</div>
              <h2 className="text-2xl font-bold mb-3 text-[#003366]">
                The Finance Skills Gap: Why Managers Need More Than Spreadsheets
              </h2>
              <p className="text-gray-700 mb-4">
                Financial literacy is one of the most underrated leadership skills. Research consistently shows that managers who understand budgeting and financial reporting make better decisions.
              </p>
              <Link
                href="#"
                className="text-[#003366] font-semibold hover:underline inline-flex items-center"
              >
                Read More →
              </Link>
            </div>
          </article>

          {/* Health & Safety */}
          <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 relative">
              <Image 
                src="/blog/health-safety-blog.jpg" 
                alt="Health & Safety Blog" 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">{getMonthYear(3)}</div>
              <h2 className="text-2xl font-bold mb-3 text-[#003366]">
                Workplace Safety Is Not Optional: What Every Organisation Must Know
              </h2>
              <p className="text-gray-700 mb-4">
                Every year, thousands of workplace injuries occur that could have been prevented with proper risk assessment, safety protocols, and trained personnel.
              </p>
              <Link
                href="#"
                className="text-[#003366] font-semibold hover:underline inline-flex items-center"
              >
                Read More →
              </Link>
            </div>
          </article>

          {/* German Language */}
          <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 relative">
              <Image 
                src="/blog/german-blog.jpg" 
                alt="German Language Blog" 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">{getMonthYear(4)}</div>
              <h2 className="text-2xl font-bold mb-3 text-[#003366]">
                German: The Language of Business, Engineering, and Opportunity
              </h2>
              <p className="text-gray-700 mb-4">
                Germany is Europe's largest economy and home to some of the world's most influential companies. German language proficiency is a powerful advantage.
              </p>
              <Link
                href="#"
                className="text-[#003366] font-semibold hover:underline inline-flex items-center"
              >
                Read More →
              </Link>
            </div>
          </article>

          {/* Multimedia */}
          <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 relative">
              <Image 
                src="/blog/multimedia-blog.jpg" 
                alt="Multimedia Blog" 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">{getMonthYear(5)}</div>
              <h2 className="text-2xl font-bold mb-3 text-[#003366]">
                From Canva to Cinema: Why Multimedia Skills Are a Career Multiplier
              </h2>
              <p className="text-gray-700 mb-4">
                In a world driven by content, multimedia skills are no longer exclusive to designers or filmmakers. Learn how multimedia skills set you apart.
              </p>
              <Link
                href="#"
                className="text-[#003366] font-semibold hover:underline inline-flex items-center"
              >
                Read More →
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
