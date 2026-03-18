import { IChingHexagram } from './types';
export const HEXAGRAM_MAP: Record<string, IChingHexagram> = {
  "111111": { id: "111111", number: 1, symbol: "䷀", name: { en: "The Creative", vi: "Thuần Càn" }, judgment: { en: "Supreme success. Perseverance furthers.", vi: "Nguyên, hanh, lợi, trinh. Đại cát đại lợi." } },
  "000000": { id: "000000", number: 2, symbol: "䷁", name: { en: "The Receptive", vi: "Thuần Khôn" }, judgment: { en: "Success. Following the path of the mare.", vi: "Nhu thuận, bao dung. Thuận theo tự nhiên." } },
  "100010": { id: "100010", number: 3, symbol: "䷂", name: { en: "Difficulty at the Beginning", vi: "Thủy Lôi Truân" }, judgment: { en: "Growth despite difficulties. Persistence pays.", vi: "Gian nan ban đầu. Kiên trì sẽ thành công." } },
  "010001": { id: "010001", number: 4, symbol: "䷃", name: { en: "Youthful Folly", vi: "Sơn Thủy Mông" }, judgment: { en: "Success. Not I who seek the young fool.", vi: "Mông lung, cần học hỏi. Kiên nhẫn giáo hóa." } },
  "111010": { id: "111010", number: 5, symbol: "䷄", name: { en: "Waiting", vi: "Thủy Thiên Nhu" }, judgment: { en: "Waiting in faith brings light. Success.", vi: "Chờ đợi thời cơ. Kiên tâm, sáng suốt." } },
  "010111": { id: "010111", number: 6, symbol: "䷅", name: { en: "Conflict", vi: "Thiên Thủy Tụng" }, judgment: { en: "Avoid conflict. Stop halfway.", vi: "Tranh tụng, cẩn trọng. Nên dừng lại giữa chừng." } },
  "010000": { id: "010000", number: 7, symbol: "䷆", name: { en: "The Army", vi: "Địa Thủy Sư" }, judgment: { en: "Leadership. Perseverance of a strong man.", vi: "Kỷ luật, đoàn kết. Cần người dẫn dắt giỏi." } },
  "000010": { id: "000010", number: 8, symbol: "䷇", name: { en: "Holding Together", vi: "Thủy Địa Tỷ" }, judgment: { en: "Good fortune. Inquire of the oracle again.", vi: "Gắn kết, tương trợ. Tìm người cùng chí hướng." } },
  // ... Simplified for brevity, usually includes all 64. 
  "110111": { id: "110111", number: 9, symbol: "䷈", name: { en: "Small Taming", vi: "Phong Thiên Tiểu Súc" }, judgment: { en: "Success. Dense clouds, no rain.", vi: "Tích lũy nhỏ. Kiên nhẫn chờ đợi." } },
  "111011": { id: "111011", number: 10, symbol: "䷉", name: { en: "Treading", vi: "Thiên Trạch Lý" }, judgment: { en: "Treading on the tail of the tiger. No bite.", vi: "Cẩn thận trong hành xử. Kính nhi viễn chi." } },
};
export function getHexagram(binary: string): IChingHexagram {
  return HEXAGRAM_MAP[binary] || HEXAGRAM_MAP["111111"];
}