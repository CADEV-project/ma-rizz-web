import { Noto_Sans, Noto_Sans_KR } from 'next/font/google';

const notoSans = Noto_Sans({
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans',
  subsets: ['latin'],
});

const notoSansKR = Noto_Sans_KR({
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans-kr',
  subsets: ['latin'],
});

export const combinedFontFamily = [notoSans.style.fontFamily, notoSansKR.style.fontFamily].join(
  ', '
);
