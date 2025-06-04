import React, { useState } from "react";
import { RadioGroup, RadioGroupRow } from "../radio";

export const fontTableUniversal = [
  { value: "", label: "none (empty string)", idSuffix: "none" },
  { value: "Times", label: "Times", idSuffix: "times" },
  { value: "Arial", label: "Arial", idSuffix: "arial" }
];

interface LanguageDisplayProps {
  iso639_1Table: RadioGroupRow[];
  iso639_3Table: RadioGroupRow[];
  regionTable: RadioGroupRow[];
  fontTableApple: RadioGroupRow[];
  fontTableWindows: RadioGroupRow[];
  fontTableExternal: RadioGroupRow[];
  languageID: string;
  children: React.ReactNode;
}

export const LanguageDisplay: React.FC<LanguageDisplayProps> = ({
  iso639_1Table,
  iso639_3Table,
  regionTable,
  fontTableApple,
  fontTableWindows,
  fontTableExternal,
  children,
  languageID
}) => {
  const [lang, setLang] = useState("");
  const [region, setRegion] = useState("");
  const [fontCategory, setFontCategory] = useState("apple");
  const [font, setFont] = useState("");
  const [serif, setSerif] = useState("");

  let compositeFont = "";
  if (font && !serif) compositeFont = `"${font}"`;
  else if (!font && serif) compositeFont = serif;
  else if (font && serif) compositeFont = `"${font}", ${serif}`

  let compositeLang = "";
  if (lang && !region) compositeLang = lang;
  else if (!lang && region) compositeLang = "";
  else if (lang && region) compositeLang = `${lang}-${region}`;

  return <>
    <div className="language-config">
      <p>ISO 639-1 language values</p>
      <RadioGroup
        name="lang"
        curValue={lang}
        setValue={setLang}
        table={iso639_1Table}
      />
      <p>ISO 639-3 language values</p>
      <RadioGroup
        name="lang"
        curValue={lang}
        setValue={setLang}
        table={iso639_3Table}
      />
      <p>region</p>
      <RadioGroup
        name="region"
        curValue={region}
        setValue={setRegion}
        table={regionTable}
      />
      <p>font category</p>
      <RadioGroup
        name="font-category"
        curValue={fontCategory}
        setValue={setFontCategory}
        table={[
          { value: "apple", label: "macOS/iOS", idSuffix: "apple" },
          { value: "windows", label: "Windows", idSuffix: "windows" },
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
      {fontCategory === "windows" && <RadioGroup
        name="font-windows"
        curValue={font}
        setValue={setFont}
        table={fontTableWindows}
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
          { value: "", label: "none (empty string)", idSuffix: "none" },
          { value: "serif", label: "serif", idSuffix: "serif" },
          { value: "sans-serif", label: "sans-serif", idSuffix: "sans-serif" }
        ]}
      />
    </div>
    <div className="language-sample-container">
      <div className="language-sample"
        id={languageID}
        lang={compositeLang}
        style={{ fontFamily: compositeFont }}
      >
        {children}
      </div>
      <p>font-family (not necessarily the rendered font): {compositeFont || "none (empty string)"}</p>
      <p>lang: {compositeLang || "none (empty string)"}</p>
    </div>
  </>
};