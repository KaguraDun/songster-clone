import renderElement from "./helpers/renderElements";

export default class Footer {
  parentElement: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
  }

  render() {
    const footerDiv = renderElement(this.parentElement, 'footer__content', ['footer__content']);
    
    const linkLogo = document.createElement('a');
    linkLogo.className = 'footer__content-link';
    linkLogo.setAttribute('href', 'https://rs.school/js/');
    
    const logoImage = document.createElement('img');
    logoImage.src = '../../assets/images/white_logo.svg';
    logoImage.alt = 'logo';
    logoImage.className = 'footer__content-link-logo';
    linkLogo.appendChild(logoImage);
   
      
      const dropGHContent = document.createElement('div');
      dropGHContent.className = 'github__container'; //container for links
      const alexLink = document.createElement('a');
      alexLink.setAttribute('href', 'https://github.com/vanessagrapefruit');
      alexLink.textContent = 'Aliaksei Rachkouski';
      alexLink.className = 'github__container-alex'
      
      const ilyaLink = document.createElement('a');
      ilyaLink.setAttribute('href', 'https://github.com/mykamapolice');
      ilyaLink.textContent = 'Ilya Barachenia';
      ilyaLink.className = 'github__container-ilya';
      
      const iuliiaLink = document.createElement('a');
      iuliiaLink.setAttribute('href', 'https://github.com/juliememe');
      iuliiaLink.textContent = 'Iuliia Mazaeva';
      iuliiaLink.className = 'github__container-iuliia';
      
      const vasilyLink = renderElement(footerDiv, 'a', ['github__container-vasya'], 'Vasily Kovnev'); 
      vasilyLink.setAttribute('href', 'https://github.com/kaguradun');
   
      footerDiv.append(linkLogo,alexLink, ilyaLink, iuliiaLink, vasilyLink);
      
    }
}
