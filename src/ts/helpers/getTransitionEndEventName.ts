interface TransitionList {
  transition: string;
  OTransition: string;
  MozTransition: string;
  WebkitTransition: string;
}

export default function getTransitionEndEventName() {
  const transitions: TransitionList = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
  };

  let bodyStyle = document.body.style;

  for (let transition in transitions) {
    if (bodyStyle[transition as keyof CSSStyleDeclaration] !== undefined) {
      return transitions[transition as keyof typeof transitions];
    }
  }
}
