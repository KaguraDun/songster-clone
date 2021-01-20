import SearchBar from './SearchBar';
import Login from './Login';
import SignIn from './SignIn';
import Store from './Store';

export default class Header {
  parentElement: HTMLElement;
  wrapper: HTMLElement;
  store: Store;
  searchButton: HTMLElement;
  userDiv : HTMLDivElement; 

  constructor(parentElement: HTMLElement,store: Store) {
    this.parentElement = parentElement;
    this.store = store;

    this.renderSearchBar = this.renderSearchBar.bind(this);
  }

  render() {

      this.wrapper = document.createElement('div');
    this.wrapper.className = 'header__wrapper';
    this.parentElement.appendChild(this.wrapper);

    const headerTitle = document.createElement('span');
    headerTitle.className = 'header__wrapper-title';
    headerTitle.textContent = 'Songster-Clone';

    headerWrapper.appendChild(headerTitle);
    const userDiv = document.createElement('div');
    userDiv.className = 'wrapper-user';
    headerWrapper.appendChild(userDiv);
    new Login(userDiv).render();
    //new SignIn(userDiv).render();

    this.wrapper.appendChild(headerTitle);
    
    this.userDiv = document.createElement('div');
    this.userDiv.className = 'wrapper-user';
    this.wrapper.appendChild(this.userDiv);
    this.renderSearchButton();

    new Login(this.userDiv).render();
    
  }

  renderSearchButton() {
    this.searchButton = document.createElement('div');
    this.searchButton.classList.add('search__button');
    this.userDiv.appendChild(this.searchButton);
    this.searchButton.addEventListener('click',this.renderSearchBar);

    const container = document.createElement('div');
    container.classList.add('search__button-container');
    this.searchButton.appendChild(container);

    const icon = document.createElement('div');
    icon.classList.add('search__button-icon');
    container.appendChild(icon);

    const content = document.createElement('div');
    content.classList.add('search__button-content');
    content.textContent = 'Search';
    container.appendChild(content);
  }

  renderSearchBar() {
    new SearchBar(this.parentElement.parentElement, this.store).render();
  }
}
