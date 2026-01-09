
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getProgramRecommendation = async (userInput: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `사용자가 다음과 같은 교육 문의를 했습니다: "${userInput}". 
      '다가치나눔교육플랫폼 씨드'의 대표 프로그램(사회적 가치 나눔, 미래 리더십, 감정 지능, 디지털 리터러시) 중 가장 적합한 것을 추천하고, 그 이유를 부드럽고 전문적인 톤으로 설명해줘. 한국어로 답변해줘.`,
      config: {
        systemInstruction: "당신은 교육 플랫폼 '씨드'의 전문 상담원입니다. 사용자의 관심사에 맞는 교육 프로그램을 친절하게 추천하세요.",
        temperature: 0.7,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "죄송합니다. 현재 AI 상담 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요.";
  }
};
