import DisplayTab from './DisplayTab';
export default class Sidebar {
  parentElement: HTMLElement;
  sideBarContent: HTMLElement;
  dropDownGithub: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
  }

  render() {
    this.sideBarContent = document.createElement('section');
    this.sideBarContent.className = 'sidebar';
    this.parentElement.appendChild(this.sideBarContent);
    this.createPlayButton();
    this.createSpeedButton();
    this.createSoundButton();
    this.createMetronomButton();
    this.createPrintButton();
    this.createFavoriteButton();
    this.createInstrumentButton();
    this.createGitHubButton();
  }

  createPlayButton() {
    const playButton = document.createElement('button');
    playButton.className = 'sidebar__button-play';
    this.sideBarContent.appendChild(playButton);
  }

  createSpeedButton() {
    const speedButton = document.createElement('button');
    speedButton.className = 'sidebar__button-speed';
    this.sideBarContent.appendChild(speedButton);
  }

  createSoundButton() {
    const soundButton = document.createElement('button');
    soundButton.className = 'sidebar__button-sound';
    this.sideBarContent.appendChild(soundButton);
  }
  createMetronomButton() {
    const metronomButton = document.createElement('button');
    metronomButton.className = 'sidebar__button-metronom';
    this.sideBarContent.appendChild(metronomButton);
  }
  createPrintButton() {
    const printButton = document.createElement('button');
    printButton.className = 'sidebar__button-print';
    this.sideBarContent.appendChild(printButton);
    
  }

  createFavoriteButton() {
    const favoriteButton = document.createElement('button');
    favoriteButton.className = 'sidebar__button-favorite';
    this.sideBarContent.appendChild(favoriteButton);
  }

  createInstrumentButton() {
    const instrumentButton = document.createElement('button');
    instrumentButton.className = 'sidebar__button-instrument';
    this.sideBarContent.appendChild(instrumentButton);
  }

  createGitHubButton() {
    this.dropDownGithub = document.createElement('div');
    this.dropDownGithub.className = 'dropdown_gitHub'; //dropdown
    const gitHubButton = document.createElement('button');
    gitHubButton.className = 'sidebar__button-gitHub'; //button
    this.dropDownGithub.appendChild(gitHubButton);
    this.sideBarContent.appendChild(this.dropDownGithub);
  
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

  dropGHContent.append(alexLink, ilyaLink, iuliiaLink, vasilyLink);
  this.dropDownGithub.appendChild(dropGHContent);


 }

 
}
