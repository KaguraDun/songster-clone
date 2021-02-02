import Header from './Header';
import Footer from './Footer';
import DisplayTab from './DisplayTab';
import Store, { EVENTS } from './Store';
import { SVG_SPRITE } from './helpers/svg_sprites';
import renderElement from './helpers/renderElements';

export default class Page {
  parentElement: HTMLElement;
  headerElement: HTMLElement;
  mainElement: HTMLElement;
  footerElement: HTMLElement;

  songContent: DisplayTab;
  store: Store;

  constructor(parentElement: HTMLElement, store: Store) {
    this.parentElement = parentElement;
    this.store = store;

    this.renderSong = this.renderSong.bind(this);
  }

  render() {
    this.store.eventEmitter.addEvent(EVENTS.SELECT_SONG,this.renderSong);
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

    this.renderSong();
  }

  renderSong() {
    if(this.songContent) this.songContent.dispose();

    const id = this.store.selectedSongId;
    this.songContent = new DisplayTab(this.mainElement,this.store,id);
    this.songContent.render();
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
