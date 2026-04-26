'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white text-black shadow-lg sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-white text-black py-2 px-8 hidden lg:block border-b border-gray-200">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <a href="tel:+1234567890" className="flex items-center hover:text-gray-600 transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +1 (234) 567-8900
            </a>
            <a href="mailto:info@educore.com" className="flex items-center hover:text-gray-600 transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              info@educore.com
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <svg className="w-5 h-5 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <svg className="w-5 h-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <svg className="w-5 h-5 text-[#E4405F]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <nav className="w-full px-8 py-5 relative">
        <div className="flex items-center justify-between relative w-full">
          <Link href="/" className="flex-shrink-0">
            <Image 
              src="/educore-logo.png" 
              alt="Educore NextGen Logo" 
              width={220} 
              height={77}
              className="h-20 w-auto object-contain"
              priority
              unoptimized
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-8 flex-1 justify-end">
              <Link href="/" className="hover:text-gray-600 transition-colors font-medium text-lg">
                Home
              </Link>
              
              <Link href="/about" className="hover:text-gray-600 transition-colors font-medium text-lg">
                About Us
              </Link>

              <div className="relative group">
                <button 
                  className="hover:text-gray-600 transition-colors font-medium text-lg flex items-center py-2"
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

              <Link href="/partners" className="hover:text-gray-600 transition-colors font-medium text-lg">
                Partners
              </Link>

              <Link href="/study-abroad" className="hover:text-gray-600 transition-colors font-medium text-lg">
                Study Abroad
              </Link>

              <div className="relative group">
                <button 
                  className="hover:text-gray-600 transition-colors font-medium text-lg flex items-center py-2"
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

              <Link href="/contact" className="hover:text-gray-600 transition-colors font-medium text-lg">
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
              <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
              <Link href="/about" className="hover:text-gray-600 transition-colors">About Us</Link>
              
              <div>
                <button 
                  onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                  className="hover:text-gray-600 transition-colors flex items-center w-full"
                >
                  Courses
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isCoursesOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link href="/courses/finance-management" className="block hover:text-gray-600">Finance & Management</Link>
                    <Link href="/courses/health-safety" className="block hover:text-gray-600">Health & Safety Training</Link>
                    <Link href="/courses/ai-consultancy" className="block hover:text-gray-600">AI Consultancy</Link>
                    <Link href="/courses/cloud-consultancy" className="block hover:text-gray-600">Cloud Consultancy</Link>
                    <Link href="/courses/german-language" className="block hover:text-gray-600">German Language</Link>
                    <Link href="/courses/multimedia" className="block hover:text-gray-600">Multimedia</Link>
                  </div>
                )}
              </div>

              <Link href="/partners" className="hover:text-gray-600 transition-colors">Partners</Link>
              <Link href="/study-abroad" className="hover:text-gray-600 transition-colors">Study Abroad</Link>
              
              <div>
                <button 
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                  className="hover:text-gray-600 transition-colors flex items-center w-full"
                >
                  Resources
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isResourcesOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link href="/resources/blog" className="block hover:text-gray-600">Blog</Link>
                    <Link href="/resources/case-study" className="block hover:text-gray-600">Case Study</Link>
                  </div>
                )}
              </div>

              <Link href="/contact" className="hover:text-gray-600 transition-colors">Contact Us</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
