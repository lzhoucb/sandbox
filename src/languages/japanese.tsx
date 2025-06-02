import React, { useState } from "react";
import { RadioGroup } from "../radio";

//https://pavellaptev.medium.com/japanese-typography-on-the-web-tips-and-tricks-981f120ad20e
export const Japanese = () => {
  const [lang, setLang] = useState("");
  const [font, setFont] = useState("Times");

  return (
    <div className="lang-container">
      <p>ISO 639-1 lang values</p>
      <RadioGroup
        name="lang"
        curValue={lang}
        setValue={setLang}
        table={[
          {value: "", label: "none (empty string)", idSuffix: "none"},
          {value: "ja", label: "ja (Japanese)", idSuffix: "ja"},
        ]}
      />
      <p>ISO 639-3 lang values</p>
      <RadioGroup
        name="lang"
        curValue={lang}
        setValue={setLang}
        table={[
          {value: "jpn", label: "jpn (Japanese)", idSuffix: "zho"},
          {value: "jpn-JP", label: "jpn-JP (Japanese, Japan)", idSuffix: "jpn-jp"}
        ]}
      />
      <p>font</p>
      <RadioGroup
        name="font"
        curValue={font}
        setValue={setFont}
        table={[
          {value: "Times", label: "Times", idSuffix: "times"},
          {value: "Hiragino", label: "Hiragino", idSuffix: "hiragino"},
          {value: "Noto Sans SC", label: "Noto Sans SC", idSuffix: "noto-sans-sc"}
        ]}
      />
      <div id="japanese" lang={lang} style={{fontFamily: font}}>
        <div id="kanji">
          <p>Kanji</p>
          <p>
            古池や蛙飛び込む水の音
          </p>
        </div>
        <div id="hiragana">
          <p>Hiragana</p>
          <p>
            ふるいけやかわずとびこむみずのおと
          </p>
        </div>
      </div>
    </div>
  );
};