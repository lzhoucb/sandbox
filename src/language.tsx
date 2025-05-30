import React, { useState } from "react";
import "./language-fonts.css";

export default {
  title: "Language Fonts"
};

export const LanguageFonts = () => {
  const [lang, setLang] = useState("");
  const [font, setFont] = useState("Times");

  return (
    <div className="lang-container">
      <div className="radio-group">
        <p>lang</p>
        {/* <Radio value="" label="None (empty string)" name="lang" id="lang-none" curValue={lang} setValue={setLang} />
        <br />
        <Radio value="zh" label="zh" name="lang" id="lang-zh" curValue={lang} setValue={setLang} /> */}
        <RadioGroup
          name="lang"
          curValue={lang}
          setValue={setLang}
          table={[
            {value: "", label: "None (empty string)", idSuffix: "none"},
            {value: "zh", label: "zh", idSuffix: "zh"}
          ]}
        />
      </div>
      <div className="radio-group">
        <p>font</p>
        <Radio value="Times" label="Times" name="font" id="font-times" curValue={font} setValue={setFont}/>
        <br/>
        <Radio value="Songti SC" label="Songti SC" name="font" id="font-songti-sc" curValue={font} setValue={setFont}/>
        <br/>
        <Radio value="Songti TC" label="Songti TC" name="font" id="font-songti-tc" curValue={font} setValue={setFont}/>
        <br/>
        <Radio value="PingFang SC" label="PingFang SC" name="font" id="font-pingfang-sc" curValue={font} setValue={setFont}/>
        <br/>
        <Radio value="PingFang TC" label="PingFang TC" name="font" id="font-pingfang-tc" curValue={font} setValue={setFont}/>
      </div>
      <div id="chinese" lang={lang} style={{fontFamily: font}}>
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

interface RadioProps {
  value: string;
  label: string;
  name: string;
  id: string;
  curValue: string;
  setValue: (value: string) => void;
}

const Radio: React.FC<RadioProps> = ({ value, label, name, id, curValue, setValue }) => {
  return (
    <>
      <input
        type="radio"
        checked={curValue === value}
        value={value}
        name={name}
        id={id}
        onChange={event => {
          if (event.target.value === value) {
            setValue(value);
          }
        }}
      />
      <label htmlFor={id}>{label}</label>
    </>
  );
};

interface RadioGroupProps{
  name: string;
  curValue: string;
  setValue: (value: string)=>void;
  table: Array<{value: string, label: string, idSuffix: string}>;
}

const RadioGroup: React.FC<RadioGroupProps> = ({name, curValue, setValue, table}) => {
  const radios = [];

  for(const {value, label, idSuffix} of table){
    const id = `${name}-${idSuffix}`;
    radios.push(<>
      <Radio key={id} value={value} label={label} name={name} id={id} curValue={curValue} setValue={setValue}/>
      <br/>
    </>);
  }

  return radios;
}