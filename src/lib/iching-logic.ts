import { IChingLineType } from '@shared/types';
export function castLine(): IChingLineType {
  // Traditional Yarrow Stalk Probabilities:
  // 6 (Old Yin) - 1/16
  // 7 (Young Yang) - 5/16
  // 8 (Young Yin) - 7/16
  // 9 (Old Yang) - 3/16
  const r = Math.random() * 16;
  if (r < 1) return 6;
  if (r < 6) return 7;
  if (r < 13) return 8;
  return 9;
}
export function getBinaryBit(line: IChingLineType): string {
  // Yang is 1, Yin is 0
  return (line === 7 || line === 9) ? "1" : "0";
}
export function getTransformedBit(line: IChingLineType): string {
  // If moving (6 or 9), flip. If stable (7 or 8), stay.
  if (line === 6) return "1"; // Old Yin (0) -> Yang (1)
  if (line === 9) return "0"; // Old Yang (1) -> Yin (0)
  return getBinaryBit(line);
}
export function generateHexagrams(lines: IChingLineType[]) {
  const mainBinary = lines.map(getBinaryBit).reverse().join("");
  const transBinary = lines.map(getTransformedBit).reverse().join("");
  return { mainBinary, transBinary };
}