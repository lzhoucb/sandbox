import React from "react";
import { LanguageDisplay } from "./language-display";
import { fontTableUniversal } from "./language-display";

//https://pavellaptev.medium.com/japanese-typography-on-the-web-tips-and-tricks-981f120ad20e
//https://stackoverflow.com/a/14573813
const iso639_1TableJa = [
  { value: "", label: "none (empty string)", idSuffix: "none" },
  { value: "ja", label: "ja (Japanese)", idSuffix: "ja" },
];

const iso639_3TableJa = [
  { value: "jpn", label: "jpn (Japanese)", idSuffix: "zho" },
];

const regionTableJa = [
  { value: "", label: "none (empty string)", idSuffix: "none" },
  { value: "JP", label: "JP (Japan)", idSuffix: "jp" }
];

const fontTableAppleJa = [
  ...fontTableUniversal,
  { value: "Hiragino Maru Gothic ProN", label: "Hiragino Maru Gothic ProN (Gothic = sans-serif)", idSuffix: "hiragino-maru" },
  { value: "Hiragino Mincho ProN", label: "Hiragino Mincho ProN ('Mincho' = Ming dynasty serif typography)", idSuffix: "hiragino-mincho" },
  { value: "Hiragino Sans", label: "Hiragino Sans", idSuffix: "hiragino-sans" },
  { value: "YuGothic", label: "YuGothic", idSuffix: "yugothic" },
  { value: "YuMincho", label: "YuMincho", idSuffix: "yumincho" }
];

const fontTableExternalJa = [
  ...fontTableUniversal,
  { value: "Noto Sans JP", label: "Noto Sans JP", idSuffix: "noto-sans-jp" }
]

export const Japanese = () => {
  return <LanguageDisplay
    iso639_1Table={iso639_1TableJa}
    iso639_3Table={iso639_3TableJa}
    regionTable={regionTableJa}
    fontTableApple={fontTableAppleJa}
    fontTableWindows={[]}
    fontTableExternal={fontTableExternalJa}
    languageID="japanese"
  >
    <p>Kanji</p>
    <p>
      古池や蛙飛び込む水の音
    </p>
    <p>Hiragana</p>
    <p>
      ふるいけやかわずとびこむみずのおと
    </p>
  </LanguageDisplay>
};