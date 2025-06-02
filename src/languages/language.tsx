import React, { useState } from "react";
import { Chinese } from "./chinese";
import { RadioGroup } from "../radio";
import { Japanese } from "./japanese";
import "./language-fonts.css";

const Language = () => {
  const [language, setLanguage] = useState("chinese");

  return <>
    <p>Language</p>
    <RadioGroup
      name="language"
      curValue={language}
      setValue={setLanguage}
      table={[
        {value: "chinese", label: "Chinese", idSuffix: "chinese"},
        {value: "japanese", label: "Japanese", idSuffix: "japanese"}
      ]}
    />
    {language === "chinese" && <Chinese/>}
    {language === "japanese" && <Japanese/>}
  </>
}


export default Language;
