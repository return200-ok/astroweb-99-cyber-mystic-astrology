import { Wuxing } from './types';
export const TUVI_MAIN_STARS = [
  { name: 'Tử Vi', wuxing: 'Thổ' as Wuxing },
  { name: 'Liêm Trinh', wuxing: 'Hỏa' as Wuxing },
  { name: 'Thiên Đồng', wuxing: 'Thủy' as Wuxing },
  { name: 'Vũ Khúc', wuxing: 'Kim' as Wuxing },
  { name: 'Thái Dương', wuxing: 'Hỏa' as Wuxing },
  { name: 'Thiên Cơ', wuxing: 'Mộc' as Wuxing },
  { name: 'Thiên Phủ', wuxing: 'Thổ' as Wuxing },
  { name: 'Thái Âm', wuxing: 'Thủy' as Wuxing },
  { name: 'Tham Lang', wuxing: 'Thủy' as Wuxing },
  { name: 'Cự Môn', wuxing: 'Thủy' as Wuxing },
  { name: 'Thiên Tướng', wuxing: 'Thủy' as Wuxing },
  { name: 'Thiên Lương', wuxing: 'Mộc' as Wuxing },
  { name: 'Thất Sát', wuxing: 'Kim' as Wuxing },
  { name: 'Phá Quân', wuxing: 'Thủy' as Wuxing },
];
export const PALACE_ORDER_VN = [
  'Mệnh', 'Phụ Mẫu', 'Phúc Đức', 'Điền Trạch', 'Quan Lộc', 'Nô Bộc',
  'Thiên Di', 'Tật Ách', 'Tài Bạch', 'Tử Tức', 'Phu Thê', 'Huynh Đệ'
];
export const EARTHLY_BRANCHES = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
export const HEAVENLY_STEMS = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
export const WUXING_COLORS: Record<Wuxing, string> = {
  'Kim': '#FFFFFF',
  'Mộc': '#22C55E',
  'Thủy': '#3B82F6',
  'Hỏa': '#EF4444',
  'Thổ': '#EAB308',
};
export const TUVI_PALACE_WUXING: Wuxing[] = [
  'Thủy', 'Thổ', 'Mộc', 'Mộc', 'Thổ', 'Hỏa', 'Hỏa', 'Thổ', 'Kim', 'Kim', 'Thổ', 'Thủy'
];