import renderElement from './helpers/renderElements';
import { SVG_SPRITE } from './helpers/svg_sprites';

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
    this.formAbout = renderElement(this.parentElement, 'div', ['about__form']);
    this.formOverlay = renderElement(this.parentElement, 'div', ['wrapper-user__form-overlay']);
    this.formOverlay.addEventListener('click', this.hideForm);
    
    const buttonAbout = renderElement(this.parentElement, 'button', ['about__button']);
    buttonAbout.addEventListener('click', this.createForm);
    // buttonAbout.innerText = 'About';
    const aboutTitle = renderElement(buttonAbout, 'span', ['about__button--title']);
    aboutTitle.innerText= 'About';
    const svgContainer = renderElement(buttonAbout, 'div', ['about__button--svg']);
    svgContainer.innerHTML = SVG_SPRITE.GITHUB;
    // this.createForm(this.parentElement);
  }

  createForm() {
    this.formOverlay.classList.add(SHOW);
    this.formAbout.classList.add(SHOW);
    this.formAbout.innerHTML = '';
    const formContainer = renderElement(this.formAbout, 'div', ['about__container']);

    this.renderAboutData(formContainer);
    this.renderLogo(formContainer);


    
  }

  renderLogo(parentElement: HTMLElement){
    const rssLogoLink = this.createLink(parentElement, '', 'https://rs.school/js/');
    const logoImage : any = renderElement(rssLogoLink, 'img', ['about__logo-rss']);
    logoImage.src = '../../assets/images/white_logo.svg';
    logoImage.alt = 'logo';
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
    const element = renderElement(parentElement, 'a', ['github__creator-link'], `${(innerText).toUpperCase()}`);
    element.setAttribute('href', link);
    return element;
  }

  hideForm() {
    this.formOverlay.classList.remove(SHOW);
    this.formAbout.classList.remove(SHOW);
  }
}
