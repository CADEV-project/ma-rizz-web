import { cookies } from 'next/headers';
import type { Metadata, Viewport } from 'next/types';

import './global.scss';
import styles from './layout.module.scss';

import { Provider } from '@/(client)/components';
import { combinedFontFamily } from '@/(client)/utils';

import { Footer, Header } from '@/(client)/components/layout';

import { COOKIE_KEY, DEFAULT_THEME_MODE, ThemeMode } from '@/constant';
import { SERVER_SETTINGS } from '@/setting';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'MARIZZ | 마리즈',
  description: '나에게 집중하는법, 마리즈',
  keywords: '마리즈, MaRizz, 비서, 일정관리, 아이젠하워, 아이젠하워매트릭스, 습관, AI',
  metadataBase: new URL(SERVER_SETTINGS.DOMAIN),
};

const getCookieValues = () => {
  const cookieStore = cookies();

  const themeModeCookie = cookieStore.get(COOKIE_KEY.themeMode);

  const themeMode = (themeModeCookie?.value ?? DEFAULT_THEME_MODE) as ThemeMode;

  return { themeMode };
};

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { themeMode } = getCookieValues();

  return (
    <html lang='ko' data-theme={themeMode}>
      <link rel='manifest' href='/favicons/manifest.json' />
      <link rel='apple-touch-icon' sizes='57x57' href='/favicons/apple-icon-57x57.png' />
      <link rel='apple-touch-icon' sizes='60x60' href='/favicons/apple-icon-60x60.png' />
      <link rel='apple-touch-icon' sizes='72x72' href='/favicons/apple-icon-72x72.png' />
      <link rel='apple-touch-icon' sizes='76x76' href='/favicons/apple-icon-76x76.png' />
      <link rel='apple-touch-icon' sizes='114x114' href='/favicons/apple-icon-114x114.png' />
      <link rel='apple-touch-icon' sizes='120x120' href='/favicons/apple-icon-120x120.png' />
      <link rel='apple-touch-icon' sizes='144x144' href='/favicons/apple-icon-144x144.png' />
      <link rel='apple-touch-icon' sizes='152x152' href='/favicons/apple-icon-152x152.png' />
      <link rel='apple-touch-icon' sizes='180x180' href='/favicons/apple-icon-180x180.png' />
      <link rel='icon' type='image/png' sizes='192x192' href='/favicons/android-icon-192x192.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/favicons/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='96x96' href='/favicons/favicon-96x96.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/favicons/favicon-16x16.png' />
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='msapplication-TileImage' content='/favicons/ms-icon-144x144.png' />
      <meta name='theme-color' content='#ffffff' />
      <body style={{ fontFamily: combinedFontFamily }}>
        <Provider themeMode={themeMode}>
          <div className={styles.scrollableLayout}>
            <div className={styles.maxWidthLayout}>
              <Header />
              <main className={styles.main}>{children}</main>
              <Footer />
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
