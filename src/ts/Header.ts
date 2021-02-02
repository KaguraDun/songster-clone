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
  rightContainer: HTMLElement;
  store: Store;

  constructor(parentElement: HTMLElement, store: Store) {
    this.parentElement = parentElement;
    this.store = store;
    this.renderSearchBar = this.renderSearchBar.bind(this);
    this.renderFormUploadMedia = this.renderFormUploadMedia.bind(this);
  }

  render() {
    
    this.wrapper = renderElement(this.parentElement, 'div', ['header__wrapper']);
    this.renderTitle();
    this.rightContainer = renderElement(this.wrapper, 'div', ['wrapper-user']);
    this.renderAboutButtonDesktop();
    this.renderSearchButton();
    this.renderLoginButton();
    this.renderAddMediaButton();

   
  }

  renderTitle() {
   renderElement(this.wrapper, 'h1', ['header__wrapper-title'], 'Songster-Clone');
      
  }

  renderSearchButton() {
    this.searchButton = renderElement(this.rightContainer, 'div', ['search__button']);
    this.searchButton.addEventListener('click', this.renderSearchBar);

    const container = renderElement(this.searchButton, 'div', ['search__button-container']);
    const searchIcon = renderElement(container, 'div', ['search__button-icon']);
    renderElement(container, 'div', ['search__button-content'], 'Search');
    const searchSvg = renderElement(container, 'div', ['search__button--svg']);
    searchSvg.innerHTML = SVG_SPRITE.SEARCH;
  }

  renderAboutButtonDesktop() {
    new About(this.rightContainer).render();
  }

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
