import { useState } from "react"

export const useArray = () => {
  const [array, setArray] = useState([]);

  const addNumber = (number: number) => {
    const newArray = [...array];

    if(newArray.includes(number)) {
      console.log(`${number} already in array, can't be added`);
      return;
    }

    newArray.push(number);
    setArray(newArray);
  }

  const deleteNumber = (number: number) => {
    const newArray = [...array];
    const index = newArray.findIndex(candidate => candidate === number);
    
    if(index === -1){
      console.log(`${number} not in array, can't be removed`);
      return;
    } 
    
    newArray.splice(index, 1);
    setArray(newArray);
  }

  return {array, addNumber, deleteNumber};
}