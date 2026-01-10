
import React, { useState, useEffect, useRef } from 'react';
import Layout from './components/Layout';
import { PROGRAMS, GALLERY } from './constants';
import { Program, GalleryItem } from './types';

// html2pdf 타입을 위한 선언 (index.html에서 CDN으로 로드됨)
declare var html2pdf: any;

const App: React.FC = () => {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [showBrochure, setShowBrochure] = useState(false);
  const [brochureViewMode, setBrochureViewMode] = useState<'image' | 'text'>('image');
  
  const brochureRef = useRef<HTMLDivElement>(null);

  // 사용자가 제공한 실제 카카오톡 채널 상담 링크
  const KAKAO_TALK_URL = "http://pf.kakao.com/_iBxlxon";
  
  // 브로셔 이미지 리스트 (001.png ~ 013.png)
  const brochureImages = Array.from({ length: 13 }, (_, i) => {
    const num = String(i + 1).padStart(3, '0');
    return `${num}.png`;
  });

  // 브로셔 데이터 (스크린샷 내용 반영)
  const brochureData = [
    { title: "프로그램 표지", content: "자기주도적 진로역량 강화 프로그램 (초, 중, 고등학교 통합)" },
    { title: "프로그램 3 POINT", content: "1. 검증된 교육프로그램 (한국교원대학교 지원단 활동 4년간 수행)\n2. 세계적인 전문강사진\n3. 전 연령대 교육 가능 (유, 초, 중, 고 및 특수/장애학생)" },
    { title: "전문가 - 변남석 작가", content: "밸런싱아티스트. tvN 유퀴즈, SBS 스타킹 등 다수 출연. 두바이 왕자 초청 공연. 중력과 무게중심을 이용한 세상의 균형 예술." },
    { title: "밸런싱아트 커리큘럼", content: "중심잡기 공연 (병, 사다리 등), 생각전환 하기 (실패에 대한 두려움 극복), 밸런싱 체험 활동." },
    { title: "전문가 - 박호걸 소장", content: "포디수리과학창의연구소. 4D프레임 발명 및 60여 종 특허 출원. 스웨덴 국립과학관 전시 및 현직 교사 연수 진행." },
    { title: "포디프레임 커리큘럼", content: "사고의 확장 (직업 찾기), 나의 진로 창의성 (다양한 관점 발휘), 교구를 활용한 수리/과학 융합 체험." },
    { title: "전문가 - 이혜린 박사", content: "첼리스트. 러시아 상트페테르부르크 국립음악원 연주학 박사. 청소년 진로 및 학습 코칭 전문가." },
    { title: "예술기반 자아탐색", content: "첼로 선율과 함께하는 감성 충전, 음악 체험 활동을 통한 자기주도적 진로 탐색 및 회복 탄력성 강화." },
    { title: "전문가 - 박근석 대표", content: "항공우주전문가. 엠공사이 대표. 비행 원리 학습 및 스마트 기기 이용 고정익 교육용 완구 개발." },
    { title: "우주항공 커리큘럼", content: "신박한 우주항공 (재미있는 우주항공 이야기), 날아라 꿈뱅이 (비행기 제작), 드론 및 항공기 비행 체험." },
    { title: "전문가 - 홍현수 대표", content: "플래너 전문가. 메모타임 대표. '운명을 바꾸는 노트의 힘' 저자. 차세대 플래너 시스템 개발." },
    { title: "땡큐노트 커리큘럼", content: "나에게 딱 맞는 학습법 및 진로 탐색, 플래너 작성법 실습, 자기주도적 학습 습관 형성 지도." },
    { title: "문의 및 안내", content: "윤창호 대표: 010-4617-5397. 다가치나눔교육플랫폼 씨드. 좋아하는 일을 직업으로 만든 사람들의 이야기." }
  ];

  // PDF 다운로드 기능
  const downloadPDF = () => {
    if (!brochureRef.current) return;
    
    const element = brochureRef.current;
    const opt = {
      margin: 0,
      filename: 'SEED_진로탐색_프로그램_소개서.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  // 모달 오픈 시 스크롤 잠금
  useEffect(() => {
    if (selectedProgram || selectedGalleryItem || showBrochure) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProgram, selectedGalleryItem, showBrochure]);

  return (
    <Layout>
      {/* Brochure Modal (상세 안내 이미지 뷰어) */}
      {showBrochure && (
        <div className="fixed inset-0 z-[150] flex flex-col bg-slate-950 animate-in fade-in duration-300">
          {/* Top Header Navigation */}
          <div className="flex justify-between items-center p-4 md:px-8 md:py-4 bg-slate-900/90 backdrop-blur-xl sticky top-0 z-[170] border-b border-white/10 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <h3 className="text-white font-bold text-lg md:text-xl flex items-center gap-2">
                  <span className="bg-emerald-500 w-1.5 h-6 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"></span>
                  진로 탐색 프로그램 상세 안내서
                </h3>
                <p className="text-slate-400 text-xs hidden sm:block">Total 13 Pages • SEED Education Platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              <button 
                onClick={() => setBrochureViewMode(brochureViewMode === 'image' ? 'text' : 'image')}
                className="flex items-center gap-2 px-3 py-2 md:px-5 md:py-2.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-2xl text-sm font-bold transition-all border border-emerald-500/30 group"
              >
                <span className="group-hover:scale-110 transition-transform">{brochureViewMode === 'image' ? '📄' : '🖼️'}</span>
                <span className="hidden xs:inline">{brochureViewMode === 'image' ? '텍스트 모드' : '이미지 모드'}</span>
              </button>
              
              <button 
                onClick={downloadPDF}
                className="flex items-center gap-2 px-3 py-2 md:px-5 md:py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-sm font-bold transition-all shadow-[0_8px_20px_rgba(16,185,129,0.3)] active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                <span className="hidden xs:inline">PDF 저장</span>
              </button>

              <button 
                onClick={() => setShowBrochure(false)}
                className="p-2 md:p-3 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all"
                aria-label="닫기"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar Navigation */}
            <aside className="hidden lg:flex w-72 bg-slate-900/40 border-r border-white/5 overflow-y-auto p-6 flex-col gap-2 custom-scrollbar">
              <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 px-2">Page Navigation</div>
              {brochureImages.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => {
                    const el = document.getElementById(`brochure-page-${i}`);
                    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-400 hover:bg-white/5 hover:text-white transition-all text-sm group text-left border border-transparent hover:border-white/10"
                >
                  <span className="w-7 h-7 flex items-center justify-center rounded-xl bg-slate-800 text-[10px] font-bold group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner">{i+1}</span>
                  <span className="truncate font-medium">{brochureData[i]?.title || `Page ${i+1}`}</span>
                </button>
              ))}
            </aside>

            {/* Viewer Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-950 p-2 sm:p-4 md:p-8" id="brochure-container">
              <div className="max-w-4xl mx-auto space-y-6 md:space-y-12" ref={brochureRef}>
                {brochureViewMode === 'image' ? (
                  brochureImages.map((src, index) => (
                    <div 
                      key={index} 
                      id={`brochure-page-${index}`}
                      className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-white/10 relative group"
                    >
                      <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md text-white/90 text-[10px] font-black px-3 py-1.5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                        PAGE {index + 1}
                      </div>
                      <img 
                        src={`./${src}`} 
                        alt={`SEED 브로셔 ${index + 1}페이지 - ${brochureData[index]?.title}`}
                        className="w-full h-auto select-none block"
                        loading={index < 3 ? "eager" : "lazy"}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const parent = target.parentElement;
                          if (parent && !parent.querySelector('.fallback-msg')) {
                            const fallback = document.createElement('div');
                            fallback.className = 'fallback-msg p-20 text-center flex flex-col items-center bg-slate-900';
                            fallback.innerHTML = `
                              <div class="text-emerald-500 text-4xl mb-6">📄</div>
                              <h4 class="text-white text-xl font-bold mb-4">${brochureData[index]?.title}</h4>
                              <p class="text-slate-400 whitespace-pre-wrap">${brochureData[index]?.content}</p>
                            `;
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <div className="space-y-8 max-w-2xl mx-auto py-10">
                    {brochureData.map((data, index) => (
                      <div key={index} id={`brochure-page-${index}`} className="bg-slate-900/50 p-8 rounded-[2rem] border border-white/10 shadow-xl backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-6">
                          <span className="bg-emerald-600 text-white w-10 h-10 rounded-xl flex items-center justify-center font-black">{index + 1}</span>
                          <h4 className="text-xl font-black text-white">{data.title}</h4>
                        </div>
                        <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap pl-4 border-l-2 border-slate-700">{data.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Final Footer */}
                <div className="py-20 text-center">
                   <div className="max-w-md mx-auto bg-slate-900/80 p-10 rounded-[2.5rem] border border-white/10">
                      <h3 className="text-white text-xl font-black mb-6">교육 문의 및 상담 안내</h3>
                      <p className="text-slate-400 mb-8 text-sm">상세 커리큘럼 및 일정이 궁금하시다면 카카오톡으로 언제든 문의주세요.</p>
                      <div className="flex flex-col gap-3">
                        <a 
                          href={KAKAO_TALK_URL}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-[#FEE500] hover:bg-[#FADA0A] text-[#3C1E1E] px-8 py-4 rounded-2xl font-black shadow-lg transition-all"
                        >
                          카카오톡 상담하기
                        </a>
                        <button 
                          onClick={() => setShowBrochure(false)}
                          className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-bold transition-all border border-white/5"
                        >
                          안내서 닫기
                        </button>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => document.getElementById('brochure-container')?.scrollTo({top: 0, behavior: 'smooth'})}
            className="fixed bottom-10 right-10 p-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl transition-all z-[180]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
          </button>
        </div>
      )}

      {/* Gallery Detail Modal */}
      {selectedGalleryItem && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md modal-enter">
          <div className="bg-white w-full max-w-5xl h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-6 border-b flex justify-between items-center bg-white sticky top-0">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedGalleryItem.caption}</h3>
                <p className="text-emerald-600 text-sm font-medium">활동 현장 상세 보기</p>
              </div>
              <button 
                onClick={() => setSelectedGalleryItem(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
              <div className="max-w-4xl mx-auto space-y-12">
                <div className="rounded-2xl overflow-hidden shadow-lg bg-black">
                  {selectedGalleryItem.type === 'video' ? (
                    <video src={selectedGalleryItem.url} controls className="w-full aspect-video" autoPlay />
                  ) : (
                    <img src={selectedGalleryItem.url} className="w-full h-auto" alt={selectedGalleryItem.caption} />
                  )}
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                    활동 소개
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {selectedGalleryItem.description || "당시의 활기찬 강연 현장입니다. 많은 교육생들이 참여하여 새로운 가치를 나누었습니다."}
                  </p>
                </div>

                {selectedGalleryItem.additionalMedia && selectedGalleryItem.additionalMedia.length > 0 && (
                  <div>
                    <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                      추가 활동 사진 및 영상
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedGalleryItem.additionalMedia.map((media, idx) => (
                        <div key={idx} className="rounded-2xl overflow-hidden shadow-md bg-white border border-gray-100 aspect-video group">
                          {media.type === 'video' ? (
                            <video src={media.url} controls className="w-full h-full object-cover" />
                          ) : (
                            <img src={media.url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="추가 활동 사진" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6 bg-white border-t text-center flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="https://blog.naver.com/gray612" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-emerald-600 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
              >
                블로그에서 더 많은 이야기 보기
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
              <button 
                onClick={() => setSelectedGalleryItem(null)}
                className="bg-gray-100 text-gray-800 px-10 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors"
              >
                닫기
              </button>
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
                <button 
                  onClick={() => setSelectedProgram(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
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
                  <button 
                    onClick={() => {
                        setSelectedProgram(null);
                        setShowBrochure(true);
                    }}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    강연 정보 확인
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            className="w-full h-full object-cover brightness-50" 
            alt="Hero Background"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight drop-shadow-lg">
            함께 나누고 함께 피어나는<br/>
            <span className="text-emerald-400">교육의 가치</span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 font-medium">
            다가치나눔교육플랫폼 씨드는 새로운 배움의 문화를 선도합니다.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#programs" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl text-center">
              프로그램 보기
            </a>
            <a href="https://blog.naver.com/gray612" target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl text-center flex items-center justify-center gap-2">
              공식 블로그 방문
            </a>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm block mb-4">About SEED</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">배움이 나눔이 되고,<br/>나눔이 성장이 되는 플랫폼</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                <p>
                  씨드(SEED)는 단순히 지식을 전달하는 것을 넘어, 구성원들이 서로의 가치를 나누고 함께 성장하는 <b>'나눔 교육 플랫폼'</b>입니다.
                </p>
                <p>
                  우리는 정해진 정답을 가르치기보다 각자의 잠재력이 씨앗처럼 피어날 수 있도록 돕는 정성스러운 교육을 지향합니다.
                </p>
              </div>
            </div>
            <div className="relative">
                <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    className="rounded-3xl shadow-2xl z-10 relative"
                    alt="Team Collaboration"
                />
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">교육 프로그램 안내</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">씨드만의 차별화된 커리큘럼으로 맞춤형 교육 솔루션을 제안합니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROGRAMS.map((program) => (
              <div key={program.id} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group flex flex-col h-full">
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform inline-block">
                  {program.icon}
                </div>
                <div className="text-xs font-bold text-emerald-600 mb-2">{program.category}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{program.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">{program.description}</p>
                <div className="mt-auto pt-6 border-t border-gray-50">
                    <button 
                      onClick={() => setSelectedProgram(program)}
                      className="text-emerald-600 font-bold text-sm hover:text-emerald-700 flex items-center gap-2 group/btn"
                    >
                      자세히 보기 
                      <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">강연 및 활동 갤러리</h2>
              <p className="text-gray-600">현장의 생생한 열기를 확인해보세요.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GALLERY.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedGalleryItem(item)}
                className="group relative overflow-hidden rounded-3xl bg-gray-100 aspect-[4/3] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300"
              >
                {item.type === 'video' ? (
                  <video 
                    src={item.url} 
                    poster={item.thumbnail}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    muted
                    loop
                    onMouseOver={(e) => e.currentTarget.play()}
                    onMouseOut={(e) => (e.currentTarget.pause(), e.currentTarget.currentTime = 0)}
                  />
                ) : (
                  <img 
                    src={item.url} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={item.caption}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-white text-xl font-bold mb-2">{item.caption}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-emerald-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">변화를 만드는 배움,<br/><span className="text-emerald-400">씨드와 함께하세요.</span></h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-800 rounded-2xl flex items-center justify-center text-xl">📧</div>
                  <div><div className="text-sm text-emerald-300 font-bold">Email</div><div className="text-xl">happyseed114@daum.net</div></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-800 rounded-2xl flex items-center justify-center text-xl">📞</div>
                  <div><div className="text-sm text-emerald-300 font-bold">Call</div><div className="text-xl">010-4617-5397</div></div>
                </div>
              </div>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl text-center">
              <h3 className="text-3xl font-black text-gray-900 mb-4">카카오톡 실시간 상담</h3>
              <p className="text-gray-600 mb-10">강연 및 교육 관련 문의는 카카오톡으로 가장 빠르게 안내 받으실 수 있습니다.</p>
              <a 
                href={KAKAO_TALK_URL}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#FEE500] hover:bg-[#FADA0A] text-[#3C1E1E] font-black text-xl py-5 rounded-2xl transition-all"
              >
                카카오톡 상담하기
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default App;
