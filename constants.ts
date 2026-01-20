
import { Program, GalleryItem } from './types';

export const COMPANY_NAME = "다가치나눔교육플랫폼 씨드 (SEED)";

export const PROGRAMS: Program[] = [
  {
    id: "p1",
    title: "다문화이해교육",
    description: "다름이 틀림이 아니고 다름을 성장의 원동력으로 바꿀 수 있는 감성체험 교육입니다.",
    details: [
      "문화적 다양성의 이해: 다름은 틀림이 아니다",
      "다양한 문화적 배경을 가진 이웃들과의 공존 방법",
      "편견과 고정관념에서 벗어나는 감성 체험",
      "글로벌 시민으로서의 상호존중 감수성 키우기"
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
    title: "진로 탐색 및 체험교육",
    description: "좋아하는 일을 직업으로 만들 수 있을까? 이런 의문을 해결할 수 있는 생생한 진로 이야기와 체험교육입니다.",
    details: [
      "진로 적성 찾기: 내가 진짜 좋아하는 것은?",
      "직업의 세계: 미래 유망 직종 탐색",
      "현직 전문가와 함께하는 생생한 진로 멘토링",
      "나만의 포트폴리오 기획 및 로드맵 설계"
    ],
    icon: "🎯",
    category: "진로교육"
  },
  {
    id: "p4",
    title: "감성힐링 공연",
    description: "음악과 이야기가 어우러진 공연을 통해 지친 마음을 치유하고 긍정적인 에너지를 채우는 힐링 교육입니다.",
    details: [
      "음악으로 만나는 마음의 위로와 휴식",
      "스토리가 있는 공연 중심의 감성 소통",
      "회복 탄력성 향상을 위한 자아 탐색",
      "스트레스 해소와 정서적 안정 지원"
    ],
    icon: "🎻",
    category: "감성힐링"
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
