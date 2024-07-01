export class NotBlockElementError extends Error{
  constructor(element: Element){
    super(`${element} is not display: block.`);
  }
}