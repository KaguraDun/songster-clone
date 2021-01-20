import { AudioGenerator } from "./AudioGenerator/AudioGenerator";
import RenderSong from './RenderSong';
import Store from './Store';

export default class DisplayTab {
  parentElement: HTMLElement;
  displayContent: HTMLElement;
  notesContent: HTMLElement;
  store: Store;

  constructor(parentElement: HTMLElement,store: Store) {
    this.parentElement = parentElement;
    this.store = store;
  }

  render() {
    this.displayContent = document.createElement('section');
    this.displayContent.className = 'display__tab';
    this.displayContent.setAttribute('id', 'printable');
    this.parentElement.appendChild(this.displayContent);
    this.renderSongTitle();

    this.notesContent = document.createElement('div');
    this.notesContent.className = 'tab__content';
    this.displayContent.appendChild(this.notesContent);
    //this.renderSongContent();
  }

  renderSongTitle() {
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
    this.displayContent.appendChild(titleComponents); // коробка заголовка
  }

  async renderSongContent() {
    const responce = await fetch('http://localhost:3000/songs/id/?id=6000521b6a4f1508a4233e03');
    //const responce = await fetch('http://localhost:3000/songs/id/?id=6000a2a200bb3e15e47d4d33');
    const {midiData, converted} = await responce.json();

    //const arrayBuffer = new ArrayBuffer(midiData.data);
    //const midi = new Midi(arrayBuffer);
    const audio = new AudioGenerator(this.notesContent,midiData.data,this.store);
    audio.init();

    const page = new RenderSong(this.notesContent,converted,this.store);
    page.render();
  }
}
