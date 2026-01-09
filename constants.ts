
import { Program, GalleryItem } from './types';

export const COMPANY_NAME = "다가치나눔교육플랫폼 씨드 (SEED)";

export const PROGRAMS: Program[] = [
  {
    id: "p1",
    title: "사회적 가치 나눔 워크숍",
    description: "공동체 의식을 함양하고 사회적 가치를 실천하는 방법을 배우는 체험형 워크숍입니다.",
    details: [
      "나눔의 철학: 왜 우리는 함께 나누어야 하는가?",
      "사회적 경제의 이해와 실제 사례 연구",
      "팀 빌딩을 통한 지역 사회 문제 해결 아이디어 도출",
      "실천하는 시민: 일상 속 나눔 가이드라인"
    ],
    icon: "🤝",
    category: "가치교육"
  },
  {
    id: "p2",
    title: "미래 역량 강화 리더십",
    description: "급변하는 디지털 시대에 필요한 자기 주도적 리더십과 문제 해결 능력을 키웁니다.",
    details: [
      "뉴노멀 시대의 리더십 패러다임 변화",
      "셀프 리더십: 자기 주도적 성장 전략 수립",
      "창의적 문제 해결을 위한 디자인 씽킹 기법",
      "글로벌 역량 강화를 위한 의사소통 전략"
    ],
    icon: "🚀",
    category: "리더십"
  },
  {
    id: "p3",
    title: "감정 지능 & 공감 대화법",
    description: "서로의 다름을 이해하고 건강한 소통을 이어가기 위한 마음 챙김 및 대화 교육입니다.",
    details: [
      "감정 인지: 내 마음의 날씨 확인하기",
      "비폭력 대화(NVC) 실습: 관찰, 느낌, 필요, 부탁",
      "관계 회복을 위한 경청의 기술",
      "스트레스 관리 및 회복 탄력성 강화"
    ],
    icon: "❤️",
    category: "인성교육"
  },
  {
    id: "p4",
    title: "디지털 리터러시 & AI 윤리",
    description: "인공지능 시대를 살아가는 시민으로서 갖춰야 할 올바른 정보 활용과 윤리적 태도를 배웁니다.",
    details: [
      "디지털 시민성: 책임 있는 온라인 활동",
      "생성형 AI의 활용과 가짜 뉴스 판별법",
      "개인정보 보호와 데이터 주권의 이해",
      "기술과 인문학의 만남: 인간다운 AI 활용 윤리"
    ],
    icon: "💻",
    category: "디지털"
  }
];

export const GALLERY: GalleryItem[] = [
  {
    id: "g1",
    type: 'image',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    caption: '2023 하반기 리더십 컨퍼런스',
    description: '리더십의 본질과 미래 역량에 대해 함께 고민하고 토론하는 시간을 가졌습니다.',
    additionalMedia: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80' }
    ]
  },
  {
    id: "g2",
    type: 'image',
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    caption: '청소년 디지털 역량 강화 캠프',
    description: '지역사회 청소년들과 함께 디지털 리터러시와 AI 윤리에 대해 즐겁게 학습한 현장입니다.',
    additionalMedia: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80' }
    ]
  },
  {
    id: "g3",
    type: 'video',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    caption: '씨드 플랫폼 홍보 영상',
    description: '다가치나눔교육플랫폼 씨드가 지향하는 가치와 비전을 담은 브랜드 영상입니다.',
    additionalMedia: [
      { type: 'video', url: 'https://www.w3schools.com/html/movie.mp4' }
    ]
  },
  {
    id: "g4",
    type: 'image',
    url: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?auto=format&fit=crop&w=800&q=80',
    caption: '찾아가는 사회적 가치 교육',
    description: '다양한 공공기관과 학교를 방문하여 사회적 가치의 중요성을 알리고 있습니다.',
    additionalMedia: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80' }
    ]
  }
];
