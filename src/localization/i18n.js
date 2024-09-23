import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {
  sidebarText,
  goodsTableText,
  notFoundText,
  toastText,
} from './localization';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'ukr',
    resources: {
      en: {
        translation: {
          description: {
            sidebar: sidebarText.en,
            goodsTable: goodsTableText.en,
            notFound: notFoundText.en,
            toast: toastText.ukr,
          },
        },
      },
      ukr: {
        translation: {
          description: {
            sidebar: sidebarText.ukr,
            goodsTable: goodsTableText.ukr,
            notFound: notFoundText.ukr,
            toast: toastText.ukr,
          },
        },
      },
    },
  });

export default i18n;
