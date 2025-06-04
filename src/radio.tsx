import React from "react";

interface RadioProps {
  value: string;
  label: string;
  name: string;
  id: string;
  curValue: string;
  setValue: (value: string) => void;
  direction: "VERTICAL" | "HORIZONTAL";
}

const Radio: React.FC<RadioProps> = ({ value, label, name, id, curValue, setValue, direction }) => {
  let display = "";
  if (direction === "VERTICAL") display = "block";
  if (direction === "HORIZONTAL") display = "inline-block";
  return (
    <div className="radio-option" style={{ display }}>
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
    </div>
  );
};

export interface RadioGroupRow {
  value: string;
  label: string;
  idSuffix: string;
}

interface RadioGroupProps {
  name: string;
  curValue: string;
  setValue: (value: string) => void;
  table: RadioGroupRow[];
  direction?: "VERTICAL" | "HORIZONTAL"
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ name, curValue, setValue, table, direction = "VERTICAL" }) => {
  const radios = [];

  for (const { value, label, idSuffix } of table) {
    const id = `${name}-${idSuffix}`;
    radios.push(
      <Radio key={id} value={value} label={label} name={name} id={id} curValue={curValue} setValue={setValue} direction={direction} />
    );
  }

  return <div className="radio-group">
    {radios}
  </div>;
}