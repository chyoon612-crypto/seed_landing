
import React from 'react';
import { COMPANY_NAME } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-emerald-600 tracking-tight">SEED</span>
              <span className="ml-2 text-sm font-medium text-gray-500 hidden sm:block">{COMPANY_NAME}</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-600 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">소개</a>
              <a href="#programs" className="text-gray-600 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">프로그램</a>
              <a href="#gallery" className="text-gray-600 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">갤러리</a>
              <a href="#contact" className="text-gray-600 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors">강연문의</a>
              <a href="https://blog.naver.com/gray612" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 px-3 py-2 text-sm font-bold flex items-center gap-1">
                블로그
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </nav>
            <div className="md:hidden">
                <button className="text-gray-500 hover:text-emerald-600">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SEED 씨드</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                다가치나눔교육플랫폼 씨드는 모두가 함께 배우고 나누는 교육 생태계를 만들어갑니다.
              </p>
              <div className="text-xs text-gray-500">
                사업자등록번호: 851-86-01207
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#about" className="hover:text-emerald-400 transition-colors">씨드 소개</a></li>
                <li><a href="#programs" className="hover:text-emerald-400 transition-colors">교육 프로그램</a></li>
                <li><a href="#gallery" className="hover:text-emerald-400 transition-colors">강연 현장</a></li>
                <li><a href="#contact" className="hover:text-emerald-400 transition-colors">강연 및 교육 문의</a></li>
                <li className="pt-2"><a href="https://blog.naver.com/gray612" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1">공식 네이버 블로그 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <p className="text-gray-400 text-sm">이메일: happyseed114@daum.net</p>
              <p className="text-gray-400 text-sm">전화: 010-4617-5397 / 010-9649-0611</p>
              <p className="text-gray-400 text-sm">팩스: 0504-167-5397</p>
              <p className="text-gray-400 text-sm mt-4">충청북도 청주시 흥덕구 대신로67번길 26, 4층</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
            &copy; 2024 다가치나눔교육플랫폼 씨드. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
