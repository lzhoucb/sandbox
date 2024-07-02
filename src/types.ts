export class NotBlockElementError extends Error {
  element: Element;

  constructor(element: Element) {
    super(`Element display property does not equal "block".`);
    this.element = element;
  }
}