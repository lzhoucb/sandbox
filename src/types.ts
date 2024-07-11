export class NotBlockElementError extends Error {
  element: Element;

  constructor(element: Element) {
    super('Element display property does not equal "block".');
    this.element = element;
  }
}

export class NotHighlightSpanError extends Error {
  element: Element;

  constructor(element: Element) {
    super('Element is not a highlight span.');
    this.element = element;
  }
}