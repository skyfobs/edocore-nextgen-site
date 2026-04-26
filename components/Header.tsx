'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#003366] text-white shadow-lg sticky top-0 z-50 w-full">
      <nav className="w-full px-8 py-3 relative">
        <div className="flex items-center justify-between relative w-full">
          <Link href="/" className="flex-shrink-0">
            <Image 
              src="/educore-logo.png" 
              alt="Educore NextGen Logo" 
              width={240} 
              height={84}
              className="h-24 w-auto object-contain"
              priority
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-8 flex-1 justify-end">
              <Link href="/" className="hover:text-gray-200 transition-colors font-medium">
                Home
              </Link>
              
              <Link href="/about" className="hover:text-gray-200 transition-colors font-medium">
                About Us
              </Link>

              <div className="relative group">
                <button 
                  className="hover:text-gray-200 transition-colors font-medium flex items-center py-2"
                  onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                >
                  Courses
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className="hidden group-hover:block absolute left-0 top-full pt-2 w-64 z-[9999]">
                  <div className="bg-white text-gray-800 rounded-lg shadow-2xl py-2 border-2 border-gray-300">
                    <Link href="/courses/finance-management" className="block px-4 py-2 hover:bg-gray-100 transition-colors">
                      Finance & Management
                    </Link>
                    <Link href="/courses/health-safety" className="block px-4 py-2 hover:bg-gray-100 transition-colors">
                      Health & Safety Training
                    </Link>
                    <Link href="/courses/ai-consultancy" className="block px-4 py-2 hover:bg-gray-100 transition-colors">
                      AI Consultancy
                    </Link>
                    <Link href="/courses/cloud-consultancy" className="block px-4 py-2 hover:bg-gray-100 transition-colors">
                      Cloud Consultancy
                    </Link>
                    <Link href="/courses/german-language" className="block px-4 py-2 hover:bg-gray-100 transition-colors">
                      German Language
                    </Link>
                    <Link href="/courses/multimedia" className="block px-4 py-2 hover:bg-gray-100 transition-colors">
                      Multimedia
                    </Link>
                  </div>
                </div>
              </div>

              <Link href="/partners" className="hover:text-gray-200 transition-colors font-medium">
                Partners
              </Link>

              <Link href="/study-abroad" className="hover:text-gray-200 transition-colors font-medium">
                Study Abroad
              </Link>

              <div className="relative group">
                <button 
                  className="hover:text-gray-200 transition-colors font-medium flex items-center py-2"
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                >
                  Resources
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className="hidden group-hover:block absolute left-0 top-full pt-2 w-48 z-[9999]">
                  <div className="bg-white text-gray-800 rounded-lg shadow-2xl py-2 border-2 border-gray-300">
                    <Link href="/resources/blog" className="block px-4 py-2 hover:bg-gray-100 transition-colors">
                      Blog
                    </Link>
                    <Link href="/resources/case-study" className="block px-4 py-2 hover:bg-gray-100 transition-colors">
                      Case Study
                    </Link>
                  </div>
                </div>
              </div>

              <Link href="/contact" className="hover:text-gray-200 transition-colors font-medium">
                Contact Us
              </Link>
            </div>

          <button 
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="hover:text-gray-200 transition-colors">Home</Link>
              <Link href="/about" className="hover:text-gray-200 transition-colors">About Us</Link>
              
              <div>
                <button 
                  onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                  className="hover:text-gray-200 transition-colors flex items-center w-full"
                >
                  Courses
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isCoursesOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link href="/courses/finance-management" className="block hover:text-gray-200">Finance & Management</Link>
                    <Link href="/courses/health-safety" className="block hover:text-gray-200">Health & Safety Training</Link>
                    <Link href="/courses/ai-consultancy" className="block hover:text-gray-200">AI Consultancy</Link>
                    <Link href="/courses/cloud-consultancy" className="block hover:text-gray-200">Cloud Consultancy</Link>
                    <Link href="/courses/german-language" className="block hover:text-gray-200">German Language</Link>
                    <Link href="/courses/multimedia" className="block hover:text-gray-200">Multimedia</Link>
                  </div>
                )}
              </div>

              <Link href="/partners" className="hover:text-gray-200 transition-colors">Partners</Link>
              <Link href="/study-abroad" className="hover:text-gray-200 transition-colors">Study Abroad</Link>
              
              <div>
                <button 
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                  className="hover:text-gray-200 transition-colors flex items-center w-full"
                >
                  Resources
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isResourcesOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link href="/resources/blog" className="block hover:text-gray-200">Blog</Link>
                    <Link href="/resources/case-study" className="block hover:text-gray-200">Case Study</Link>
                  </div>
                )}
              </div>

              <Link href="/contact" className="hover:text-gray-200 transition-colors">Contact Us</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
