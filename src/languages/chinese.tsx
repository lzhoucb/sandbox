import React from "react";
import { fontTableUniversal, LanguageDisplay } from "./language-display";

//https://www.mslmaster.com/index.php/teaching-learning-resources?view=article&id=129&catid=10
//https://fonts.google.com/knowledge/type_in_china_japan_and_korea/type_classification_in_cjk_chinese
//https://tiw.web.id/2019/04/chinese-standard-web-fonts-a-guide-to-css-font-family-declarations-for-web-design-in-simplified-chinese/
//https://www.reddit.com/r/ChineseLanguage/comments/16jyd30/deleted_by_user/
const iso639_1TableZh = [
  { value: "", label: "none (empty string)", idSuffix: "none" },
  { value: "zh", label: "zh (Chinese)", idSuffix: "zh" },
];

const iso639_3TableZh = [
  { value: "zho", label: "zho (Chinese macrolanguage)", idSuffix: "zho" },
  { value: "chi", label: "chi (Chinese macrolanguage, ISO 639-2 equivalent)", idSuffix: "chi" },
  { value: "cmn", label: "cmn (Mandarin)", idSuffix: "cmn" },
]

const regionTableZh = [
  { value: "", label: "none (empty string)", idSuffix: "none" },
  { value: "CN", label: "CN (China)", idSuffix: "cn" },
  { value: "HK", label: "HK (Hong Kong)", idSuffix: "hk" },
  { value: "MO", label: "MO (Macao)", idSuffix: "mo" },
  { value: "SG", label: "SG (Singapore)", idSuffix: "sg" },
  { value: "TW", label: "TW (Taiwan)", idSuffix: "tw" }
]

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
  { value: "Hei", label: "Hei ('hei' as in 'black/dark'; sans-serif; simplified)", idSuffix: "hei" },
  { value: "Heiti SC", label: "Heiti SC (simplified)", idSuffix: "heiti-sc" },
  { value: "Heiti TC", label: "Heiti TC (traditional)", idSuffix: "heiti-tc" }
];

export const fontTableWindowsZh = [
  ...fontTableUniversal,
  { value: "KaiTi", label: "KaiTi ('kai' as in 'regular/official/formal'; simplified)", idSuffix: "kaiti" },
  { value: "DFKai-SB", label: "DFKai-SB (traditional)", idSuffix: "dfkai-sb" },
  { value: "SimSun", label: "SimSun ('Songti'/Song dynasty woodblock; simplified)", idSuffix: "simsun" },
  { value: "FangSong", label: "FangSong ('pseudo-Songti'; simplified)", idSuffix: "fangsong" },
  { value: "SimHei", label: "SimHei ('hei' as in 'black/dark'; sans-serif; simplified)", idSuffix: "simhei" },
  { value: "MingLiU", label: "MingLiU (Ming dynasty serif style; traditional)", idSuffix: "mingliu" }
];

const fontTableExternalZh = [
  ...fontTableUniversal,
  { value: "Noto Sans SC", label: "Noto Sans SC (simplified)", idSuffix: "noto-sans-sc" },
  { value: "Noto Sans TC", label: "Noto Sans TC (simplified)", idSuffix: "noto-sans-tc" }
]

export const Chinese = () => {
  return <LanguageDisplay
    iso639_1Table={iso639_1TableZh}
    iso639_3Table={iso639_3TableZh}
    regionTable={regionTableZh}
    fontTableApple={fontTableAppleZh}
    fontTableWindows={fontTableWindowsZh}
    fontTableExternal={fontTableExternalZh}
    languageID="chinese"
  >
    <div id="trad-chinese">
      <p>Traditional</p>
      <p>
        床前明月光,
        <br />
        疑是地上霜。
        <br />
        舉頭望明月,
        <br />
        低頭思故鄉。
        <br />
      </p>
    </div>
    <div id="simp-chinese">
      <p>Simplified</p>
      <p>
        床前明月光,
        <br />
        疑是地上霜。
        <br />
        举头望明月,
        <br />
        低头思故乡。
        <br />
      </p>
    </div>
  </LanguageDisplay>
};