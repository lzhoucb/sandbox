import React, { useState } from "react";
import { RadioGroup, RadioGroupRow } from "../radio";

interface LanguageDisplayProps {
  iso639_1Table: RadioGroupRow[];
  iso639_3Table: RadioGroupRow[];
  fontTableApple: RadioGroupRow[];
  fontTableExternal: RadioGroupRow[];
  languageID: string;
  children: React.ReactNode;
}

export const LanguageDisplay: React.FC<LanguageDisplayProps> = ({
  iso639_1Table,
  iso639_3Table,
  fontTableApple,
  fontTableExternal,
  children,
  languageID
}) => {
  const [lang, setLang] = useState("");
  const [fontCategory, setFontCategory] = useState("apple");
  const [font, setFont] = useState("");
  const [serif, setSerif] = useState("serif");

  return <>
    <div className="language-config">

      <p>ISO 639-1 lang values</p>
      <RadioGroup
        name="lang"
        curValue={lang}
        setValue={setLang}
        table={iso639_1Table}
      />
      <p>ISO 639-3 lang values</p>
      <RadioGroup
        name="lang"
        curValue={lang}
        setValue={setLang}
        table={iso639_3Table}
      />
      <p>font category</p>
      <RadioGroup
        name="font-category"
        curValue={fontCategory}
        setValue={setFontCategory}
        table={[
          { value: "apple", label: "macOS/iOS", idSuffix: "apple" },
          { value: "windows", label: "Windows", idSuffix: "windows" },
          { value: "chrome", label: "ChromeOS", idSuffix: "chrome" },
          { value: "external", label: "External", idSuffix: "external" }
        ]}
        direction="HORIZONTAL"
      />
      <p>font</p>
      {fontCategory === "apple" && <RadioGroup
        name="font-apple"
        curValue={font}
        setValue={setFont}
        table={fontTableApple}
      />}
      {fontCategory === "external" && <RadioGroup
        name="font-external"
        curValue={font}
        setValue={setFont}
        table={fontTableExternal}
      />}
      <p>serif</p>
      <RadioGroup
        name="serif"
        curValue={serif}
        setValue={setSerif}
        table={[
          { value: "serif", label: "serif", idSuffix: "serif" },
          { value: "sans-serif", label: "sans-serif", idSuffix: "sans-serif" }
        ]}
      />
    </div>
    <div className="language-sample" id={languageID} lang={lang} style={{ fontFamily: font === "" ? serif : `${font}, ${serif}` }}>
      {children}
    </div>
  </>
}