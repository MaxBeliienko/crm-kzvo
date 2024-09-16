import { useTranslation } from 'react-i18next';

const LocalizationSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };
  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('ukr')}>Українська</button>
    </div>
  );
};

export default LocalizationSwitcher;
