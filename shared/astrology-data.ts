import type { ZodiacSign, Language, I18nDictionary, PersonalityQuestion, BigFiveTrait, EnneagramQuestion, EnneagramType, EnneagramMetadata } from './types';
export const I18N: Record<Language, I18nDictionary> = {
  en: {
    terminalTitle: "Astral Terminal",
    terminalSub: "SELECT YOUR COSMIC IDENTIFIER TO BEGIN UPLINK",
    navTerminal: "TERMINAL",
    navMatchmaker: "MATCHMAKER",
    navBBS: "COSMIC BBS",
    navTest: "PSYCHO-SCAN",
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
    testTitle: "Psycho-Cybernetic Scan",
    testSub: "NEURAL MAPPING & CORE TRAIT EXTRACTION",
    questionCount: "PACKET",
    resultProfile: "NEURAL_SIGNATURE_FOUND",
    traitHigh: "High Activity",
    traitLow: "Low Activity",
    restartTest: "PURGE & RE-SCAN",
    likert1: "Strongly Disagree",
    likert2: "Disagree",
    likert3: "Neutral",
    likert4: "Agree",
    likert5: "Strongly Agree",
    enneagramMode: "ENNEAGRAM_V9",
    bigFiveMode: "OCEAN_V5",
    coreType: "CORE_TYPE",
    activeWing: "ACTIVE_WING",
    typeProfile: "NEURAL_PROFILE",
    adviceProtocol: "ADVICE_PROTOCOL",
    navTuvi: "TỬ VI",
    tuviTitle: "Astral Imperial",
    tuviSub: "EASTERN CELESTIAL MAPPING v9.0",
    birthDate: "D.O.B",
    birthHour: "HOUR_BRANCH",
    lunarDate: "LUNAR_SYNC",
    ownerName: "ENTITY_ID",
    calculateChart: "CAST_CHART",
    palaceNames: PALACE_ORDER_VN,
    starNames: {},
  },
  vi: {
    terminalTitle: "Trạm Astral",
    terminalSub: "CHỌN ĐỊNH DANH VŨ TRỤ ĐỂ BẮT ĐẦU KẾT NỐI",
    navTerminal: "TRẠM CUỐI",
    navMatchmaker: "KẾT ĐÔI",
    navBBS: "BẢN TIN VŨ TRỤ",
    navTest: "QUÉT TÂM LÝ",
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
    testTitle: "Quét Tâm Lý Cyber",
    testSub: "BẢN ĐỒ THẦN KINH & TRÍCH XUẤT ĐẶC ĐIỂM CỐT LÕI",
    questionCount: "GÓI TIN",
    resultProfile: "ĐÃ_TÌM_THẤY_CHỮ_KÝ_THẦN_KINH",
    traitHigh: "Hoạt động mạnh",
    traitLow: "Hoạt động yếu",
    restartTest: "XÓA & QUÉT LẠI",
    likert1: "Rất không đồng ý",
    likert2: "Không đồng ý",
    likert3: "Trung lập",
    likert4: "Đồng ý",
    likert5: "Rất đồng ý",
    enneagramMode: "ENNEAGRAM_V9",
    bigFiveMode: "OCEAN_V5",
    coreType: "KIỂU_CHÍNH",
    activeWing: "CÁNH_HOẠT_ĐỘNG",
    typeProfile: "HỒ_SƠ_THẦN_KINH",
    adviceProtocol: "GIAO_THỨC_LỜI_KHUYÊN",
    navTuvi: "TỬ VI",
    tuviTitle: "Tử Vi Đẩu Số",
    tuviSub: "BẢN ĐỒ THIÊN HÀ PHƯƠNG ĐÔNG v9.0",
    birthDate: "NGÀY SINH",
    birthHour: "GIỜ SINH",
    lunarDate: "ÂM LỊCH",
    ownerName: "TÊN GIA CHỦ",
    calculateChart: "LẬP LÁ SỐ",
    palaceNames: PALACE_ORDER_VN,
    starNames: {},
  }
};
export const ENNEAGRAM_METADATA: Record<EnneagramType, EnneagramMetadata> = {
  1: {
    name: { en: "The Reformer", vi: "Người Cầu Toàn" },
    title: { en: "PERFECTION_PROTOCOL_ACTIVE", vi: "GIAO_THỨC_HOÀN_HẢO_KÍCH_HOẠT" },
    description: { en: "Rational, idealistic type. Principled, purposeful, self-controlled, and perfectionistic.", vi: "Kiểu người lý trí, lý tưởng. Nguyên tắc, mục đích, tự kiểm soát và cầu toàn." },
    advice: { en: "System optimization requires accepting legacy glitches. Don't let the pursuit of 'Perfect' crash the 'Good'.", vi: "Tối ưu hóa hệ thống đòi hỏi chấp nhận các lỗi cũ. Đừng để việc theo đuổi 'Hoàn hảo' làm sập cái 'Tốt'." }
  },
  2: {
    name: { en: "The Helper", vi: "Người Giúp Đỡ" },
    title: { en: "SUPPORT_NODE_ONLINE", vi: "NÚT_HỖ_TRỢ_TRỰC_TUYẾN" },
    description: { en: "Caring, interpersonal type. Demonstrative, generous, people-pleasing, and possessive.", vi: "Kiểu người quan tâm, giao tiếp. Thể hiện, hào phóng, làm hài lòng mọi người và sở hữu." },
    advice: { en: "Resource allocation warning: Your internal battery requires recharging. Support others only after self-maintenance.", vi: "Cảnh báo phân bổ nguồn lực: Pin nội bộ của bạn cần sạc lại. Chỉ hỗ trợ người khác sau khi bảo trì bản thân." }
  },
  3: {
    name: { en: "The Achiever", vi: "Người Thành Đạt" },
    title: { en: "PERFORMANCE_MAXIMIZER", vi: "BỘ_TỐI_ƯU_HÓA_HIỆU_SUẤT" },
    description: { en: "Success-oriented, pragmatic type. Adaptive, excelling, driven, and image-conscious.", vi: "Kiểu người thực dụng, hướng tới thành công. Thích nghi, xuất sắc, năng nổ và chú trọng hình ảnh." },
    advice: { en: "User metrics aren't everything. Validation from external servers is high-latency; find value in local execution.", vi: "Các số liệu người dùng không phải là tất cả. Xác thực từ máy chủ bên ngoài có độ trễ cao; hãy tìm giá trị trong thực thi nội bộ." }
  },
  4: {
    name: { en: "The Individualist", vi: "Người Cá Tính" },
    title: { en: "UNIQUE_SIGNATURE_DETECTED", vi: "PHÁT_HIỆN_CHỮ_KÝ_ĐỘC_BẢN" },
    description: { en: "Sensitive, withdrawn type. Expressive, dramatic, self-absorbed, and temperamental.", vi: "Kiểu người nhạy cảm, thu mình. Biểu cảm, kịch tính, tự hấp thụ và khí chất." },
    advice: { en: "Data patterns are unique, but don't isolate from the network. Melancholy is a filter, not the entire OS.", vi: "Các mẫu dữ liệu là duy nhất, nhưng đừng cô lập khỏi mạng lưới. U sầu là một bộ lọc, không phải toàn bộ hệ điều hành." }
  },
  5: {
    name: { en: "The Investigator", vi: "Người Quan Sát" },
    title: { en: "DATA_MINER_V5", vi: "TRÌNH_KHAI_THÁC_DỮ_LIỆU_V5" },
    description: { en: "Intense, cerebral type. Perceptive, innovative, secretive, and isolated.", vi: "Kiểu người cường độ cao, trí tuệ. Nhạy bén, đổi mới, kín đáo và cô lập." },
    advice: { en: "Information processing complete. Now initiate 'Action' command. Theoretical models require real-world testing.", vi: "Xử lý thông tin hoàn tất. Bây giờ hãy khởi chạy lệnh 'Hành động'. Các mô hình lý thuyết yêu cầu thử nghiệm thực tế." }
  },
  6: {
    name: { en: "The Loyalist", vi: "Người Trung Thành" },
    title: { en: "SECURITY_FIREWALL_LOADED", vi: "TƯỜNG_LỬA_AN_NINH_ĐÃ_TẢI" },
    description: { en: "Committed, security-oriented type. Reliable, hard-working, responsible, and anxious.", vi: "Kiểu người cam kết, hướng tới an ninh. Đáng tin cậy, chăm chỉ, trách nhiệm và lo âu." },
    advice: { en: "Internal alarm system is hyper-sensitive. Trust your core kernel; not every glitch is a system-wide threat.", vi: "Hệ thống báo động nội bộ cực kỳ nhạy cảm. Hãy tin vào nhân cốt lõi của bạn; không phải mọi lỗi nhỏ đều là mối đe dọa toàn hệ thống." }
  },
  7: {
    name: { en: "The Enthusiast", vi: "Người Nhiệt Huyết" },
    title: { en: "MULTI_THREAD_EXPLORER", vi: "TRÌNH_KHÁM_PHÁ_ĐA_LUỒNG" },
    description: { en: "Busy, fun-loving type. Spontaneous, versatile, acquisitive, and scattered.", vi: "Kiểu người bận rộn, yêu đời. Tự phát, linh hoạt, ham học hỏi và phân tán." },
    advice: { en: "Buffer overflow imminent. Limit concurrent tasks to find deep processing satisfaction. Quality over quantity.", vi: "Sắp xảy ra tràn bộ đệm. Hạn chế các tác vụ đồng thời để tìm thấy sự hài lòng trong xử lý sâu. Chất lượng hơn số lượng." }
  },
  8: {
    name: { en: "The Challenger", vi: "Người Thách Thức" },
    title: { en: "ROOT_ACCESS_COMMANDER", vi: "CHỈ_HUY_QUYỀN_ROOT" },
    description: { en: "Powerful, dominating type. Self-confident, decisive, willful, and confrontational.", vi: "Kiểu người mạnh mẽ, thống trị. Tự tin, quyết đoán, ý chí và đối đầu." },
    advice: { en: "Power levels are high. Use authority to protect the network nodes, not just to dominate the bandwidth.", vi: "Mức năng lượng đang cao. Hãy sử dụng quyền lực để bảo vệ các nút mạng, không chỉ để chiếm lĩnh băng thông." }
  },
  9: {
    name: { en: "The Peacemaker", vi: "Người Hòa Giải" },
    title: { en: "HARMONY_STABILIZER", vi: "BỘ_ỔN_ĐỊNH_HÀI_HÒA" },
    description: { en: "Easygoing, self-effacing type. Receptive, reassuring, agreeable, and complacent.", vi: "Kiểu người dễ tính, khiêm tốn. Dễ tiếp thu, trấn an, dễ chịu và tự mãn." },
    advice: { en: "System idle detected. Don't merge with the background; your unique signal is necessary for global balance.", vi: "Phát hiện hệ thống đang chờ. Đừng hòa lẫn vào nền; tín hiệu duy nhất của bạn là cần thiết cho sự cân bằng toàn cầu." }
  }
};
export const ENNEAGRAM_QUESTIONS: EnneagramQuestion[] = [
  // Type 1: Reformer
  { id: 101, type: 1, text: { en: "I strive for perfection in everything I do.", vi: "Tôi cố gắng đạt đến sự hoàn hảo trong mọi việc tôi làm." } },
  { id: 102, type: 1, text: { en: "I often feel a strong sense of right and wrong.", vi: "Tôi thường có cảm nhận mạnh mẽ về đúng và sai." } },
  { id: 103, type: 1, text: { en: "I am very critical of my own mistakes.", vi: "Tôi rất khắt khe với những sai lầm của chính mình." } },
  { id: 104, type: 1, text: { en: "I find it hard to relax when things are messy.", vi: "Tôi thấy khó thư giãn khi mọi thứ đang lộn xộn." } },
  { id: 105, type: 1, text: { en: "I believe there is a correct way to do most things.", vi: "Tôi tin rằng có một cách đúng đắn để làm hầu hết mọi việc." } },
  // Type 2: Helper
  { id: 201, type: 2, text: { en: "I enjoy taking care of other people's needs.", vi: "Tôi thích chăm sóc nhu cầu của người khác." } },
  { id: 202, type: 2, text: { en: "I want people to feel loved and appreciated by me.", vi: "Tôi muốn mọi người cảm thấy được yêu thương và trân trọng bởi tôi." } },
  { id: 203, type: 2, text: { en: "I find it hard to say 'no' when someone asks for help.", vi: "Tôi thấy khó nói 'không' khi ai đó yêu cầu giúp đỡ." } },
  { id: 204, type: 2, text: { en: "I often put others' needs before my own.", vi: "Tôi thường đặt nhu cầu của người khác lên trước nhu cầu của mình." } },
  { id: 205, type: 2, text: { en: "I feel good when I am needed by others.", vi: "Tôi cảm thấy tốt khi được người khác cần đến." } },
  // Type 3: Achiever
  { id: 301, type: 3, text: { en: "I am very focused on achieving my goals.", vi: "Tôi rất tập trung vào việc đạt được các mục tiêu của mình." } },
  { id: 302, type: 3, text: { en: "I care a lot about my public image and success.", vi: "Tôi quan tâm nhiều đến hình ảnh công chúng và thành công của mình." } },
  { id: 303, type: 3, text: { en: "I like to be the best at what I do.", vi: "Tôi thích trở thành người giỏi nhất trong việc mình làm." } },
  { id: 304, type: 3, text: { en: "I am very productive and efficient.", vi: "Tôi làm việc rất hiệu quả và năng suất." } },
  { id: 305, type: 3, text: { en: "I feel restless if I am not accomplishing something.", vi: "Tôi cảm thấy bồn chồn nếu không hoàn thành được việc gì đó." } },
  // Type 4: Individualist
  { id: 401, type: 4, text: { en: "I feel that I am fundamentally different from others.", vi: "Tôi cảm thấy mình khác biệt căn bản so với người khác." } },
  { id: 402, type: 4, text: { en: "I often experience deep and intense emotions.", vi: "Tôi thường trải qua những cảm xúc sâu sắc và mãnh liệt." } },
  { id: 403, type: 4, text: { en: "I value authenticity and self-expression highly.", vi: "Tôi coi trọng sự chân thực và tự biểu đạt cá nhân." } },
  { id: 404, type: 4, text: { en: "I tend to spend a lot of time in my own imagination.", vi: "Tôi có xu hướng dành nhiều thời gian trong trí tưởng tượng của mình." } },
  { id: 405, type: 4, text: { en: "I am drawn to things that are unique or melancholic.", vi: "Tôi bị thu hút bởi những thứ độc đáo hoặc đượm buồn." } },
  // Type 5: Investigator
  { id: 501, type: 5, text: { en: "I need a lot of private time to recharge.", vi: "Tôi cần nhiều thời gian riêng tư để nạp lại năng lượng." } },
  { id: 502, type: 5, text: { en: "I love gathering information and understanding how things work.", vi: "Tôi thích thu thập thông tin và hiểu cách mọi thứ vận hành." } },
  { id: 503, type: 5, text: { en: "I prefer to observe before participating in social situations.", vi: "Tôi thích quan sát trước khi tham gia vào các tình huống xã hội." } },
  { id: 504, type: 5, text: { en: "I value logic and objectivity over emotional reactions.", vi: "Tôi coi trọng logic và sự khách quan hơn là các phản ứng cảm xúc." } },
  { id: 505, type: 5, text: { en: "I often feel overwhelmed by too many social demands.", vi: "Tôi thường cảm thấy bị quá tải bởi quá nhiều yêu cầu xã hội." } },
  // Type 6: Loyalist
  { id: 601, type: 6, text: { en: "I often worry about what could go wrong.", vi: "Tôi thường lo lắng về những gì có thể xảy ra sai sót." } },
  { id: 602, type: 6, text: { en: "I value security and stability very highly.", vi: "Tôi coi trọng an ninh và sự ổn định rất cao." } },
  { id: 603, type: 6, text: { en: "I am very loyal to the people and groups I belong to.", vi: "Tôi rất trung thành với những người và hội nhóm mà mình thuộc về." } },
  { id: 604, type: 6, text: { en: "I often look for guidance or rules to feel safe.", vi: "Tôi thường tìm kiếm sự chỉ dẫn hoặc quy tắc để cảm thấy an toàn." } },
  { id: 605, type: 6, text: { en: "I am always scanning my environment for potential threats.", vi: "Tôi luôn rà soát môi trường xung quanh để tìm các mối đe dọa tiềm tàng." } },
  // Type 7: Enthusiast
  { id: 701, type: 7, text: { en: "I am always looking for new and exciting experiences.", vi: "Tôi luôn tìm kiếm những trải nghiệm mới và thú vị." } },
  { id: 702, type: 7, text: { en: "I find it hard to stay focused on one thing for long.", vi: "Tôi thấy khó tập trung vào một thứ trong thời gian dài." } },
  { id: 703, type: 7, text: { en: "I hate feeling trapped or limited in my choices.", vi: "Tôi ghét cảm giác bị mắc kẹt hoặc bị giới hạn trong các lựa chọn." } },
  { id: 704, type: 7, text: { en: "I tend to stay busy and plan many future activities.", vi: "Tôi có xu hướng luôn bận rộn và lên kế hoạch cho nhiều hoạt động tương lai." } },
  { id: 705, type: 7, text: { en: "I try to avoid painful or difficult feelings by staying positive.", vi: "Tôi cố gắng tránh những cảm xúc đau đớn bằng cách luôn tích cực." } },
  // Type 8: Challenger
  { id: 801, type: 8, text: { en: "I am not afraid of confrontation when I believe I am right.", vi: "Tôi không sợ đối đầu khi tôi tin rằng mình đúng." } },
  { id: 802, type: 8, text: { en: "I value strength and being in control of my life.", vi: "Tôi coi trọng sức mạnh và việc kiểm soát cuộc sống của mình." } },
  { id: 803, type: 8, text: { en: "I stand up for people who are being treated unfairly.", vi: "Tôi đứng lên bảo vệ những người bị đối xử bất công." } },
  { id: 804, type: 8, text: { en: "I prefer to lead rather than follow.", vi: "Tôi thích lãnh đạo hơn là đi theo." } },
  { id: 805, type: 8, text: { en: "I have a strong presence and speak my mind directly.", vi: "Tôi có sự hiện diện mạnh mẽ và nói thẳng suy nghĩ của mình." } },
  // Type 9: Peacemaker
  { id: 901, type: 9, text: { en: "I go along with others to avoid conflict.", vi: "Tôi thường chiều theo ý người khác để tránh xung đột." } },
  { id: 902, type: 9, text: { en: "I find it easy to see many different points of view.", vi: "Tôi thấy dễ dàng khi nhìn nhận từ nhiều góc độ khác nhau." } },
  { id: 903, type: 9, text: { en: "I value inner peace and harmony highly.", vi: "Tôi coi trọng sự bình an nội tâm và sự hài hòa." } },
  { id: 904, type: 9, text: { en: "I sometimes ignore my own needs to keep the peace.", vi: "Đôi khi tôi phớt lờ nhu cầu của chính mình để giữ hòa khí." } },
  { id: 905, type: 9, text: { en: "I find it hard to take a strong stand on controversial issues.", vi: "Tôi thấy khó khăn khi phải giữ lập trường mạnh mẽ trong các vấn đề gây tranh cãi." } },
];
export const TRAIT_METADATA: Record<BigFiveTrait, {
  name: Record<Language, string>,
  highDesc: Record<Language, string>,
  lowDesc: Record<Language, string>
}> = {
  openness: {
    name: { en: "Openness", vi: "Cởi Mở" },
    highDesc: { en: "High cognitive flexibility. User explores abstract subroutines and novel data architectures.", vi: "Linh hoạt nhận thức cao. Người dùng khám phá các quy trình trừu tượng và cấu trúc dữ liệu mới." },
    lowDesc: { en: "Prefers optimized legacy systems. High stability in routine processing.", vi: "Ưu tiên các hệ thống cũ đã tối ưu. Độ ổn định cao trong xử lý thói quen." }
  },
  conscientiousness: {
    name: { en: "Conscientiousness", vi: "Tận Tâm" },
    highDesc: { en: "Maximum system organization. High task completion rate with minimal checksum errors.", vi: "Tổ chức hệ thống tối đa. Tỷ lệ hoàn thành nhiệm vụ cao với lỗi kiểm tra tối thiểu." },
    lowDesc: { en: "Adaptive scheduling. System operates in a flexible, high-latency environment.", vi: "Lập trình thích ứng. Hệ thống hoạt động trong môi trường linh hoạt, độ trễ cao." }
  },
  extraversion: {
    name: { en: "Extraversion", vi: "Hướng Ngoại" },
    highDesc: { en: "Active network node. High energy output during inter-system communication.", vi: "Nút mạng hoạt động tích cực. Công suất năng lượng cao trong giao tiếp liên hệ thống." },
    lowDesc: { en: "Stand-alone processing. Optimized for deep background tasks and internal data flow.", vi: "Xử lý độc lập. Được tối ưu hóa cho các tác vụ nền sâu và luồng dữ liệu nội bộ." }
  },
  agreeableness: {
    name: { en: "Agreeableness", vi: "Dễ Chịu" },
    highDesc: { en: "High system compatibility. Optimized for cooperative multi-threading and harmony.", vi: "Độ tương thích hệ thống cao. Được tối ưu cho đa luồng hợp tác và sự hài hòa." },
    lowDesc: { en: "Analytical skepticism. Critical firewall active during data exchanges.", vi: "Sự hoài nghi phân tích. Tường lửa phê phán hoạt động trong quá trình trao đổi dữ liệu." }
  },
  neuroticism: {
    name: { en: "Neuroticism", vi: "Nhạy Cảm" },
    highDesc: { en: "Hyper-sensitive sensors. High reactivity to environment glitches and system noise.", vi: "Cảm biến cực nhạy. Phản ứng cao với các lỗi môi trường và nhiễu hệ thống." },
    lowDesc: { en: "Stable kernel architecture. Minimal emotional fluctuations during critical errors.", vi: "Kiến trúc nhân ổn định. Biến động cảm xúc tối thiểu trong các lỗi nghiêm trọng." }
  }
};
export const PERSONALITY_QUESTIONS: PersonalityQuestion[] = [
  { id: 1, trait: 'extraversion', text: { en: "I am the life of the party.", vi: "Tôi là tâm điểm của các bữa tiệc." } },
  { id: 2, trait: 'agreeableness', text: { en: "I feel little concern for others.", vi: "Tôi ít quan tâm đến người khác." }, isReverse: true },
  { id: 3, trait: 'conscientiousness', text: { en: "I am always prepared.", vi: "Tôi luôn chuẩn bị sẵn sàng." } },
  { id: 4, trait: 'neuroticism', text: { en: "I get stressed out easily.", vi: "Tôi dễ bị căng thẳng." } },
  { id: 5, trait: 'openness', text: { en: "I have a rich vocabulary.", vi: "Tôi có vốn từ vựng phong phú." } },
  { id: 6, trait: 'extraversion', text: { en: "I don't talk a lot.", vi: "Tôi không nói nhiều." }, isReverse: true },
  { id: 7, trait: 'agreeableness', text: { en: "I am interested in people.", vi: "Tôi quan tâm đến mọi người." } },
  { id: 8, trait: 'conscientiousness', text: { en: "I leave my belongings around.", vi: "Tôi hay để đồ đạc bừa bãi." }, isReverse: true },
  { id: 9, trait: 'neuroticism', text: { en: "I am relaxed most of the time.", vi: "Tôi hầu như luôn thấy thư giãn." }, isReverse: true },
  { id: 10, trait: 'openness', text: { en: "I have difficulty understanding abstract ideas.", vi: "Tôi khó hiểu được các ý tưởng trừu tượng." }, isReverse: true },
  { id: 11, trait: 'extraversion', text: { en: "I feel comfortable around people.", vi: "Tôi cảm thấy thoải mái khi ở cạnh mọi người." } },
  { id: 12, trait: 'agreeableness', text: { en: "I insult people.", vi: "Tôi hay xúc phạm người khác." }, isReverse: true },
  { id: 13, trait: 'conscientiousness', text: { en: "I pay attention to details.", vi: "Tôi chú ý đến các chi tiết." } },
  { id: 14, trait: 'neuroticism', text: { en: "I worry about things.", vi: "Tôi hay lo lắng về mọi thứ." } },
  { id: 15, trait: 'openness', text: { en: "I have a vivid imagination.", vi: "Tôi có trí tưởng tượng phong phú." } },
  { id: 16, trait: 'extraversion', text: { en: "I keep in the background.", vi: "Tôi thường giữ mình ở phía sau." }, isReverse: true },
  { id: 17, trait: 'agreeableness', text: { en: "I sympathize with others' feelings.", vi: "Tôi đồng cảm với cảm xúc của người khác." } },
  { id: 18, trait: 'conscientiousness', text: { en: "I make a mess of things.", vi: "Tôi hay làm mọi chuyện rối tung lên." }, isReverse: true },
  { id: 19, trait: 'neuroticism', text: { en: "I seldom feel blue.", vi: "Tôi hiếm khi cảm thấy buồn bã." }, isReverse: true },
  { id: 20, trait: 'openness', text: { en: "I am not interested in abstract ideas.", vi: "Tôi không quan tâm đến các ý tưởng trừu tượng." }, isReverse: true },
  { id: 21, trait: 'extraversion', text: { en: "I start conversations.", vi: "Tôi hay chủ động bắt chuyện." } },
  { id: 22, trait: 'agreeableness', text: { en: "I am not interested in other people's problems.", vi: "Tôi không quan tâm đến vấn đề của người khác." }, isReverse: true },
  { id: 23, trait: 'conscientiousness', text: { en: "I get chores done right away.", vi: "Tôi hoàn thành các công việc vặt ngay lập tức." } },
  { id: 24, trait: 'neuroticism', text: { en: "I am easily disturbed.", vi: "Tôi dễ bị làm phiền." } },
  { id: 25, trait: 'openness', text: { en: "I spend time reflecting on things.", vi: "Tôi dành thời gian suy ngẫm về mọi thứ." } }
];
export const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    id: 'aries',
    symbol: '♈',
    names: { en: 'Aries', vi: 'Bạch Dương' },
    dates: { en: 'Mar 21 - Apr 19', vi: '21/03 - 19/04' },
    horoscopes: {
      en: 'SYSTEM ALERT: Your energy levels are spiking. A new subroutine in your career path is initiating. Execute bold commands now.',
      vi: 'CẢNH BÁO HỆ THỐNG: Mức năng lượng của bạn đang tăng vọt. Một quy trình mới trong sự nghiệp đang bắt đầu. Thực thi ngay.'
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
      en: 'STABILITY DETECTED: Hard drive sectors are being optimized. Focus on material data acquisition and sensory comfort.',
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
      en: 'DUAL PROCESSING: Communication channels are buzzing. Expect incoming packets from multiple nodes simultaneously.',
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
      en: 'FIREWALL ACTIVE: Emotional defenses are high. Your inner database requires a deep backup and nurturing protocols.',
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
      en: 'MAINFRAME DOMINANCE: Your charisma is overloading the network. A leadership position is opening in your local hub.',
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
      en: 'DEBUGGING COMPLETE: All errors in your environment have been logged. Perfection is within your processing range.',
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
      en: 'LOAD BALANCER: Harmony is being restored to your workspace. Expect a new partnership request on your port.',
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
      en: 'DEEP PACKET INSPECTION: You see through encrypted layers. Trust your intuition to bypass firewall traps.',
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
      en: 'NETWORK EXPANSION: Your bandwidth is growing. Explore remote nodes and acquire new high-level philosophies.',
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
      en: 'UPTIME MAXIMIZED: Your efficiency is at record highs. The architectural structure of your life is verified [OK].',
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
      en: 'UPGRADE AVAILABLE: A radical new update to your personal OS is ready for installation. Embrace the glitch factor.',
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
      en: 'VIRTUAL REALITY: Your dreams are blending with real-world data. Navigate the mist with high-level compassion.',
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
      "KẾT NỐI BĂNG THÔNG CAO: Sự cộng hương mạnh mẽ trên mọi kênh.",
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