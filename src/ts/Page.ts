import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import DisplayTab from './DisplayTab';
import SearchBar from './SearchBar';



export default class Page {
  parentElement: HTMLElement;
  

  constructor(parentElement:HTMLElement) {
    this.parentElement = parentElement;
   
}


  render() {
  const header = document.createElement('header');
  const headerWrapper = document.createElement('div');
  headerWrapper.className = 'header__wrapper';
  header.appendChild(headerWrapper);
  new Header(headerWrapper).render(); //create div and push it as a parent elem
  new SearchBar(headerWrapper).render();

  const main = document.createElement('main');
  const mainWrapper = document.createElement('div');
  mainWrapper.className = 'main__wrapper';
  main.appendChild(mainWrapper);
  new Sidebar(mainWrapper).render();
  new DisplayTab(mainWrapper).render();
  const footer = document.createElement('footer');
  const footerWrapper = document.createElement('div');
  footerWrapper.className = 'footer__wrapper';
  footer.appendChild(footerWrapper);
  new Footer(footerWrapper).render(); //create div and push it as a parent elem
  this.parentElement.append(header, main, footer);
  
  

  }


}


