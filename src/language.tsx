import React, { useState } from "react";
import "./language-fonts.css";

export default {
  title: "Language Fonts"
};

export const LanguageFonts = () => {
  const [lang, setLang] = useState("");

  return (
    <div className="lang-container">
      <div className="lang-radio">
        <p>lang</p>
        <LangRadio lang="" langName="None (empty string)" curLang={lang} setLang={setLang} />
        <br />
        <LangRadio lang="zh" curLang={lang} setLang={setLang} />
      </div>
      <div id="chinese" lang={lang}>
        <div id="trad-chinese">
          <p>Traditional</p>
          <p>
            床前明月光
            <br />
            疑是地上霜
            <br />
            舉頭望明月
            <br />
            低頭思故鄉
            <br />
          </p>
        </div>
        <div id="simp-chinese">
          <p>Simplified</p>
          <p>
            床前明月光
            <br />
            疑是地上霜
            <br />
            举头望明月
            <br />
            低头思故乡
            <br />
          </p>
        </div>
      </div>
    </div>
  );
};

interface LangRadioProps {
  lang: string;
  langName?: string;
  curLang: string;
  setLang: (lang: string) => void;
}

const LangRadio: React.FC<LangRadioProps> = ({ lang, langName, curLang, setLang }) => {
  const displayName = langName ?? lang;

  return (
    <>
      <input
        type="radio"
        checked={curLang === lang}
        value={displayName}
        name="lang"
        id={displayName}
        onChange={event => {
          if (event.target.value === displayName) {
            setLang(lang);
          }
        }}
      />
      <label htmlFor={displayName}>{displayName}</label>
    </>
  );
};
