import { cookies } from 'next/headers';
import type { Metadata, Viewport } from 'next/types';

import './global.css';
import styles from './layout.module.scss';

import { Provider } from '@/(client)/components';
import { themeModeStore } from '@/(client)/stores';
import { combinedFontFamily } from '@/(client)/utils';

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
  title: 'MaRizz | 마리즈',
  description: '더 매력적인 나를 위한 마리즈',
  metadataBase: new URL(SERVER_SETTINGS.DOMAIN),
};

const getThemeMode = () => {
  const cookieStore = cookies();

  const themeModeCookie = cookieStore.get(COOKIE_KEY.themeMode);

  if (!themeModeCookie) {
    cookieStore.set(COOKIE_KEY.themeMode, DEFAULT_THEME_MODE);
  }

  const themeMode = (themeModeCookie!.value || DEFAULT_THEME_MODE) as ThemeMode;

  const { initialize } = themeModeStore.getState();

  initialize(themeMode);

  return themeMode;
};

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const themeMode = getThemeMode();

  return (
    <html lang='en' data-theme={themeMode}>
      <link rel='icon' href='/favicons/favicon.ico' sizes='any' />
      <body style={{ fontFamily: combinedFontFamily }}>
        <Provider>
          <div className={styles.scrollableLayout}>
            <div className={styles.maxWidthLayout}>
              <div className={styles.backgroundLayout}>
                {/* <Header /> */}
                <main className={styles.main}>{children}</main>
                {/* <Footer /> */}
              </div>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
