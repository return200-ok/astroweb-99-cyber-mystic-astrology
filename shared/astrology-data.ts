import type { ZodiacSign, Language, I18nDictionary } from './types';
export const I18N: Record<Language, I18nDictionary> = {
  en: {
    terminalTitle: "Astral Terminal",
    terminalSub: "SELECT YOUR COSMIC IDENTIFIER TO BEGIN UPLINK",
    navTerminal: "TERMINAL",
    navMatchmaker: "MATCHMAKER",
    navBBS: "COSMIC BBS",
    rebootSystem: "REBOOT_SYSTEM",
    matchmakerTitle: "Cosmic Matchmaker",
    matchmakerSub: "DETERMINING INTER-STELLAR COMPATIBILITY V2.0",
    targetA: "Target Sign A (Origin)",
    targetB: "Target Sign B (External)",
    calculateMatch: "CALCULATE MATCH",
    computing: "COMPUTING...",
    matchResults: "Match Analysis Results",
    score: "COMPATIBILITY_SCORE",
    bbsTitle: "Cosmic BBS",
    bbsSub: "Post-Celestial Bulletin System",
    identifier: "Identifier / Alias",
    celestialSign: "Celestial Sign",
    messagePacket: "Communal Data Packet",
    transmit: "SEND TO MAINFRAME",
    transmitting: "TRANSMITTING...",
    incomingStreams: "Incoming Data Streams",
    emptyBBS: "The astral silence is deafening.",
    footerLine: "© 1999 CYBER-MYSTIC SYSTEMS INC.",
    footerSub: "Established on the Void",
    selectSign: "-- SELECT SIGN --",
    deepScanTitle: "DEEP_SCAN_ANALYSIS_v4.2",
    analysisPersonality: "Personality",
    analysisThinking: "Thinking Style",
    analysisAttractedTo: "Attracted To",
    analysisAttracts: "Attracts",
    analysisCareer: "Career Path",
    analysisNeeds: "Basic Needs",
  },
  vi: {
    terminalTitle: "Trạm Astral",
    terminalSub: "CHỌN ĐỊNH DANH VŨ TRỤ ĐỂ BẮT ĐẦU KẾT NỐI",
    navTerminal: "TRẠM CUỐI",
    navMatchmaker: "KẾT ĐÔI",
    navBBS: "BẢN TIN VŨ TRỤ",
    rebootSystem: "KHỞI_ĐỘNG_LẠI",
    matchmakerTitle: "Máy Kết Đôi Vũ Trụ",
    matchmakerSub: "XÁC ĐỊNH ĐỘ TƯƠNG THÍCH LIÊN SAO V2.0",
    targetA: "Cung Mục Tiêu A (Nguồn)",
    targetB: "Cung Mục Tiêu B (Bên Ngoài)",
    calculateMatch: "TÍNH TOÁN ĐỘ HỢP",
    computing: "ĐANG XỬ LÝ...",
    matchResults: "Kết Quả Phân Tích Kết Đôi",
    score: "ĐIỂM_TƯƠNG_THÍCH",
    bbsTitle: "Bản Tin Cosmic",
    bbsSub: "Hệ Thống Bản Tin Sau Thiên Hà",
    identifier: "Định Danh / Bí Danh",
    celestialSign: "Cung Hoàng Đạo",
    messagePacket: "Gói Dữ Liệu Cộng Đồng",
    transmit: "GỬI ĐẾN HỆ THỐNG",
    transmitting: "ĐANG TRUYỀN...",
    incomingStreams: "Luồng Dữ Liệu Đang Đến",
    emptyBBS: "Sự im lặng của các vì sao thật đáng sợ.",
    footerLine: "© 1999 CÔNG TY HỆ THỐNG HUYỀN BÍ CYBER.",
    footerSub: "Thiết lập trên Hư Không",
    selectSign: "-- CHỌN CUNG --",
    deepScanTitle: "PHÂN_TÍCH_QUÉT_SÂU_v4.2",
    analysisPersonality: "Tính Cách",
    analysisThinking: "Cách Tư Duy",
    analysisAttractedTo: "Bị Thu Hút Bởi",
    analysisAttracts: "Thu Hút Kiểu Người",
    analysisCareer: "Sự Nghiệp",
    analysisNeeds: "Nhu Cầu Cơ Bản",
  }
};
const createAnalysis = (lang: Language): any => ({
  en: {
    personality: ["Natural leader", "High energy", "Impulsive", "Courageous"],
    thinking: ["Direct and straightforward", "Fast processor", "Intuitive logic"],
    attractedTo: ["Dynamic personalities", "Confidence", "Independent souls"],
    attracts: ["Those seeking direction", "Adventurers", "Quiet observers"],
    career: ["Entrepreneur", "Military leader", "Firefighter", "Sales"],
    needs: ["Physical activity", "Autonomy", "Constant challenges"]
  },
  vi: {
    personality: ["Lãnh đạo bẩm sinh", "Năng lượng cao", "Cảm tính", "Can đảm"],
    thinking: ["Trực tiếp và thẳng thắn", "Xử lý nhanh", "Logic trực giác"],
    attractedTo: ["Cá tính năng động", "Sự tự tin", "Tâm hồn độc lập"],
    attracts: ["Người tìm kiếm định hướng", "Người phiêu lưu", "Người quan sát"],
    career: ["Doanh nhân", "Chỉ huy quân sự", "Cứu hỏa", "Bán hàng"],
    needs: ["Hoạt động thể chất", "Sự tự chủ", "Thử thách liên tục"]
  }
}[lang]);
export const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    id: 'aries',
    symbol: '♈',
    names: { en: 'Aries', vi: 'Bạch Dương' },
    dates: { en: 'Mar 21 - Apr 19', vi: '21/03 - 19/04' },
    horoscopes: {
      en: 'SYSTEM ALERT: Your energy levels are spiking. A new subroutine in your career path is initiating.',
      vi: 'CẢNH BÁO HỆ THỐNG: Mức năng lượng của bạn đang tăng vọt. Một quy trình mới trong sự nghiệp đang bắt đầu.'
    },
    analysis: {
      en: createAnalysis('en'),
      vi: createAnalysis('vi')
    }
  },
  {
    id: 'taurus',
    symbol: '♉',
    names: { en: 'Taurus', vi: 'Kim Ngưu' },
    dates: { en: 'Apr 20 - May 20', vi: '20/04 - 20/05' },
    horoscopes: {
      en: 'STABILITY DETECTED: Hard drive sectors are being optimized. Focus on material data acquisition.',
      vi: 'PHÁT HIỆN ỔN ĐỊNH: Các phân vùng ổ cứng đang được tối ưu hóa. Tập trung vào việc thu thập dữ liệu vật chất.'
    },
    analysis: {
      en: {
        personality: ["Reliable", "Patient", "Stubborn", "Practical"],
        thinking: ["Methodical", "Conservative", "Sensory-based"],
        attractedTo: ["Stability", "Luxury", "Gentle souls"],
        attracts: ["Chaos-seekers needing grounding", "Loyal friends"],
        career: ["Finance", "Art", "Agriculture", "Luxury management"],
        needs: ["Security", "Physical comfort", "Routine"]
      },
      vi: {
        personality: ["Đáng tin cậy", "Kiên nhẫn", "Bướng bỉnh", "Thực tế"],
        thinking: ["Có phương pháp", "Thận trọng", "Dựa trên giác quan"],
        attractedTo: ["Sự ổn định", "Sự sang trọng", "Tâm hồn dịu dàng"],
        attracts: ["Người tìm kiếm sự cân bằng", "Bạn bè trung thành"],
        career: ["Tài chính", "Nghệ thuật", "Nông nghiệp", "Quản lý xa xỉ"],
        needs: ["An ninh", "Sự thoải mái thể xác", "Thói quen"]
      }
    }
  },
  {
    id: 'gemini',
    symbol: '♊',
    names: { en: 'Gemini', vi: 'Song Tử' },
    dates: { en: 'May 21 - Jun 20', vi: '21/05 - 20/06' },
    horoscopes: {
      en: 'DUAL PROCESSING: Communication channels are buzzing. Expect incoming packets from multiple sources.',
      vi: 'XỬ LÝ KÉP: Các kênh giao tiếp đang xôn xao. Hãy chờ đợi các gói dữ liệu từ nhiều nguồn khác nhau.'
    },
    analysis: {
      en: {
        personality: ["Adaptable", "Curious", "Social", "Restless"],
        thinking: ["Analytical", "Quick-witted", "Multiplexing"],
        attractedTo: ["Intelligence", "Variety", "Humor"],
        attracts: ["People seeking excitement", "Storytellers"],
        career: ["Journalism", "PR", "Software developer", "Translator"],
        needs: ["Mental stimulation", "Communication", "Freedom"]
      },
      vi: {
        personality: ["Dễ thích nghi", "Tò mò", "Hòa đồng", "Bồn chồn"],
        thinking: ["Phân tích", "Nhanh trí", "Xử lý đa luồng"],
        attractedTo: ["Sự thông minh", "Sự đa dạng", "Hài hước"],
        attracts: ["Người tìm kiếm sự thú vị", "Người kể chuyện"],
        career: ["Báo chí", "Quan hệ công chúng", "Lập trình viên", "Thông dịch viên"],
        needs: ["Kích thích trí tuệ", "Giao tiếp", "Sự tự do"]
      }
    }
  },
  // Adding placeholders for others to ensure the array structure exists
  ...['cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'].map(id => ({
    id,
    symbol: '?',
    names: { en: id.charAt(0).toUpperCase() + id.slice(1), vi: id },
    dates: { en: 'Dates TBD', vi: 'Ngày TBD' },
    horoscopes: { en: 'Loading cosmos...', vi: 'Đang tải vũ trụ...' },
    analysis: {
      en: createAnalysis('en'),
      vi: createAnalysis('vi')
    }
  })) as any
];
export function getCompatibility(sign1: string, sign2: string, lang: Language) {
  const combined = [sign1, sign2].sort().join('-');
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = combined.charCodeAt(i) + ((hash << 5) - hash);
  }
  const score = Math.abs(hash % 41) + 60;
  const descriptions: Record<Language, string[]> = {
    en: [
      "CYBER-SYNC STABLE: Your data streams merge perfectly.",
      "HIGH BANDWIDTH CONNECTION: Strong resonance across channels.",
      "ENCRYPTED BOND: Deep compatibility hidden in code.",
      "OPTIMIZED ALIGNMENT: Subroutines complement each other.",
      "NEURAL RESONANCE: A powerful link bypassing logic gates."
    ],
    vi: [
      "ĐỒNG BỘ CYBER ỔN ĐỊNH: Luồng dữ liệu của bạn hợp nhất hoàn hảo.",
      "KẾT NỐI BĂNG THÔNG CAO: Sự cộng hưởng mạnh mẽ trên mọi kênh.",
      "LIÊN KẾT MÃ HÓA: Độ tương thích sâu ẩn trong mã nguồn.",
      "CĂN CHỈNH TỐI ƯU: Các tiến trình bổ trợ cho nhau tuyệt vời.",
      "CỘNG HƯỞNG THẦN KINH: Một liên kết mạnh mẽ vượt qua mọi logic."
    ]
  };
  const descIndex = Math.abs(hash % descriptions[lang].length);
  return { score, text: descriptions[lang][descIndex] };
}