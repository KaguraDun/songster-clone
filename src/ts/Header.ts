import SearchBar from './SearchBar';
import Login from './Login';

import Store from './Store';
import renderElement from './helpers/renderElements';

export default class Header {
  parentElement: HTMLElement;
  wrapper: HTMLElement;
  store: Store;
  searchButton: HTMLElement;
  userDiv: HTMLElement;

  constructor(parentElement: HTMLElement, store: Store) {
    this.parentElement = parentElement;
    this.store = store;

    this.renderSearchBar = this.renderSearchBar.bind(this);
  }

  render() {
    this.wrapper = renderElement(this.parentElement, 'div', ['header__wrapper']);
    const headerTitle = renderElement(
      this.wrapper,
      'span',
      ['header__wrapper-title'],
      'Songster-Clone',
    );
    this.userDiv = renderElement(this.wrapper, 'div', ['wrapper-user']);
    this.renderSearchButton();
    new Login(this.userDiv).render();
  }

  renderSearchButton() {
    this.searchButton = renderElement(this.userDiv, 'div', ['search__button']); 
    this.searchButton.addEventListener('click', this.renderSearchBar);
    const container = renderElement(this.searchButton, 'div', ['search__button-container']);
    const icon = renderElement(container, 'div', ['search__button-icon']);
    const content = renderElement(container, 'div', ['search__button-content'], 'Search');
    // content.textContent = 'Search';
  
  }

  renderSearchBar() {
    new SearchBar(this.parentElement.parentElement, this.store).render();
  }
}
