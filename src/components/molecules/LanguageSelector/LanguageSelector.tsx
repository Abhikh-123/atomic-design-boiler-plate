import React, { type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { GlobalOutlined } from '@ant-design/icons';

interface LanguageOption {
  code: string;
  lang: string;
}

const languages: LanguageOption[] = [
  { code: 'en', lang: 'English' },
  // { code: "fr", lang: "French" },
  { code: 'hi', lang: 'हिन्दी' },
  // { code: "ar", lang: "Arabic" },
];

const LanguageSelector: React.FC = () => {
  // const { theme } = useTheme();
  const { i18n } = useTranslation();

  //   useEffect(() => {
  //     document.body.dir = i18n.dir()
  //   }, [i18n.language]);

  const changeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    i18n.changeLanguage(selectedLang);
  };

  return (
    <div className="dropdown-container">
      <label>
        <span style={{ marginRight: '5px' }}>
          <GlobalOutlined />
        </span>

        <select value={i18n.language} onChange={changeLanguage}>
          {languages.map((lng) => (
            <option key={lng.code} value={lng.code}>
              {lng.lang}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default LanguageSelector;
