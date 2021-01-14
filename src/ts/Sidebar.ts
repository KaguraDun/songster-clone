import DisplayTab from './DisplayTab';
export default class Sidebar {
  parentElement: HTMLElement;
  sideBarContent: HTMLElement;

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
    let button = this.createPrintButton();

    this.createFavoriteButton();
    this.createInstrumentButton();
    this.createGitHubButton();
  }

  createPlayButton() {
    const playButton = document.createElement('button');
    playButton.className = 'sidebar__button-play';
    // playButton.textContent = 'play';
    this.sideBarContent.appendChild(playButton);
  }

  createSpeedButton() {
    const speedButton = document.createElement('button');
    speedButton.className = 'sidebar__button-speed';
    // speedButton.textContent='speed';
    this.sideBarContent.appendChild(speedButton);
  }

  createSoundButton() {
    const soundButton = document.createElement('button');
    soundButton.className = 'sidebar__button-sound';
    // soundButton.textContent= 'sound';
    this.sideBarContent.appendChild(soundButton);
  }
  createMetronomButton() {
    const metronomButton = document.createElement('button');
    metronomButton.className = 'sidebar__button-metronom';
    // metronomButton.textContent = 'metro';
    this.sideBarContent.appendChild(metronomButton);
  }
  createPrintButton() {
    const printButton = document.createElement('button');
    printButton.className = 'sidebar__button-print';
    // printButton.textContent = 'print';
    this.sideBarContent.appendChild(printButton);
    // printButton.addEventListener('click', this.printTab());
  }

  createFavoriteButton() {
    const favoriteButton = document.createElement('button');
    favoriteButton.className = 'sidebar__button-favorite';
    // favoriteButton.textContent='fav';
    this.sideBarContent.appendChild(favoriteButton);
  }

  createInstrumentButton() {
    const instrumentButton = document.createElement('button');
    instrumentButton.className = 'sidebar__button-instrument';
    // instrumentButton.textContent = 'inst';
    this.sideBarContent.appendChild(instrumentButton);
  }

  createGitHubButton() {
    const gitHubButton = document.createElement('button');
    gitHubButton.className = 'sidebar__button-gitHub';
    // gitHubButton.textContent = 'git';
    this.sideBarContent.appendChild(gitHubButton);
  }

  printTab(divName: DisplayTab) {
    let printContent = document.getElementById('printable').innerHTML;
    let originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();

    document.body.innerHTML = originalContent;
  }
}
