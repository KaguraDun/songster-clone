import SearchBar from './SearchBar';
import Login from './Login';

import Store from './Store';
import renderElement from './helpers/renderElements';
import AddForm from './AddForm';
import About from './About';

import { SVG_SPRITE } from './helpers/svg_sprites';
import Sidebar from './Sidebar';
import DisplayTab from './DisplayTab';

export default class Header {
  parentElement: HTMLElement;
  wrapper: HTMLElement;
  searchButton: HTMLElement;
  leftContainer: HTMLElement;
  rightContainer: HTMLElement;

  store: Store;

  constructor(parentElement: HTMLElement, store: Store) {
    this.parentElement = parentElement;
    this.store = store;

    this.renderSearchBar = this.renderSearchBar.bind(this);
    this.renderFormUploadMedia = this.renderFormUploadMedia.bind(this);
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'header__wrapper';
    this.parentElement.appendChild(this.wrapper);
    this.leftContainer = renderElement(this.wrapper, 'div', ['wrapper-title']);
    this.leftContainer.classList.add('wrapper-title');
    this.renderTitle();

    this.rightContainer = document.createElement('div');
    this.rightContainer.className = 'wrapper-user';
    this.wrapper.appendChild(this.rightContainer);
    this.renderAboutButtonMobile('about__button--mobile');
    // const changethem = renderElement(this.wrapper, 'button', ['change__button'], 'change');// button to change the theme

    this.renderAboutButtonDesktop('about__button--desktop');
    this.renderSearchButton();
    this.renderLoginButton();
    this.renderAddMediaButton();
  }

  renderTitle() {
    const headerTitle = document.createElement('span');
    headerTitle.className = 'header__wrapper-title';
    headerTitle.textContent = 'Songster-Clone';
    this.leftContainer.appendChild(headerTitle);
  }

  renderSearchButton() {
    this.searchButton = renderElement(this.rightContainer, 'div', ['search__button']);
    this.searchButton.addEventListener('click', this.renderSearchBar);

    const container = renderElement(this.searchButton, 'div', ['search__button-container']);
    renderElement(container, 'div', ['search__button-icon']);
    renderElement(container, 'div', ['search__button-content'], 'Search');
  }

  renderAboutButtonDesktop(modificator: string) {
    new About(this.leftContainer).render(modificator);
  }

  renderAboutButtonMobile(modificator: string) {
    new About(this.rightContainer).render(modificator);
  }

  // renderInstrumentButton(){
  //    new Sidebar(this.rightContainer, this.store, DisplayTab.song.Tracks).render();
  // }

  renderAddMediaButton() {
    const buttonAdd = renderElement(this.rightContainer, 'button', ['wrapper-user-login']);
    buttonAdd.addEventListener('click', this.renderFormUploadMedia);
    buttonAdd.title = 'Add song';

    buttonAdd.innerHTML = SVG_SPRITE.ADD;
  }

  renderSearchBar() {
    new SearchBar(this.parentElement.parentElement, this.store).render();
  }

  renderLoginButton() {
    new Login(this.rightContainer).render();
  }

  renderFormUploadMedia() {
    new AddForm(this.rightContainer, this.store).render();
  }
}
