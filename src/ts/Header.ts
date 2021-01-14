import SearchBar from './SearchBar';
import Login from './Login';
import SignIn from './SignIn';

export default class Header {
  parentElement: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
  }

  render() {
    const headerWrapper = document.createElement('div');
    headerWrapper.className = 'header__wrapper';
    new SearchBar(headerWrapper).render();
    this.parentElement.appendChild(headerWrapper);
    const headerTitle = document.createElement('span');
    headerTitle.className = 'header__wrapper-title';
    headerTitle.textContent = 'Songster-Clone';
    headerWrapper.appendChild(headerTitle);
    const userDiv = document.createElement('div');
    userDiv.className = 'header__wrapper-user'
    headerWrapper.appendChild(userDiv);
    new Login(userDiv).render();
    new SignIn(userDiv).render();
  }
}
