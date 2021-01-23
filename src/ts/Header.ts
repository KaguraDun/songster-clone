import SearchBar from './SearchBar';
import Login from './Login';

import Store from './Store';
import renderElement from './helpers/renderElements';
import AddForm from './AddForm';

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
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'header__wrapper';
    this.parentElement.appendChild(this.wrapper);

    this.renderTitle();

    this.rightContainer = document.createElement('div');
    this.rightContainer.className = 'wrapper-user';
    this.wrapper.appendChild(this.rightContainer);

    this.renderSearchButton();
    this.renderLoginButton();
    this.renderAddMediaButton();
  }

  renderTitle() {
    const headerTitle = document.createElement('span');
    headerTitle.className = 'header__wrapper-title';
    headerTitle.textContent = 'Songster-Clone';
    this.wrapper.appendChild(headerTitle);
  }

  renderSearchButton() {
    this.searchButton = renderElement(this.rightContainer, 'div', ['search__button']); 
    this.searchButton.addEventListener('click', this.renderSearchBar);
    const container = renderElement(this.searchButton, 'div', ['search__button-container']);
    renderElement(container, 'div', ['search__button-icon']);
    renderElement(container, 'div', ['search__button-content'], 'Search');
  }

  renderSearchBar() {
    new SearchBar(this.parentElement.parentElement, this.store).render();
  }

  renderLoginButton() {
    new Login(this.rightContainer).render();
  }
  
  renderAddMediaButton() {
    new AddForm(this.rightContainer).render();
  }


}
