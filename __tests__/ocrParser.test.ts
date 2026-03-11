import {parseOcrText} from '../src/services/ocr/ocrService';

test('extracts key fields from OCR text', () => {
  const result = parseOcrText('John Doe\nKriya Biosys Pvt Ltd\n+91 9876543210\njohn@kriya.com\nkriya.com');
  expect(result.email).toBe('john@kriya.com');
  expect(result.phone).toContain('9876543210');
});
