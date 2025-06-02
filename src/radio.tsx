import React from "react";

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

export const RadioGroup: React.FC<RadioGroupProps> = ({name, curValue, setValue, table}) => {
  const radios = [];

  for(const {value, label, idSuffix} of table){
    const id = `${name}-${idSuffix}`;
    radios.push(<>
      <Radio key={id} value={value} label={label} name={name} id={id} curValue={curValue} setValue={setValue}/>
      <br/>
    </>);
  }

  return <div className="radio-group">
    {radios}
  </div>;
}