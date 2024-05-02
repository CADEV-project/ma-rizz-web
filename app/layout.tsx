import Script from 'next/script';
import type { Metadata, Viewport } from 'next/types';

import './global.css';

import { Provider } from '@/(client)/component';
import { combinedFontFamily } from '@/(client)/util';

import { SERVER_SETTINGS } from '@/setting';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: '두루두루 | Duruduru',
  description: '두루두루, 친환경 배변봉투를 무료로 드립니다!',
  metadataBase: new URL(SERVER_SETTINGS.DOMAIN),
};

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <body style={{ fontFamily: combinedFontFamily }}>
        <link rel='icon' href='/favicons/favicon.ico' sizes='any' />
        <div id='global-layout'>
          <Provider>{children}</Provider>
        </div>
      </body>
      <Script src='//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js' />
    </html>
  );
};

export default Layout;
