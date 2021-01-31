import renderElement from './helpers/renderElements';

const SHOW = '--show';
export default class About {
  parentElement: HTMLElement;
  formOverlay: HTMLElement;
  formAbout: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
    this.formAbout;
    this.formOverlay;
    this.hideForm = this.hideForm.bind(this);
    this.createForm = this.createForm.bind(this);
  }

  render() {
    this.formOverlay = renderElement(this.parentElement, 'div', ['wrapper-user__form-overlay']);
    this.formOverlay.addEventListener('click', this.hideForm);

    const buttonAbout = renderElement(this.parentElement, 'button', ['about__button']);
    buttonAbout.addEventListener('click', this.createForm);
    buttonAbout.innerText = 'About';
    // this.createForm(this.parentElement);
  }

  createForm() {
    this.formAbout = renderElement(this.parentElement, 'div', ['about__form']);
    const formContainer = renderElement(this.formAbout, 'div', ['about__container']);
    this.renderAboutData(formContainer);
    this.formOverlay = renderElement(this.parentElement, 'div', ['wrapper-user__form-overlay']);
    this.formOverlay.classList.add(SHOW);
    this.formAbout.classList.add(SHOW);
  }

  renderAboutData(parentElement: HTMLElement) {
    const firstCreator = this.createLink(
      parentElement,
      'Aliaksei Rachkouski',
      'https://github.com/vanessagrapefruit',
    );
    const secondCreator = this.createLink(
      parentElement,
      'Ilya Barachenia',
      'https://github.com/mykamapolice',
    );
    const thirdCreator = this.createLink(
      parentElement,
      'Iuliia Mazaeva',
      'https://github.com/juliememe',
    );
    const fourthCreator = this.createLink(
      parentElement,
      'Vasily Kovnev',
      'https://github.com/kaguradun',
    );
    return { firstCreator, secondCreator, thirdCreator, fourthCreator };
  }

  createLink(parentElement: HTMLElement, innerText: string, link: string) {
    const element = renderElement(parentElement, 'a', ['github__creator-link'], innerText);
    element.setAttribute('href', link);
    return element;
  }

  hideForm() {
    this.formOverlay.classList.remove(SHOW);
    this.formAbout.classList.remove(SHOW);
  }
}
