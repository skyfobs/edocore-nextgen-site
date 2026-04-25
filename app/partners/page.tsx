import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Partners - EduCore Institute',
  description: 'Discover our trusted partners and collaborators who help us deliver world-class education and training.',
};

export default function PartnersPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-8 text-[#003366]">
          Our Partners
        </h1>
        
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg text-center text-gray-700 leading-relaxed">
            [Add introduction about your partnerships here]
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-[#003366]">
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-500">Partner Logo</span>
            </div>
            <h3 className="text-xl font-bold text-[#003366] mb-2">Partner Name</h3>
            <p className="text-gray-600">[Add partner description]</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-[#003366]">
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-500">Partner Logo</span>
            </div>
            <h3 className="text-xl font-bold text-[#003366] mb-2">Partner Name</h3>
            <p className="text-gray-600">[Add partner description]</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-[#003366]">
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-500">Partner Logo</span>
            </div>
            <h3 className="text-xl font-bold text-[#003366] mb-2">Partner Name</h3>
            <p className="text-gray-600">[Add partner description]</p>
          </div>
        </div>

        <div className="mt-16 bg-[#003366] text-white p-12 rounded-lg text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Become a Partner</h2>
          <p className="text-lg mb-6">
            [Add information about partnership opportunities]
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-[#003366] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
