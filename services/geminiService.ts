
import { GoogleGenAI, Modality } from "@google/genai";

// Audio Helper Functions
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// Speak Pali using gemini-2.5-flash-preview-tts
export const speakPali = async (text: string) => {
  try {
    // Instantiate per call as per recommended guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Hãy phát âm từ tiếng Pāli này một cách rõ ràng, chậm rãi từng âm tiết: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) return;

    const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const audioBuffer = await decodeAudioData(
      decode(base64Audio),
      outputAudioContext,
      24000,
      1,
    );
    const source = outputAudioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(outputAudioContext.destination);
    source.start();
  } catch (error) {
    console.error("Lỗi phát âm:", error);
  }
};

// Get reading instruction using gemini-3-flash-preview
export const getReadingInstruction = async (text: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Bạn là giảng sư tiếng Pāli chuyên sâu. Hãy hướng dẫn cách đọc từ/câu sau: "${text}". 
    Yêu cầu: 
    1. Chia tách âm tiết.
    2. Chỉ rõ các nguyên âm dài/ngắn dựa trên luật ngữ pháp (ví dụ: nguyên âm ngắn đứng trước phụ âm đôi phát âm dài - §4 giáo trình Duroiselle).
    3. Lưu ý các phụ âm đặc biệt (như th, ph, ṃ).
    4. Trình bày ngắn gọn, dễ hiểu bằng tiếng Việt.`,
  });
  // Property access .text
  return response.text;
};

// Translate Pali using gemini-3-flash-preview
export const translatePali = async (text: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Hãy dịch câu tiếng Pāli sau sang tiếng Việt và giải thích ý nghĩa tâm linh/triết học nếu có: "${text}"`,
  });
  // Property access .text
  return response.text;
};

// Ask AI Tutor using gemini-3-flash-preview
export const askTutor = async (question: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: question,
    config: {
      systemInstruction: 'Bạn là một chuyên gia về ngôn ngữ Pāli và Phật học nguyên thủy. Hãy trả lời các câu hỏi của người học một cách chi tiết, dễ hiểu và truyền cảm hứng dựa trên giáo trình của Charles Duroiselle.'
    }
  });
  // Property access .text
  return response.text;
};
