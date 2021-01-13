
export default class Header {
  parentElement : HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
   
  }

  render() {

    const headerContent = document.createElement('div');
    const headerTitle = document.createElement('span');
  
    headerTitle.className = 'header__title';
    headerTitle.textContent = 'Songster-Clone';
    headerContent.appendChild(headerTitle);
    this.parentElement.appendChild(headerContent);
   
  }
}
