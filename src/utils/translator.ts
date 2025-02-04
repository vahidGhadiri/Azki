const enToFa: Record<string, string> = {
  '1': '۱',
  '2': '۲',
  '3': '۳',
  '4': '۴',
  '5': '۵',
  '6': '۶',
  '7': '۷',
  '8': '۸',
  '9': '۹',
  '0': '۰',
};

export default function translator(text: string | number | undefined): string {
  if (text === '' || text === undefined || text === null) return ''
  const str = String(text);
  return str.replace(/[0-9]/g, (match) => enToFa[match]);
}
