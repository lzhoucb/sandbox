import React from "react";
import { LanguageDisplay } from "./language-display";

//https://pavellaptev.medium.com/japanese-typography-on-the-web-tips-and-tricks-981f120ad20e
//https://stackoverflow.com/a/14573813
const iso639_1TableJa = [
  { value: "", label: "none (empty string)", idSuffix: "none" },
  { value: "ja", label: "ja (Japanese)", idSuffix: "ja" },
]

const iso639_3TableJa = [
  { value: "jpn", label: "jpn (Japanese)", idSuffix: "zho" },
  { value: "jpn-JP", label: "jpn-JP (Japanese, Japan)", idSuffix: "jpn-jp" }
]

const fontTableJa = [
  { value: "", label: "none (empty string)", idSuffix: "none" },
  { value: "Times", label: "Times", idSuffix: "times" },
  { value: "Hiragino", label: "Hiragino (macOS, iOS)", idSuffix: "hiragino" },
  { value: "Meiryo", label: "Meiryo (Windows)", idSuffix: "meiryo" },
  { value: "Noto Sans SC", label: "Noto Sans SC", idSuffix: "noto-sans-sc" }
]

export const Japanese = () => {
  return <LanguageDisplay
    iso639_1Table={iso639_1TableJa}
    iso639_3Table={iso639_3TableJa}
    fontTableApple={fontTableJa}
    fontTableExternal={[]}
    languageID="japanese"
  >
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
  </LanguageDisplay>
};