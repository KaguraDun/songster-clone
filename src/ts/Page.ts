import Header from './Header';
import Footer from './Footer';
import DisplayTab from './DisplayTab';
import Store from './Store';

export default class Page {
  parentElement: HTMLElement;
  headerElement: HTMLElement;
  mainElement: HTMLElement;
  footerElement: HTMLElement;

  store: Store;

  constructor(parentElement: HTMLElement, store: Store) {
    this.parentElement = parentElement;
    this.store = store;
  }

  render() {
    this.renderHeader();
    this.renderMain();
    this.renderFooter();
  }

  renderHeader() {
    this.headerElement = document.createElement('header');
    this.headerElement.className = 'header';
    this.parentElement.appendChild(this.headerElement);

    new Header(this.headerElement,this.store).render();
  }

  renderMain() {
    const wrapper = document.createElement('main');
    this.parentElement.appendChild(wrapper);

    this.mainElement = document.createElement('div');
    this.mainElement.className = 'main__wrapper';
    wrapper.appendChild(this.mainElement);

    // const id = '6000a2a200bb3e15e47d4d33';
    // const id = '6003406a0221632f7493cd3b';
    const id = "6004807c0bea8613c8a9fbe7";
    new DisplayTab(this.mainElement,this.store,id).render();
  }

  renderFooter() {
    const footer = document.createElement('footer');
    this.parentElement.appendChild(footer);

    this.footerElement = document.createElement('div');
    this.footerElement.className = 'footer__wrapper';
    footer.appendChild(this.footerElement);

    new Footer(this.footerElement).render();
  }
}
