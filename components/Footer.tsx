import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#003366] text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-300">
              Leading educational institute providing quality courses and training programs.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/partners" className="text-gray-300 hover:text-white transition-colors">Partners</Link></li>
              <li><Link href="/study-abroad" className="text-gray-300 hover:text-white transition-colors">Study Abroad</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Courses</h3>
            <ul className="space-y-2">
              <li><Link href="/courses/finance-management" className="text-gray-300 hover:text-white transition-colors">Finance & Management</Link></li>
              <li><Link href="/courses/health-safety" className="text-gray-300 hover:text-white transition-colors">Health & Safety</Link></li>
              <li><Link href="/courses/ai-consultancy" className="text-gray-300 hover:text-white transition-colors">AI Consultancy</Link></li>
              <li><Link href="/courses/german-language" className="text-gray-300 hover:text-white transition-colors">German Language</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@educore.com</li>
              <li>Phone: +1 234 567 8900</li>
              <li>Address: Your Address Here</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} EduCore Institute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
