export default class Footer {
  parentElement: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
  }

  render() {
    const footerDiv = document.createElement('div');
    footerDiv.className = 'footer__content';
    const linkLogo = document.createElement('a');
    linkLogo.className = 'footer__content-link';
    linkLogo.setAttribute('href', 'https://rs.school/js/');
    footerDiv.appendChild(linkLogo);

    const logoImage = document.createElement('img');
    logoImage.src = '../../assets/images/white_logo.svg';
    logoImage.alt = 'logo';
    logoImage.className = 'footer__content-link-logo';
    linkLogo.appendChild(logoImage);
    this.parentElement.appendChild(footerDiv);
  }
}
