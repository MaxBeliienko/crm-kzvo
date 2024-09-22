import { useTranslation } from 'react-i18next';
import ukr from '../../images/ukraine.png';
import eng from '../../images/eng.png';

const LocalizationSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };
  return (
    <div>
      <button onClick={() => changeLanguage('en')}>
        {<img src={eng} alt="English" width={50} />}
      </button>
      <button onClick={() => changeLanguage('ukr')}>
        {<img src={ukr} alt="English" width={40} />}
      </button>
    </div>
  );
};

export default LocalizationSwitcher;
