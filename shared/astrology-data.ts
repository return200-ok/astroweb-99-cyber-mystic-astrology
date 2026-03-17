import type { ZodiacSign, Language, I18nDictionary, PersonalityQuestion, BigFiveTrait, EnneagramQuestion, EnneagramType, EnneagramMetadata } from './types';
import { PALACE_ORDER_VN } from './tuvi-data';
export const I18N: Record<Language, I18nDictionary> = {
  en: {
    terminalTitle: "Celestial Oracle",
    terminalSub: "SELECT YOUR COSMIC IDENTIFIER FOR DIVINE COMMUNION",
    navTerminal: "ORACLE",
    navMatchmaker: "ALIGNMENT",
    navBBS: "COSMIC VOID",
    navTest: "SOUL REVELATION",
    rebootSystem: "RESET_STARS",
    matchmakerTitle: "Celestial Alignment",
    matchmakerSub: "DETERMINING INTER-STELLAR RESONANCE",
    targetA: "Origin Soul (Self)",
    targetB: "Distant Soul (External)",
    calculateMatch: "SEEK ALIGNMENT",
    computing: "ASCENDING...",
    matchResults: "Celestial Resonance Analysis",
    score: "RESONANCE_SCORE",
    bbsTitle: "Cosmic Void",
    bbsSub: "Echoes from the Astral Plane",
    identifier: "Spirit / Alias",
    celestialSign: "Celestial Sign",
    messagePacket: "Spiritual Essence",
    transmit: "WHISPER TO THE VOID",
    transmitting: "WHISPERING...",
    incomingStreams: "Echoes of Other Souls",
    emptyBBS: "The astral silence is profound.",
    footerLine: "© 1999 CELESTIAL MYSTIC SYSTEMS INC.",
    footerSub: "Written in the Stars",
    selectSign: "-- CHOOSE SIGN --",
    deepScanTitle: "SOUL_REVELATION_v4.2",
    analysisPersonality: "Essence",
    analysisThinking: "Spiritual Flow",
    analysisAttractedTo: "Drawn To",
    analysisAttracts: "Radiates To",
    analysisCareer: "Dharma Path",
    analysisNeeds: "Sacred Needs",
    testTitle: "Soul Revelation",
    testSub: "NEURAL MAPPING & CORE ESSENCE EXTRACTION",
    questionCount: "ESSENCE",
    resultProfile: "SOUL_SIGNATURE_FOUND",
    traitHigh: "Radiant",
    traitLow: "Serene",
    restartTest: "PURIFY & RE-SEEK",
    likert1: "Fully Absent",
    likert2: "Faint",
    likert3: "Balanced",
    likert4: "Present",
    likert5: "Fully Radiant",
    enneagramMode: "ENNEAGRAM_V9",
    bigFiveMode: "OCEAN_V5",
    coreType: "CORE_SOUL",
    activeWing: "GUIDING_WING",
    typeProfile: "SPIRITUAL_PROFILE",
    adviceProtocol: "CELESTIAL_GUIDANCE",
    navTuvi: "IMPERIAL",
    tuviTitle: "Imperial Chart",
    tuviSub: "EASTERN CELESTIAL MAPPING",
    birthDate: "ARRIVAL_DAY",
    birthHour: "STREAMS_HOUR",
    lunarDate: "LUNAR_SYNC",
    ownerName: "SPIRIT_ID",
    calculateChart: "CAST_STARS",
    palaceNames: PALACE_ORDER_VN,
    starNames: {},
  },
  vi: {
    terminalTitle: "Thiên Bản Lệnh",
    terminalSub: "CHỌN ĐỊNH DANH VŨ TRỤ ĐỂ BẮT ĐẦU KẾT NỐI TÂM LINH",
    navTerminal: "BẢN LỆNH",
    navMatchmaker: "Duyên Định",
    navBBS: "Bản Tin Thiên Hà",
    navTest: "Khai Tâm",
    rebootSystem: "XOAY_CHUYỂN_VẬN_MỆNH",
    matchmakerTitle: "Duyên Định Thiên Hà",
    matchmakerSub: "XÁC ĐỊNH SỰ TƯƠNG HỢP CỦA CÁC LINH HỒN",
    targetA: "Bản Mệnh (Nguồn)",
    targetB: "Thiên Mệnh (Bên Ngoài)",
    calculateMatch: "TÌM DUYÊN ĐỊNH",
    computing: "ĐANG THĂNG HOA...",
    matchResults: "Phân Tích Duyên Định",
    score: "ĐIỂM_TƯƠNG_HỢP",
    bbsTitle: "Bản Tin Vô Tận",
    bbsSub: "Tiếng Vọng Từ Cõi Astral",
    identifier: "Thần Thức / Bí Danh",
    celestialSign: "Cung Thiên Hà",
    messagePacket: "Cốt Lõi Tâm Linh",
    transmit: "GỬI VÀO CÕI HƯ KHÔNG",
    transmitting: "ĐANG THÌ THẦM...",
    incomingStreams: "Tiếng Vọng Các Linh Hồn",
    emptyBBS: "Sự tĩnh lặng của hư vô thật thâm sâu.",
    footerLine: "© 1999 CÔNG TY HỆ THỐNG HUYỀN BÍ THIÊN HÀ.",
    footerSub: "Viết Trên Những Vì Sao",
    selectSign: "-- CHỌN CUNG --",
    deepScanTitle: "KHAI_TÂM_PHÂN_TÍCH_v4.2",
    analysisPersonality: "Cốt Cách",
    analysisThinking: "Dòng Chảy Tâm Thức",
    analysisAttractedTo: "Hữu Duyên Với",
    analysisAttracts: "Sức Hút Tâm Linh",
    analysisCareer: "Đường Đạo",
    analysisNeeds: "Nhu Cầu Căn Bản",
    testTitle: "Hành Trình Khai Tâm",
    testSub: "BẢN ĐỒ TÂM THỨC & TRÍCH XUẤT CỐT LÕI LINH HỒN",
    questionCount: "GIAO THỨC",
    resultProfile: "ĐÃ_TÌM_THẤY_CHỮ_KÝ_TÂM_LINH",
    traitHigh: "Tỏa Sáng",
    traitLow: "Thanh Tịnh",
    restartTest: "THANH TẨY & THỬ LẠI",
    likert1: "Hoàn toàn không",
    likert2: "Thấp",
    likert3: "Cân bằng",
    likert4: "Cao",
    likert5: "Tỏa sáng",
    enneagramMode: "ENNEAGRAM_V9",
    bigFiveMode: "OCEAN_V5",
    coreType: "KIỂU_TÂM_LINH",
    activeWing: "CÁNH_DẪN_DẮT",
    typeProfile: "HỒ_SƠ_LINH_HỒN",
    adviceProtocol: "LỜI_KHUYÊN_THIÊM_LIÊNG",
    navTuvi: "TỬ VI",
    tuviTitle: "Tử Vi Đẩu Số",
    tuviSub: "BẢN ĐỒ THIÊN HÀ PHƯƠNG ĐÔNG",
    birthDate: "NGÀY KHỞI NGUYÊN",
    birthHour: "GIỜ LINH",
    lunarDate: "ÂM LỊCH",
    ownerName: "TÊN THẦN THỨC",
    calculateChart: "LẬP LÁ SỐ",
    palaceNames: PALACE_ORDER_VN,
    starNames: {},
  }
};
export const ENNEAGRAM_METADATA: Record<EnneagramType, EnneagramMetadata> = {
  1: {
    name: { en: "The Idealist", vi: "Người Cầu Toàn" },
    title: { en: "PURITY_PATH_ACTIVE", vi: "CON_ĐƯỜNG_THANH_CAO" },
    description: { en: "Rational, idealistic soul. Guided by principles and the search for inner truth.", vi: "Linh hồn lý trí, lý tưởng. Được dẫn dắt bởi các nguyên tắc và tìm kiếm sự thật nội tâm." },
    advice: { en: "The stars are never perfect, yet they shine. Accept the shadows within your own light.", vi: "Các vì sao không bao giờ hoàn hảo, nhưng chúng vẫn tỏa sáng. Hãy chấp nhận những bóng tối trong ánh sáng của riêng bạn." }
  },
  2: {
    name: { en: "The Caregiver", vi: "Người Giúp Đỡ" },
    title: { en: "COMPASSION_NODE_OPEN", vi: "NÚT_THẮT_TỪ_BI" },
    description: { en: "Caring, interpersonal essence. Finds divinity in the service of others.", vi: "Cốt cách quan tâm, giao tiếp. Tìm thấy sự thiêng liêng trong việc phụng sự người khác." },
    advice: { en: "To pour for others, your own chalice must be full. Seek the silence where you are the only one cared for.", vi: "Để rót nước cho người khác, chén thánh của bạn phải đầy. Hãy tìm sự tĩnh lặng nơi bạn là người duy nhất được chăm sóc." }
  },
  3: {
    name: { en: "The Achiever", vi: "Người Thành Đạt" },
    title: { en: "RADIANT_EFFICIENCY", vi: "HIỆU_SUẤT_TỎA_SÁNG" },
    description: { en: "Success-oriented, pragmatic soul. Driven to manifest excellence in the physical realm.", vi: "Linh hồn thực dụng, hướng tới thành công. Thúc đẩy để thể hiện sự xuất sắc trong cõi vật chất." },
    advice: { en: "Your worth is not measured by the speed of your orbit. You are the star, not the trail of light behind it.", vi: "Giá trị của bạn không được đo bằng tốc độ quỹ đạo. Bạn là ngôi sao, không phải vệt sáng đằng sau nó." }
  },
  4: {
    name: { en: "The Mystic", vi: "Người Cá Tính" },
    title: { en: "UNIQUE_ECHO_DETECTED", vi: "TIẾNG_VỌNG_ĐỘC_BẢN" },
    description: { en: "Sensitive, withdrawn type. Deeply connected to the melancholy and beauty of the void.", vi: "Kiểu người nhạy cảm, thu mình. Kết nối sâu sắc với sự u sầu và vẻ đẹp của hư vô." },
    advice: { en: "Do not drown in the depths of your own ocean. The surface reflects the sky for a reason.", vi: "Đừng chết đuối trong chiều sâu của đại dương của chính bạn. Bề mặt phản chiếu bầu trời là có lý do." }
  },
  5: {
    name: { en: "The Sage", vi: "Người Quan Sát" },
    title: { en: "WISDOM_MINER_V5", vi: "BỘ_LỌC_TRÍ_TUỆ_V5" },
    description: { en: "Intense, cerebral essence. Seeks to understand the hidden laws of the cosmos.", vi: "Cốt cách cường độ cao, trí tuệ. Tìm cách thấu hiểu các quy luật ẩn giấu của vũ trụ." },
    advice: { en: "Knowledge is the map, not the journey. Step outside the tower to feel the astral wind on your skin.", vi: "Kiến thức là bản đồ, không phải hành trình. Hãy bước ra ngoài tòa tháp để cảm nhận gió astral trên làn da của bạn." }
  },
  6: {
    name: { en: "The Guardian", vi: "Người Trung Thành" },
    title: { en: "ETHEREAL_SHIELD_LOADED", vi: "LỚP_GIÁP_LINH_HỒN" },
    description: { en: "Committed, security-oriented soul. Vigilant against the chaos of the shifting stars.", vi: "Linh hồn cam kết, hướng tới an ninh. Cảnh giác trước sự hỗn loạn của các vì sao dịch chuyển." },
    advice: { en: "The universe is held by order. Trust the ancient foundation; not every cosmic ripple is a storm.", vi: "Vũ trụ được giữ bởi trật tự. Hãy tin vào nền tảng cổ xưa; không phải mọi gợn sóng vũ trụ đều là bão tố." }
  },
  7: {
    name: { en: "The Wanderer", vi: "Người Nhiệt Huyết" },
    title: { en: "JOY_EXPLORER_ACTIVE", vi: "TRÌNH_KHÁM_PHÁ_NIỀM_VUI" },
    description: { en: "Busy, fun-loving type. Seeks the infinite variety of the celestial dance.", vi: "Kiểu người bận rộn, yêu đời. Tìm kiếm sự đa dạng vô tận của vũ điệu thiên hà." },
    advice: { en: "To see the constellations, one must stand still. Depth is found in the center, not the perimeter.", vi: "Để thấy các chòm sao, người ta phải đứng yên. Chiều sâu được tìm thấy ở trung tâm, không phải ở chu vi." }
  },
  8: {
    name: { en: "The Commander", vi: "Người Thách Thức" },
    title: { en: "WILL_POWER_DOMINANT", vi: "QUYỀN_NĂNG_Ý_CHÍ" },
    description: { en: "Powerful, dominating type. A forceful soul that shapes the material world to its will.", vi: "Kiểu người mạnh mẽ, thống trị. Một linh hồn mạnh mẽ nhào nặn thế giới vật chất theo ý chí của nó." },
    advice: { en: "True power is the strength to be gentle. Softness is the highest form of resilience.", vi: "Sức mạnh thực sự là sức mạnh để trở nên dịu dàng. Sự mềm mại là hình thức kiên cường cao nhất." }
  },
  9: {
    name: { en: "The Harmonizer", vi: "Người Hòa Giải" },
    title: { en: "ASTRA_BALANCE_ACTIVE", vi: "CÂN_BẰNG_THIÊN_HÀ" },
    description: { en: "Easygoing, self-effacing type. Finds peace in merging with the cosmic frequency.", vi: "Kiểu người dễ tính, khiêm tốn. Tìm thấy sự bình yên khi hòa mình vào tần số vũ trụ." },
    advice: { en: "Your silence is not absence. Your unique note is required for the symphony to be complete.", vi: "Sự im lặng của bạn không phải là sự vắng mặt. Nốt nhạc duy nhất của bạn là cần thiết để bản giao hưởng được trọn vẹn." }
  }
};
export const ENNEAGRAM_QUESTIONS: EnneagramQuestion[] = [
  // Simplified for phase 10
  { id: 101, type: 1, text: { en: "I seek sacred perfection in all my actions.", vi: "Tôi tìm kiếm sự hoàn hảo thiêng liêng trong mọi hành động." } },
  { id: 201, type: 2, text: { en: "Serving others brings me closer to the divine.", vi: "Phụng sự người khác giúp tôi gần hơn với đấng tối cao." } },
  { id: 301, type: 3, text: { en: "I manifest success through focused intention.", vi: "Tôi thể hiện thành công thông qua ý định tập trung." } },
  { id: 401, type: 4, text: { en: "My soul resonates with a unique, deeper frequency.", vi: "Linh hồn tôi cộng hưởng với một tần số sâu sắc, duy nhất." } },
  { id: 501, type: 5, text: { en: "I seek hidden wisdom within the cosmic laws.", vi: "Tôi tìm kiếm trí tuệ ẩn giấu trong các quy luật vũ trụ." } },
  { id: 601, type: 6, text: { en: "I value the security of ancient traditions.", vi: "Tôi coi trọng sự an toàn của những truyền thống cổ xưa." } },
  { id: 701, type: 7, text: { en: "I am drawn to the infinite joy of the cosmos.", vi: "Tôi bị thu hút bởi niềm vui vô tận của vũ trụ." } },
  { id: 801, type: 8, text: { en: "My will is a force that shapes the physical world.", vi: "Ý chí của tôi là một lực lượng nhào nặn thế giới vật chất." } },
  { id: 901, type: 9, text: { en: "I find peace in the harmony of all things.", vi: "Tôi tìm thấy sự bình yên trong sự hài hòa của vạn vật." } },
];
export const TRAIT_METADATA: Record<BigFiveTrait, {
  name: Record<Language, string>,
  highDesc: Record<Language, string>,
  lowDesc: Record<Language, string>
}> = {
  openness: {
    name: { en: "Astral Aperture", vi: "Tâm Thức Mở" },
    highDesc: { en: "High spiritual flexibility. Soul explores abstract realms and novel cosmic paths.", vi: "Linh hoạt tâm linh cao. Linh hồn khám phá các cõi trừu tượng và con đường mới." },
    lowDesc: { en: "Grounded in tradition. High stability in spiritual routine.", vi: "Bám rễ vào truyền thống. Độ ổn định cao trong thói quen tâm linh." }
  },
  conscientiousness: {
    name: { en: "Sacred Discipline", vi: "Kỷ Luật Thánh" },
    highDesc: { en: "Maximum soul organization. High focus on dharma with minimal distractions.", vi: "Tổ chức linh hồn tối đa. Tập trung cao độ vào đạo pháp với ít xao nhãng." },
    lowDesc: { en: "Fluid flow. Spirit operates in a flexible, slow-paced environment.", vi: "Dòng chảy linh hoạt. Tâm hồn hoạt động trong môi trường tự do, nhịp độ chậm." }
  },
  extraversion: {
    name: { en: "Radiant Output", vi: "Năng Lượng Tỏa" },
    highDesc: { en: "Active cosmic node. High energy shared during spiritual communion.", vi: "Nút mạng vũ trụ hoạt động. Năng lượng cao được chia sẻ trong giao thoa tâm linh." },
    lowDesc: { en: "Inward focus. Optimized for deep contemplation and internal flow.", vi: "Tập trung hướng nội. Tối ưu cho thiền định sâu và dòng chảy nội tại." }
  },
  agreeableness: {
    name: { en: "Universal Harmony", vi: "Hòa Hợp Vũ Trụ" },
    highDesc: { en: "High cosmic compatibility. Optimized for cooperative existence and peace.", vi: "Tương thích vũ trụ cao. Tối ưu cho sự tồn tại hợp tác và bình yên." },
    lowDesc: { en: "Analytical discernment. Critical awareness active during exchanges.", vi: "Sự phân biệt rõ ràng. Nhận thức phản biện hoạt động trong quá trình trao đổi." }
  },
  neuroticism: {
    name: { en: "Ethereal Sensitivity", vi: "Độ Nhạy Astral" },
    highDesc: { en: "Hyper-sensitive spirit. High reactivity to cosmic shifts and astral noise.", vi: "Tâm hồn cực nhạy. Phản ứng cao với sự dịch chuyển vũ trụ và tiếng ồn astral." },
    lowDesc: { en: "Stable soul essence. Minimal fluctuations during celestial events.", vi: "Cốt lõi linh hồn ổn định. Biến động tối thiểu trong các sự kiện thiên hà." }
  }
};
export const PERSONALITY_QUESTIONS: PersonalityQuestion[] = [
  { id: 1, trait: 'extraversion', text: { en: "I find energy in the light of others.", vi: "Tôi tìm thấy năng lượng trong ánh sáng của người khác." } },
  { id: 2, trait: 'agreeableness', text: { en: "I feel detached from the pain of others.", vi: "Tôi cảm thấy tách biệt với nỗi đau của người khác." }, isReverse: true },
  { id: 3, trait: 'conscientiousness', text: { en: "I am always prepared for the soul's journey.", vi: "Tôi luôn sẵn sàng cho hành trình của linh hồn." } },
  { id: 4, trait: 'neuroticism', text: { en: "I am easily swayed by cosmic shifts.", vi: "Tôi dễ bị lay chuyển bởi những biến động vũ trụ." } },
  { id: 5, trait: 'openness', text: { en: "I possess a rich internal language.", vi: "Tôi sở hữu một ngôn ngữ nội tâm phong phú." } },
];
export const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    id: 'aries',
    symbol: '♈',
    names: { en: 'Aries', vi: 'Bạch Dương' },
    dates: { en: 'Mar 21 - Apr 19', vi: '21/03 - 19/04' },
    horoscopes: {
      en: 'CELESTIAL GUIDANCE: Your inner flame is rising. A new path in your dharma is manifesting. Take bold steps now.',
      vi: 'DẪN DẮT THIÊN THƯỢNG: Ngọn lửa nội tâm của bạn đang trỗi dậy. Một con đường mới trong đạo pháp đang hiển hiện. Hãy bước đi can đảm.'
    },
    analysis: {
      en: {
        personality: ["Born initiator", "Radiant energy", "Instinctual", "Fearless"],
        thinking: ["Direct and focused", "Swift intuition", "Sacred logic"],
        attractedTo: ["Dynamic spirits", "Inner strength", "Independent souls"],
        attracts: ["Those seeking purpose", "Adventurers", "Quiet seekers"],
        career: ["Spiritual guide", "Pioneer", "Protector", "Visionary"],
        needs: ["Physical expression", "Autonomy", "Eternal challenges"]
      },
      vi: {
        personality: ["Người khởi xướng", "Năng lượng rạng ngời", "Bản năng", "Không sợ hãi"],
        thinking: ["Trực tiếp và tập trung", "Trực giác nhanh nhạy", "Logic thiêng liêng"],
        attractedTo: ["Tâm hồn năng động", "Sức mạnh nội tâm", "Linh hồn độc lập"],
        attracts: ["Người tìm kiếm mục đích", "Người phiêu lưu", "Người tìm kiếm sự tĩnh lặng"],
        career: ["Người dẫn dắt tâm linh", "Người tiên phong", "Người bảo vệ", "Người có tầm nhìn"],
        needs: ["Biểu hiện thể chất", "Sự tự chủ", "Thử thách vĩnh cửu"]
      }
    }
  },
  {
    id: 'taurus',
    symbol: '♉',
    names: { en: 'Taurus', vi: 'Kim Ngưu' },
    dates: { en: 'Apr 20 - May 20', vi: '20/04 - 20/05' },
    horoscopes: {
      en: 'ETHEREAL STABILITY: Your internal foundation is strengthening. Focus on sacred abundance and sensory beauty.',
      vi: 'SỰ ỔN ĐỊNH ASTRAL: Nền tảng nội tâm của bạn đang được củng cố. Tập trung vào sự sung túc thiêng liêng.'
    },
    analysis: {
      en: {
        personality: ["Reliable", "Patient", "Steadfast", "Grounded"],
        thinking: ["Methodical", "Conservative", "Sensory-based"],
        attractedTo: ["Harmony", "Beauty", "Gentle souls"],
        attracts: ["Chaos-seekers needing peace", "Loyal kin"],
        career: ["Steward of Earth", "Artist", "Curator", "Wealth keeper"],
        needs: ["Security", "Physical comfort", "Rhythm"]
      },
      vi: {
        personality: ["Đáng tin cậy", "Kiên nhẫn", "Kiên định", "Vững chãi"],
        thinking: ["Có phương pháp", "Cẩn trọng", "Dựa trên giác quan"],
        attractedTo: ["Sự hài hòa", "Vẻ đẹp", "Tâm hồn dịu dàng"],
        attracts: ["Người tìm bình yên", "Người thân trung thành"],
        career: ["Người quản tài", "Nghệ sĩ", "Người giám tuyển", "Người giữ của"],
        needs: ["Sự an toàn", "Sự thoải mái thân xác", "Nhịp điệu"]
      }
    }
  },
  {
    id: 'gemini',
    symbol: '♊',
    names: { en: 'Gemini', vi: 'Song Tử' },
    dates: { en: 'May 21 - Jun 20', vi: '21/05 - 20/06' },
    horoscopes: {
      en: 'SACRED DIALOGUE: Communication winds are blowing. Expect messages from distant realms through many voices.',
      vi: 'LỜI THOẠI THIÊNG LIÊNG: Những cơn gió giao tiếp đang thổi. Hãy chờ đón thông điệp từ các cõi xa qua nhiều tiếng nói.'
    },
    analysis: {
      en: {
        personality: ["Adaptable", "Curious", "Social", "Free"],
        thinking: ["Analytical", "Quick-witted", "Versatile"],
        attractedTo: ["Intelligence", "Diversity", "Wit"],
        attracts: ["People seeking life", "Storytellers"],
        career: ["Messenger", "Writer", "Bridge builder", "Thinker"],
        needs: ["Mental stimulation", "Expression", "Space"]
      },
      vi: {
        personality: ["Dễ thích nghi", "Tò mò", "Hòa đồng", "Tự do"],
        thinking: ["Phân tích", "Nhanh trí", "Linh hoạt"],
        attractedTo: ["Sự thông minh", "Sự đa dạng", "Sự hóm hỉnh"],
        attracts: ["Người tìm kiếm sự sống", "Người kể chuyện"],
        career: ["Người đưa tin", "Người viết", "Người xây cầu", "Nhà tư tưởng"],
        needs: ["Kích thích trí tuệ", "Sự biểu đạt", "Không gian"]
      }
    }
  },
  {
    id: 'cancer',
    symbol: '♋',
    names: { en: 'Cancer', vi: 'Cự Giải' },
    dates: { en: 'Jun 21 - Jul 22', vi: '21/06 - 22/07' },
    horoscopes: {
      en: 'SACRED SHELL: Your emotional sanctuary is high. Your inner spirit requires deep rest and nurturing silence.',
      vi: 'VỎ BỌC THIÊNG LIÊNG: Nơi trú ẩn cảm xúc của bạn đang dâng cao. Linh hồn bạn cần sự nghỉ ngơi và tĩnh lặng.'
    },
    analysis: {
      en: {
        personality: ["Nurturing", "Intuitive", "Protective", "Kind"],
        thinking: ["Reflective", "Dream-like", "Subjective"],
        attractedTo: ["Gentleness", "Home", "Sincerity"],
        attracts: ["Those needing healing", "Deep spirits"],
        career: ["Healer", "Teacher", "Guardian", "Creator"],
        needs: ["Soul security", "Serenity", "Sanctuary"]
      },
      vi: {
        personality: ["Nuôi dưỡng", "Trực giác", "Bảo vệ", "Tử tế"],
        thinking: ["Suy ngẫm", "Như trong mơ", "Chủ quan"],
        attractedTo: ["Sự dịu dàng", "Mái ấm", "Sự chân thành"],
        attracts: ["Người cần chữa lành", "Tâm hồn sâu sắc"],
        career: ["Người chữa lành", "Giáo viên", "Người giám hộ", "Người sáng tạo"],
        needs: ["Sự an toàn linh hồn", "Sự thanh thản", "Nơi trú ẩn"]
      }
    }
  },
  {
    id: 'leo',
    symbol: '♌',
    names: { en: 'Leo', vi: 'Sư Tử' },
    dates: { en: 'Jul 23 - Aug 22', vi: '23/07 - 22/08' },
    horoscopes: {
      en: 'SOLAR RADIANCE: Your inner sun is illuminating the void. A position of guidance is opening for you.',
      vi: 'HÀO QUANG THÁI DƯƠNG: Mặt trời nội tâm đang soi sáng hư vô. Một vị trí dẫn dắt đang chờ đón bạn.'
    },
    analysis: {
      en: {
        personality: ["Confident", "Noble", "Dramatic", "Warm"],
        thinking: ["Holistic", "Creative", "Inspired"],
        attractedTo: ["Devotion", "Integrity", "Vibrant souls"],
        attracts: ["Followers", "Creative kindreds"],
        career: ["Leader", "Performer", "King/Queen", "Artist"],
        needs: ["Recognition", "Joyful expression", "Light"]
      },
      vi: {
        personality: ["Tự tin", "Quý tộc", "Kịch tính", "Ấm áp"],
        thinking: ["Toàn diện", "Sáng tạo", "Đầy cảm hứng"],
        attractedTo: ["Sự tận tụy", "Sự chính trực", "Linh hồn rực rỡ"],
        attracts: ["Người dõi theo", "Tâm hồn sáng tạo"],
        career: ["Lãnh đạo", "Người biểu diễn", "Quân vương", "Nghệ sĩ"],
        needs: ["Sự công nhận", "Sự biểu đạt vui vẻ", "Ánh sáng"]
      }
    }
  },
  {
    id: 'virgo',
    symbol: '♍',
    names: { en: 'Virgo', vi: 'Xử Nữ' },
    dates: { en: 'Aug 23 - Sep 22', vi: '23/08 - 22/09' },
    horoscopes: {
      en: 'SACRED PURIFICATION: The shadows in your path are being cleared. Clarity is now within your spiritual reach.',
      vi: 'THANH TẨY THIÊNG LIÊNG: Những bóng tối trên đường đi đang được xóa bỏ. Sự minh mẫn đã ở trong tầm tay.'
    },
    analysis: {
      en: {
        personality: ["Analytical", "Pure", "Modest", "Diligent"],
        thinking: ["Discriminating", "Logical", "Systematic"],
        attractedTo: ["Wisdom", "Order", "Truth"],
        attracts: ["Those seeking clarity", "Growth-seekers"],
        career: ["Scholar", "Healer", "Archivist", "Analyst"],
        needs: ["Purity", "Service", "Clarity"]
      },
      vi: {
        personality: ["Phân tích", "Thanh khiết", "Khiêm nhường", "Siêng năng"],
        thinking: ["Phân biệt", "Logic", "Hệ thống"],
        attractedTo: ["Trí tuệ", "Trật tự", "Sự thật"],
        attracts: ["Người tìm sự minh bạch", "Người tìm sự trưởng thành"],
        career: ["Học giả", "Người chữa lành", "Người lưu trữ", "Nhà phân tích"],
        needs: ["Sự thanh khiết", "Sự phụng sự", "Sự minh mẫn"]
      }
    }
  },
  {
    id: 'libra',
    symbol: '♎',
    names: { en: 'Libra', vi: 'Thiên Bình' },
    dates: { en: 'Sep 23 - Oct 22', vi: '23/09 - 22/10' },
    horoscopes: {
      en: 'CELESTIAL HARMONY: Balance is being restored to your life. Expect a new soulful partnership to form.',
      vi: 'HÀI HÒA THIÊN HÀ: Sự cân bằng đang được khôi phục. Hãy chờ đợi một mối quan hệ tri kỷ mới.'
    },
    analysis: {
      en: {
        personality: ["Diplomatic", "Graceful", "Fair", "Balanced"],
        thinking: ["Aesthetic", "Compromising", "Ideal"],
        attractedTo: ["Elegance", "Kindness", "Intellect"],
        attracts: ["Strong souls", "Artists"],
        career: ["Mediator", "Artist", "Counselor", "Peacemaker"],
        needs: ["Union", "Harmony", "Graceful surroundings"]
      },
      vi: {
        personality: ["Ngoại giao", "Duyên dáng", "Công bằng", "Cân bằng"],
        thinking: ["Thẩm mỹ", "Thỏa hiệp", "Lý tưởng"],
        attractedTo: ["Sự thanh lịch", "Sự tử tế", "Trí tuệ"],
        attracts: ["Linh hồn mạnh mẽ", "Nghệ sĩ"],
        career: ["Người hòa giải", "Nghệ sĩ", "Cố vấn", "Người tạo hòa bình"],
        needs: ["Sự kết hợp", "Sự hài hòa", "Môi trường duyên dáng"]
      }
    }
  },
  {
    id: 'scorpio',
    symbol: '♏',
    names: { en: 'Scorpio', vi: 'Bọ Cạp' },
    dates: { en: 'Oct 23 - Nov 21', vi: '23/10 - 21/11' },
    horoscopes: {
      en: 'DEEP SOUL VISION: You see through the veils of the material world. Trust your intuition to find the hidden truth.',
      vi: 'TẦM NHÌN LINH HỒN: Bạn nhìn xuyên thấu những bức màn vật chất. Hãy tin vào trực giác để tìm thấy sự thật ẩn giấu.'
    },
    analysis: {
      en: {
        personality: ["Intense", "Resourceful", "Mysterious", "Profound"],
        thinking: ["Penetrating", "Deep", "Unyielding"],
        attractedTo: ["Secrets", "Faith", "Soul depth"],
        attracts: ["Truth-seekers", "Transformative spirits"],
        career: ["Shaman", "Investigator", "Alchemist", "Psychologist"],
        needs: ["Depth", "Trust", "Transformation"]
      },
      vi: {
        personality: ["Mãnh liệt", "Tháo vát", "Bí ẩn", "Sâu sắc"],
        thinking: ["Sâu cay", "Thâm trầm", "Kiên định"],
        attractedTo: ["Bí mật", "Đức tin", "Chiều sâu linh hồn"],
        attracts: ["Người tìm sự thật", "Linh hồn biến đổi"],
        career: ["Phù thủy/Thầy cúng", "Điều tra viên", "Nhà giả kim", "Nhà tâm lý"],
        needs: ["Chiều sâu", "Sự tin tưởng", "Sự biến đổi"]
      }
    }
  },
  {
    id: 'sagittarius',
    symbol: '♐',
    names: { en: 'Sagittarius', vi: 'Nhân Mã' },
    dates: { en: 'Nov 22 - Dec 21', vi: '22/11 - 21/12' },
    horoscopes: {
      en: 'SPIRITUAL EXPANSION: Your inner horizon is growing. Explore distant philosophies and seek high-level wisdom.',
      vi: 'MỞ RỘNG TÂM LINH: Chân trời nội tâm đang mở rộng. Hãy khám phá những triết lý xa xưa và tìm kiếm trí tuệ.'
    },
    analysis: {
      en: {
        personality: ["Optimistic", "Free", "Honest", "Wandering"],
        thinking: ["Philosophical", "Vast", "Ethical"],
        attractedTo: ["Authenticity", "Travelers", "Light"],
        attracts: ["Stagnant souls", "Fellow seekers"],
        career: ["Sage", "Pilgrim", "Teacher", "Philosopher"],
        needs: ["Freedom", "Meaning", "The Open Road"]
      },
      vi: {
        personality: ["Lạc quan", "Tự do", "Chân thật", "Phiêu du"],
        thinking: ["Triết học", "Bao la", "Đạo đức"],
        attractedTo: ["Sự chân thành", "Người lữ hành", "Ánh sáng"],
        attracts: ["Linh hồn trì trệ", "Người cùng tầm đạo"],
        career: ["Hiền triết", "Người hành hương", "Thầy giáo", "Triết gia"],
        needs: ["Sự tự do", "Ý nghĩa", "Con đường rộng mở"]
      }
    }
  },
  {
    id: 'capricorn',
    symbol: '♑',
    names: { en: 'Capricorn', vi: 'Ma Kết' },
    dates: { en: 'Dec 22 - Jan 19', vi: '22/12 - 19/01' },
    horoscopes: {
      en: 'DIVINE STRUCTURE: Your path is becoming clear. The architecture of your destiny is standing strong.',
      vi: 'CẤU TRÚC THIÊNG LIÊNG: Con đường của bạn đang trở nên rõ ràng. Kiến trúc định mệnh của bạn đang rất vững vàng.'
    },
    analysis: {
      en: {
        personality: ["Ambitious", "Disciplined", "Wise", "Patient"],
        thinking: ["Strategic", "Practical", "Old Soul"],
        attractedTo: ["Duty", "Legacy", "Stature"],
        attracts: ["Those needing guidance", "Architects of life"],
        career: ["Elder", "Builder", "Leader", "Guardian"],
        needs: ["Purpose", "Structure", "Honor"]
      },
      vi: {
        personality: ["Tham vọng", "Kỷ luật", "Thông thái", "Kiên nhẫn"],
        thinking: ["Chiến lược", "Thực tế", "Linh hồn cổ xưa"],
        attractedTo: ["Bổn phận", "Di sản", "Vị thế"],
        attracts: ["Người cần chỉ dẫn", "Người xây dựng cuộc đời"],
        career: ["Trưởng lão", "Người xây dựng", "Lãnh đạo", "Người bảo hộ"],
        needs: ["Mục đích", "Cấu trúc", "Danh dự"]
      }
    }
  },
  {
    id: 'aquarius',
    symbol: '♒',
    names: { en: 'Aquarius', vi: 'Bảo Bình' },
    dates: { en: 'Jan 20 - Feb 18', vi: '20/01 - 18/02' },
    horoscopes: {
      en: 'ASTRA REVELATION: A radical shift in your soul’s frequency is occurring. Embrace the divine unique path.',
      vi: 'KHAI TÂM THIÊN HÀ: Một sự thay đổi triệt để trong tần số linh hồn đang diễn ra. Hãy chấp nhận con đường độc bản.'
    },
    analysis: {
      en: {
        personality: ["Original", "Independent", "Detached", "Kind"],
        thinking: ["Futuristic", "Unorthodox", "Vast"],
        attractedTo: ["Singularity", "Intellect", "Freedom"],
        attracts: ["Awakened souls", "Visionaries"],
        career: ["Innovator", "Social Shaman", "Oracle", "Seer"],
        needs: ["Individuality", "Humanity", "Progress"]
      },
      vi: {
        personality: ["Độc bản", "Độc lập", "Tách biệt", "Tử tế"],
        thinking: ["Hướng tương lai", "Phá cách", "Bao la"],
        attractedTo: ["Sự duy nhất", "Trí tuệ", "Tự do"],
        attracts: ["Linh hồn thức tỉnh", "Người có tầm nhìn"],
        career: ["Người đổi mới", "Thầy pháp xã hội", "Nhà tiên tri", "Người thấu thị"],
        needs: ["Cá tính", "Nhân tính", "Sự tiến bộ"]
      }
    }
  },
  {
    id: 'pisces',
    symbol: '♓',
    names: { en: 'Pisces', vi: 'Song Ngư' },
    dates: { en: 'Feb 19 - Mar 20', vi: '19/02 - 20/03' },
    horoscopes: {
      en: 'DIVINE DREAMING: Your inner visions are blending with the cosmos. Navigate the mists with total compassion.',
      vi: 'GIẤC MƠ THIÊNG LIÊNG: Những linh cảm nội tâm đang hòa quyện với vũ trụ. Hãy định hướng trong làn sương bằng lòng trắc ẩn.'
    },
    analysis: {
      en: {
        personality: ["Compassionate", "Soulful", "Dreaming", "Deep"],
        thinking: ["Fluid", "Intuitive", "Spiral"],
        attractedTo: ["Spirit", "Sacred Arts", "Mystery"],
        attracts: ["Seeking healing", "Logic-bound souls needing magic"],
        career: ["Mystic", "Healer", "Artist", "Spiritual Companion"],
        needs: ["Transcendence", "Spirit connection", "Surrender"]
      },
      vi: {
        personality: ["Trắc ẩn", "Tâm hồn", "Mơ mộng", "Sâu sắc"],
        thinking: ["Linh hoạt", "Trực giác", "Hình xoắn ốc"],
        attractedTo: ["Tâm linh", "Nghệ thuật thánh", "Bí ẩn"],
        attracts: ["Người tìm chữa lành", "Linh hồn lý trí cần phép màu"],
        career: ["Nhà thần bí", "Người chữa lành", "Nghệ sĩ", "Bạn đồng hành tâm linh"],
        needs: ["Sự siêu việt", "Kết nối tâm linh", "Sự buông bỏ"]
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
      "CELESTIAL HARMONY: Your souls resonate in eternal alignment.",
      "HIGH SPIRITUAL FREQUENCY: Strong connection across all planes.",
      "SACRED BOND: Deep compatibility written in the stars.",
      "OPTIMIZED ALIGNMENT: Your spiritual paths complement each other.",
      "SOUL RESONANCE: A powerful link bypassing all barriers.",
      "ETHEREAL MATCH: Fundamental spiritual alignment detected.",
      "ASCENDED SYNC: No distance in your spiritual connection."
    ],
    vi: [
      "HÀI HÒA THIÊN HÀ: Linh hồn các bạn cộng hưởng trong sự hòa hợp vĩnh cửu.",
      "TẦN SỐ TÂM LINH CAO: Kết nối mạnh mẽ trên mọi cõi.",
      "LIÊN KẾT THIÊNG LIÊNG: Sự tương hợp sâu sắc được viết trên những vì sao.",
      "CĂN CHỈNH TỐI ƯU: Con đường tâm linh của các bạn bổ trợ cho nhau.",
      "CỘNG HƯỞNG LINH HỒN: Một liên kết mạnh mẽ vượt qua mọi rào cản.",
      "KHỚP NHAU ASTRAL: Phát hiện sự căn chỉnh tâm linh cơ bản.",
      "ĐỒNG BỘ THĂNG HOA: Không có khoảng cách trong kết nối tâm linh."
    ]
  };
  const descIndex = Math.abs(hash % descriptions[lang].length);
  return { score, text: descriptions[lang][descIndex] };
}