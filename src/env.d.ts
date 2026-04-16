/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_ADSENSE_CLIENT_ID?: string;
  readonly PUBLIC_ADSENSE_SLOT_HOME_TOP?: string;
  readonly PUBLIC_ADSENSE_SLOT_POST_TOP?: string;
  readonly PUBLIC_ADSENSE_SLOT_POST_BOTTOM?: string;
  readonly PUBLIC_CONTACT_EMAIL?: string;
  readonly PUBLIC_GA_MEASUREMENT_ID?: string;
  readonly PUBLIC_KAKAO_APP_KEY?: string;
  readonly PUBLIC_OAUTH_WORKER_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    __somiriAdsInit?: boolean;
    gtag?: (...args: unknown[]) => void;
  }
}

export {};
