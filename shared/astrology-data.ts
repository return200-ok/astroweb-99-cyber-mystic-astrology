import type { ZodiacSign, Language, I18nDictionary, ZodiacAnalysis } from './types';
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
  {
    id: 'cancer',
    symbol: '♋',
    names: { en: 'Cancer', vi: 'Cự Giải' },
    dates: { en: 'Jun 21 - Jul 22', vi: '21/06 - 22/07' },
    horoscopes: {
      en: 'FIREWALL ACTIVE: Emotional defenses are high. Your inner database requires a deep backup.',
      vi: 'TƯỜNG LỬA KÍCH HOẠT: Hệ phòng thủ cảm xúc đang cao. Cơ sở dữ liệu nội tại cần được sao lưu sâu.'
    },
    analysis: {
      en: {
        personality: ["Nurturing", "Intuitive", "Protective", "Sentimental"],
        thinking: ["Reflective", "Imaginative", "Subjective logic"],
        attractedTo: ["Kindness", "Stability", "Home-oriented people"],
        attracts: ["Those needing care", "Deep thinkers"],
        career: ["Healthcare", "Teaching", "Real Estate", "Chef"],
        needs: ["Emotional security", "Comfort", "Privacy"]
      },
      vi: {
        personality: ["Nuôi dưỡng", "Trực giác", "Bảo vệ", "Tình cảm"],
        thinking: ["Suy ngẫm", "Giàu trí tưởng tượng", "Logic chủ quan"],
        attractedTo: ["Sự tử tế", "Sự ổn định", "Người hướng về gia đình"],
        attracts: ["Người cần sự chăm sóc", "Người suy nghĩ sâu sắc"],
        career: ["Y tế", "Giảng dạy", "Bất động sản", "Đầu bếp"],
        needs: ["An toàn cảm xúc", "Sự thoải mái", "Sự riêng tư"]
      }
    }
  },
  {
    id: 'leo',
    symbol: '♌',
    names: { en: 'Leo', vi: 'Sư Tử' },
    dates: { en: 'Jul 23 - Aug 22', vi: '23/07 - 22/08' },
    horoscopes: {
      en: 'MAINFRAME DOMINANCE: Your charisma is overloading the network. A leadership position is opening.',
      vi: 'ƯU THẾ HỆ THỐNG: Sức hút của bạn đang làm quá tải mạng lưới. Một vị trí lãnh đạo đang mở ra.'
    },
    analysis: {
      en: {
        personality: ["Confident", "Generous", "Dramatic", "Proud"],
        thinking: ["Big-picture", "Creative", "Passionate reasoning"],
        attractedTo: ["Admiration", "Integrity", "Vibrant souls"],
        attracts: ["Followers", "Creative collaborators"],
        career: ["Performing Arts", "Management", "Politics", "Designer"],
        needs: ["Recognition", "Creative outlet", "Warmth"]
      },
      vi: {
        personality: ["Tự tin", "Hào phóng", "Kịch tính", "Kiêu hãnh"],
        thinking: ["Cái nhìn tổng thể", "Sáng tạo", "Lập luận nhiệt huyết"],
        attractedTo: ["Sự ngưỡng mộ", "Sự chính trực", "Tâm hồn rực rỡ"],
        attracts: ["Người theo dõi", "Cộng tác viên sáng tạo"],
        career: ["Nghệ thuật biểu diễn", "Quản lý", "Chính trị", "Thiết kế"],
        needs: ["Sự công nhận", "Cửa ngõ sáng tạo", "Sự ấm áp"]
      }
    }
  },
  {
    id: 'virgo',
    symbol: '♍',
    names: { en: 'Virgo', vi: 'Xử Nữ' },
    dates: { en: 'Aug 23 - Sep 22', vi: '23/08 - 22/09' },
    horoscopes: {
      en: 'DEBUGGING COMPLETE: All errors in your environment have been logged. Perfection is within reach.',
      vi: 'HOÀN TẤT GỠ LỖI: Tất cả các lỗi trong môi trường đã được ghi lại. Sự hoàn hảo đang trong tầm tay.'
    },
    analysis: {
      en: {
        personality: ["Analytical", "Precise", "Modest", "Diligent"],
        thinking: ["Logical", "Detail-oriented", "Systematic"],
        attractedTo: ["Intelligence", "Cleanliness", "Honesty"],
        attracts: ["People seeking order", "Improvement-seekers"],
        career: ["Data Science", "Research", "Editing", "Audit"],
        needs: ["Order", "Productivity", "Mental clarity"]
      },
      vi: {
        personality: ["Phân tích", "Chính xác", "Khiêm tốn", "Siêng năng"],
        thinking: ["Logic", "Chú trọng chi tiết", "Hệ thống"],
        attractedTo: ["Sự thông minh", "Sự sạch sẽ", "Sự trung thực"],
        attracts: ["Người tìm kiếm trật tự", "Người muốn cải thiện"],
        career: ["Khoa học dữ liệu", "Nghiên cứu", "Biên tập", "Kiểm toán"],
        needs: ["Trật tự", "Năng suất", "Sự minh mẫn"]
      }
    }
  },
  {
    id: 'libra',
    symbol: '♎',
    names: { en: 'Libra', vi: 'Thiên Bình' },
    dates: { en: 'Sep 23 - Oct 22', vi: '23/09 - 22/10' },
    horoscopes: {
      en: 'LOAD BALANCER: Harmony is being restored to your workspace. Expect a new partnership request.',
      vi: 'BỘ CÂN BẰNG TẢI: Sự hài hòa đang được khôi phục. Hãy chờ đợi một yêu cầu hợp tác mới.'
    },
    analysis: {
      en: {
        personality: ["Diplomatic", "Charming", "Indecisive", "Fair"],
        thinking: ["Balanced", "Aesthetic", "Compromising"],
        attractedTo: ["Beauty", "Politeness", "Intellect"],
        attracts: ["Strong personalities", "Artistic types"],
        career: ["Law", "Diplomacy", "Fashion", "Public Relations"],
        needs: ["Partnership", "Balance", "Aesthetic surroundings"]
      },
      vi: {
        personality: ["Ngoại giao", "Quyến rũ", "Do dự", "Công bằng"],
        thinking: ["Cân bằng", "Thẩm mỹ", "Thỏa hiệp"],
        attractedTo: ["Vẻ đẹp", "Sự lịch thiệp", "Trí tuệ"],
        attracts: ["Cá tính mạnh", "Kiểu người nghệ thuật"],
        career: ["Luật", "Ngoại giao", "Thời trang", "Quan hệ công chúng"],
        needs: ["Sự đồng hành", "Sự cân bằng", "Môi trường thẩm mỹ"]
      }
    }
  },
  {
    id: 'scorpio',
    symbol: '♏',
    names: { en: 'Scorpio', vi: 'Bọ Cạp' },
    dates: { en: 'Oct 23 - Nov 21', vi: '23/10 - 21/11' },
    horoscopes: {
      en: 'DEEP PACKET INSPECTION: You see through the encrypted layers of others. Trust your core intuition.',
      vi: 'QUÉT GÓI TIN SÂU: Bạn nhìn thấu các lớp mã hóa của người khác. Hãy tin vào trực giác cốt lõi.'
    },
    analysis: {
      en: {
        personality: ["Intense", "Resourceful", "Secretive", "Passionate"],
        thinking: ["Probing", "Skeptical", "Determined"],
        attractedTo: ["Mystery", "Loyalty", "Depth"],
        attracts: ["Those seeking truth", "Transformative spirits"],
        career: ["Psychology", "Investigation", "Crisis management", "Surgery"],
        needs: ["Intensity", "Trust", "Empowerment"]
      },
      vi: {
        personality: ["Mạnh mẽ", "Tháo vát", "Kín đáo", "Đam mê"],
        thinking: ["Dò xét", "Hoài nghi", "Quyết đoán"],
        attractedTo: ["Sự bí ẩn", "Sự trung thành", "Chiều sâu"],
        attracts: ["Người tìm kiếm sự thật", "Tâm hồn biến đổi"],
        career: ["Tâm lý học", "Điều tra", "Quản lý khủng hoảng", "Phẫu thuật"],
        needs: ["Sự mãnh liệt", "Sự tin tưởng", "Sức mạnh"]
      }
    }
  },
  {
    id: 'sagittarius',
    symbol: '♐',
    names: { en: 'Sagittarius', vi: 'Nhân Mã' },
    dates: { en: 'Nov 22 - Dec 21', vi: '22/11 - 21/12' },
    horoscopes: {
      en: 'NETWORK EXPANSION: Your bandwidth is growing. Explore remote nodes and acquire new philosophies.',
      vi: 'MỞ RỘNG MẠNG LƯỚI: Băng thông của bạn đang tăng. Hãy khám phá các nút từ xa và triết lý mới.'
    },
    analysis: {
      en: {
        personality: ["Optimistic", "Free-spirited", "Blunt", "Adventurous"],
        thinking: ["Philosophical", "Broad", "Idealistic"],
        attractedTo: ["Honesty", "Travelers", "Knowledge"],
        attracts: ["People stuck in routine", "Fellow explorers"],
        career: ["Academia", "Travel writer", "Import/Export", "Law"],
        needs: ["Freedom", "Meaning", "Adventure"]
      },
      vi: {
        personality: ["Lạc quan", "Tự do", "Thẳng thắn", "Phiêu lưu"],
        thinking: ["Triết học", "Rộng mở", "Lý tưởng"],
        attractedTo: ["Sự trung thực", "Người du hành", "Kiến thức"],
        attracts: ["Người bị kẹt trong thói quen", "Người cùng khám phá"],
        career: ["Học thuật", "Viết lách du lịch", "Xuất nhập khẩu", "Luật"],
        needs: ["Sự tự do", "Ý nghĩa", "Phiêu lưu"]
      }
    }
  },
  {
    id: 'capricorn',
    symbol: '♑',
    names: { en: 'Capricorn', vi: 'Ma Kết' },
    dates: { en: 'Dec 22 - Jan 19', vi: '22/12 - 19/01' },
    horoscopes: {
      en: 'UPTIME MAXIMIZED: Your efficiency is at record highs. The architectural structure of your life is solid.',
      vi: 'TỐI ĐA THỜI GIAN HOẠT ĐỘNG: Hiệu suất của bạn đạt mức kỷ lục. Cấu trúc cuộc sống của bạn rất vững chắc.'
    },
    analysis: {
      en: {
        personality: ["Ambitious", "Disciplined", "Pessimistic", "Patient"],
        thinking: ["Strategic", "Practical", "Hierarchical"],
        attractedTo: ["Ambition", "Success", "Stability"],
        attracts: ["Those needing guidance", "Business minds"],
        career: ["Executive", "Engineer", "Architect", "Government"],
        needs: ["Success", "Structure", "Respect"]
      },
      vi: {
        personality: ["Tham vọng", "Kỷ luật", "Bi quan", "Kiên nhẫn"],
        thinking: ["Chiến lược", "Thực tế", "Phân cấp"],
        attractedTo: ["Tham vọng", "Thành công", "Sự ổn định"],
        attracts: ["Người cần chỉ dẫn", "Tư duy kinh doanh"],
        career: ["Giám đốc", "Kỹ sư", "Kiến trúc sư", "Chính phủ"],
        needs: ["Thành công", "Cấu trúc", "Sự tôn trọng"]
      }
    }
  },
  {
    id: 'aquarius',
    symbol: '♒',
    names: { en: 'Aquarius', vi: 'Bảo Bình' },
    dates: { en: 'Jan 20 - Feb 18', vi: '20/01 - 18/02' },
    horoscopes: {
      en: 'UPGRADE AVAILABLE: A radical new update to your personal OS is ready for installation. Embrace the glitch.',
      vi: 'CẬP NHẬT CÓ SẴN: Một bản nâng cấp triệt để cho hệ điều hành cá nhân đã sẵn sàng. Hãy chấp nhận lỗi hệ thống.'
    },
    analysis: {
      en: {
        personality: ["Original", "Independent", "Detached", "Humanitarian"],
        thinking: ["Unconventional", "Forward-looking", "Objective"],
        attractedTo: ["Uniqueness", "Intellect", "Freedom-seekers"],
        attracts: ["Rebels", "Misfits", "Future-thinkers"],
        career: ["Social Activist", "Tech Innovator", "Scientist", "Astrology"],
        needs: ["Individuality", "Social change", "Innovation"]
      },
      vi: {
        personality: ["Độc đáo", "Độc lập", "Tách biệt", "Nhân đạo"],
        thinking: ["Phá cách", "Hướng tới tương lai", "Khách quan"],
        attractedTo: ["Sự độc nhất", "Trí tuệ", "Người tìm tự do"],
        attracts: ["Người nổi loạn", "Người lạc lõng", "Người nghĩ về tương lai"],
        career: ["Nhà hoạt động xã hội", "Nhà cách tân công nghệ", "Nhà khoa học", "Chiêm tinh"],
        needs: ["Cá tính", "Thay đổi xã hội", "Sự đổi mới"]
      }
    }
  },
  {
    id: 'pisces',
    symbol: '♓',
    names: { en: 'Pisces', vi: 'Song Ngư' },
    dates: { en: 'Feb 19 - Mar 20', vi: '19/02 - 20/03' },
    horoscopes: {
      en: 'VIRTUAL REALITY: Your dreams are blending with real-world data. Navigate the mist with compassion.',
      vi: 'THỰC TẾ ẢO: Giấc mơ của bạn đang hòa quyện với dữ liệu thực tế. Hãy định hướng trong làn sương bằng lòng trắc ẩn.'
    },
    analysis: {
      en: {
        personality: ["Compassionate", "Artistic", "Dreamy", "Empathetic"],
        thinking: ["Fluid", "Intuitive", "Non-linear"],
        attractedTo: ["Soulfulness", "Creativity", "Mysticism"],
        attracts: ["People seeking healing", "Practical types needing magic"],
        career: ["Musician", "Healer", "Photographer", "Spiritual leader"],
        needs: ["Escape", "Spiritual connection", "Emotional release"]
      },
      vi: {
        personality: ["Trắc ẩn", "Nghệ thuật", "Mơ mộng", "Đồng cảm"],
        thinking: ["Linh hoạt", "Trực giác", "Phi tuyến tính"],
        attractedTo: ["Tâm hồn", "Sáng tạo", "Sự huyền bí"],
        attracts: ["Người tìm sự chữa lành", "Người thực tế cần phép màu"],
        career: ["Nhạc sĩ", "Người chữa lành", "Nhiếp ảnh gia", "Lãnh đạo tâm linh"],
        needs: ["Sự thoát ly", "Kết nối tâm linh", "Giải tỏa cảm xúc"]
      }
    }
  }
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
      "NEURAL RESONANCE: A powerful link bypassing logic gates.",
      "CORE KERNEL MATCH: Fundamental alignment detected.",
      "REMOTE SYNC SUCCESS: No latency in your emotional transfer."
    ],
    vi: [
      "ĐỒNG BỘ CYBER ỔN ĐỊNH: Luồng dữ liệu của bạn hợp nhất hoàn hảo.",
      "KẾT NỐI BĂNG THÔNG CAO: Sự cộng hưởng mạnh mẽ trên mọi kênh.",
      "LIÊN KẾT MÃ HÓA: Độ tương thích sâu ẩn trong mã nguồn.",
      "CĂN CHỈNH TỐI ƯU: Các tiến trình bổ trợ cho nhau tuyệt vời.",
      "CỘNG HƯỞNG THẦN KINH: Một liên kết mạnh mẽ vượt qua mọi logic.",
      "KHỚP NHÂN CỐT LÕI: Phát hiện sự căn chỉnh cơ bản.",
      "ĐỒNG BỘ TỪ XA THÀNH CÔNG: Không có độ trễ trong truyền tải cảm xúc."
    ]
  };
  const descIndex = Math.abs(hash % descriptions[lang].length);
  return { score, text: descriptions[lang][descIndex] };
}