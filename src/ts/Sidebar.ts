import DisplayTab from './DisplayTab';
import Store, { EVENTS } from './Store';

export default class Sidebar {
  parentElement: HTMLElement;
  sideBarContent: HTMLElement;
  store: Store;

  constructor(parentElement: HTMLElement, store: Store) {
    this.parentElement = parentElement;
    this.store = store;
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

    playButton.addEventListener('click', () => this.store.playSong());
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
    const gitHubButton = document.createElement('button');
    gitHubButton.className = 'sidebar__button-gitHub';
    this.sideBarContent.appendChild(gitHubButton);
  }
}
