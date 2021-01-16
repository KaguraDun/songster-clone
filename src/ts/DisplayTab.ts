export default class DisplayTab {
  parentElement: HTMLElement;
  displayContent: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
  }

  render() {
    this.displayContent = document.createElement('section');
    this.displayContent.className = 'display__tab';
    this.displayContent.setAttribute('id', 'printable');
    this.parentElement.appendChild(this.displayContent);
    this.createTabTitle();
    const tabContent = document.createElement('div');
    tabContent.className = 'tab__content';
    this.displayContent.appendChild(tabContent);
  }

  createTabTitle() {
    const titleComponents = document.createElement('div');
    titleComponents.className = 'title';
    const artistName = document.createElement('div');
    artistName.className = 'title__tab-artist';
    artistName.textContent = 'NIRVANA';
    const trackTitle = document.createElement('div');
    trackTitle.className = 'title__tab-track';
    trackTitle.textContent = 'Smells like Teen Spirit';
    const iconBox = document.createElement('div');
    iconBox.className = 'title__tab-icons';
    const instrumentIcon = document.createElement('div');
    instrumentIcon.className = 'title__tab-instrument';
    const favButton = document.createElement('button');
    favButton.className = 'title__tab-fav';
    iconBox.append(instrumentIcon, favButton);
    titleComponents.append(artistName, trackTitle, iconBox);
    this.displayContent.appendChild(titleComponents); // коробка загловка
  }
}
