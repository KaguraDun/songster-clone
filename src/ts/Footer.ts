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
    
    const logoImage = document.createElement('img');
    logoImage.src = '../../assets/images/white_logo.svg';
    logoImage.alt = 'logo';
    logoImage.className = 'footer__content-link-logo';
    linkLogo.appendChild(logoImage);
    // createGitHubButton() {
      // this.dropDownGithub = document.createElement('div');
      // this.dropDownGithub.className = 'dropdown_gitHub'; //dropdown
      // const gitHubButton = document.createElement('button');
      // gitHubButton.className = 'sidebar__button-gitHub'; //button
      // this.dropDownGithub.appendChild(gitHubButton);
      // this.sideBarContent.appendChild(this.dropDownGithub);
      
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
      
      const vasilyLink = document.createElement('a');
      vasilyLink.textContent = 'Vasily Kovnev';
      vasilyLink.setAttribute('href', 'https://github.com/kaguradun');
      vasilyLink.className = 'github__container-vasya';
      
      // dropGHContent.append(alexLink, ilyaLink, iuliiaLink, vasilyLink);
      
      // this.dropDownGithub.appendChild(dropGHContent);
      footerDiv.append(linkLogo,alexLink, ilyaLink, iuliiaLink, vasilyLink);
      this.parentElement.appendChild(footerDiv);
    }
}
