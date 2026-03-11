export interface OcrResult {
  name?: string;
  company?: string;
  phone?: string;
  email?: string;
  website?: string;
  country?: string;
  confidence: number;
}

const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const phoneRegex = /(\+?\d[\d\s\-()]{7,}\d)/;
const webRegex = /(https?:\/\/)?([\w-]+\.)+[\w-]{2,}/i;

export const parseOcrText = (text: string): OcrResult => {
  const lines = text.split(/\n|\r/).map(l => l.trim()).filter(Boolean);
  const email = lines.find(l => emailRegex.test(l))?.match(emailRegex)?.[0];
  const phone = lines.find(l => phoneRegex.test(l))?.match(phoneRegex)?.[0];
  const website = lines.find(l => webRegex.test(l))?.match(webRegex)?.[0];
  const company = lines.find(l => /(ltd|llp|inc|biosys|corp|private)/i.test(l));
  const name = lines.find(l => /^[A-Za-z .'-]{3,}$/.test(l) && l !== company);
  return {name, company, phone, email, website, confidence: [name, email, phone].filter(Boolean).length / 3};
};

export const runVisitingCardOcr = async (_localImagePath: string): Promise<OcrResult> => {
  return {confidence: 0};
};
