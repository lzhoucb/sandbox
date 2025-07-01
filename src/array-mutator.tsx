import React from "react";
import { useArray } from "./use-array";

export const ArrayMutator = () => {
  const { array, addNumber, deleteNumber } = useArray();
  const numbers = [];

  for (const number of array) {
    numbers.push(<div>{number}</div>)
  }

  const MutateButton = ({ number, addOrDelete }) => {
    let onClick: () => void;
    let text: string;

    if (addOrDelete === "ADD") {
      onClick = () => addNumber(number);
      text = "Add ";
    } else if (addOrDelete === "DELETE") {
      onClick = () => deleteNumber(number);
      text = "Delete ";
    }

    return <button onClick={onClick}>{text + number}</button>
  }

  return (
    <>
      <MutateButton number={1} addOrDelete="ADD" />
      <MutateButton number={2} addOrDelete="ADD" />
      <MutateButton number={3} addOrDelete="ADD" />
      <MutateButton number={1} addOrDelete="DELETE" />
      <MutateButton number={2} addOrDelete="DELETE" />
      <MutateButton number={3} addOrDelete="DELETE" />
      {numbers}
    </>
  )
}
