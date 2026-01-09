
import React, { useState } from 'react';
import Layout from './components/Layout';
import { PROGRAMS, GALLERY } from './constants';
import { Program, GalleryItem } from './types';

const App: React.FC = () => {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);

  // 카카오톡 상담 링크 (필요 시 실제 오픈채팅 링크로 수정 가능)
  const KAKAO_TALK_URL = "https://open.kakao.com/o/s8m6XvX"; // 예시 링크입니다. 실제 링크로 교체하세요.

  return (
    <Layout>
      {/* Gallery Detail Modal (활동 사진/영상 더보기) */}
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
                        document.getElementById('contact')?.scrollIntoView();
                    }}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg"
                  >
                    강연 문의하기
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
            alt="Hero Background - Students Discussing"
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
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
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
              <p className="text-gray-600">현장의 생생한 열기를 확인해보세요. 각 사진을 클릭하면 상세 활동을 볼 수 있습니다.</p>
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
                  <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.type === 'video' ? '활동 영상' : '활동 사진'}
                  </span>
                  <h4 className="text-white text-xl font-bold mb-2">{item.caption}</h4>
                  <p className="text-gray-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    클릭하여 상세 사진 및 영상을 확인하세요.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-emerald-950 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">변화를 만드는 배움,<br/><span className="text-emerald-400">씨드와 함께하세요.</span></h2>
              <p className="text-emerald-100/80 text-lg mb-12">
                강연 요청, 기업 교육 상담, 파트너십 제안 등 어떤 문의든 환영합니다. 
                씨드의 전문 컨설턴트가 최적의 솔루션을 제안해드립니다.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-800 rounded-2xl flex items-center justify-center text-xl">📧</div>
                  <div>
                    <div className="text-sm text-emerald-300 font-bold uppercase">Email Us</div>
                    <div className="text-xl font-medium">happyseed114@daum.net</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-800 rounded-2xl flex items-center justify-center text-xl">📞</div>
                  <div>
                    <div className="text-sm text-emerald-300 font-bold uppercase">Call Us</div>
                    <div className="text-xl font-medium">010-4617-5397 / 010-9649-0611</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-800 rounded-2xl flex items-center justify-center text-xl">📠</div>
                  <div>
                    <div className="text-sm text-emerald-300 font-bold uppercase">Fax</div>
                    <div className="text-xl font-medium">0504-167-5397</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <div className="w-12 h-12 bg-emerald-800 rounded-2xl flex items-center justify-center text-xl">📍</div>
                  <div>
                    <div className="text-sm text-emerald-300 font-bold uppercase">Address</div>
                    <div className="text-lg">청주시 흥덕구 대신로67번길 26, 4층</div>
                  </div>
                </div>
                <div className="text-emerald-300/50 text-xs pl-16">
                  사업자등록번호: 851-86-01207
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl relative group overflow-hidden border border-white/20">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                  <svg className="w-24 h-24 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.33.27 2.6.75 3.75L1 23l7.25-1.75C9.4 21.73 10.67 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.14 0-2.24-.24-3.23-.67l-.23-.11-4.32 1.04 1.04-4.32-.11-.23C4.74 14.74 4.5 13.64 4.5 12.5c0-4.14 3.36-7.5 7.5-7.5s7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5z"/>
                  </svg>
                </div>

                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FEE500] rounded-3xl shadow-lg mb-8">
                    <svg className="w-12 h-12 text-[#3C1E1E]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3c-4.97 0-9 3.13-9 7 0 2.45 1.63 4.6 4.14 5.86l-.75 2.75c-.1.35.3.65.6.45l3.25-2.15c.57.06 1.16.09 1.76.09 4.97 0 9-3.13 9-7s-4.03-7-9-7z"/>
                    </svg>
                  </div>

                  <h3 className="text-3xl font-black text-gray-900 mb-4">카카오톡 실시간 상담</h3>
                  <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                    강연 커리큘럼부터 세부 일정 조율까지,<br/>
                    카카오톡으로 가장 빠르고 정확하게<br/>
                    상담받으실 수 있습니다.
                  </p>

                  <a 
                    href={KAKAO_TALK_URL}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-[#FEE500] hover:bg-[#FADA0A] text-[#3C1E1E] font-black text-xl py-5 rounded-2xl shadow-[0_8px_0_0_#D9C300] active:shadow-none active:translate-y-1 transition-all"
                  >
                    카카오톡 상담하기
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>

                  <div className="mt-8 flex items-center justify-center gap-6 text-gray-400 text-sm font-medium">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      평일 09:00 - 18:00
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      실시간 응대
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default App;
