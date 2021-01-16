import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import DisplayTab from './DisplayTab';
import Store from './Store';

export default class Page {
  parentElement: HTMLElement;
  store: Store;

  constructor(parentElement: HTMLElement,store: Store) {
    this.parentElement = parentElement;
    this.store = store;
  }

  render() {
    const header = document.createElement('header');
    header.className = 'header';
    new Header(header).render();

    const main = document.createElement('main');
    const mainWrapper = document.createElement('div');
    mainWrapper.className = 'main__wrapper';
    main.appendChild(mainWrapper);
    
    new Sidebar(mainWrapper).render();
    new DisplayTab(mainWrapper,this.store).render();
    const footer = document.createElement('footer');
    const footerWrapper = document.createElement('div');
    footerWrapper.className = 'footer__wrapper';
    footer.appendChild(footerWrapper);
    new Footer(footerWrapper).render(); //create div and push it as a parent elem
    this.parentElement.append(header, main, footer);
  }
}
