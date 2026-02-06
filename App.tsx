
import React, { useState, useEffect, useRef } from 'react';
import Layout from './components/Layout';
import { PROGRAMS, GALLERY } from './constants';
import { Program } from './types';

// html2pdf 타입을 위한 선언 (index.html에서 CDN으로 로드됨)
declare var html2pdf: any;

const App: React.FC = () => {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [showBrochure, setShowBrochure] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const brochureRef = useRef<HTMLDivElement>(null);
  const hiddenPdfRef = useRef<HTMLDivElement>(null);

  // 사용자가 제공한 실제 카카오톡 채널 상담 링크
  const KAKAO_TALK_URL = "http://pf.kakao.com/_iBxlxon";
  
  // 외부 링크 설정
  const RESOURCE_LINK = "https://edu-resource-silk.vercel.app/"; // 요청된 통합 리소스 링크
  const MULTICULTURAL_LECTURE_URL = RESOURCE_LINK; // 다문화
  const STUDENT_LED_LEARNING_URL = RESOURCE_LINK; // 학생주도적 진로 및 학습설계 (p2)
  const CAREER_EXPLORATION_URL = RESOURCE_LINK; // 진로 탐색 (p3) - 요청에 따라 리소스 링크로 통합
  const BLOG_URL = "https://blog.naver.com/gray612"; // 공식 블로그

  // 브로셔 이미지 리스트 (001.png ~ 013.png) - 제공된 PDF 스크린샷 대응
  const brochureImages = Array.from({ length: 13 }, (_, i) => {
    const num = String(i + 1).padStart(3, '0');
    return `${num}.png`;
  });

  // PDF 다운로드 기능
  const downloadPDF = async (targetRef: React.RefObject<HTMLDivElement | null>) => {
    if (!targetRef.current || isDownloading) return;
    
    setIsDownloading(true);
    const element = targetRef.current;
    const opt = {
      margin: 0,
      filename: 'SEED_진로탐색_체험프로그램_안내자료.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF Download Error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  // 모달 오픈 시 스크롤 잠금
  useEffect(() => {
    if (selectedProgram || showBrochure) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProgram, showBrochure]);

  return (
    <Layout>
      {/* Hidden Container for PDF Content (001.png ~ 013.png) */}
      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', width: '800px' }}>
        <div ref={hiddenPdfRef} className="bg-white">
          {brochureImages.map((src, index) => (
            <div key={index} style={{ pageBreakAfter: 'always' }}>
              <img 
                src={`./${src}`} 
                alt={`Page ${index + 1}`}
                style={{ width: '100%', display: 'block' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Brochure Modal (이미지 뷰어 모드) */}
      {showBrochure && (
        <div className="fixed inset-0 z-[150] flex flex-col bg-slate-950 animate-in fade-in duration-300">
          <div className="flex justify-between items-center p-4 md:px-8 md:py-4 bg-slate-900/90 backdrop-blur-xl sticky top-0 z-[170] border-b border-white/10 shadow-2xl">
            <div className="flex items-center gap-4">
              <h3 className="text-white font-bold text-lg md:text-xl flex items-center gap-2">
                <span className="bg-emerald-500 w-1.5 h-6 rounded-full"></span>
                상세 프로그램 안내
              </h3>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              <button 
                onClick={() => downloadPDF(brochureRef)}
                disabled={isDownloading}
                className="flex items-center gap-2 px-3 py-2 md:px-5 md:py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-sm font-bold transition-all shadow-lg active:scale-95"
              >
                {isDownloading ? <span className="animate-spin">↻</span> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>}
                <span className="hidden xs:inline">PDF 저장</span>
              </button>
              <button onClick={() => setShowBrochure(false)} className="p-2 text-white/50 hover:text-white transition-all"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto bg-slate-950 p-4 md:p-8" id="brochure-container">
            <div className="max-w-4xl mx-auto space-y-6 md:space-y-12" ref={brochureRef}>
              {brochureImages.map((src, index) => (
                <div key={index} className="rounded-2xl overflow-hidden shadow-2xl bg-slate-900 border border-white/10">
                  <img src={`./${src}`} alt={`Page ${index + 1}`} className="w-full h-auto block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Program Detail Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm modal-enter">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{selectedProgram.icon}</span>
                  <div>
                    <span className="text-emerald-600 font-bold text-sm uppercase tracking-wider">{selectedProgram.category}</span>
                    <h2 className="text-3xl font-bold text-gray-900">{selectedProgram.title}</h2>
                  </div>
                </div>
                <button onClick={() => setSelectedProgram(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">프로그램 개요</h4>
                  <p className="text-gray-600 leading-relaxed">{selectedProgram.description}</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">주요 교육 내용</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProgram.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                        <span className="text-emerald-500 font-bold">0{idx + 1}</span>
                        <span className="text-sm text-gray-700 font-medium">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <p className="text-xs text-gray-400 mb-4">* 본 커리큘럼은 요청 기관의 특성에 따라 맞춤형으로 조정 가능합니다.</p>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {/* 강연 정보 확인 버튼 (프로그램별 분기) */}
                    {selectedProgram.id === 'p1' ? (
                      <a href={MULTICULTURAL_LECTURE_URL} target="_blank" rel="noopener noreferrer" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2">강연 정보 확인</a>
                    ) : selectedProgram.id === 'p2' ? (
                      <a href={STUDENT_LED_LEARNING_URL} target="_blank" rel="noopener noreferrer" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2">강연 정보 확인</a>
                    ) : selectedProgram.id === 'p3' ? (
                      <a href={CAREER_EXPLORATION_URL} target="_blank" rel="noopener noreferrer" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2">강연 정보 확인</a>
                    ) : selectedProgram.id === 'p4' ? (
                      <a href={BLOG_URL} target="_blank" rel="noopener noreferrer" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2">강연 정보 확인</a>
                    ) : (
                      <button onClick={() => { setSelectedProgram(null); setShowBrochure(true); }} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg">상세 안내서 보기</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sections ... */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" className="w-full h-full object-cover brightness-50" alt="Hero" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight drop-shadow-lg">함께 나누고 함께 피어나는<br/><span className="text-emerald-400">교육의 가치</span></h1>
          <p className="text-xl text-gray-200 mb-10 font-medium">다가치나눔교육플랫폼 씨드는 새로운 배움의 문화를 선도합니다.</p>
          <div className="flex justify-center gap-4">
            <a href="#programs" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl">프로그램 보기</a>
            <a href="https://blog.naver.com/gray612" target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl">공식 블로그</a>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div>
              <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm block mb-4">About SEED</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">배움이 나눔이 되고,<br/>나눔이 성장이 되는 플랫폼</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  <b>씨드(SEED)</b>는 단순히 지식을 전달하는 것을 넘어, 교육의 모든 주체가 서로의 가치를 나누고 함께 성장하는 <b>'나눔 교육 플랫폼'</b>입니다.
                </p>
                <p>
                  우리는 정해진 정답을 가르치기보다 각자의 잠재력이 씨앗처럼 피어날 수 있도록 돕는 <b>정성스러운 맞춤형 교육</b>을 지향합니다. 학습자가 스스로 자신의 길을 찾을 수 있는 자기 주도적 교육 환경을 구축하고 있습니다.
                </p>
                <div className="pt-4 border-t border-emerald-100">
                  <p className="text-emerald-700 font-bold mb-2 flex items-center gap-2">
                    <span className="text-xl">🌱</span> 누구나 교육의 주체가 되는 생태계
                  </p>
                  <p className="text-base text-gray-500">지식과 감성을 공유하며 더 나은 사회적 가치를 함께 만들어갑니다.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-emerald-50 rounded-[3rem] p-8 md:p-12 border border-emerald-100/50 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <span className="text-3xl">🎯</span> 우리의 가치와 비전
              </h3>
              <div className="space-y-8">
                <div>
                  <h4 className="font-black text-emerald-700 text-xs mb-2 uppercase tracking-widest">MISSION</h4>
                  <p className="text-gray-700 font-medium text-lg leading-snug">
                    개인의 잠재력을 발견하고 성장을 돕는 혁신적인 교육 솔루션 제공
                  </p>
                </div>
                <div>
                  <h4 className="font-black text-emerald-700 text-xs mb-3 uppercase tracking-widest">CORE VALUES</h4>
                  <ul className="space-y-5">
                    <li className="flex gap-4">
                      <span className="text-emerald-400 font-bold">01</span>
                      <div>
                        <h5 className="font-bold text-gray-900 text-base">다양성 존중</h5>
                        <p className="text-sm text-gray-500">서로 다른 배경과 재능을 성장의 원동력으로 승화</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-emerald-400 font-bold">02</span>
                      <div>
                        <h5 className="font-bold text-gray-900 text-base">자기 주도성</h5>
                        <p className="text-sm text-gray-500">학습자 스스로 문제를 정의하고 해결하는 역량 강화</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-emerald-400 font-bold">03</span>
                      <div>
                        <h5 className="font-bold text-gray-900 text-base">공감과 나눔</h5>
                        <p className="text-sm text-gray-500">따뜻한 소통을 통해 공동체와 함께 피어나는 가치</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">교육 프로그램 안내</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">씨드만의 차별화된 커리큘럼으로 맞춤형 교육 솔루션을 제안합니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROGRAMS.map((program) => (
              <div key={program.id} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group flex flex-col h-full">
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">{program.icon}</div>
                <div className="text-xs font-bold text-emerald-600 mb-2">{program.category}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{program.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">{program.description}</p>
                <button onClick={() => setSelectedProgram(program)} className="text-emerald-600 font-bold text-sm hover:text-emerald-700 flex items-center gap-2 group/btn">자세히 보기 <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">강연 및 활동 갤러리</h2>
            <p className="text-gray-600">현장의 생생한 열기를 확인해보세요.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GALLERY.map((item) => (
              <a 
                key={item.id} 
                href={BLOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-3xl bg-gray-100 aspect-[4/3] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300"
              >
                <img src={item.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h4 className="text-white text-xl font-bold">{item.caption}</h4>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-emerald-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div><h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">변화를 만드는 배움,<br/><span className="text-emerald-400">씨드와 함께하세요.</span></h2></div>
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl text-center text-gray-900">
            <h3 className="text-3xl font-black mb-4">카카오톡 상담</h3>
            <p className="text-gray-600 mb-10">교육 문의는 카카오톡으로 가장 빠르게 안내 받으실 수 있습니다.</p>
            <a href={KAKAO_TALK_URL} target="_blank" rel="noopener noreferrer" className="block w-full bg-[#FEE500] hover:bg-[#FADA0A] text-[#3C1E1E] font-black text-xl py-5 rounded-2xl transition-all">카카오톡 상담하기</a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default App;
