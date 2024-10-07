import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {
  sidebarText,
  goodsTableText,
  notFoundText,
  toastText,
  productText,
  removeText,
  categoriesText,
  devicesText,
  signUpText,
  signInText,
  dropdownMenuText,
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
            product: productText.en,
            remove: removeText.en,
            notFound: notFoundText.en,
            toast: toastText.en,
            categories: categoriesText.en,
            devices: devicesText.en,
            signUp: signUpText.en,
            signIn: signInText.en,
            dropdown: dropdownMenuText.en,
          },
        },
      },
      ukr: {
        translation: {
          description: {
            sidebar: sidebarText.ukr,
            goodsTable: goodsTableText.ukr,
            product: productText.ukr,
            remove: removeText.ukr,
            notFound: notFoundText.ukr,
            toast: toastText.ukr,
            categories: categoriesText.ukr,
            devices: devicesText.ukr,
            signUp: signUpText.ukr,
            signIn: signInText.ukr,
            dropdown: dropdownMenuText.ukr,
          },
        },
      },
    },
  });

export default i18n;
