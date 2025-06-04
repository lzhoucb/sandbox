import React from "react";
import { LanguageDisplay } from "./language-display";

//https://www.mslmaster.com/index.php/teaching-learning-resources?view=article&id=129&catid=10
//https://fonts.google.com/knowledge/type_in_china_japan_and_korea/type_classification_in_cjk_chinese
//https://tiw.web.id/2019/04/chinese-standard-web-fonts-a-guide-to-css-font-family-declarations-for-web-design-in-simplified-chinese/
const iso639_1TableZh = [
  { value: "", label: "none (empty string)", idSuffix: "none" },
  { value: "zh", label: "zh (Chinese)", idSuffix: "zh" },
  { value: "zh-CN", label: "zh-CN (Chinese, China)", idSuffix: "zh-cn" },
  { value: "zh-TW", label: "zh-TW (Chinese, Taiwan)", idSuffix: "zh-tw" }
];

const iso639_3TableZh = [
  { value: "zho", label: "zho (Chinese macrolanguage)", idSuffix: "zho" },
  { value: "cmn", label: "cmn (Mandarin)", idSuffix: "cmn" },
  { value: "zho-CN", label: "zho-CN (Chinese macrolanguage, China)", idSuffix: "zho-cn" },
  { value: "zho-TW", label: "zho-TW (Chinese macrolanguage, Taiwan)", idSuffix: "zho-tw" },
  { value: "cmn-CN", label: "cmn-CN (Mandarin, China)", idSuffix: "cmn-cn" },
  { value: "cmn-TW", label: "cmn-TW (Mandarin, Taiwan)", idSuffix: "cmn-tw" }
]

const fontTableUniversal = [
  { value: "", label: "none (empty string)", idSuffix: "none" },
  { value: "Times", label: "Times", idSuffix: "times" },
  { value: "Arial", label: "Arial", idSuffix: "arial" }
];

const fontTableAppleZh = [
  ...fontTableUniversal,
  { value: "Kai", label: "Kai ('kai' as in 'regular/official/formal'; simplified)", idSuffix: "kai" },
  { value: "Kaiti SC", label: "Kaiti SC (simplified)", idSuffix: "kaiti-sc" },
  { value: "Kaiti TC", label: "Kaiti TC (traditional)", idSuffix: "kaiti-tc" },
  { value: "SimSong", label: "SimSong ('song' as in Song dynasty woodblock; simplified)", idSuffix: "simsong" },
  { value: "Songti SC", label: "Songti SC (simplified)", idSuffix: "songti-sc" },
  { value: "Songti TC", label: "Songti TC (traditional)", idSuffix: "songti-tc" },
  { value: "STSong", label: "STSong (simplified)", idSuffix: "stsong" },
  { value: "STFangsong", label: "STFangsong ('pseudo-Songti'; simplified)", idSuffix: "stfangsong" },
  { value: "Hei", label: "Hei ('hei' as in 'black/dark'; simplified)", idSuffix: "hei" },
  { value: "Heiti SC", label: "Heiti SC (simplified)", idSuffix: "heiti-sc" },
]

const fontTableExternalZh = [
  ...fontTableUniversal,
  { value: "Noto Sans SC", label: "Noto Sans SC (simplified)", idSuffix: "noto-sans-sc" },
  { value: "Noto Sans TC", label: "Noto Sans TC (simplified)", idSuffix: "noto-sans-tc" }
]

export const Chinese = () => {
  return <LanguageDisplay
    iso639_1Table={iso639_1TableZh}
    iso639_3Table={iso639_3TableZh}
    fontTableApple={fontTableAppleZh}
    fontTableExternal={fontTableExternalZh}
    languageID="chinese"
  >
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
  </LanguageDisplay>
};