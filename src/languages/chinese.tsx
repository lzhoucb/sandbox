import React, { useState } from "react";
import { RadioGroup } from "../radio";

export const Chinese = () => {
  const [lang, setLang] = useState("");
  const [font, setFont] = useState("");
  const [serif, setSerif] = useState("serif");

  return (
    <div className="lang-container">
      <p>ISO 639-1 lang values</p>
      <RadioGroup
        name="lang"
        curValue={lang}
        setValue={setLang}
        table={[
          {value: "", label: "none (empty string)", idSuffix: "none"},
          {value: "zh", label: "zh (Chinese)", idSuffix: "zh"},
          {value: "zh-CN", label: "zh-CN (Chinese, China)", idSuffix: "zh-cn"},
          {value: "zh-TW", label: "zh-TW (Chinese, Taiwan)", idSuffix: "zh-tw"}
        ]}
      />
      <p>ISO 639-3 lang values</p>
      <RadioGroup
        name="lang"
        curValue={lang}
        setValue={setLang}
        table={[
          {value: "zho", label: "zho (Chinese macrolanguage)", idSuffix: "zho"},
          {value: "cmn", label: "cmn (Mandarin)", idSuffix: "cmn"},
          {value: "zho-CN", label: "zho-CN (Chinese macrolanguage, China)", idSuffix: "zho-cn"},
          {value: "zho-TW", label: "zho-TW (Chinese macrolanguage, Taiwan)", idSuffix: "zho-tw"},
          {value: "cmn-CN", label: "cmn-CN (Mandarin, China)", idSuffix: "cmn-cn"},
          {value: "cmn-TW", label: "cmn-TW (Mandarin, Taiwan)", idSuffix: "cmn-tw"}
        ]}
      />
      <p>font</p>
      <RadioGroup
        name="font"
        curValue={font}
        setValue={setFont}
        table={[
          {value: "", label: "none (empty string)", idSuffix: "none"},
          {value: "Times", label: "Times", idSuffix: "times"},
          {value: "Songti SC", label: "Songti SC", idSuffix: "songti-sc"},
          {value: "Songti TC", label: "Songti TC", idSuffix: "songti-tc"},
          {value: "PingFang SC", label: "PingFang SC", idSuffix: "pingfang-sc"},
          {value: "PingFang TC", label: "PingFang TC", idSuffix: "pingfang-tc"},
          {value: "Noto Sans SC", label: "Noto Sans SC", idSuffix: "noto-sans-sc"},
          {value: "Noto Sans TC", label: "Noto Sans TC", idSuffix: "noto-sans-tc"}
        ]}
      />
      <p>serif</p>
      <RadioGroup
        name="serif"
        curValue={serif}
        setValue={setSerif}
        table={[
          {value: "serif", label: "serif", idSuffix: "serif"},
          {value: "sans-serif", label: "sans-serif", idSuffix: "sans-serif"}
        ]}
      />
      <div id="chinese" lang={lang} style={{fontFamily: font === "" ? serif : `${font}, ${serif}`}}>
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